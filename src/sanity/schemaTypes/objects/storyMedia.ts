import { defineField, defineType } from "sanity";

export default defineType({
  name: "storyMedia",
  title: "Story media",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["image", "youtube"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "youtubeId", title: "YouTube ID", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "localeText" }),
  ],
});
