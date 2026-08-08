import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
    }),
    defineField({ name: "booking", title: "Booking", type: "bookingSection" }),
    defineField({ name: "subpageCta", title: "Subpage CTA", type: "subpageCta" }),
  ],
});
