"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/locked/Wordmark";
import type { TsdTopBarProps } from "@/types/content";

// Üst çubuk: logo, bölüm gezinmesi ve Flare okuma çizgisi. Dil düğmesi
// yok (rapor tek dilli). Etkin bölüm referanstaki kuralla: üst kenarı
// 140 px'in üstüne geçmiş son bölüm. Dar ekranda etkin bağlantı
// gezinme şeridinde ortalanır.
export function TopBar({ heroId, navLabel, chapters }: TsdTopBarProps) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const sections = chapters.map((c) => document.getElementById(c.id));
    let frame = 0;
    function update() {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      let cur = -1;
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < 140) cur = i;
      });
      setActive(cur);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    const nav = navRef.current;
    const a = linkRefs.current[active];
    if (!nav || !a || nav.scrollWidth <= nav.clientWidth) return;
    const want = a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2;
    if (Math.abs(nav.scrollLeft - want) > 40) nav.scrollLeft = want;
  }, [active]);

  return (
    <header className="topbar" id="top">
      <div className="topbar-inner">
        <a className="wm" href={`#${heroId}`} aria-label="fspark9">
          <Wordmark height={19.2} />
        </a>
        <nav className="chapters" aria-label={navLabel} ref={navRef}>
          {chapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={i === active ? "on" : undefined}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
            >
              {c.nav}
            </a>
          ))}
        </nav>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </header>
  );
}
