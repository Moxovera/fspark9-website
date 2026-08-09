import { defineField, defineType } from "sanity";

// content.ts: ProseBlock 'head' varyantı — LegalBlock'un 7 varyantlı
// union'ıyla KARIŞTIRILMAMALI, /story'nin düz makale metni için ayrı,
// daha basit bir tip (sadece head/body).
export default defineType({
  name: "proseHead",
  title: "Prose · heading",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeString" })],
  preview: {
    select: { title: "text.en" },
  },
});
