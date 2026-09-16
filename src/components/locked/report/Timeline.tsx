import type { TimelineBlock } from "@/types/content";
import { BankLogo } from "./BankLogo";

export function Timeline({ block, ariaLabel }: { block: TimelineBlock; ariaLabel: string }) {
  return (
    <div className="timeline" aria-label={ariaLabel}>
      {block.items.map((it) => (
        <div key={it.title} className={it.fz ? "tl-item fz" : "tl-item"}>
          <div className="tl-date">{it.date}</div>
          <h4>
            {it.slug && <BankLogo slug={it.slug} lg={it.lg} />}
            {it.title}
          </h4>
          <p dangerouslySetInnerHTML={{ __html: it.body }} />
        </div>
      ))}
    </div>
  );
}
