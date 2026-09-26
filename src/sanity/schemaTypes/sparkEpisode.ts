import { defineField, defineType } from "sanity";
import { storyFields } from "./sparkEpisodeStory";

// Bir Spark bölümü. Gün sayısı launchDate/closureDate'ten hesaplanır
// (components/spark/day/dayMath.ts), elle yazılmaz. `hook` format
// sayfasındaki satırın cümlesi, `cardLine` ana sayfadaki kartın.
//
// Son Gün v3 (2026-09-26): bölüm sayfası bir hikâye; alanları "Story"
// sekmesinde (sparkEpisodeStory.ts). Eski `blocks` (Record/Reading/Note
// ve altı mekanik), `standfirst`, `parent`, `evidenceTakenAt` şemadan
// çıktı.
export default defineType({
  name: "sparkEpisode",
  title: "Spark Episode",
  type: "document",
  groups: [
    { name: "meta", title: "Episode", default: true },
    { name: "story", title: "Story" },
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
    defineField({ name: "country", title: "Country", type: "string", group: "meta" }),
    defineField({ name: "launchDate", title: "Launch date", type: "date", group: "meta" }),
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
    ...storyFields,
  ],
  preview: {
    select: { title: "subject.en", subtitle: "format.name.en" },
  },
});
