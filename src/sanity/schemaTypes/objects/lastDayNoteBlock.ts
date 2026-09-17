import { defineField, defineType } from "sanity";

// Dördüncü bir şey — record/reading/gap gibi bir "blok tipi" değil,
// sol çizgi ya da mono state etiketi taşımaz (bkz. RecordBlock/
// ReadingBlock/GapBlock). Ledger modunda tamamen kaybolur.
export default defineType({
  name: "lastDayNoteBlock",
  title: "fspark9 Note",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day", type: "number", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body (tek nokta, tek not)", type: "localeText", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "body.en" },
  },
});
