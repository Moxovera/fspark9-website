import { defineField, defineType } from "sanity";

export default defineType({
  name: "comparisonTable",
  title: "Comparison table",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({ name: "scrollHint", title: "Scroll hint", type: "localeString" }),
    defineField({
      name: "columnLabels",
      title: "Column labels",
      type: "object",
      fields: [
        defineField({ name: "decide", title: "Decide", type: "localeString" }),
        defineField({ name: "setup", title: "Setup", type: "localeString" }),
        defineField({ name: "ship", title: "Ship", type: "localeString" }),
      ],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "comparisonRow" }],
    }),
  ],
});
