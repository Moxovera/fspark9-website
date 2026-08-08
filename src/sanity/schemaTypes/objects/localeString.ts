import { defineField, defineType } from "sanity";

export default defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "tr", title: "Turkish", type: "string" }),
  ],
  preview: {
    select: { title: "en" },
  },
});
