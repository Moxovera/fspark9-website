import { defineArrayMember, defineField, type FieldDefinition } from "sanity";

// Şema yazımını kısaltan yardımcılar. Her metin alanı iki dilli
// (localeString tek satır, localeText paragraf); başlıklar Studio'da
// görünen adlar.

type Extra = Partial<Pick<FieldDefinition, "description" | "group" | "fieldset" | "hidden">> & {
  required?: boolean;
};

function base(extra?: Extra) {
  const { required, ...rest } = extra ?? {};
  return { ...rest, ...(required ? { validation: (r: { required: () => unknown }) => r.required() } : {}) };
}

export const ls = (name: string, title: string, extra?: Extra) =>
  defineField({ name, title, type: "localeString", ...base(extra) } as FieldDefinition);

export const lt = (name: string, title: string, extra?: Extra) =>
  defineField({ name, title, type: "localeText", ...base(extra) } as FieldDefinition);

export const str = (name: string, title: string, extra?: Extra) =>
  defineField({ name, title, type: "string", ...base(extra) } as FieldDefinition);

/** Sıralı iki dilli satırlar (ör. başlığın her cümlesi ayrı satır). */
export const lsList = (name: string, title: string, extra?: Extra) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "localeString" })], ...base(extra) } as FieldDefinition);

export const group = (name: string, title: string, fields: FieldDefinition[], extra?: Extra) =>
  defineField({ name, title, type: "object", options: { collapsible: true, collapsed: false }, fields, ...base(extra) } as FieldDefinition);

/** Başlık + metin çiftleri (ör. "Start where you are" kartları). */
export const titleTextList = (name: string, title: string, extra?: Extra) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "titleText",
        fields: [ls("title", "Title"), lt("text", "Text")],
        preview: { select: { title: "title.en", subtitle: "text.en" } },
      }),
    ],
    ...base(extra),
  } as FieldDefinition);

/** Rakam + etiket (ör. "40,000+" · "users in Germany"). Rakam da iki dilli ("40.000+", "6 ay"). */
export const figureFields = [ls("value", "Value"), ls("label", "Label")];

export const figureList = (name: string, title: string, extra?: Extra & { exactly?: number }) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "figure",
        fields: figureFields,
        preview: { select: { title: "value.en", subtitle: "label.en" } },
      }),
    ],
    ...base(extra),
    ...(extra?.exactly ? { validation: (r: { length: (n: number) => unknown }) => r.length(extra.exactly!) } : {}),
  } as FieldDefinition);

/** Dilim listesi 1..8. Dokuzuncu dilim her zaman yanık, saklanmaz. */
export const slicesField = (name = "slices", title = "Slices (1 to 8)") =>
  defineField({
    name,
    title,
    description: "Halkada yanan dilimler. Dokuzuncu dilim (canlıya çıkış) her zaman yanık, buraya yazılmaz.",
    type: "array",
    of: [defineArrayMember({ type: "number" })],
    validation: (r) =>
      r.custom((value: number[] | undefined) => {
        if (!value) return true;
        if (value.some((n) => !Number.isInteger(n) || n < 1 || n > 8)) return "Her dilim 1 ile 8 arasında bir tam sayı olmalı.";
        if (new Set(value).size !== value.length) return "Aynı dilim iki kez yazılmış.";
        return true;
      }),
  });

/** Belge içinde tekil bir slug (caseStudy, servicePage). */
export const uniqueSlug = (type: string) =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "string",
    validation: (Rule) =>
      Rule.required().custom(async (slug, context) => {
        if (!slug) return true;
        const { document, getClient } = context;
        const client = getClient({ apiVersion: "2024-01-01" });
        const id = document?._id.replace(/^drafts\./, "") ?? "";
        const isUnique = await client.fetch(
          `!defined(*[!(_id in [$draft, $published]) && _type == $type && slug == $slug][0]._id)`,
          { draft: `drafts.${id}`, published: id, slug, type },
        );
        return isUnique || "Bu slug başka bir dokümanda zaten kullanılıyor.";
      }),
  });

export const singletonTitle = (title: string) =>
  defineField({ name: "title", title: "Internal title", type: "string", initialValue: title, readOnly: true, hidden: true });

/** Portre. Boşsa sitedeki siyah beyaz portre (public/assets/portrait.jpg) kullanılır. */
export const portraitField = defineField({
  name: "portrait",
  title: "Portrait (optional)",
  description: "Boşsa sitedeki siyah beyaz portre kullanılır. Siyah beyaza site çeviriyor.",
  type: "image",
  options: { hotspot: true },
});
