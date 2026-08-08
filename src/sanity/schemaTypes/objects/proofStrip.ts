import { defineField, defineType } from "sanity";

export default defineType({
  name: "proofStrip",
  title: "Proof strip",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "localeString" }),
    defineField({ name: "roles", title: "Roles", type: "localeString" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "proofItem" }],
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
  ],
});
