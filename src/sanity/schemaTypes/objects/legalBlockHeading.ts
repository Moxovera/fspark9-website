import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalBlockHeading",
  title: "Legal block · heading",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeString" })],
  preview: {
    select: { title: "text.en" },
  },
});
