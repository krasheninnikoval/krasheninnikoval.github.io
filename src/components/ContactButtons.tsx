"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content";
import { CheckIcon, DocumentIcon, MailIcon, TelegramIcon } from "./icons";

/* Кнопки-ссылки: иконка и текст, без обводок и заливок. */
const link =
  "group inline-flex items-center gap-2.5 text-[15px] text-ink underline-offset-[6px] transition-colors hover:text-muted hover:underline sm:text-base";
const icon = "shrink-0 text-muted transition-colors group-hover:text-ink/60";

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
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4 sm:gap-x-9">
      <a
        href={profile.telegram.url}
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        <TelegramIcon className={icon} width={19} height={19} />
        Telegram
      </a>

      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        <DocumentIcon className={icon} width={19} height={19} />
        Резюме
      </a>

      <a
        href={`mailto:${profile.email}`}
        onClick={handleMail}
        className={link}
      >
        {copied ? (
          <CheckIcon className={icon} width={19} height={19} />
        ) : (
          <MailIcon className={icon} width={19} height={19} />
        )}
        <span aria-live="polite">{copied ? "Адрес скопирован" : "Почта"}</span>
      </a>
    </div>
  );
}
