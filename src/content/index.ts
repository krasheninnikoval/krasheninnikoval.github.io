import { deepTypo } from "@/lib/typography";
import { profile as rawProfile } from "./profile";
import { projects as rawProjects } from "./projects";
import type { CaseStudy, Project } from "./types";

/* Все тексты проходят микротипографику: висячих предлогов и частиц не остаётся. */
export const projects = deepTypo(rawProjects);
export const profile = deepTypo(rawProfile);

export { site } from "./site";
export type * from "./types";

/** Кейс вместе с проектом, к которому он относится. */
export interface CaseWithProject {
  study: CaseStudy;
  project: Project;
}

/** Все кейсы всех проектов в порядке следования проектов. */
export function getAllCases(): CaseWithProject[] {
  return projects.flatMap((project) =>
    project.cases.map((study) => ({ study, project })),
  );
}

export function getCaseBySlug(slug: string): CaseWithProject | undefined {
  return getAllCases().find(({ study }) => study.slug === slug);
}

/**
 * Кейсы для блока «Другие кейсы» внизу страницы кейса.
 * Сначала кейсы того же проекта, затем остальные. Текущий исключён.
 */
export function getOtherCases(slug: string, limit = 4): CaseWithProject[] {
  const all = getAllCases().filter((c) => c.study.slug !== slug);
  const current = getCaseBySlug(slug);
  if (!current) return all.slice(0, limit);
  const sameProject = all.filter((c) => c.project.slug === current.project.slug);
  const rest = all.filter((c) => c.project.slug !== current.project.slug);
  return [...sameProject, ...rest].slice(0, limit);
}
