import { contact } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./icons";

export function ContactCta({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="cta-heading" className="py-24 lg:py-36">
      <Container>
        <div className="stage-light relative overflow-hidden rounded-[18px] px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <span
            aria-hidden="true"
            className="stroke-text pointer-events-none absolute -top-4 right-6 hidden text-[clamp(100px,11vw,170px)] leading-none font-extrabold tracking-[-0.04em] select-none lg:block"
          >
            HELLO
          </span>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h2
                id="cta-heading"
                className="text-[clamp(44px,7vw,104px)] leading-[0.92] font-extrabold tracking-[-0.02em] uppercase"
              >
                <span className="block text-gold">{dict.cta.heading[0]}</span>
                <span className="block text-ink">{dict.cta.heading[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-md text-lg leading-relaxed text-ink">{dict.cta.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={contact.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-xs font-extrabold tracking-[0.08em] text-black uppercase shadow-lg shadow-gold/15 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold-hover"
                >
                  <SocialIcon id="telegram" className="size-4" />
                  {dict.cta.telegram}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-lg border-[1.5px] border-ink px-5 py-3 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-black"
                >
                  {dict.cta.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
