import Link from "next/link";
import { tr, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { ChevronRight } from "@/components/site/icons";
import { ProjectCover } from "./ProjectCover";

type ProjectRowProps = {
  project: Project;
  locale: Locale;
  categoryLabel: string;
  viewLabel: string;
  screenshotLabel: string;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
};

export function ProjectRow({
  project,
  locale,
  categoryLabel,
  viewLabel,
  screenshotLabel,
  reverse,
  headingLevel = "h3",
}: ProjectRowProps) {
  const href = `/${locale}/projects/${project.slug}`;
  const Heading = headingLevel;
  return (
    <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`block lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
      >
        <ProjectCover
          project={project}
          alt={`${project.name} — ${screenshotLabel}`}
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </Link>
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="text-sm text-muted">
          {categoryLabel} · {tr(project.client, locale)}
        </p>
        <Heading className="mt-3 text-[clamp(30px,3.4vw,48px)] leading-none font-extrabold tracking-[-0.02em]">
          <Link href={href} className="transition-colors duration-200 hover:text-gold">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">{tr(project.summary, locale)}</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{project.stack.slice(0, 6).join(" · ")}</p>
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors duration-200 hover:text-gold"
        >
          {viewLabel}
          <span className="flex size-8 items-center justify-center rounded-full bg-control/80 transition-colors duration-200 group-hover:bg-gold group-hover:text-black">
            <ChevronRight className="size-3.5" />
          </span>
        </Link>
      </div>
    </article>
  );
}
