import { defineField, defineType } from "sanity";

// content.ts: StoryPage — hero + media + prose. Home'daki storySection
// object tipiyle KARIŞTIRILMAMALI, o ayrı bir tip ve öyle kalıyor; bu
// /story alt sayfası için düz makale metnidir.
export default defineType({
  name: "storyPage",
  title: "Story Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Story Page",
      readOnly: true,
    }),
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({ name: "media", title: "Media", type: "storyMedia" }),
    defineField({
      name: "prose",
      title: "Prose",
      type: "array",
      of: [{ type: "proseHead" }, { type: "proseBody" }],
    }),
  ],
});
