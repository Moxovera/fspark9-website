import { defineField, defineType } from "sanity";

// Revizyon v2: lastDayFormat'ın yerini aldı — isim "spark" olarak
// genelleştirildi çünkü format 02 (ve sonrakiler) "The Last Day"
// hakkında olmayacak, format'a özel bir isim artık yanlış olurdu.
// Hub satırının içeriği burada: name/subjectLine/whatIsInside/
// statusLine hub'daki satırın kendisini besliyor. Format 02 BİLEREK
// bir doküman DEĞİL — mevcut sabit "coming soon" UI'ı olduğu gibi
// kalıyor, kendi kararı ayrı gelene kadar.
export default defineType({
  name: "sparkFormat",
  title: "Spark Format",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number (01, 02...)",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "subjectLine",
      title: "Subject line (hub row)",
      type: "localeText",
    }),
    defineField({
      name: "whatIsInside",
      title: "What is inside (hub row)",
      type: "localeText",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["live", "preparing"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusLine",
      title: "Status line (e.g. \"1 episode published.\")",
      description: "Elle yazılır, bir sayı ve bir cümle dışında bir şey taşımaz. Henüz taahhüt edilmemiş bir tarih YOK.",
      type: "localeText",
    }),
    defineField({
      name: "orderRank",
      title: "Order rank (hub sıralaması)",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero (list page)",
      description: "eyebrow \"Spark\", title = name, intro = list page'in purpose line'ı.",
      type: "pageHero",
    }),
    defineField({
      name: "hookLabel",
      title: "\"Read the record\" link label",
      type: "localeString",
    }),
    defineField({
      name: "dayCountSingular",
      title: "Day count word (singular, e.g. \"day\")",
      type: "localeString",
    }),
    defineField({
      name: "dayCountPlural",
      title: "Day count word (plural, e.g. \"days\")",
      type: "localeString",
    }),
    defineField({
      name: "dayLabel",
      title: "Day label (mono, e.g. \"DAY\")",
      type: "localeString",
    }),
    defineField({
      name: "dayNotEstablishedLabel",
      title: "\"Not established\" label (gün sayısı hesaplanamadığında)",
      type: "localeString",
    }),
    defineField({
      name: "noteLabel",
      title: "fspark9 Note label (e.g. \"fspark9 · Note\")",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "name.en" },
  },
});
