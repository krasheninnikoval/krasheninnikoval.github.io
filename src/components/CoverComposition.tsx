import Image from "next/image";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";

const card =
  "overflow-hidden rounded-media border border-edge shadow-[0_1px_2px_rgba(24,24,27,0.05),0_10px_24px_rgba(24,24,27,0.08)]";

/** Высота нижней картинки в долях ширины блока — одинакова у всех обложек. */
const BASE_HEIGHT = 0.315;
/** Высота верхней картинки относительно нижней. */
const OVERLAY_HEIGHT = 1.03;
/** Нахлёст — доля ширины более узкой из двух картинок. */
const OVERLAP_RATIO = 0.243;
/** Насколько верхняя картинка опущена вниз, в долях своей высоты. */
const OVERLAY_SHIFT = 0.2;

/**
 * Обложка кейса: картинка контекста и вторая картинка поверх неё со сдвигом,
 * всё на нейтральной подложке.
 *
 * Ширина верхней картинки считается из её пропорций так, чтобы высота
 * композиции не зависела от того, горизонтальная она или вертикальная.
 * Благодаря этому все обложки в разделе «Опыт» одной высоты.
 *
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
  /* Обе ширины считаются из пропорций так, чтобы высота обложки
     не зависела от того, горизонтальные картинки или вертикальные. */
  const photoWidth = BASE_HEIGHT * (pair.photo.width / pair.photo.height);
  const overlayWidth =
    BASE_HEIGHT * OVERLAY_HEIGHT * (pair.screen.width / pair.screen.height);
  const overlap = OVERLAP_RATIO * Math.min(photoWidth, overlayWidth);
  /* Пара с нахлёстом занимает всю ширину подложки, поэтому доли пересчитываем. */
  const groupWidth = photoWidth + overlayWidth - overlap;
  const photoShare = photoWidth / groupWidth;
  const overlayShare = overlayWidth / groupWidth;
  /* Верхняя картинка свисает вниз — на столько же опускаем низ блока,
     иначе рамка подложки снизу окажется тоньше, чем по бокам. */
  const overhang =
    (overlayShare / (pair.screen.width / pair.screen.height)) * OVERLAY_SHIFT;

  return (
    <div
      className={cn(
        "w-full rounded-card bg-stage",
        compact ? "p-4 sm:p-6" : "p-4 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div
        className="relative grid gap-4 sm:mb-(--overhang) sm:block"
        style={{ "--overhang": `${overhang * 100}%` } as React.CSSProperties}
      >
        {/* Нижняя картинка задаёт высоту композиции */}
        <div
          className={cn(card, "sm:w-(--photo-width)")}
          style={
            {
              "--photo-width": `${photoShare * 100}%`,
            } as React.CSSProperties
          }
        >
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

        {/* Верхняя картинка поверх, со светлым зазором */}
        <div
          className={cn(
            card,
            "sm:absolute sm:bottom-0 sm:right-0 sm:w-(--overlay-width)",
            "sm:translate-y-[20%] sm:ring-8 sm:ring-stage",
          )}
          style={
            {
              "--overlay-width": `${overlayShare * 100}%`,
            } as React.CSSProperties
          }
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

        {/* Пояснительная дуга — только там, где она задана в кейсе */}
        {pair.arrowPath ? (
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
                refX="8.5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1 L9 5 L2 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            <path
              d={pair.arrowPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
              markerEnd="url(#cover-arrow-head)"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.55))" }}
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
}
