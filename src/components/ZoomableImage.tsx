"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";
import { CloseIcon } from "./icons";

/**
 * Картинка внутри кейса. По клику открывается крупно поверх страницы —
 * это важно для скриншотов интерфейсов с мелким текстом.
 */
export function ZoomableImage({
  image,
  sizes,
  className,
  priority,
  /** Экран на нейтральной подложке — для обложек кейсов */
  backdrop = false,
}: {
  image: ImageRef;
  sizes: string;
  className?: string;
  priority?: boolean;
  backdrop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Открыть изображение крупнее: ${image.alt}`}
        className={cn(
          "block w-full cursor-zoom-in overflow-hidden rounded-card",
          backdrop
            ? "bg-stage p-4 sm:p-8 lg:p-12"
            : "rounded-media border border-line bg-chip",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={cn(
            "h-auto w-full",
            backdrop &&
              "rounded-media shadow-[0_12px_40px_rgba(24,24,27,0.16)]",
          )}
        />
      </button>

      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {image.caption}
        </figcaption>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={close}
          className={cn(
            "fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center",
            "bg-ink/92 p-4 backdrop-blur-sm sm:p-10",
          )}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute right-4 top-4 rounded-full bg-bg/10 p-2.5 text-bg transition-colors hover:bg-bg/20 sm:right-6 sm:top-6"
          >
            <CloseIcon width={22} height={22} />
          </button>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            className="max-h-[90svh] w-auto max-w-full rounded-media object-contain"
          />
        </div>
      ) : null}
    </figure>
  );
}
