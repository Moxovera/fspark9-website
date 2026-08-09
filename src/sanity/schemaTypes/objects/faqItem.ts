import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "localeString" }),
    defineField({ name: "answer", title: "Answer", type: "localeText" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "question.en" },
  },
});
