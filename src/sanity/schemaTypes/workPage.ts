import { defineField, defineType } from "sanity";
import { ls, lt, singletonTitle } from "./fields";

// /work ve vaka sayfalarının ortak etiketleri.

export default defineType({
  name: "workPage",
  title: "Work page",
  type: "document",
  fields: [
    singletonTitle("Work page"),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    ls("backLabel", "Back link"),
    ls("label", "Label"),
    ls("heading", "Heading"),
    lt("lead", "Lead"),
    ls("readLabel", "Read the case"),
    ls("caseLabel", "Case page label"),
    ls("caseBackLabel", "Case page back link"),
    ls("sourcesLabel", "Sources label"),
    ls("nextCaseLabel", "Next case label"),
  ],
  preview: { prepare: () => ({ title: "Work page" }) },
});
