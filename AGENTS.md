# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `src/app`; `layout.js` sets shared HTML, `page.js` composes the landing sections.
- Reusable UI sections are in `src/components` (Navigation, Hero, Features, Benefits, Pricing, Stats, FinalCTA, Footer). Favor adding new sections there and keep `page.js` lean.
- Global styles and theme tokens live in `src/app/globals.css`; public assets belong in `public/`.
- Key configs: `next.config.mjs`, `eslint.config.mjs`, `postcss.config.mjs`, `tailwindcss` via the `@import "tailwindcss";` in `globals.css`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start the Next.js dev server on `http://localhost:3000`.
- `npm run build` — production build; run before deploying.
- `npm run start` — serve the production build locally.
- `npm run lint` — lint with the Next.js core web vitals rules.

## Coding Style & Naming Conventions
- Use React function components with hooks; keep components small and focused.
- Indentation: 2 spaces; trailing commas consistent with existing files.
- Component files and exports use `PascalCase` (e.g., `Stats.js`), helpers can use `camelCase`.
- Prefer utility-first styling via Tailwind classes; if shared styles are needed, add tokens/selectors in `globals.css`.
- Keep imports absolute from `@/` (configured via `jsconfig.json`) for app-level modules.

## Layout, Design e SEO per i Componenti
- Brand: usa sempre il nome Weisy (non Waly) in copy e metadata.
- `Navigation` — navbar fissa con blur e shadow on scroll; highlight del link via hash per facilitare UX e anchor SEO. Mantieni CTA “Registrati/Accedi” e aria-label sui toggle mobili.
- `Hero` — sezione full-height con background rotante `/introducing-waly-hero.webp`; doppio `h2` per claim. Mantieni alt descrittivo e CTA primaria a `#pricing`; evitare più di un `h1` nella pagina.
- `Features` — tab interattivi (stateful) con immagini desktop/mobile; ID `#features` per ancore. Aggiorna `imageDesktop/mobile` con asset compressi e alt parlante; CTA “Scopri di più” punta a risorse correlate.
- `Benefits` — card principale con callout flottanti e mini-cards. Usa testo breve e parole chiave (“risparmio”, “bollette”) per SEO semantico. Controlla contrasto nelle card blur.
- `Pricing` — tre card con badge “PIÙ POPOLARE”. Mantieni heading con keyword “piano”/“prezzi”; CTA link a `#signup`. Se aggiungi toggle mensile/annuale, conserva gli ID per deep-link.
- `Stats` — numeri con copy sociale e CTA finale; se aggiorni valori, mantieni formati consistenti (es. `200K+`). Radial background decorativo, assicurarsi che il testo resti leggibile.
- `FinalCTA` — gradiento blu con copy su Weisy Smart, CTA testuale. Evita testo troppo lungo in `h2` per mantenere hierarchy chiara; pulsanti con testo descrittivo migliorano la scansione.
- `Footer` — colonne linkate con ancore; aggiorna copyright dinamico. Assicurati che i link abbiano titoli coerenti e non vuoti; aggiungi `rel` adeguato per link esterni.

## SEO / Indexing
- Canonical esplicito in `src/app/layout.js` (`alternates.canonical` + `metadataBase` su `https://weisy.io`), `openGraph.url` e OG/Twitter image configurati (usa asset in `public/`, es. `/introducing-waly-hero.webp` o `/og-weisy.png` se aggiunto).
- Sitemap servita da `src/app/sitemap.js` → `https://weisy.io/sitemap.xml`; mantieni aggiornata se aggiungi nuove pagine.
- Robots: default `index/follow`; se mai crei uno staging, setta `NEXT_PUBLIC_ENV=staging` (o robots dedicato) per `noindex/nofollow`.
- Dopo deploy, registra dominio e sitemap in Google Search Console; assicurati che il `robots.txt` in `public/` rifletta il dominio corretto.

## Testing Guidelines
- No automated tests exist yet; add coverage when changing logic-heavy components.
- Prefer component/integration tests with React Testing Library or Playwright; co-locate tests as `<Component>.test.js` or in `src/__tests__/`.
- Run `npm run lint` before pushing; add future `npm test` script when introducing a test runner.

