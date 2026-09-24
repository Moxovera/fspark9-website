"use client";

import { useReveal } from "@/hooks/useReveal";
import type { RevealProps } from "@/types/content";

/**
 * globals.css'teki .reveal/.js/.is-visible kurallarını useReveal() ile
 * birleştiren sarmalayıcı. dc.html'deki data-reveal="1" niteliğinin
 * React karşılığı — CLAUDE.md: "Her bölüm kendi observer'ını kurmaz."
 */
export default function Reveal({ className, children }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </div>
  );
}
