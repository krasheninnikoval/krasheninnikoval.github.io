import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";
import { CoverComposition } from "./CoverComposition";
import { MetricRow } from "./Metrics";

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
      {study.coverPair ? (
        <CoverComposition pair={study.coverPair} compact sizes={sizes} />
      ) : (
        <div
          className={cn(
            "w-full overflow-hidden rounded-media bg-stage",
            wide ? "p-5 sm:p-10 lg:p-12" : "p-4 sm:p-6",
          )}
        >
          <Image
            src={study.preview.src}
            alt={study.preview.alt}
            width={study.preview.width}
            height={study.preview.height}
            sizes={sizes}
            className="h-auto w-full rounded-media shadow-[0_10px_30px_rgba(24,24,27,0.16)] transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

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

        {wide ? (
          <MetricRow
            items={study.results}
            plain
            compact
            className="mt-7 sm:mt-8"
          />
        ) : null}
      </div>
    </Link>
  );
}
