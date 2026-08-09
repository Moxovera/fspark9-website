import { defineField, defineType } from "sanity";

export default defineType({
  name: "familiarSection",
  title: "Familiar section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "familiarPoint" }],
    }),
    defineField({ name: "closingLine", title: "Closing line", type: "localeText" }),
  ],
});
