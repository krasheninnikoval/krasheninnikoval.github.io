import { cn } from "@/lib/cn";
import type { Metric } from "@/content/types";

/**
 * Результаты в ряд.
 * plain — крупные цифры без разделительных линий (раздел «Опыт»),
 * обычный вид — с линией сверху (шапка кейса и блок metrics внутри кейса).
 */
export function MetricRow({
  items,
  className,
  plain = false,
  /** Уменьшенные цифры — для карточки кейса */
  compact = false,
}: {
  items: Metric[];
  className?: string;
  plain?: boolean;
  compact?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 sm:gap-x-10",
        plain && !compact ? "gap-y-10" : "gap-y-8",
        items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col-reverse justify-end",
            plain ? "gap-2.5" : "gap-1.5 border-t border-line pt-4",
          )}
        >
          <dt
            className={cn(
              "leading-snug text-muted",
              compact ? "text-[13px]" : "text-sm",
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              "font-medium leading-none tracking-tight",
              compact
                ? "text-[26px] sm:text-[32px]"
                : plain
                  ? "text-[36px] sm:text-[44px]"
                  : "text-[32px] sm:text-4xl",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
