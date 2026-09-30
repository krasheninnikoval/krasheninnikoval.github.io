import Image from "next/image";
import type { CoverComparison } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Обложка «Было / Стало». Все экраны показаны в одном масштабе,
 * а старое длинное меню намеренно уходит под обрезку.
 */
export function ComparisonCover({
  comparison,
  className,
  priority = false,
  sizes,
}: {
  comparison: CoverComparison;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  const [beforeHome, beforeMenu] = comparison.before;
  const [afterHome, afterMenu] = comparison.after;

  return (
    <div
      className={cn(
        "relative aspect-[5/3] w-full overflow-hidden bg-stage",
        className,
      )}
    >
      <div className="absolute inset-y-0 left-[3%] w-[45.5%]">
        <p className="absolute left-0 top-[5%] text-[13px] font-medium text-muted sm:text-[15px]">
          Было
        </p>
        <div className="absolute inset-x-0 top-[13%] flex items-start justify-between gap-[3%]">
          <Image
            src={beforeHome.src}
            alt={beforeHome.alt}
            width={beforeHome.width}
            height={beforeHome.height}
            sizes={sizes}
            priority={priority}
            className="h-auto min-w-0 flex-1"
          />
          <Image
            src={beforeMenu.src}
            alt={beforeMenu.alt}
            width={beforeMenu.width}
            height={beforeMenu.height}
            sizes={sizes}
            priority={priority}
            className="h-auto min-w-0 flex-1"
          />
        </div>
      </div>

      <div className="absolute inset-y-0 right-[3%] w-[45.5%]">
        <p className="absolute left-0 top-[5%] text-[13px] font-medium text-muted sm:text-[15px]">
          Стало
        </p>
        <div className="absolute inset-x-0 top-[13%] flex items-start justify-between gap-[3%]">
          <Image
            src={afterHome.src}
            alt={afterHome.alt}
            width={afterHome.width}
            height={afterHome.height}
            sizes={sizes}
            priority={priority}
            className="h-auto min-w-0 flex-1"
          />
          <Image
            src={afterMenu.src}
            alt={afterMenu.alt}
            width={afterMenu.width}
            height={afterMenu.height}
            sizes={sizes}
            priority={priority}
            className="h-auto min-w-0 flex-1"
          />
        </div>
      </div>
    </div>
  );
}
