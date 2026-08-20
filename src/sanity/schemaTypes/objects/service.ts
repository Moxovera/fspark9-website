import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string" }),
    defineField({ name: "number", title: "Number", type: "number" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    // Adım etiketi (DECIDE / KARAR ...). BÜYÜK HARF yazılır: sitede bu
    // etiket üzerinde CSS text-transform:uppercase YOK. Sebep: bu dönüşüm
    // sayfanın diline bağlı çalışıyor ve lang="tr" altında küçük "i"
    // noktalı "İ"ye dönüşüyor (DECIDE → DECİDE). Metin kaynakta büyük
    // harf tutulunca tarayıcıda locale'e bağlı dönüşüm kalmıyor.
    defineField({
      name: "tag",
      title: "Tag",
      type: "localeString",
      description: "Step label — type it in UPPERCASE (DECIDE, SET UP, KARAR ...).",
    }),
    defineField({ name: "problem", title: "Problem", type: "localeText" }),
    defineField({ name: "action", title: "Action", type: "localeText" }),
    defineField({ name: "outcome", title: "Outcome", type: "localeText" }),
    defineField({ name: "rightDoor", title: "Right door", type: "localeText" }),
    defineField({ name: "notRightDoor", title: "Not right door", type: "localeText" }),
    defineField({ name: "duration", title: "Duration", type: "localeText" }),
    defineField({ name: "runsOn", title: "Runs on", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "tag.en" },
  },
});
