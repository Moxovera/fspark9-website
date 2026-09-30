import type { TahsildarReportProps } from "@/types/content";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { BlockRenderer } from "./BlockRenderer";
import { ClosingStage } from "./ClosingStage";
import "./tahsildar.css";

// /locked/tahsildar raporunun gövdesi (docs/locked/tahsildar-report.html).
// Bütün stil .tsd altında; Fuzul raporunun paylaşılan CSS'iyle çakışmaz.
export function TahsildarReport({ content }: TahsildarReportProps) {
  const { hero, chapters, closing, navLabel, noteLabel } = content;
  return (
    <div className="tsd">
      <TopBar heroId={hero.id} navLabel={navLabel} chapters={chapters.map((c) => ({ id: c.id, nav: c.nav }))} />
      <main className="report">
        <Hero hero={hero} />
        {chapters.map((c) => (
          <section key={c.id} className="chapter wrap" id={c.id}>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2>{c.title}</h2>
            <p className="lede">{c.lede}</p>
            {c.blocks.map((b, i) => (
              <BlockRenderer key={i} block={b} noteLabel={noteLabel} />
            ))}
          </section>
        ))}
        <ClosingStage {...closing} />
      </main>
    </div>
  );
}
