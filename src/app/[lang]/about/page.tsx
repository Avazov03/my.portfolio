import type { Metadata } from "next";
import Image from "next/image";
import { heroPhoto } from "@/content/profile";
import { StackSection } from "@/components/home/StackSection";
import { ContactCta } from "@/components/site/ContactCta";
import { Container } from "@/components/site/Container";
import { GoldButton } from "@/components/site/GoldButton";
import { PageStage } from "@/components/site/PageStage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { alternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.meta.about,
    description: dict.meta.aboutDescription,
    alternates: alternates(locale, "/about"),
  };
}

export default async function AboutPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = dict.about;
  return (
    <main>
      <PageStage
        locale={locale}
        dict={dict}
        lines={copy.heading}
        intro={copy.role}
        watermark={copy.watermark}
        aside={
          <div className="pointer-events-none relative -mx-6 -mb-14 h-[420px] sm:-mx-10 lg:absolute lg:right-[22%] lg:bottom-0 lg:mx-0 lg:mb-0 lg:h-[96%] lg:w-[420px]">
            <div className="absolute bottom-2 left-1/2 h-10 w-72 -translate-x-1/2 rounded-full bg-black/80 blur-2xl" />
            <Image
              src={heroPhoto.src}
              width={heroPhoto.width}
              height={heroPhoto.height}
              alt={dict.hero.photoAlt}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 420px, 80vw"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
            />
          </div>
        }
      >
        <div className="mt-8">
          <GoldButton href={`/${locale}/contact`} className="px-7">
            {dict.nav.cta}
          </GoldButton>
        </div>
      </PageStage>

      <section aria-labelledby="bio-heading" className="py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <h2 id="bio-heading" className="sr-only">
            {dict.nav.about}
          </h2>
          {copy.bio.map((paragraph, i) => (
            <Reveal key={i} delay={0.08 * i} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <p
                className={
                  i === 0
                    ? "text-[clamp(22px,2.3vw,32px)] leading-snug font-medium text-ink"
                    : "text-lg leading-relaxed text-ink-soft lg:pt-2"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading id="principles-heading" lines={copy.principlesHeading} />
          <ul className="mt-14 grid gap-x-16 gap-y-14 sm:grid-cols-2 lg:mt-20">
            {copy.principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.06 * i} className="flex gap-5">
                <span aria-hidden="true" className="mt-3 size-3 shrink-0 rounded-full bg-gold" />
                <span>
                  <h3 className="text-[clamp(22px,2.2vw,30px)] leading-tight font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">{item.text}</p>
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <StackSection dict={dict} lines={copy.stackHeading} id="about-stack-heading" />
      <ContactCta dict={dict} />
    </main>
  );
}
