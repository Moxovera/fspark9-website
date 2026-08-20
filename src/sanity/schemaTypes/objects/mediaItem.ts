import { defineField, defineType } from "sanity";

export default defineType({
  name: "mediaItem",
  title: "Media item",
  type: "object",
  fields: [
    // Bilerek localeString DEĞİL: yayın/mecra adı iki dilde de aynı yazılıyor
    // ve seed EN değerinden dolduruluyor. Doğal büyük/küçük harfle yazılır
    // ("Fintech Istanbul"); sitede büyük harfe CSS çeviriyor ve alan İngilizce
    // olduğu için o eleman lang="en" ile işaretli (bkz. Media.tsx).
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description:
        "Outlet or format name, written normally (\"Fintech Istanbul\"). Displayed uppercase by the site — do not type it in caps.",
    }),
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "note", title: "Note", type: "localeString" }),
    defineField({ name: "href", title: "Href", type: "string" }),
    defineField({ name: "isVideo", title: "Is video", type: "boolean" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "headline.en", subtitle: "source" },
  },
});
