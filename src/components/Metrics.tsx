import { cn } from "@/lib/cn";
import type { Metric } from "@/content/types";

/** Результаты в ряд — шапка страницы кейса и блок metrics внутри кейса. */
export function MetricRow({
  items,
  className,
}: {
  items: Metric[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10",
        items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col-reverse justify-end gap-1.5 border-t border-line pt-4"
        >
          <dt className="text-sm leading-snug text-muted">{item.label}</dt>
          <dd className="text-[32px] font-medium leading-none tracking-tight sm:text-4xl">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
