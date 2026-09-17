import { defineField, defineType } from "sanity";

// Revizyon v2: lastDayEpisode'un yerini aldı. dayZero/dayLast →
// launchDate/closureDate (gün sayısı bunlardan HESAPLANIR, ayrı bir
// dayCount alanı YOK — bkz. components/spark/day/dayMath.ts). market →
// country. teaserLine → hook (hem liste sayfasındaki tek satır hem de
// ana sayfadaki "the spark" teaser'ı için tek kaynak). closureDate
// zorunlu DEĞİL — halen açık bir konu için (bu format'ta şu an yok,
// ama gün bileşeni bunu genel bir sistem olarak ele alıyor).
export default defineType({
  name: "sparkEpisode",
  title: "Spark Episode",
  type: "document",
  fields: [
    defineField({
      name: "format",
      title: "Format",
      type: "reference",
      to: [{ type: "sparkFormat" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Episode number",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "parent", title: "Parent (varsa)", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "launchDate", title: "Launch date", type: "date" }),
    defineField({
      name: "closureDate",
      title: "Closure date (henüz kapanmadıysa boş)",
      type: "date",
    }),
    defineField({ name: "standfirst", title: "Standfirst (episode page)", type: "localeText" }),
    defineField({
      name: "hook",
      title: "Hook (list page entry + homepage teaser line)",
      type: "localeText",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["published", "draft"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "date" }),
    defineField({ name: "evidenceTakenAt", title: "Evidence taken at", type: "date" }),
    defineField({ name: "lastCheckedAt", title: "Last checked at", type: "date" }),
    defineField({
      name: "body",
      title: "Body",
      description: "Serbest biçimli içerik — başlık, paragraf, alıntı, liste, stat highlight, fspark9 note.",
      type: "localeBody",
    }),
  ],
  preview: {
    select: { title: "subject", subtitle: "format.name.en" },
  },
});
