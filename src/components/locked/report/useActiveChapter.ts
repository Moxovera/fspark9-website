"use client";

import { useEffect, useState } from "react";

// IntersectionObserver-based active-chapter tracking for the topbar nav —
// preferred over manual scroll-position math per this project's convention
// (see CLAUDE.md's sticky-stack rule: prefer IntersectionObserver, JS
// scroll math only as a last resort).
export function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
