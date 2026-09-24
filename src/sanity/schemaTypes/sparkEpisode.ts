import { defineField, defineType } from "sanity";

// Revizyon v2: lastDayEpisode'un yerini aldı. dayZero/dayLast →
// launchDate/closureDate (gün sayısı bunlardan HESAPLANIR, ayrı bir
// dayCount alanı YOK — bkz. components/spark/day/dayMath.ts). market →
// country. teaserLine → hook (hem liste sayfasındaki tek satır hem de
// ana sayfadaki "the spark" teaser'ı için tek kaynak). closureDate
// zorunlu DEĞİL — halen açık bir konu için (bu format'ta şu an yok,
// ama gün bileşeni bunu genel bir sistem olarak ele alıyor).
//
// Final interaction brief (17 Eylül 2026), kullanıcının açık onayıyla:
// serbest biçimli `body` (localeBody) yerini `blocks`'a bıraktı —
// Record/Reading/altı mekanik modeli, bkz. sparkEpisodeBlocks.ts. Bu,
// Faz 3'te bilinçli olarak kaldırılan "engaging layer"ın açık bir
// tersine çevrilmesi, kazayla değil. `blocks` TEK bir paylaşılan dizi
// (locale başına AYRI diziler değil) çünkü mekanik sırası ve state
// anahtarları (blockId) dilden bağımsız kalmalı.
//
// Kullanıcının canlıyı gördükten sonraki sadeleştirme talimatıyla (18
// Eylül 2026) Gap block type'ı ve ayrı `expertNotes` alanı TAMAMEN
// kaldırıldı — uzman notları artık `blocks` dizisinin içinde,
// `sparkNote` tipiyle, ilgili olduğu noktaya gömülü.
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
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "subject", title: "Subject", type: "localeString" }),
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
      description: "coming: listede linksiz satır, sayfası yok, sayılmıyor.",
      options: { list: ["published", "coming", "draft"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardLine",
      title: "Home card line (optional, falls back to hook)",
      type: "localeText",
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "date" }),
    defineField({ name: "evidenceTakenAt", title: "Evidence taken at", type: "date" }),
    defineField({ name: "lastCheckedAt", title: "Last checked at", type: "date" }),
    defineField({
      name: "blocks",
      title: "Blocks",
      description:
        "Record/Reading/Note ve altı mekanik, okunma sırasında TEK dizi. Hiçbir bloğun elle girilmiş bir " +
        "\"day\" alanı yok — gün numarası her zaman launchDate ve bloğun kendi date'inden hesaplanır. " +
        "fspark9 notları (sparkNote) da bu dizinin İÇİNDE, ilgili olduğu noktaya yerleştirilir.",
      type: "array",
      of: [
        { type: "sparkRecord" },
        { type: "sparkReading" },
        { type: "sparkNote" },
        { type: "sparkCall" },
        { type: "sparkEstimate" },
        { type: "sparkWeigh" },
        { type: "sparkSignal" },
        { type: "sparkSecondOpinion" },
        { type: "sparkAllocation" },
      ],
    }),
  ],
  preview: {
    select: { title: "subject", subtitle: "format.name.en" },
  },
});
