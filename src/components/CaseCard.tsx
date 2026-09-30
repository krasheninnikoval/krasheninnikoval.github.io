import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/cn";
import { ComparisonCover } from "./ComparisonCover";
import { CoverComposition } from "./CoverComposition";
import { MetricRow } from "./Metrics";

/**
 * Карточка кейса. Используется и в правой колонке проекта на главной,
 * и в блоке «Другие кейсы» внизу страницы кейса.
 * Единый порядок контента: обложка → заголовок → описание → результат.
 */
export function CaseCard({
  study,
  sizes = "(max-width: 1024px) 100vw, 55vw",
  /** Широкая карточка на всю ширину раздела — превью ниже по высоте */
  wide = false,
  /** Показывать результаты кейса на карточке */
  showResults = true,
}: {
  study: CaseStudy;
  sizes?: string;
  wide?: boolean;
  showResults?: boolean;
}) {
  const edgeToEdge = Boolean(
    study.coverComparison || study.cardPreviewEdgeToEdge,
  );

  return (
    <Link
      href={`/cases/${study.slug}`}
      className={cn(
        "group block rounded-card border border-line bg-surface",
        edgeToEdge ? "overflow-hidden" : "p-3",
      )}
    >
      <div className={cn("overflow-hidden", !edgeToEdge && "rounded-card")}>
        <div className="origin-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          {study.cardPreviewPlaceholder ? (
            <div aria-hidden className="aspect-[5/3] w-full bg-stage" />
          ) : study.coverComparison ? (
            <ComparisonCover
              comparison={study.coverComparison}
              sizes={sizes}
            />
          ) : study.coverPair ? (
            <CoverComposition pair={study.coverPair} compact sizes={sizes} />
          ) : (
            <div
              className={cn(
                "w-full overflow-hidden bg-stage",
                edgeToEdge
                  ? "aspect-[5/3]"
                  : cn(
                      "rounded-media",
                      wide ? "p-5 sm:p-10 lg:p-12" : "p-4 sm:p-6",
                    ),
              )}
            >
              <Image
                src={study.preview.src}
                alt={study.preview.alt}
                width={study.preview.width}
                height={study.preview.height}
                sizes={sizes}
                className={cn(
                  edgeToEdge
                    ? "h-full w-full object-cover"
                    : "h-auto w-full rounded-media shadow-[0_1px_2px_rgba(24,24,27,0.05),0_10px_24px_rgba(24,24,27,0.08)]",
                )}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "pt-5",
          edgeToEdge ? "px-5 pb-5 sm:px-6 sm:pb-6" : "px-2 pb-2",
        )}
      >
        <h3
          className={cn(
            "font-medium leading-snug tracking-[-0.01em] text-pretty",
            wide ? "text-[22px] sm:text-[26px]" : "text-xl sm:text-[22px]",
          )}
        >
          {study.cardTitle ?? study.title}
        </h3>

        <p className="mt-2.5 max-w-[72ch] text-[15px] leading-relaxed text-muted sm:text-base">
          {study.cardSummary}
        </p>

        {showResults && study.cardResult ? (
          <p className="mt-5 text-pretty text-[14px] leading-relaxed text-ink/75 sm:text-[15px]">
            {study.cardResult}
          </p>
        ) : null}

        {showResults && !study.cardResult ? (
          <MetricRow
            items={study.results}
            plain
            compact
            className={wide ? "mt-7 sm:mt-8" : "mt-6"}
          />
        ) : null}
      </div>
    </Link>
  );
}
