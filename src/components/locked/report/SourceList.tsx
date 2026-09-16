"use client";

import { useEffect } from "react";
import type { REFS } from "@/content/locked/fuzul/data";

// Also covers the brief's "SourceRef" component: rather than one React
// component per [n] link (they arrive embedded in arbitrary RichText/Note/
// table-cell HTML strings, not as discrete elements we render ourselves),
// a single delegated listener here gives every [n] anywhere on the page
// the same click-to-open-and-scroll behavior.
export function SourceList({ refs, label }: { refs: typeof REFS; label: string }) {
  // Global click delegation for every [n] source-ref link rendered anywhere
  // in the report (they arrive as raw <a href="#k1"> inside RichText/Note/
  // table-cell HTML, so there's no single React element to attach a
  // handler to) — ported from the reference's document click listener
  // (scratchpad script2.js:269-279).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const a = target.closest('a[href^="#k"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(2);
      const li = document.querySelector(`[data-ref="${CSS.escape(id)}"]`);
      if (!li) return;
      e.preventDefault();
      const details = li.closest("details");
      if (details) details.open = true;
      li.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <section className="wrap refs">
      <details>
        <summary>
          {label} ({refs.length})
        </summary>
        <ol>
          {refs.map(([id, desc, url]) => (
            <li key={id} data-ref={id}>
              <span>[{id}]</span>
              {desc}.{" "}
              <a href={url} target="_blank" rel="noopener">
                {url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
