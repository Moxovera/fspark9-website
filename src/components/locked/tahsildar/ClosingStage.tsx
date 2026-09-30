import { Fragment } from "react";
import { Wordmark } from "@/components/locked/Wordmark";
import type { TsdClosingStageProps } from "@/types/content";

// Ink kapanış: alıntı, tek satır, ters logo (Paper gövde, Flare dilim),
// ad ve iletişim. Altında Paper üzerinde yöntem notu ve katlanır kaynaklar.
export function ClosingStage({ id, quote, lede, name, contact, method, sourcesLabel, sources }: TsdClosingStageProps) {
  return (
    <>
      <section className="closing" id={id}>
        <div className="wrap">
          <blockquote>{quote}</blockquote>
          <p className="lede">{lede}</p>
          <div className="sign">
            <span className="wm">
              <Wordmark height={28.8} />
            </span>
            <p>{name}</p>
            <div className="contact">
              {contact.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="wrap refs">
        <p className="method">{method}</p>
        <details>
          <summary>{sourcesLabel}</summary>
          <div className="srcs">
            {sources.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </details>
      </div>
    </>
  );
}
