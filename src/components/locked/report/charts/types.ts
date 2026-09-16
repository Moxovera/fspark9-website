import type { Locale, ReportChartStrings } from "@/types/content";
import type { BankFigure, RateFigure } from "@/content/locked/fuzul/data";

export interface ChartComponentProps {
  locale: Locale;
  strings: ReportChartStrings;
  banks: BankFigure[];
  total: number;
  rates: RateFigure[];
  ariaLabel?: string;
}
