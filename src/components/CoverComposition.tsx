import Image from "next/image";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";

const layer =
  "overflow-hidden rounded-media shadow-[0_14px_44px_rgba(24,24,27,0.20)]";

/**
 * Обложка кейса: фотография контекста и экран интерфейса поверх неё
 * со сдвигом, на нейтральной подложке. Обе картинки целиком внутри подложки.
 * На узких экранах встают друг под друга.
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
  return (
    <div
      className={cn(
        "w-full rounded-card bg-stage",
        compact ? "p-4 sm:p-6" : "p-4 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="relative grid gap-4 sm:block">
        {/* Фотография кабины задаёт высоту композиции */}
        <div className={cn(layer, "sm:w-[62%]")}>
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

        {/* Экран интерфейса поверх фотографии, со светлым зазором */}
        <div
          className={cn(
            layer,
            "sm:absolute sm:bottom-0 sm:right-0 sm:w-[64%]",
            "sm:ring-8 sm:ring-stage",
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
      </div>
    </div>
  );
}
