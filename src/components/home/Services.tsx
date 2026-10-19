import Link from "next/link";
import { getProject } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.home.services;
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-8 py-24 lg:py-32">
      <Container>
        <SectionHeading id="services-heading" lines={copy.heading} />
        <ul className="mt-14 flex flex-col gap-2 lg:mt-20">
          {copy.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={0.04 * index}
              className="group grid gap-4 rounded-[14px] px-0 py-7 transition-colors duration-300 sm:px-6 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:hover:bg-surface"
            >
              <h3 className="text-[clamp(24px,2.6vw,36px)] leading-tight font-bold text-ink transition-colors duration-300 lg:col-span-5 lg:group-hover:text-gold">
                {item.title}
              </h3>
              <p className="max-w-lg text-base leading-relaxed text-ink-soft lg:col-span-4">{item.text}</p>
              <p className="text-sm text-muted lg:col-span-3 lg:text-right">
                {copy.related}:{" "}
                {item.projects.map((slug, i) => {
                  const project = getProject(slug);
                  if (!project) return null;
                  return (
                    <span key={slug}>
                      {i > 0 && ", "}
                      <Link
                        href={`/${locale}/projects/${slug}`}
                        className="text-ink-soft underline-offset-4 transition-colors duration-200 hover:text-gold hover:underline"
                      >
                        {project.name}
                      </Link>
                    </span>
                  );
                })}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
