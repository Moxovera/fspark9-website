import { defineField, defineType } from "sanity";

// /spark ve /tr/spark'ın kendisi — hub. Kasıtlı olarak dar: kısa bir
// hero (eyebrow/title/purpose line) + canlı ribbon rakamları + format
// vitrini. Format listesi burada SAKLANMAZ, sparkFormat koleksiyonundan
// sorgulanır (bkz. queries.ts). Ribbon etiketleri (episodes/days
// counted/markets) burada — rakamların KENDİSİ hiçbir zaman burada
// saklanmıyor, her zaman yayınlanmış bölümlerden hesaplanıyor.
export default defineType({
  name: "sparkSection",
  title: "Spark Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Spark Section",
      readOnly: true,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero",
      description:
        "eyebrow \"fspark9\", title \"Spark\", intro = purpose line (tek cümle, uzun standfirst DEĞİL).",
      type: "pageHero",
    }),
    defineField({
      name: "homeLinkLabel",
      title: "Homepage module link label (e.g. \"Explore Spark\")",
      type: "localeString",
    }),
    defineField({
      name: "comingSoonLabel",
      title: "Coming soon label (e.g. \"Coming Soon\")",
      description: "Format listesindeki son, tıklanamaz yer tutucu kartın etiketi.",
      type: "localeString",
    }),
    defineField({
      name: "episodesRibbonLabel",
      title: "Ribbon label — episodes (e.g. \"episodes\")",
      type: "localeString",
    }),
    defineField({
      name: "daysRibbonLabel",
      title: "Ribbon label — days counted (e.g. \"days counted\")",
      type: "localeString",
    }),
    defineField({
      name: "marketsRibbonLabel",
      title: "Ribbon label — markets (e.g. \"markets\")",
      type: "localeString",
    }),
  ],
});
