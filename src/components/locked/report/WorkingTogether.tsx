import Image from "next/image";
import { BrandCase } from "./BrandCase";
import type { Locale, LockedReportContent } from "@/types/content";
import { WorkingTogetherTopBar } from "./WorkingTogetherTopBar";
import { NextLine } from "./NextLine";

/**
 * /locked/[client]/working-together — what supporting the client could
 * look like. Adapted from a print-style proposal document (letterhead,
 * A4 pages, bronze CTA pills) into the report's own calm/editorial tone:
 * no sales banner, no big coloured call-to-action block, at most one
 * quiet contact line at the very end (see NextLine).
 */
export function WorkingTogether({
  client,
  lang,
  content,
}: {
  client: string;
  lang: Locale;
  content: LockedReportContent;
}) {
  const t = content.workingTogether;

  return (
    <>
      <WorkingTogetherTopBar client={client} lang={lang} backLabel={content.charts.backToReport} />
      <main className="wrap" style={{ paddingBlock: "64px 96px" }}>
        <p className="eyebrow"><BrandCase text={t.eyebrow} /></p>
        <h2 style={{ maxWidth: 760 }}>{t.heroTitle}</h2>
        <p className="lede">{t.metaLine}</p>

        <h3>{t.summaryHeading}</h3>
        <p className="prose" style={{ maxWidth: 700 }}>
          {t.summaryBody}
        </p>

        <h3>{t.supportHeading}</h3>
        {t.items.map((item) => (
          <div className="move" key={item.num}>
            <div className="no">{item.num}</div>
            <div>
              <h4>{item.label}</h4>
              <p>
                <strong>{item.lead}</strong>
              </p>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}

        <div
          className="card"
          style={{
            marginTop: 56,
            maxWidth: 760,
            borderLeft: "3px solid var(--bronze)",
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flex: "none" }}>
            <Image src="/assets/portrait.jpg" alt={t.bioName} fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <div className="k"><BrandCase text={t.bioTitle} /></div>
            <h4 style={{ marginTop: 2, marginBottom: 6 }}>{t.bioName}</h4>
            <p style={{ margin: 0 }}>{t.bioBody}</p>
          </div>
        </div>

        <div style={{ marginTop: 56, maxWidth: 700 }}>
          <p className="eyebrow">{t.nextStepBadge}</p>
          <p className="prose">{t.nextStepText}</p>
        </div>

        <div style={{ marginTop: 8 }}>
          <p className="small" style={{ marginBottom: 4 }}>
            {t.closingLabel}
          </p>
          <NextLine href={t.ctaUrl} text={t.ctaLabel} external />
        </div>
      </main>
    </>
  );
}
