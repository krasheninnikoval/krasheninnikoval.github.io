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
  captionInsideBackdrop = false,
  captionPosition = "below",
}: {
  image: ImageRef;
  sizes: string;
  className?: string;
  priority?: boolean;
  backdrop?: boolean;
  flat?: boolean;
  captionInsideBackdrop?: boolean;
  captionPosition?: "below" | "left";
}) {
  const sideCaption =
    backdrop &&
    captionInsideBackdrop &&
    captionPosition === "left" &&
    Boolean(image.caption);
  const caption = image.caption ? (
    <figcaption
      className={cn(
        "text-muted",
        sideCaption
          ? "mt-0 min-w-0 self-start text-[12px] leading-4 sm:mt-6 sm:text-sm sm:leading-relaxed lg:mt-8"
          : captionInsideBackdrop
            ? "mt-4 text-sm leading-relaxed"
            : "mt-3 text-sm leading-relaxed",
      )}
    >
      {image.captionTitle ? (
        <span className="mb-1.5 block text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed">
          {image.captionTitle}
        </span>
      ) : null}
      <span>{image.caption}</span>
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
      {sideCaption ? caption : null}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-card",
          backdrop && !captionInsideBackdrop
            ? "bg-stage p-4 sm:p-8 lg:p-12"
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

      {!sideCaption ? caption : null}
    </figure>
  );
}
