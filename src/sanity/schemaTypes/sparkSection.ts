import { defineField, defineType } from "sanity";

// /spark ve /tr/spark'ın kendisi — hub. Kasıtlı olarak dar: kısa bir
// hero (eyebrow/title/purpose line) + format vitrini. Format listesi
// burada SAKLANMAZ, sparkFormat koleksiyonundan sorgulanır (bkz.
// queries.ts). Ribbon (episodes/days counted/markets toplamı) BİLEREK
// yok — tek formatla, format satırındaki envanterin tekrarından
// ibaretti, kullanıcı geri bildirimiyle kaldırıldı.
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
  ],
});
