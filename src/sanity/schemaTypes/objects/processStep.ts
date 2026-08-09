import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "number", title: "Number", type: "number" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "detail", title: "Detail", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
