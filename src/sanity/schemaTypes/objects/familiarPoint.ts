import { defineField, defineType } from "sanity";

export default defineType({
  name: "familiarPoint",
  title: "Familiar point",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "localeText" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "text.en" },
  },
});
