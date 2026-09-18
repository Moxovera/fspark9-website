import { defineArrayMember, defineField, defineType } from "sanity";

// Episode 01 Bó, final interaction brief (17 Eylül 2026): Record/Reading/
// Gap/Call modeli + altı mekanik geri getirildi (bkz. sparkEpisode.ts
// üst yorumu — bu, daha önce bilinçli olarak kaldırılan "engaging layer"ın
// kullanıcının açık onayıyla tersine çevrilmesi). Tüm bloklar TEK bir
// paylaşılan `blocks` dizisinde, orijinal brief'teki gibi — alanlar
// {en,tr} taşıyor (sparkEpisode.body'nin dil başına BAĞIMSIZ dizi
// deseninin AKSİNE), çünkü mekanik pozisyonları ve state anahtarları
// dilden bağımsız kalmalı.
//
// `restsOn` orijinal brief'te Sanity reference olarak tarif edildi, ama
// referans alanları AYNI dokümanın dizi elemanlarını hedefleyemez (sadece
// başka dokümanları). Onun yerine her record/gap bloğu kararlı bir
// `blockId` string'i taşıyor, reading/call/mekanik reveal'ları bu id'lere
// string dizisiyle işaret ediyor.
//
// `day` alanı YOK — brief'in açık talimatı: "remove hand typed day
// numbers entirely and compute every stamp from dayZero and the block's
// own date at render time." Sadece `date` saklanıyor, gün numarası her
// zaman DayMeasure/dayMath'ten hesaplanıyor (bkz. dayNumberLabel).

const sourceKindOptions = ["regulator", "filing", "company", "court", "press"];

export const sparkSource = defineType({
  name: "sparkSource",
  title: "Source",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Source label", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Source URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Source kind",
      type: "string",
      options: { list: sourceKindOptions },
      validation: (r) => r.required(),
    }),
  ],
});

// Reveal içinde gömülü, kendi _type'ı olmayan "hafif" reading/gap —
// ayrı bir sparkReading/sparkGap dokümanına referans vermek yerine
// (bkz. üstteki not), her mekanik kendi reveal'ını doğrudan taşıyor.
export const sparkInlineReading = defineType({
  name: "sparkInlineReading",
  title: "Reading (reveal)",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "heading.en" } },
});

export const sparkInlineGap = defineType({
  name: "sparkInlineGap",
  title: "Gap (reveal)",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "whereItWouldBe", title: "Where it would be", type: "localeString" }),
    defineField({ name: "invitesCorrection", title: "Invites correction", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "heading.en" } },
});

