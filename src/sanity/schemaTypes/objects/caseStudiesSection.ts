import { defineField, defineType } from "sanity";

// content.ts: CaseStudiesSection — sadece wrapper metni (heading/intro/
// linkLabel). items alanı buraya taşınmıyor, vaka analizlerinin kendisi
// ayrı bir koleksiyonda (caseStudy) yaşıyor.
export default defineType({
  name: "caseStudiesSection",
  title: "Case studies section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({ name: "linkLabel", title: "Link label", type: "localeString" }),
  ],
});
