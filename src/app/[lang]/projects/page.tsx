import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { ContactCta } from "@/components/site/ContactCta";
import { Container } from "@/components/site/Container";
import { PageStage } from "@/components/site/PageStage";
import { alternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.meta.projects,
    description: dict.meta.projectsDescription,
    alternates: alternates(locale, "/projects"),
  };
}

export default async function ProjectsPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <main>
      <PageStage
        locale={locale}
        dict={dict}
        lines={dict.projects.heading}
        intro={dict.projects.intro}
        watermark={dict.projects.watermark}
      />
      <section className="py-20 lg:py-28">
        <Container>
          <ProjectsExplorer
            projects={projects}
            locale={locale}
            labels={{
              all: dict.projects.all,
              filter: dict.projects.filterLabel,
              view: dict.home.work.view,
              screenshot: dict.project.screenshot,
              categories: dict.projects.categories,
            }}
          />
        </Container>
      </section>
      <ContactCta dict={dict} />
    </main>
  );
}
