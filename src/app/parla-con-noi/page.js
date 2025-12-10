export const metadata = {
  title: "Parla con noi | Weisy",
  description: "Mettiti in contatto con il team Weisy.",
};

const CONTACT_EMAIL = "j.cannatella95@gmail.com";
import Navigation from "@/components/Navigation";

export default function ParlaConNoiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100">
      <Navigation />
      <main className="pt-24 md:pt-28">
      <div className="container-albert px-6 lg:px-20 pb-20 md:pb-24 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 shadow-sm">
            Contatti
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900">
            Siamo qui per aiutarti
          </h1>
          <p className="text-sm md:text-base text-zinc-600">
            Invia una mail e ti risponderemo al più presto con dettagli su waitlist, roadmap e prodotti in arrivo.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-zinc-200 shadow-sm p-6 md:p-8 space-y-4 max-w-3xl">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <p className="text-sm text-zinc-600">
            Se preferisci, includi nel messaggio anche il contesto (es: implementazione, partnership, beta) così possiamo indirizzarti alla persona giusta.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-3xl">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900">Preferisci registrarti?</p>
            <p className="text-sm text-zinc-600">
              Vai direttamente alla waitlist per ricevere gli update sul lancio.
            </p>
          </div>
          <Link
            href="https://app.weisy.io/login"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Registrati
          </Link>
        </div>
      </div>
      </main>
    </div>
  );
}
import Link from "next/link";
