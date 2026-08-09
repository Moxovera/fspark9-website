import { defineField, defineType } from "sanity";

// content.ts: WorkPage — sadece hero. Vaka analizi kartları (CaseStudy[])
// bu şemaya taşınmıyor, henüz kendi koleksiyonu yok; work sayfası o
// koleksiyona referansla listeleyecek (ileride ayrı bir aşamada).
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
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
  ],
});
