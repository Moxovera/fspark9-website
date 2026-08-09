import { defineField, defineType } from "sanity";

// content.ts: PageSeo — homePage/siteSettings/workPage/servicesPage/
// storyPage/legalPage'e opsiyonel bir alan olarak eklenir. ogImage
// şimdilik boş bırakılıyor (bkz. seed-content.ts), şema hazır.
export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "ogImage",
      title: "OG image",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "noIndex", title: "No index", type: "boolean" }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
