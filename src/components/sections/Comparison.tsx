import type { ComparisonTable, ComparisonRow, ComparisonValue } from "@/types/content";

interface ComparisonProps {
  content: ComparisonTable;
}

function CheckIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-bronze"
    >
      <polyline points="4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="shrink-0 text-muted/55"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function Cell({ value, align }: { value: ComparisonValue; align: "left" | "center" }) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-[18px] text-[13px] leading-[1.45] ${
        align === "center" ? "justify-center text-center" : "justify-start text-left"
      }`}
    >
      {value.state === "yes" && <CheckIcon />}
      {value.state === "no" && <DashIcon />}
      {value.note && <span>{value.note}</span>}
    </div>
  );
}

function Row({ row }: { row: ComparisonRow }) {
  return (
    <div
      className={`grid grid-cols-[1.5fr_1fr_1fr_1.3fr] border-t border-navy/10 ${
        row.isUs
          ? "border-l-[5px] border-l-navy bg-[color-mix(in_srgb,var(--bronze)_10%,var(--ivory)_90%)]"
          : "bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)]"
      }`}
      style={
        row.isUs
          ? {
              boxShadow:
                "0 14px 34px -14px color-mix(in srgb, var(--navy) 40%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={`flex items-center px-3 py-5 text-navy ${
          row.isUs ? "text-[14px] font-bold" : "text-[13.5px] font-semibold"
        }`}
      >
        {row.label}
      </div>
      <Cell value={row.decide} align="center" />
      <Cell value={row.setup} align="center" />
      <Cell value={row.ship} align="left" />
    </div>
  );
}

export default function Comparison({ content }: ComparisonProps) {
  const { heading, intro, scrollHint, columnLabels, rows } = content;

  return (
    <section className="border-t border-charcoal/[0.08] bg-ivory px-7 py-24">
      <div className="mx-auto max-w-[1280px]">
        {heading && (
          <h2 className="mb-[18px] font-display text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.1] font-medium text-navy">
            {heading}
          </h2>
        )}
        {intro && (
          <p className="mb-12 max-w-[56ch] text-[1.08rem] leading-[1.6] text-muted">
            {intro}
          </p>
        )}

        <div className="overflow-x-auto border border-navy/[0.14]">
          {/* 480px = tasarımcı QA notu (640px'ten daraltıldı): isim + Decide sütunu
              375-430px telefon genişliklerinde kaydırmadan görünsün diye.
              scrollHint'in min-[538px]:hidden eşiği bu değere bağlı: 538px = 480 + 2*28px
              section padding + 2px border, yani "içerik artık min-width'e sığıyor" viewport'u.
              İkisi birlikte değişir: kaydırma gerektiği her an ipucu görünür, gerekmediği an kaybolur. */}
          <div className="min-w-[480px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1.3fr] bg-navy">
              <div className="px-3 py-[18px] font-mono text-[11px] tracking-[0.1em] text-ivory/85 uppercase" />
              <div className="px-3 py-[18px] text-center font-mono text-[11px] tracking-[0.1em] text-ivory/85 uppercase">
                {columnLabels.decide}
              </div>
              <div className="px-3 py-[18px] text-center font-mono text-[11px] tracking-[0.1em] text-ivory/85 uppercase">
                {columnLabels.setup}
              </div>
              <div className="px-3 py-[18px] font-mono text-[11px] tracking-[0.1em] text-ivory/85 uppercase">
                {columnLabels.ship}
              </div>
            </div>

            {rows.map((row) => (
              <Row key={row.label} row={row} />
            ))}
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-xs tracking-[0.1em] text-muted uppercase min-[538px]:hidden">
          {scrollHint}
        </p>
      </div>
    </section>
  );
}
