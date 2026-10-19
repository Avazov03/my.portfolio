"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP = "(min-width: 992px)";
const REDUCE = "(prefers-reduced-motion: reduce)";

/**
 * Nexlab-style custom cursor: nuqta + ergashuvchi aylana.
 * Faqat desktop; touch / reduced-motion da o'chadi.
 */
export function SiteCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia(REDUCE);
    const fine = window.matchMedia("(pointer: fine)");

    const sync = () => setOn(desktop.matches && fine.matches && !reduce.matches);
    sync();
    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!on) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    let mx = -100;
    let my = -100;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let visible = false;
    let grow = false;
    let raf = 0;

    const isGrowTarget = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          "a, button, [role='button'], [data-cursor-grow], input, textarea, select, label",
        ),
      );
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        wrap.style.opacity = "1";
      }
      grow = isGrowTarget(e.target);
    };

    const onLeave = () => {
      visible = false;
      wrap.style.opacity = "0";
    };

    const tick = () => {
      dx += (mx - dx) * 0.2;
      dy += (my - dy) * 0.2;
      rx += (mx - rx) * 0.04;
      ry += (my - ry) * 0.04;
      // Grow without difference-blend washout; keep scale modest on targets
      scale += ((grow ? 2 : 1) - scale) * 0.18;

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      ring.style.opacity = grow ? "0.35" : "0.7";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [on]);

  if (!on) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden opacity-0 transition-opacity duration-500 lg:block"
    >
      {/* Gold accent, no blend, no heavy glow — DNA: gold only as accent */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-2 rounded-full bg-gold will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-7 rounded-full border border-gold/50 will-change-transform"
      />
    </div>
  );
}