## Commit & Pull Request Guidelines
- Commit messages in history use short, imperative subjects (e.g., “Enhance navigation component…”). Follow that style; keep subjects under ~72 chars.
- For PRs, include: what changed, why, and any linked issues. Add screenshots or clips for UI changes.
- Ensure `npm run lint` and `npm run build` pass before requesting review; mention any follow-up work or TODOs explicitly.

## Security & Configuration Tips
- Secrets and API keys belong in `.env.local` (never committed). Reference them with `process.env`.
- Validate any new external dependencies for size and security; prefer built-in Next.js features when possible.

---

# Landing Page Weisy — contenuti e stile coerenti con la dashboard
Versione arricchita: mantiene i messaggi esistenti, aggiunge le funzionalità reali (Weisy AI, holdings, accounts, cash flow, wealth tracker, monitoring/alert) e il linguaggio visivo zinc usato nell’app.

## Stile visivo (allineato alla dashboard)
- Sfondo `bg-zinc-50`, sezioni in `bg-white rounded-3xl border border-zinc-200 shadow-sm`.
- CTA primaria pill scura `bg-zinc-900 text-white rounded-full px-5 py-3 hover:bg-black`; secondaria outline `border-zinc-200 text-zinc-900 hover:bg-zinc-100 rounded-full`.
- Tipi: titoli `text-3xl/4xl font-bold text-zinc-900`, paragrafi `text-base text-zinc-600`, label `text-xs uppercase tracking-wide text-zinc-500`.
- Griglie: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4/6`, sezioni con `space-y-6/8`. Hover `hover:-translate-y-1 hover:shadow-md transition-all`.

## Hero (testi migliorati, non stravolti)
- Titolo: “Controlla investimenti, conti e cash flow con insight AI in tempo reale”.
- Sottotitolo: “Weisy unifica holdings, transazioni e patrimonio netto in un’unica vista. L’assistente AI risponde sui tuoi dati e ti guida nelle decisioni quotidiane.”
- Badge: “Weisy AI live”, “Multi‑valuta EUR/USD/GBP”, “Privacy-first”.
- CTA: primario “Inizia gratis”, secondario “Guarda la demo”.
- Visual: card mock `rounded-3xl border bg-white shadow-lg` con chip “Holdings”, “Cash Flow”, “Weisy AI”.

## Trust rapido
- 3 stat card `rounded-2xl border bg-white px-4 py-3`: “Prezzi e cambi live”, “Supabase + RLS”, “Tour guidato <5 min”.

## Feature grid (2x3) con funzionalità reali
1) **Weisy AI** — Chat in-app che risponde su holdings, conti e cash flow (net worth, top holdings, cash burn).
2) **Holdings & Prezzi** — Ticker da Yahoo Finance, P&L live, gain/loss%.
3) **Accounts multi-valuta** — Conti/broker/exchange con conversioni FX.
4) **Cash Flow** — Categorie, grafici, filtri entrate/uscite; transazioni rapide.
5) **Wealth Tracker** — Snapshot patrimonio, storico, note, grafici.
6) **Monitoring & Alert** — Top/worst performer, filtri avanzati, refresh prezzi/cambi, alert prezzo/FX (se attivi) o “prossimamente”.

## Blocco AI dedicato
- Layout split testo + mock chat.
- Copy: “Chiedi il tuo net worth”, “Quali sono le top holdings?”, “Quanto sto spendendo questo mese?”.
- Card chat: header scuro `bg-zinc-900 text-white` con badge “Live”; body `bg-white border rounded-2xl`.

## Dashboard overview (coerenza)
- Sezione su gradient leggero `from-zinc-50 via-white to-zinc-100` con 3 mini-card: Portfolio, Cash Flow, Allocazione (pie/area placeholder, KPI pill `border-l-4` verde/rosso dove serve).

## Sicurezza e privacy
- Card `rounded-2xl border bg-white p-5`: dati su Supabase con RLS, cifratura in transito, nessuna vendita dati, export CSV/JSON da Settings, cancellazione account.

## CTA finale
- Titolo: “Pronto a vedere tutti i tuoi numeri in un unico posto?”.
- Sottotitolo: “Onboarding guidato, tour interattivo e setup in meno di 5 minuti.”
- CTA doppia: “Inizia gratis” + “Parla con noi”.

## FAQ breve
- Prezzi/modelli (free/coming soon), sicurezza dati (Supabase/RLS), integrazioni prezzi/FX (Yahoo Finance), cancellazione ed export.
