import { defineField, defineType } from "sanity";

export default defineType({
  name: "frameworkStep",
  title: "Framework step",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      options: { list: ["decide", "setup", "ship"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "id" },
  },
});
