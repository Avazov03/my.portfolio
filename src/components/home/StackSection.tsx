import { stack } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

type StackSectionProps = {
  dict: Dictionary;
  lines?: string[];
  id?: string;
};

export function StackSection({ dict, lines, id = "stack-heading" }: StackSectionProps) {
  const copy = dict.home.stack;
  return (
    <section aria-labelledby={id} className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id={id} lines={lines ?? copy.heading} />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">{copy.intro}</p>
            </Reveal>
          </div>
          <dl className="flex flex-col gap-10 lg:col-span-8 lg:col-start-6">
            {stack.map((group, index) => (
              <Reveal key={group.key} delay={0.05 * index} className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="pt-1.5 text-sm font-semibold text-muted">{copy.groups[group.key]}</dt>
                <dd className="text-[clamp(20px,2.1vw,28px)] leading-snug font-semibold text-ink">
                  {group.items.join(" · ")}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
