import Image from "next/image";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";

const card =
  "overflow-hidden rounded-media shadow-[0_14px_44px_rgba(24,24,27,0.20)]";

/**
 * Обложка кейса: картинка контекста (техника или фотография) и экран
 * интерфейса поверх неё, всё на нейтральной подложке.
 * На узких экранах картинки встают друг под друга.
 */
export function CoverComposition({
  pair,
  className,
  priority,
  sizes,
  compact = false,
}: {
  pair: NonNullable<CaseStudy["coverPair"]>;
  className?: string;
  priority?: boolean;
  /** Размеры для оптимизации картинок под ширину блока */
  sizes: string;
  /** Уменьшенные отступы — для карточки в разделе «Опыт» */
  compact?: boolean;
}) {
  const bare = pair.photoBare === true;

  return (
    <div
      className={cn(
        "w-full rounded-card bg-stage",
        compact
          ? "p-4 sm:p-6 sm:pb-14"
          : "p-4 sm:p-8 sm:pb-20 lg:p-10 lg:pb-24",
        className,
      )}
    >
      <div className="relative grid gap-4 sm:block">
        {/* Картинка контекста задаёт высоту композиции */}
        <div className={cn(bare ? "sm:w-full" : cn(card, "sm:w-[56%]"))}>
          <Image
            src={pair.photo.src}
            alt={pair.photo.alt}
            width={pair.photo.width}
            height={pair.photo.height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        </div>

        {/* Экран интерфейса поверх, со светлым зазором */}
        <div
          className={cn(
            card,
            "sm:absolute sm:bottom-0 sm:translate-y-[20%] sm:ring-8 sm:ring-stage",
            bare ? "sm:left-0 sm:w-[46%]" : "sm:right-0 sm:w-[58%]",
          )}
        >
          <Image
            src={pair.screen.src}
            alt={pair.screen.alt}
            width={pair.screen.width}
            height={pair.screen.height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        </div>

        {/* Дуга от экрана к панели в кабине.
           Система координат SVG совпадает с блоком: 1000 единиц по ширине,
           315 по высоте — это пропорция фотографии при её ширине 56%. */}
        <svg
          viewBox="0 0 1000 315"
          preserveAspectRatio="none"
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible text-white sm:block"
        >
          <defs>
            <marker
              id="cover-arrow-head"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d="M418 206 C 332 250, 198 218, 150 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd="url(#cover-arrow-head)"
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.55))" }}
          />
        </svg>
      </div>
    </div>
  );
}
