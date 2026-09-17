import { Link } from "@/i18n/navigation";
import type { LastDayGapBlock } from "@/types/content";
import type { ComponentProps } from "react";

type LinkHref = ComponentProps<typeof Link>["href"];

interface GapBlockProps {
  block: LastDayGapBlock;
  label: string; // "GAP" / "BOŞLUK"
  dayWord: string;
  correctionsHref: string;
  correctionsCtaLabel: string;
}

/**
 * Sol çizgi: slate (muted), DASHED, 3px — bir gap'in kayıttan ya da
 * okumadan görsel olarak da farklı olması gerekiyor, sadece renkle
 * değil (bkz. build prompt Part 0). Ledger modunda GİZLENMEZ — bir
 * gap kaydın kendisi hakkında bir ifade, bir yorum değil.
 */
export default function GapBlock({
  block,
  label,
  dayWord,
  correctionsHref,
  correctionsCtaLabel,
}: GapBlockProps) {
  return (
    <div className="border-l-[3px] border-dashed border-muted bg-muted/[0.05] py-6 pl-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{label}</span>
        {block.day !== undefined && (
          <span className="font-mono text-xs tracking-[0.06em] text-muted">
            {dayWord} {block.day >= 0 ? String(block.day).padStart(3, "0") : block.day}
          </span>
        )}
      </div>
      <h3 className="mb-2 font-display text-[1.25rem] leading-[1.3] font-medium text-charcoal">
        {block.heading}
      </h3>
      <p className="mb-3 text-[0.98rem] leading-[1.66] text-charcoal/85">{block.body}</p>
      {block.whereItWouldBe && (
        <p className="mb-3 font-mono text-[11.5px] tracking-[0.04em] text-muted uppercase">
          {block.whereItWouldBe}
        </p>
      )}
      {block.invitesCorrection && (
        <Link
          href={correctionsHref as LinkHref}
          className="inline-block border-b border-muted/50 pb-0.5 font-mono text-[11.5px] tracking-[0.05em] text-charcoal/70 uppercase transition-colors duration-200 hover:text-bronze hover:border-bronze/50"
        >
          {correctionsCtaLabel}
        </Link>
      )}
    </div>
  );
}
