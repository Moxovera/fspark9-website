import { defineField, defineType } from "sanity";
import { group, ls, lsList, singletonTitle } from "./fields";

// Spark hub ve her bölüm sayfasının ortak etiketleri. Formatlar ve
// bölümler kendi belgelerinde.

export default defineType({
  name: "sparkSection",
  title: "Spark",
  type: "document",
  groups: [
    { name: "hub", title: "Hub", default: true },
    { name: "episode", title: "Episode page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    singletonTitle("Spark"),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ls("bigWord", "Big word", { group: "hub" }),
    ls("heading", "Heading", { group: "hub" }),
    lsList("tickerItems", "Ticker items", { group: "hub" }),
    ls("tickerTail", "Ticker last item", { group: "hub" }),
    ls("formatsLabel", "Formats label", { group: "hub" }),
    ls("readLabel", "Read link", { group: "hub" }),
    ls("backLabel", "Back link (to home)", { group: "hub" }),
    ls("sparkLabel", "Spark link (format and episode pages)", { group: "hub" }),
    ls("launchDateLabel", "Date placeholder", {
      group: "hub",
      description: "Bir bölümün yayın tarihi (publishedAt) boşsa bu yazı görünür.",
    }),
    group(
      "episode",
      "Episode page labels",
      [
        ls("yourPickTemplate", "Your pick ({key})"),
        ls("roadTemplate", "Other road ({key})"),
        ls("otherRoadsLabel", "Show the other roads"),
        ls("noteLabel", "fspark9 note label"),
        ls("dayTemplate", "Day in the thin bar ({n})"),
        ls("nextTemplate", "Next episode ({name})"),
        ls("footnoteTemplate", "Footnote link name ({n})"),
        ls("sourceJoiner", "Between two links in one source"),
      ],
      { group: "episode" },
    ),
  ],
  preview: { prepare: () => ({ title: "Spark" }) },
});
