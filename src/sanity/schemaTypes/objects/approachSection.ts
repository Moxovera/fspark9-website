import { defineField, defineType } from "sanity";

export default defineType({
  name: "approachSection",
  title: "Approach section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [{ type: "approachBlock" }],
    }),
  ],
});
