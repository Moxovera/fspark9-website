import { defineField, defineType } from "sanity";

export default defineType({
  name: "subpageCta",
  title: "Subpage CTA",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
  ],
  preview: {
    select: { title: "headline.en" },
  },
});
