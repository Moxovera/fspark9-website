import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudyAction",
  title: "Case study · action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
  ],
  preview: {
    select: { title: "label.en" },
  },
});
