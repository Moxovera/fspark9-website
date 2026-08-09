import { defineField, defineType } from "sanity";

// content.ts: ProseBlock 'body' varyantı — bkz. proseHead.ts notu.
export default defineType({
  name: "proseBody",
  title: "Prose · paragraph",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeText" })],
  preview: {
    select: { title: "text.en" },
  },
});
