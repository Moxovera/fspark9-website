import { defineField, defineType } from "sanity";

// content.ts: StorySection.paragraphs — bullets ile aynı desen, dizi
// elemanı başına {en,tr} değil, iki dil aynı sırayı paylaşıyor.
export default defineType({
  name: "storySection",
  title: "Story section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "lead", title: "Lead", type: "localeText" }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "text" }],
        }),
        defineField({
          name: "tr",
          title: "Turkish",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
    defineField({ name: "media", title: "Media", type: "storyMedia" }),
  ],
});
