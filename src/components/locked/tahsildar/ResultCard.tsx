import type { TsdResultCardProps } from "@/types/content";

// White kart, 4 px Ink üst çizgi. "proposal": başlık solda, metin sağda,
// altta not. "key": başlık, metin ve dört kaldıraç.
export function ResultCard({ variant, tag, title, text, aside, levers }: TsdResultCardProps) {
  if (variant === "proposal") {
    return (
      <div className="proposal">
        <div>
          <div className="tag">{tag}</div>
          <h3>{title}</h3>
        </div>
        <p>{text}</p>
        {aside && <div className="aside">{aside}</div>}
      </div>
    );
  }
  return (
    <div className="key">
      <div className="tag">{tag}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {levers && (
        <ol className="levers">
          {levers.map((l) => (
            <li key={l.title}>
              <b>{l.title}</b>
              <span>{l.text}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
