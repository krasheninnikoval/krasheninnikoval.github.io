import { cn } from "@/lib/cn";

/**
 * Строка-подпись с реквизитами, разделёнными горизонтальными отступами.
 * Используется и в разделе «Опыт», и в шапке страницы кейса.
 * Пустые значения пропускаются.
 */
export function MetaLine({
  items,
  className,
}: {
  items: { label: string; value?: string }[];
  className?: string;
}) {
  const filled = items.filter((item) => Boolean(item.value));
  if (filled.length === 0) return null;

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-5 text-[13px] leading-[18.2px] text-muted lg:text-[15px] lg:leading-relaxed",
        className,
      )}
    >
      {filled.map((item) => (
        <span key={item.label} className="min-w-0">
          {item.label} {item.value}
        </span>
      ))}
    </p>
  );
}
