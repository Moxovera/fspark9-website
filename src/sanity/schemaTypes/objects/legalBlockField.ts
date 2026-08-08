import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalBlockField",
  title: "Legal block · field",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({
      name: "lines",
      title: "Lines",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "tr", title: "Turkish", type: "array", of: [{ type: "string" }] }),
      ],
    }),
  ],
  preview: {
    select: { title: "label.en" },
  },
});
