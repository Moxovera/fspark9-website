import { defineField, defineType } from "sanity";

export default defineType({
  name: "audienceCard",
  title: "Audience card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "problem", title: "Problem", type: "localeText" }),
    defineField({ name: "do", title: "What I do", type: "localeText" }),
    defineField({ name: "result", title: "Result", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
