# UI Modernization Guide - Continuazione Lavoro

## Contesto del Progetto

Stiamo modernizzando l'interfaccia utente dell'applicazione Weisy applicando uno stile moderno e pulito basato su palette zinc, bordi arrotondati e un layout a due colonne dove appropriato.

## Stile Grafico da Applicare (sintesi aggiornata)

### Palette Colori
- **Sfondo principale**: `bg-zinc-50` o gradient leggero zinc (`from-zinc-50 via-white to-zinc-100`)
- **Card/Container**: `bg-white` con `border border-zinc-200` e `shadow-sm`
- **Bordi**: `border-zinc-200` (default) / `border-zinc-300` per separazioni più forti
- **Hover states**: `hover:bg-zinc-100`
- **Testo**: `text-zinc-900` per titoli, `text-zinc-600` per descrizioni, `text-zinc-500` per testo secondario
- **Accenti**: Colori semantici solo dove serve (green/red per P&L, blue/orange per callout informativi)

### Bordi e Arrotondamenti
- **Card principali**: `rounded-3xl` per hero/modal, `rounded-2xl` per card standard
- **Elementi interni/nested**: `rounded-xl`
- **Pulsanti**: CTA pill `rounded-full`; pulsanti secondari `rounded-lg`
- **Input/Select**: `rounded-lg` con `border-zinc-300`
- **Badge/Tag**: `rounded-full`

### Spaziatura
- **Padding card**: `px-6 py-5` per card grandi, `px-4 py-3` per card medie
- **Gap tra elementi**: `gap-6` per sezioni principali, `gap-4` per elementi correlati
- **Margini**: Utilizzare `space-y-6` per stack verticali

### Tipografia
- **Titoli sezione**: `text-sm font-medium text-zinc-900` o `text-lg font-semibold` nei card header
- **Valori grandi**: `text-2xl font-semibold` / `text-3xl font-bold`
- **Descrizioni**: `text-sm text-zinc-600`
- **Labels**: `text-xs font-medium text-zinc-500 uppercase tracking-wide`

## Pagine/Pattern di riferimento aggiornati
- **Login/Signup**: griglia 2 colonne; hero/card `rounded-3xl` con palette zinc, CTA pill scura; form in card bianca con bordi zinc.
- **Verify email**: card `rounded-3xl` + colonna note; CTA pill scura, box informativi zinc.
- **Guide**: hero con CTA “Avvia tour”, indice sinistro e contenuto destro con checklist/mock; card `rounded-3xl`.
- **Settings**: tab (Profilo/Allocazione/Abbonamento) in card unica; modali/liste border zinc, grafico pie zinc, preset pill.
- **Holdings/Transactions**: modali `rounded-3xl` con overlay blur, input zinc, TickerAutocomplete; tablist con bordi bassi.
- **Accounts/Wealth/Cash Flow/Analytics/Fire**: card `rounded-2xl`, tab compatti, toolbar zinc, hover `bg-zinc-50→100`.

## Checklist per Modernizzare una Pagina

Quando lavori su una pagina, segui questo processo:

### 1. Pre-lettura
- [ ] Leggi il file della pagina corrente
- [ ] Identifica componenti custom usati
- [ ] Nota eventuali stati/hook specifici da preservare

### 2. Struttura Layout
- [ ] Sostituisci container principale con `bg-zinc-50` se appropriato
- [ ] Trasforma Card in `bg-white rounded-2xl px-6 py-5 shadow-sm`
- [ ] Valuta se serve layout a due colonne (lista + sidebar)
- [ ] Aggiungi `space-y-6` tra sezioni principali

### 3. Elementi Specifici

**KPI/Summary Cards:**
```javascript
<div className="bg-white rounded-2xl px-6 py-5 shadow-sm border-l-4 border-l-[COLOR]">
  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
    Label
  </div>
  <div className="text-2xl font-semibold text-zinc-900 mt-2">
    Valore
  </div>
  <div className="text-sm text-zinc-500 mt-1">
    Descrizione/Change
  </div>
</div>
```

**Pulsanti di Azione:**
```javascript
<Button className="rounded-full">
  <Plus className="h-4 w-4 mr-2" />
  Aggiungi
</Button>
```

**Form Inputs:**
```javascript
<input
  className="w-full px-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder:text-zinc-400"
  placeholder="Placeholder..."
/>
```

