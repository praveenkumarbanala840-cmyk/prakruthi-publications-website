"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const MAX_DELAY_MS = 400;
const STEP_MS = 70;

interface RevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-in";
  /** Stagger index — multiplied by ~70ms and capped, not a raw ms value. */
  index?: number;
  className?: string;
}

/**
 * Wraps content that should fade/slide in once, the first time it enters
 * the viewport. The element always starts fully visible in the server
 * HTML (so it works with JS disabled and for crawlers) — the hidden
 * state is only ever applied client-side, and only once we've confirmed
 * the element isn't already on-screen at mount (so above-the-fold
 * content, and anything under prefers-reduced-motion, is never hidden
 * even for a single frame).
 */
export default function Reveal({ children, variant = "fade-up", index = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "visible">("static");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = Math.min(index * STEP_MS, MAX_DELAY_MS);
  const animClass = state === "static" ? "" : `reveal reveal-${variant}${state === "visible" ? " is-visible" : ""}`;

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`.trim()}
      style={state !== "static" && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
