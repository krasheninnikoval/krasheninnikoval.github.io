import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

export function CaseImageGroup({
  heading,
  images,
  compactMobile = false,
  className,
}: {
  heading: string;
  images: ImageRef[];
  compactMobile?: boolean;
  className?: string;
}) {
  return (
    <section className={cn(className, "rounded-card bg-stage p-4 sm:p-8 lg:p-12")}>
      <h4 className="mb-6 text-[15px] font-medium leading-snug text-ink sm:mb-8 sm:text-[17px]">
        {heading}
      </h4>

      <div
        className={cn(
          "grid items-start",
          compactMobile
            ? "grid-cols-3 gap-3 sm:gap-5 lg:gap-8"
            : "gap-8 lg:grid-cols-3 lg:gap-8",
        )}
      >
        {images.map((image, index) => (
          <figure key={image.src} className="min-w-0">
            <div className="lg:aspect-[614/672]">
              {compactMobile ? (
                <span className="mb-2 block text-[12px] leading-4 text-muted lg:hidden">
                  {index + 1}
                </span>
              ) : null}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1023px) calc(100vw - 72px), 293px"
                className={cn(
                  "h-auto w-full object-contain",
                  !image.preserveSourceCorners && "rounded-media",
                )}
              />
            </div>

            {image.caption ? (
              <figcaption
                className={cn(
                  "mt-4 text-[12px] leading-4 text-muted sm:mt-5 sm:text-sm sm:leading-relaxed",
                  compactMobile && "hidden lg:block",
                )}
              >
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

      {compactMobile ? (
        <div className="mt-6 space-y-4 text-[12px] leading-4 text-muted sm:mt-8 sm:text-sm sm:leading-relaxed lg:hidden">
          {images.map((image, index) => (
            <div key={`${image.src}-mobile-caption`}>
              {image.captionTitle ? (
                <span className="mb-1 block text-[13px] font-medium leading-[18px] text-ink sm:text-[15px] sm:leading-relaxed">
                  {index + 1}. {image.captionTitle}
                </span>
              ) : null}
              {image.caption ? <span>{image.caption}</span> : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
