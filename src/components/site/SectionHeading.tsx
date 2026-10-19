import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  lines: string[];
  id?: string;
  watermark?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ lines, id, watermark, action, as = "h2", className = "" }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={`relative flex flex-wrap items-end justify-between gap-x-10 gap-y-6 ${className}`}>
      {watermark && (
        <span
          aria-hidden="true"
          className="stroke-text pointer-events-none absolute -top-6 right-0 hidden text-[clamp(120px,13vw,200px)] leading-none font-extrabold tracking-[-0.03em] select-none lg:block"
        >
          {watermark}
        </span>
      )}
      <Reveal>
        <Tag
          id={id}
          className="relative text-[clamp(36px,5vw,64px)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase"
        >
          <span className="block text-gold">{lines[0]}</span>
          {lines[1] && <span className="block text-ink">{lines[1]}</span>}
        </Tag>
      </Reveal>
      {action && (
        <Reveal delay={0.1} className="relative">
          {action}
        </Reveal>
      )}
    </div>
  );
}
