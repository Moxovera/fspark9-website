import { defineField, defineType } from "sanity";

// Layer 1: name/slug/description (format kartı). Layer 2: hero (kısa
// tek satır — "burada kapanan şirketleri bulacaksın" türünden, ayrıntılı
// mekanizma açıklaması ya da corrections paneli YOK, kullanıcı geri
// bildirimi sonrası kaldırıldı). Bölümlerin kendi içeriği artık serbest
// biçimli (bkz. lastDayEpisode.body / localeBody) — burada sadece
// bölüm listesinin "156 days" etiketi ve saatin "DAY" öneki için
// kelime dağarcığı kalıyor.
export default defineType({
  name: "lastDayFormat",
  title: "Last Day Format",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "description",
      title: "One-line description (for the format card)",
      type: "localeText",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "hero",
      title: "Hero",
      description:
        "eyebrow \"Spark\", title = name, intro = TEK kısa cümle (\"you'll find companies that closed\" türünden — uzun standfirst, how-it-works ya da corrections YOK).",
      type: "pageHero",
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
      description: "Bölüm sayfasındaki büyük saatin öneki.",
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
