import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseBlocks, caseHeading } from "@/components/CaseBlocks";
import { CaseCard } from "@/components/CaseCard";
import { CoverComposition } from "@/components/CoverComposition";
import { Container } from "@/components/Container";
import { MetaLine } from "@/components/MetaLine";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MetricRow } from "@/components/Metrics";
import { Reveal } from "@/components/Reveal";
import { TagList } from "@/components/Tag";
import { ZoomableImage } from "@/components/ZoomableImage";
import { ArrowLeftIcon } from "@/components/icons";
import { getAllCases, getCaseBySlug, getOtherCases } from "@/content";
import { cn } from "@/lib/cn";

/** Список страниц кейсов, которые нужно собрать заранее. */
export function generateStaticParams() {
  return getAllCases().map(({ study }) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const found = getCaseBySlug(slug);
  if (!found) return {};
  const { study, project } = found;
  const image = study.cover?.src ?? study.preview.src;
  return {
    title: study.title,
    description: study.cardSummary,
    openGraph: {
      title: `${study.title} — ${project.title}`,
      description: study.cardSummary,
      images: [{ url: image }],
    },
  };
}

export default async function CasePage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const found = getCaseBySlug(slug);
  if (!found) notFound();

  const { study, project } = found;
  const others = getOtherCases(slug);

  return (
    <>
      <Header />
      <main className="flex-1 pb-24 pt-24 sm:pt-28">
        <Container>
          <article>
            {/* Шапка кейса */}
            <header className="mx-auto w-full max-w-[1040px]">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <ArrowLeftIcon width={16} height={16} />
                Весь опыт
              </Link>

              <p className="mt-10 text-sm text-muted">{project.title}</p>
              <h1 className="mt-3 text-[36px] font-medium leading-[1.06] tracking-[-0.03em] text-balance sm:text-[56px] lg:text-[64px]">
                {study.title}
              </h1>

              {/* Сроки · Команда · Классификация продукта */}
              <MetaLine
                className="mt-6"
                items={[
                  { label: "Заказчик", value: project.client },
                  { label: "Сроки", value: study.meta.timeline },
                  { label: "Команда", value: study.meta.team },
                  { label: "Продукт", value: study.meta.product },
                ]}
              />

              <div className="mt-6">
                <TagList tags={[...project.tags, ...(study.tags ?? [])]} />
              </div>

            </header>

            {study.lead ? (
              <div className="mx-auto mt-12 w-full max-w-reading space-y-4 text-[17px] leading-[1.75] text-ink/85 sm:mt-14">
                {study.lead.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div className="mx-auto mt-12 w-full max-w-reading sm:mt-14">
              <h2 className={cn(caseHeading, "mb-5")}>Результаты</h2>
              {study.highlights?.length ? (
                /* Колонками, как результаты проектов в разделе «Опыт» */
                <ul className="border-t border-line">
                  {study.highlights.map((item) => (
                    <li
                      key={item.title}
                      className="border-b border-line py-5"
                    >
                      <p className="text-[20px] font-medium leading-snug tracking-[-0.01em] sm:text-[22px]">
                        {item.title}
                      </p>
                      {item.text ? (
                        <p className="mt-1.5 text-[17px] leading-relaxed text-muted">
                          {item.text}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : study.results.length > 0 ? (
                <MetricRow items={study.results} plain />
              ) : (
                /* ВРЕМЕННО: заголовок оставлен как напоминание, пока
                   результаты кейса не сформулированы. */
                <p className="text-[17px] leading-relaxed text-muted">
                  дополнить результатами
                </p>
              )}
            </div>

            {study.coverPair ? (
              <CoverComposition
                pair={study.coverPair}
                priority
                className="mx-auto mt-14 max-w-[1040px] sm:mt-16"
                sizes="(max-width: 1100px) 70vw, 700px"
              />
            ) : study.cover ? (
              <ZoomableImage
                image={study.cover}
                priority
                backdrop
                className="mx-auto mt-14 w-full max-w-[1040px] sm:mt-16"
                sizes="(max-width: 1100px) 100vw, 1040px"
              />
            ) : null}

            {/* Тело кейса */}
            <div className="mt-16 sm:mt-20">
              <CaseBlocks blocks={study.blocks} />
            </div>
          </article>
        </Container>

        {/* Другие кейсы */}
        {others.length > 0 ? (
          <Container className="mt-24 sm:mt-32">
            <div className="border-t border-line pt-12">
              <h2 className="text-[15px] font-medium text-muted sm:text-[17px]">
                Другие кейсы
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {others.map(({ study: other }) => (
                  <Reveal as="li" key={other.slug}>
                    <CaseCard
                      study={other}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
