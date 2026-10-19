import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { Stage } from "./Stage";

type PageStageProps = {
  locale: Locale;
  dict: Dictionary;
  lines: string[];
  intro?: string;
  watermark: string;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
};

export function PageStage({ locale, dict, lines, intro, watermark, children, aside, compact }: PageStageProps) {
  return (
    <Stage className="lg:min-h-[560px]">
      <Header locale={locale} dict={dict} />

      <span
        aria-hidden="true"
        className="stroke-text pointer-events-none absolute right-[4%] bottom-[-0.12em] text-[clamp(110px,22vw,300px)] leading-none font-extrabold tracking-[-0.04em] select-none"
      >
        {watermark}
      </span>

      <div className="relative z-20 flex flex-1 flex-col gap-10 px-6 pt-16 pb-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pt-20 lg:pb-16">
        <div className={compact ? "max-w-3xl" : "max-w-2xl"}>
          <Reveal>
            <h1
              className={`leading-[0.95] font-extrabold tracking-[-0.02em] uppercase ${
                compact ? "text-[clamp(36px,5.2vw,76px)]" : "text-[clamp(44px,7vw,96px)]"
              }`}
            >
              <span className="block text-gold">{lines[0]}</span>
              {lines[1] && <span className="block text-ink">{lines[1]}</span>}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{intro}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.14}>{children}</Reveal>}
        </div>
        {aside}
      </div>
    </Stage>
  );
}
