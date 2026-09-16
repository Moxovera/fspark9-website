import type { JourneyBlock } from "@/types/content";
import { BankLogo } from "./BankLogo";

export function JourneySteps({ block }: { block: JourneyBlock }) {
  return (
    <div className="journey" aria-label={block.title}>
      <p className="fig-title" style={{ marginBottom: 18 }}>
        {block.title}
      </p>
      <ol className="j-steps">
        {block.steps.map((s) => (
          <li key={s.h5}>
            <h5>{s.h5}</h5>
            <p>{s.p}</p>
          </li>
        ))}
      </ol>
      {block.bankName && (
        <div className="j-bank">
          <b>
            {block.bankSlug && <BankLogo slug={block.bankSlug} lg />}
            {block.bankName}
          </b>
          {block.bankText && <span className="t">{block.bankText}</span>}
        </div>
      )}
    </div>
  );
}
