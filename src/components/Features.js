'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Features() {
    const tabs = [
        {
            id: 'accounts',
            label: 'Accounts',
            icon: '🏦',
            description:
                'Collega tutti i tuoi conti in un unico posto per avere sempre una visione chiara del tuo denaro.',
            imageDesktop: '/images/features-accounts-desktop-2.png',
            imageMobile: '/images/features-accounts-mobile-2.png',
        },
        {
            id: 'invest',
            label: 'Invest',
            icon: '📈',
            description:
                'Monitora i tuoi investimenti e scopri opportunità per far crescere il tuo patrimonio.',
            imageDesktop: '/images/features-invest-desktop-2.png',
            imageMobile: '/images/features-invest-mobile.png',
        },
        {
            id: 'cash-flow',
            label: 'Cash-flow',
            icon: '💳',
            description:
                'Gestisci entrate e uscite.',
            imageDesktop: '/images/features-cash-desktop-2.png',
            imageMobile: '/images/features-cash-mobile.png',
        },
        {
            id: 'wealth-tracker',
            label: 'Wealth',
            icon: '💎',
            description:
                'Visualizza l\'evoluzione del tuo patrimonio netto nel tempo e scopri quanto stai crescendo.',
            imageDesktop: '/images/features-wealth-desktop.png',
            imageMobile: '/images/features-wealth-mobile.png',
        },
        {
            id: 'fire',
            label: 'Fire',
            icon: '🔥',
            description:
                'Calcola quando raggiungerai l\'indipendenza finanziaria e monitora i progressi verso la libertà economica.',
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
                        Nuove funzionalità Waly.app
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
                            Waly vede il quadro completo delle tue finanze.
                        </h2>
                        <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto">
                            Seleziona un&apos;area per vedere come la dashboard gestisce budget, conti, investimenti e sicurezza con lo stesso linguaggio della landing.
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
                                    priority={activeTab.id === 'budget'}
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
                                        priority={activeTab.id === 'budget'}
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
