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
// Record/Reading/Gap/altı mekanik modeli, bkz. sparkEpisodeBlocks.ts.
// Bu, Faz 3'te bilinçli olarak kaldırılan "engaging layer"ın açık bir
// tersine çevrilmesi, kazayla değil. `blocks` TEK bir paylaşılan dizi
// (locale başına AYRI diziler değil) çünkü mekanik sırası ve state
// anahtarları (blockId) dilden bağımsız kalmalı. `expertNotes` artık
// gövde içine serpiştirilmiş bloklar değil, bölüm sonunda imzalı, tek
// bir bölüm (bkz. final brief §1, "the previous version... is corrected
// here").
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
      name: "blocks",
      title: "Blocks",
      description:
        "Record/Reading/Gap ve altı mekanik, okunma sırasında TEK dizi. Hiçbir bloğun elle girilmiş bir " +
        "\"day\" alanı yok — gün numarası her zaman launchDate ve bloğun kendi date'inden hesaplanır.",
      type: "array",
      of: [
        { type: "sparkRecord" },
        { type: "sparkReading" },
        { type: "sparkGap" },
        { type: "sparkCall" },
        { type: "sparkEstimate" },
        { type: "sparkEstimateReveal" },
        { type: "sparkWeigh" },
        { type: "sparkSignal" },
        { type: "sparkSecondOpinion" },
        { type: "sparkAllocation" },
      ],
    }),
    defineField({
      name: "expertNotes",
      title: "Expert Notes (signed, end of episode)",
      description:
        "Birinci ağızdan, imzalı, bölümün en sonunda tek bölüm olarak render edilir (final brief §1). " +
        "Ledger modunda tamamen gizlenir. Her giriş kendi başına bir nokta.",
      type: "array",
      of: [{ type: "localeText" }],
    }),
  ],
  preview: {
    select: { title: "subject", subtitle: "format.name.en" },
  },
});
