import { defineField, defineType } from "sanity";

export default defineType({
  name: "framework",
  title: "Framework",
  type: "object",
  fields: [
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "frameworkStep" }],
      validation: (Rule) => Rule.length(3),
    }),
  ],
});
