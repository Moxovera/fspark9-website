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
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "nav", title: "Nav", type: "array", of: [{ type: "link" }] }),
    defineField({ name: "booking", title: "Booking", type: "bookingSection" }),
    defineField({ name: "subpageCta", title: "Subpage CTA", type: "subpageCta" }),
    defineField({ name: "footer", title: "Footer", type: "footer" }),
  ],
});
