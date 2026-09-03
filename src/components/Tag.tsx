export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] leading-none text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
