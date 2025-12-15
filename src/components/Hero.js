import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-100 px-6 pt-20 md:pt-28 pb-14 md:pb-20">
      {/* Rotating Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-35 md:translate-y-70">
            <div className="rotating-circle relative w-full h-full">
                <Image
                    src="/introducing-waly-hero.webp"
                    alt="Weisy background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain scale-[1.7] md:scale-[1.5]"
                    style={{ transformOrigin: 'center' }}
                />
            </div>
        </div>

      {/* Content */}
      <div className="container-albert relative z-10 text-center">
	        <div className="max-w-4xl mx-auto space-y-6">
	          {/* Main Headline */}
	            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 leading-tight">
	                Tutto il tuo patrimonio, in un unico posto.
	            </h1>
	            <h2 className="text-xl md:text-xl text-zinc-500 font-medium leading-snug">
	                Weisy unifica investimenti, conti e spese e usa l’AI per aiutarti a prendere decisioni consapevoli sui tuoi dati (net worth, cash burn, top holdings) e ti guida nelle decisioni quotidiane
	            </h2>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Weisy AI live', 'Multi-valuta EUR/USD/GBP', 'Privacy-first'].map((chip) => (
                <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white text-[10px]">•</span>
                  {chip}
                </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Inizia gratis
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Scopri le funzionalità
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
