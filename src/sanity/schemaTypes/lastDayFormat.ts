import { defineField, defineType } from "sanity";

// Layer 1: name/slug/description (format kartı). Layer 2: hero/
// howItWorks/closingLine/corrections/dayCount* (format sayfasının
// kendisi, /spark/the-last-day). Bölümlerin kendi içerik modeli
// (blocks: record/reading/gap/call/note) lastDayEpisode'da, Layer 3'te.
export default defineType({
  name: "lastDayFormat",
  title: "Last Day Format",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "description",
      title: "One-line description (for the format card)",
      type: "localeText",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero",
      description: "eyebrow \"Spark\", title = name (\"The Last Day\"/\"Son Gün\"), intro = standfirst.",
      type: "pageHero",
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      description: "Tam olarak 3 satır: The clock / The record only / The call.",
      type: "array",
      of: [{ type: "sparkLabeledLine" }],
      validation: (rule) => rule.length(3),
    }),
    defineField({ name: "closingLine", title: "Closing line", type: "localeText" }),
    defineField({
      name: "corrections",
      title: "Corrections panel",
      description:
        "Tam olarak 3 satır: Corrections / Every episode carries three dates / Right of reply. " +
        "\"label\" kalın giriş cümlesi (ör. \"Corrections.\"), \"body\" geri kalan metin. Adres " +
        "henüz yoksa body içine literal \"[ADDRESS TO BE SET]\" yazılır — uydurma adres YOK.",
      type: "array",
      of: [{ type: "sparkLabeledLine" }],
      validation: (rule) => rule.length(3),
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
      name: "mechanicLabels",
      title: "Mechanic labels (Layer 3 — bölüm sayfasının sabit UI kelimeleri)",
      type: "lastDayMechanicLabels",
    }),
  ],
  preview: {
    select: { title: "name.en" },
  },
});
