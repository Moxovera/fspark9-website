import { defineField, defineType } from "sanity";

// /spark ve /tr/spark'ın kendisi — Layer 1 (Spark bölüm sayfası).
// Format listesi ve spark teaser'ı burada SAKLANMAZ, lastDayFormat/
// lastDayEpisode koleksiyonlarından sorgulanır (bkz. queries.ts).
export default defineType({
  name: "sparkSection",
  title: "Spark Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Spark Section",
      readOnly: true,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero",
      description: "eyebrow \"fspark9\", title \"Spark\", intro = standfirst.",
      type: "pageHero",
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      description: "Tam olarak 3 satır: THE RECORD / YOUR CALL / THE GAPS.",
      type: "array",
      of: [{ type: "sparkLabeledLine" }],
      validation: (rule) => rule.length(3),
    }),
    defineField({ name: "closingLine", title: "Closing line", type: "localeText" }),
    defineField({
      name: "episodeCountSingular",
      title: "Episode count word (singular, e.g. \"episode\")",
      type: "localeString",
    }),
    defineField({
      name: "episodeCountPlural",
      title: "Episode count word (plural, e.g. \"episodes\")",
      type: "localeString",
    }),
    defineField({
      name: "homeLinkLabel",
      title: "Homepage module link label (e.g. \"Explore Spark\")",
      type: "localeString",
    }),
  ],
});
