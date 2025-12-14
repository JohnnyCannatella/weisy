export const metadata = {
  title: "Roadmap | Weisy",
  description:
    "Percorso di lancio, sicurezza e prossime funzionalità di Weisy.",
};

import Link from "next/link";
import Navigation from "@/components/Navigation";

const roadmapSections = [
  {
    title: "Checklist iniziale",
    items: [
      "Fai un check-up della tua situazione, analizza entrate e uscite, e cerca di capire quanto puoi realisticamente risparmiare ogni anno.",
      "Dopodiché, impara a leggere i documenti delle banche (come il Rendiconto MiFID) e assicurati di non pagare commissioni inutili.",
      "Features",
    ],
  },
  {
    title: "Security",
    items: [
      "Attivare Network Restrictions su supabase",
      "Middleware Next.js per bloccare l’accesso alle route protette senza sessione/verifica email (oggi è solo client-side).",
      "Rate limiting/CAPTCHA su login/signup per ridurre brute force.",
    ],
  },
  {
    title: "Features 2.0",
    items: [
      "Creazione App mac + IOS",
      "Notifications System",
      "Cache Strategy",
      "Automazione price con Cron",
      "Benchmark Comparison",
      "AI-Powered Insights",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100">
      <Navigation />
      <main className="pt-24 md:pt-28">
      <div className="container-albert px-6 lg:px-20 pb-20 md:pb-24 space-y-12">
        <header className="space-y-3 max-w-3xl">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 shadow-sm">
            Roadmap pubblica
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900">
            Priorità di lancio e sviluppo
          </h1>
          <p className="text-sm md:text-base text-zinc-600">
            Questa roadmap elenca le attività chiave per lanciare Weisy con
            sicurezza, trasparenza e coerenza con la dashboard. Aggiorneremo
            gli stati man mano che le milestone avanzano.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-zinc-900">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-sm border border-zinc-300 bg-white" aria-hidden="true">
                      {/* unchecked indicator */}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900">
              Vuoi aggiornamenti sullo stato?
            </p>
            <p className="text-sm text-zinc-600">
              Iscriviti alla waitlist per ricevere il changelog mensile e le date
              dei prossimi rilasci.
            </p>
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Vai alla waitlist
          </Link>
        </div>
      </div>
      </main>
    </div>
  );
}
