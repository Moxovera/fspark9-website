import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalBlockList",
  title: "Legal block · list",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "tr", title: "Turkish", type: "array", of: [{ type: "string" }] }),
      ],
    }),
  ],
});
