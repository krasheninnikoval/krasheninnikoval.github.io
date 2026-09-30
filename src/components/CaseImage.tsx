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
            className="pointer-events-none absolute whitespace-nowrap text-[13px] font-medium leading-none text-muted sm:text-[18px]"
            style={{ left: `${label.left}%`, top: `${label.top}%` }}
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
