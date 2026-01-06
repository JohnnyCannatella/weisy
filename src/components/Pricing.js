'use client';
import { useState } from 'react';
import { LIFETIME_CONFIG, getLifetimeStatus } from '@/config/lifetime';

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);
    const lifetimeStatus = getLifetimeStatus();

    const plans = [
        {
            name: 'Free',
            price: '€0',
            period: '',
            description: 'Parti con holdings e conti monitorati in modo chiaro.',
            savings: null,
            features: [
                'Fino a 5 holdings con prezzi live',
                '2 conti bancari multi-valuta',
                'Dashboard base holdings + cash flow',
                'Snapshot patrimonio netto',
                'Export CSV/JSON base',
            ],
            cta: 'Inizia gratis',
            ctaHref: 'https://app.weisy.io/login?plan=free',
            featured: false,
            type: 'free',
        },
        // Lifetime plan - only show if available
        ...(lifetimeStatus.isAvailable ? [{
            name: 'Lifetime Founder',
            price: '€149',
            period: '',
            originalPrice: '€299',
            description: 'Accesso permanente alle funzionalità core e supporto founder.',
            badge: 'EARLY BIRD',
            limitedOffer: lifetimeStatus.message,
            spotsRemaining: lifetimeStatus.remaining,
            urgencyLevel: lifetimeStatus.urgencyLevel,
            features: [
                'Holdings illimitati con prezzi live',
                'Conti illimitati multi-valuta',
                'FIRE tracker e storico patrimonio',
                'Cash flow analysis e budget',
                'Dashboard avanzata e report',
                'Export PDF + CSV/JSON',
                'Bug fixes e sicurezza lifetime garantiti',
            ],
            excludedFeatures: [
                'Nessun AI insights',
                'Niente feature avanzate future',
                'No integrazioni automatiche',
            ],
            cta: 'Accesso lifetime',
            ctaHref: 'https://app.weisy.io/login?plan=lifetime',
            featured: false,
            type: 'lifetime',
        }] : []),
        {
            name: 'Pro',
            price: isAnnual ? '€119' : '€11.99',
            period: isAnnual ? '/anno' : '/mese',
            savings: isAnnual ? '2 mesi inclusi (risparmi ~€20)' : 'Prova gratuita 7 giorni inclusa',
            description: 'AI, automazioni e tutto ciò che arriverà.',
            badge: 'PIÙ POPOLARE',
            features: [
                'Tutto in Lifetime',
                '✨ Weisy AI su holdings, conti e cash flow',
                '✨ Previsioni e alert intelligenti',
                '✨ Automazione cash flow e riconciliazioni',
                '✨ Integrazioni bancarie auto',
                '✨ Rebalancing intelligente',
                'Tutte le feature future incluse',
                'Analytics avanzate AI-powered',
                'Supporto prioritario',
            ],
            cta: 'Inizia ora',
            ctaHref: 'https://app.weisy.io/login?plan=pro',
            trialNote: 'Prova gratuita 7 giorni, poi puoi tornare a Free quando vuoi.',
            featured: true,
            type: 'subscription',
        },
    ];

    return (
        <section id="pricing" className="bg-gradient-to-b from-zinc-50 via-white to-zinc-100 py-24 md:py-32">
            <div className="container-albert px-6 lg:px-20">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur text-xs font-semibold text-zinc-700">
                        Piani e prezzi
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
                        Scegli il piano giusto per il tuo denaro.
                    </h2>
                    <p className="text-sm md:text-base text-zinc-600">
                        Prova gratis, blocca il prezzo founder o passa al Pro con AI: i piani parlano lo stesso linguaggio della dashboard.
                    </p>
                </div>

                {/* Toggle Annual/Monthly */}
                <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
                    <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-zinc-900' : 'text-zinc-500'}`}>
                        Mensile
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="relative inline-flex h-8 w-14 items-center rounded-full bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                        role="switch"
                        aria-checked={isAnnual}
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                isAnnual ? 'translate-x-7' : 'translate-x-2'
                            }`}
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-zinc-900' : 'text-zinc-500'}`}>
                        Annuale
                    </span>
                    {isAnnual && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                            2 mesi inclusi
                        </span>
                    )}
                </div>
                <p className="text-xs text-zinc-600 text-center mb-6">
                    Pro include una prova gratuita di 7 giorni. L&apos;annualità evidenzia il risparmio (~2 mesi inclusi) e riduce i rinnovi mensili.
                </p>

                {/* Pricing cards */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col h-full rounded-3xl border bg-white shadow-sm p-6 md:p-7 transition-all duration-200 ${
                                plan.featured
                                    ? 'border-zinc-900 shadow-lg ring-2 ring-zinc-900/10 md:-translate-y-1'
                                    : plan.type === 'lifetime'
                                        ? 'border-amber-300 bg-gradient-to-br from-amber-50/70 to-white'
                                        : 'border-zinc-200'
                            }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center rounded-full px-4 py-1 text-[11px] font-semibold tracking-wide bg-zinc-900 text-white">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col gap-5 h-full">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="space-y-1">
                                            <h3 className="text-base font-semibold text-zinc-900">{plan.name}</h3>
                                            <p className="text-sm text-zinc-600">{plan.description}</p>
                                        </div>
                                        {plan.type === 'subscription' && (
                                            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-700">
                                                Include AI
                                            </span>
                                        )}
                                    </div>

                                    {plan.limitedOffer && (
                                        <div className="space-y-2">
                                            <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                                                plan.urgencyLevel === 'high'
                                                    ? 'bg-red-100 text-red-900'
                                                    : plan.urgencyLevel === 'medium'
                                                    ? 'bg-orange-100 text-orange-900'
                                                    : 'bg-amber-100 text-amber-900'
                                            }`}>
                                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                {plan.limitedOffer}
                                            </div>
                                            {/* Progress bar */}
                                            {plan.spotsRemaining !== undefined && (
                                                <div className="w-full">
                                                    <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all duration-500 ${
                                                                plan.urgencyLevel === 'high'
                                                                    ? 'bg-red-500'
                                                                    : plan.urgencyLevel === 'medium'
                                                                    ? 'bg-orange-500'
                                                                    : 'bg-amber-500'
                                                            }`}
                                                            style={{ width: `${(plan.spotsRemaining / LIFETIME_CONFIG.total) * 100}%` }}
                                                        />
                                                    </div>
                                                    <p className="mt-1 text-[10px] text-zinc-500">
                                                        {LIFETIME_CONFIG.sold} venduti · {plan.spotsRemaining} rimasti
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-baseline gap-2">
                                        {plan.originalPrice && (
                                            <span className="text-sm text-zinc-400 line-through">
                                                {plan.originalPrice}
                                            </span>
                                        )}
                                        <span className="text-3xl md:text-4xl font-semibold text-zinc-900">
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-xs text-zinc-500">{plan.period}</span>
                                        )}
                                    </div>
                                    {plan.savings && (
                                        <p className="text-xs font-medium text-green-700">
                                            {plan.savings}
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-2.5">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white shrink-0">
                                                ✓
                                            </span>
                                            <span className="text-xs text-zinc-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.excludedFeatures && plan.excludedFeatures.length > 0 && (
                                    <div className="border-t border-zinc-200 pt-4 space-y-2">
                                        <p className="text-[10px] uppercase tracking-wide text-zinc-500 font-semibold">
                                            Non incluso
                                        </p>
                                        <ul className="space-y-2.5">
                                            {plan.excludedFeatures.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-[10px] text-zinc-500 shrink-0">
                                                        ✕
                                                    </span>
                                                    <span className="text-xs text-zinc-500">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-auto">
                                    <a
                                        href={plan.ctaHref || '#signup'}
                                        {...(plan.ctaHref?.startsWith('http')
                                          ? { target: '_blank', rel: 'noreferrer' }
                                          : {})}
                                        className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                                            plan.featured
                                                ? 'bg-zinc-900 text-white hover:bg-black shadow-sm hover:shadow-md focus-visible:ring-zinc-900'
                                                : plan.type === 'lifetime'
                                                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow-md focus-visible:ring-amber-500'
                                                    : 'border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 focus-visible:ring-zinc-900'
                                        }`}
                                    >
                                        {plan.cta}
                                    </a>
                                    {plan.trialNote && (
                                        <p className="mt-3 text-center text-[11px] text-zinc-600">
                                            {plan.trialNote}
                                        </p>
                                    )}
                                    {plan.type === 'lifetime' && (
                                        <p className="mt-3 text-center text-[11px] text-zinc-500">
                                            Pagamento unico. Nessun rinnovo.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info aggiuntive */}
                <div className="mt-14 md:mt-16 space-y-6">
                    {/* FAQ veloce */}
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left bg-white/70 backdrop-blur border border-zinc-200 rounded-2xl p-6 shadow-sm">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-zinc-900">
                                Cosa succede dopo il periodo Founder?
                            </h4>
                            <p className="text-xs text-zinc-600">
                                Il Lifetime Founder sarà disponibile solo per i primi 200 utenti. Dopo, sarà disponibile solo la subscription Pro.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-zinc-900">
                                Posso passare da Lifetime a Pro?
                            </h4>
                            <p className="text-xs text-zinc-600">
                                Sì! Gli utenti Lifetime possono fare upgrade a Pro in qualsiasi momento per accedere alle funzionalità AI.
                            </p>
                        </div>
                    </div>

                    <div className="text-center text-xs text-zinc-500">
                        Tutti i prezzi sono in Euro. IVA inclusa dove applicabile.
                    </div>
                </div>
            </div>
        </section>
    );
}
