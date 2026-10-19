import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { LogoMark } from "./icons";

type LogoProps = {
  locale: Locale;
  wordmark: string;
  tagline: string;
  label: string;
};

export function Logo({ locale, wordmark, tagline, label }: LogoProps) {
  return (
    <Link href={`/${locale}`} aria-label={label} className="group flex items-center gap-3.5 select-none">
      <span className="flex size-10 items-center justify-center rounded-md bg-gold text-black transition-transform duration-300 ease-stage group-hover:rotate-45">
        <LogoMark className="size-5 transition-transform duration-300 ease-stage group-hover:-rotate-45" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-wide text-ink uppercase">{wordmark}</span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.2em] text-ink-soft uppercase">{tagline}</span>
      </span>
    </Link>
  );
}
