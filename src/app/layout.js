import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://weisy.io";
const metadataBase = new URL(siteUrl);
const ogImage = `${siteUrl}/introducing-waly-hero.webp`;
const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";
const googleVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata = {
  title: "Weisy - Wealth Made Simple | Dashboard patrimonio, investimenti e cash flow",
  description: "The all-in-one wealth dashboard: Weisy unifica net worth, holdings, conti multi-valuta e cash flow con insight AI chiari e immediati.",
  keywords: "Weisy, Weisy AI, wealth dashboard, gestione patrimonio, tracker investimenti, cash flow, net worth, multi valuta, AI finance, monitoraggio conti, portfolio tracker",
  authors: [{ name: "Weisy" }],
  metadataBase,
  alternates: {
    canonical: siteUrl,
    languages: {
      "x-default": siteUrl,
      "it-IT": siteUrl,
    },
  },
  openGraph: {
    title: "Weisy - Wealth Made Simple",
    description: "Monitora investimenti, conti e cash flow in un'unica dashboard con AI",
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Weisy - Wealth Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weisy - Wealth Made Simple",
    description: "Monitora investimenti, conti e cash flow in un'unica dashboard con AI",
    images: [ogImage],
  },
  verification: googleVerification
    ? {
        google: googleVerification,
      }
    : undefined,
  robots: isStaging
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
};

export default function RootLayout({ children }) {
  const iubendaSiteId = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;
  const iubendaWidgetSrc = "https://embeds.iubenda.com/widgets/3bf6d818-9bb0-4148-8dcc-6124dd3b149e.js";
  const sameAsProfiles = [
    "https://www.instagram.com/_johnnycannatella?igsh=OGNjYW9obW1hZmw0&utm_source=qr",
  ];
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Weisy",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Piattaforma completa per tracciare patrimonio personale, investimenti e cash flow con insight AI"
      },
      {
        "@type": "Organization",
        "name": "Weisy",
        "url": "https://weisy.io",
        "logo": "https://weisy.io/logo.svg",
        "description": "Piattaforma per la gestione del patrimonio personale e degli investimenti",
        "sameAs": sameAsProfiles
      },
      {
        "@type": "WebSite",
        "url": "https://weisy.io",
        "name": "Weisy",
        "description": "Gestisci il tuo patrimonio personale in un'unica dashboard con AI",
        "inLanguage": "it-IT"
      }
    ]
  };

  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <Script
          id="weisy-ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      {iubendaSiteId ? (
        <>
          <Script
            id="iubenda-cs-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var _iub = _iub || [];
                _iub.csConfiguration = {
                  siteId: ${iubendaSiteId},
                  cookiePolicyId: 35020938,
                  lang: 'it',
                  consentOnContinuedBrowsing: false,
                  banner: {
                    position: "bottom",
                    acceptButtonDisplay: true,
                    customizeButtonDisplay: true,
                    rejectButtonDisplay: true,
                    closeButtonRejects: true
                  }
                };`,
            }}
          />
          <Script
            src="https://cdn.iubenda.com/cs/iubenda_cs.js"
            strategy="afterInteractive"
          />
        </>
      ) : (
        <Script
          src={iubendaWidgetSrc}
          strategy="afterInteractive"
        />
      )}
      <Script
        src="https://cdn.iubenda.com/iubenda.js"
        strategy="afterInteractive"
        data-iubenda="true"
      />
      </body>
    </html>
  );
}
