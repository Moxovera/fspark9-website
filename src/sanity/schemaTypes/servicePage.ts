import { defineArrayMember, defineField, defineType } from "sanity";
import { group, ls, lt, slicesField, uniqueSlug } from "./fields";

// Bir hizmet (×4). Adı, satırı ve dilimleri Services menüsünde, ana
// sayfada, /services'te ve vakalarda da kullanılıyor.

export default defineType({
  name: "servicePage",
  title: "Service",
  type: "document",
  groups: [
    { name: "summary", title: "Summary", default: true },
    { name: "page", title: "Page" },
    { name: "seo", title: "SEO" },
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { ...uniqueSlug("servicePage"), group: "summary" },
    defineField({ name: "order", title: "Order", type: "number", group: "summary", validation: (r) => r.required().integer() }),
    ls("name", "Name", { group: "summary", required: true }),
    lt("shortLine", "Short line (menu and rows)", { group: "summary" }),
    ls("audience", "Audience", { group: "summary" }),
    { ...slicesField(), group: "summary" },
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    group("opening", "Opening", [ls("label", "Label"), ls("heading", "Heading"), lt("intro", "Intro")], { group: "page" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceStep",
          fields: [ls("title", "Title (optional)"), lt("line", "Line"), slicesField("slices", "Slices of this step")],
          preview: { select: { title: "title.en", subtitle: "line.en" } },
        }),
      ],
    }),
    lt("keep", "What you walk away with", { group: "page" }),
  ],
  preview: { select: { title: "name.en", subtitle: "slug" } },
});
