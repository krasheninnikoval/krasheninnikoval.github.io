import { Fragment } from "react";
import { cn } from "@/lib/cn";

/**
 * Строка-подпись с реквизитами: «Подпись значение · Подпись значение».
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
    <p className={cn("text-[15px] leading-relaxed text-muted", className)}>
      {filled.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 ? <span className="px-2 text-line">·</span> : null}
          {item.label} {item.value}
        </Fragment>
      ))}
    </p>
  );
}
