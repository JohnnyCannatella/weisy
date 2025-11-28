import Image from 'next/image';

export default function Benefits() {
    const miniCards = [
        {
            icon: '📊',
            title: 'Categorizzazione automatica',
            text: 'La categorizzazione smart organizza automaticamente le tue transazioni.',
        },
        {
            icon: '🧠',
            title: 'Monitora le spese',
            text: 'Tieni sotto controllo le tue spese e il flusso di cassa mensile.',
        },
        {
            icon: '📅',
            title: 'Traccia bollette e abbonamenti',
            text: 'Rileviamo bollette e abbonamenti ricorrenti, aiutandoti a ridurli o cancellarli.',
        },
    ];

    return (
        <section id="benefits" className="bg-gradient-to-b from-white via-zinc-50 to-white py-24 md:py-32">
            <div className="container-albert px-6 lg:px-20">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur text-xs font-semibold text-zinc-700">
                        Risparmio e controllo spese
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
                        Sapere dove vanno i tuoi <span className="text-primary-brand">soldi</span>
                    </h2>
                    <p className="text-sm md:text-base text-zinc-600">
                        Monitora spese, flussi di cassa e bollette con lo stesso linguaggio della dashboard,
                        così landing e prodotto restano coerenti.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a
                            href="#features"
                            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                        >
                            Scopri di più
                        </a>
                        <a
                            href="https://wealth-manager-gamma.vercel.app/login"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                        >
                            Prova Waly
                        </a>
                    </div>
                </div>

                {/* Main card + floating callouts */}
                <div className="mt-16 md:mt-20 flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        {/* Soft background glow */}
                        <div className="absolute -inset-x-32 -top-16 h-40 bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.08),transparent_65%)] blur-3xl opacity-80 pointer-events-none" />

                        {/* Main dashboard card */}
                        <div className="desktop-frame relative aspect-[16/9]">
                            <span className="desktop-camera" aria-hidden="true" />
                            <div className="relative h-full overflow-hidden rounded-[18px] bg-white border border-zinc-200">
                                <Image
                                    src="/images/benefits-dashboard-2.png"
                                    alt="Spending and cash flow dashboard"
                                    fill
                                    sizes="(min-width: 1024px) 900px, 100vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Floating card - left (in alto) */}
                        <div className="hidden md:block absolute -left-40 top-20 w-72">
                            <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-md border border-zinc-200 p-4">
                                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 text-primary-brand mb-3">
                                    <span role="img" aria-label="budget">📊</span>
                                </div>
                                <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                                    Monitora il tuo flusso di cassa mensile
                                </h3>
                                <p className="text-xs text-zinc-600">
                                    Traccia entrate, uscite e abbonamenti per trovare opportunità di risparmio.
                                </p>
                            </div>
                        </div>

                        {/* Floating card - right (in basso) */}
                        <div className="hidden lg:block absolute -right-24 bottom-20 w-72">
                            <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-md border border-zinc-200 p-4 flex items-start gap-3">
                                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-green-100 text-green-600 flex-shrink-0">
                                     <span role="img" aria-label="budget">✅</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                                        Hai €600 da spendere
                                    </h3>
                                    <p className="text-xs text-zinc-600 mb-2">
                                        tra giugno e agosto.
                                    </p>
                                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600">Budget</span>
                                </div>
                            </div>
                        </div>

                        {/* Versione mobile delle card (stack sotto) */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                            <div className="rounded-2xl bg-white/90 backdrop-blur shadow-md border border-zinc-200 p-4">
                                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 text-primary-brand mb-3">
                  <span role="img" aria-label="budget">
                    📊
                  </span>
                                </div>
                                <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                                    Monitora il tuo flusso di cassa mensile
                                </h3>
                                <p className="text-xs text-zinc-600 leading-relaxed">
                                    Traccia entrate, uscite e abbonamenti per trovare opportunità di risparmio.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/90 backdrop-blur shadow-md border border-zinc-200 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-green-100 text-green-600 flex-shrink-0">
                                        <span role="img" aria-label="budget">
                                            ✅
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                                            Hai €600 da spendere
                                        </h3>
                                        <p className="text-xs text-zinc-600 mb-2 leading-relaxed">
                                            tra giugno e agosto.
                                        </p>
                                        <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600">
                                            Budget
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mini feature cards sotto (come nello screenshot) */}
                <div className="mt-20 space-y-6">
                    {/* Mobile carousel */}
                    <div
                        className="md:hidden -mx-1 px-1 flex items-stretch gap-3 overflow-x-auto carousel-scroll"
                    >
                        {miniCards.map((card, index) => (
                            <div
                                key={`mobile-${card.title}-${index}`}
                                className="flex-shrink-0 w-[82%] sm:w-[60%] rounded-2xl border border-zinc-200 bg-white shadow-sm px-6 py-7 transition-colors"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <div className="mb-4 text-2xl">
                                    <span role="img" aria-hidden="true">
                                      {card.icon}
                                    </span>
                                </div>
                                <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-zinc-600">
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop grid */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                        {miniCards.map((card, index) => (
                            <div
                                key={`desktop-${card.title}-${index}`}
                                className="rounded-2xl border border-zinc-200 bg-white shadow-sm px-6 py-7 transition-colors"
                            >
                                <div className="mb-4 text-2xl">
                                    <span role="img" aria-hidden="true">
                                      {card.icon}
                                    </span>
                                </div>
                                <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-zinc-600">
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
