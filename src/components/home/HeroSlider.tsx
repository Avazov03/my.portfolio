"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries";
import { GoldButton } from "@/components/site/GoldButton";
import { ChevronLeft, ChevronRight } from "@/components/site/icons";

type HeroSliderProps = {
  copy: Dictionary["hero"];
  photo: { src: string; width: number; height: number };
  ctaHref: string;
  socials: ReactNode;
};

const ease = [0.4, 0, 0.2, 1] as const;
const INDICATOR_STEP = 112;

export function HeroSlider({ copy, photo, ctaHref, socials }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const total = copy.slides.length;
  const slide = copy.slides[index];

  const go = (delta: number) => setIndex((current) => (current + delta + total) % total);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6, ease },
        };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] bottom-[16%] z-10 flex h-[46svh] flex-col justify-around leading-none select-none lg:top-[12%] lg:right-[13%] lg:bottom-[6%] lg:h-auto"
      >
        {copy.watermark.map((part, i) => (
          <motion.span
            key={part}
            className="stroke-text text-[clamp(84px,24vw,128px)] font-extrabold tracking-[-0.03em] lg:text-[clamp(120px,11.5vw,168px)]"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, x: 40 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease },
                })}
          >
            {part}
          </motion.span>
        ))}
      </div>

      <div className="relative z-20 flex flex-1 flex-col px-6 sm:px-10 lg:static lg:grid lg:grid-cols-12 lg:items-center lg:px-14">
        <div className="relative z-20 flex max-w-xl flex-col pt-12 lg:col-span-5 lg:pt-0 lg:pb-10" aria-live="polite">
          <h1 className="font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
            <span className="sr-only">
              {copy.slideLabel} {index + 1}/{total}:{" "}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                className="block"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28 }}
                transition={{ duration: 0.45, ease }}
              >
                <motion.span className="block text-[clamp(42px,11.5vw,64px)] text-gold lg:text-[clamp(60px,5.4vw,80px)]" {...rise(0.05)}>
                  {slide.lines[0]}
                </motion.span>
                <motion.span className="mt-1 block text-[clamp(42px,11.5vw,64px)] text-ink lg:text-[clamp(60px,5.4vw,80px)]" {...rise(0.12)}>
                  {slide.lines[1]}
                </motion.span>
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              {slide.text}
            </motion.p>
          </AnimatePresence>

          <motion.div className="mt-8" {...rise(0.25)}>
            <GoldButton href={ctaHref}>{copy.cta}</GoldButton>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none relative -mx-6 mt-6 flex min-h-[44svh] flex-1 items-end justify-center sm:-mx-10 lg:absolute lg:inset-y-0 lg:right-[18%] lg:left-[30%] lg:z-20 lg:mx-0 lg:mt-0 lg:h-auto"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1, duration: 0.9, ease },
              })}
        >
          <div className="absolute bottom-2 h-10 w-72 rounded-full bg-black/80 blur-2xl lg:w-80" />
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={copy.photoAlt}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 560px, 80vw"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 translate-y-1 object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] lg:h-[88%]"
          />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-6 px-6 pt-6 pb-8 sm:px-10 lg:relative lg:px-14 lg:pb-10">
        <div className="flex flex-col gap-3">
          {socials}
          <p className="hidden max-w-xs text-[11px] text-muted sm:block">{copy.footnote}</p>
        </div>
        <div className="flex items-center gap-3 lg:pr-8">
          <button
            type="button"
            aria-label={copy.prev}
            onClick={() => go(-1)}
            className="flex size-8 items-center justify-center rounded-full bg-control/80 text-ink transition-colors duration-200 hover:bg-gold hover:text-black"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={copy.next}
            onClick={() => go(1)}
            className="flex size-8 items-center justify-center rounded-full bg-control/80 text-ink transition-colors duration-200 hover:bg-gold hover:text-black"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(50%-162px)] right-0 z-40 hidden h-[100px] w-3 rounded-l-full bg-gold shadow-[0_0_16px_rgba(252,196,100,0.55)] lg:block"
        animate={{ y: index * INDICATOR_STEP }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease }}
      />
    </>
  );
}
