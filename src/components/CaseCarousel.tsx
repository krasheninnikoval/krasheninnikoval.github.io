"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";
import { ChevronLeftIcon } from "./icons";

export function CaseCarousel({
  images,
  sizes,
  className,
  variant = "stage",
}: {
  images: ImageRef[];
  sizes: string;
  className?: string;
  variant?: "stage" | "screens";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const lastIndex = images.length - 1;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(
      `[data-carousel-slide="${index}"]`,
    );
    if (!slide) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const centeredLeft =
      slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    const left = Math.max(
      0,
      Math.min(centeredLeft, track.scrollWidth - track.clientWidth),
    );
    track.scrollTo({
      left,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  const showPrevious = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const showNext = () => {
    if (activeIndex < lastIndex) scrollToIndex(activeIndex + 1);
  };

  return (
    <div
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 lg:left-auto lg:w-auto lg:translate-x-0",
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Результирующие экраны"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className="mb-3 flex items-center gap-2 px-5 sm:px-8 lg:hidden lg:px-0">
        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={showPrevious}
          disabled={activeIndex === 0}
          className="grid size-11 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink disabled:cursor-default disabled:opacity-30"
        >
          <ChevronLeftIcon className="size-5 -translate-x-px" />
        </button>

        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={showNext}
          disabled={activeIndex === lastIndex}
          className="grid size-11 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink disabled:cursor-default disabled:opacity-30"
        >
          <ChevronLeftIcon className="size-5 translate-x-px rotate-180" />
        </button>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={0}
          onScroll={(event) => {
            const track = event.currentTarget;
            const trackCenter = track.scrollLeft + track.clientWidth / 2;
            const slides = Array.from(
              track.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
            );
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;
            slides.forEach((slide, index) => {
              const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
              const distance = Math.abs(slideCenter - trackCenter);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            });
            setActiveIndex(closestIndex);
          }}
          className="carousel-track flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:scroll-px-8 sm:px-8 lg:scroll-px-0 lg:gap-0 lg:px-0"
          aria-label="Слайды карусели"
        >
          {images.map((image, index) => {
            const hasCaption = Boolean(image.captionTitle || image.caption);
            return (
              <figure
                key={image.src}
                data-carousel-slide={index}
                className={cn(
                  "w-[85%] min-w-[85%] shrink-0 snap-always snap-center first:snap-start last:snap-end lg:w-full lg:min-w-full lg:snap-start",
                  variant === "stage"
                    ? hasCaption
                      ? "flex flex-col overflow-hidden rounded-card bg-stage"
                      : "aspect-[5/3] overflow-hidden rounded-card border border-line bg-stage"
                    : "flex items-start justify-start",
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} из ${images.length}`}
              >
                {hasCaption ? (
                  <figcaption className="mb-3 px-4 pt-4 text-ink sm:mb-4 sm:px-8 sm:pt-8 lg:px-12 lg:pt-12">
                    {image.captionTitle ? (
                      <span
                        className={cn(
                          "block text-[13px] font-medium leading-[18px] sm:text-[15px] sm:leading-relaxed",
                          image.caption && "mb-1.5",
                        )}
                      >
                        {image.captionTitle}
                      </span>
                    ) : null}
                    {image.caption ? (
                      <span className="block text-[12px] font-normal leading-4 text-muted sm:text-sm sm:leading-relaxed">
                        {image.caption}
                      </span>
                    ) : null}
                  </figcaption>
                ) : null}

                <div
                  className={cn(
                    hasCaption && variant === "stage"
                      ? "mt-auto aspect-[5/3] overflow-hidden rounded-media"
                      : "h-full w-full",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={sizes}
                    className={cn(
                      variant === "stage"
                        ? "h-full w-full object-contain"
                        : "h-auto w-full",
                    )}
                  />
                </div>
              </figure>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={showPrevious}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink disabled:cursor-default disabled:opacity-30 lg:grid"
        >
          <ChevronLeftIcon className="size-5 -translate-x-px" />
        </button>

        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={showNext}
          disabled={activeIndex === lastIndex}
          className="absolute right-0 top-1/2 hidden size-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted shadow-[0_2px_10px_rgba(24,24,27,0.10)] transition-colors hover:bg-chip hover:text-ink disabled:cursor-default disabled:opacity-30 lg:grid"
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
            onClick={() => scrollToIndex(index)}
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
