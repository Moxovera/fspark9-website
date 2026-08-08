import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "quote", title: "Quote", type: "localeText" }),
    defineField({ name: "attribution", title: "Attribution", type: "localeString" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "headline.en", subtitle: "attribution.en" },
  },
});
