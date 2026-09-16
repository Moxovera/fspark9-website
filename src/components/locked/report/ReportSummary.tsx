import type { ReportSummaryContent } from "@/types/content";

export function ReportSummary({ summary }: { summary: ReportSummaryContent }) {
  return (
    <div className="summary">
      <div className="summary-head">
        <div>
          <p className="eyebrow">{summary.eyebrow}</p>
          <h2>{summary.heading}</h2>
        </div>
      </div>
      <ol>
        {summary.points.map((p, i) => (
          <li key={i}>
            <b>{p.title}</b>
            <span dangerouslySetInnerHTML={{ __html: p.body }} />{" "}
            {p.sourceIds.length > 0 && (
              <span className="src">
                {p.sourceIds.map((id) => (
                  <a key={id} href={`#k${id}`}>
                    [{id}]
                  </a>
                ))}
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="proposal">
        <div>
          <div className="tag">
            <i>{summary.proposal.tagNum}</i>
            {summary.proposal.tagLabel}
          </div>
          <h3>{summary.proposal.heading}</h3>
        </div>
        <p dangerouslySetInnerHTML={{ __html: summary.proposal.body }} />
        <div className="aside">{summary.proposal.aside}</div>
      </div>
    </div>
  );
}
