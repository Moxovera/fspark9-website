import { defineArrayMember, defineField, defineType } from "sanity";
import { figureList, group, ls, lsList, lt, singletonTitle, str, titleTextList, portraitField } from "./fields";

// Ana sayfa. Dört hizmet servicePage belgelerinden, Spark kartları
// bölümlerden (sparkEpisode) geliyor; burada sadece bölüm metinleri.

export default defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "opening", title: "Opening", default: true },
    { name: "start", title: "01 Start where you are" },
    { name: "services", title: "02 Four services" },
    { name: "work", title: "03 Work" },
    { name: "withMe", title: "04 With me" },
    { name: "spark", title: "Spark" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    singletonTitle("Home"),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    group(
      "opening",
      "Opening",
      [
        lsList("eyebrowParts", "Eyebrow parts", { description: "Mobilde sadece ilki ve sonuncusu görünür." }),
        lsList("headlineSentences", "Headline, one sentence per line"),
        ls("cutWord", "Flare cut (end of the last sentence)"),
        lt("intro", "Intro"),
        ls("ctaLabel", "Button"),
        ls("secondaryLinkLabel", "Second link"),
        ls("portraitAlt", "Portrait alt text"),
        portraitField,
        lt("heroTextMobile", "Intro, phone only", { description: "Telefonda Intro yerine bu kısa metin görünür. Boşsa Intro." }),
        defineField({
          name: "showProof",
          title: "Show the proof line",
          type: "boolean",
          description: "Butonların altındaki üç rakamlık satır.",
          initialValue: true,
        }),
        str("bankCount", "Proof: banks built (number)"),
        ls("bankCountLabel", "Proof: banks built label"),
        defineField({
          name: "proofCase",
          title: "Proof: case for users and time to live",
          type: "reference",
          to: [{ type: "caseStudy" }],
          description: "Satırdaki ikinci ve üçüncü rakam bu vakanın Figures listesinin ikinci ve üçüncü rakamı.",
        }),
        ls("proofUsersLabel", "Proof: users label"),
        ls("proofLiveLabel", "Proof: time to live label"),
      ],
      { group: "opening" },
    ),
    group(
      "heroVideo",
      "Hero video",
      [
        str("youtubeIdTr", "YouTube ID (Turkish film)", {
          description: "Sadece kimlik, ör. youtube.com/watch?v=XXXXXXXXXXX adresindeki XXXXXXXXXXX. Boşsa TR sayfada video düğmesi ve önizleme görünmez.",
        }),
        str("youtubeIdEn", "YouTube ID (English film)", {
          description: "Sadece kimlik. Boşsa EN sayfada video düğmesi ve önizleme görünmez.",
        }),
        str("durationLabel", "Duration", { description: "Düğmedeki süre, ör. 1:30. Film değişirse bu da değişir." }),
        ls("buttonLabel", "Button"),
        ls("ariaLabel", "Button label for screen readers", { description: "Süreyi yazıyla içerir, ör. 1 dakika 30 saniye." }),
        ls("title", "Window title"),
        ls("caption", "Preview caption", { description: "Sessiz önizlemede görünen satır: önizlemenin 4 saniyesinde Burak'ın gerçekten söylediği kelimeler." }),
        ls("closeLabel", "Close button"),
      ],
      { group: "opening", description: "Açılıştaki tanıtım filmi. Önizleme klipleri repoda (public/video), burada değil." },
    ),
    group(
      "startWhereYouAre",
      "Start where you are",
      [ls("label", "Label"), ls("heading", "Heading"), lt("text", "Text"), titleTextList("items", "Cards")],
      { group: "start" },
    ),
    group("fourServices", "Four services", [ls("label", "Label"), ls("heading", "Heading"), lt("intro", "Intro")], {
      group: "services",
      description: "Hizmet satırları Services belgelerinden, sıralarına göre.",
    }),
    group(
      "servicesVideo",
      "Services video",
      [
        str("youtubeIdTr", "YouTube ID (Turkish video)", {
          description: "Sadece kimlik, ör. youtube.com/watch?v=XXXXXXXXXXX ya da youtube.com/shorts/XXXXXXXXXXX adresindeki XXXXXXXXXXX. Boşsa TR sayfada halkanın ortası boş kalır.",
        }),
        str("youtubeIdEn", "YouTube ID (English video)", {
          description: "Sadece kimlik. Boşsa EN sayfada halkanın ortası boş kalır.",
        }),
        str("durationLabel", "Duration", { description: "Düğmedeki ve penceredeki süre, ör. 0:30. Video değişirse bu da değişir." }),
        ls("buttonLabel", "Button"),
        ls("ariaLabel", "Button label for screen readers", { description: "Süreyi içerir, ör. Hizmetler videosunu izle, 30 saniye." }),
        ls("title", "Window title", { description: "Bölüm başlığıyla aynı." }),
      ],
      {
        group: "services",
        description: "Four services halkasının ortasındaki dikey (4:5) video. Önizleme klibi ve poster repoda (public/video), burada değil.",
      },
    ),
    group(
      "work",
      "Work",
      [
        ls("label", "Label"),
        ls("heading", "Heading"),
        ls("allLinkLabel", "All cases link"),
        group("featured", "Featured case", [
          defineField({ name: "caseStudy", title: "Case", type: "reference", to: [{ type: "caseStudy" }] }),
          ls("label", "Label"),
          ls("heading", "Heading"),
          lt("text", "Text"),
          figureList("figures", "Figures", { exactly: 3 }),
          ls("linkLabel", "Link"),
        ]),
        defineField({
          name: "rows",
          title: "Other cases",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "caseRow",
              fields: [
                defineField({ name: "caseStudy", title: "Case", type: "reference", to: [{ type: "caseStudy" }] }),
                lt("line", "Line"),
                ls("tags", "Tags"),
              ],
              preview: { select: { title: "caseStudy.name.en", subtitle: "line.en" } },
            }),
          ],
        }),
        ls("alsoLabel", "Also label"),
        titleTextList("also", "Also (name and line)"),
      ],
      { group: "work" },
    ),
    group(
      "withMe",
      "What you get with me",
      [
        ls("label", "Label"),
        ls("heading", "Heading"),
        lt("text", "Text"),
        titleTextList("points", "Points"),
        ls("portraitAlt", "Portrait alt text"),
        portraitField,
      ],
      { group: "withMe" },
    ),
    group("spark", "Spark", [ls("cardLinkLabel", "Card link (published episode)")], {
      group: "spark",
      description: "Kartlar Spark bölümlerinden (yayında ve sıradaki) otomatik geliyor.",
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
