import { defineField, defineType } from "sanity";

// restsOn GERÇEK bir Sanity referansı değil (aynı blocks[] dizisi
// içindeki kardeş öğelere referans Sanity'de doğrudan desteklenmiyor) —
// dayanılan record'un heading'i editoryal olarak elle yazılır ve
// bileşen bunu küçük bir "rests on" çipi olarak render eder. Bilinen
// bir modelleme sadeleştirmesi, handback'te not edildi.
export default defineType({
  name: "lastDayReadingBlock",
  title: "Reading",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day", type: "number", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "restsOn",
      title: "Rests on (dayanılan record'ların heading'i, EN)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.en" },
  },
});
