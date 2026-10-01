import { defineArrayMember, defineField, defineType } from "sanity";
import { ls, lt, str } from "./fields";

// Son Gün v3 (2026-09-26): bölüm bir hikâye. Eski Record/Reading/Note
// blokları ve altı mekanik kaldırıldı. Diziler iki dilde ortak (bölüm ve
// karar sırası dilden bağımsız), metin alanları {en, tr}.
//
// Paragraflarda "[n]" kaynak listesindeki n'inci kaynağa dipnot olur.

const SERVICES = [
  { title: "Zero to Live", value: "zero-to-live" },
  { title: "Product & Strategy", value: "product-strategy" },
  { title: "Embedded Finance", value: "embedded-finance" },
  { title: "Expansion & GTM", value: "expansion-gtm" },
];

const serviceField = (name = "service", title = "Service page") =>
  defineField({ name, title, type: "string", options: { list: SERVICES }, validation: (r) => r.required() });

/** Yandaki kartın bir duraktaki hali. */
export const sparkStoryCard = defineType({
  name: "sparkStoryCard",
  title: "Card",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      description: "draft: kesikli çerçeve · live: Flare · flipped: arka yüz · closed: gri",
      options: { list: ["draft", "live", "flipped", "closed"] },
      validation: (r) => r.required(),
    }),
    str("day", "Day (\"000\", lansmandan önce \"?\")", { required: true }),
    ls("state", "State line on the card"),
    ls("caption", "Caption under the card (wide screens)"),
    ls("barTitle", "Title in the thin bar (narrow screens)"),
    defineField({
      name: "progress",
      title: "Day clock progress (%, only with a day clock)",
      type: "number",
      validation: (r) => r.min(0).max(100),
    }),
    ls("barDay", "Day in the thin bar (optional, replaces \"Day {n}\")"),
  ],
});

export const sparkServiceTag = defineType({
  name: "sparkServiceTag",
  title: "Service tag",
  type: "object",
  fields: [ls("name", "Tag"), serviceField()],
  preview: { select: { title: "name.en", subtitle: "service" } },
});

export const sparkDecisionOption = defineType({
  name: "sparkDecisionOption",
  title: "Option",
  type: "object",
  fields: [str("key", "Key (A, B, C)", { required: true }), lt("text", "Option"), lt("answer", "Answer for this road")],
  preview: { select: { title: "key", subtitle: "text.en" } },
});

export const sparkDecision = defineType({
  name: "sparkDecision",
  title: "Decision",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    ls("label", "Label"),
    lt("question", "Question"),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [defineArrayMember({ type: "sparkDecisionOption" })],
      validation: (r) => r.length(3),
    }),
    ls("didLabel", "What they did, label (\"What Bó did\")"),
    lt("didTitle", "What they did, heading"),
    defineField({
      name: "didBody",
      title: "What they did, paragraphs",
      description: "\"[n]\" kaynağa dipnot olur.",
      type: "array",
      of: [defineArrayMember({ type: "localeText" })],
    }),
    lt("note", "fspark9 note"),
    defineField({ name: "services", title: "Service tags", type: "array", of: [defineArrayMember({ type: "sparkServiceTag" })] }),
  ],
});

export const sparkChapter = defineType({
  name: "sparkChapter",
  title: "Chapter",
  type: "object",
  fields: [
    str("id", "Anchor id (ch1, ch2...)", { required: true }),
    ls("label", "Label (\"Chapter 3 · Day 037\")"),
    ls("title", "Title"),
    lt("lead", "Lead sentence"),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      description: "\"[n]\" kaynağa dipnot olur.",
      type: "array",
      of: [defineArrayMember({ type: "localeText" })],
    }),
    defineField({ name: "card", title: "Card", type: "sparkStoryCard" }),
    defineField({ name: "decision", title: "Decision (optional)", type: "sparkDecision" }),
  ],
  preview: { select: { title: "title.en", subtitle: "label.en" } },
});

