import { defineArrayMember, defineField, defineType } from "sanity";
import { group, ls, lsList, lt, singletonTitle, portraitField } from "./fields";

// /about. storyPage'in yerini aldı.

const card = [ls("label", "Label"), lt("lead", "Lead (first sentence, large)"), lt("body", "Body")];

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    singletonTitle("About page"),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    ls("backLabel", "Back link"),
    ls("label", "Label"),
    group("hero", "Headline", [lsList("headlineSentences", "Headline, one sentence per line"), ls("cutWord", "Flare cut")]),
    defineField({
      name: "pair",
      title: "Two cards",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "storyCard", fields: card, preview: { select: { title: "label.en" } } })],
      validation: (r) => r.length(2),
    }),
    group("result", "How I work", card),
    group("whyNine", "Why nine", [ls("label", "Label"), lt("text", "Text")]),
    ls("portraitAlt", "Portrait alt text"),
    portraitField,
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
