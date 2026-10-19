"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { isActive, type NavItem } from "./nav";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <ul className="flex items-center gap-3 text-sm font-medium">
      {items.map((item) => {
        const active = isActive(item, pathname);
        if (reduce) {
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-cursor-grow
                className={`relative px-3 py-1.5 transition-colors duration-200 ${
                  active ? "text-gold" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold" />
                ) : null}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              data-cursor-grow
              className={`group relative inline-flex overflow-hidden rounded-full px-3.5 py-1.5 transition-colors duration-300 ${
                active ? "text-gold" : "text-ink-soft"
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-0 rounded-full bg-ink transition-[height] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:h-full"
              />
              <span className="relative z-10 inline-grid overflow-hidden leading-none">
                <span className="col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
                  {item.label}
                </span>
                <span className="col-start-1 row-start-1 translate-y-full text-black transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
                  {item.label}
                </span>
              </span>
              {active ? (
                <span className="absolute -bottom-0.5 left-3.5 right-3.5 z-20 h-0.5 rounded-full bg-gold group-hover:opacity-0" />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
