import { defineField, defineType } from "sanity";

// sparkSection.pillars ve lastDayFormat.howItWorks aynı şekli
// paylaşıyor: kısa mono etiket + altında bir gövde cümlesi. Tek
// bileşen, iki yerden reuse (CLAUDE.md: tekrarlanan yapılar tek tip).
export default defineType({
  name: "sparkLabeledLine",
  title: "Labeled line",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label (mono)", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
  ],
  preview: {
    select: { title: "label.en" },
  },
});