export const sparkFinalOption = defineType({
  name: "sparkFinalOption",
  title: "Final option",
  type: "object",
  fields: [
    lt("text", "Option"),
    serviceField(),
    ls("serviceName", "Service name"),
    ls("heading", "Heading"),
    lt("body", "Line"),
  ],
  preview: { select: { title: "text.en", subtitle: "service" } },
});

export const sparkSource = defineType({
  name: "sparkSource",
  title: "Source",
  type: "object",
  fields: [
    defineField({ name: "n", title: "Number", type: "number", validation: (r) => r.required().integer().positive() }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sparkSourceLink",
          fields: [ls("label", "Label"), defineField({ name: "href", title: "URL", type: "url" })],
          preview: { select: { title: "label.en", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "links.0.label.en", n: "n" }, prepare: ({ title, n }) => ({ title: `${n}. ${title ?? ""}` }) },
});

/** sparkEpisode'un hikâye alanları (sparkEpisode.ts içinde "story" grubunda). */
export const storyFields = [
  defineField({
    name: "hero",
    title: "Opening",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: false },
    fields: [
      ls("label", "Label"),
      lt("title", "Title (H1)"),
      lt("sub", "Sub line"),
      lt("invite", "Invite line"),
      ls("startLabel", "Start button"),
      str("cardDay", "Card day (\"000\")"),
      ls("cardState", "Card state line"),
      str("figure", "Outlined figure instead of the card (\"2394\", optional)"),
      ls("figureLabel", "Line under the figure"),
    ],
  }),
  defineField({
    name: "dayClock",
    title: "Day clock instead of the card (optional)",
    description: "Doluysa yandaki kart yerine nötr gün saati; çubuk her kartın progress alanından.",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [ls("label", "Label (\"Day\")"), ls("ofLabel", "Line under the bar (\"of 2394\")")],
  }),
  defineField({
    name: "chapters",
    title: "Chapters",
    type: "array",
    group: "story",
    of: [defineArrayMember({ type: "sparkChapter" })],
  }),
  defineField({
    name: "interlude",
    title: "Interlude (the card flips here, optional)",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [
      str("afterChapter", "After chapter (id)"),
      lt("text", "Line"),
      defineField({ name: "card", title: "Card", type: "sparkStoryCard" }),
    ],
  }),
  defineField({
    name: "lessons",
    title: "Lessons (last chapter)",
    type: "array",
    group: "story",
    of: [
      defineArrayMember({
        type: "object",
        name: "sparkLesson",
        fields: [ls("heading", "Heading"), lt("body", "Line")],
        preview: { select: { title: "heading.en" } },
      }),
    ],
  }),
  defineField({
    name: "note",
    title: "fspark9 note (optional, after the lessons)",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [
      ls("label", "Label"),
      defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [defineArrayMember({ type: "localeText" })] }),
    ],
  }),
  defineField({
    name: "lastDay",
    title: "Last day line (optional)",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [ls("label", "Label"), lt("text", "Line")],
  }),
  defineField({
    name: "finalQuestion",
    title: "Final question",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [
      ls("label", "Label"),
      lt("title", "Question"),
      lt("lead", "Line under the question (optional)"),
      ls("ctaLabel", "Button"),
      defineField({ name: "options", title: "Options", type: "array", of: [defineArrayMember({ type: "sparkFinalOption" })] }),
    ],
  }),
  defineField({
    name: "next",
    title: "Next episode row (optional)",
    type: "object",
    group: "story",
    options: { collapsible: true, collapsed: true },
    fields: [str("number", "Number (\"Nº 02\")"), ls("name", "Name"), lt("line", "Line")],
  }),
  ls("sourcesLabel", "Sources label", { group: "story" }),
  defineField({
    name: "sources",
    title: "Sources",
    type: "array",
    group: "story",
    of: [defineArrayMember({ type: "sparkSource" })],
  }),
  lt("correctionLine", "Correction line", { group: "story" }),
  ls("closeHeading", "Next step heading", { group: "story" }),
];

export const sparkEpisodeStoryTypes = [
  sparkStoryCard,
  sparkServiceTag,
  sparkDecisionOption,
  sparkDecision,
  sparkChapter,
  sparkFinalOption,
  sparkSource,
];
