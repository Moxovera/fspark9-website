import { defineField, defineType } from "sanity";

// content.ts: LegalBlock 'tbl' varyantı — rows: string[][] (satır başına
// hücre dizisi). Sanity çok boyutlu diziyi desteklemiyor
// ("multidimensional arrays are not currently supported"), bu yüzden her
// satır `cells` alanlı bir object'e sarmalanıyor.
export default defineType({
  name: "legalBlockTable",
  title: "Legal block · table",
  type: "object",
  fields: [
    defineField({
      name: "head",
      title: "Head",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "tr", title: "Turkish", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [
            {
              type: "object",
              name: "row",
              fields: [
                { name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] },
              ],
            },
          ],
        }),
        defineField({
          name: "tr",
          title: "Turkish",
          type: "array",
          of: [
            {
              type: "object",
              name: "row",
              fields: [
                { name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] },
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
