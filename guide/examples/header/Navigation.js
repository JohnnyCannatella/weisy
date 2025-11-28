// app/components/Navigation.js - Modern Clean Design
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    TrendingUp,
    BarChart3,
    Target,
    Wallet,
    PieChart,
    Menu,
    X,
    Activity,
    MoreHorizontal,
    ArrowLeftRight
} from 'lucide-react'
import { cn } from '@/src/lib/utils'

const mainNav = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Holdings', href: '/holdings', icon: PieChart },
    { name: 'Accounts', href: '/accounts', icon: Wallet },
    { name: 'Cash Flow', href: '/cash-flow', icon: ArrowLeftRight },
    { name: 'Wealth', href: '/wealth-tracker', icon: TrendingUp },
]

const secondaryNav = [
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Monitor', href: '/monitoring', icon: Activity },
    { name: 'FIRE', href: '/fire-tracker', icon: Target }
]

export default function Navigation() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [moreMenuOpen, setMoreMenuOpen] = useState(false)
    const moreMenuRef = useRef(null)
    const mobileMenuRef = useRef(null)

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
                setMoreMenuOpen(false)
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const DesktopNavLink = ({ item }) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
            <Link
                href={item.href}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                        ? 'text-blue-600 bg-blue-50 rounded-full'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg'
                )}
            >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
            </Link>
        )
    }

    const MobileNavLink = ({ item, onClick }) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
            <Link
                href={item.href}
                onClick={onClick}
                className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg',
                    isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-zinc-700 hover:bg-zinc-50'
                )}
            >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
            </Link>
        )
    }

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
                {/* Main Navigation */}
                {mainNav.map((item) => (
                    <DesktopNavLink key={item.name} item={item} />
                ))}

                {/* More Menu */}
                <div className="relative" ref={moreMenuRef}>
                    <button
                        onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                        className={cn(
                            'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
                            moreMenuOpen
                                ? 'text-zinc-900 bg-zinc-100'
                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                        )}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {moreMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-2xl shadow-lg p-2 z-50">
                            <div className="grid grid-cols-2 gap-1">
                                {secondaryNav.map((item) => {
                                    const isActive = pathname === item.href
                                    const Icon = item.icon

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMoreMenuOpen(false)}
                                            className={cn(
                                                'flex flex-col items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-colors',
                                                isActive
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden" ref={mobileMenuRef}>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {mobileMenuOpen && (
                    <div className="fixed inset-x-4 top-20 bg-white border border-zinc-200 rounded-2xl shadow-xl p-3 z-50">
                        <nav className="flex flex-col gap-1">
                            {/* Main Items */}
                            {mainNav.map((item) => (
                                <MobileNavLink
                                    key={item.name}
                                    item={item}
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                            ))}

                            {/* Divider */}
                            <div className="h-px bg-zinc-200 my-2"></div>

                            {/* Secondary Items */}
                            {secondaryNav.map((item) => (
                                <MobileNavLink
                                    key={item.name}
                                    item={item}
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </>
    )
}