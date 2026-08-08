import { defineField, defineType } from "sanity";

export default defineType({
  name: "audienceSection",
  title: "Audience section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({
      name: "labels",
      title: "Labels",
      type: "object",
      fields: [
        defineField({ name: "problem", title: "Problem", type: "localeString" }),
        defineField({ name: "do", title: "What I do", type: "localeString" }),
        defineField({ name: "result", title: "Result", type: "localeString" }),
      ],
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "audienceCard" }],
    }),
  ],
});
