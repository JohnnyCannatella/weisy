# Analisi piani di pagamento Weisy

## Contesto attuale
- Free: €0, fino a 5 holdings e 2 conti, dashboard base, net worth, export CSV.
- Lifetime Founder: €149 (ancora attivo) vs listino €299; holdings/conti illimitati, FIRE tracker, cash flow, dashboard avanzata, export PDF; esclusi AI, future features e integrazioni automatiche.
- Pro (subscription): €9.99/mese o €99/anno (-€20), include tutto il Lifetime + AI, automazioni, integrazioni bancarie, rebalancing, analytics, supporto prioritario.

## Valutazione prezzistica
- Il Pro a €9.99/mese e €99/anno e' competitivo per una suite finanza personale+AI; l'annuale con solo €20 di sconto e' poco differenziante (10-12 mesi e' piu' standard). Suggerito: €109-119/anno o €9.99→€12.99 con annuale €119 per alzare ARPU senza penalizzare conversione early.
- Lifetime a €149 con AI esclusa limita cannibalizzazione; tenerlo limitato nel tempo (counter <200) e visibile solo fino a sold-out. Valutare upsell AI add-on (€4-5/mese) per chi e' gia' Lifetime.
- Free e' sufficiente come playground se si limita bene la profondita' (5 holdings/2 conti) e si blocca AI; buono per waitlist e share virale, ma serve CTA forte verso Pro (upgrade quando aggiungi 6° holding o primo prompt AI).
- Assicurarsi allineamento value ladder: Free = prova utilita' base, Lifetime = lock-in funzionalita' core senza AI, Pro = tutto + AI/automazione. Comunicare chiaramente che le future features sono solo su Pro.

## Analisi lancio e funnel
- Hero e Pricing già parlano di AI e cash flow: puntare su early access guidato con tour <5 min (gia' citato nelle stat card) e CTA "Inizia gratis" → onboarding in-app con spotlight sugli upgrade gate.
- Funnel consigliato: Landing → Signup → Connect primo conto/holding → primo prompt AI (bloccato su Free) → paywall chiaro con prova di valore (snippet AI, preview analitiche bloccate).
- Messaggi: ancorare al risparmio tempo/denaro ("Prezzi e cambi live", "Supabase + RLS") e sicurezza. Usare badge "Include AI" gia' presente nel componente per differenziare.
- Timing lancio: 1) soft launch Free+Lifetime per primi 200 utenti, raccogli feedback; 2) attiva Pro con prova 7 giorni per ridurre frizione; 3) dopo sold-out Lifetime, mostra solo Pro + Free.
- Pricing experiments: A/B annuale (sconto 2 mesi vs 3 mesi), testare Pro a €11.99 vs €12.99 con trial 7 giorni per misurare conversione.

## Piano Free: ha senso?
- Sì, mantiene top-of-funnel e permette di mostrare affidabilita' dei dati. Va irrigidito su AI e automazioni: nessun prompt AI, limiti su export (solo CSV piccolo) e refresh prezzi meno frequente.
- Trigger di upgrade chiari: superi 5 holdings, colleghi 3° conto, chiedi un insight AI, provi rebalancing/cash flow avanzato.
- Considerare watermark "Free" su export e niente integrazioni automatiche (solo import manuale).

## Prossimi passaggi (priorita')
- Implementare paywall e gating lato backend/frontend per features AI, refresh automatici, num. holdings/conti.
- Allineare pricing backend (piani Pro/Lifetime) a stripe/supabase auth, incluso contatore Lifetime da `src/config/lifetime.js`.
- Setup billing: Stripe (Products: Pro Monthly €12.99, Pro Annual €119 TBD; Add-on AI per Lifetime se deciso), webhook per attivazione/annullamento, retention grace period 3-7 giorni.
- Aggiornare copy in Pricing: annuale con sconto piu' evidente, note su trial se introdotta, CTA Pro che punta a signup/onboarding con paywall embedded.
- Metrics: attivazioni Free→Pro, churn M1/M3, utilizzo AI per utente, conversione paywall ai trigger (6° holding, primo prompt AI).

## Prompt per agente (payments + blocchi)
Usa questo prompt per un agente che gestisce piani e gating in weisy.io:
```
Sei l'agente Billing di Weisy. Obiettivo: applicare diritti in base al piano (Free, Lifetime, Pro) e bloccare feature fuori dal piano.
- Creamiamo le api di collegamento stripe/supabase/billing.
- Introduciamo la logica di gating per feature basate sul piano.
- Introduciamo la pagina di upgrade con opzioni di pagamento. (mantieni lo stile coerente con il resto dell'app)
- la gestione del piano nel profilo utente.
- Feature da gestire:
    - Recupera utente e piano corrente da auth/supabase/stripe. Stato possibili: active, trialing, past_due, canceled, lifetime.
    - Gating:
      - Free: max 5 holdings, 2 conti; nessun prompt AI; refresh prezzi 1x/giorno; export solo CSV base; niente integrazioni automatiche.
      - Lifetime: holdings/conti illimitati; cash flow e dashboard avanzata; niente AI, niente integrazioni auto; export PDF ok.
      - Pro: tutto incluso (AI, automazioni cash flow, integrazioni bancarie/exchange, rebalancing, analytics avanzate, supporto prioritario).
    - Trial: se Pro trialing, abilita tutto ma mostra badge trial + giorni rimanenti; alla fine trial senza pagamento passa a Free.
    - Grace period: se past_due, avvisa e mantieni accesso Pro per 72h poi degrada a Free.
    - Alert utente: quando blocchi qualcosa, mostra modal con motivazione, benefits del piano richiesto e link a upgrade/cashier.
    - Logging: registra evento `billing.gate_triggered` con user_id, feature, piano richiesto/attuale.
    - Rispondi sempre con decisione: feature consentita? si/no, eventuale downgrade/upgrade suggerito, link/call-to-action.
```
