import type { TsdStatStripProps } from "@/types/content";

export function StatStrip({ items }: TsdStatStripProps) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <div className="v">
            {s.value}
            {s.small && (
              <>
                {" "}
                <small>{s.small}</small>
              </>
            )}
          </div>
          <div className="l">
            {s.label} <span className="src">{s.src}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
