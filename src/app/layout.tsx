import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import { CookieNotice } from "@/components/CookieNotice";
import { MetrikaTracker } from "@/components/Metrika";
import { profile, site } from "@/content";
import { METRIKA_ID, metrikaEnabled, metrikaSnippet } from "@/lib/metrika";
import "./globals.css";

/* Шрифт с полноценной кириллицей. Чтобы попробовать другой — меняется здесь. */
const sans = Golos_Text({
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
      <head>
        {/* Счётчик Яндекс Метрики — подключается первым, чтобы засчитать
           даже тех, кто закроет страницу почти сразу */}
        {metrikaEnabled ? (
          <script dangerouslySetInnerHTML={{ __html: metrikaSnippet }} />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        {/* Без JavaScript анимация появления не сработает — показываем всё сразу */}
        <noscript>
          <style>{".reveal{opacity:1}"}</style>
        </noscript>
        {children}
        <CookieNotice />
        {metrikaEnabled ? <MetrikaTracker counterId={METRIKA_ID} /> : null}
        {metrikaEnabled ? (
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        ) : null}
      </body>
    </html>
  );
}
