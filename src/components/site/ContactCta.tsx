import { contact } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./Container";
import { GoldButton } from "./GoldButton";
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
                <GoldButton href={contact.telegram} external className="px-7">
                  <SocialIcon id="telegram" className="size-4" />
                  {dict.cta.telegram}
                </GoldButton>
                <GoldButton href={`mailto:${contact.email}`} variant="outline">
                  {dict.cta.email}
                </GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
