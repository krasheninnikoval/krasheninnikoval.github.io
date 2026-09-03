import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Карточка кейса. Используется и в правой колонке проекта на главной,
 * и в блоке «Другие кейсы» внизу страницы кейса.
 */
export function CaseCard({
  study,
  sizes = "(max-width: 1024px) 100vw, 55vw",
  /** Широкая карточка на всю ширину раздела — превью ниже по высоте */
  wide = false,
}: {
  study: CaseStudy;
  sizes?: string;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/cases/${study.slug}`}
      className="group block rounded-card border border-line bg-surface p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_30px_rgba(24,24,27,0.06)]"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-media bg-chip",
          wide ? "aspect-16/9" : "aspect-16/10",
        )}
      >
        <Image
          src={study.preview.src}
          alt={study.preview.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-2 pb-2 pt-5">
        <h3
          className={cn(
            "font-medium leading-snug tracking-[-0.01em] text-pretty",
            wide ? "text-[22px] sm:text-[26px]" : "text-xl sm:text-[22px]",
          )}
        >
          {study.title}
        </h3>
        <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted sm:text-base">
          {study.cardSummary}
        </p>
      </div>
    </Link>
  );
}
