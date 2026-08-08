import { defineField, defineType } from "sanity";

export default defineType({
  name: "mediaSection",
  title: "Media section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "mediaItem" }],
    }),
  ],
});
