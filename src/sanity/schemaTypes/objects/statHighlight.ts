import { defineField, defineType } from "sanity";

// Bölüm gövdesinin (localeBody) içine serbestçe yerleştirilebilen bir
// blok — büyük, tek bir rakam/istatistik + kısa bir alt satır (ör.
// "156 DAYS" / "£100M"). Bu blok localeBody.en[] ya da .tr[] içinde
// yaşadığı için alanları DÜZ string — dizinin kendisi zaten dil sınırı
// (bkz. localeBody.ts yorumu).
export default defineType({
  name: "statHighlight",
  title: "Stat highlight",
  type: "object",
  fields: [
    defineField({ name: "figure", title: "Figure (mono, e.g. \"156 DAYS\")", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption (optional)", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "figure", subtitle: "caption" },
  },
});
