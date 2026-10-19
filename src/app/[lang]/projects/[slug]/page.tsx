import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, tr } from "@/content/projects";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ContactCta } from "@/components/site/ContactCta";
import { Container } from "@/components/site/Container";
import { GoldButton } from "@/components/site/GoldButton";
import { PageStage } from "@/components/site/PageStage";
import { Reveal } from "@/components/site/Reveal";
import { ChevronLeft, ChevronRight } from "@/components/site/icons";
import { alternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

// Every slug is prerendered and the whole page depends on it, so navigation waits for the
// finished page instead of flashing an empty shell behind Suspense.
export const instant = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Og‘abek Avazov`,
    description: tr(project.summary, locale),
    alternates: alternates(locale, `/projects/${slug}`),
    openGraph: project.image ? { images: [{ url: project.image.src }] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const [{ slug }, locale, dict] = await Promise.all([params, getLocale(), getDictionary()]);
  const project = getProject(slug);
  if (!project) notFound();

  const labels = dict.project;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: labels.client, value: tr(project.client, locale) },
    { label: labels.role, value: tr(project.role, locale) },
    { label: labels.category, value: dict.projects.categories[project.category] },
  ];

  return (
    <main>
      <PageStage
        locale={locale}
        dict={dict}
        lines={[project.name]}
        intro={tr(project.summary, locale)}
        watermark={project.watermark}
        compact
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.live ? (
            <GoldButton href={project.live} external className="px-7">
              {labels.live}
            </GoldButton>
          ) : null}
          <Link
            href={`/${locale}/projects`}
            data-cursor-grow
            className="group inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors duration-200 hover:text-gold"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-control/80 transition-colors duration-200 group-hover:bg-gold group-hover:text-black">
              <ChevronLeft className="size-3.5" />
            </span>
            {labels.back}
          </Link>
        </div>
      </PageStage>

      <section aria-label={project.name} className="pt-16 lg:pt-24">
        <Container>
          <Reveal>
            <ProjectCover
              project={project}
              alt={`${project.name} — ${labels.screenshot}`}
              sizes="(min-width: 1440px) 1270px, 100vw"
              eager
            />
          </Reveal>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={0.06 * i} className="flex flex-col gap-2">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="text-lg leading-snug font-semibold text-ink">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="problem-heading" className="py-24 lg:py-32">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="problem-heading" className="text-[clamp(32px,3.6vw,52px)] leading-none font-extrabold tracking-[-0.02em] text-gold uppercase">
              {labels.problem}
            </h2>
            <p className="mt-8 text-[clamp(18px,1.6vw,22px)] leading-relaxed text-ink">{tr(project.problem, locale)}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(32px,3.6vw,52px)] leading-none font-extrabold tracking-[-0.02em] text-ink uppercase">
              {labels.solution}
            </h2>
            <p className="mt-8 text-[clamp(18px,1.6vw,22px)] leading-relaxed text-ink">{tr(project.solution, locale)}</p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="features-heading" className="bg-surface py-24 lg:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="features-heading" className="text-[clamp(32px,3.6vw,52px)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase">
              {labels.features}
            </h2>
          </Reveal>
          <ul className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
            {project.features.map((feature, i) => (
              <Reveal as="li" key={feature.en} delay={0.05 * i} className="flex gap-5">
                <span aria-hidden="true" className="mt-3 size-3 shrink-0 rounded-full bg-gold" />
                <span className="text-[clamp(20px,2vw,26px)] leading-snug font-semibold text-ink">{tr(feature, locale)}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="stack-heading" className="py-24 lg:py-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="stack-heading" className="text-[clamp(32px,3.6vw,52px)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase">
              {labels.stack}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <p className="text-[clamp(22px,2.4vw,32px)] leading-snug font-semibold text-ink">{project.stack.join(" · ")}</p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="next-heading" className="pb-8">
        <Container>
          <Link
            href={`/${locale}/projects/${next.slug}`}
            className="group stage-light relative flex flex-col gap-6 overflow-hidden rounded-[18px] px-6 py-14 sm:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-20"
          >
            <span
              aria-hidden="true"
              className="stroke-text pointer-events-none absolute -right-2 -bottom-8 text-[clamp(120px,18vw,260px)] leading-none font-extrabold tracking-[-0.04em]"
            >
              {next.watermark}
            </span>
            <span className="relative">
              <span className="block text-sm text-muted">{labels.next}</span>
              <span
                id="next-heading"
                className="mt-3 block text-[clamp(40px,6vw,88px)] leading-none font-extrabold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-gold"
              >
                {next.name}
              </span>
            </span>
            <span className="relative flex size-14 items-center justify-center rounded-full bg-gold text-black transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight className="size-5" />
            </span>
          </Link>
        </Container>
      </section>

      <ContactCta dict={dict} />
    </main>
  );
}
