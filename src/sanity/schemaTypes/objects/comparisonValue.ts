import { defineField, defineType } from "sanity";

export default defineType({
  name: "comparisonValue",
  title: "Comparison value",
  type: "object",
  fields: [
    defineField({
      name: "state",
      title: "State",
      type: "string",
      options: { list: ["yes", "no", "partial"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "note", title: "Note", type: "localeString" }),
  ],
  preview: {
    select: { title: "state", subtitle: "note.en" },
  },
});
