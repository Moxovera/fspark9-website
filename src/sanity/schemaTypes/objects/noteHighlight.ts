import { defineField, defineType } from "sanity";

// fspark9'un kendi sesi — bölüm gövdesinin (localeBody) içine, ilgili
// olduğu noktaya serbestçe yerleştirilir. Düz string alan, bkz.
// statHighlight.ts'deki aynı gerekçe.
export default defineType({
  name: "noteHighlight",
  title: "fspark9 Note",
  type: "object",
  fields: [
    defineField({ name: "body", title: "Body (tek nokta, tek not)", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "body" },
    prepare: ({ title }) => ({ title: `fspark9 · ${title}` }),
  },
});
