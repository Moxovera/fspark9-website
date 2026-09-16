import type { Locale, LockedReportContent } from "@/types/content";
import type { BankFigure, RateFigure, REFS } from "@/content/locked/fuzul/data";
import { ChartTooltipProvider } from "./ChartTooltip";
import { SyncHtmlLang } from "./SyncHtmlLang";
import { ReportTopBar } from "./ReportTopBar";
import { ReportHero } from "./ReportHero";
import { ChapterSection } from "./ChapterSection";
import { ReportClosing } from "./ReportClosing";
import { SourceList } from "./SourceList";

export function Report({
  client,
  lang,
  content,
  banks,
  total,
  rates,
  refs,
}: {
  client: string;
  lang: Locale;
  content: LockedReportContent;
  banks: BankFigure[];
  total: number;
  rates: RateFigure[];
  refs: typeof REFS;
}) {
  const chartData = { locale: lang, strings: content.charts, banks, total, rates };
  const heroId = "giris";
  const closingId = "kapanis";

  return (
    <ChartTooltipProvider>
      <SyncHtmlLang lang={lang} />
      <ReportTopBar
        client={client}
        lang={lang}
        heroId={heroId}
        chapters={content.chapters.map((c) => ({ id: c.id, nav: c.nav }))}
      />
      <main className="report">
        <ReportHero hero={content.hero} summary={content.summary} chapterId={heroId} />
        {content.chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} chartData={chartData} />
        ))}
        <ReportClosing closing={content.closing} id={closingId} />
        <SourceList refs={refs} label={content.charts.sources} />
      </main>
    </ChartTooltipProvider>
  );
}
