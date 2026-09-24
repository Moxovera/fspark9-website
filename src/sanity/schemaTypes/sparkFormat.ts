import { defineField, defineType } from "sanity";
import { group, ls, lsList, lt } from "./fields";

// Revizyon v2: lastDayFormat'ın yerini aldı — isim "spark" olarak
// genelleştirildi çünkü format 02 (ve sonrakiler) "The Last Day"
// hakkında olmayacak, format'a özel bir isim artık yanlış olurdu.
// Hub satırının içeriği burada: name/subjectLine/whatIsInside hub'daki
// satırın kendisini besliyor. Status satırı SAYISI burada YOK —
// yayınlanmış sparkEpisode sayısından hesaplanıyor (bkz. FormatRow.tsx),
// sadece statusLineSingular/Plural kelimeleri burada. Format 02 BİLEREK
// bir doküman DEĞİL — mevcut sabit "coming soon" UI'ı olduğu gibi
// kalıyor, kendi kararı ayrı gelene kadar.
export default defineType({
  name: "sparkFormat",
  title: "Spark Format",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number (01, 02...)",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({ name: "name", title: "Name", type: "localeString" }),
    ls("singularName", "Singular name (home cards)", { description: "Ör. \"Sector report\". Boşsa Name." }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["live", "preparing"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order rank (hub sıralaması)",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    lt("description", "Description line"),
    ls("openLabel", "Open link (live formats)"),
    ls("preparingLine", "Line instead of the link (preparing formats)"),
    ls("comingLabel", "Status of the next issue (\"Coming next\", \"In preparation\")"),
    ls("aboutLabel", "About label"),
    lsList("aboutLines", "About lines"),
    ls("showAllLabel", "Show all (hub)"),
    ls("allIssuesLabel", "All issues ({n})"),
    ls("daysUnit", "Days unit"),
    ls("episodesLabel", "Episode list label"),
    group("columns", "List columns", [ls("number", "Number"), ls("company", "Company"), ls("days", "Days"), ls("published", "Published")]),
    ls("showAllTemplate", "Show all ({n})"),
    defineField({
      name: "dayCountSingular",
      title: "Day count word (singular, e.g. \"day\")",
      type: "localeString",
    }),
    defineField({
      name: "dayCountPlural",
      title: "Day count word (plural, e.g. \"days\")",
      type: "localeString",
    }),
    defineField({
      name: "dayLabel",
      title: "Day label (mono, e.g. \"DAY\")",
      type: "localeString",
    }),
    defineField({
      name: "dayNotEstablishedLabel",
      title: "\"Not established\" label (gün sayısı hesaplanamadığında)",
      type: "localeString",
    }),
    defineField({
      name: "noteLabel",
      title: "fspark9 Note label (e.g. \"fspark9 · Note\"), rozette gövde içinde ilgili bloğun ardında",
      type: "localeString",
    }),
    // Final interaction brief (17 Eylül 2026) — mekanik kelime dağarcığı.
    // Format seviyesinde, çünkü her biri sabit arayüz metni, bölüme
    // özel bir içerik değil (bkz. sparkEpisodeBlocks.ts).
    //
    // Blok tipi mono etiketleri (RECORD/READING) orijinal Faz 1 brief'inin
    // kendi tablosundan birebir (KAYIT/OKUMA). GAP kaldırıldı (18 Eylül
    // 2026, kullanıcı talebi). Altı mekanik adı (callLabel...
    // allocationLabel) için brief TR karşılığı vermedi, kendi çevirim —
    // uncertainty list'te işaretli.
    defineField({ name: "recordLabel", title: "Block label — RECORD", type: "localeString" }),
    defineField({ name: "readingLabel", title: "Block label — READING", type: "localeString" }),
    defineField({ name: "callLabel", title: "Mechanic label — THE CALL", type: "localeString" }),
    defineField({ name: "estimateLabel", title: "Mechanic label — THE ESTIMATE", type: "localeString" }),
    defineField({ name: "weighLabel", title: "Mechanic label — THE WEIGH", type: "localeString" }),
    defineField({ name: "signalLabel", title: "Mechanic label — THE SIGNAL", type: "localeString" }),
    defineField({ name: "secondOpinionLabel", title: "Mechanic label — THE SECOND OPINION", type: "localeString" }),
    defineField({ name: "allocationLabel", title: "Mechanic label — THE ALLOCATION", type: "localeString" }),
    defineField({
      name: "callOptionRuleLabel",
      title: "The Call — option \"a rule forced this\"",
      type: "localeString",
    }),
    defineField({
      name: "callOptionDecisionLabel",
      title: "The Call — option \"someone decided this\"",
      type: "localeString",
    }),
    defineField({
      name: "callMatchLabel",
      title: "The Call — reveal when the reader's pick matches the record",
      type: "localeString",
    }),
    defineField({
      name: "callMismatchLabel",
      title: "The Call — reveal when the record went the other way",
      type: "localeString",
    }),
    defineField({
      name: "callUnsettledLabel",
      title: "The Call — reveal when the record does not settle it",
      type: "localeString",
    }),
    defineField({
      name: "allocationCommitLabel",
      title: "The Allocation — commit button label (e.g. \"Lock in this split\")",
      type: "localeString",
    }),
    defineField({
      name: "scorecardHeading",
      title: "Scorecard heading",
      type: "localeString",
    }),
    defineField({
      name: "scorecardUnansweredLabel",
      title: "Scorecard — placeholder for a mechanic not yet answered",
      type: "localeString",
    }),
    defineField({
      name: "scorecardYourReadingLabel",
      title: "Scorecard — \"your reading\" tag for unscored mechanics",
      type: "localeString",
    }),
    defineField({
      name: "scorecardCrossEpisodeLabel",
      title: "Scorecard — running cross-episode count label",
      description: "Sayı önüne eklenir: \"12 \" + bu alan.",
      type: "localeString",
    }),
    defineField({
      name: "scorecardShareLabel",
      title: "Scorecard — share action label",
      type: "localeString",
    }),
    defineField({
      name: "scorecardCopiedLabel",
      title: "Scorecard — \"copied to clipboard\" confirmation (Web Share API fallback)",
      type: "localeString",
    }),
    defineField({
      name: "scorecardPrivacyLine",
      title: "Scorecard — privacy line (verbatim from brief)",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "name.en" },
  },
});
