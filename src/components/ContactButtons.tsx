import { profile } from "@/content";
import { DocumentIcon, MailIcon, TelegramIcon } from "./icons";

/* Кнопки-ссылки: иконка и текст, без обводок и заливок. */
const link =
  "group inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-[7px] transition-colors hover:text-muted hover:underline sm:gap-3 sm:text-[22px]";
const icon = "size-[20px] shrink-0 sm:size-[25px]";

export function ContactButtons() {
  return (
    <div className="flex w-full max-w-[420px] flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:max-w-[470px]">
      <a
        href={profile.telegram.url}
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        <TelegramIcon className={icon} strokeWidth={1.75} />
        Telegram
      </a>

      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        <DocumentIcon className={icon} strokeWidth={1.75} />
        Резюме
      </a>

      <a href={`mailto:${profile.email}`} className={link}>
        <MailIcon className={icon} strokeWidth={1.75} />
        Почта
      </a>
    </div>
  );
}
