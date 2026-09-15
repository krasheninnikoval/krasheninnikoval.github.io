"use client";

import { useState, useSyncExternalStore } from "react";
import { Container } from "./Container";
import { loadMetrika, readConsent, saveConsent, type Consent } from "@/lib/metrika";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

const button =
  "shrink-0 rounded-full px-5 py-2 text-[15px] font-medium transition-colors";

/**
 * Плашка о сборе статистики. Показывается, пока посетитель не сделал выбор.
 * На сервере не рисуется, чтобы разметка при загрузке совпала с клиентской.
 */
export function CookieNotice() {
  /* До гидрации считаем выбор «отложенным» и ничего не показываем */
  const stored = useSyncExternalStore<Consent | "pending">(
    subscribe,
    readConsent,
    () => "pending",
  );
  const [choice, setChoice] = useState<Consent>("none");
  const consent = choice !== "none" ? choice : stored;

  if (consent !== "none") return null;

  function decide(value: "accepted" | "declined") {
    saveConsent(value);
    setChoice(value);
    if (value === "accepted") loadMetrika();
  }

  return (
    <div
      role="region"
      aria-label="Уведомление о сборе статистики"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface"
    >
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3.5">
        <p className="text-[15px] leading-snug text-muted sm:text-base">
          Здесь работает Яндекс Метрика, cookie помогают мне понять, как люди
          пользуются сайтом
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className={`${button} bg-ink text-surface hover:bg-ink/85`}
          >
            Принять
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className={`${button} text-ink hover:bg-chip`}
          >
            Отказаться
          </button>
        </div>
      </Container>
    </div>
  );
}
