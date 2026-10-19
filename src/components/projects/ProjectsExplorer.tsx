"use client";

import { useState } from "react";
import type { CategoryId, Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/site/Reveal";
import { ProjectRow } from "./ProjectRow";

type ProjectsExplorerProps = {
  projects: Project[];
  locale: Locale;
  labels: {
    all: string;
    filter: string;
    view: string;
    screenshot: string;
    categories: Record<CategoryId, string>;
  };
};

export function ProjectsExplorer({ projects, locale, labels }: ProjectsExplorerProps) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const categories = (Object.keys(labels.categories) as CategoryId[]).filter((id) =>
    projects.some((project) => project.category === id),
  );
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);

  const chip = (id: CategoryId | "all", label: string, count: number) => (
    <button
      key={id}
      type="button"
      aria-pressed={active === id}
      onClick={() => setActive(id)}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
        active === id ? "bg-gold text-black" : "bg-surface text-ink-soft hover:bg-surface-2 hover:text-ink"
      }`}
    >
      {label} <span className={active === id ? "text-black/60" : "text-muted"}>{count}</span>
    </button>
  );

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-3">
        {chip("all", labels.all, projects.length)}
        {categories.map((id) =>
          chip(id, labels.categories[id], projects.filter((project) => project.category === id).length),
        )}
      </div>

      <div className="mt-16 flex flex-col gap-24 lg:mt-20 lg:gap-32">
        {visible.map((project, index) => (
          <Reveal key={`${active}-${project.slug}`}>
            <ProjectRow
              project={project}
              locale={locale}
              categoryLabel={labels.categories[project.category]}
              viewLabel={labels.view}
              screenshotLabel={labels.screenshot}
              reverse={index % 2 === 1}
              headingLevel="h2"
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}
