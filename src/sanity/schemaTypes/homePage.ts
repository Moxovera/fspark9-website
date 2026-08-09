import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Home Page",
      readOnly: true,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({ name: "framework", title: "Framework", type: "framework" }),
    defineField({ name: "proofStrip", title: "Proof strip", type: "proofStrip" }),
    defineField({ name: "familiar", title: "Familiar", type: "familiarSection" }),
    defineField({ name: "caseStudies", title: "Case studies", type: "caseStudiesSection" }),
    defineField({ name: "services", title: "Services", type: "servicesSection" }),
    defineField({ name: "comparison", title: "Comparison", type: "comparisonTable" }),
    defineField({ name: "approach", title: "Approach", type: "approachSection" }),
    defineField({ name: "audience", title: "Audience", type: "audienceSection" }),
    defineField({ name: "story", title: "Story", type: "storySection" }),
    defineField({ name: "testimonials", title: "Testimonials", type: "testimonialSection" }),
    defineField({ name: "media", title: "Media", type: "mediaSection" }),
    defineField({ name: "process", title: "Process", type: "processSection" }),
    defineField({ name: "faq", title: "FAQ", type: "faqSection" }),
    defineField({ name: "closingCta", title: "Closing CTA", type: "closingCta" }),
  ],
});
