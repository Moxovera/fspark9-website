import { defineField, defineType, type ConditionalPropertyCallback, type SanityDocument } from "sanity";
import { decisionFields } from "./sparkEpisodeDecisions";
import { reportFields } from "./sparkEpisodeReport";
import { storyFields } from "./sparkEpisodeStory";

// Bir Spark bölümü. Gün sayısı launchDate/closureDate'ten hesaplanır
// (components/spark/day/dayMath.ts), elle yazılmaz. `hook` format
// sayfasındaki satırın cümlesi, `cardLine` ana sayfadaki kartın.
//
// Son Gün v3 (2026-09-26): bölüm sayfası bir hikâye; alanları "Story"
// sekmesinde (sparkEpisodeStory.ts). Eski `blocks` (Record/Reading/Note
// ve altı mekanik), `standfirst`, `parent`, `evidenceTakenAt` şemadan
// çıktı.
//
// Nº 02 (Nuri, 2026-09-29): ikinci şablon, karar blokları. `layout`
// hangisinin kullanılacağını seçer; diğerinin sekmesi gizlenir
// (sparkEpisodeDecisions.ts).
//
// Sektör raporları Nº 01 (Bauspar, 2026-10-05): üçüncü şablon, `report`
// (sparkEpisodeReport.ts). Her şablonun sekmesi sadece kendi layout'unda
// görünür.
const layoutOf = (document: SanityDocument | undefined) => document?.layout ?? "story";
const hideUnlessStory: ConditionalPropertyCallback = ({ document }) => layoutOf(document) !== "story";
const hideUnlessDecisions: ConditionalPropertyCallback = ({ document }) => layoutOf(document) !== "decisions";
const hideUnlessReport: ConditionalPropertyCallback = ({ document }) => layoutOf(document) !== "report";

export default defineType({
  name: "sparkEpisode",
  title: "Spark Episode",
  type: "document",
  groups: [
    { name: "meta", title: "Episode", default: true },
    { name: "story", title: "Story" },
    { name: "decisions", title: "Decisions" },
    { name: "report", title: "Report" },
  ],
  fields: [
    defineField({
      name: "format",
      title: "Format",
      type: "reference",
      to: [{ type: "sparkFormat" }],
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Episode number",
      type: "number",
      group: "meta",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug", group: "meta" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
    defineField({ name: "subject", title: "Subject", type: "localeString", group: "meta" }),
    defineField({
      name: "layout",
      title: "Page layout",
      type: "string",
      group: "meta",
      description: "story: Bó gibi hikâye ve kart · decisions: Nuri gibi karar blokları · report: sektör raporu",
      options: { list: ["story", "decisions", "report"], layout: "radio" },
      initialValue: "story",
    }),
    defineField({ name: "city", title: "City", type: "string", group: "meta" }),
    defineField({ name: "country", title: "Country", type: "string", group: "meta" }),
    defineField({ name: "launchDate", title: "Launch date", type: "date", group: "meta" }),
    defineField({
      name: "launchPrecision",
      title: "Launch date precision",
      type: "string",
      group: "meta",
      description: "month: gün kamuya açık değil, tarih ayın ilk günü.",
      options: { list: ["day", "month"] },
      initialValue: "day",
    }),
    defineField({
      name: "durationLabel",
      title: "Duration (optional, replaces the day count)",
      type: "localeString",
      group: "meta",
      description: "Ör. \"7 years\". Boşsa gün sayısı tarihlerden hesaplanır.",
    }),
    defineField({
      name: "closureDate",
      title: "Closure date (henüz kapanmadıysa boş)",
      type: "date",
      group: "meta",
    }),
    defineField({
      name: "hook",
      title: "Line on the format page",
      type: "localeText",
      group: "meta",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "meta",
      description: "coming: listede linksiz satır, sayfası yok, sayılmıyor.",
      options: { list: ["published", "coming", "draft"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardLine",
      title: "Home card line (optional, falls back to hook)",
      type: "localeText",
      group: "meta",
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "date", group: "meta" }),
    defineField({ name: "lastCheckedAt", title: "Last checked at", type: "date", group: "meta" }),
    defineField({
      name: "previewLive",
      title: "Live on preview deployments",
      type: "boolean",
      group: "meta",
      description:
        "Status coming ya da draft iken sadece preview (staging) adresinde yayındaki gibi görünür; canlı sitede coming (linksiz satır) ya da draft (hiç görünmez) kalır. Canlıya çıkınca status published yapılır, bu alan kaldırılır.",
    }),
    ...storyFields.map((field) => ({ ...field, hidden: hideUnlessStory })),
    ...decisionFields.map((field) => ({ ...field, group: "decisions", hidden: hideUnlessDecisions })),
    ...reportFields.map((field) => ({ ...field, group: "report", hidden: hideUnlessReport })),
  ],
  preview: {
    select: { title: "subject.en", subtitle: "format.name.en" },
  },
});
