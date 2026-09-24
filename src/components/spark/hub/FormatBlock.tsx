import { Link } from "@/i18n/navigation";
import IssueRow from "@/components/spark/hub/IssueRow";
import Label from "@/components/brand/Label";
import TextLink from "@/components/brand/TextLink";
import type { SparkFormatContent, SparkIssue } from "@/types/content";

interface FormatBlockProps {
  format: SparkFormatContent;
  issues: SparkIssue[];
  readLabel: string;
}

const MAX_ISSUES = 3;

/**
 * Hub'da bir format (brand book v3 §6 Spark, board SparkIndex): büyük
 * numara (canlıysa dolu, hazırlanıyorsa 2px çerçeve), ad, açıklama, açma
 * linki ve en fazla üç sayı. Daha fazlası varsa "All N issues" format
 * sayfasına gider. Hover'da numara 6px yükselir (brief §10).
 */
export default function FormatBlock({ format, issues, readLabel }: FormatBlockProps) {
  const href = { pathname: "/spark/[formatSlug]" as const, params: { formatSlug: format.slug } };
  // Hub en son üç sayıyı artan sırayla gösteriyor (board: Nº 01 üstte).
  const shown = issues.slice(0, MAX_ISSUES).reverse();
  const number = (
    <span
      className={`format-number block font-display text-[88px] leading-[0.8] font-extrabold tracking-[-0.06em] min-[900px]:text-[clamp(140px,13.9vw,200px)] min-[900px]:leading-[0.78] ${
        format.status === "live" ? "text-ink" : "text-outline-ink"
      }`}
    >
      {format.number}
    </span>
  );

  return (
    <div className="group/format flex flex-col gap-[14px] border-t-2 border-ink bg-white px-5 pt-6 pb-5 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-6 min-[900px]:gap-y-0 min-[900px]:px-10 min-[900px]:pt-11 min-[900px]:pb-12">
      <div className="flex items-end gap-4 min-[900px]:contents">
        <div className="min-[900px]:col-span-3">{number}</div>
        <span className="pb-1 font-display text-[30px] leading-none font-extrabold tracking-[-0.03em] text-ink min-[900px]:hidden">
          {format.name}
        </span>
      </div>
      <div className="flex flex-col gap-[14px] min-[900px]:col-span-4 min-[900px]:col-start-4 min-[900px]:gap-4 min-[900px]:pt-[6px]">
        <h2 className="m-0 hidden font-display text-[52px] leading-none font-extrabold tracking-[-0.035em] text-ink min-[900px]:block">
          {format.name}
        </h2>
        <p className="m-0 text-[16px] leading-[1.5] text-ink min-[900px]:text-[18px]">{format.description}</p>
        <div className="hidden min-[900px]:block">
          {format.openLabel ? <TextLink href={href} label={format.openLabel} className="-my-[10px]" /> : format.preparingLine && <Label>{format.preparingLine}</Label>}
        </div>
      </div>
      <div className="mt-1 border-t-2 border-ink min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:mt-[10px]">
        {shown.map((issue, i) => (
          <IssueRow key={issue.numberLabel} issue={issue} readLabel={readLabel} first={i === 0} />
        ))}
        {issues.length > MAX_ISSUES && (
          <Link href={href} className="block border-t border-rule py-3 text-[14px] font-bold text-ink">
            {format.allIssuesLabel.replace("{n}", String(issues.length))}
          </Link>
        )}
      </div>
      <div className="min-[900px]:hidden">
        {format.openLabel ? <TextLink href={href} label={format.openLabel} className="-my-[10px]" /> : format.preparingLine && <Label>{format.preparingLine}</Label>}
      </div>
    </div>
  );
}
