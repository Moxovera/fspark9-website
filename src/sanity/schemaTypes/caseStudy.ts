import { defineField, defineType } from "sanity";

// content.ts: CaseStudy — bağımsız bir koleksiyon. /work index'i (kart
// özeti: name/subtitle/body/coverImage/tags) ve /work/[slug] detay
// sayfası (problem/actions/delivered/screens + detailEyebrow/
// detailIntro'dan türeyen SubpageHero) AYNI dokümanı okur. coverImage/
// logo/screens görsel alanları storyMedia.image'daki gibi düz `alt`
// taşır — proofItem.logo/mediaItem ile aynı desen, locale'e göre
// ayrılmıyor.
export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id.replace(/^drafts\./, "") ?? "";
          const isUnique = await client.fetch(
            `!defined(*[!(_id in [$draft, $published]) && _type == "caseStudy" && slug == $slug][0]._id)`,
            { draft: `drafts.${id}`, published: id, slug },
          );
          return isUnique || "Bu slug başka bir Case Study dokümanında zaten kullanılıyor.";
        }),
    }),
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "location", title: "Location", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "problemHeading", title: "Problem heading", type: "localeString" }),
    defineField({ name: "problem", title: "Problem", type: "localeText" }),
    defineField({ name: "actionsHeading", title: "Actions heading", type: "localeString" }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [{ type: "caseStudyAction" }],
    }),
    defineField({ name: "deliveredHeading", title: "Delivered heading", type: "localeString" }),
    defineField({ name: "delivered", title: "Delivered", type: "localeText" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "tr", title: "Turkish", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "screens",
      title: "Screens",
      type: "array",
      of: [
        {
          type: "image",
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        },
      ],
    }),
    defineField({ name: "detailEyebrow", title: "Detail eyebrow", type: "localeString" }),
    defineField({ name: "detailIntro", title: "Detail intro", type: "localeText" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "slug" },
  },
});
