"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import GoButton from "@/components/brand/GoButton";
import Label from "@/components/brand/Label";
import { ArrowDownIcon } from "@/components/icons";
import type { SparkFormatContent, SparkIssue } from "@/types/content";

interface EpisodeListProps {
  issues: SparkIssue[];
  labels: Pick<SparkFormatContent, "episodesLabel" | "columns" | "showAllTemplate" | "daysUnit">;
}

const INITIAL = 10;

/**
 * Format sayfasındaki bölüm listesi (brief v4 §7.7, board LastDay /
 * LastDay10 ve mobilleri): en yenisi üstte, her satırda Nº, konu, tek
 * satır, gün sayısı, yayın tarihi ve kare ok. Gelecek bölümler Stone ve
 * linksiz. İlk 10 satır, sonra "Show all N episodes" listeyi yerinde açar;
 * tek client parçası bu buton.
 */
export default function EpisodeList({ issues, labels }: EpisodeListProps) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? issues : issues.slice(0, INITIAL);

  return (
    <div className="flex flex-col gap-[14px] min-[900px]:gap-5">
      <Label>{labels.episodesLabel}</Label>
      <div className="border-t-2 border-ink min-[900px]:pt-[14px]">
        <div aria-hidden="true" className="hidden grid-cols-12 gap-x-6 pb-3 min-[900px]:grid">
          <Label as="span" className="col-span-1">{labels.columns.number}</Label>
          <Label as="span" className="col-span-3">{labels.columns.company}</Label>
          <span className="col-span-4" />
          <Label as="span" className="col-span-1">{labels.columns.days}</Label>
          <Label as="span" className="col-span-2">{labels.columns.published}</Label>
        </div>
        {shown.map((issue) => (
          <EpisodeRow key={issue.numberLabel} issue={issue} daysUnit={labels.daysUnit} />
        ))}
        {issues.length > INITIAL && !expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-[10px] border-t-2 border-ink py-[18px] text-[15px] font-bold text-ink"
          >
            {labels.showAllTemplate.replace("{n}", String(issues.length))}
            <ArrowDownIcon className="size-[1em]" />
          </button>
        ) : (
          <div className="border-t border-rule" />
        )}
      </div>
    </div>
  );
}

function EpisodeRow({ issue, daysUnit }: { issue: SparkIssue; daysUnit: string }) {
  const href = issue.status === "published" ? issue.href : undefined;
  const tone = href ? "text-ink" : "text-stone";
  const days =
    issue.days !== null ? (
      <span className="flex items-baseline gap-1 min-[900px]:flex-col min-[900px]:gap-0 min-[1280px]:flex-row min-[1280px]:gap-1">
        <span className="font-display text-[20px] leading-[normal] font-extrabold tracking-[-0.02em] text-ink min-[900px]:text-[24px]">
          {issue.days}
        </span>
        <span className="font-mono text-[11px] leading-[normal] tracking-[0.08em] text-stone uppercase">{daysUnit}</span>
      </span>
    ) : null;

  const body = (
    <>
      {/* mobil */}
      <span className="flex flex-grow flex-col gap-1 min-[900px]:hidden">
        <span className="flex items-baseline gap-[10px]">
          <span className={`font-mono text-[11px] leading-[normal] tracking-[0.08em] ${tone}`}>{issue.numberLabel}</span>
          <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{issue.statusLabel}</span>
        </span>
        <span className={`font-display text-[28px] leading-none font-extrabold tracking-[-0.03em] ${tone}`}>{issue.subject}</span>
        {issue.hook && <span className={`text-[15px] leading-[1.4] ${tone}`}>{issue.hook}</span>}
        {days}
      </span>
      {/* masaüstü */}
      <span className={`col-span-1 hidden font-mono text-[12px] leading-[normal] tracking-[0.08em] min-[900px]:block ${tone}`}>
        {issue.numberLabel}
      </span>
      <span
        className={`col-span-3 hidden font-display text-[36px] leading-none font-extrabold tracking-[-0.035em] min-[900px]:block ${tone}`}
      >
        {issue.subject}
      </span>
      <span className={`col-span-4 hidden text-[17px] leading-[1.4] min-[900px]:block ${tone}`}>{issue.hook}</span>
      <span className="col-span-1 hidden min-[900px]:block">{days}</span>
      <span className="col-span-2 hidden min-[900px]:block">
        <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{issue.statusLabel}</span>
      </span>
      <span className="flex flex-none justify-end min-[900px]:col-span-1">
        {href ? <GoButton size={44} className="min-[900px]:size-12 min-[900px]:text-[20px]" /> : <span className="w-11 min-[900px]:w-12" />}
      </span>
    </>
  );
  const row =
    "flex items-center gap-[14px] border-t border-rule py-4 no-underline min-[900px]:grid min-[900px]:min-h-[92px] min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:py-[18px]";

  return href ? (
    <Link href={href} className={`group transition-colors duration-[160ms] ease-brand hover:bg-paper ${row}`}>
      {body}
    </Link>
  ) : (
    <div className={row}>{body}</div>
  );
}
