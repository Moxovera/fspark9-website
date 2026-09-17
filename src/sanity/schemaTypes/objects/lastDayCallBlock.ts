import { defineField, defineType } from "sanity";

// revealBlocks bu call'a ÖZEL, başka bir yerde paylaşılmayan içerik
// olduğu için gömülü (embedded) tutuldu — ayrı bir koleksiyona
// referans vermeye gerek yok.
export default defineType({
  name: "lastDayCallBlock",
  title: "Call",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Stable id (localStorage anahtarı)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "day", title: "Day", type: "number", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      title: "Answer (record's own answer, reader'a gösterilmez)",
      type: "string",
      options: { list: ["rule", "decision", "unsettled"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "revealBlocks",
      title: "Reveal blocks",
      type: "array",
      of: [
        { type: "lastDayRecordBlock" },
        { type: "lastDayReadingBlock" },
        { type: "lastDayGapBlock" },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "prompt.en", subtitle: "answer" },
  },
});
