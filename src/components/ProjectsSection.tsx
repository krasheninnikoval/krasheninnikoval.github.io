import { projects } from "@/content";
import type { Project } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Container } from "./Container";
import { MetricList } from "./Metrics";
import { Reveal } from "./Reveal";
import { TagList } from "./Tag";

function ProjectRow({ project }: { project: Project }) {
  /* Показываем первый кейс проекта. Если кейса нет — правая колонка пустая. */
  const study = project.cases[0];

  return (
    <Reveal
      as="li"
      className="border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-12"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-16">
        {/* Левая колонка: проект */}
        <div>
          <h3 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-balance sm:text-[34px]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-6">
            <TagList tags={project.tags} />
          </div>

          <div className="mt-8">
            <MetricList items={project.results} />
          </div>
        </div>

        {/* Правая колонка: карточка кейса или пустое место */}
        <div>{study ? <CaseCard study={study} /> : null}</div>
      </div>
    </Reveal>
  );
}

/** Раздел «Проекты» на главной. */
export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pb-24 pt-8 sm:pb-32">
      <Container>
        <Reveal>
          <h2 className="text-[15px] font-medium uppercase tracking-[0.14em] text-muted sm:text-[17px]">
            Опыт
          </h2>
        </Reveal>

        <ul className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
