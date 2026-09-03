"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content";
import { CheckIcon, DocumentIcon, MailIcon, TelegramIcon } from "./icons";

const primary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] text-bg transition-opacity hover:opacity-85 sm:w-auto";
const secondary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 text-[15px] text-ink transition-colors hover:border-ink/25 hover:bg-chip sm:w-auto";

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
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <a
        href={profile.telegram.url}
        target="_blank"
        rel="noreferrer noopener"
        className={primary}
      >
        <TelegramIcon />
        Telegram
      </a>

      <a
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={secondary}
      >
        <DocumentIcon />
        Резюме
      </a>

      <a
        href={`mailto:${profile.email}`}
        onClick={handleMail}
        className={secondary}
      >
        {copied ? <CheckIcon /> : <MailIcon />}
        <span aria-live="polite">{copied ? "Адрес скопирован" : "Почта"}</span>
      </a>
    </div>
  );
}
