'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/AuthContext'
import AppHeader from '@/src/components/header/AppHeader'
import { Button } from '@/src/components/ui/button'
import {
    Plus, Filter, X, Calendar, Download, Upload, Search, ChevronRight, Edit2, Trash2, ArrowUpDown
} from 'lucide-react'
import { db } from '@/src/lib/supabase'
import { formatCurrency } from '@/src/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function CashFlowPage() {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [currency, setCurrency] = useState('EUR')
    const [hideValues, setHideValues] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [filterAccount, setFilterAccount] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    })

    const [formData, setFormData] = useState({
        merchant: '',
        description: '',
        amount: '',
        currency: 'EUR',
        category: '',
        account_id: '',
        transaction_date: new Date().toISOString().split('T')[0],
        transaction_type: 'expense',
        is_recurring: false,
        recurring_frequency: '',
        notes: ''
    })

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    const loadData = useCallback(async () => {
        try {
            setLoading(true)
            const accountsData = await db.getAccounts(user.id)
            setAccounts(accountsData || [])

            const categoriesData = await db.getTransactionCategories(user.id)
            setCategories(categoriesData || [])

            const filters = {
                startDate: dateRange.start,
                endDate: dateRange.end
            }
            if (filterAccount !== 'all') filters.accountId = filterAccount
            if (filterCategory !== 'all') filters.category = filterCategory
            if (filterType !== 'all') filters.type = filterType

            const transactionsData = await db.getTransactions(user.id, filters)
            setTransactions(transactionsData || [])
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }, [user, dateRange.start, dateRange.end, filterAccount, filterCategory, filterType])

    useEffect(() => {
        if (user) {
            loadData()
        }
    }, [user, loadData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const transactionData = {
                ...formData,
                amount: parseFloat(formData.amount) * (formData.transaction_type === 'expense' ? -1 : 1),
            }
            await db.addTransaction(user.id, transactionData)
            setShowAddForm(false)
            resetForm()
            loadData()
        } catch (error) {
            console.error('Error adding transaction:', error)
        }
    }

    const handleDelete = async (transactionId) => {
        if (!confirm('Delete this transaction?')) return
        try {
            await db.deleteTransaction(transactionId, user.id)
            setSelectedTransaction(null)
            loadData()
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const resetForm = () => {
        setFormData({
            merchant: '',
            description: '',
            amount: '',
            currency: 'EUR',
            category: '',
            account_id: '',
            transaction_date: new Date().toISOString().split('T')[0],
            transaction_type: 'expense',
            is_recurring: false,
            recurring_frequency: '',
            notes: ''
        })
    }

    const exportToCSV = () => {
        const headers = ['Date', 'Merchant', 'Amount', 'Category', 'Account', 'Type']
        const rows = filteredTransactions.map(t => [
            t.transaction_date,
            t.merchant,
            t.amount,
            t.category,
            t.accounts?.name || '',
            t.transaction_type
        ])
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `cash-flow-${new Date().toISOString().split('T')[0]}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }

    const filteredTransactions = transactions.filter(t =>
        t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const summary = {
        moneyIn: filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
        moneyOut: Math.abs(filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
        transfers: filteredTransactions.filter(t => t.transaction_type === 'transfer').reduce((sum, t) => sum + Math.abs(t.amount), 0),
    }
    summary.netChange = summary.moneyIn - summary.moneyOut

    const monthlyData = {}
    filteredTransactions.forEach(t => {
        const date = new Date(t.transaction_date)
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0, net: 0 }
        }
        if (t.amount > 0) {
            monthlyData[monthKey].income += t.amount
        } else {
            monthlyData[monthKey].expense += Math.abs(t.amount)
        }
        monthlyData[monthKey].net = monthlyData[monthKey].income - monthlyData[monthKey].expense
    })
    const chartData = Object.values(monthlyData)

    const getCategoryColor = (categoryName) => {
        const cat = categories.find(c => c.name === categoryName)
        return cat?.color || '#6b7280'
    }

    const getCategoryIcon = (categoryName) => {
        const cat = categories.find(c => c.name === categoryName)
        return cat?.icon || '='
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <ArrowUpDown className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <AppHeader
                currency={currency}
                onCurrencyChange={setCurrency}
                hideValues={hideValues}
                onHideValuesChange={setHideValues}
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-zinc-900">Cash Flow</h1>
                        <p className="text-zinc-500 mt-1">Traccia entrate, uscite e trasferimenti</p>
                    </div>

                    <div className="flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Button
                                variant="outline"
                                className="rounded-full border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="mr-1.5 h-4 w-4" />
                                Filter
                            </Button>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 rounded-full text-xs font-medium text-zinc-700">
                                <Calendar className="h-4 w-4" />
                                {new Date(dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="rounded-full border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700"
                                onClick={() => setShowUploadModal(true)}
                            >
                                <Upload className="mr-1.5 h-4 w-4" />
                                Import
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700"
                                onClick={exportToCSV}
                            >
                                <Download className="mr-1.5 h-4 w-4" />
                                Export
                            </Button>
                            <Button
                                className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-black"
                                onClick={() => setShowAddForm(true)}
                            >
                                <Plus className="mr-1.5 h-4 w-4" />
                                Add transaction
                            </Button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-2">Account</label>
                                    <select
                                        value={filterAccount}
                                        onChange={(e) => setFilterAccount(e.target.value)}
                                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm"
                                    >
                                        <option value="all">All accounts</option>
                                        {accounts.map(acc => (
                                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-2">Category</label>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm"
                                    >
                                        <option value="all">All categories</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-700 mb-2">Type</label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm"
                                    >
                                        <option value="all">All types</option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                        <option value="transfer">Transfer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] gap-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                                    <p className="text-xs text-zinc-500 mb-1">Net change</p>
                                    <p className={`text-2xl font-semibold ${summary.netChange < 0 ? 'text-red-500' : 'text-zinc-900'}`}>
                                        {hideValues ? '""""""' : formatCurrency(summary.netChange, currency)}
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                                    <p className="text-xs text-zinc-500 mb-1">Money in</p>
                                    <p className="text-2xl font-semibold text-emerald-500">
                                        {hideValues ? '""""""' : formatCurrency(summary.moneyIn, currency)}
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                                    <p className="text-xs text-zinc-500 mb-1">Money out</p>
                                    <p className="text-2xl font-semibold text-zinc-900">
                                        {hideValues ? '""""""' : `-${formatCurrency(summary.moneyOut, currency)}`}
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                                    <p className="text-xs text-zinc-500 mb-1">Transfers</p>
                                    <p className="text-2xl font-semibold text-zinc-900">
                                        {hideValues ? '""""""' : formatCurrency(summary.transfers, currency)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={{ stroke: '#e5e7eb' }} />
                                        <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }}
                                            formatter={(value) => formatCurrency(value, currency)}
                                        />
                                        <Bar dataKey="net" radius={[8, 8, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.net >= 0 ? '#10b981' : '#52525b'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-zinc-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search transactions..."
                                            className="w-full rounded-full bg-zinc-100/80 px-10 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:bg-white transition"
                                        />
                                    </div>
                                </div>

                                <div className="px-6 py-3 bg-zinc-50 grid grid-cols-[2fr_1fr_1.5fr] gap-4 text-xs font-medium text-zinc-500">
                                    <span>Merchant</span>
                                    <span className="text-right">Amount</span>
                                    <span className="text-right">Category</span>
                                </div>

                                <div className="divide-y divide-zinc-100 max-h-96 overflow-y-auto">
                                    {filteredTransactions.length === 0 ? (
                                        <div className="px-6 py-12 text-center text-zinc-500">
                                            <p>No transactions found</p>
                                        </div>
                                    ) : (
                                        filteredTransactions.map((transaction) => (
                                            <button
                                                key={transaction.id}
                                                onClick={() => setSelectedTransaction(transaction)}
                                                className="w-full px-6 py-4 hover:bg-zinc-50 transition grid grid-cols-[2fr_1fr_1.5fr] gap-4 items-center text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
                                                        style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
                                                    >
                                                        {getCategoryIcon(transaction.category)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900">
                                                            {transaction.merchant}
                                                        </p>
                                                        <p className="text-xs text-zinc-500">
                                                            {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-medium ${transaction.amount < 0 ? 'text-zinc-900' : 'text-emerald-500'}`}>
                                                        {hideValues ? '""""""' : formatCurrency(transaction.amount, transaction.currency)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    <span
                                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                                        style={{
                                                            backgroundColor: `${getCategoryColor(transaction.category)}20`,
                                                            color: getCategoryColor(transaction.category)
                                                        }}
                                                    >
                                                        {transaction.category}
                                                    </span>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedTransaction ? (
                            <aside className="bg-white rounded-2xl px-6 py-6 shadow-sm self-start sticky top-24">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                                            style={{ backgroundColor: `${getCategoryColor(selectedTransaction.category)}20` }}
                                        >
                                            {getCategoryIcon(selectedTransaction.category)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-zinc-900">
                                                {selectedTransaction.merchant}
                                            </h3>
                                            <p className="text-sm text-zinc-500">
                                                {new Date(selectedTransaction.transaction_date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="p-1 hover:bg-zinc-100 rounded-full transition"
                                    >
                                        <X className="h-4 w-4 text-zinc-600" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <p className={`text-3xl font-bold ${selectedTransaction.amount < 0 ? 'text-zinc-900' : 'text-emerald-500'}`}>
                                        {hideValues ? '""""""' : formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <h4 className="text-sm font-semibold text-zinc-900">Details</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Category</p>
                                            <span
                                                className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: `${getCategoryColor(selectedTransaction.category)}20`,
                                                    color: getCategoryColor(selectedTransaction.category)
                                                }}
                                            >
                                                {selectedTransaction.category}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Account</p>
                                            <p className="text-sm text-zinc-900">
                                                {selectedTransaction.accounts?.name || 'Unknown Account'}
                                            </p>
                                        </div>
                                        {selectedTransaction.description && (
                                            <div>
                                                <p className="text-xs text-zinc-500 mb-1">Description</p>
                                                <p className="text-sm text-zinc-900">{selectedTransaction.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 rounded-full border-zinc-200">
                                        <Edit2 className="h-4 w-4 mr-2" />Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(selectedTransaction.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />Delete
                                    </Button>
                                </div>
                            </aside>
                        ) : (
                            <aside className="bg-white rounded-2xl px-6 py-12 shadow-sm self-start text-center text-zinc-500">
                                <ChevronRight className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Select a transaction to view details</p>
                            </aside>
                        )}
                    </div>
                </div>
            </main>

            {showAddForm && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="rounded-3xl bg-white shadow-2xl">
                            <div className="px-8 pt-6 pb-4 border-b border-zinc-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-zinc-900">Add Transaction</h2>
                                        <p className="text-sm text-zinc-500 mt-1">Add a new income or expense</p>
                                    </div>
                                    <button onClick={() => { setShowAddForm(false); resetForm(); }} className="p-2 hover:bg-zinc-100 rounded-full transition">
                                        <X className="h-5 w-5 text-zinc-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-8 py-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-zinc-700">Type *</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'expense', label: 'Expense' },
                                                { value: 'income', label: 'Income' },
                                                { value: 'transfer', label: 'Transfer' }
                                            ].map(type => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, transaction_type: type.value })}
                                                    className={`p-4 rounded-2xl border-2 transition-all ${
                                                        formData.transaction_type === type.value
                                                            ? 'border-zinc-900 bg-zinc-50'
                                                            : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    <div className="text-xs font-medium text-center text-zinc-700">{type.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-zinc-700">Merchant / Payee *</label>
                                        <input
                                            type="text"
                                            value={formData.merchant}
                                            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                            placeholder="e.g., Starbucks, Monthly Salary"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">Amount *</label>
                                            <input
                                                type="number"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all font-mono text-lg"
                                                placeholder="0.00"
                                                step="0.01"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">Category *</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                                required
                                            >
                                                <option value="">Select category</option>
                                                {categories.filter(c => c.type === formData.transaction_type).map(cat => (
                                                    <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">Account *</label>
                                            <select
                                                value={formData.account_id}
                                                onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                                required
                                            >
                                                <option value="">Select account</option>
                                                {accounts.map(acc => (
                                                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">Date *</label>
                                            <input
                                                type="date"
                                                value={formData.transaction_date}
                                                onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-zinc-700">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                            rows="3"
                                            placeholder="Optional description..."
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 px-6 bg-zinc-900 text-white rounded-full font-medium hover:bg-black transition disabled:opacity-50"
                                            disabled={!formData.merchant || !formData.amount || !formData.category || !formData.account_id}
                                        >
                                            Add Transaction
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowAddForm(false); resetForm(); }}
                                            className="px-6 py-3 border-2 border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUploadModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl">
                        <div className="rounded-3xl bg-white shadow-2xl px-8 py-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-zinc-900">Import Transactions</h2>
                                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-zinc-100 rounded-full transition">
                                    <X className="h-5 w-5 text-zinc-600" />
                                </button>
                            </div>
                            <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-2xl">
                                <Upload className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                                <p className="text-zinc-600 mb-2">Upload functionality coming soon</p>
                                <p className="text-sm text-zinc-500">Support for CSV, Excel, and PDF files</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
