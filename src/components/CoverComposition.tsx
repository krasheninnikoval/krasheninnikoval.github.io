import Image from "next/image";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";

const shadow = "shadow-[0_14px_44px_rgba(24,24,27,0.22)]";

/**
 * Обложка кейса: фотография контекста и экран интерфейса поверх неё,
 * всё на нейтральной подложке. Пропорция 16:9.
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
        "relative aspect-16/9 w-full overflow-hidden rounded-card bg-stage",
        compact ? "p-4 sm:p-6" : "p-4 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="relative h-full w-full">
        {/* Фотография кабины */}
        <div
          className={cn(
            "absolute left-0 top-0 w-[62%] overflow-hidden rounded-media",
            shadow,
          )}
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

        {/* Экран интерфейса поверх */}
        <div
          className={cn(
            "absolute bottom-0 right-0 w-[68%] overflow-hidden rounded-media",
            "ring-4 ring-stage sm:ring-8",
            shadow,
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
