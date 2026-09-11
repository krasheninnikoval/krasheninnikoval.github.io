"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/**
 * Переходы между страницами идут без перезагрузки, поэтому каждый
 * такой переход отправляется в Метрику отдельно. Сам счётчик
 * подключается в разметке страницы — см. `metrikaSnippet`.
 */
export function MetrikaRouteTracker({ counterId }: { counterId: number }) {
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

  return null;
}
