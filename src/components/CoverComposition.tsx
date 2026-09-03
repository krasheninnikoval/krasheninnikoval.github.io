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
      </div>
    </div>
  );
}
