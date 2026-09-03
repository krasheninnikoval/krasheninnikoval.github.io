import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile, site } from "@/content";
import "./globals.css";

/* Шрифт с полноценной кириллицей. Чтобы попробовать другой — меняется здесь. */
const sans = Inter({
  variable: "--font-app-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.fullName} — ${profile.role}`,
    template: `%s — ${profile.fullName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: profile.fullName,
    title: `${profile.fullName} — ${profile.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Без JavaScript анимация появления не сработает — показываем всё сразу */}
        <noscript>
          <style>{".reveal{opacity:1}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
