import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-100 px-6 pt-20 md:pt-28 pb-14 md:pb-20">
      {/* Rotating Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-35 md:translate-y-70">
            <div className="rotating-circle relative w-full h-full">
                <Image
                    src="/introducing-waly-hero.webp"
                    alt="Waly Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain scale-170 md:scale-150"
                    style={{ transformOrigin: 'center' }}
                />
            </div>
        </div>

      {/* Content */}
      <div className="container-albert relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 leading-tight">
                Gestisci il tuo <span className="text-primary-brand">patrimonio personale</span> in un&#39;unica dashboard
            </h1>
            <p className="text-xl md:text-2xl text-zinc-800 font-semibold">
                Traccia investimenti, conti e obiettivi FIRE. Finalmente chiaro.
            </p>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-600">
            La piattaforma completa per monitorare il tuo net worth, analizzare portafogli e raggiungere l&#39;indipendenza finanziaria.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Entra in waitlist
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Guarda come funziona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
