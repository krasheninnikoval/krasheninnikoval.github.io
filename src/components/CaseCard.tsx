import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";

/**
 * Карточка кейса. Используется и в правой колонке проекта на главной,
 * и в блоке «Другие кейсы» внизу страницы кейса.
 */
export function CaseCard({
  study,
  sizes = "(max-width: 1024px) 100vw, 55vw",
}: {
  study: CaseStudy;
  sizes?: string;
}) {
  return (
    <Link
      href={`/cases/${study.slug}`}
      className="group block rounded-card border border-line bg-surface p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_30px_rgba(24,24,27,0.06)]"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-media bg-chip">
        <Image
          src={study.preview.src}
          alt={study.preview.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-2 pb-2 pt-5">
        <h3 className="text-xl font-medium leading-snug tracking-[-0.01em] text-pretty sm:text-[22px]">
          {study.title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
          {study.cardSummary}
        </p>
      </div>
    </Link>
  );
}
