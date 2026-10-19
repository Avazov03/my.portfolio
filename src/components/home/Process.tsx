import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function Process({ dict }: { dict: Dictionary }) {
  const copy = dict.home.process;
  return (
    <section aria-labelledby="process-heading" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading id="process-heading" lines={copy.heading} />
        <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-8">
          {copy.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={0.07 * index} className="flex flex-col gap-4">
              <span aria-hidden="true" className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-gold" />
                {index < copy.steps.length - 1 && <span className="hidden h-3 flex-1 rounded-full bg-surface-2 lg:block" />}
              </span>
              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
