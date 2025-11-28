// app/terms/page.js - Termini di Servizio
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Shield, Briefcase, Database, TrendingUp, AlertCircle, Menu, X } from 'lucide-react'
import Navigation from "@/components/Navigation";

const sections = [
    {
        icon: FileText,
        title: '1. Definizioni e Ambito di Applicazione',
        id: 'definizioni',
        content: [
            {
                subtitle: '1.1 Definizioni',
                text: 'Waly è una piattaforma digitale di monitoraggio e gestione patrimoniale personale che consente agli utenti di tracciare il proprio patrimonio netto, holdings finanziari, conti bancari, transazioni e obiettivi FIRE (Financial Independence, Retire Early). Il servizio è fornito "as-is" esclusivamente a scopo informativo e di organizzazione personale.'
            },
            {
                subtitle: '1.2 Accettazione dei Termini',
                text: 'L\'accesso e l\'utilizzo di Waly implicano l\'accettazione integrale e incondizionata dei presenti Termini di Servizio. Se non si accettano questi termini, è necessario astenersi dall\'utilizzo della piattaforma.'
            }
        ]
    },
    {
        icon: Briefcase,
        title: '2. Descrizione del Servizio',
        id: 'servizio',
        content: [
            {
                subtitle: '2.1 Funzionalità Principali',
                text: 'Waly offre le seguenti funzionalità: (a) Dashboard di monitoraggio patrimonio netto con grafici storici e KPI; (b) Gestione holdings finanziari (azioni, ETF, obbligazioni, criptovalute) con tracking P&L; (c) Gestione conti bancari e cash con supporto multi-valuta (EUR, USD, GBP); (d) Tracking transazioni di investimento (acquisto, vendita, dividendi); (e) Tracking cash flow (entrate, uscite, trasferimenti tra conti); (f) Snapshot mensili del patrimonio per analisi storica; (g) Analisi asset allocation e suggerimenti di ribilanciamento; (h) FIRE Tracker per monitorare il progresso verso l\'indipendenza finanziaria; (i) Aggiornamento prezzi di mercato in tempo reale tramite Yahoo Finance; (j) Integrazione opzionale con Interactive Brokers (IBKR) per sincronizzazione automatica posizioni.'
            },
            {
                subtitle: '2.2 Natura del Servizio',
                text: 'Waly è uno strumento di organizzazione e visualizzazione dati. Non fornisce consulenza finanziaria, raccomandazioni di investimento, gestione patrimoniale professionale o servizi di intermediazione. Tutte le analisi, grafici e suggerimenti di ribilanciamento sono puramente informativi e non costituiscono sollecitazione all\'investimento.'
            },
            {
                subtitle: '2.3 Limitazioni Tecniche',
                text: 'I prezzi di mercato sono forniti da fonti esterne (Yahoo Finance, IBKR) e potrebbero non essere aggiornati in tempo reale o presentare ritardi o inesattezze. Waly non garantisce l\'accuratezza, completezza o tempestività dei dati di mercato. L\'utente è responsabile della verifica delle informazioni prima di prendere qualsiasi decisione finanziaria.'
            }
        ]
    },
    {
        icon: Shield,
        title: '3. Registrazione e Sicurezza Account',
        id: 'account',
        content: [
            {
                subtitle: '3.1 Creazione Account',
                text: 'Per utilizzare Waly è necessario creare un account fornendo un indirizzo email valido e una password sicura. L\'utente dichiara di avere almeno 18 anni e di fornire informazioni veritiere, accurate e complete durante la registrazione e la profilazione.'
            },
            {
                subtitle: '3.2 Responsabilità Credenziali',
                text: 'L\'utente è l\'unico responsabile della sicurezza delle proprie credenziali di accesso e di tutte le attività svolte tramite il proprio account. È vietato condividere le credenziali con terzi. In caso di accesso non autorizzato o sospetto, l\'utente deve notificare immediatamente Waly.'
            },
            {
                subtitle: '3.3 Verifica Email',
                text: 'Dopo la registrazione è richiesta la verifica dell\'indirizzo email tramite link di conferma. L\'accesso alle funzionalità della piattaforma è consentito solo dopo il completamento della verifica.'
            },
            {
                subtitle: '3.4 Profilazione Utente',
                text: 'Durante l\'onboarding, Waly raccoglie informazioni personali, preferenze di investimento e obiettivi finanziari per personalizzare l\'esperienza. L\'utente può aggiornare o modificare queste informazioni in qualsiasi momento dalla pagina Impostazioni.'
            }
        ]
    },
    {
        icon: Database,
        title: '4. Gestione Dati e Privacy',
        id: 'privacy',
        content: [
            {
                subtitle: '4.1 Dati Inseriti',
                text: 'Tutti i dati finanziari inseriti dall\'utente (holdings, conti, transazioni, snapshot) restano di proprietà esclusiva dell\'utente e sono archiviati in modo sicuro nel database Supabase con crittografia e Row Level Security (RLS). Ogni utente ha accesso esclusivamente ai propri dati.'
            },
            {
                subtitle: '4.2 Privacy Policy',
                text: 'Per informazioni dettagliate sul trattamento dei dati personali, raccolta, conservazione e diritti dell\'utente, si rimanda alla Privacy Policy completa disponibile su iubenda.'
            },
            {
                subtitle: '4.3 Cookie Policy',
                text: 'Per informazioni sull\'utilizzo dei cookie, tecnologie di tracciamento e preferenze utente, si rimanda alla Cookie Policy disponibile su iubenda.'
            },
            {
                subtitle: '4.4 Integrazione IBKR',
                text: 'Se l\'utente sceglie di integrare il proprio account Interactive Brokers, Waly accede ai dati di portafoglio tramite IBKR Web API utilizzando credenziali fornite dall\'utente. Waly non memorizza le credenziali IBKR. L\'integrazione è opzionale e può essere disattivata in qualsiasi momento.'
            },
            {
                subtitle: '4.5 Backup e Esportazione',
                text: 'Waly implementa backup regolari dei dati utente. L\'utente può esportare i propri dati in formato PDF tramite la funzione di report disponibile nella dashboard.'
            }
        ]
    },
    {
        icon: TrendingUp,
        title: '5. Utilizzo del Servizio',
        id: 'utilizzo',
        content: [
            {
                subtitle: '5.1 Uso Consentito',
                text: 'Waly può essere utilizzato esclusivamente per monitoraggio e organizzazione del proprio patrimonio personale. L\'utente si impegna a inserire dati veritieri e accurati.'
            },
            {
                subtitle: '5.2 Divieti',
                text: 'È espressamente vietato: (a) utilizzare Waly per scopi commerciali senza autorizzazione; (b) tentare accessi non autorizzati a dati di altri utenti; (c) compromettere la sicurezza o integrità della piattaforma; (d) utilizzare bot, scraper o strumenti automatizzati non autorizzati; (e) violare leggi applicabili in materia di privacy, fiscale o finanziaria; (f) caricare contenuti illeciti, diffamatori o che violino diritti di terzi.'
            },
            {
                subtitle: '5.3 Monitoraggio e Moderazione',
                text: 'Waly si riserva il diritto di monitorare l\'utilizzo della piattaforma e di sospendere o terminare account che violino i presenti Termini o la legge applicabile.'
            }
        ]
    },
    {
        icon: AlertCircle,
        title: '6. Disclaimer e Limitazioni di Responsabilità',
        id: 'disclaimer',
        content: [
            {
                subtitle: '6.1 Nessuna Consulenza Finanziaria',
                text: 'Waly non fornisce consulenza finanziaria, raccomandazioni di investimento o gestione patrimoniale. I suggerimenti di ribilanciamento e le analisi fornite sono puramente automatici e informativi. L\'utente è l\'unico responsabile delle proprie decisioni finanziarie e di investimento.'
            },
            {
                subtitle: '6.2 Accuratezza Dati',
                text: 'Waly non garantisce l\'accuratezza, completezza o tempestività dei prezzi di mercato, tassi di cambio o altri dati forniti da fonti esterne. I dati possono presentare ritardi, errori o interruzioni. L\'utente è responsabile della verifica delle informazioni.'
            },
            {
                subtitle: '6.3 Disponibilità del Servizio',
                text: 'Waly è fornito "as-is" e "as-available". Non garantiamo la disponibilità continua, ininterrotta o priva di errori del servizio. Potrebbero verificarsi manutenzioni programmate, interruzioni tecniche o problemi di performance.'
            },
            {
                subtitle: '6.4 Limitazione Responsabilità',
                text: 'Nei limiti consentiti dalla legge applicabile, Waly non è responsabile per: (a) perdite finanziarie derivanti da decisioni di investimento prese dall\'utente; (b) danni diretti, indiretti, incidentali o consequenziali derivanti dall\'uso o impossibilità di uso della piattaforma; (c) perdita di dati, profitti o opportunità; (d) errori o inesattezze nei dati di mercato; (e) interruzioni del servizio o problemi tecnici.'
            },
            {
                subtitle: '6.5 Esclusione Garanzie',
                text: 'Waly non fornisce garanzie esplicite o implicite di commerciabilità, idoneità per uno scopo specifico o non violazione. L\'utente utilizza il servizio a proprio rischio.'
            }
        ]
    },
    {
        title: '7. Proprietà Intellettuale',
        id: 'proprieta',
        content: [
            {
                subtitle: '7.1 Diritti di Waly',
                text: 'Tutti i diritti di proprietà intellettuale relativi a Waly, inclusi design, codice sorgente, loghi, marchi, grafiche e documentazione, sono di proprietà esclusiva di Waly o dei suoi licenzianti. È vietata la riproduzione, modifica o distribuzione non autorizzata.'
            },
            {
                subtitle: '7.2 Licenza d\'Uso',
                text: 'Waly concede all\'utente una licenza limitata, non esclusiva, non trasferibile e revocabile per utilizzare la piattaforma esclusivamente per scopi personali e non commerciali, in conformità con i presenti Termini.'
            },
            {
                subtitle: '7.3 Feedback e Suggerimenti',
                text: 'Eventuali feedback, suggerimenti o proposte di miglioramento forniti dall\'utente possono essere utilizzati da Waly senza obbligo di compenso o riconoscimento.'
            }
        ]
    },
    {
        title: '8. Piani di Abbonamento e Pagamenti',
        id: 'pagamenti',
        content: [
            {
                subtitle: '8.1 Modello Freemium',
                text: 'Waly attualmente offre un piano gratuito con accesso a tutte le funzionalità base. Eventuali piani a pagamento (Premium, Pro) con funzionalità avanzate saranno indicati nella sezione Impostazioni > Abbonamento.'
            },
            {
                subtitle: '8.2 Modifiche ai Prezzi',
                text: 'Waly si riserva il diritto di modificare i prezzi, le funzionalità incluse nei vari piani e i termini di abbonamento con preavviso di almeno 30 giorni. Gli utenti con abbonamento attivo manterranno le condizioni in vigore al momento della sottoscrizione fino alla scadenza del periodo pagato.'
            },
            {
                subtitle: '8.3 Metodi di Pagamento',
                text: 'I pagamenti saranno processati tramite provider esterni (Stripe, PayPal). Waly non memorizza direttamente i dati delle carte di credito.'
            },
            {
                subtitle: '8.4 Cancellazione e Rimborsi',
                text: 'L\'utente può cancellare l\'abbonamento in qualsiasi momento. Non sono previsti rimborsi per periodi parziali già pagati, salvo quanto previsto dalla normativa applicabile in materia di diritto di recesso.'
            }
        ]
    },
    {
        title: '9. Modifica e Sospensione del Servizio',
        id: 'modifiche',
        content: [
            {
                subtitle: '9.1 Aggiornamenti e Modifiche',
                text: 'Waly si riserva il diritto di modificare, aggiornare o interrompere funzionalità della piattaforma in qualsiasi momento, con o senza preavviso. Ci impegniamo a comunicare modifiche significative tramite email o notifiche in-app.'
            },
            {
                subtitle: '9.2 Sospensione Account',
                text: 'Waly può sospendere o terminare l\'account dell\'utente in caso di violazione dei presenti Termini, attività sospette o per ordine di autorità competenti. In caso di sospensione, l\'utente può richiedere l\'esportazione dei propri dati entro 30 giorni.'
            },
            {
                subtitle: '9.3 Cancellazione Account',
                text: 'L\'utente può cancellare il proprio account in qualsiasi momento dalla pagina Impostazioni. Tutti i dati personali e finanziari saranno eliminati permanentemente entro 30 giorni dalla richiesta di cancellazione, salvo obblighi di legge.'
            }
        ]
    },
    {
        title: '10. Modifiche ai Termini di Servizio',
        id: 'modifiche-termini',
        content: [
            {
                subtitle: '10.1 Aggiornamenti',
                text: 'Waly può aggiornare i presenti Termini di Servizio in qualsiasi momento. Gli aggiornamenti saranno pubblicati su questa pagina con indicazione della data di "Ultimo aggiornamento".'
            },
            {
                subtitle: '10.2 Notifica',
                text: 'In caso di modifiche sostanziali, invieremo una notifica via email agli utenti registrati almeno 15 giorni prima dell\'entrata in vigore delle nuove condizioni.'
            },
            {
                subtitle: '10.3 Accettazione',
                text: 'L\'uso continuato di Waly dopo l\'entrata in vigore delle modifiche implica l\'accettazione dei nuovi Termini. Se l\'utente non accetta le modifiche, deve interrompere l\'utilizzo del servizio e può richiedere la cancellazione dell\'account.'
            }
        ]
    },
    {
        title: '11. Legge Applicabile e Foro Competente',
        id: 'legge',
        content: [
            {
                subtitle: '11.1 Legge Applicabile',
                text: 'I presenti Termini di Servizio sono regolati dalla legge italiana, senza riguardo ai principi sui conflitti di legge.'
            },
            {
                subtitle: '11.2 Risoluzione Controversie',
                text: 'Per qualsiasi controversia derivante dai presenti Termini o dall\'utilizzo di Waly, sarà competente in via esclusiva il Foro di [Città], salvo diversa previsione di legge inderogabile a tutela del consumatore.'
            },
            {
                subtitle: '11.3 Clausola Salvatoria',
                text: 'Qualora una o più disposizioni dei presenti Termini siano ritenute invalide o inapplicabili, le restanti disposizioni rimarranno in pieno vigore ed effetto.'
            }
        ]
    },
    {
        title: '12. Contatti e Supporto',
        id: 'contatti',
        content: [
            {
                subtitle: '12.1 Supporto Clienti',
                text: 'Per domande, richieste di supporto o segnalazioni, contattaci via email all\'indirizzo: support@waly.app. Ci impegniamo a rispondere entro 48 ore lavorative.'
            },
            {
                subtitle: '12.2 Reclami e Segnalazioni',
                text: 'Per segnalare violazioni dei Termini, problemi di sicurezza o comportamenti inappropriati, contatta: abuse@waly.app.'
            },
            {
                subtitle: '12.3 Richieste Legali',
                text: 'Per richieste legali, ordini giudiziari o comunicazioni formali, contatta: legal@waly.app.'
            }
        ]
    }
]

