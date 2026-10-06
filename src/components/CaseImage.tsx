import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

export function CaseImage({
  image,
  sizes,
  className,
  priority,
  backdrop = false,
  flat = false,
  extraBottomSpace = false,
  captionInsideBackdrop = false,
  captionPosition = "below",
}: {
  image: ImageRef;
  sizes: string;
  className?: string;
  priority?: boolean;
  backdrop?: boolean;
  flat?: boolean;
  extraBottomSpace?: boolean;
  captionInsideBackdrop?: boolean;
  captionPosition?: "below" | "left" | "above";
}) {
  const hasCaption = Boolean(image.captionTitle || image.caption);
  const sideCaption =
    backdrop &&
    captionInsideBackdrop &&
    captionPosition === "left" &&
    hasCaption;
  const aboveCaption =
    backdrop &&
    captionInsideBackdrop &&
    captionPosition === "above" &&
    hasCaption;
  const caption = hasCaption ? (
    <figcaption
      className={cn(
        aboveCaption ? "text-ink" : "text-muted",
        sideCaption
          ? "mt-0 min-w-0 self-start text-[12px] leading-4 sm:mt-6 sm:text-sm sm:leading-relaxed lg:mt-8"
          : aboveCaption
            ? "mb-4 sm:mb-5"
            : captionInsideBackdrop
            ? "mt-4 text-sm leading-relaxed"
            : "mt-3 text-sm leading-relaxed",
      )}
    >
      {image.captionTitle ? (
        <span
          className={cn(
            "block text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed",
            image.caption && "mb-1.5",
          )}
        >
          {image.captionTitle}
        </span>
      ) : null}
      {image.caption ? (
        <span
          className={cn(
            aboveCaption &&
              "block text-[12px] font-normal leading-4 text-muted sm:text-sm sm:leading-relaxed",
          )}
        >
          {image.caption}
        </span>
      ) : null}
    </figcaption>
  ) : null;

  return (
    <figure
      className={cn(
        className,
        backdrop &&
          captionInsideBackdrop &&
          "rounded-card bg-stage p-4 sm:p-8 lg:p-12",
        sideCaption &&
          "grid grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] items-start gap-3 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,2.35fr)] sm:gap-6 lg:gap-10",
      )}
    >
      {sideCaption || aboveCaption ? caption : null}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-card",
          backdrop && !captionInsideBackdrop
            ? extraBottomSpace
              ? "bg-stage px-4 pt-4 pb-8 sm:px-8 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-12 lg:pb-16"
              : "bg-stage p-4 sm:p-8 lg:p-12"
            : !backdrop && "rounded-media border border-line bg-chip",
          Boolean(image.overlayLabels?.length) &&
            "bg-stage pt-[1.6%] sm:pt-[1.15%] lg:bg-chip lg:pt-0",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={cn(
            "h-auto w-full",
            backdrop && "rounded-media",
            backdrop &&
              !flat &&
              "shadow-[0_12px_40px_rgba(24,24,27,0.16)]",
          )}
        />

        {image.overlayLabels?.map((label) => (
          <p
            key={label.text}
            className="pointer-events-none absolute top-[2.65%] whitespace-nowrap text-[13px] font-medium leading-none text-muted sm:top-[3.64%] sm:text-[18px] lg:top-(--label-top)"
            style={
              {
                left: `${label.left}%`,
                "--label-top": `${label.top}%`,
              } as React.CSSProperties
            }
          >
            {label.text}
          </p>
        ))}
      </div>

      {!sideCaption && !aboveCaption ? caption : null}
    </figure>
  );
}
