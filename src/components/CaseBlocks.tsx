import type { CaseBlock } from "@/content/types";
import { cn } from "@/lib/cn";
import { MetricRow } from "./Metrics";
import { ZoomableImage } from "./ZoomableImage";

const reading = "mx-auto w-full max-w-reading";
const wide = "mx-auto w-full max-w-[1040px]";

const heading =
  "text-2xl font-medium leading-snug tracking-[-0.02em] text-balance sm:text-[28px]";
const subheading =
  "text-[19px] font-medium leading-snug tracking-[-0.01em] text-balance sm:text-[21px]";
const prose = "space-y-4 text-[17px] leading-[1.75] text-ink/85";
const listBase =
  "space-y-3 pl-5 text-[17px] leading-[1.7] text-ink/85 marker:text-muted";

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

    case "image": {
      const imageSizes = block.wide
        ? "(max-width: 1100px) 100vw, 1040px"
        : "(max-width: 780px) 100vw, 720px";
      if (!block.heading) {
        return (
          <ZoomableImage
            image={block.image}
            className={block.wide ? wide : reading}
            sizes={imageSizes}
          />
        );
      }
      return (
        <div className={block.wide ? wide : reading}>
          {/* Заголовок выравниваем по колонке текста, как у остальных блоков,
             а саму картинку оставляем во всю ширину. */}
          <h2 className={cn(heading, "mx-auto mb-6 w-full max-w-reading")}>
            {block.heading}
          </h2>
          <ZoomableImage image={block.image} sizes={imageSizes} />
        </div>
      );
    }

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
            block.sub ? (
              <h3 className={cn(subheading, "mb-4")}>{block.heading}</h3>
            ) : (
              <h2 className={cn(heading, "mb-5")}>{block.heading}</h2>
            )
          ) : null}
          {block.paragraphs ? (
            <div className={cn(prose, "mb-5")}>
              {block.paragraphs.map((text) => (
                <p key={text.slice(0, 32)}>{text}</p>
              ))}
            </div>
          ) : null}
          <ListTag
            className={cn(listBase, block.ordered ? "list-decimal" : "list-disc")}
          >
            {block.items.map((item) =>
              typeof item === "string" ? (
                <li key={item.slice(0, 32)} className="pl-1">
                  {item}
                </li>
              ) : (
                <li key={item.term} className="pl-1">
                  <span className="font-medium text-ink">{item.term}.</span>{" "}
                  {item.text}
                </li>
              ),
            )}
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
      {blocks.map((block, index) => {
        /* Подчинённый блок стоит ближе к своему разделу, чем к соседнему. */
        const sub = "sub" in block && block.sub;
        return (
          <div key={`${block.type}-${index}`} className={cn(sub && "-mt-8 sm:-mt-12")}>
            <Block block={block} />
          </div>
        );
      })}
    </div>
  );
}
