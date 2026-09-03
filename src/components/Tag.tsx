export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-tag px-3 py-1.5 text-[13px] leading-none text-ink/75"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
