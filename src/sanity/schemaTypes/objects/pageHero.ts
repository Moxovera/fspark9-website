import { defineField, defineType } from "sanity";

// content.ts: PageHero — alt sayfaların (work/services/story/legal) ortak
// SubpageHero deseni. Home'daki `hero` object tipiyle KARIŞTIRILMAMALI, o
// bullets/cta/scrollLabel taşıyan ayrı ve çok daha büyük bir tip.
export default defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
