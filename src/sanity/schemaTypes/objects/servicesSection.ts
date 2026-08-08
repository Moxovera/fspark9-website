import { defineField, defineType } from "sanity";

// content.ts: ServicesSection.labels — Service satırlarının ortak sütun
// başlıkları, her item'da tekrarlanmıyor (AudienceSection.labels ile aynı
// desen).
export default defineType({
  name: "servicesSection",
  title: "Services section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "labels",
      title: "Labels",
      type: "object",
      fields: [
        defineField({ name: "problem", title: "Problem", type: "localeString" }),
        defineField({ name: "action", title: "Action", type: "localeString" }),
        defineField({ name: "outcome", title: "Outcome", type: "localeString" }),
        defineField({ name: "rightDoor", title: "Right door", type: "localeString" }),
        defineField({ name: "notRightDoor", title: "Not right door", type: "localeString" }),
        defineField({ name: "duration", title: "Duration", type: "localeString" }),
        defineField({ name: "runsOn", title: "Runs on", type: "localeString" }),
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "service" }],
    }),
    defineField({
      name: "fullEngagementHeading",
      title: "Full engagement heading",
      type: "localeString",
    }),
    defineField({
      name: "fullEngagementBody",
      title: "Full engagement body",
      type: "localeText",
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
  ],
});
