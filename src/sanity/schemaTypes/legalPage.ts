import { defineField, defineType } from "sanity";

const SLUGS = ["terms", "privacy", "cookies", "impressum"];

// content.ts: LegalPage — terms/privacy/cookies/impressum için 4 ayrı
// dokümanı taşıyan TEK koleksiyon tipi, 4 ayrı doküman tipi değil.
// blocks alanı LegalBlock'un 7 varyantlı union'ını (legalBlockDiv/
// Heading/Subheading/Bold/Field/List/Table, hepsi zaten tanımlı) bir
// array'de birleştirir.
export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      options: { list: SLUGS },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id.replace(/^drafts\./, "") ?? "";
          const isUnique = await client.fetch(
            `!defined(*[!(_id in [$draft, $published]) && _type == "legalPage" && slug == $slug][0]._id)`,
            { draft: `drafts.${id}`, published: id, slug },
          );
          return isUnique || "Bu slug başka bir Legal Page dokümanında zaten kullanılıyor.";
        }),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        { type: "legalBlockDiv" },
        { type: "legalBlockHeading" },
        { type: "legalBlockSubheading" },
        { type: "legalBlockBold" },
        { type: "legalBlockField" },
        { type: "legalBlockList" },
        { type: "legalBlockTable" },
      ],
    }),
  ],
  preview: {
    select: { title: "hero.title.en", subtitle: "slug" },
  },
});
