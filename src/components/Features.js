'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Features() {
    const tabs = [
        {
            id: 'ai',
            label: 'Weisy AI',
            icon: '✨',
            description:
                'Chat in-app che risponde sui tuoi dati (net worth, top holdings, cash burn) e ti suggerisce le azioni successive.',
            imageDesktop: '/images/features-accounts-desktop-2.png',
            imageMobile: '/images/features-accounts-mobile-2.png',
        },
        {
            id: 'holdings',
            label: 'Holdings & Prezzi',
            icon: '📊',
            description:
                'Prezzi e cambi live da Yahoo Finance, P&L in tempo reale e gain/loss% per azioni, ETF e crypto.',
            imageDesktop: '/images/features-invest-desktop-2.png',
            imageMobile: '/images/features-invest-mobile.png',
        },
        {
            id: 'accounts',
            label: 'Accounts multi-valuta',
            icon: '🏦',
            description:
                'Conti, broker ed exchange in EUR/USD/GBP con conversioni FX e viste consolidate per portafoglio e istituto.',
            imageDesktop: '/images/features-accounts-desktop-2.png',
            imageMobile: '/images/features-accounts-mobile-2.png',
        },
        {
            id: 'wealth-tracker',
            label: 'Wealth Tracker',
            icon: '💎',
            description:
                'Snapshot del patrimonio netto, storico, note e grafici coerenti con la dashboard.',
            imageDesktop: '/images/features-wealth-desktop.png',
            imageMobile: '/images/features-wealth-mobile.png',
        },
        {
            id: 'cash-flow',
            label: 'Cash Flow',
            icon: '💳',
            description:
                'Categorie, ricorrenze, grafici e filtri entrate/uscite con transazioni rapide e cash burn sempre aggiornato.',
            imageDesktop: '/images/features-cash-desktop-2.png',
            imageMobile: '/images/features-cash-mobile.png',
        },
        {
            id: 'monitoring',
            label: 'Monitoring & Alert',
            icon: '📢',
            description:
                'Top/worst performer, filtri avanzati, refresh prezzi/cambi e alert prezzo/FX (attivi o prossimamente).',
            imageDesktop: '/images/features-fire-desktop.png',
            imageMobile: '/images/features-fire-mobile.png',
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="features" className="bg-gradient-to-b from-zinc-50 via-white to-zinc-100 py-24 md:py-28">
            <div className="container-albert px-6 lg:px-20">
                {/* Heading + tabs + testo */}
                <div className="text-center mb-14 md:mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur text-xs font-semibold text-zinc-700">
                        Funzionalità reali di Weisy
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
                            Weisy è la dashboard unica per holdings, conti e cash flow.
                        </h2>
                        <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto">
                            Scopri come Weisy unifica investimenti, conti multi-valuta, cash flow e alert in un linguaggio chiaro e coerente con la dashboard.
                        </p>
                    </div>

                    {/* Tabs row */}
                    <div className="w-full max-w-4xl mx-auto">
                        <div
                            className="mobile-tab-scroll md:hidden flex items-center gap-2 overflow-x-auto rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur px-2 py-2 shadow-sm"
                            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
                        >
                            {tabs.map((tab) => {
                                const isActive = activeTab.id === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 ${
                                            isActive
                                                ? 'text-white bg-zinc-900 shadow-sm'
                                                : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <span className="text-base">{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 backdrop-blur px-2 py-1 shadow-sm">
                            {tabs.map((tab) => {
                                const isActive = activeTab.id === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 ${
                                            isActive
                                                ? 'text-white bg-zinc-900 shadow-sm'
                                                : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <span className="text-base">{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Descrizione */}
                    <p className="text-sm md:text-base font-medium text-zinc-700 max-w-2xl mx-auto">
                        {activeTab.description}
                    </p>
                </div>

                {/* Image panel */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-4xl pb-16">
                        {/* Desktop card */}
                        <div className="desktop-frame relative aspect-[16/9]">
                            <span className="desktop-camera" aria-hidden="true" />
                            <div className="relative h-full overflow-hidden rounded-[18px] bg-white border border-zinc-200">
                                <Image
                                    src={activeTab.imageDesktop}
                                    alt={`${activeTab.label} desktop`}
                                    fill
                                    sizes="(min-width: 1024px) 900px, 100vw"
                                    className="object-cover"
                                    priority={activeTab.id === 'ai'}
                                />
                            </div>
                        </div>

                        {/* Phone card */}
                        <div className="mt-8 md:mt-0 md:absolute md:-right-4 lg:-right-20 md:-bottom-10 w-[72%] sm:w-[55%] md:w-[27%] max-w-[320px] aspect-[9/16] mx-auto md:mx-0">
                            <div className="phone-frame relative h-full">
                                <span className="phone-notch" aria-hidden="true" />
                                <div className="relative h-full overflow-hidden rounded-[22px] bg-white">
                                    <Image
                                    src={activeTab.imageMobile}
                                    alt={`${activeTab.label} mobile`}
                                    fill
                                    sizes="(min-width: 1024px) 320px, 40vw"
                                    className="object-cover"
                                    priority={activeTab.id === 'ai'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
