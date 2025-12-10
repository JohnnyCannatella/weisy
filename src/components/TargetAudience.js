export default function TargetAudience() {
    const audiences = [
        {
            icon: '💼',
            title: 'Professionisti e Freelance',
            description: 'Con portafogli 50k+ divisi tra conti, investimenti e broker diversi',
        },
        {
            icon: '📊',
            title: 'Investitori Retail',
            description: 'Che operano su 3+ piattaforme e vogliono una visione unificata',
        },
        {
            icon: '🔥',
            title: 'FIRE Enthusiast',
            description: 'Che traccia il percorso verso l\'indipendenza finanziaria',
        },
    ];

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container-albert px-6 lg:px-20">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700 mb-4">
                        Per chi è Weisy
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 mb-3">
                        Costruito per chi prende sul serio le proprie finanze
                    </h2>
                    <p className="text-sm md:text-base text-zinc-600">
                        Weisy è pensato per chi ha superato i fogli Excel e cerca una soluzione professionale
                        per gestire patrimoni complessi.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {audiences.map((audience, index) => (
                        <div
                            key={index}
                            className="relative group rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50/50 p-6 md:p-7 transition-all duration-200 hover:border-zinc-300 hover:shadow-md"
                        >
                            <div className="mb-4 text-3xl">
                                {audience.icon}
                            </div>
                            <h3 className="text-base font-semibold text-zinc-900 mb-2">
                                {audience.title}
                            </h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                {audience.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Problem statement */}
                <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 md:p-10 shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-6 text-center">
                            Ti riconosci in questi problemi?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {[
                                'Fogli Excel confusi e mai aggiornati',
                                '5+ app diverse per conti, investimenti e budget',
                                'Nessuna visione d\'insieme del patrimonio reale',
                                'Ore perse ogni mese a fare riconciliazione manuale',
                            ].map((problem, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-[2px] flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                        <span className="text-red-600 text-xs font-bold">✕</span>
                                    </div>
                                    <p className="text-sm text-zinc-700">{problem}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-zinc-200">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-700 text-sm font-bold">✓</span>
                                </div>
                                <p className="text-base font-medium text-zinc-900">
                                    Weisy risolve tutto questo in un&apos;unica dashboard professionale
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
