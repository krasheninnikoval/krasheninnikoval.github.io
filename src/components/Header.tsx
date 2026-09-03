import { profile } from "@/content";

/**
 * Компактная плавающая шапка-капсула по центру.
 * Видна сразу на всех страницах, включая первый экран главной.
 */
export function Header({ variant = "page" }: { variant?: "home" | "page" }) {
  /* На главной якоря локальные, на остальных страницах — с возвратом на главную. */
  const prefix = variant === "home" ? "" : "/";

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
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
          Опыт
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
