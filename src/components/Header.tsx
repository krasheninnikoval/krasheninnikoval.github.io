"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Компактная плавающая шапка-капсула по центру.
 * На главной появляется после прокрутки первого экрана,
 * на остальных страницах видна сразу.
 */
export function Header({ variant = "page" }: { variant?: "home" | "page" }) {
  const [shown, setShown] = useState(variant !== "home");

  useEffect(() => {
    if (variant !== "home") return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setShown(window.scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [variant]);

  const prefix = variant === "home" ? "" : "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-all duration-300 sm:top-4",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      <nav
        aria-label="Основная навигация"
        className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_2px_10px_rgba(24,24,27,0.05)] backdrop-blur-md"
      >
        <a
          href={`${prefix}#about`}
          className="hidden rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-chip hover:text-ink sm:block"
        >
          Обо мне
        </a>
        <a
          href={`${prefix}#projects`}
          className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-chip hover:text-ink"
        >
          Проекты
        </a>
        <a
          href={profile.telegram.url}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-ink px-4 py-2 text-sm text-bg transition-opacity hover:opacity-85"
        >
          Связаться
        </a>
      </nav>
    </header>
  );
}
