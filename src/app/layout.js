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
  title: "Waly - Gestisci il tuo patrimonio personale | Dashboard investimenti e FIRE",
  description: "Piattaforma completa per tracciare patrimonio personale, investimenti e obiettivi FIRE. Monitora net worth, conti bancari e portafogli in un'unica dashboard. Made in Italy.",
  keywords: "gestione patrimonio personale, tracker investimenti Italia, FIRE Italia, calcolo patrimonio netto, net worth tracker, portafoglio investimenti, dashboard finanziaria, indipendenza finanziaria, monitoraggio conti bancari, wealth tracker italiano",
  authors: [{ name: "Waly" }],
  openGraph: {
    title: "Waly - Gestisci il tuo patrimonio personale",
    description: "Monitora investimenti, conti e obiettivi FIRE in un'unica dashboard italiana",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waly - Gestisci il tuo patrimonio personale",
    description: "Monitora investimenti, conti e obiettivi FIRE in un'unica dashboard italiana",
  },
};

export default function RootLayout({ children }) {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Waly",
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
        "description": "Piattaforma completa per tracciare patrimonio personale, investimenti e obiettivi FIRE in Italia"
      },
      {
        "@type": "Organization",
        "name": "Waly",
        "url": "https://waly.app",
        "logo": "https://waly.app/logo.png",
        "description": "Piattaforma italiana per la gestione del patrimonio personale",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "url": "https://waly.app",
        "name": "Waly",
        "description": "Gestisci il tuo patrimonio personale in un'unica dashboard",
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
