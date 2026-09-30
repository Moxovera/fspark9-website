import type { TsdRiskListProps } from "@/types/content";

export function RiskList({ items }: TsdRiskListProps) {
  return (
    <div className="risks">
      {items.map((r, i) => (
        <div className="risk" key={r.title}>
          <span className="no">{i + 1}</span>
          <div>
            <span className="cat">{r.cat}</span>
            <h4>{r.title}</h4>
            <p>{r.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
