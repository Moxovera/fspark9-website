import { defineField, defineType } from "sanity";

// /spark ve /tr/spark'ın kendisi — Layer 1 (Spark bölüm sayfası).
// Kasıtlı olarak dar: kullanıcı geri bildirimi sonrası (bkz. commit
// mesajı/handback) sayfa sadece kısa bir hero + format vitrini. Format
// listesi burada SAKLANMAZ, lastDayFormat koleksiyonundan sorgulanır
// (bkz. queries.ts). Mekanizma açıklaması (pillars) ve bölüm teaser'ı
// BİLEREK kaldırıldı — ana sayfa artık bölüm içeriğini göstermiyor,
// sadece format adlarını gösterip tıklatıyor.
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
        "eyebrow \"fspark9\", title \"Spark\", intro = tek cümlelik vaat (uzun standfirst DEĞİL).",
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
