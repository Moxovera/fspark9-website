import { defineArrayMember, defineField, defineType } from "sanity";
import { figureFields, figureList, group, ls, lsList, lt, uniqueSlug } from "./fields";

// Bir vaka. Halkada yanan dilimler seçilen hizmetlerin dilimlerinin
// birleşimi, ayrıca yazılmıyor.

export default defineType({
  name: "caseStudy",
  title: "Case",
  type: "document",
  groups: [
    { name: "summary", title: "Summary", default: true },
    { name: "story", title: "Story" },
    { name: "proof", title: "Proof" },
    { name: "seo", title: "SEO" },
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { ...uniqueSlug("caseStudy"), group: "summary" },
    defineField({ name: "order", title: "Order", type: "number", group: "summary" }),
    ls("name", "Name", { group: "summary", required: true }),
    lt("subtitle", "One line", { group: "summary" }),
    ls("market", "Market", { group: "summary" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "summary",
      of: [defineArrayMember({ type: "reference", to: [{ type: "servicePage" }] })],
    }),
    ls("tags", "Tags line", { group: "summary", description: "Satırda görünen hizmet adları." }),
    group("problem", "Where they were stuck", [ls("label", "Label"), lt("lead", "Lead"), lt("body", "Body")], { group: "story" }),
    group("actions", "What we did", [ls("label", "Label"), lsList("items", "Bullets")], { group: "story" }),
    group("delivered", "What happened", [ls("label", "Label"), lt("lead", "Lead"), lt("body", "Body")], { group: "story" }),
    figureList("figures", "Figures (three, optional)", { group: "proof" }),
    group("proof", "Proof on Work", figureFields, { group: "proof" }),
    defineField({ name: "sources", title: "Sources", type: "array", of: [{ type: "string" }], group: "proof" }),
    defineField({
      name: "screens",
      title: "Screens (first two are shown)",
      type: "array",
      group: "summary",
      of: [
        defineArrayMember({
          type: "image",
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "name.en", subtitle: "slug" } },
});
