import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n.config";
import { LanguageSwitcher } from "@/components/language-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale };

  const metadata = {
    fr: {
      title: "Sponseasy - Créez des Dossiers de Sponsoring Professionnels en Minutes",
      description: "Transformez vos demandes de sponsoring en contrats signés. Créez des dossiers professionnels sans compétences en design. Suivez vos leads et concluez plus de deals.",
      keywords: ["sponsoring", "dossier de sponsoring", "sponsorship", "proposal builder", "CRM", "événements", "athlètes", "podcasters"],
      openGraph: {
        title: "Sponseasy - Plateforme de Dossiers de Sponsoring",
        description: "Créez des dossiers de sponsoring professionnels en minutes. Sans compétences en design. Suivez vos leads. Concluez plus de deals.",
      },
      twitter: {
        title: "Sponseasy - Dossiers de Sponsoring Professionnels",
        description: "Transformez vos demandes de sponsoring en contrats signés en minutes",
      },
    },
    en: {
      title: "Sponseasy - Create Professional Sponsorship Proposals in Minutes",
      description: "Turn sponsorship seekers into sponsors. Build professional proposals without design skills. Track leads. Close deals.",
      keywords: ["sponsorship", "sponsorship proposal", "proposal builder", "CRM", "events", "athletes", "podcasters"],
      openGraph: {
        title: "Sponseasy - Sponsorship Proposal Platform",
        description: "Create professional sponsorship proposals in minutes. No design skills needed. Track leads. Close deals.",
      },
      twitter: {
        title: "Sponseasy - Professional Sponsorship Proposals",
        description: "Turn sponsorship seekers into sponsors in minutes",
      },
    },
  };

  const localeMeta = metadata[locale] || metadata.en;

  return {
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    authors: [{ name: "Sponseasy" }],
    openGraph: {
      title: localeMeta.openGraph.title,
      description: localeMeta.openGraph.description,
      url: "https://sponseasy.com",
      siteName: "Sponseasy",
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: localeMeta.twitter.title,
      description: localeMeta.twitter.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params as { locale: Locale };

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageSwitcher currentLocale={locale} />
        {children}
      </body>
    </html>
  );
}
