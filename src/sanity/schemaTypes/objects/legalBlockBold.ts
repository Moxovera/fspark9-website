import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalBlockBold",
  title: "Legal block · bold paragraph",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeText" })],
  preview: {
    select: { title: "text.en" },
  },
});
