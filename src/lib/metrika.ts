/** Номер счётчика Яндекс Метрики. */
export const METRIKA_ID = 112490864;

/**
 * Счётчик работает только на опубликованном сайте: при локальной
 * разработке он не нужен, иначе наши собственные заходы попадут в статистику.
 */
export const metrikaEnabled = process.env.NODE_ENV === "production";

/** Ключ, под которым в браузере посетителя хранится его выбор. */
export const CONSENT_KEY = "metrika-consent";

export type Consent = "accepted" | "declined" | "none";

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : "none";
  } catch {
    /* Хранилище недоступно — считаем, что человек отказался */
    return "declined";
  }
}

export function saveConsent(value: Exclude<Consent, "none">) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* Нет хранилища — выбор проживёт до перезагрузки страницы */
  }
}

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/**
 * Подключает счётчик. Вызывается только после согласия посетителя,
 * повторные вызовы ничего не делают.
 */
export function loadMetrika() {
  if (!metrikaEnabled || typeof window === "undefined") return;
  if (window.ym) return;

  const queue: unknown[][] = [];
  const ym = ((...args: unknown[]) => {
    queue.push(args);
  }) as Window["ym"] & { a?: unknown[][]; l?: number };
  ym.a = queue;
  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(script);

  window.ym(METRIKA_ID, "init", {
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
}
