import { dayNumberLabel } from "@/components/spark/day/dayMath";
import type { SparkGapBlock } from "@/types/content";

interface GapBlockProps {
  block: SparkGapBlock;
  launchDate: string;
  dayLabel: string;
  gapLabel: string;
  correctionInviteLabel: string;
}

/**
 * Kesik ("dashed") 3px sol çizgi, muted/slate renk + "GAP"/"BOŞLUK" mono
 * etiket — Part 0 kural 3 gereği RecordBlock/ReadingBlock'tan hem
 * çizgi stiliyle hem etiketle ayrılır. Ledger modunda GİZLENMEZ (bkz.
 * final interaction brief §7: "Records and gaps stay") — bu yüzden bu
 * bileşen LedgerGate ile sarmalanmıyor.
 */
export default function GapBlock({ block, launchDate, dayLabel, gapLabel, correctionInviteLabel }: GapBlockProps) {
  const day = block.date ? dayNumberLabel(block.date, launchDate) : null;

  return (
    <article className="scroll-mt-32 border-l-[3px] border-dashed border-muted py-2 pl-6">
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
        {day && <span>{dayLabel} {day}</span>}
        <span>{gapLabel}</span>
      </div>
      <h3 className="mb-2 font-display text-xl font-medium text-charcoal">{block.heading}</h3>
      <p className="max-w-[68ch] text-[1.02rem] leading-[1.65] text-charcoal/85">{block.body}</p>

      {block.whereItWouldBe && (
        <p className="mt-3 font-mono text-xs tracking-[0.02em] text-muted">{block.whereItWouldBe}</p>
      )}
      {block.invitesCorrection && (
        <p className="mt-2 text-sm text-muted">{correctionInviteLabel}</p>
      )}
    </article>
  );
}
