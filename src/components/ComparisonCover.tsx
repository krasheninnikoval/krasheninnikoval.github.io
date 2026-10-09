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
  const cardLabelClassName =
    "absolute left-0 top-[4%] text-[13px] font-medium text-muted sm:top-[5%] sm:text-[15px]";
  const cardImageRowClassName =
    "absolute inset-x-0 top-[14%] flex items-start justify-between gap-[3%] lg:top-[13%]";

  const imageRow = (
    home: typeof beforeHome,
    menu: typeof beforeMenu,
    rowClassName: string,
  ) => (
    <div className={rowClassName}>
      <Image
        src={home.src}
        alt={home.alt}
        width={home.width}
        height={home.height}
        sizes={sizes}
        priority={priority}
        className="h-auto min-w-0 flex-1"
      />
      <Image
        src={menu.src}
        alt={menu.alt}
        width={menu.width}
        height={menu.height}
        sizes={sizes}
        priority={priority}
        className="h-auto min-w-0 flex-1"
      />
    </div>
  );

  const comparisonContent = (
    <div
      className={cn(
        "relative aspect-[5/3] w-full overflow-hidden bg-stage",
        className,
      )}
    >
      <div className="absolute inset-y-0 left-[3%] w-[45.5%]">
        <p className={cardLabelClassName}>Было</p>
        {imageRow(beforeHome, beforeMenu, cardImageRowClassName)}
      </div>

      <div className="absolute inset-y-0 right-[3%] w-[45.5%]">
        <p className={cardLabelClassName}>Стало</p>
        {imageRow(afterHome, afterMenu, cardImageRowClassName)}
      </div>
    </div>
  );

  if (!detail) return comparisonContent;

  return (
    <figure className={cn(className, "overflow-hidden rounded-card bg-stage")}>
      <div className="mx-4 grid grid-cols-[48.5%_48.5%] justify-between py-4 sm:mx-8 sm:py-8 lg:mx-12 lg:py-12">
        <div>
          <p className="text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed">
            Было
          </p>
          <div className="relative mt-4 aspect-[0.95] sm:mt-5">
            {imageRow(
              beforeHome,
              beforeMenu,
              "absolute inset-x-0 top-0 flex items-start justify-between gap-[3%]",
            )}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed">
            Стало
          </p>
          <div className="mt-4 aspect-[0.95] overflow-hidden sm:mt-5">
            {imageRow(
              afterHome,
              afterMenu,
              "flex items-start justify-between gap-[3%]",
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
