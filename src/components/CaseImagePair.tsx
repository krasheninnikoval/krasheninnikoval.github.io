import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

export function CaseImagePair({
  images,
  className,
}: {
  images: [ImageRef, ImageRef];
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "grid gap-8 rounded-card bg-stage p-4 sm:grid-cols-2 sm:gap-8 sm:p-8 lg:gap-10 lg:p-12",
      )}
    >
      {images.map((image, index) => (
        <figure key={image.src} className="flex min-w-0 flex-col">
          <div className="flex h-[320px] items-start justify-center sm:h-[420px] lg:h-[480px]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1100px) 45vw, 456px"
              className={cn(
                "w-auto max-w-full rounded-media object-contain",
                index === 0
                  ? "h-[320px] sm:h-[420px] lg:h-[480px]"
                  : "h-[181px] sm:h-[237px] lg:h-[271px]",
              )}
            />
          </div>

          {image.caption ? (
            <figcaption className="mt-4 text-[12px] leading-4 text-muted sm:mt-5 sm:text-sm sm:leading-relaxed">
              {image.captionTitle ? (
                <span className="mb-1.5 block text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed">
                  {image.captionTitle}
                </span>
              ) : null}
              <span>{image.caption}</span>
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
