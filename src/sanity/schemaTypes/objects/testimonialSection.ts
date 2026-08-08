import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialSection",
  title: "Testimonial section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "testimonial" }],
    }),
  ],
});
