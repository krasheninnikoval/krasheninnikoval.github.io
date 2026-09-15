import { profile } from "@/content";
import { ArrowUpRightIcon } from "./icons";

/* Кнопки-пилюли: главное действие тёмное, остальные с обводкой. */
const pill =
  "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium leading-none transition-colors sm:px-6 sm:py-3.5 sm:text-[17px]";
/* Прозрачная обводка — чтобы высота совпадала с кнопками в обводке */
const primary = `${pill} border border-transparent bg-ink text-surface hover:bg-ink/85`;
const secondary = `${pill} border border-line bg-surface text-ink hover:bg-chip`;

export function ContactButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={profile.telegram.url}
        target="_blank"
        rel="noreferrer noopener"
        className={primary}
      >
        Telegram
        <ArrowUpRightIcon
          width={16}
          height={16}
          strokeWidth={1.8}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={secondary}
      >
        Резюме
      </a>

      <a href={`mailto:${profile.email}`} className={secondary}>
        Почта
      </a>
    </div>
  );
}
