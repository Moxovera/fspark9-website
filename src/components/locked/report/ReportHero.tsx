import type { ReportHeroContent, ReportSummaryContent } from "@/types/content";
import { Wordmark } from "@/components/locked/Wordmark";
import { HouseIllustration } from "./HouseIllustration";
import { ArrowRightIcon } from "@/components/sections/ServicesAccordion";
import { ReportSummary } from "./ReportSummary";
import { NextLine } from "./NextLine";

// A "n → m" range in one stat's value came through as a literal arrow
// character in the source (`<span ...>→</span>`) — CLAUDE.md bans
// rendering that character directly (rendering weight differs by
// platform), so it's split out and replaced with ArrowRightIcon.
const ARROW_SPAN = /<span[^>]*>\s*→\s*<\/span>/;

function StatValue({ html }: { html: string }) {
  const match = html.match(ARROW_SPAN);
  if (!match) return <span dangerouslySetInnerHTML={{ __html: html }} />;
  const [before, after] = html.split(ARROW_SPAN);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span dangerouslySetInnerHTML={{ __html: before }} />
      <span style={{ color: "var(--bronze-ink)", display: "inline-flex" }} aria-hidden="true">
        <ArrowRightIcon />
      </span>
      <span dangerouslySetInnerHTML={{ __html: after }} />
    </span>
  );
}

export function ReportHero({
  hero,
  summary,
  chapterId,
  client,
  nextLineText,
}: {
  hero: ReportHeroContent;
  summary: ReportSummaryContent;
  chapterId: string;
  client: string;
  nextLineText: string;
}) {
  return (
    <div className="wrap hero" id={chapterId} data-top>
      <div className="hero-grid">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 dangerouslySetInnerHTML={{ __html: hero.h1 }} />
          <p className="sub" dangerouslySetInnerHTML={{ __html: hero.sub }} />
          <div className="byline">
            <Wordmark height={24} />
            <div className="who">
              <b>{hero.whoB}</b>
              <span>{hero.whoSpan}</span>
            </div>
          </div>
          {/* Placed below the byline, not above it as in the reference —
              design review call: the fspark9/name credit reads better
              before the "here's what's next" link. */}
          <NextLine href={`/locked/${client}/working-together`} text={nextLineText} />
        </div>
        <div className="house" aria-hidden="true">
          <HouseIllustration />
        </div>
      </div>

      <div className="stats">
        {hero.stats.map((stat, i) => (
          <div className="stat" key={i}>
            <div className="v">
              <StatValue html={stat.v} />
            </div>
            <div className="l">
              {stat.l}{" "}
              {stat.sourceIds.length > 0 && (
                <span className="src">
                  {stat.sourceIds.map((id) => (
                    <a key={id} href={`#k${id}`}>
                      [{id}]
                    </a>
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <ReportSummary summary={summary} />
    </div>
  );
}
