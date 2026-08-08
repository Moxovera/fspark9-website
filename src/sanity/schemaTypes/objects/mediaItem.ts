import { defineField, defineType } from "sanity";

export default defineType({
  name: "mediaItem",
  title: "Media item",
  type: "object",
  fields: [
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "note", title: "Note", type: "localeString" }),
    defineField({ name: "href", title: "Href", type: "string" }),
    defineField({ name: "isVideo", title: "Is video", type: "boolean" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "headline.en", subtitle: "source" },
  },
});
