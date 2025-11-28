export default function Footer() {
    const InstagramIcon = () => (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <path d="M16.5 7.5h.01" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    );

    const LinkedinIcon = () => (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-14h4v2" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );

    const footerSections = [
        {
            title: 'Product',
            links: [
                { label: 'Funzionalità', href: '#features' },
                { label: 'Prezzi', href: '#pricing' },
                { label: 'Waitlist', href: '#waitlist' },
                { label: 'Roadmap', href: '/roadmap' },
            ],
        }
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-zinc-50 border-t border-zinc-200">
            <div className="container-albert px-6 lg:px-20">
                {/* Top row: logo + links */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-start">
                        {/* Brand */}
                        <div className="space-y-4">
                            <a href="#" className="inline-flex items-center gap-2">
                                <span className="text-xl font-semibold tracking-tight text-zinc-900">
                                    Waly
                                </span>
                            </a>
                            <p className="max-w-sm text-sm text-zinc-600">
                                La piattaforma completa per tracciare investimenti, monitorare conti
                                e far crescere il tuo patrimonio con semplicità.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <a
                                    href="https://www.instagram.com"
                                    aria-label="Instagram"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href="https://www.linkedin.com"
                                    aria-label="LinkedIn"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                                >
                                    <LinkedinIcon />
                                </a>
                            </div>
                        </div>

                        {/* Link columns */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-8 md:gap-10 text-sm">
                            {footerSections.map((section) => (
                                <div key={section.title}>
                                    <p className="mb-3 font-semibold text-zinc-900">
                                        {section.title}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {section.links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="text-zinc-600 hover:text-zinc-900 transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row: copyright + legal + socials */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-zinc-600 border-t border-zinc-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <span>© {new Date().getFullYear()} Waly.</span>
                        <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-zinc-400" />
                        <span>All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="/terms"
                            className="hover:text-zinc-900 transition-colors"
                        >
                            Termini di servizio
                        </a>
                        <a
                            href="/privacy"
                            className="hover:text-zinc-900 transition-colors"
                        >
                            Privacy
                        </a>
                    </div>

                    <div className="flex items-center gap-3 sm:hidden">
                        <a
                            href="https://www.instagram.com"
                            aria-label="Instagram"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            aria-label="LinkedIn"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                        >
                            <LinkedinIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
