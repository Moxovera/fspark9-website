import { defineField, defineType } from "sanity";

// types/content.ts: Hero — eyebrow/headline/closingLine/ctaLabel/ctaNote/
// scrollLabel çeviri metni (localeString/localeText). bullets sıralı bir
// dizi olduğu için { en: string[], tr: string[] } — dizi elemanı başına
// {en,tr} değil, iki dil aynı sırayı paylaşıyor. ctaHref bir rota, dil
// içermiyor — düz string.
export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({
      name: "headlinePrimary",
      title: "Headline (primary line)",
      type: "localeString",
    }),
    defineField({
      name: "headlineAccent",
      title: "Headline (accent line)",
      type: "localeString",
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "tr",
          title: "Turkish",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({ name: "closingLine", title: "Closing line", type: "localeText" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
    defineField({ name: "ctaNote", title: "CTA note", type: "localeText" }),
    defineField({ name: "scrollLabel", title: "Scroll label", type: "localeString" }),
  ],
  preview: {
    select: { title: "headlinePrimary.en" },
  },
});
