# 📊 Come aggiornare il Counter Lifetime

## 🎯 Quick Start

Quando qualcuno acquista il piano **Lifetime Founder**:

1. Apri il file: `src/config/lifetime.js`
2. Trova la riga: `sold: 0`
3. Incrementa il numero: `sold: 1`, `sold: 2`, etc.
4. Salva il file
5. Il counter si aggiorna automaticamente sulla landing!

## 📁 Posizione file

```
/src/config/lifetime.js
```

## ✏️ Esempio pratico

### Prima vendita
```javascript
export const LIFETIME_CONFIG = {
  total: 200,
  sold: 0,  // ← Cambia questo
  // ...
};
```

Diventa:
```javascript
export const LIFETIME_CONFIG = {
  total: 200,
  sold: 1,  // ← Aggiornato!
  // ...
};
```

### Dopo 17 vendite
```javascript
export const LIFETIME_CONFIG = {
  total: 200,
  sold: 17,
  // ...
};
```

## 🎨 Come appare sulla landing

Il counter cambia automaticamente colore in base alla disponibilità:

### 🟡 Disponibilità normale (200-101 posti)
- Badge: **Ambra**
- Testo: "200/200 posti disponibili"
- Progress bar: Ambra

### 🟠 Disponibilità media (100-51 posti)
- Badge: **Arancione**
- Testo: "87/200 posti disponibili"
- Progress bar: Arancione

### 🔴 Ultimi posti! (50-1 posti)
- Badge: **Rosso**
- Testo: "🔥 Ultimi 23 posti!"
- Progress bar: Rosso

### ❌ Sold out (0 posti)
- Il piano **scompare completamente** dalla landing
- Solo Free e Pro rimangono visibili

## 🔢 Cosa viene calcolato automaticamente

NON devi modificare nulla di questo:

```javascript
get remaining() {
  return this.total - this.sold;  // Auto-calcolato
}
```

Il sistema calcola automaticamente:
- ✅ Posti rimasti (`remaining`)
- ✅ Percentuale venduti
- ✅ Livello di urgenza
- ✅ Messaggio da mostrare

## 🚀 Workflow consigliato

### Opzione 1: Manuale (attuale)
```
Vendita Lifetime
  ↓
Apri lifetime.js
  ↓
sold: 17 → sold: 18
  ↓
Git commit + push
  ↓
Deploy automatico (Vercel)
```

### Opzione 2: Semi-automatico (futuro)
Quando implementi Stripe/pagamenti:
```
Vendita Lifetime
  ↓
Stripe Webhook
  ↓
API route incrementa counter
  ↓
Update automatico DB
```

## 📝 Checklist vendita

- [ ] Cliente ha pagato
- [ ] Pagamento confermato
- [ ] Aggiornare `sold` in `lifetime.js`
- [ ] Commit + push
- [ ] Verificare counter su landing
- [ ] Dare accesso al cliente

## 🔮 Upgrade futuro

Quando sarai pronto per automatizzare:

1. **Supabase** (gratis fino a 50k richieste/mese)
   - Setup: 15 minuti
   - Real-time updates
   - [Guida completa](https://supabase.com/docs)

2. **Stripe Webhook**
   - Setup: 30 minuti
   - Source of truth unica
   - Impossibile overselling

## ❓ FAQ

**Q: Cosa succede se sbaglio il numero?**
A: Nessun problema! Basta correggere e fare commit. Il counter si aggiorna subito.

**Q: Il counter è visibile ai clienti?**
A: Sì, sulla landing. È una feature, non un bug! Crea urgenza e FOMO.

**Q: Posso nascondere temporaneamente il Lifetime?**
A: Sì! Imposta `sold: 200` (sold out) e il piano scompare. Ripristina il valore reale quando vuoi riattivarlo.

**Q: Posso cambiare il prezzo Lifetime?**
A: Sì, ma NON in `lifetime.js`. Modifica il file `src/components/Pricing.js` alla riga 29.

## 🎯 Test rapido

Per testare i diversi stati:

```javascript
// Test: Sold out
sold: 200  // Il piano scompare

// Test: Urgenza alta
sold: 170  // Badge rosso "🔥 Ultimi 30 posti!"

// Test: Urgenza media
sold: 120  // Badge arancione

// Test: Normale
sold: 50   // Badge ambra "150/200 posti disponibili"
```

Ricorda di rimettere il valore reale dopo i test!

---

**Hai domande?** Controlla il codice in `src/config/lifetime.js` per i dettagli tecnici.
