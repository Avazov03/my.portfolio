import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ChevronRight } from "@/components/site/icons";

export function Intro({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.home.intro;
  return (
    <section aria-labelledby="intro-heading" className="pt-28 pb-24 lg:pt-40 lg:pb-32">
      <Container>
        <SectionHeading id="intro-heading" lines={copy.heading} />
        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[clamp(22px,2.3vw,32px)] leading-snug font-medium text-ink">{copy.statement}</p>
            <Link
              href={`/${locale}/about`}
              className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors duration-200 hover:text-gold"
            >
              {copy.more}
              <span className="flex size-8 items-center justify-center rounded-full bg-control/80 transition-colors duration-200 group-hover:bg-gold group-hover:text-black">
                <ChevronRight className="size-3.5" />
              </span>
            </Link>
          </Reveal>
          <dl className="grid gap-10 sm:grid-cols-3 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
            {copy.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={0.08 * index} className="flex flex-col-reverse gap-2">
                <dt className="max-w-[16rem] text-sm leading-relaxed text-ink-soft">{stat.label}</dt>
                <dd className="text-[clamp(56px,6vw,88px)] leading-none font-extrabold tracking-[-0.03em] text-gold">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