export default function TermsPage() {
    const lastUpdated = '2025-11-27'
    const [activeSection, setActiveSection] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Scroll spy effect
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        }

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        sections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100">
            <Navigation />
            {/* Header */}
            <header className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-lg border-b border-zinc-200">
                <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                            W
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                                Documenti legali
                            </p>
                            <h1 className="text-lg md:text-xl font-semibold text-zinc-900">
                                Termini di Servizio
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="hidden md:inline-flex px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                            Torna alla home
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            aria-label="Apri indice"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="flex gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-6">
                                <h2 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wide">
                                    Indice
                                </h2>
                                <nav className="space-y-1">
                                    {sections.map((section, idx) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                activeSection === section.id
                                                    ? 'bg-zinc-900 text-white font-medium'
                                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                                            }`}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Sidebar */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="absolute left-0 top-20 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                <div className="p-6">
                                    <h2 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wide">
                                        Indice
                                    </h2>
                                    <nav className="space-y-1">
                                        {sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                    activeSection === section.id
                                                        ? 'bg-zinc-900 text-white font-medium'
                                                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                                                }`}
                                            >
                                                {section.title}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Introduction Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8">
                            <div className="flex flex-col gap-3">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-600">
                                    Termini di Servizio
                                </span>
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                                            Benvenuto nei Termini di Servizio di Waly
                                        </h2>
                                        <p className="text-sm text-zinc-500">
                                            Ultimo aggiornamento: {lastUpdated}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
                                    <p>
                                        Ti ringraziamo per aver scelto <span className="font-semibold text-zinc-900">Waly</span>, la piattaforma di monitoraggio e gestione patrimoniale personale.
                                    </p>
                                    <p>
                                        Questi Termini di Servizio (&quot;Termini&quot;) regolano l&apos;accesso e l&apos;utilizzo della piattaforma Waly e di tutti i servizi correlati. <span className="font-semibold text-zinc-900">L&apos;accesso o l&apos;utilizzo di Waly implica l&apos;accettazione integrale dei presenti Termini.</span> Se non accetti questi Termini, non potrai utilizzare il servizio.
                                    </p>
                                    <p>
                                        Ti invitiamo a leggere attentamente tutte le sezioni. Per informazioni sul trattamento dei dati personali, consulta la nostra{' '}
                                        <a
                                            href="https://www.iubenda.com/privacy-policy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 font-medium underline"
                                        >
                                            Privacy Policy
                                        </a>{' '}
                                        e la{' '}
                                        <a
                                            href="https://www.iubenda.com/privacy-policy/cookie-policy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 font-medium underline"
                                        >
                                            Cookie Policy
                                        </a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-6">
                            {sections.map((section, idx) => (
                                <div
                                    key={idx}
                                    id={section.id}
                                    className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden scroll-mt-28"
                                >
                                    {/* Section Header */}
                                    <div className="bg-zinc-50 border-b border-zinc-200 px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            {section.icon && (
                                                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center flex-shrink-0">
                                                    <section.icon className="h-5 w-5" />
                                                </div>
                                            )}
                                            <h2 className="text-xl font-bold text-zinc-900">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Section Content */}
                                    <div className="px-8 py-6 space-y-6">
                                        {section.content.map((item, itemIdx) => (
                                            <div key={itemIdx} className="space-y-2">
                                                <h3 className="text-base font-semibold text-zinc-900">
                                                    {item.subtitle}
                                                </h3>
                                                <p className="text-sm text-zinc-700 leading-relaxed">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-zinc-200 p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-zinc-600">
                                    Per ulteriori informazioni, consulta anche:
                                </p>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://www.iubenda.com/privacy-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm text-zinc-700 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors font-medium"
                                    >
                                        Privacy Policy
                                    </a>
                                    <a
                                        href="https://www.iubenda.com/privacy-policy/cookie-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm text-zinc-700 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors font-medium"
                                    >
                                        Cookie Policy
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="mt-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-lg p-8 text-white">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Hai domande sui Termini?
                                    </h3>
                                    <p className="text-sm text-zinc-300">
                                        Il nostro team è a tua disposizione per qualsiasi chiarimento.
                                    </p>
                                </div>
                                <a
                                    href="mailto:support@waly.app"
                                    className="px-6 py-3 bg-white text-zinc-900 hover:bg-zinc-100 rounded-full font-medium text-sm transition-colors shadow-lg whitespace-nowrap"
                                >
                                    Contatta il supporto
                                </a>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
