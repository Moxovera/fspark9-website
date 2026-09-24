import type { HomesBlock } from "@/types/content";

// Ported from fillStatic's [data-grid] fill (scratchpad script2.js:236)
// and the reference's .homes/.grid100 markup.
export function HomesGrid({ block }: { block: HomesBlock }) {
  return (
    <>
      <div className="homes">
        {block.items.map((item) => (
          <div key={item.title}>
            <p className="fig-title">{item.title}</p>
            <div className="grid100" role="img" aria-label={item.title}>
              {Array.from({ length: 100 }, (_, i) => <i key={i} className={i < item.on ? "on" : undefined} />)}
            </div>
            <div className="big num" dangerouslySetInnerHTML={{ __html: item.big }} />
            <p className="small" style={{ marginTop: 6 }} dangerouslySetInnerHTML={{ __html: item.small }} />
          </div>
        ))}
      </div>
      <div className="legend" style={{ marginTop: 14 }}>
        {block.legend.map((label, i) => (
          <span key={label}>
            <i style={i === 0 ? { background: "var(--s-ozel)" } : { background: "var(--surface-2)", border: "1px solid var(--rule)" }} />
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
