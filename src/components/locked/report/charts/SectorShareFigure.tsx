"use client";

import { useState } from "react";
import { HBars, type HBarRow } from "./HBars";
import { percentFormat } from "../chart-helpers";
import { GRP } from "@/content/locked/fuzul/data";
import type { ChartComponentProps } from "./types";

interface SectorShareFigureProps extends ChartComponentProps {
  title: string;
  sub: string;
  segButtons: { mode: string; label: string }[] | null;
  legendItems: { color: string; label: string }[] | null;
  caption: string | null;
}

// Ported from CH.share (scratchpad script2.js:372-386). This is the one
// chart with its own interactive control (Today / after the merger), so it
// renders the whole <figure> itself — including the fig-head seg toggle —
// rather than going through the generic FigureBlockRenderer chrome.
export function SectorShareFigure({ locale, strings, banks, total, title, sub, segButtons, legendItems, caption, ariaLabel }: SectorShareFigureProps) {
  const [mode, setMode] = useState<"now" | "merged">("now");

  function finalizeRow(r: HBarRow, approx: boolean, merged: boolean): HBarRow {
    const vl = (approx ? "~" : "") + percentFormat(locale, r.v, 1) + (merged ? "+" : "");
    const tip = merged
      ? `<b>${strings.mergedTipTitle}</b>${strings.mergedTipLine1} <span class="m">${vl}</span><br>${strings.mergedTipLine2}`
      : `<b>${r.label}</b><span class="m">${vl}</span> ${strings.shareTipSuffix}`;
    return { ...r, vl, tip };
  }

  let rows: HBarRow[];
  if (mode === "now") {
    const base = banks.map((b) => ({ label: b.n, slug: b.slug, v: b.share, color: GRP[b.grp], vl: "", tip: "" }) as HBarRow);
    base.push({ label: strings.shareOther, slug: null, v: 0.9, color: "var(--mark-muted)", vl: "", tip: "" });
    rows = base.map((r) => finalizeRow(r, r.label === strings.shareOther, false));
  } else {
    const zv = banks
      .filter((b) => b.slug === "vakif-katilim" || b.slug === "ziraat-katilim")
      .reduce((a, b) => a + b.a, 0);
    const merged: HBarRow = {
      label: strings.merged,
      slug: null,
      v: +((zv / total) * 100).toFixed(1),
      color: "var(--s-kamu)",
      hl: true,
      vl: "",
      tip: "",
    };
    const others = banks
      .filter((b) => b.slug !== "vakif-katilim" && b.slug !== "ziraat-katilim")
      .map((b) => ({ label: b.n, slug: b.slug, v: b.share, color: GRP[b.grp], vl: "", tip: "" }) as HBarRow);
    const combined = [merged, ...others].sort((a, b) => b.v - a.v);
    rows = combined.map((r) => finalizeRow(r, false, r === merged));
  }

  return (
    <figure className="fig">
      <div className="fig-head">
        <div>
          <p className="fig-title">{title}</p>
          <p className="fig-sub">{sub}</p>
        </div>
        {segButtons && (
          <div className="seg" role="group">
            {segButtons.map((b) => (
              <button
                key={b.mode}
                type="button"
                aria-pressed={mode === b.mode}
                onClick={() => setMode(b.mode === "merged" ? "merged" : "now")}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {legendItems && (
        <div className="legend" style={{ marginBottom: 10 }}>
          {legendItems.map((l) => (
            <span key={l.label}>
              <i style={{ background: l.color.replace(/^background:\s*/, "") }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      <HBars rows={rows} max={40} ticks={[0, 10, 20, 30, 40]} tickFmt={(v) => percentFormat(locale, v)} bh={16} gap={10} locale={locale} ariaLabel={ariaLabel} />
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
    </figure>
  );
}
