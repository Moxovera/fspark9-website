import { defineField, defineType } from "sanity";

export default defineType({
  name: "lastDayGapBlock",
  title: "Gap",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day (yaklaşık ya da bilinmiyorsa boş bırak)",
      type: "number",
    }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "whereItWouldBe", title: "Where it would be", type: "localeString" }),
    defineField({
      name: "invitesCorrection",
      title: "Invites correction",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "heading.en" },
  },
});
