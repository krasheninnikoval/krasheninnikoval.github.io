import { projects } from "@/content";
import type { Project } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Container } from "./Container";
import { cn } from "@/lib/cn";
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

/** Описание проекта — один или несколько абзацев */
function ProjectDescription({
  text,
  list,
  className,
}: {
  text: string | string[];
  list?: string[];
  className?: string;
}) {
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <div
      className={cn(
        "max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-ink/80",
        className,
      )}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
      ))}
      {list?.length ? (
        <ol className="list-decimal space-y-3 pl-5 marker:text-muted">
          {list.map((item) => (
            <li key={item.slice(0, 32)} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

function ProjectRow({
  project,
  divided = true,
}: {
  project: Project;
  /** Разделительная линия перед проектом */
  divided?: boolean;
}) {
  /* Показываем первый непрятанный кейс проекта.
     Если такого нет — остаётся только описание и результаты. */
  const study = project.cases.find((item) => !item.hidden);
  /* Если у проекта есть кейс — показываем его результаты, иначе свои. */
  const results = study ? study.results : project.results;

  return (
    <Reveal
      as="li"
      className={cn(
        divided && "border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-12",
      )}
    >
      {/* Описание проекта */}
      <h3 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-balance sm:text-[34px]">
        {project.title}
      </h3>
      <ProjectMeta project={project} />

      {project.resultsAside ? (
        /* Слева описание, справа результаты: свои у проекта или из его кейса */
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
          <ProjectDescription
            text={project.description}
            list={project.descriptionList}
          />
          <MetricRow items={results} plain narrow />
        </div>
      ) : (
        <ProjectDescription
          text={project.description}
          list={project.descriptionList}
          className="mt-5"
        />
      )}

      <div className={project.resultsAside ? "mt-8" : "mt-6"}>
        <TagList tags={project.tags} />
      </div>

      {/* Без кейса и без выноса — результаты идут под тэгами */}
      {!project.resultsAside && !study ? (
        <MetricRow items={project.results} plain className="mt-10 sm:mt-12" />
      ) : null}

      {/* Кейс — под описанием, на всю ширину раздела */}
      {study ? (
        <div className="mt-10 sm:mt-12">
          <CaseCard
            study={study}
            wide
            showResults={!project.resultsAside}
            sizes="(max-width: 1600px) 100vw, 1520px"
          />
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

        {/* Проекты с кейсами — без разделителей: карточка кейса и так
           отделяет один проект от другого */}
        {/* Якорь меню: заголовок первого проекта встаёт под шапкой */}
        <ul id="cases" className="scroll-mt-28 space-y-24 sm:space-y-28">
          {main.map((project) => (
            <ProjectRow key={project.slug} project={project} divided={false} />
          ))}
        </ul>

        {other.length > 0 ? (
          <div className="mt-36 sm:mt-48">
            <h3 className="text-[15px] font-medium text-muted sm:text-[17px]">
              Про другие проекты
            </h3>
            <ul className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
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
