import { defineField, defineType } from "sanity";

// content.ts: WorkPage — sadece hero. Vaka analizi kartları ayrı bir
// koleksiyonda (caseStudy), work sayfası onu referansla listeliyor —
// bu doküman kart içeriği taşımıyor.
export default defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Work Page",
      readOnly: true,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
  ],
});
