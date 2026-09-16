import type { ReportClosingContent } from "@/types/content";
import { Wordmark } from "@/components/locked/Wordmark";

export function ReportClosing({ closing, id }: { closing: ReportClosingContent; id: string }) {
  return (
    <section className="wrap closing" id={id}>
      <p className="eyebrow">{closing.eyebrow}</p>
      <blockquote dangerouslySetInnerHTML={{ __html: closing.quote }} />
      <p className="lede" dangerouslySetInnerHTML={{ __html: closing.lede }} />
      <div className="sign">
        <Wordmark height={32} />
        <p dangerouslySetInnerHTML={{ __html: closing.signP }} />
        <div className="contact" dangerouslySetInnerHTML={{ __html: closing.contact }} />
      </div>
      <p className="method" dangerouslySetInnerHTML={{ __html: closing.method }} />
    </section>
  );
}
