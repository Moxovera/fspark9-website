import { renderEpisodeOgImage } from "../render";
import { computeDayCount } from "@/components/spark/day/dayMath";
import { splitFigureUnit } from "@/lib/format";
import { getSparkEpisodes, getSparkHub } from "@/sanity/lib/content";
import type { Locale } from "@/types/content";

// /og/episode?slug=02-nuri&locale=tr: Spark bölümünün OG görseli (Son Gün
// Nº 02 brief §2): etiket, konu, süre. Süre yazılıysa o ("7 years"),
// değilse tarihlerden gün sayısı. Bölüm sayfasının generateMetadata'sı bu
// adresi og:image olarak veriyor. `slug` bölümün EN slug'ı.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locale: Locale = params.get("locale") === "tr" ? "tr" : "en";
  const slug = params.get("slug") ?? "";
  const [episodes, spark] = await Promise.all([getSparkEpisodes(), getSparkHub()]);
  const en = episodes.en.find((e) => e.slug === slug);
  const entry = en && episodes[locale].find((e) => e.story.number === en.story.number && (e.formatSlug === en.formatSlug || e.altFormatSlug === en.formatSlug));
  const format = entry && spark[locale].formats.find((f) => f.slug === entry.formatSlug);
  if (!entry || !format) return new Response("Not found", { status: 404 });
  const days = computeDayCount(entry.launchDate, entry.closureDate);
  const { main, unit } = entry.durationLabel
    ? splitFigureUnit(entry.durationLabel)
    : { main: days === null ? "" : String(days), unit: format.daysUnit };
  if (entry.layout === "report") {
    // Sektör raporu: etiket "Spark · 02 Sektör raporları", sayı yerine rapor numarası.
    const { meta } = entry.story.hero;
    return renderEpisodeOgImage({
      label: `${meta[0]} · ${meta[1]}`,
      subject: entry.story.subject,
      figure: String(entry.story.number).padStart(2, "0"),
      unit: meta[2],
      locale,
    });
  }
  const label = entry.layout === "decisions" ? entry.story.opening.label : entry.story.hero.label;
  return renderEpisodeOgImage({ label, subject: entry.story.subject, figure: main, unit, locale });
}
