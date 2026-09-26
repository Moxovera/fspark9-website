import { defineArrayMember, defineField, defineType } from "sanity";
import { ls, lt } from "./fields";

// Bir Spark formatı (The Last Day, Sector reports). Hub'daki bloğun
// metni (description, openLabel, preparingLine) ve format sayfasının
// metni (label, line, how to read, close) burada. Sayılar sparkEpisode
// belgelerinden gelir. Son Gün v3 (2026-09-26) ile eski liste sütunları,
// "about" satırları ve mekanik kelime dağarcığı şemadan çıktı.
export default defineType({
  name: "sparkFormat",
  title: "Spark Format",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number (01, 02...)",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({ name: "name", title: "Name", type: "localeString" }),
    ls("singularName", "Singular name (home cards)", { description: "Ör. \"Sector report\". Boşsa Name." }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["live", "preparing"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order rank (hub sıralaması)",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    lt("description", "Description line"),
    ls("openLabel", "Open link (live formats)"),
    ls("preparingLine", "Line instead of the link (preparing formats)"),
    ls("comingLabel", "Status of the next issue (\"Coming next\", \"In preparation\")"),
    ls("allIssuesLabel", "All issues ({n})"),
    ls("daysUnit", "Days unit"),
    // Format sayfası (Son Gün v3, 2026-09-26).
    lt("line", "Page line"),
    ls("startLabel", "Start button (to the first published episode)"),
    ls("howLabel", "How to read, label"),
    ls("howHeading", "How to read, heading"),
    defineField({
      name: "howSteps",
      title: "How to read, steps",
      description: "Boşsa bölüm çıkmaz.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sparkHowStep",
          fields: [ls("title", "Title"), lt("body", "Text")],
          preview: { select: { title: "title.en", subtitle: "body.en" } },
        }),
      ],
    }),
    ls("episodesLabel", "Episode list label"),
    ls("closeHeading", "Next step heading (boşsa sitenin başlığı)"),
  ],
  preview: {
    select: { title: "name.en" },
  },
});
