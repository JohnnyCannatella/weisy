// app/fire-tracker/page.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/AuthContext'
import AppHeader from '@/src/components/header/AppHeader'
import {
    Target,
    TrendingUp,
    DollarSign,
    Percent,
    Flame,
    Coffee,
    Edit2,
    X,
    Zap,
    Activity,
    BarChart3,
    Info
} from 'lucide-react'
import { db } from '@/src/lib/supabase'
import { getLatestExchangeRate, convertCurrency, convertHoldingsTotal, convertAccountsTotal } from '@/src/lib/currency'
import { formatCurrency, formatPercent } from '@/src/lib/utils'
import { runMonteCarloSimulation } from '@/src/lib/monte-carlo'
import {
    LineChart,
    Cell,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    BarChart,
    Bar
} from 'recharts'

export default function FireTracker() {
    const { user, profile, loading: authLoading } = useAuth()
    const router = useRouter()

    // Data states
    const [snapshots, setSnapshots] = useState([])
    const [accounts, setAccounts] = useState([])
    const [holdings, setHoldings] = useState([])
    const [loading, setLoading] = useState(true)
    const [exchangeRates, setExchangeRates] = useState(null)

    // UI states
    const [currency, setCurrency] = useState('EUR')
    const [hideValues, setHideValues] = useState(false)
    const [scenarioView, setScenarioView] = useState('base') // 'base', 'optimistic', 'pessimistic'
    const [activeTab, setActiveTab] = useState('overview') // overview, simulation, settings
    const [showSettingsModal, setShowSettingsModal] = useState(false)

    // Monte Carlo states
    const [monteCarloResult, setMonteCarloResult] = useState(null)
    const [runningSimulation, setRunningSimulation] = useState(false)
    const [showMonteCarloDetails, setShowMonteCarloDetails] = useState(false)

    // Settings
    const [settings, setSettings] = useState({
        fire_target: 2000000,
        withdrawal_rate: 4.0,
        monthly_contribution: 3000,
        expected_return: 7.0,
        monthly_expenses: 3000,
        current_monthly_income: 5000,
        coast_fire_age: 65,
    })

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    const loadData = useCallback(async () => {
        try {
            const rates = await getLatestExchangeRate()
            setExchangeRates(rates)

            const [snapshotsData, accountsData, holdingsData] = await Promise.all([
                db.getNetWorthHistory(user.id, 60),
                db.getAccounts(user.id),
                db.getHoldings(user.id)
            ])

            setSnapshots(snapshotsData || [])
            setAccounts(accountsData || [])
            setHoldings(holdingsData || [])
        } catch (error) {
            console.error('Error loading data:', error)
            setSnapshots([])
            setAccounts([])
            setHoldings([])
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            loadData()

            if (profile) {
                setSettings({
                    fire_target: profile.fire_target || 2000000,
                    withdrawal_rate: ((profile.withdrawal_rate || 0.04) * 100),
                    monthly_contribution: profile.monthly_contribution || 3000,
                    expected_return: profile.expected_return || 7.0,
                    monthly_expenses: profile.monthly_expenses || 3000,
                    current_monthly_income: profile.current_monthly_income || 5000,
                    coast_fire_age: profile.coast_fire_age || 65,
                })
            }
        }
    }, [user, profile, loadData])

    const saveSettings = async () => {
        try {
            const updates = {
                fire_target: parseFloat(settings.fire_target),
                withdrawal_rate: parseFloat(settings.withdrawal_rate) / 100,
                monthly_contribution: parseFloat(settings.monthly_contribution),
                expected_return: parseFloat(settings.expected_return),
                monthly_expenses: parseFloat(settings.monthly_expenses),
                current_monthly_income: parseFloat(settings.current_monthly_income),
                coast_fire_age: parseInt(settings.coast_fire_age),
                updated_at: new Date().toISOString()
            }

            await db.updateProfile(user.id, updates)
            setShowSettingsModal(false)
            setMonteCarloResult(null)
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('Errore nel salvataggio. Se i nuovi campi non esistono nel DB, esegui la migration SQL.')
        }
    }

    const runSimulation = async () => {
        setRunningSimulation(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 400))

            const params = {
                currentNetWorth,
                fireTarget: parseFloat(settings.fire_target),
                monthlyContribution: parseFloat(settings.monthly_contribution),
                expectedReturn: parseFloat(settings.expected_return),
                volatility: 15,
                yearsToFire: Math.max(1, Math.ceil(yearsToFire)),
                retirementYears: 30,
                annualExpenses: parseFloat(settings.monthly_expenses) * 12,
                inflationRate: 2.5,
                numSimulations: 1000
            }

            const result = runMonteCarloSimulation(params)
            setMonteCarloResult(result)
            setShowMonteCarloDetails(true)
        } catch (error) {
            console.error('Error running Monte Carlo simulation:', error)
            alert('Errore durante la simulazione Monte Carlo')
        } finally {
            setRunningSimulation(false)
        }
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="text-center">
                    <Target className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-zinc-600">{authLoading ? 'Authenticating...' : 'Loading FIRE data...'}</p>
                </div>
            </div>
        )
    }

    // Calculate current net worth WITH CURRENCY CONVERSION
    const portfolioValue = exchangeRates
        ? convertHoldingsTotal(holdings, currency, exchangeRates)
        : holdings.reduce((sum, h) => sum + (h.quantity * (h.current_price || h.avg_cost)), 0)

    const cashValue = exchangeRates
        ? convertAccountsTotal(accounts, currency, exchangeRates)
        : accounts.reduce((sum, acc) => sum + acc.current_value, 0)

    const currentNetWorth = portfolioValue + cashValue

    // FIRE calculations
    const fireTarget = parseFloat(settings.fire_target)
    const progress = (currentNetWorth / fireTarget) * 100
    const remaining = Math.max(0, fireTarget - currentNetWorth)
    const withdrawalRate = parseFloat(settings.withdrawal_rate) / 100
    const annualIncome = currentNetWorth * withdrawalRate
    const monthlyIncome = annualIncome / 12

    const getScenarioParams = (scenario) => {
        const base = {
            contribution: parseFloat(settings.monthly_contribution),
            return: parseFloat(settings.expected_return) / 100 / 12
        }

        switch (scenario) {
            case 'optimistic':
                return { contribution: base.contribution * 1.2, return: (parseFloat(settings.expected_return) + 2) / 100 / 12 }
            case 'pessimistic':
                return { contribution: base.contribution * 0.8, return: (parseFloat(settings.expected_return) - 2) / 100 / 12 }
            default:
                return base
        }
    }

    const calculateYearsToFire = (scenario = 'base') => {
        if (currentNetWorth >= fireTarget) return 0
        const params = getScenarioParams(scenario)
        if (params.contribution <= 0) return Infinity

        let months = 0
        let balance = currentNetWorth
        while (balance < fireTarget && months < 600) { // Max 50 years
            balance = balance * (1 + params.return) + params.contribution
            months++
        }
        return months / 12
    }

    const yearsToFire = calculateYearsToFire(scenarioView)
    const fireDate = new Date()
    fireDate.setMonth(fireDate.getMonth() + Math.round(yearsToFire * 12))

    const monthlyExpenses = parseFloat(settings.monthly_expenses)
    const annualExpenses = monthlyExpenses * 12
    const fiRatio = annualExpenses > 0 ? currentNetWorth / annualExpenses : 0

    const currentAge = profile?.birth_date
        ? new Date().getFullYear() - new Date(profile.birth_date).getFullYear()
        : 30
    const coastFireAge = parseInt(settings.coast_fire_age)
    const yearsUntilCoastFire = Math.max(0, coastFireAge - currentAge)
    const monthlyReturn = parseFloat(settings.expected_return) / 100 / 12
    const coastFireAmount = fireTarget / Math.pow(1 + monthlyReturn, yearsUntilCoastFire * 12)
    const coastFireProgress = (currentNetWorth / coastFireAmount) * 100
    const hasReachedCoastFire = currentNetWorth >= coastFireAmount

    const currentMonthlyIncome = parseFloat(settings.current_monthly_income)
    const monthlySavings = parseFloat(settings.monthly_contribution)
    const savingsRate = currentMonthlyIncome > 0 ? (monthlySavings / currentMonthlyIncome) * 100 : 0

    const projectionData = (() => {
        const data = []
        const params = getScenarioParams(scenarioView)
        let projectedBalance = currentNetWorth
        const currentDate = new Date()
        const yearsToProject = Math.min(Math.ceil(calculateYearsToFire(scenarioView)), 40)

        for (let i = 0; i <= yearsToProject; i++) {
            const date = new Date(currentDate)
            date.setFullYear(date.getFullYear() + i)
            data.push({
                year: date.getFullYear(),
                value: projectedBalance,
                target: fireTarget
            })
            for (let month = 0; month < 12; month++) {
                projectedBalance = projectedBalance * (1 + params.return) + params.contribution
            }
        }
        return data
    })()

    const scenarioComparison = [{
        name: 'Pessimistico',
        years: calculateYearsToFire('pessimistic'),
        color: '#ef4444'
    }, {
        name: 'Base',
        years: calculateYearsToFire('base'),
        color: '#3b82f6'
    }, {
        name: 'Ottimistico',
        years: calculateYearsToFire('optimistic'),
        color: '#10b981'
    }].map(s => ({
        ...s,
        years: s.years === Infinity ? 50 : s.years,
        label: s.years === Infinity ? '50+' : s.years.toFixed(1)
    }))

    const historicalData = snapshots.map(s => {
        const convertedValue = exchangeRates
            ? convertCurrency(s.total_net_worth, 'EUR', currency, exchangeRates)
            : s.total_net_worth

        return {
            date: new Date(s.snapshot_date).toLocaleDateString('it-IT', { month: 'short', year: '2-digit' }),
            value: convertedValue
        }
    })

    return (
        <div className="min-h-screen bg-zinc-50">
            <AppHeader
                currency={currency}
                onCurrencyChange={setCurrency}
                hideValues={hideValues}
                onHideValuesChange={setHideValues}
            />

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-zinc-900">FIRE Tracker</h1>
                    <p className="text-zinc-500 mt-1">Financial Independence, Retire Early</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'overview', label: 'Overview' },
                                { id: 'simulation', label: 'Simulazioni' },
                                { id: 'settings', label: 'Impostazioni' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-zinc-900 text-white'
                                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                setShowSettingsModal(true)
                            }}
                            className="rounded-full border border-zinc-200 hover:bg-zinc-50 px-4 py-1.5 text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <Edit2 className="h-4 w-4" />
                            Modifica impostazioni
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-zinc-200">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <Info className="h-5 w-5 text-zinc-600" />
                                        </div>
                                        <div className="space-y-2 text-sm text-zinc-700">
                                            <h3 className="font-semibold text-zinc-900 text-sm">Come funziona il FIRE Tracker</h3>
                                            <p>Proiezione deterministica (base/ottimistica/pessimistica), simulazione Monte Carlo, Coast FIRE e FI Ratio.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Flame className="h-5 w-5 text-orange-500" />
                                                <p className="text-xs text-zinc-500">Progresso verso FIRE</p>
                                            </div>
                                            <h2 className="text-4xl font-bold text-zinc-900">
                                                {hideValues ? '••••' : `${progress.toFixed(1)}%`}
                                            </h2>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-500 mb-1">Target FIRE</p>
                                            <h3 className="text-2xl font-semibold text-zinc-900">
                                                {hideValues ? '••••••' : formatCurrency(fireTarget, currency)}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="w-full bg-zinc-100 rounded-full h-3 mb-6 overflow-hidden">
                                        <div
                                            className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <MiniStat label="Patrimonio Attuale" value={hideValues ? '••••••' : formatCurrency(currentNetWorth, currency)} />
                                        <MiniStat label="Mancante" value={hideValues ? '••••••' : formatCurrency(remaining, currency)} />
                                        <MiniTextStat label={`Anni al FIRE (${scenarioView})`} text={yearsToFire === Infinity ? '∞' : `${yearsToFire.toFixed(1)} anni`} />
                                        <MiniTextStat label="Data stimata" text={yearsToFire === Infinity ? 'N/A' : fireDate.toLocaleDateString('it-IT', { month: 'short', year: 'numeric' })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <MetricCard
                                        icon={<Activity className="h-4 w-4 text-blue-600" />}
                                        label="FI Ratio"
                                        value={hideValues ? '••••' : `${fiRatio.toFixed(1)} anni`}
                                        helper="Anni di spese coperte"
                                    />
                                    <MetricCard
                                        icon={<DollarSign className="h-4 w-4 text-green-600" />}
                                        label="Rendita Mensile"
                                        value={hideValues ? '••••••' : formatCurrency(monthlyIncome, currency)}
                                        helper={`Al ${settings.withdrawal_rate}% annuo`}
                                        warning={monthlyIncome < monthlyExpenses ? 'Sotto le spese desiderate' : null}
                                    />
                                    <MetricCard
                                        icon={<Percent className="h-4 w-4 text-purple-600" />}
                                        label="Savings Rate"
                                        value={hideValues ? '••%' : `${savingsRate.toFixed(0)}%`}
                                        helper={`${formatCurrency(monthlySavings, currency)} / ${formatCurrency(currentMonthlyIncome, currency)}`}
                                    />
                                    <MetricCard
                                        icon={<Coffee className="h-4 w-4 text-orange-600" />}
                                        label="Coast FIRE"
                                        value={hideValues ? '••••' : `${coastFireProgress.toFixed(0)}%`}
                                        helper={hideValues ? '••••••' : `${formatCurrency(coastFireAmount, currency)} necessari a ${currentAge} anni`}
                                        success={hasReachedCoastFire ? 'Raggiunto! Puoi smettere di contribuire' : null}
                                    />
                                </div>

                                <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-yellow-500" />
                                            Confronto Scenari Deterministici
                                        </h2>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            Stima anni al FIRE per scenari diversi
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                                        {scenarioComparison.map((scenario) => (
                                            <button
                                                key={scenario.name}
                                                onClick={() => setScenarioView(scenario.name === 'Pessimistico' ? 'pessimistic' : scenario.name === 'Base' ? 'base' : 'optimistic')}
                                                className={`p-4 rounded-xl border transition-all text-left ${
                                                    (scenarioView === 'pessimistic' && scenario.name === 'Pessimistico') ||
                                                    (scenarioView === 'base' && scenario.name === 'Base') ||
                                                    (scenarioView === 'optimistic' && scenario.name === 'Ottimistico')
                                                        ? 'border-zinc-900 bg-zinc-50'
                                                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                                                }`}
                                            >
                                                <p className="text-xs text-zinc-500 mb-1">{scenario.name}</p>
                                                <p className="text-2xl font-bold" style={{ color: scenario.color }}>
                                                    {scenario.label} anni
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    <ResponsiveContainer width="100%" height={120}>
                                        <BarChart data={scenarioComparison} layout="vertical">
                                            <XAxis type="number" hide />
                                            <YAxis type="category" dataKey="name" width={100} fontSize={12} />
                                            <Bar dataKey="years" radius={[0, 8, 8, 0]}>
                                                {scenarioComparison.map((entry, index) => (
                                                    <Cell key={`bar-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {historicalData.length > 0 && (
                                    <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold text-zinc-900">Storico Crescita Patrimonio</h2>
                                            <p className="text-xs text-zinc-500 mt-1">Ultimi {historicalData.length} mesi</p>
                                        </div>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={historicalData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                                                <YAxis stroke="#71717a" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                                <Tooltip
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-lg">
                                                                    <p className="font-semibold mb-2 text-sm">{payload[0].payload.date}</p>
                                                                    <p className="text-sm font-bold text-zinc-900">
                                                                        {hideValues ? '••••••' : formatCurrency(payload[0].value, currency)}
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                        return null
                                                    }}
                                                />
                                                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'simulation' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-blue-500" />
                                            Proiezione Deterministica
                                        </h2>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            Scenario {scenarioView === 'base' ? 'Base' : scenarioView === 'optimistic' ? 'Ottimistico' : 'Pessimistico'} • Contributo {formatCurrency(getScenarioParams(scenarioView).contribution, currency)} • Rendimento {(getScenarioParams(scenarioView).return * 12 * 100).toFixed(1)}%
                                        </p>
                                    </div>

                                    <ResponsiveContainer width="100%" height={360}>
                                        <AreaChart data={projectionData}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                                            <YAxis stroke="#71717a" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-lg">
                                                                <p className="font-semibold mb-2 text-sm">{payload[0].payload.year}</p>
                                                                <p className="text-sm text-blue-600 font-bold">
                                                                    Patrimonio: {hideValues ? '••••••' : formatCurrency(payload[0].value, currency)}
                                                                </p>
                                                                <p className="text-sm text-zinc-500">
                                                                    Target: {hideValues ? '••••••' : formatCurrency(payload[0].payload.target, currency)}
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                            <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                                                <BarChart3 className="h-5 w-5 text-purple-600" />
                                                Simulazione Monte Carlo
                                            </h2>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Analisi probabilistica con {monteCarloResult?.numSimulations || 1000} simulazioni
                                            </p>
                                        </div>
                                        <button
                                            onClick={runSimulation}
                                            disabled={runningSimulation}
                                            className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium transition-colors disabled:bg-zinc-400 flex items-center gap-2"
                                        >
                                            {runningSimulation ? (
                                                <>
                                                    <Target className="h-4 w-4 animate-spin" />
                                                    Simulando...
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="h-4 w-4" />
                                                    Avvia Simulazione
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {monteCarloResult ? (
                                        <div className="space-y-6">
                                            <div className={`p-6 rounded-2xl border ${
                                                monteCarloResult.interpretation.level === 'excellent' ? 'bg-green-50 border-green-500' :
                                                monteCarloResult.interpretation.level === 'good' ? 'bg-blue-50 border-blue-500' :
                                                monteCarloResult.interpretation.level === 'moderate' ? 'bg-yellow-50 border-yellow-500' :
                                                monteCarloResult.interpretation.level === 'risky' ? 'bg-orange-50 border-orange-500' :
                                                'bg-red-50 border-red-500'
                                            }`}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-3xl">
                                                            {monteCarloResult.interpretation.emoji}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-3xl font-bold">
                                                                {monteCarloResult.successRate.toFixed(1)}%
                                                            </h3>
                                                            <p className="text-xs text-zinc-500">Tasso di Successo</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-1.5 rounded-full font-semibold text-sm bg-white/60">
                                                        {monteCarloResult.interpretation.level.toUpperCase()}
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-base">
                                                    {monteCarloResult.interpretation.message}
                                                </p>
                                                <p className="text-sm text-zinc-600">
                                                    {monteCarloResult.interpretation.recommendation}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                {[
                                                    { label: 'Scenario Peggiore (10°)', value: monteCarloResult.statistics.percentile10, color: 'text-red-600' },
                                                    { label: 'Mediana (50°)', value: monteCarloResult.statistics.percentile50, color: 'text-blue-600' },
                                                    { label: 'Scenario Migliore (90°)', value: monteCarloResult.statistics.percentile90, color: 'text-green-600' },
                                                    { label: 'Media', value: monteCarloResult.statistics.mean, color: 'text-purple-600' },
                                                ].map(item => (
                                                    <div key={item.label} className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                                                        <p className="text-xs text-zinc-500 mb-1">{item.label}</p>
                                                        <p className={`text-xl font-semibold ${item.color}`}>
                                                            {hideValues ? '••••••' : formatCurrency(item.value, currency)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {showMonteCarloDetails && monteCarloResult.percentilePaths && (
                                                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
                                                    <h3 className="text-base font-semibold text-zinc-900 mb-2">Proiezioni Monte Carlo</h3>
                                                    <p className="text-xs text-zinc-500 mb-4">
                                                        Evoluzione del patrimonio nei diversi percentili
                                                    </p>
                                                    <ResponsiveContainer width="100%" height={320}>
                                                        <AreaChart data={monteCarloResult.percentilePaths.p50.map((p50, idx) => ({
                                                            year: p50.year,
                                                            p10: monteCarloResult.percentilePaths.p10[idx]?.value || 0,
                                                            p50: p50.value,
                                                            p90: monteCarloResult.percentilePaths.p90[idx]?.value || 0,
                                                            target: fireTarget
                                                        }))}>
                                                            <defs>
                                                                <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                                </linearGradient>
                                                                <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                                </linearGradient>
                                                                <linearGradient id="colorP10" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                            <XAxis dataKey="year" stroke="#71717a" fontSize={12} />
                                                            <YAxis stroke="#71717a" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                                            <Tooltip
                                                                content={({ active, payload }) => {
                                                                    if (active && payload && payload.length) {
                                                                        return (
                                                                            <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-lg text-xs space-y-1">
                                                                                <p className="font-semibold text-sm">Anno {payload[0].payload.year}</p>
                                                                                <p className="text-green-600">90°: {hideValues ? '••••••' : formatCurrency(payload[0].payload.p90, currency)}</p>
                                                                                <p className="text-blue-600 font-semibold">Mediana: {hideValues ? '••••••' : formatCurrency(payload[0].payload.p50, currency)}</p>
                                                                                <p className="text-red-600">10°: {hideValues ? '••••••' : formatCurrency(payload[0].payload.p10, currency)}</p>
                                                                                <p className="text-zinc-600 border-t border-zinc-200 pt-1">
                                                                                    Target: {hideValues ? '••••••' : formatCurrency(payload[0].payload.target, currency)}
                                                                                </p>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return null
                                                                }}
                                                            />
                                                            <Area type="monotone" dataKey="p90" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorP90)" />
                                                            <Area type="monotone" dataKey="p50" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorP50)" />
                                                            <Area type="monotone" dataKey="p10" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorP10)" />
                                                            <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-zinc-400">
                                            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-base mb-2">Nessuna simulazione eseguita</p>
                                            <p className="text-sm">Clicca su &#34;Avvia Simulazione&#34; per analizzare probabilisticamente il tuo piano FIRE</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-zinc-200">
                                    <h3 className="text-sm font-semibold text-zinc-900 mb-2">Impostazioni attuali</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-zinc-700">
                                        <SettingsRow label="Target FIRE" value={formatCurrency(settings.fire_target, currency)} />
                                        <SettingsRow label="Withdrawal Rate" value={`${settings.withdrawal_rate}%`} />
                                        <SettingsRow label="Spese Mensili" value={formatCurrency(settings.monthly_expenses, currency)} />
                                        <SettingsRow label="Reddito Mensile" value={formatCurrency(settings.current_monthly_income, currency)} />
                                        <SettingsRow label="Contributo Mensile" value={formatCurrency(settings.monthly_contribution, currency)} />
                                        <SettingsRow label="Rendimento Atteso" value={`${settings.expected_return}%`} />
                                        <SettingsRow label="Età Coast FIRE" value={`${settings.coast_fire_age} anni`} />
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => {
                                                setShowSettingsModal(true)
                                            }}
                                            className="rounded-full border border-zinc-200 hover:bg-zinc-50 px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            Modifica impostazioni
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {showSettingsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">Modifica Impostazioni FIRE</h2>
                                <p className="text-xs text-zinc-500 mt-1">Aggiorna target, contributi e rendimento atteso.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowSettingsModal(false)
                                }}
                                className="h-9 w-9 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 py-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label={`Target FIRE (${currency})`}>
                                    <input
                                        type="number"
                                        value={settings.fire_target}
                                        onChange={(e) => setSettings({ ...settings, fire_target: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="10000"
                                    />
                                </Field>
                                <Field label="Withdrawal Rate (%)">
                                    <input
                                        type="number"
                                        value={settings.withdrawal_rate}
                                        onChange={(e) => setSettings({ ...settings, withdrawal_rate: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                    />
                                </Field>
                                <Field label={`Spese Mensili Desiderate (${currency})`}>
                                    <input
                                        type="number"
                                        value={settings.monthly_expenses}
                                        onChange={(e) => setSettings({ ...settings, monthly_expenses: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="100"
                                    />
                                </Field>
                                <Field label={`Reddito Mensile Corrente (${currency})`}>
                                    <input
                                        type="number"
                                        value={settings.current_monthly_income}
                                        onChange={(e) => setSettings({ ...settings, current_monthly_income: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="100"
                                    />
                                </Field>
                                <Field label={`Contributo Mensile (${currency})`}>
                                    <input
                                        type="number"
                                        value={settings.monthly_contribution}
                                        onChange={(e) => setSettings({ ...settings, monthly_contribution: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="100"
                                    />
                                </Field>
                                <Field label="Rendimento Atteso (%)">
                                    <input
                                        type="number"
                                        value={settings.expected_return}
                                        onChange={(e) => setSettings({ ...settings, expected_return: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="0.5"
                                        min="0"
                                        max="20"
                                    />
                                </Field>
                                <Field label="Età Coast FIRE">
                                    <input
                                        type="number"
                                        value={settings.coast_fire_age}
                                        onChange={(e) => setSettings({ ...settings, coast_fire_age: e.target.value })}
                                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
                                        step="1"
                                        min="30"
                                        max="70"
                                    />
                                </Field>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowSettingsModal(false)
                                    }}
                                    className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={saveSettings}
                                    className="rounded-full bg-zinc-900 hover:bg-black text-white px-4 py-2 text-sm font-medium"
                                >
                                    Salva
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function MiniStat({ label, value }) {
    return (
        <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
            <p className="text-xs text-zinc-500 mb-1">{label}</p>
            <p className="text-xl font-semibold text-zinc-900">{value}</p>
        </div>
    )
}

function MiniTextStat({ label, text }) {
    return (
        <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
            <p className="text-xs text-zinc-500 mb-1">{label}</p>
            <p className="text-base font-semibold text-zinc-900">{text}</p>
        </div>
    )
}

function MetricCard({ icon, label, value, helper, warning, success }) {
    return (
        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-zinc-200">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <p className="text-xs text-zinc-500">{label}</p>
            </div>
            <p className="text-2xl font-semibold text-zinc-900 mb-2">{value}</p>
            {helper && <p className="text-xs text-zinc-500">{helper}</p>}
            {warning && <p className="text-xs text-red-600 mt-1 flex items-center gap-1">{warning}</p>}
            {success && <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-semibold">{success}</p>}
        </div>
    )
}

function SettingsRow({ label, value }) {
    return (
        <div className="flex items-center justify-between border border-zinc-100 rounded-lg px-3 py-2 bg-zinc-50">
            <span className="text-xs text-zinc-500">{label}</span>
            <span className="text-sm font-semibold text-zinc-900">{value}</span>
        </div>
    )
}

function Field({ label, children }) {
    return (
        <label className="text-sm font-medium text-zinc-900 space-y-2 block">
            <span>{label}</span>
            {children}
        </label>
    )
}
