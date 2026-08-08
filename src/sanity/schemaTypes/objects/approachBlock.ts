import { defineField, defineType } from "sanity";

export default defineType({
  name: "approachBlock",
  title: "Approach block",
  type: "object",
  fields: [
    defineField({ name: "number", title: "Number", type: "number" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "number" },
  },
});
