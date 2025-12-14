import Link from "next/link";

const SOCIALS = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/_johnnycannatella?igsh=OGNjYW9obW1hZmw0&utm_source=qr',
        icon: (
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16.5 7.5h.01" />
                <circle cx="12" cy="12" r="4" />
            </svg>
        ),
    },
];

export default function Footer() {
    const footerSections = [
        {
            title: 'Product',
            links: [
                { label: 'Funzionalità', href: '#features' },
                { label: 'Prezzi', href: '#pricing' },
                { label: 'Waitlist', href: '#waitlist' },
                { label: 'Roadmap', href: '/roadmap' },
                { label: 'Parla con noi', href: '/parla-con-noi' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Termini e condizioni', href: '/terms' },
                { label: 'Privacy', href: 'https://www.iubenda.com/privacy-policy/35020938' },
                { label: 'Cookie Policy', href: 'https://www.iubenda.com/privacy-policy/35020938/cookie-policy', external: true },
            ],
        },
    ];

    const isHashLink = (href) => href?.startsWith('#');
    const isInternalLink = (href) => href?.startsWith('/') && !href?.startsWith('//');

    return (
        <footer className="bg-gradient-to-b from-white to-zinc-50 border-t border-zinc-200">
            <div className="container-albert px-6 lg:px-20">
                {/* Top row: logo + links */}
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-start">
                        {/* Brand */}
                        <div className="space-y-4">
                            <Link href="/" className="inline-flex items-center gap-2" aria-label="Weisy home">
                                <span className="text-xl font-semibold tracking-tight text-zinc-900">
                                    Weisy
                                </span>
                            </Link>
                            <p className="max-w-sm text-sm text-zinc-600">
                                Controlla investimenti, conti e cash flow con Weisy AI: prezzi live, cash flow chiaro e alert mirati in un’unica dashboard.
                            </p>
                            {SOCIALS.length > 0 && (
                                <div className="flex items-center gap-3 pt-2">
                                    {SOCIALS.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
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
                                                {link.external ? (
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-zinc-600 hover:text-zinc-900 transition-colors"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ) : isHashLink(link.href) ? (
                                                    <a
                                                        href={link.href}
                                                        className="text-zinc-600 hover:text-zinc-900 transition-colors"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ) : isInternalLink(link.href) ? (
                                                    <Link
                                                        href={link.href}
                                                        className="text-zinc-600 hover:text-zinc-900 transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={link.href}
                                                        className="text-zinc-600 hover:text-zinc-900 transition-colors"
                                                    >
                                                        {link.label}
                                                    </a>
                                                )}
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
	                        <span>© {new Date().getFullYear()} Weisy.</span>
	                        <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-zinc-400" />
	                        <span>All rights reserved.</span>
	                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/terms"
                            className="hover:text-zinc-900 transition-colors"
                        >
                            Termini e condizioni
                        </Link>
                        <a
                            href="https://www.iubenda.com/privacy-policy/35020938"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-zinc-900 transition-colors"
                        >
                            Privacy
                        </a>
	                        <a
	                            href="https://www.iubenda.com/privacy-policy/35020938/cookie-policy"
	                            target="_blank"
	                            rel="noreferrer"
	                            className="hover:text-zinc-900 transition-colors"
	                        >
	                            Cookie Policy
	                        </a>
	                    </div>
                        {SOCIALS.length > 0 && (
                            <div className="flex items-center gap-3 sm:hidden">
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        )}
	                </div>
	            </div>
	        </footer>
	    );
}
