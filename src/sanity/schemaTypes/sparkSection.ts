import { defineField, defineType } from "sanity";
import { group, ls, lsList, singletonTitle, str } from "./fields";

// Spark hub ve her bölüm sayfasının ortak etiketleri. Formatlar ve
// bölümler kendi belgelerinde.

export default defineType({
  name: "sparkSection",
  title: "Spark",
  type: "document",
  groups: [
    { name: "hub", title: "Hub", default: true },
    { name: "film", title: "Film" },
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
      "sparkFilm",
      "Spark film",
      [
        str("youtubeIdTr", "YouTube ID (Turkish film)", {
          description: "Sadece kimlik, ör. youtube.com/watch?v=XXXXXXXXXXX ya da youtube.com/shorts/XXXXXXXXXXX adresindeki XXXXXXXXXXX. Boşsa TR sayfada Spark açılışında film kartı ve ana sayfada \"Spark nedir? İzleyin\" düğmesi görünmez.",
        }),
        str("youtubeIdEn", "YouTube ID (English film)", {
          description: "Sadece kimlik. Boşsa EN sayfada film kartı ve ana sayfadaki düğme görünmez.",
        }),
        str("durationLabel", "Duration", { description: "Kartta ve pencerede süre, ör. 0:28. Film değişirse bu da değişir." }),
        ls("buttonLabel", "Card button", { description: "Kartta oynat düğmesinin etiketi." }),
        ls("ariaLabel", "Card label for screen readers", { description: "Süreyi içerir, ör. Spark filmini izle, 28 saniye." }),
        ls("modalTitle", "Window title", { description: "Sayfanın alt başlığıyla aynı." }),
        ls("homeButtonLabel", "Home page button", { description: "Ana sayfadaki Spark bölümünün düğmesi: Spark nedir? İzleyin." }),
        ls("closeLabel", "Close button"),
      ],
      {
        group: "film",
        description: "Spark tanıtım filmi (dikey, 4:5): Spark sayfasının açılışında film kartı, ana sayfada Spark bölümünde düğme. Önizleme klibi ve poster repoda (public/video), burada değil.",
      },
    ),
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
