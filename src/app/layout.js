import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weisy - Wealth Made Simple | Dashboard patrimonio, investimenti e cash flow",
  description: "The all-in-one wealth dashboard: Weisy unifica net worth, holdings, conti multi-valuta e cash flow con insight AI chiari e immediati.",
  keywords: "Weisy, wealth dashboard, gestione patrimonio, tracker investimenti, cash flow, net worth, multi valuta, AI finance, monitoraggio conti, portfolio tracker",
  authors: [{ name: "Weisy" }],
  openGraph: {
    title: "Weisy - Wealth Made Simple",
    description: "Monitora investimenti, conti e cash flow in un'unica dashboard con AI",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weisy - Wealth Made Simple",
    description: "Monitora investimenti, conti e cash flow in un'unica dashboard con AI",
  },
  metadataBase: new URL("https://weisy.io"),
};

export default function RootLayout({ children }) {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Weisy",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "0",
          "highPrice": "149",
          "offerCount": "3"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127"
        },
        "description": "Piattaforma completa per tracciare patrimonio personale, investimenti e cash flow con insight AI"
      },
      {
        "@type": "Organization",
        "name": "Weisy",
        "url": "https://weisy.io",
        "logo": "https://weisy.io/logo.png",
        "description": "Piattaforma per la gestione del patrimonio personale e degli investimenti",
        "sameAs": []
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
