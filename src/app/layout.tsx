import type { Metadata, Viewport} from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { LanguageProvider } from "@/context/maincontext";
import {auth} from "@/auth/auth"
import { Session } from "next-auth";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Define default metadata configuration for the public site
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://the-journal-phi.vercel.app"
  ),
  // Configura il template per i titoli delle sotto-pagine (es: "Caso Garlasco | The Journal")
  title: {
    default: "The Journal — Data Journalism & OSINT",
    template: "%s | The Journal",
  },
  description:
    "Analisi di dati, atti pubblici e connessioni temporali per ricostruire i fatti in modo oggettivo e verificato.",
  keywords: [
    "Data Journalism",
    "OSINT",
    "Cronaca Nera",
    "Atti Pubblici",
    "Inchieste",
    "Dossier",
    "Timeline Investigativa",
  ],
  authors: [{ name: "The Journal Editorial Team" }],
  creator: "DataInquest",
  publisher: "The Journal",
  
  // Impostazioni per i motori di ricerca
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph / Facebook / WhatsApp / LinkedIn
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://the-journal-phi.vercel.app/", 
    siteName: "The Journal",
    title: "The Journal — Data Journalism incontra la cronaca nera",
    description:
      "Analisi di dati, atti pubblici e connessioni temporali per ricostruire i fatti in modo oggettivo.",
    images: [
      {
        url: "/og-image.png", // Immagine nella cartella /public (consigliato 1200x630)
        width: 1200,
        height: 630,
        alt: "The Journal — Platform Preview",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "The Journal — Data Journalism & OSINT",
    description:
      "Ricostruzione oggettiva di casi di cronaca tramite atti pubblici e dati verificati.",
    images: ["/og-image.png"],
    creator: "@thejournal", 
  },
 // Icone e Favicon
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/icon1.png", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
  apple: "/apple-icon.png",
},
manifest: "/manifest.json",
category: "Journalism",


};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const session : Session | null  = await  auth()  


  return (
    <html
      lang="it"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col pt-16 bg-zinc-950">
        <LanguageProvider>
          <Navbar session={session} />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
