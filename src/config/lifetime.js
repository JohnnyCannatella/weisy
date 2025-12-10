/**
 * Lifetime Founder Plan Configuration
 *
 * COME AGGIORNARE IL COUNTER:
 * 1. Quando qualcuno compra il piano Lifetime, incrementa 'sold'
 * 2. Il 'remaining' si calcola automaticamente
 * 3. Quando remaining = 0, il piano scompare automaticamente dalla landing
 *
 * ESEMPIO:
 * - Vendita 1: sold: 1
 * - Vendita 2: sold: 2
 * - etc.
 */

export const LIFETIME_CONFIG = {
  total: 200,
  sold: 0,  // ← AGGIORNA QUESTO NUMERO quando vendi un piano Lifetime
  get remaining() {
    return this.total - this.sold;
  },
  get isAvailable() {
    return this.remaining > 0;
  },
  get percentageSold() {
    return Math.round((this.sold / this.total) * 100);
  }
};

// Helper per mostrare il counter in modo user-friendly
export function getLifetimeStatus() {
  const { sold, remaining, total, isAvailable } = LIFETIME_CONFIG;

  return {
    sold,
    remaining,
    total,
    isAvailable,
    urgencyLevel: remaining < 50 ? 'high' : remaining < 100 ? 'medium' : 'low',
    message: remaining <= 10
      ? `🔥 Ultimi ${remaining} posti!`
      : `${remaining}/${total} posti disponibili`
  };
}
