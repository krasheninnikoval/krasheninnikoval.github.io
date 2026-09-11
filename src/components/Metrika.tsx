"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** Ссылка → название цели в Метрике. */
function goalFor(href: string): string | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("t.me/")) return "telegram";
  if (href.toLowerCase().endsWith(".pdf")) return "resume";
  return null;
}

/**
 * Отправляет в Метрику то, чего она не видит сама:
 * переходы между страницами (они идут без перезагрузки)
 * и клики по контактам — Telegram, почта, резюме.
 * Сам счётчик подключается в разметке страницы, см. `metrikaSnippet`.
 */
export function MetrikaTracker({ counterId }: { counterId: number }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      /* Первый просмотр Метрика засчитывает сама при запуске */
      first.current = false;
      return;
    }
    window.ym?.(counterId, "hit", window.location.href);
  }, [counterId, pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const goal = goalFor(link.getAttribute("href") ?? "");
      if (goal) window.ym?.(counterId, "reachGoal", goal);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [counterId]);

  return null;
}
