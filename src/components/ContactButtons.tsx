"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content";
import { CheckIcon, DocumentIcon, MailIcon, TelegramIcon } from "./icons";

/* Кнопки-ссылки: иконка и текст, без обводок и заливок. */
const link =
  "group inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-[7px] transition-colors hover:text-muted hover:underline sm:gap-3 sm:text-[22px]";
const icon =
  "size-[20px] shrink-0 text-muted transition-colors group-hover:text-ink/60 sm:size-[25px]";

export function ContactButtons() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  /** Открываем почтовый клиент и параллельно кладём адрес в буфер обмена. */
  const handleMail = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(profile.email)
      .then(() => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        /* буфер недоступен — mailto всё равно сработает */
      });
  };

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

      <a
        href={`mailto:${profile.email}`}
        onClick={handleMail}
        className={link}
      >
        {copied ? (
          <CheckIcon className={icon} strokeWidth={1.75} />
        ) : (
          <MailIcon className={icon} strokeWidth={1.75} />
        )}
        <span aria-live="polite">{copied ? "Адрес скопирован" : "Почта"}</span>
      </a>
    </div>
  );
}
