import Image from "next/image";
import type { CoverPair } from "@/content/types";
import { cn } from "@/lib/cn";

const card = "overflow-hidden rounded-media";
const framedCard =
  "border border-edge shadow-[0_1px_2px_rgba(24,24,27,0.05),0_10px_24px_rgba(24,24,27,0.08)]";

/** Высота нижней картинки в долях ширины блока — одинакова у всех обложек. */
const BASE_HEIGHT = 0.315;
/** Высота верхней картинки относительно нижней. */
const OVERLAY_HEIGHT = 1.03;
/** Нахлёст — доля ширины более узкой из двух картинок. */
const OVERLAP_RATIO = 0.243;
/** Насколько верхняя картинка опущена вниз, в долях своей высоты. */
const OVERLAY_SHIFT = 0.2;
/** То же для иллюстрации проекта: экран опущен ниже. */
const BARE_OVERLAY_SHIFT = 0.82;
/** В иллюстрации проекта экран главный, фотография только задаёт контекст. */
const BARE_PHOTO_SHARE = 0.48;
const BARE_SCREEN_SHARE = 0.74;

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
  bare = false,
}: {
  pair: CoverPair;
  className?: string;
  priority?: boolean;
  /** Размеры для оптимизации картинок под ширину блока */
  sizes: string;
  /** Уменьшенные отступы — для карточки в разделе «Опыт» */
  compact?: boolean;
  /** Без подложки и полей — для иллюстрации проекта */
  bare?: boolean;
}) {
  /* В обложках обе ширины считаются из пропорций так, чтобы высота
     не зависела от ориентации картинок. В проектной иллюстрации экран
     намеренно крупнее фотографии, поскольку он является главным объектом. */
  const photoWidth = BASE_HEIGHT * (pair.photo.width / pair.photo.height);
  const overlayWidth =
    BASE_HEIGHT * OVERLAY_HEIGHT * (pair.screen.width / pair.screen.height);
  const overlap = OVERLAP_RATIO * Math.min(photoWidth, overlayWidth);
  /* Пара с нахлёстом занимает всю ширину подложки, поэтому доли пересчитываем. */
  const groupWidth = photoWidth + overlayWidth - overlap;
  const photoShare = bare ? BARE_PHOTO_SHARE : photoWidth / groupWidth;
  const overlayShare = bare ? BARE_SCREEN_SHARE : overlayWidth / groupWidth;
  /* Верхняя картинка свисает вниз — на столько же опускаем низ блока,
     иначе рамка подложки снизу окажется тоньше, чем по бокам. */
  const shift = bare ? BARE_OVERLAY_SHIFT : OVERLAY_SHIFT;
  const overhang =
    (overlayShare / (pair.screen.width / pair.screen.height)) * shift;

  return (
    <div
      className={cn(
        "w-full rounded-card",
        bare
          ? ""
          : cn("bg-stage", compact ? "p-4 sm:p-6" : "p-4 sm:p-8 lg:p-10"),
        className,
      )}
    >
      <div
        className="relative grid gap-4 sm:mb-(--overhang) sm:block"
        style={{ "--overhang": `${overhang * 100}%` } as React.CSSProperties}
      >
        {/* Нижняя картинка задаёт высоту композиции */}
        <div
          className={cn(
            card,
            !bare && framedCard,
            bare
              ? "order-2 w-full justify-self-start sm:order-none sm:w-(--overlay-width) lg:w-(--photo-width)"
              : "sm:w-(--photo-width)",
          )}
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
            !bare && framedCard,
            bare && "order-1 sm:order-none",
            "sm:absolute sm:bottom-0 sm:right-0 sm:w-(--overlay-width)",
            bare
              ? "border-2 border-stage sm:translate-y-(--overlay-shift)"
              : "sm:translate-y-(--overlay-shift) sm:ring-8 sm:ring-stage",
          )}
          style={
            {
              "--overlay-width": `${overlayShare * 100}%`,
              "--overlay-shift": `${shift * 100}%`,
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
            viewBox={bare ? "0 0 1000 610" : "0 0 1000 315"}
            preserveAspectRatio="none"
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-0 top-0 hidden w-full overflow-visible text-white sm:block",
              bare ? "aspect-[1000/610]" : "h-full",
            )}
          >
            <defs>
              <marker
                id="cover-arrow-head"
                viewBox={bare ? "0 0 14 10" : "0 0 10 10"}
                refX={bare ? 13 : 8.5}
                refY="5"
                markerWidth={bare ? 9 : 6}
                markerHeight={bare ? 5.5 : 6}
                orient="auto-start-reverse"
              >
                <path
                  d={bare ? "M1 1.5 L13 5 L1 8.5" : "M2 1 L9 5 L2 9"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={bare ? 1.2 : 1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {bare ? (
              <text
                x="660"
                y="98"
                textAnchor="middle"
                className="fill-current text-[17px] font-medium"
                style={{
                  filter:
                    "drop-shadow(0 2px 4px rgba(24,24,27,0.75)) drop-shadow(0 0 7px rgba(24,24,27,0.35))",
                }}
              >
                <tspan x="660">Расположение панели</tspan>
                <tspan x="660" dy="23">
                  в кабине
                </tspan>
              </text>
            ) : null}
            <path
              d={pair.arrowPath}
              fill="none"
              stroke="currentColor"
              strokeWidth={bare ? 3.8 : 3.4}
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
