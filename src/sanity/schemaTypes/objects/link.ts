import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "href", title: "Href", type: "string" }),
    defineField({ name: "external", title: "External", type: "boolean" }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "href" },
  },
});
