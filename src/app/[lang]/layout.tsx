import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { siteUrl } from "@/content/profile";
import { SiteCursor } from "@/components/site/SiteCursor";
import { SiteFooter } from "@/components/site/SiteFooter";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/alternates";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: alternates(locale, ""),
    openGraph: {
      type: "website",
      siteName: "Og‘abek Avazov",
      title: dict.meta.title,
      description: dict.meta.description,
      locale,
      images: [{ url: "/images/projects/e-researcher.webp", width: 1382, height: 864 }],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <html lang={locale} className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="min-h-svh font-sans antialiased">
        <SiteCursor />
        {children}
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
