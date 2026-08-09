import { defineField, defineType } from "sanity";

// content.ts: SiteSettings.footer — adlandırılmış bir interface değil,
// SiteSettings içinde satır içi bir tip; burada isimli bir object
// tipine çevrildi. email/linkedin locale'e göre değişmiyor (düz
// string), geri kalan kısa metinler localeString.
export default defineType({
  name: "footer",
  title: "Footer",
  type: "object",
  fields: [
    defineField({ name: "tagline", title: "Tagline", type: "localeString" }),
    defineField({ name: "nine", title: "Nine line", type: "localeString" }),
    defineField({ name: "signature", title: "Signature", type: "localeString" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "string" }),
    defineField({ name: "nav", title: "Nav", type: "array", of: [{ type: "link" }] }),
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({ name: "legal", title: "Legal address line", type: "localeString" }),
    defineField({ name: "copyright", title: "Copyright", type: "localeString" }),
  ],
});
