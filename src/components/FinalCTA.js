export default function FinalCTA() {
    return (
        <section id="cta" className="py-24 md:py-32 flex justify-center px-6">
            <div className="container-albert">
                <div className="relative mx-auto max-w-6xl rounded-[32px] bg-gradient-to-br from-[#0b1224] via-[#0d152d] to-[#0f172a] text-white overflow-hidden shadow-2xl border border-white/10">
                    {/* Pattern overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_55%)]" />
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-8 md:px-16 py-12 md:py-14 items-center">
                        {/* Left: copy */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-[11px] font-semibold uppercase tracking-wide mb-4">
                                Automazioni e insight
                            </div>
                            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                                Pronto a vedere tutti i tuoi numeri in un unico posto?
                            </h2>
                            <p className="max-w-md text-sm md:text-base text-white/85 mb-8">
                                Onboarding guidato, tour interattivo e setup in meno di 5 minuti. Weisy Smart collega conti, holdings e cash flow e ti mostra subito cosa sta succedendo.
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                {['Weisy AI live', 'Multi-valuta EUR/USD/GBP', 'Supabase + RLS', 'Export CSV/JSON'].map((chip) => (
                                    <span
                                        key={chip}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
                                    >
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-zinc-900 text-[10px]">•</span>
                                        {chip}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href="https://app.weisy.io/login"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-white text-zinc-900 px-7 py-3 text-sm font-semibold shadow-sm hover:bg-zinc-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                >
                                    Inizia gratis
                                </a>
                                <a
                                    href="/parla-con-noi"
                                    className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                >
                                    Parla con noi
                                </a>
                            </div>
                        </div>

                        {/* Right: mock UI card stack */}
                        <div className="relative">
                            {/* Genius icon pill */}
                            <div className="mb-4 flex justify-end">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 border border-white/20 backdrop-blur shadow-sm">
                                    <span className="text-xl">⚡</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Top message card */}
                                <div className="rounded-2xl bg-white/12 border border-white/25 px-4 py-3 text-[11px] leading-snug shadow-sm">
                                    <p className="font-medium text-white">
                                        Allocazione completata: ecco i tuoi saldi consolidati e dove stai investendo.
                                    </p>
                                </div>

                                {/* Primary funding source */}
                                <div className="rounded-2xl bg-white/10 border border-white/25 px-4 py-3 flex items-center justify-between text-[11px] shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="text-white/70">Fonte principale</span>
                                        <span className="mt-1 font-medium text-white">
                      Banca Intesa •••5135
                    </span>
                                    </div>
                                    <span className="text-right font-medium">€9.543,40</span>
                                </div>

                                {/* Split rows */}
                                <div className="flex flex-col gap-3 pl-6 mt-1">
                                    {/* Savings */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center rounded-full bg-white text-zinc-900 px-3 py-1 text-[11px] font-semibold shadow-md">
                                            70%
                                        </div>
                                        <div className="flex-1 rounded-2xl bg-white/10 border border-white/25 px-4 py-3 flex items-center justify-between text-[11px]">
                                        <div className="flex flex-col">
                                                <span className="text-white/65 text-[10px]">Risparmio</span>
                                                <span className="mt-1 font-medium">Weisy Savings</span>
                                            </div>
                                            <span className="font-medium">€8.848,20</span>
                                        </div>
                                    </div>

                                    {/* Investing */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center rounded-full bg-white text-zinc-900 px-3 py-1 text-[11px] font-semibold shadow-md">
                                            30%
                                        </div>
                                        <div className="flex-1 rounded-2xl bg-white/10 border border-white/25 px-4 py-3 flex items-center justify-between text-[11px]">
                                        <div className="flex flex-col">
                                                <span className="text-white/65 text-[10px]">Investimenti</span>
                                                <span className="mt-1 font-medium">Weisy Investing</span>
                                            </div>
                                            <span className="font-medium">€665,12</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow behind cards */}
                            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-blue-300/30 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
