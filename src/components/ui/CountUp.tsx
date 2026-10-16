"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

function parseValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: 0, suffix: "" };
  return { target: parseInt(match[1].replace(/,/g, ""), 10) || 0, suffix: match[2] };
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Renders `value` verbatim (e.g. "15,000+") so the real stat is always
 * in the HTML for no-JS visitors and crawlers. Once the element first
 * enters the viewport, it counts up from 0 to the parsed number over
 * ~1.6s and lands back on the exact original text — it never derives
 * the number from anything other than the `value` prop.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { target, suffix } = parseValue(value);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        io.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / DURATION_MS);
          if (t < 1) {
            setDisplay(`${formatNumber(target * easeOutCubic(t))}${suffix}`);
            requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      className={`tabular-nums inline-block ${className}`}
      style={{ minWidth: `${value.length}ch` }}
    >
      {display}
    </span>
  );
}
