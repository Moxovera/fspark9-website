import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookingSection",
  title: "Booking section",
  type: "object",
  fields: [
    defineField({ name: "calLink", title: "Cal.com link", type: "string" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
    defineField({ name: "meta1", title: "Meta 1", type: "localeString" }),
    defineField({ name: "meta2", title: "Meta 2", type: "localeString" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "calLink" },
  },
});
