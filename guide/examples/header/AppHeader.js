// components/header/AppHeader.js - Modern Clean Design
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/AuthContext'
import Navigation from '@/src/components/header/Navigation'
import {
    RefreshCw,
    Eye,
    EyeOff,
    LogOut,
    User,
    Settings,
    ChevronDown,
    Sparkles,
    BookOpen,
    FileText
} from 'lucide-react'

export default function AppHeader({
    showCurrencySelector = true,
    showPrivacyToggle = true,
    currency,
    onCurrencyChange,
    hideValues,
    onHideValuesChange
}) {
    const { user, signOut, reopenOnboarding } = useAuth()
    const router = useRouter()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Click outside handler to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false)
            }
        }

        if (isProfileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isProfileMenuOpen])

    const handleRefresh = async () => {
        setIsRefreshing(true)

        try {
            const res = await fetch('/api/update-prices', { method: 'POST' })
            const json = await res.json()

            if (!res.ok || !json.success) {
                throw new Error(json.error || 'Errore aggiornamento prezzi')
            }

            window.location.reload()
        } catch (err) {
            console.error('Errore aggiornamento prezzi:', err)
        } finally {
            setIsRefreshing(false)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    const handleNavigateToSettings = () => {
        setIsProfileMenuOpen(false)
        router.push('/settings')
    }

    const handleOpenGuide = () => {
        setIsProfileMenuOpen(false)
        router.push('/guide')
    }

    const handleOpenTerms = () => {
        setIsProfileMenuOpen(false)
        router.push('/terms')
    }

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="h-16 flex items-center justify-between gap-6">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <span  className={`text-2xl font-semibold tracking-tight transition-colors duration-300 text-black`}>Weisy</span>
                    </div>

                    {/* Navigation - Center */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <Navigation />
                    </div>

                    {/* Actions - Right */}
                    <div className="flex items-center gap-2">
                        {/* Currency Selector */}
                        {showCurrencySelector && currency && onCurrencyChange && (
                            <select
                                value={currency}
                                onChange={(e) => onCurrencyChange(e.target.value)}
                                className="text-sm px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-zinc-700 hover:bg-zinc-100 transition-colors"
                                aria-label="Seleziona valuta"
                            >
                                <option value="EUR">EUR €</option>
                                <option value="USD">USD $</option>
                                <option value="GBP">GBP £</option>
                            </select>
                        )}

                        {/* Privacy Toggle */}
                        {showPrivacyToggle && typeof hideValues !== 'undefined' && onHideValuesChange && (
                            <button
                                onClick={() => onHideValuesChange(!hideValues)}
                                title={hideValues ? "Mostra valori" : "Nascondi valori"}
                                className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            >
                                {hideValues ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-50"
                            title="Aggiorna prezzi"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>

                        {/* Profile Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center gap-2 p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                                title="Menu profilo"
                            >
                                <User className="h-4 w-4" />
                                <ChevronDown className={`h-3 w-3 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-zinc-200 py-2 z-50">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-zinc-200">
                                        <p className="text-sm font-medium text-zinc-900 truncate">
                                            {user?.email || 'User'}
                                        </p>
                                        <p className="text-xs text-zinc-500 mt-0.5">
                                            Account attivo
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <button
                                            onClick={handleNavigateToSettings}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Impostazioni</span>
                                        </button>

                                        <button
                                            onClick={handleOpenGuide}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            <span>Guida</span>
                                        </button>

                                        <button
                                            onClick={handleOpenTerms}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                        >
                                            <FileText className="h-4 w-4" />
                                            <span>Termini di Servizio</span>
                                        </button>

                                        <div className="my-1 border-t border-zinc-200"></div>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu - Show only on mobile */}
                        <div className="md:hidden">
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
