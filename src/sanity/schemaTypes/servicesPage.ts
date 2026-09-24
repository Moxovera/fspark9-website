import { defineField, defineType } from "sanity";
import { group, ls, lt, singletonTitle } from "./fields";

// /services sayfası ve dört hizmet sayfasının ortak etiketleri.

export default defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    singletonTitle("Services page"),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    ls("backLabel", "Back link"),
    group("opening", "Opening", [ls("label", "Label"), ls("heading", "Heading"), lt("intro", "Intro")]),
    group(
      "servicePageLabels",
      "Labels on every service page",
      [
        ls("backLabel", "Back link"),
        ls("stepsLabel", "Steps label"),
        ls("otherServicesLabel", "Other services label"),
        ls("keepLabel", "Closing label"),
        ls("ctaLabel", "Closing button"),
      ],
      { description: "Dört hizmet sayfasında aynı; bir kez yazılıyor." },
    ),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
