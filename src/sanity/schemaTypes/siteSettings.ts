import { defineArrayMember, defineField, defineType } from "sanity";
import { group, ls, lsList, str } from "./fields";

// Site çerçevesi: header, Services menüsü, footer, randevu penceresi,
// yasal sayfa sekmeleri ve her sayfanın sonundaki "Next step" bloğu.
// Dört hizmetin adı ve satırı servicePage belgelerinden geliyor.

const PATHS = ["/work", "/about", "/spark", "/impressum", "/privacy", "/cookies", "/terms"];

const navLink = defineArrayMember({
  type: "object",
  name: "navLink",
  fields: [ls("label", "Label"), defineField({ name: "href", title: "Page", type: "string", options: { list: PATHS } })],
  preview: { select: { title: "label.en", subtitle: "href" } },
});

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
    { name: "booking", title: "Booking" },
    { name: "nextStep", title: "Next step" },
    { name: "legal", title: "Legal tabs" },
    { name: "seo", title: "SEO and logo" },
  ],
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", initialValue: "Site settings", readOnly: true, hidden: true }),
    defineField({ name: "seo", title: "Default SEO and OG image", type: "seo", group: "seo" }),
    defineField({
      name: "logo",
      title: "Logo (structured data)",
      description: "Google'ın arama sonucunda gösterdiği logo. Kare PNG.",
      type: "image",
      group: "seo",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    str("brandName", "Brand name (screen readers)", { group: "header" }),
    ls("homeLabel", "Logo link label (screen readers)", { group: "header" }),
    ls("servicesLabel", "Services menu button", { group: "header" }),
    defineField({ name: "nav", title: "Links after Services", type: "array", of: [navLink], group: "header" }),
    group("servicesMenu", "Services menu panel", [ls("label", "Label"), ls("heading", "Heading")], { group: "header" }),
    ls("bookLabel", "Book button", { group: "header" }),
    ls("menuLabel", "Mobile menu name (screen readers)", { group: "header" }),
    ls("menuOpenLabel", "Open menu (screen readers)", { group: "header" }),
    ls("menuCloseLabel", "Close menu (screen readers)", { group: "header" }),
    group(
      "footer",
      "Footer",
      [
        str("email", "Email"),
        str("linkedinHref", "LinkedIn URL"),
        str("linkedinLabel", "LinkedIn label"),
        defineField({ name: "legalLinks", title: "Legal links", type: "array", of: [navLink] }),
        str("copyright", "Copyright"),
      ],
      { group: "footer" },
    ),
    group(
      "booking",
      "Booking window",
      [
        str("calLink", "Cal.com link (user/event)"),
        ls("title", "Title"),
        ls("meta", "Meta line"),
        ls("closeLabel", "Close button"),
        ls("poweredBy", "Scheduling note"),
      ],
      { group: "booking" },
    ),
    group(
      "nextStep",
      "Next step block",
      [
        ls("label", "Label (subpages)"),
        ls("homeLabel", "Label (home, numbered)"),
        ls("headlineLead", "Headline"),
        ls("headlineCut", "Headline end (Flare cut)"),
        lsList("steps", "Steps"),
        ls("ctaLabel", "Button"),
      ],
      { group: "nextStep" },
    ),
    group(
      "legal",
      "Legal pages",
      [
        ls("backLabel", "Back link"),
        ls("tabsLabel", "Tabs name (screen readers)"),
        defineField({ name: "tabs", title: "Tabs", type: "array", of: [navLink] }),
      ],
      { group: "legal" },
    ),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
