// app/accounts/page.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/AuthContext'
import AppHeader from '@/src/components/header/AppHeader'
import { Button } from '@/src/components/ui/button'
import {
    Plus,
    Edit2,
    Trash2,
    X,
    AlertCircle,
    Wallet,
    Search,
    Download
} from 'lucide-react'
import { db } from '@/src/lib/supabase'
import { getLatestExchangeRate, convertAccountsTotal, convertCurrency } from '@/src/lib/currency'
import { formatCurrency } from '@/src/lib/utils'

export default function AccountsPage() {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()

    // Data states
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [exchangeRates, setExchangeRates] = useState(null)

    // UI states
    const [currency, setCurrency] = useState('EUR')
    const [hideValues, setHideValues] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')
    const [filterType, setFilterType] = useState('all')
    const [selectedAccounts, setSelectedAccounts] = useState(new Set())

    const [formData, setFormData] = useState({
        name: '',
        type: 'bank',
        institution: '',
        current_value: '',
        currency: 'EUR'
    })

    const accountTypes = [
        { value: 'bank', label: 'Conto Corrente', icon: '🏦', color: '#3b82f6' },
        { value: 'broker', label: 'Conto Trading/Broker', icon: '📈', color: '#8b5cf6' },
        { value: 'crypto', label: 'Exchange Crypto', icon: '₿', color: '#f59e0b' },
        { value: 'cash', label: 'Contanti', icon: '💵', color: '#10b981' },
        { value: 'other', label: 'Altro', icon: '💼', color: '#6b7280' }
    ]

    const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#6b7280', '#ec4899', '#06b6d4']

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    const loadData = useCallback(async () => {
        try {
            const rates = await getLatestExchangeRate()
            setExchangeRates(rates)

            const accountsData = await db.getAccounts(user.id)
            setAccounts(accountsData || [])
        } catch (error) {
            setError('Errore nel caricamento dei conti')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            loadData()
        }
    }, [user, loadData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const dataToSave = {
                name: formData.name,
                type: formData.type,
                institution: formData.institution || null,
                current_value: parseFloat(formData.current_value),
                currency: formData.currency
            }

            if (editingId) {
                await db.updateAccount(editingId, user.id, dataToSave)
            } else {
                await db.addAccount(user.id, dataToSave)
            }

            resetForm()
            loadData()
        } catch (error) {
            setError('Errore nel salvataggio: ' + error.message)
            console.error(error)
        }
    }

    const handleEdit = (account) => {
        setFormData({
            name: account.name,
            type: account.type,
            institution: account.institution || '',
            current_value: account.current_value.toString(),
            currency: account.currency
        })
        setEditingId(account.id)
        setShowAddForm(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('Sei sicuro di voler eliminare questo conto?')) return

        try {
            await db.deleteAccount(id, user.id)
            loadData()
        } catch (error) {
            setError('Errore nell\'eliminazione')
            console.error(error)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedAccounts.size === 0) return
        if (!confirm(`Eliminare ${selectedAccounts.size} conti?`)) return

        try {
            for (const id of selectedAccounts) {
                await db.deleteAccount(id, user.id)
            }
            setSelectedAccounts(new Set())
            loadData()
        } catch (error) {
            setError('Errore nell\'eliminazione multipla')
            console.error(error)
        }
    }

    const toggleSelection = (id) => {
        const newSelection = new Set(selectedAccounts)
        if (newSelection.has(id)) {
            newSelection.delete(id)
        } else {
            newSelection.add(id)
        }
        setSelectedAccounts(newSelection)
    }

    const toggleSelectAll = () => {
        if (selectedAccounts.size === filteredAndSortedAccounts.length) {
            setSelectedAccounts(new Set())
        } else {
            setSelectedAccounts(new Set(filteredAndSortedAccounts.map(a => a.id)))
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'bank',
            institution: '',
            current_value: '',
            currency: 'EUR'
        })
        setEditingId(null)
        setShowAddForm(false)
        setError('')
    }

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortDirection('desc')
        }
    }

    const exportToCSV = () => {
        const headers = ['Name', 'Type', 'Institution', 'Value', 'Currency']
        const rows = accounts.map(a => [
            a.name,
            getTypeLabel(a.type),
            a.institution || '',
            a.current_value,
            a.currency
        ])

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `accounts-${new Date().toISOString().split('T')[0]}.csv`
        link.click()
    }

    const getTypeLabel = (type) => {
        return accountTypes.find(t => t.value === type)?.label || type
    }

    const getTypeIcon = (type) => {
        return accountTypes.find(t => t.value === type)?.icon || '💼'
    }

    const getTypeColor = (type) => {
        return accountTypes.find(t => t.value === type)?.color || '#6b7280'
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <Wallet className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    // Calculate accounts with converted values
    const accountsWithCalcs = accounts.map(account => {
        const valueConverted = exchangeRates
            ? convertCurrency(account.current_value, account.currency, currency, exchangeRates)
            : account.current_value

        return {
            ...account,
            valueConverted
        }
    })

    // Filter & Sort
    let filteredAndSortedAccounts = accountsWithCalcs.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.institution && a.institution.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesType = filterType === 'all' || a.type === filterType
        return matchesSearch && matchesType
    })

    filteredAndSortedAccounts.sort((a, b) => {
        let aVal, bVal
        switch (sortBy) {
            case 'name':
                aVal = a.name
                bVal = b.name
                break
            case 'value':
                aVal = a.valueConverted
                bVal = b.valueConverted
                break
            case 'type':
                aVal = a.type
                bVal = b.type
                break
            case 'updated':
                aVal = new Date(a.updated_at)
                bVal = new Date(b.updated_at)
                break
            default:
                aVal = a.name
                bVal = b.name
        }

        if (aVal instanceof Date) {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        } else if (typeof aVal === 'string') {
            return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        } else {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        }
    })

    // Calculate totals
    const totalValue = filteredAndSortedAccounts.reduce((sum, a) => sum + a.valueConverted, 0)

    // Group by type
    const accountsByType = filteredAndSortedAccounts.reduce((acc, account) => {
        if (!acc[account.type]) {
            acc[account.type] = []
        }
        acc[account.type].push(account)
        return acc
    }, {})

    // Pie chart data
    const pieData = Object.entries(accountsByType).map(([type, typeAccounts]) => {
        const typeValue = typeAccounts.reduce((sum, a) => sum + a.valueConverted, 0)
        return {
            name: getTypeLabel(type),
            value: typeValue,
            percentage: totalValue > 0 ? (typeValue / totalValue) * 100 : 0,
            color: getTypeColor(type)
        }
    })

    // Currency breakdown
    const currencyBreakdown = filteredAndSortedAccounts.reduce((acc, account) => {
        if (!acc[account.currency]) {
            acc[account.currency] = {
                value: 0,
                valueConverted: 0,
                count: 0
            }
        }
        acc[account.currency].value += account.current_value
        acc[account.currency].valueConverted += account.valueConverted
        acc[account.currency].count++
        return acc
    }, {})

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
                        <h1 className="text-3xl font-bold text-zinc-900">Conti & Liquidità</h1>
                        <p className="text-zinc-500 mt-1">Gestisci tutti i tuoi conti bancari e di investimento</p>
                    </div>

                    {/* Barra di ricerca e azioni */}
                    <div className="flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search accounts, institutions..."
                                    className="w-full rounded-full bg-zinc-100/80 px-10 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="rounded-full border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50"
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
                                Add account
                            </Button>
                        </div>
                    </div>

                    {/* Corpo a due colonne */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
                        {/* Colonna SINISTRA: titolo, totals, lista conti */}
                        <section>
                            {/* Titolo + totali in alto */}
                            <div className="mb-6 bg-white rounded-2xl px-6 py-6 shadow-sm">
                                <h1 className="text-3xl font-semibold text-zinc-900 mb-6">
                                    Accounts
                                </h1>

                                <div className="flex flex-wrap gap-10 text-sm">
                                    <div>
                                        <p className="text-zinc-500 mb-1">
                                            Total balance
                                        </p>
                                        <p className="text-3xl font-semibold tracking-tight text-zinc-900">
                                            {hideValues
                                                ? '••••••'
                                                : formatCurrency(
                                                      Math.max(totalValue, 0),
                                                      currency
                                                  )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-zinc-500 mb-1">
                                            Accounts
                                        </p>
                                        <p className="text-3xl font-semibold tracking-tight text-zinc-900">
                                            {filteredAndSortedAccounts.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lista conti in sezioni per tipo */}
                            <div className="space-y-6">
                                {Object.entries(accountsByType).map(
                                    ([type, typeAccounts]) => (
                                        <div key={type} className="bg-white rounded-2xl px-6 py-5 shadow-sm">
                                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">
                                                {getTypeLabel(type)}
                                            </p>

                                            <div className="space-y-2">
                                                {typeAccounts.map((account) => {
                                                    const percentageOfTotal =
                                                        totalValue > 0
                                                            ? (account.valueConverted /
                                                                  totalValue) *
                                                              100
                                                            : 0

                                                    return (
                                                        <div
                                                            key={account.id}
                                                            className="w-full rounded-2xl border border-transparent bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-200 transition flex items-center px-4 py-3"
                                                        >
                                                            {/* Avatar cerchio con icona */}
                                                            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                                                                {getTypeIcon(account.type)}
                                                            </div>

                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-zinc-900">
                                                                    {account.name}
                                                                </p>
                                                                <p className="text-xs text-zinc-500">
                                                                    {account.institution ||
                                                                        getTypeLabel(
                                                                            account.type
                                                                        )}{' '}
                                                                    •{' '}
                                                                    {new Date(
                                                                        account.updated_at
                                                                    ).toLocaleTimeString(
                                                                        'it-IT',
                                                                        {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        }
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="text-right text-sm mr-3">
                                                                <p className="font-medium text-zinc-900">
                                                                    {hideValues
                                                                        ? '••••••'
                                                                        : formatCurrency(
                                                                              account.valueConverted,
                                                                              currency
                                                                          )}
                                                                </p>
                                                                {account.currency !==
                                                                    currency && (
                                                                    <p className="text-xs text-zinc-400">
                                                                        {formatCurrency(
                                                                            account.current_value,
                                                                            account.currency
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => handleEdit(account)}
                                                                    className="p-1.5 hover:bg-zinc-200 rounded-lg transition"
                                                                >
                                                                    <Edit2 className="h-3.5 w-3.5 text-zinc-600" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(account.id)}
                                                                    className="p-1.5 hover:bg-red-100 rounded-lg transition"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5 text-red-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                )}

                                {filteredAndSortedAccounts.length === 0 && (
                                    <div className="bg-white rounded-2xl px-6 py-10 shadow-sm">
                                        <div className="border border-dashed border-zinc-200 rounded-xl py-10 text-center text-sm text-zinc-500">
                                            <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                            <p>Nessun conto registrato. Aggiungi il tuo primo conto con il pulsante &quot;Add account&quot;.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Colonna DESTRA: card Allocation */}
                        <aside className="self-start">
                            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-zinc-900">
                                        Allocation
                                    </h2>
                                    <span className="text-xs text-zinc-500">
                                        {hideValues
                                            ? '••••••'
                                            : formatCurrency(
                                                  totalValue,
                                                  currency
                                              )}
                                    </span>
                                </div>

                                {/* Barra Assets */}
                                <div className="mb-5 space-y-1">
                                    <div className="flex items-center justify-between text-xs text-zinc-500">
                                        <span>Assets</span>
                                        <span>
                                            {hideValues
                                                ? '••••••'
                                                : formatCurrency(
                                                      totalValue,
                                                      currency
                                                  )}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                                        <div
                                            className="h-full rounded-full bg-emerald-400"
                                            style={{
                                                width:
                                                    totalValue > 0
                                                        ? '100%'
                                                        : '0%'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Tabella per tipologia */}
                                <div className="space-y-1 text-xs">
                                    <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-2 text-[10px] uppercase tracking-wide text-zinc-400 pb-2">
                                        <span>Holding</span>
                                        <span className="text-right">% of total</span>
                                        <span className="text-right">Amount</span>
                                    </div>

                                    {pieData.map((item) => (
                                        <div
                                            key={item.name}
                                            className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-2 py-1.5 text-xs"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="h-1.5 w-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            item.color
                                                    }}
                                                />
                                                <span className="text-zinc-600">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-right text-zinc-400">
                                                {item.percentage.toFixed(0)}%
                                            </span>
                                            <span className="text-right text-zinc-800 font-medium">
                                                {hideValues
                                                    ? '••••••'
                                                    : formatCurrency(
                                                          item.value,
                                                          currency
                                                      )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Form Add/Edit in un modal */}
            {showAddForm && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                        <div className="rounded-3xl bg-white shadow-2xl">
                            <div className="px-8 pt-6 pb-4 border-b border-zinc-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-zinc-900">
                                            {editingId ? 'Modifica Conto' : 'Nuovo Conto'}
                                        </h2>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            {editingId ? 'Aggiorna le informazioni del conto' : 'Aggiungi un nuovo conto alla tua gestione finanziaria'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={resetForm}
                                        className="p-2 hover:bg-zinc-100 rounded-full transition"
                                    >
                                        <X className="h-5 w-5 text-zinc-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-8 py-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Account Type Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-zinc-700">Tipologia Conto *</label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {accountTypes.map(type => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type: type.value })}
                                                    className={`p-4 rounded-2xl border-2 transition-all ${
                                                        formData.type === type.value
                                                            ? 'border-zinc-900 bg-zinc-50'
                                                            : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                                                    }`}
                                                >
                                                    <div className="text-3xl mb-2">{type.icon}</div>
                                                    <div className="text-xs font-medium text-center text-zinc-700">{type.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Account Name */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-zinc-700">
                                            Nome Conto *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                            placeholder="es. Conto Corrente Intesa, IBKR Trading"
                                            required
                                        />
                                    </div>

                                    {/* Institution */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-zinc-700">
                                            Istituto / Banca
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.institution}
                                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all"
                                            placeholder="es. Banca Intesa, Interactive Brokers"
                                        />
                                    </div>

                                    {/* Value and Currency Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Current Value */}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">
                                                Saldo Attuale *
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.current_value}
                                                onChange={(e) => setFormData({ ...formData, current_value: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all font-mono text-lg"
                                                placeholder="0.00"
                                                step="0.01"
                                                required
                                            />
                                        </div>

                                        {/* Currency Selection */}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-zinc-700">
                                                Valuta *
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { value: 'EUR', label: '€ EUR' },
                                                    { value: 'USD', label: '$ USD' },
                                                    { value: 'GBP', label: '£ GBP' },
                                                    { value: 'CHF', label: 'CHF' }
                                                ].map(curr => (
                                                    <button
                                                        key={curr.value}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, currency: curr.value })}
                                                        className={`p-3 rounded-2xl border-2 transition-all text-sm font-semibold ${
                                                            formData.currency === curr.value
                                                                ? 'border-zinc-900 bg-zinc-50'
                                                                : 'border-zinc-200 hover:border-zinc-300'
                                                        }`}
                                                    >
                                                        {curr.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-semibold text-red-600">Errore</p>
                                                <p className="text-sm text-red-600 mt-1">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 px-6 bg-zinc-900 text-white rounded-full font-medium hover:bg-black transition disabled:opacity-50"
                                            disabled={!formData.name || !formData.current_value}
                                        >
                                            {editingId ? 'Aggiorna' : 'Aggiungi'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-6 py-3 border-2 border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition"
                                        >
                                            Annulla
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
