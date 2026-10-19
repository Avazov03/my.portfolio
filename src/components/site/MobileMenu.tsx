"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon, MenuIcon } from "./icons";
import { isActive, type NavItem } from "./nav";

type MobileMenuProps = {
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
  watermark: string[];
  footer: ReactNode;
};

const ease = [0.4, 0, 0.2, 1] as const;
const noopSubscribe = () => () => {};

export function MobileMenu({ items, openLabel, closeLabel, watermark, footer }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onResize);
    return () => mq.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={openLabel}
          className="stage-light fixed inset-0 z-[60] flex flex-col px-6 pt-7 pb-10 sm:px-14"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[14%] right-[8%] bottom-[14%] hidden flex-col justify-around leading-none select-none md:flex"
          >
            {watermark.map((part) => (
              <span key={part} className="stroke-text text-[clamp(120px,13vw,190px)] font-extrabold tracking-[-0.03em]">
                {part}
              </span>
            ))}
          </div>

          <div className="relative flex justify-end">
            <button
              ref={closeRef}
              type="button"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center rounded-full bg-control text-ink transition-colors duration-200 hover:bg-gold hover:text-black"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <ul className="relative mt-10 flex flex-1 flex-col justify-center gap-2 sm:gap-3">
            {items.map((item, index) => {
              const active = isActive(item, pathname);
              return (
                <motion.li
                  key={item.key}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.4, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`text-[clamp(34px,8vw,64px)] leading-tight font-extrabold uppercase transition-colors duration-200 ${
                      active ? "text-gold" : "text-ink hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <div className="relative flex flex-wrap items-center justify-between gap-6">{footer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
        className="-mr-1 p-1 text-ink transition-colors duration-200 hover:text-gold lg:hidden"
      >
        <MenuIcon className="size-7" />
      </button>
      {hydrated && createPortal(panel, document.body)}
    </>
  );
}
