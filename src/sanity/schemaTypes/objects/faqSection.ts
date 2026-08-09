import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "items", title: "Items", type: "array", of: [{ type: "faqItem" }] }),
  ],
});
