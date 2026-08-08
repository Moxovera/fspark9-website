import { defineField, defineType } from "sanity";

export default defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
    defineField({ name: "tr", title: "Turkish", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "en" },
  },
});
