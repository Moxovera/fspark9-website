import { defineField, defineType } from "sanity";

export default defineType({
  name: "comparisonRow",
  title: "Comparison row",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "isUs", title: "Is us", type: "boolean" }),
    defineField({ name: "decide", title: "Decide", type: "comparisonValue" }),
    defineField({ name: "setup", title: "Setup", type: "comparisonValue" }),
    defineField({ name: "ship", title: "Ship", type: "comparisonValue" }),
  ],
  preview: {
    select: { title: "label.en" },
  },
});
