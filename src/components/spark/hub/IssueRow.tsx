import { Link } from "@/i18n/navigation";
import GoButton from "@/components/brand/GoButton";
import type { IssueRowProps } from "@/types/content";

/**
 * Hub'da format altındaki sayı satırı (board SparkIndex): Nº, konu, tarih
 * (yayındakinde konunun altında) ya da durum (gelecekte sağda). Yayındaki satır "Read" ve kare okla bölüme gider; gelecek
 * satır Stone, link yok (brand book: "Rows that do not open anything have
 * no arrow").
 */
export default function IssueRow({ issue, readLabel, first }: IssueRowProps) {
  const href = issue.status === "published" ? issue.href : undefined;
  const published = Boolean(href);
  const body = (
    <>
      <span className="flex-none font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink">
        {issue.numberLabel}
      </span>
      <span className="flex flex-grow flex-col gap-[2px]">
        <span
          className={`font-display text-[22px] leading-[normal] font-extrabold tracking-[-0.025em] min-[900px]:text-[28px] ${published ? "text-ink" : "text-stone"}`}
        >
          {issue.subject}
        </span>
        {published && (
          <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] whitespace-nowrap text-stone uppercase">
            {issue.statusLabel}
          </span>
        )}
      </span>
      {!published && (
        <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] whitespace-nowrap text-stone uppercase">
          {issue.statusLabel}
        </span>
      )}
      {published && (
        <span className="inline-flex items-center gap-[10px] text-[14px] leading-[normal] font-bold whitespace-nowrap text-ink">
          {readLabel}
          <GoButton size={40} className="go-flare max-[900px]:size-9" />
        </span>
      )}
    </>
  );
  // Board min-height içeriğe (content-box) veriyor: 44/48 + dolgu.
  const row = `flex min-h-16 items-center gap-3 py-[10px] no-underline min-[900px]:min-h-[72px] min-[900px]:gap-[18px] min-[900px]:py-3 ${first ? "" : "border-t border-rule"}`;

  return href ? (
    <Link href={href} className={`group ${row}`}>
      {body}
    </Link>
  ) : (
    <div className={row}>{body}</div>
  );
}
