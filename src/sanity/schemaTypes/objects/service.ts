import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string" }),
    defineField({ name: "number", title: "Number", type: "number" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "tag", title: "Tag", type: "localeString" }),
    defineField({ name: "problem", title: "Problem", type: "localeText" }),
    defineField({ name: "action", title: "Action", type: "localeText" }),
    defineField({ name: "outcome", title: "Outcome", type: "localeText" }),
    defineField({ name: "rightDoor", title: "Right door", type: "localeText" }),
    defineField({ name: "notRightDoor", title: "Not right door", type: "localeText" }),
    defineField({ name: "duration", title: "Duration", type: "localeText" }),
    defineField({ name: "runsOn", title: "Runs on", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "tag.en" },
  },
});
