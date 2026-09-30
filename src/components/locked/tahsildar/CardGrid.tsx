import { Fragment } from "react";
import type { TsdCardGridProps } from "@/types/content";

// Rapordaki bütün kart ızgaraları tek bileşen: iki bacak ve risk yolları
// (legs), Nexent Bank (trio), ödeme yolları (pay, PayMethods), kim ne
// kazanır (wins, WinCards), ülke bağlamı (ctx, ContextCards).
export function CardGrid({ variant, items, flowSep }: TsdCardGridProps) {
  return (
    <div className={variant}>
      {items.map((c) => (
        <div className={c.fz ? "card fz" : "card"} key={c.title}>
          <span className="k">{c.k}</span>
          <h4>{c.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: c.html }} />
          {c.flow && (
            <div className="flow">
              {c.flow.map((f, i) => (
                <Fragment key={f}>
                  {i > 0 && <b>{flowSep}</b>}
                  <span>{f}</span>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
