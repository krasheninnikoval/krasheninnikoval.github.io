import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

export function CaseImage({
  image,
  sizes,
  className,
  priority,
  backdrop = false,
}: {
  image: ImageRef;
  sizes: string;
  className?: string;
  priority?: boolean;
  backdrop?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-card",
          backdrop
            ? "bg-stage p-4 sm:p-8 lg:p-12"
            : "rounded-media border border-line bg-chip",
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
            backdrop &&
              "rounded-media shadow-[0_12px_40px_rgba(24,24,27,0.16)]",
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

      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
