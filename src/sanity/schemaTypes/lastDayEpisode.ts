import { defineField, defineType } from "sanity";

// Layer 1: number/slug/subject/teaser*/publishedAt ("the spark" teaser
// bloğu ve /spark'taki format kartı için). Layer 2: market/dayZero/
// dayLast/standfirst (format sayfasındaki bölüm listesi kartı — gün
// sayısı başlığı ve standfirst'ün ilk cümlesi). Layer 3: parent/body
// (bölümün asıl içeriği). Kullanıcı geri bildirimi sonrası: sabit
// record/reading/gap/call/note şablonu KALDIRILDI — her bölüm artık
// serbest biçimli `body` (localeBody, bkz. o dosyanın yorumu) ile
// kendi yapısını kuruyor, hiçbir bölüm bir diğeriyle aynı kalıba
// zorlanmıyor. evidenceTakenAt/lastCheckedAt de bu değişiklikle
// kaldırıldı — resmi doğrulama/corrections aparatının bir parçasıydı.
export default defineType({
  name: "lastDayEpisode",
  title: "Last Day Episode",
  type: "document",
  fields: [
    defineField({
      name: "format",
      title: "Format",
      type: "reference",
      to: [{ type: "lastDayFormat" }],
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
    defineField({ name: "market", title: "Market", type: "string" }),
    defineField({ name: "dayZero", title: "Day zero (launch)", type: "date" }),
    defineField({ name: "dayLast", title: "Last day (closure)", type: "date" }),
    defineField({ name: "standfirst", title: "Standfirst", type: "localeText" }),
    defineField({ name: "publishedAt", title: "Published at", type: "date" }),
    defineField({
      name: "teaserFigure",
      title: "Teaser figure (mono, e.g. \"156 DAYS\")",
      type: "localeString",
    }),
    defineField({ name: "teaserLine", title: "Teaser line", type: "localeText" }),
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
