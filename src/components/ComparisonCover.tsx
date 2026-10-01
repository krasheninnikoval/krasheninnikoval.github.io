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
  detail = false,
  priority = false,
  sizes,
}: {
  comparison: CoverComparison;
  className?: string;
  detail?: boolean;
  priority?: boolean;
  sizes: string;
}) {
  const [beforeHome, beforeMenu] = comparison.before;
  const [afterHome, afterMenu] = comparison.after;
  const labelClassName = cn(
    "absolute left-0 top-[4%] font-medium text-muted sm:top-[5%]",
    detail
      ? "text-[13px] leading-none sm:text-[18px]"
      : "text-[13px] sm:text-[15px]",
  );
  const imageRowClassName = cn(
    "absolute inset-x-0 flex items-start justify-between gap-[3%]",
    detail
      ? "top-[14%] sm:top-[13%] lg:top-[11%]"
      : "top-[14%] lg:top-[13%]",
  );

  return (
    <div
      className={cn(
        "relative aspect-[5/3] w-full overflow-hidden bg-stage",
        className,
      )}
    >
      <div className="absolute inset-y-0 left-[3%] w-[45.5%]">
        <p className={labelClassName}>Было</p>
        <div className={imageRowClassName}>
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
        <p className={labelClassName}>Стало</p>
        <div className={imageRowClassName}>
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
