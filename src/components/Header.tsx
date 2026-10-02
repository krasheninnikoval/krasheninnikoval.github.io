"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";
import { cn } from "@/lib/cn";

const sections = [
  { id: "about", label: "Обо мне" },
  { id: "cases", label: "Кейсы" },
] as const;

const item =
  "inline-flex h-10 items-center rounded-full px-4 text-[14px] leading-[19.6px] transition-colors hover:bg-chip hover:text-ink sm:px-4.5 lg:h-auto lg:py-2.5 lg:text-[15px] lg:leading-normal";

/**
 * Компактная плавающая шапка-капсула по центру.
 * На главной подсвечивает раздел, который сейчас на экране;
 * при загрузке это «Обо мне».
 */
export function Header({ variant = "page" }: { variant?: "home" | "page" }) {
  const [active, setActive] = useState<string>("about");

  /* Браузер умеет возвращать прежнюю позицию прокрутки при перезагрузке —
     тогда главная открывается посередине. Открываем всегда сверху,
     если только в ссылке не указан конкретный раздел. */
  useEffect(() => {
    if (variant !== "home") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const { hash, pathname, search } = window.location;
    if (hash.startsWith("#case-")) {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      const frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        window.history.replaceState(
          window.history.state,
          "",
          `${pathname}${search}`,
        );
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (!hash) window.scrollTo(0, 0);
  }, [variant]);

  useEffect(() => {
    if (variant !== "home") return;
    /* Активен тот раздел, который пересекает середину экрана. */
    const update = () => {
      const middle = window.scrollY + window.innerHeight / 2;
      let current: string = sections[0].id;
      for (const { id } of sections) {
        const node = document.getElementById(id);
        if (node && node.offsetTop <= middle) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant]);

  /* На главной якоря локальные, на остальных страницах — с возвратом на главную. */
  const prefix = variant === "home" ? "" : "/";

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:top-7">
      <nav
        aria-label="Основная навигация"
        className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1 shadow-[0_2px_10px_rgba(24,24,27,0.05)] backdrop-blur-md lg:p-2"
      >
        {sections.map((section) => {
          const isActive = variant === "home" && active === section.id;
          return (
            <a
              key={section.id}
              href={`${prefix}#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(item, isActive ? "bg-chip text-ink" : "text-muted")}
            >
              {section.label}
            </a>
          );
        })}

        <a
          href={profile.telegram.url}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(item, "text-muted")}
        >
          Связаться
        </a>
      </nav>
    </header>
  );
}
