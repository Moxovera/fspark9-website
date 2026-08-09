import { defineField, defineType } from "sanity";

// content.ts: ServicesPage — sadece hero. Satır/panel içeriği
// (ServicesSection) homePage.services'ten AYNEN yeniden kullanılıyor,
// burada tekrarlanmıyor.
export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Services Page",
      readOnly: true,
    }),
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
  ],
});
