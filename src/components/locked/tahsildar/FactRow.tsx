import type { TsdFactRowProps } from "@/types/content";

export function FactRow({ items, four }: TsdFactRowProps) {
  return (
    <div className={four ? "facts four" : "facts"}>
      {items.map((f) => (
        <div className="fact" key={f.title}>
          <b>{f.title}</b>
          <span dangerouslySetInnerHTML={{ __html: f.html }} />
        </div>
      ))}
    </div>
  );
}