**Liste con Elementi Cliccabili:**
```javascript
<div className="rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-sm bg-white transition-all px-4 py-3 cursor-pointer">
  {/* Contenuto */}
</div>
```

**Tabelle:**
```javascript
<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
  <table className="w-full">
    <thead className="bg-zinc-50 border-b border-zinc-200">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide">
          Header
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-zinc-100">
      <tr className="hover:bg-zinc-50 transition-colors">
        <td className="px-4 py-3 text-sm text-zinc-900">
          Contenuto
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Modal/Dialog:**
```javascript
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <div className="px-6 py-5 border-b border-zinc-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Titolo Modal</h2>
        <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
    <div className="px-6 py-5">
      {/* Contenuto modal */}
    </div>
  </div>
</div>
```

### 4. Transizioni e Animazioni
- [ ] Aggiungi `transition-colors` o `transition-all` su elementi interattivi
- [ ] Usa `duration-200` per animazioni rapide
- [ ] Hover states su tutti gli elementi cliccabili

### 5. Componenti Riutilizzabili
- [ ] I componenti Shadcn (Button, Card) possono essere mantenuti ma stylizzati
- [ ] Icone Lucide con `h-4 w-4` o `h-5 w-5`
- [ ] Mantieni l'AppHeader esistente (già integrato)

## Regole Importanti

### ✅ DA FARE:
1. **Mantenere AppHeader** - Non modificare, è già integrato correttamente
2. **Full-width container** - Usare tutto il container disponibile, no bordi esterni inutili
3. **Responsive** - Grid che collassa da 2-3-4 colonne su desktop a 1 colonna su mobile
4. **Consistenza** - Usare gli stessi spacing, colori e arrotondamenti in tutta l'app
5. **Accessibilità** - Mantenere aria-label, focus states, contrasti adeguati
6. **Interattività** - Hover, active e focus states su tutti gli elementi cliccabili
7. **ATTENZIONE A COME sono le cards, tabelle, form, etc.** - rispetta la coerenza di layout con le altre pagine accounts/wealth-tracker/holdings ecc..

### ❌ NON FARE:
1. **Non bordare l'intera pagina** - Il container deve sfruttare tutta la larghezza
2. **Non usare colori casuali** - Seguire la palette zinc + colori semantici
3. **Non mescolare stili** - Se una pagina usa rounded-2xl, tutte devono usarlo
4. **Non rimuovere funzionalità** - Solo migliorare l'aspetto, non modificare la logica
5. **Non usare emoji nel codice** - Solo nelle UI se appropriato (categorie, etc.)

## Come Procedere

### Step-by-Step per Ogni Pagina:

1. **Leggi la pagina corrente**
   ```bash
   # Usa Read tool per leggere il file
   ```

2. **Identifica la struttura**
   - Quante card/sezioni ci sono?
   - Serve layout a due colonne?
   - Ci sono tabelle, grafici, form?
   - Serve una gestione con i tabs come la dashboard?
   - Ci sono troppi elementi visivi ?

3. **Applica lo stile**
   - Sostituisci le Card Shadcn con div `bg-white rounded-2xl px-6 py-5 shadow-sm`
   - Aggiorna i colori alla palette zinc
   - Arrotonda tutti i bordi
   - Aggiungi transizioni su hover

4. **Testa la responsività**
   - Verifica che il grid collassi correttamente
   - Controlla che sidebar diventi full-width su mobile

5. **Verifica funzionalità**
   - Non rompere la logica esistente
   - Mantieni tutti gli event handler
   - Preserva gli stati React

## Riferimento Visivo

Pagine di riferimento stile:
- `/Users/johnnycannatella/WebstormProjects/wealthmanager/src/app/holdings/page.js`
- `/Users/johnnycannatella/WebstormProjects/wealthmanager/src/app/wealth-tracker/page.js`
- `/Users/johnnycannatella/WebstormProjects/wealthmanager/src/app/cash-flow/page.js`
- `/Users/johnnycannatella/WebstormProjects/wealthmanager/src/app/accounts/page.js`

## Note Tecniche

- **Framework**: Next.js 16 App Router con 'use client'
- **Styling**: Tailwind CSS 4
- **Icone**: Lucide React (già importate)
- **Componenti**: Shadcn/ui (ma stylizzare custom)
- **Lingua**: UI in italiano

---

**Ultimo aggiornamento**: 2025-11-27
