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
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({ name: "framework", title: "Framework", type: "framework" }),
    defineField({ name: "proofStrip", title: "Proof strip", type: "proofStrip" }),
    defineField({ name: "services", title: "Services", type: "servicesSection" }),
    defineField({ name: "comparison", title: "Comparison", type: "comparisonTable" }),
    defineField({ name: "approach", title: "Approach", type: "approachSection" }),
    defineField({ name: "audience", title: "Audience", type: "audienceSection" }),
    defineField({ name: "story", title: "Story", type: "storySection" }),
    defineField({ name: "testimonials", title: "Testimonials", type: "testimonialSection" }),
    defineField({ name: "media", title: "Media", type: "mediaSection" }),
  ],
});
