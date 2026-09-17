import { defineField, defineType } from "sanity";

// Revizyon v2: lastDayFormat'ın yerini aldı — isim "spark" olarak
// genelleştirildi çünkü format 02 (ve sonrakiler) "The Last Day"
// hakkında olmayacak, format'a özel bir isim artık yanlış olurdu.
// Hub satırının içeriği burada: name/subjectLine/whatIsInside hub'daki
// satırın kendisini besliyor. Status satırı SAYISI burada YOK —
// yayınlanmış sparkEpisode sayısından hesaplanıyor (bkz. FormatRow.tsx),
// sadece statusLineSingular/Plural kelimeleri burada. Format 02 BİLEREK
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
      name: "statusLineSingular",
      title: "Status line word, singular (e.g. \"episode published.\")",
      description:
        "Yayınlanmış bölüm SAYISI ile birleştirilir (sayı elle yazılmaz, yayınlanmış sparkEpisode " +
        "dokümanlarından sayılır): \"1 \" + bu alan = \"1 episode published.\" Henüz taahhüt " +
        "edilmemiş bir tarih YOK.",
      type: "localeString",
    }),
    defineField({
      name: "statusLinePlural",
      title: "Status line word, plural (e.g. \"episodes published.\")",
      description: "Sayı 1'den farklıyken kullanılır: \"3 \" + bu alan = \"3 episodes published.\"",
      type: "localeString",
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
