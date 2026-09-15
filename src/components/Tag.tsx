import { cn } from "@/lib/cn";

export function TagList({
  tags,
  /** Крупнее обычного — для блока «Обо мне» */
  large = false,
}: {
  tags: string[];
  large?: boolean;
}) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap", large ? "gap-2.5" : "gap-2")}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full leading-none text-ink/75",
            large
              ? "bg-tag px-3.5 py-2 text-[15px]"
              : "bg-tag px-3 py-1.5 text-[13px]",
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
