import { defineField, defineType } from "sanity";

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
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "subjectLine",
      title: "Subject line (hub row)",
      type: "localeText",
    }),
    defineField({
      name: "whatIsInside",
      title: "What is inside (hub row)",
      type: "localeText",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["live", "preparing"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusLineSingular",
      title: "Status line word, singular (e.g. \"episode published.\")",
      description:
        "Yayınlanmış bölüm SAYISI ile birleştirilir (sayı elle yazılmaz, yayınlanmış sparkEpisode " +
        "dokümanlarından sayılır): \"1 \" + bu alan = \"1 episode published.\" Henüz taahhüt " +
        "edilmemiş bir tarih YOK.",
      type: "localeString",
    }),
    defineField({
      name: "statusLinePlural",
      title: "Status line word, plural (e.g. \"episodes published.\")",
      description: "Sayı 1'den farklıyken kullanılır: \"3 \" + bu alan = \"3 episodes published.\"",
      type: "localeString",
    }),
    defineField({
      name: "orderRank",
      title: "Order rank (hub sıralaması)",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero (list page)",
      description: "eyebrow \"Spark\", title = name, intro = list page'in purpose line'ı.",
      type: "pageHero",
    }),
    defineField({
      name: "hookLabel",
      title: "\"Read the record\" link label",
      type: "localeString",
    }),
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
      title: "fspark9 Note label (e.g. \"fspark9 · Note\"), per-card inside Expert Notes",
      type: "localeString",
    }),
    // Final interaction brief (17 Eylül 2026) — mekanik kelime dağarcığı.
    // Format seviyesinde, çünkü her biri sabit arayüz metni, bölüme
    // özel bir içerik değil (bkz. sparkEpisodeBlocks.ts).
    //
    // Blok tipi mono etiketleri (RECORD/READING/GAP) orijinal Faz 1
    // brief'inin kendi tablosundan birebir (KAYIT/OKUMA/BOŞLUK). Altı
    // mekanik adı (callLabel...allocationLabel) için brief TR karşılığı
    // vermedi, kendi çevirim — uncertainty list'te işaretli.
    defineField({ name: "recordLabel", title: "Block label — RECORD", type: "localeString" }),
    defineField({ name: "readingLabel", title: "Block label — READING", type: "localeString" }),
    defineField({ name: "gapLabel", title: "Block label — GAP", type: "localeString" }),
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
      name: "estimateHeldLabel",
      title: "The Estimate — \"held until the record opens\" notice",
      type: "localeText",
    }),
    defineField({
      name: "correctionInviteLabel",
      title: "Gap — correction invite line (no address exists yet, plain text only)",
      type: "localeString",
    }),
    defineField({
      name: "allocationCommitLabel",
      title: "The Allocation — commit button label (e.g. \"Lock in this split\")",
      type: "localeString",
    }),
    defineField({
      name: "ledgerToggleLabel",
      title: "Ledger toggle label (\"Show the record only\")",
      type: "localeString",
    }),
    defineField({
      name: "expertNotesHeading",
      title: "Expert Notes section heading",
      type: "localeString",
    }),
    defineField({
      name: "expertNotesSignature",
      title: "Expert Notes signature line",
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
