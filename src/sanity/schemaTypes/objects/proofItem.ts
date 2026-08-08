import { defineField, defineType } from "sanity";

export default defineType({
  name: "proofItem",
  title: "Proof item",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "line", title: "Line", type: "localeText" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "line.en" },
  },
});
