"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Номер счётчика Яндекс Метрики. */
const COUNTER_ID = 112490864;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/**
 * Счётчик Яндекс Метрики.
 * Работает только на опубликованном сайте: при локальной разработке
 * не подключается, чтобы наши собственные заходы не попадали в статистику.
 * Переходы между страницами идут без перезагрузки, поэтому каждый
 * такой переход отправляется в Метрику отдельно.
 */
export function Metrika() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      /* Первый просмотр Метрика засчитывает сама при запуске */
      first.current = false;
      return;
    }
    window.ym?.(COUNTER_ID, "hit", window.location.href);
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
        ym(${COUNTER_ID}, 'init', {webvisor:true, clickmap:true, trackLinks:true, accurateTrackBounce:true});`}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
