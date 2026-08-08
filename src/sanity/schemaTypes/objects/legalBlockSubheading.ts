import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalBlockSubheading",
  title: "Legal block · subheading",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeString" })],
  preview: {
    select: { title: "text.en" },
  },
});
