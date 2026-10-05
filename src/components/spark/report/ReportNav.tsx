"use client";

import { useEffect, useRef, useState } from "react";
import type { ReportNavProps } from "@/types/content";

/**
 * Raporun bölüm şeridi (prototip `.topbar`): header altında yapışkan Ink
 * şerit, geçerli bölüm Paper, altta okuma ilerlemesi. Geçerli bölümü
 * IntersectionObserver, ilerlemeyi pasif scroll dinleyicisi + rAF izler;
 * ikisi de cleanup'ta bırakılır. Atalarında transform/overflow yok.
 */
export default function ReportNav({ items }: ReportNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = items.filter(({ id }) => visible.has(id)).at(-1);
        if (current) setActive(current.id);
        else if (window.scrollY < 400) setActive(null);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      if (bar.current) bar.current.style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <div className="on-ink sticky top-16 z-20 border-b border-inkrule bg-ink text-paper min-[900px]:top-[84px]">
      <nav aria-label="Report" className="mx-auto flex max-w-[1240px] gap-[18px] overflow-x-auto px-[clamp(20px,5vw,64px)] whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={`inline-flex min-h-11 items-center font-mono text-[11.5px] tracking-[0.08em] uppercase no-underline hover:text-paper ${
              active === id ? "text-paper" : "text-dust"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
      <div ref={bar} aria-hidden="true" className="absolute bottom-[-1px] left-0 h-0.5 w-0 bg-paper" />
    </div>
  );
}
