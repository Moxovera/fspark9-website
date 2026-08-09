import { defineField, defineType } from "sanity";

// content.ts: ClosingCta — Home'un kendi kapanışı, alıntı taşır.
// subpageCta ile KARIŞTIRILMAMALI — o, alt sayfaların paylaştığı daha
// dar, alıntısız bir tip, SiteSettings altında tek kaynak olarak
// kalıyor.
export default defineType({
  name: "closingCta",
  title: "Closing CTA",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "localeText" }),
    defineField({ name: "quoteAttribution", title: "Quote attribution", type: "localeString" }),
    defineField({ name: "headline", title: "Headline", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
    defineField({ name: "note", title: "Note", type: "localeText" }),
  ],
});
