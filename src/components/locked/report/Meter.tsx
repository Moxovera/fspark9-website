import type { MeterInfo } from "@/types/content";

// Ported from the reference's .meter-track/.meter-fill/.meter-goal/.meter-labels
// (see fuzul-report-standalone.html around the shareSteps figure). Content
// already carries the exact fill % and label text/position extracted from
// the source, so this is a thin, mostly-static renderer.
export function Meter({ meter }: { meter: MeterInfo }) {
  return (
    <>
      <div className="meter-track" role="img" aria-label={meter.ariaLabel}>
        <div className="meter-fill" style={{ width: `${meter.fillPct}%` }} />
        <div className="meter-goal" style={{ left: "calc(100% - 1px)" }} />
      </div>
      <div className="meter-labels">
        {meter.labels.map((l) => (
          <span key={l.text} className={l.goal ? "num g" : "num"} style={{ left: l.leftStyle.replace(/^left:\s*/, "").replace(/;$/, "") }}>
            {l.text}
          </span>
        ))}
      </div>
    </>
  );
}
