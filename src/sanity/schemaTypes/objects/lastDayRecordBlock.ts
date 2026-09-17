import { defineField, defineType } from "sanity";

// Verification contract (build prompt Part 0/Layer 3): sourceUrl boş
// bırakılamaz — burada Studio validasyonu, asıl "build'i kırma" kontrolü
// queries.ts:toLastDayEpisodePage'de (statik üretim sırasında throw).
export default defineType({
  name: "lastDayRecordBlock",
  title: "Record",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day (day zero'dan itibaren, negatif olabilir)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "quote",
      title: "Quote (verbatim only)",
      type: "localeText",
    }),
    defineField({
      name: "quoteAttribution",
      title: "Quote attribution",
      type: "localeString",
      validation: (r) => r.custom((value, ctx) => {
        const hasQuote = Boolean((ctx.parent as { quote?: { en?: string } } | undefined)?.quote?.en);
        if (hasQuote && !value) return "Quote var, attribution eksik";
        return true;
      }),
    }),
    defineField({ name: "sourceLabel", title: "Source label", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      validation: (r) => r.required().error("Her record'un bir sourceUrl'i olmalı — bkz. verification contract."),
    }),
    defineField({
      name: "sourceKind",
      title: "Source kind",
      type: "string",
      options: { list: ["regulator", "filing", "company", "court", "press"] },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "heading.en", subtitle: "sourceLabel.en" },
  },
});
