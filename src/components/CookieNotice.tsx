"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "metrika-notice-seen";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/* Если хранилище недоступно, считаем уведомление показанным —
   лучше не показать плашку, чем показывать её при каждом заходе. */
function readSeen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

/**
 * Уведомление о сборе статистики. Показывается один раз, до нажатия «Хорошо».
 * На сервере не рисуется, чтобы разметка при загрузке совпала с клиентской.
 */
export function CookieNotice() {
  const seen = useSyncExternalStore(subscribe, readSeen, () => true);
  const [dismissed, setDismissed] = useState(false);

  if (seen || dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Нет хранилища — плашка просто закроется до перезагрузки */
    }
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Уведомление о сборе статистики"
      className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 rounded-card border border-line bg-surface p-4 shadow-[0_8px_30px_rgba(24,24,27,0.10)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-[380px] sm:flex-row sm:items-center sm:gap-4"
    >
      <p className="text-[14px] leading-snug text-muted">
        Сайт собирает обезличенную статистику посещений через{" "}
        <a
          href="https://yandex.ru/legal/confidential/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-ink underline underline-offset-4 transition-colors hover:text-muted"
        >
          Яндекс Метрику
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 self-start rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-surface transition-colors hover:bg-ink/85 sm:self-auto"
      >
        Хорошо
      </button>
    </div>
  );
}
