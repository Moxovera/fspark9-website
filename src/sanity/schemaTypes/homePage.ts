import { defineArrayMember, defineField, defineType } from "sanity";
import { figureList, group, ls, lsList, lt, singletonTitle, titleTextList, portraitField } from "./fields";

// Ana sayfa. Dört hizmet servicePage belgelerinden, Spark kartları
// bölümlerden (sparkEpisode) geliyor; burada sadece bölüm metinleri.

export default defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "opening", title: "Opening", default: true },
    { name: "start", title: "01 Start where you are" },
    { name: "services", title: "02 Four services" },
    { name: "work", title: "03 Work" },
    { name: "withMe", title: "04 With me" },
    { name: "spark", title: "Spark" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    singletonTitle("Home"),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    group(
      "opening",
      "Opening",
      [
        lsList("eyebrowParts", "Eyebrow parts", { description: "Mobilde sadece ilki ve sonuncusu görünür." }),
        lsList("headlineSentences", "Headline, one sentence per line"),
        ls("cutWord", "Flare cut (end of the last sentence)"),
        lt("intro", "Intro"),
        ls("ctaLabel", "Button"),
        ls("secondaryLinkLabel", "Second link"),
        ls("portraitAlt", "Portrait alt text"),
        portraitField,
      ],
      { group: "opening" },
    ),
    group(
      "startWhereYouAre",
      "Start where you are",
      [ls("label", "Label"), ls("heading", "Heading"), lt("text", "Text"), titleTextList("items", "Cards")],
      { group: "start" },
    ),
    group("fourServices", "Four services", [ls("label", "Label"), ls("heading", "Heading"), lt("intro", "Intro")], {
      group: "services",
      description: "Hizmet satırları Services belgelerinden, sıralarına göre.",
    }),
    group(
      "work",
      "Work",
      [
        ls("label", "Label"),
        ls("heading", "Heading"),
        ls("allLinkLabel", "All cases link"),
        group("featured", "Featured case", [
          defineField({ name: "caseStudy", title: "Case", type: "reference", to: [{ type: "caseStudy" }] }),
          ls("label", "Label"),
          ls("heading", "Heading"),
          lt("text", "Text"),
          figureList("figures", "Figures", { exactly: 3 }),
          ls("linkLabel", "Link"),
        ]),
        defineField({
          name: "rows",
          title: "Other cases",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "caseRow",
              fields: [
                defineField({ name: "caseStudy", title: "Case", type: "reference", to: [{ type: "caseStudy" }] }),
                lt("line", "Line"),
                ls("tags", "Tags"),
              ],
              preview: { select: { title: "caseStudy.name.en", subtitle: "line.en" } },
            }),
          ],
        }),
        ls("alsoLabel", "Also label"),
        titleTextList("also", "Also (name and line)"),
      ],
      { group: "work" },
    ),
    group(
      "withMe",
      "What you get with me",
      [
        ls("label", "Label"),
        ls("heading", "Heading"),
        lt("text", "Text"),
        titleTextList("points", "Points"),
        ls("portraitAlt", "Portrait alt text"),
        portraitField,
      ],
      { group: "withMe" },
    ),
    group("spark", "Spark", [ls("label", "Label"), ls("heading", "Heading"), lt("text", "Text"), ls("linkLabel", "Link"), ls("cardLinkLabel", "Card link (published episode)")], {
      group: "spark",
      description: "Kartlar Spark bölümlerinden (yayında ve sıradaki) otomatik geliyor.",
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
