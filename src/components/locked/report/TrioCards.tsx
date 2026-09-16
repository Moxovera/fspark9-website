import type { TrioBlock } from "@/types/content";
import { ArrowRightIcon } from "@/components/sections/ServicesAccordion";

// Covers both the brief's altın-comparison trio and ComparisonCards
// (Germany/Brazil/Türkiye) — same .trio/.card markup in the reference.
// The flow connector between two pills was a literal "→" character in the
// source; CLAUDE.md bans embedding Unicode arrows directly (rendering
// weight differs by platform), so it's swapped for the site's existing
// ArrowRightIcon.
export function TrioCards({ block }: { block: TrioBlock }) {
  return (
    <div className="trio">
      {block.cards.map((card) => (
        <div key={card.h4} className={card.fz ? "card fz" : "card"}>
          <div className="k" style={card.kStyle ? { color: card.kStyle.replace(/^color:\s*/, "") } : undefined}>
            {card.k}
          </div>
          <h4>{card.h4}</h4>
          {card.p && <p dangerouslySetInnerHTML={{ __html: card.p }} />}
          {card.dl && (
            <dl>
              {card.dl.map((pair) => (
                <div key={pair.dt}>
                  <dt dangerouslySetInnerHTML={{ __html: pair.dt }} />
                  <dd dangerouslySetInnerHTML={{ __html: pair.dd }} />
                </div>
              ))}
            </dl>
          )}
          {card.flow && (
            <div className="flow">
              {card.flow.map((f, i) =>
                f.tag === "B" ? (
                  <b key={i} aria-hidden="true">
                    <ArrowRightIcon />
                  </b>
                ) : (
                  <span key={i}>{f.text}</span>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
