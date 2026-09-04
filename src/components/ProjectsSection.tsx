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
        { label: "Компания", value: project.company },
        { label: "Заказчик", value: project.client },
        { label: "Продукт", value: project.product },
        { label: "Сроки", value: project.period },
      ]}
    />
  );
}

function ProjectRow({ project }: { project: Project }) {
  /* Показываем первый кейс проекта. Если кейса нет — остаётся только описание. */
  const study = project.cases[0];

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
  return (
    <section id="projects" className="scroll-mt-24 pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <h2 className="text-[15px] font-medium text-muted sm:text-[17px]">
            Опыт
          </h2>
        </Reveal>

        <ul className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
