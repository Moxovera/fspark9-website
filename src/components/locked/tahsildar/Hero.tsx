import { Wordmark } from "@/components/locked/Wordmark";
import type { TsdHeroProps } from "@/types/content";
import { CutWord } from "./CutWord";
import { ChainHero } from "./ChainHero";
import { StatStrip } from "./StatStrip";
import { DecisionList } from "./DecisionList";
import { ResultCard } from "./ResultCard";

export function Hero({ hero }: TsdHeroProps) {
  return (
    <div className="wrap hero" id={hero.id}>
      <div className="hero-grid">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>
            {hero.titleLead}
            <br />
            <CutWord text={hero.titleCut} />
          </h1>
          <p className="sub">{hero.sub}</p>
          <div className="byline">
            <span className="wm">
              <Wordmark height={20.8} />
            </span>
            <div className="who">
              <b>{hero.author}</b>
              <span>{hero.authorMeta}</span>
            </div>
          </div>
        </div>
        <ChainHero {...hero.chain} />
      </div>

      <StatStrip items={hero.stats} />

      <div className="summary">
        <div className="summary-head">
          <div>
            <p className="eyebrow">{hero.summary.eyebrow}</p>
            <h2>{hero.summary.title}</h2>
          </div>
        </div>
        <DecisionList items={hero.summary.items} />
        <ResultCard {...hero.summary.result} />
      </div>
    </div>
  );
}
