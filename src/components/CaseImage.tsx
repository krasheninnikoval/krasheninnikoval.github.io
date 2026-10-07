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
  fullWidthInsideBackdrop = false,
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
  fullWidthInsideBackdrop?: boolean;
  captionPosition?: "below" | "left" | "above";
}) {
  const hasCaption = Boolean(image.captionTitle || image.caption);
  const horizontalCrop = image.horizontalCrop;
  const visibleWidth = horizontalCrop
    ? 100 - horizontalCrop.left - horizontalCrop.right
    : 100;
  const sideCaption =
    backdrop &&
    captionInsideBackdrop &&
    captionPosition === "left" &&
    hasCaption;
  const aboveCaption = captionPosition === "above" && hasCaption;
  const caption = hasCaption ? (
    <figcaption
      className={cn(
        aboveCaption ? "text-ink" : "text-muted",
        sideCaption
          ? "mt-0 min-w-0 self-start text-[12px] leading-4 sm:mt-6 sm:text-sm sm:leading-relaxed lg:mt-8"
          : aboveCaption
            ? cn(
                "mb-4 sm:mb-5",
                fullWidthInsideBackdrop &&
                  "px-4 pt-4 sm:px-8 sm:pt-8 lg:px-12 lg:pt-12",
              )
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
          cn(
            fullWidthInsideBackdrop
              ? "overflow-hidden bg-stage"
              : "bg-stage p-4 sm:p-8 lg:p-12",
            !image.preserveSourceCorners && "rounded-card",
          ),
        sideCaption &&
          "grid grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] items-start gap-3 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,2.35fr)] sm:gap-6 lg:gap-10",
      )}
    >
      {sideCaption || aboveCaption ? caption : null}

      <div
        className={cn(
          "relative overflow-hidden",
          !image.preserveSourceCorners && "rounded-card",
          fullWidthInsideBackdrop && horizontalCrop
            ? "mx-4 w-auto sm:mx-8 lg:mx-12 lg:aspect-(--crop-aspect)"
            : "w-full",
          backdrop && !captionInsideBackdrop
            ? extraBottomSpace
              ? "bg-stage px-4 pt-4 pb-8 sm:px-8 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-12 lg:pb-16"
              : "bg-stage p-4 sm:p-8 lg:p-12"
            : !backdrop &&
              cn(
                "border border-line bg-chip",
                !image.preserveSourceCorners && "rounded-media",
              ),
          Boolean(image.overlayLabels?.length) &&
            "bg-stage pt-4 sm:pt-5 lg:bg-chip lg:pt-0",
        )}
        style={
          horizontalCrop
            ? ({
                "--crop-aspect": `${(image.width * visibleWidth) / 100} / ${image.height}`,
                "--crop-left": `${(-horizontalCrop.left / visibleWidth) * 100}%`,
                "--crop-width": `${10000 / visibleWidth}%`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={cn(
            horizontalCrop
              ? "relative h-auto w-full lg:absolute lg:top-0 lg:left-(--crop-left) lg:w-(--crop-width) lg:max-w-none"
              : "h-auto w-full",
            backdrop &&
              !image.preserveSourceCorners &&
              "rounded-media",
            backdrop &&
              !flat &&
              "shadow-[0_12px_40px_rgba(24,24,27,0.16)]",
          )}
        />

        {image.overlayLabels?.map((label) => (
          <p
            key={label.text}
            className={cn(
              "pointer-events-none absolute top-[2.65%] whitespace-nowrap text-[13px] font-medium leading-[18px] text-ink sm:top-[3.64%] sm:text-[15px] sm:leading-relaxed lg:top-(--label-top)",
              horizontalCrop &&
                "left-(--label-left-mobile) lg:left-(--label-left-desktop)",
            )}
            style={
              horizontalCrop
                ? ({
                    "--label-left-mobile": `${label.left}%`,
                    "--label-left-desktop": `${((label.left - horizontalCrop.left) / visibleWidth) * 100}%`,
                    "--label-top": `${label.top}%`,
                  } as React.CSSProperties)
                : ({
                    left: `${label.left}%`,
                    "--label-top": `${label.top}%`,
                  } as React.CSSProperties)
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
