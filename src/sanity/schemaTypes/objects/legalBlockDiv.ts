import { defineField, defineType } from "sanity";

// content.ts: LegalBlock — 7 varyantlı bir union. Sanity'de discriminated
// union karşılığı yok, her varyant kendi object tipi olarak tanımlanır ve
// bir array alanında `of: [{type:'legalBlockDiv'}, ...]` ile birleştirilir
// (o array alanı bir LegalPage şeması yazılınca eklenecek).
export default defineType({
  name: "legalBlockDiv",
  title: "Legal block · paragraph",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "localeText" })],
  preview: {
    select: { title: "text.en" },
  },
});
