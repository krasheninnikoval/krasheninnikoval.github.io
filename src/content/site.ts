/**
 * Адрес сайта. На Vercel подставляется автоматически, локально — localhost.
 * Когда появится свой домен, его можно прописать в NEXT_PUBLIC_SITE_URL.
 */
function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  /** Без слэша в конце */
  url: resolveUrl(),
  title: "Портфолио",
  description:
    "Продуктовый дизайнер, 3+ года опыта: промышленное ПО, B2B-системы, low-code платформы. Портфолио с кейсами и результатами.",
  locale: "ru_RU",
} as const;
