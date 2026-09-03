import type { CaseBlock } from "@/content/types";
import { cn } from "@/lib/cn";
import { MetricRow } from "./Metrics";
import { ZoomableImage } from "./ZoomableImage";

const reading = "mx-auto w-full max-w-reading";
const wide = "mx-auto w-full max-w-[1040px]";

const heading =
  "text-2xl font-medium leading-snug tracking-[-0.02em] text-balance sm:text-[28px]";
const prose = "space-y-4 text-[17px] leading-[1.75] text-ink/85";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className={prose}>
      {items.map((text) => (
        <p key={text.slice(0, 32)}>{text}</p>
      ))}
    </div>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "text":
      return (
        <div className={reading}>
          {block.heading ? (
            <h2 className={cn(heading, "mb-5")}>{block.heading}</h2>
          ) : null}
          <Paragraphs items={block.paragraphs} />
        </div>
      );

    case "textImage":
      return (
        <div className={block.wide ? wide : reading}>
          <div className={block.wide ? reading : undefined}>
            {block.heading ? (
              <h2 className={cn(heading, "mb-5")}>{block.heading}</h2>
            ) : null}
            <Paragraphs items={block.paragraphs} />
          </div>
          <ZoomableImage
            image={block.image}
            className="mt-8"
            sizes={
              block.wide
                ? "(max-width: 1100px) 100vw, 1040px"
                : "(max-width: 780px) 100vw, 720px"
            }
          />
        </div>
      );

    case "image":
      return (
        <ZoomableImage
          image={block.image}
          className={block.wide ? wide : reading}
          sizes={
            block.wide
              ? "(max-width: 1100px) 100vw, 1040px"
              : "(max-width: 780px) 100vw, 720px"
          }
        />
      );

    case "gallery":
      return (
        <div className={wide}>
          {block.heading ? (
            <h2 className={cn(heading, "mb-6 w-full max-w-reading")}>
              {block.heading}
            </h2>
          ) : null}
          <div
            className={cn(
              "grid gap-4",
              block.images.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
            )}
          >
            {block.images.map((image) => (
              <ZoomableImage
                key={image.src + image.alt}
                image={image}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>
        </div>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <div className={reading}>
          {block.heading ? (
            <h2 className={cn(heading, "mb-5")}>{block.heading}</h2>
          ) : null}
          <ListTag
            className={cn(
              "space-y-3 pl-5 text-[17px] leading-[1.7] text-ink/85 marker:text-muted",
              block.ordered ? "list-decimal" : "list-disc",
            )}
          >
            {block.items.map((item) => (
              <li key={item.slice(0, 32)} className="pl-1">
                {item}
              </li>
            ))}
          </ListTag>
        </div>
      );
    }

    case "quote":
      return (
        <figure className={reading}>
          <blockquote className="border-l-2 border-ink pl-6 text-[21px] leading-snug tracking-[-0.01em] text-balance sm:text-[24px]">
            «{block.text}»
          </blockquote>
          {block.author ? (
            <figcaption className="mt-4 pl-6 text-sm text-muted">
              {block.author}
            </figcaption>
          ) : null}
        </figure>
      );

    case "metrics":
      return (
        <div className={reading}>
          {block.heading ? (
            <h2 className={cn(heading, "mb-6")}>{block.heading}</h2>
          ) : null}
          <MetricRow items={block.items} plain />
        </div>
      );

    case "divider":
      return <hr className={cn(reading, "border-line")} />;
  }
}

export function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <div className="space-y-14 sm:space-y-20">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}
