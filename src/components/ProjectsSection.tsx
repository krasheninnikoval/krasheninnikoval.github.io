import { projects } from "@/content";
import type { Project } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Container } from "./Container";
import { MetaLine } from "./MetaLine";
import { MetricRow } from "./Metrics";
import { Reveal } from "./Reveal";
import { TagList } from "./Tag";

/** Компания, заказчик и сроки — тонкая строка-подпись под названием проекта. */
function ProjectMeta({ project }: { project: Project }) {
  return (
    <MetaLine
      className="mt-3"
      items={[
        { label: "Заказчик", value: project.client },
        { label: "Компания", value: project.company },
        { label: "Продукт", value: project.product },
        { label: "Сроки", value: project.period },
      ]}
    />
  );
}

function ProjectRow({ project }: { project: Project }) {
  /* Показываем первый непрятанный кейс проекта.
     Если такого нет — остаётся только описание и результаты. */
  const study = project.cases.find((item) => !item.hidden);

  return (
    <Reveal
      as="li"
      className="border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-12"
    >
      {/* Описание проекта */}
      <h3 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-balance sm:text-[34px]">
        {project.title}
      </h3>
      <ProjectMeta project={project} />

      <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-ink/80">
        {project.description}
      </p>

      <div className="mt-6">
        <TagList tags={project.tags} />
      </div>

      {/* Результаты показываем, только если у проекта нет кейса:
         иначе цифры уже стоят на карточке кейса. */}
      {study ? null : (
        <MetricRow items={project.results} plain className="mt-10 sm:mt-12" />
      )}

      {/* Кейс — под описанием, на всю ширину раздела */}
      {study ? (
        <div className="mt-10 sm:mt-12">
          <CaseCard study={study} wide sizes="(max-width: 1280px) 100vw, 1240px" />
        </div>
      ) : null}
    </Reveal>
  );
}

/** Раздел «Проекты» на главной. */
export function ProjectsSection() {
  /* Наверху проекты с кейсами, ниже — остальные. */
  const main = projects.filter((project) => !project.secondary);
  const other = projects.filter((project) => project.secondary);

  return (
    <section id="projects" className="scroll-mt-24 pb-24 sm:pb-32">
      <Container>
        {/* Заголовок скрыт визуально, но остаётся для поисковиков
           и программ чтения с экрана: без него раздел теряет структуру. */}
        <h2 className="sr-only">Опыт</h2>

        <ul className="space-y-14 sm:space-y-16">
          {main.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>

        {other.length > 0 ? (
          <div className="mt-24 border-t border-line pt-14 sm:mt-32 sm:pt-16">
            <h3 className="text-[24px] font-medium leading-tight tracking-[-0.02em] sm:text-[28px]">
              Другие проекты
            </h3>
            <ul className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
              {other.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
