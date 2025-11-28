'use client';

import { useState, useEffect } from 'react';
import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"
import { usePathname } from "next/navigation";

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const pathname = usePathname();
    const isHome = pathname === '/';

    const navLinks = [
        { href: isHome ? '#features' : '/#features', label: 'Funzionalità', badge: 'Nuove' },
        { href: isHome ? '#benefits' : '/#benefits', label: 'Vantaggi' },
        { href: isHome ? '#pricing' : '/#pricing', label: 'Prezzi' },
        { href: isHome ? '#waitlist' : '/#waitlist', label: 'Waitlist' },
        { href: '/roadmap', label: 'Roadmap' },
    ];
    function cn(...inputs) {
        return twMerge(clsx(inputs))
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            setActiveHash(window.location.hash || "");
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl shadow-card-sm border-b border-zinc-200 dark:border-zinc-800'
                        : 'bg-transparent border-b border-transparent'
                )}
            >
                <div className="mx-auto max-w-6xl">
                    <div
                        className={`flex items-center justify-between px-4 md:px-6 lg:px-0 transition-all duration-300 ${
                            scrolled ? 'h-14' : 'h-20'
                        }`}
                    >
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2">
                            <span className="text-xl font-semibold tracking-tight text-black dark:text-white">
                                Waly
                            </span>
                        </a>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex flex-1 items-center justify-center">
                            <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white/80 backdrop-blur px-1 py-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                                {navLinks.map((link) => {
                                    const isActive = isHome && activeHash === link.href;

                                    return (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                'group inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-200 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 dark:focus-visible:ring-white/20',
                                                isActive
                                                    ? 'text-white bg-zinc-900 shadow-sm dark:text-zinc-900 dark:bg-white'
                                                    : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            {link.label}
                                            {link.badge && (
                                                <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-200/80 rounded-full px-2 py-0.5 dark:text-zinc-100 dark:bg-zinc-700/70">
                                                    {link.badge}
                                                </span>
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center justify-end flex-1 gap-3">
                            <a
                                href="https://wealth-manager-gamma.vercel.app/login"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-900 border border-zinc-200 bg-white/80 backdrop-blur hover:bg-zinc-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:text-white dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:bg-zinc-800 dark:focus-visible:ring-white/30"
                            >
                                Registrati
                            </a>

                            <a
                                href="#waitlist"
                                className="inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold bg-zinc-900 text-white hover:bg-black shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus-visible:ring-white/30"
                            >
                                Entra in waitlist
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={cn(
                                'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 dark:focus-visible:ring-white/20',
                                scrolled
                                    ? 'bg-white/90 text-zinc-900 hover:bg-zinc-100 border border-zinc-200 shadow-sm'
                                    : 'bg-white/70 text-zinc-900 hover:bg-zinc-100 border border-transparent shadow-sm'
                            )}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <button
                        type="button"
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Chiudi menu"
                    />

                    <div className="fixed inset-x-4 top-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center justify-between rounded-lg px-3.5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 hover:border hover:border-zinc-200 transition-all dark:text-white dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                        <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-200/80 rounded-full px-2 py-0.5 dark:text-zinc-100 dark:bg-zinc-700/70">
                                            {link.badge}
                                        </span>
                                    )}
                                </a>
                            ))}
                        </nav>

                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-3" />

                        <a
                            href="#pricing"
                            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 text-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus-visible:ring-white/30"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Inizia gratis
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
