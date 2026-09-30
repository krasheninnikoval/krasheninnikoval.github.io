"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";
import { ChevronLeftIcon } from "./icons";

export function CaseCarousel({
  images,
  sizes,
  className,
}: {
  images: ImageRef[];
  sizes: string;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = images.length - 1;

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? lastIndex : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === lastIndex ? 0 : index + 1));
  };

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Результирующие экраны"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className="relative">
        <div className="relative aspect-[5/3] overflow-hidden rounded-card border border-line bg-stage">
          {images.map((image, index) => {
            const active = index === activeIndex;

            return (
              <div
                key={image.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} из ${images.length}`}
                aria-hidden={!active}
              >
                <Image
                  src={image.src}
                  alt={active ? image.alt : ""}
                  width={image.width}
                  height={image.height}
                  sizes={sizes}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={showPrevious}
          className="absolute left-0 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink sm:size-10"
        >
          <ChevronLeftIcon className="size-5 -translate-x-px" />
        </button>

        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={showNext}
          className="absolute right-0 top-1/2 grid size-9 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink sm:size-10"
        >
          <ChevronLeftIcon className="size-5 translate-x-px rotate-180" />
        </button>
      </div>

      <div
        className="mt-1 flex items-center justify-center gap-0"
        aria-label="Выбор слайда"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Показать слайд ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className="grid size-4 place-items-center rounded-full"
          >
            <span
              className={cn(
                "size-1.5 rounded-full transition-colors",
                index === activeIndex ? "bg-muted" : "bg-edge",
              )}
            />
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Слайд {activeIndex + 1} из {images.length}: {images[activeIndex]?.alt}
      </p>
    </div>
  );
}