export const sparkRecord = defineType({
  name: "sparkRecord",
  title: "Record",
  type: "object",
  fields: [
    defineField({
      name: "blockId",
      title: "Block ID (stable, for restsOn references)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "quote", title: "Quote (verbatim only)", type: "localeText" }),
    defineField({
      name: "quoteAttribution",
      title: "Quote attribution (required if quote is set)",
      type: "localeString",
      validation: (r) =>
        r.custom((value, context) => {
          const parent = context.parent as { quote?: { en?: string } } | undefined;
          if (parent?.quote?.en && !value) return "Required when a quote is set";
          return true;
        }),
    }),
    defineField({ name: "source", title: "Source", type: "sparkSource", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "heading.en", subtitle: "date" } },
});

export const sparkReading = defineType({
  name: "sparkReading",
  title: "Reading",
  type: "object",
  fields: [
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "restsOn",
      title: "Rests on (record blockIds)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "heading.en", subtitle: "date" } },
});

export const sparkGap = defineType({
  name: "sparkGap",
  title: "Gap",
  type: "object",
  fields: [
    defineField({ name: "date", title: "Date (varsa)", type: "date" }),
    defineField({ name: "heading", title: "Heading", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "whereItWouldBe", title: "Where it would be", type: "localeString" }),
    defineField({ name: "invitesCorrection", title: "Invites correction", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "heading.en", subtitle: "date" } },
});

export const sparkCall = defineType({
  name: "sparkCall",
  title: "The Call",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID (localStorage key)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "string",
      options: { list: ["rule", "decision", "unsettled"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reveal",
      title: "Reveal (reading and/or gap, in order)",
      type: "array",
      of: [{ type: "sparkInlineReading" }, { type: "sparkInlineGap" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkEstimate = defineType({
  name: "sparkEstimate",
  title: "The Estimate",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "brackets",
      title: "Brackets (exactly 5, ordered low to high)",
      description:
        "min/max sayısal sınırlar TheEstimateReveal'ın karşılaştırması için — label sadece görüntü metni, " +
        "çeviriye göre değişebileceğinden karşılaştırma HİÇBİR ZAMAN label string'inden değil bu sınırlardan yapılır.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "estimateBracket",
          fields: [
            defineField({ name: "label", title: "Label", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "min", title: "Min (dahil)", type: "number", validation: (r) => r.required() }),
            defineField({
              name: "max",
              title: "Max (dahil, en üst aralık için boş bırak)",
              type: "number",
            }),
          ],
        }),
      ],
      validation: (r) => r.required().length(5),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkEstimateReveal = defineType({
  name: "sparkEstimateReveal",
  title: "The Estimate — resolves",
  type: "object",
  fields: [
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "estimateBlockId",
      title: "Resolves this Estimate's blockId",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "actualValue", title: "Actual value (raw number)", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "actualLabel",
      title: "Actual value, formatted (e.g. \"11,413 customers\")",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "insideBracketLabel",
      title: "\"Record is inside your bracket\" label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "belowBracketLabel",
      title: "\"Record came in lower\" label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboveBracketLabel",
      title: "\"Record came in higher\" label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "derivedReading",
      title: "Derived reading (per-customer figure)",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "actualLabel.en", subtitle: "date" } },
});

export const sparkWeigh = defineType({
  name: "sparkWeigh",
  title: "The Weigh",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer shown before commit",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "options",
      title: "Options (exactly 3)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "weighOption",
          fields: [
            defineField({ name: "label", title: "Label", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "line", title: "Line underneath", type: "localeString", validation: (r) => r.required() }),
          ],
        }),
      ],
      validation: (r) => r.required().length(3),
    }),
    defineField({ name: "revealGap", title: "Reveal — gap (first)", type: "sparkInlineGap", validation: (r) => r.required() }),
    defineField({
      name: "revealReading",
      title: "Reveal — reading (second)",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkSignal = defineType({
  name: "sparkSignal",
  title: "The Signal",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "notScoredLabel",
      title: "\"Not scored\" indicator label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "options",
      title: "Options (exactly 3)",
      type: "array",
      of: [{ type: "localeString" }],
      validation: (r) => r.required().length(3),
    }),
    defineField({
      name: "revealReading",
      title: "Reveal — reading",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkSecondOpinion = defineType({
  name: "sparkSecondOpinion",
  title: "The Second Opinion",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "notScoredLabel",
      title: "\"Not scored\" indicator label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "options",
      title: "Options (exactly 3)",
      type: "array",
      of: [{ type: "localeString" }],
      validation: (r) => r.required().length(3),
    }),
    defineField({
      name: "readingA",
      title: "Reading A (operational read)",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readingB",
      title: "Reading B (commercial read)",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "closingLine",
      title: "Closing line, set apart in bronze",
      type: "localeText",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkAllocation = defineType({
  name: "sparkAllocation",
  title: "The Allocation",
  type: "object",
  fields: [
    defineField({ name: "blockId", title: "Block ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "prompt", title: "Prompt", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "notScoredLabel",
      title: "\"Not scored\" indicator label",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({ name: "categoryALabel", title: "Category A label", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "categoryBLabel", title: "Category B label", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "revealReading",
      title: "Reveal — reading",
      type: "sparkInlineReading",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "prompt.en", subtitle: "date" } },
});

export const sparkEpisodeBlockTypes = [
  sparkSource,
  sparkInlineReading,
  sparkInlineGap,
  sparkRecord,
  sparkReading,
  sparkGap,
  sparkCall,
  sparkEstimate,
  sparkEstimateReveal,
  sparkWeigh,
  sparkSignal,
  sparkSecondOpinion,
  sparkAllocation,
];
