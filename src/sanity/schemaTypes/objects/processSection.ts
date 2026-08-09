import { defineField, defineType } from "sanity";

// content.ts: ProcessSection.ctaHref dilden bağımsız bir rota, düz
// string — ctaLabel ile karıştırma.
export default defineType({
  name: "processSection",
  title: "Process section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "processStep" }],
    }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
  ],
});
