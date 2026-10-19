"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type GoldButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "outline";
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const pad = "px-8 py-3.5";
const padOutline = "px-5 py-3";

/**
 * Nexlab-style fill + text slide, portfolio gold DNA.
 * Hover: matn yuqoriga siljiydi, markazdan fill kengayadi.
 */
export function GoldButton({
  children,
  className = "",
  variant = "gold",
  href,
  external,
  type = "button",
  onClick,
}: GoldButtonProps) {
  const reduce = useReducedMotion();
  const isGold = variant === "gold";

  const shell = [
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full text-xs font-extrabold tracking-[0.08em] uppercase",
    "transition-[border-radius,transform] duration-500 ease-stage",
    "hover:rounded-lg active:translate-y-0",
    isGold
      ? `bg-gold text-black shadow-lg shadow-gold/15 ${pad}`
      : `border-[1.5px] border-ink bg-transparent text-ink ${padOutline}`,
    !reduce && "hover:-translate-y-0.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fillClass = isGold ? "bg-ink" : "bg-gold";
  const textHover = "text-black";
  const textIdle = isGold ? "text-black" : "text-ink";

  const inner = reduce ? (
    <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
  ) : (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 left-1/2 -z-10 size-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${fillClass} transition-[width,height] duration-500 ease-[cubic-bezier(0.55,0.055,0.675,0.19)] group-hover:h-[420%] group-hover:w-full`}
      />
      <span className="relative z-10 inline-grid overflow-hidden leading-none [text-rendering:geometricPrecision]">
        <span
          className={`col-start-1 row-start-1 inline-flex items-center gap-2.5 transition-transform duration-500 ease-stage group-hover:-translate-y-full ${textIdle}`}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`pointer-events-none col-start-1 row-start-1 inline-flex translate-y-full items-center gap-2.5 transition-transform duration-500 ease-stage group-hover:translate-y-0 ${textHover}`}
        >
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          data-cursor-grow
          className={shell}
          onClick={onClick}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} data-cursor-grow className={shell} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} data-cursor-grow className={shell} onClick={onClick}>
      {inner}
    </button>
  );
}
