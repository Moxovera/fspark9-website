import { defineField, defineType } from "sanity";

// Spark formatları/bölümleri EN ve TR'de farklı slug'lar kullanıyor
// (ör. /spark/the-last-day vs /tr/spark/son-gun) — localeString'in
// slug karşılığı. source ayarlanmadı, slug'lar elle girilecek (title
// henüz localized değilken otomatik üretim yanıltıcı olurdu).
export default defineType({
  name: "localeSlug",
  title: "Localized slug",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "slug", validation: (r) => r.required() }),
    defineField({ name: "tr", title: "Turkish", type: "slug", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "en.current" },
  },
});
