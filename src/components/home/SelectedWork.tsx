import Link from "next/link";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectRow } from "@/components/projects/ProjectRow";

export function SelectedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.home.work;
  const featured = projects.filter((project) => project.featured);
  return (
    <section aria-labelledby="work-heading" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="work-heading"
          lines={copy.heading}
          watermark={copy.watermark}
          action={
            <Link
              href={`/${locale}/projects`}
              className="rounded-lg border-[1.5px] border-ink px-5 py-2.5 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-black"
            >
              {copy.all}
            </Link>
          }
        />
        <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-36">
          {featured.map((project, index) => (
            <Reveal key={project.slug}>
              <ProjectRow
                project={project}
                locale={locale}
                categoryLabel={dict.projects.categories[project.category]}
                viewLabel={copy.view}
                screenshotLabel={dict.project.screenshot}
                reverse={index % 2 === 1}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
