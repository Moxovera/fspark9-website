import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";
import { ls, lt, str } from "./fields";

// Son Gün Nº 02 (Nuri, prototip _design/v2/boards/son-gun-02-nuri-v2.html):
// hikâye yerine karar blokları. Bu alanlar sparkEpisode'da "Decisions"
// sekmesinde, sadece layout "decisions" iken görünür. Diziler iki dilde
// ortak (blok sırası dilden bağımsız), metin alanları {en, tr}.

const SERVICES = [
  { title: "Zero to Live", value: "zero-to-live" },
  { title: "Product & Strategy", value: "product-strategy" },
  { title: "Embedded Finance", value: "embedded-finance" },
  { title: "Expansion & GTM", value: "expansion-gtm" },
];

const date = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "date", ...(description ? { description } : {}), validation: (r) => r.required() });

const paragraphs = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "localeText" })] });

const sourcesField = defineField({
  name: "sources",
  title: "Sources",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "sparkBlockSource",
      fields: [ls("label", "Label"), defineField({ name: "href", title: "URL", type: "url" })],
      preview: { select: { title: "label.en", subtitle: "href" } },
    }),
  ],
});

const optionsField = (count: number) =>
  defineField({
    name: "options",
    title: "Options",
    type: "array",
    of: [defineArrayMember({ type: "sparkChoiceOption" })],
    validation: (r) => r.length(count),
  });

/** Saatin izlediği blokların ortak alanları: tarih (ilerleme), saatteki yazı, üst satır. */
const clockFields = [
  date("date", "Date (clock progress)"),
  ls("when", "Date text (top row and clock)"),
];

export const sparkChoiceOption = defineType({
  name: "sparkChoiceOption",
  title: "Option",
  type: "object",
  fields: [str("key", "Key (A, B, C, D)", { required: true }), lt("text", "Option")],
  preview: { select: { title: "key", subtitle: "text.en" } },
});

export const sparkRulerTick = defineType({
  name: "sparkRulerTick",
  title: "Tick",
  type: "object",
  fields: [
    date("date", "Date"),
    ls("label", "Label (\"Jan 2018\"), empty: faint tick without text"),
    ls("caption", "Line under the label"),
  ],
  preview: { select: { title: "date", subtitle: "label.en" } },
});

export const sparkChoiceDecision = defineType({
  name: "sparkChoiceDecision",
  title: "Decision",
  type: "object",
  fields: [
    ...clockFields,
    ls("label", "Label (\"Decision 1\")"),
    ls("title", "Heading"),
    paragraphs("paragraphs", "Paragraphs"),
    optionsField(3),
    str("record", "What they chose (A, B, C)", { required: true }),
    paragraphs("reveal", "What really happened, paragraphs"),
    sourcesField,
  ],
  preview: { select: { title: "title.en", subtitle: "label.en" } },
});

export const sparkRecordBlock = defineType({
  name: "sparkRecordBlock",
  title: "Record",
  type: "object",
  fields: [...clockFields, ls("label", "Label (\"The countdown\")"), paragraphs("paragraphs", "Paragraphs"), sourcesField],
  preview: { select: { title: "label.en", subtitle: "when.en" } },
});

/** sparkEpisode'un karar bloğu alanları (layout "decisions"). */
export const decisionFields: FieldDefinition[] = [
  defineField({
    name: "opening",
    title: "Opening",
    type: "object",
    options: { collapsible: true, collapsed: false },
    fields: [
      ls("label", "Label (\"The Last Day · Nº 02\")"),
      ls("meta", "Meta line"),
      str("figure", "Big outline figure (\"7\")"),
      ls("figureLabel", "Label under the figure"),
    ],
  }),
  defineField({
    name: "ruler",
    title: "Ruler",
    type: "object",
    description: "Çizgi ilk izden son ize uzanır; son iz kapanış (Flare).",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "ticks", title: "Ticks", type: "array", of: [defineArrayMember({ type: "sparkRulerTick" })] }),
      lt("after", "Note under the line"),
    ],
  }),
  lt("standfirst", "Standfirst"),
  ls("provenance", "Provenance line"),
  defineField({
    name: "clock",
    title: "Clock",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      ls("rangeLabel", "Range text (\"2015 to 2023\")"),
      date("start", "Progress start"),
      date("end", "Progress end"),
    ],
  }),
  lt("intro", "Intro paragraph"),
  defineField({
    name: "labels",
    title: "Labels",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      ls("ask", "Prompt (\"What do you do?\")"),
      ls("skip", "Show without choosing"),
      ls("match", "Result when the choice matches"),
      ls("noMatch", "Result when it does not"),
      ls("revealLabel", "What really happened, label"),
      ls("sourcesLabel", "Sources label"),
    ],
  }),
  defineField({ name: "decisions", title: "Decisions", type: "array", of: [defineArrayMember({ type: "sparkChoiceDecision" })] }),
  defineField({ name: "records", title: "Records", type: "array", of: [defineArrayMember({ type: "sparkRecordBlock" })] }),
  defineField({
    name: "twist",
    title: "Twist and reader question",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      ...clockFields,
      ls("label", "Label"),
      paragraphs("paragraphs", "Paragraphs"),
      lt("question", "Question"),
      optionsField(4),
      str("freeKey", "Option that opens the text field (D)"),
      ls("freeLabel", "Text field label"),
      ls("freePlaceholder", "Text field placeholder"),
      ls("counterTemplate", "Word counter (\"{n} / 250 words\")"),
      ls("emailLabel", "Email label"),
      ls("submitLabel", "Send button"),
      ls("sendingLabel", "Send button while sending"),
      ls("privacyLine", "Privacy line"),
      ls("thanks", "Thanks line"),
      ls("tooLong", "Too long"),
      ls("emptyText", "Empty text"),
      ls("error", "Error"),
      ls("sourceLabel", "Source button"),
      defineField({ name: "sourceHref", title: "Source URL", type: "url" }),
    ],
  }),
  defineField({
    name: "view",
    title: "Our view",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [...clockFields, ls("label", "Label"), paragraphs("paragraphs", "Paragraphs")],
  }),
  defineField({
    name: "service",
    title: "Service block",
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      ls("label", "Label"),
      ls("heading", "Heading"),
      lt("body", "Paragraph"),
      ls("ctaLabel", "Button"),
      defineField({ name: "service", title: "Service page", type: "string", options: { list: SERVICES } }),
    ],
  }),
];

export const sparkEpisodeDecisionTypes = [sparkChoiceOption, sparkRulerTick, sparkChoiceDecision, sparkRecordBlock];
