'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');
    const stats = [
        { label: 'Prezzi e cambi live', value: 'Ticker Yahoo Finance' },
        { label: 'Supabase + RLS', value: 'Privacy-first' },
        { label: 'Tour guidato', value: '< 5 minuti' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setMessage('Inserisci un email valida.');
            return;
        }

        try {
            setStatus('loading');
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'landing-newsletter' }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Errore durante la registrazione');
            }

            setStatus('success');
            setMessage(data?.message || 'Aggiunto alla newsletter.');
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'Si è verificato un errore. Riprova.');
        }
    };

    return (
        <section id="newsletter" className="bg-gradient-to-b from-white via-zinc-50 to-white py-20 md:py-24">
            <div className="container-albert px-6 lg:px-20">
                <div className="relative max-w-6xl mx-auto rounded-[28px] border border-zinc-200 bg-white shadow-lg p-8 md:p-10 space-y-8 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900" aria-hidden="true" />

                    <div className="flex flex-col gap-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 w-fit">
                            Newsletter
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl md:text-4xl font-semibold text-zinc-900">
                                Weisy AI e insight reali, nella tua inbox
                            </h3>
                            <p className="text-sm md:text-base text-zinc-600 max-w-3xl">
                                Aggiornamenti su Weisy AI, holdings, conti multi-valuta e cash flow. Novità di prodotto, guide rapide e alert solo quando servono.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {stats.map((stat) => (
                                <span
                                    key={stat.label}
                                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-[11px] font-semibold text-zinc-700"
                                >
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white text-[11px]">
                                        ●
                                    </span>
                                    <span className="uppercase tracking-wide">{stat.label}</span>
                                    <span className="text-zinc-500 font-normal capitalize">{stat.value}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-start">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Perché iscriverti
                            </p>
                            <ul className="space-y-2 text-sm text-zinc-600">
                                <li>• Novità su Weisy AI e nuove feature</li>
                                <li>• Aggiornamenti su prezzi/cambi live e connettori</li>
                                <li>• Guide pratiche per gestire investimenti e cash flow</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 space-y-4">
                            <label className="block text-sm font-semibold text-zinc-900">
                                Email di contatto
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@dominio.com"
                                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-transparent"
                                />
                            </label>
                            <p className="text-xs text-zinc-500">
                                Confermando accetti di ricevere aggiornamenti su Weisy. Potrai disiscriverti in ogni momento.
                            </p>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Invio...' : 'Iscriviti alla newsletter'}
                            </button>

                            {message && (
                                <div
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                        status === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}
                                >
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
