import finmidJson from "./radar/finmid.json";
import { toRadarEpisode } from "../lib/radar";
import type {
  Locale,
  RadarEpisodeLabels,
  RadarFile,
  RadarFormatCopy,
  SparkRadarEpisode,
} from "../types/content";

/**
 * On the Radar (Spark format 03). Format sayfasının ve bölüm şablonunun
 * sabit metni (Sanity'de yok, düzenlenmesi gereken içerik değil) ve
 * bölümlerin aynası. Format sayfası metni prototipten
 * (Spark/Radar-format/on-the-radar-format.html, `UI.tr` ve `UI.en`),
 * bölüm etiketleri bölüm prototipinden (radar-finmid.html) kelimesi
 * kelimesine. Formatın kendi alanları (ad, konu cümlesi, SEO) src/content/spark.ts'te.
 */

export const radarFormatCopy: Record<Locale, RadarFormatCopy> = {
  en: {
    kicker: "Spark · Format 03",
    latest: "Latest issue",
    readLong: "Read the analysis",
    readShort: "Read",
    all: "All issues",
    countOne: "{n} issue",
    countMany: "{n} issues",
    filter: "Strongest signal",
    filterAll: "All",
    strongest: "Strongest",
    added: "On the radar since",
    showAll: "Show all",
    about: "About this format",
    howTitle: "How to read an issue",
    aboutLines: [
      "Every issue rebuilds one company on a nine box canvas.",
      "You guess, pull the keystone and pick the weak spot.",
      "Every figure points to a source.",
    ],
    steps: [
      { title: "Guess", body: "You go first: where does this company make its money?" },
      { title: "How it works", body: "You follow one deal step by step: who sends money, data and offers to whom." },
      { title: "Canvas", body: "Nine boxes fill as you read. Dark boxes are where the company is strongest." },
      { title: "Keystone", body: "The moves are stacked like bricks. Pull one and see which boxes of the model fall empty." },
      { title: "Weak spot", body: "You pick one of three fragile points. Then we ask our questions." },
      { title: "Radar", body: "At the end five signals draw the company’s shape. No two shapes are the same." },
    ],
    fiveLabel: "Five signals",
    five: [
      { name: "Revenue", body: "Where the money comes from and how solid it is." },
      { name: "Product", body: "How clear the promise to the customer is." },
      { name: "Distribution", body: "How customers are reached and kept." },
      { name: "People", body: "The team, the licence and the scarce resources they hold." },
      { name: "Technology", body: "The infrastructure and the partners they build it with." },
    ],
    signals: { gelir: "REVENUE", urun: "PRODUCT", dagitim: "DISTRIBUTION", insan: "PEOPLE", teknoloji: "TECHNOLOGY" },
    signalsLower: { gelir: "Revenue", urun: "Product", dagitim: "Distribution", insan: "People", teknoloji: "Technology" },
    next: "Next step",
    closeTitle: "Which box is dark in your model?",
    closeLine: "Let’s fill in the canvas together and find the strong box and the missing one.",
    cta: "Book a call",
    disclaimer: "On the Radar is a first look at well built business models through fspark9's eyes. It is not investment advice.",
    radarLabel: "Radar",
  },
  tr: {
    kicker: "Spark · Format 03",
    latest: "Son sayı",
    readLong: "Analizi okuyun",
    readShort: "Okuyun",
    all: "Tüm sayılar",
    countOne: "{n} sayı",
    countMany: "{n} sayı",
    filter: "En güçlü sinyal",
    filterAll: "Hepsi",
    strongest: "En güçlü",
    added: "Radara girdi",
    showAll: "Tümünü göster",
    about: "Bu format hakkında",
    howTitle: "Bir sayı nasıl okunur?",
    aboutLines: [
      "Her sayıda bir şirketi dokuz kutulu tuvalde yeniden kuruyoruz.",
      "Tahmin, taşıyıcı taş ve zayıf halka seçimiyle okur da masada.",
      "Her rakam bir kaynağa dayanıyor.",
    ],
    steps: [
      { title: "Tahmin", body: "Önce sen söylüyorsun: bu şirket parayı nereden kazanıyor?" },
      { title: "Nasıl çalışıyor", body: "Tek bir işlemi adım adım izliyorsun: para, veri ve teklif kimden kime gidiyor." },
      { title: "Tuval", body: "Okudukça dokuz kutu doluyor. Koyu kutular şirketin gücünün toplandığı yerler." },
      { title: "Taşıyıcı taş", body: "Hamleler üst üste diziliyor. Birini çekiyorsun ve modelin hangi kutularının boşaldığını görüyorsun." },
      { title: "Zayıf halka", body: "Üç kırılgan noktadan birini seçiyorsun. Biz de sorularımızı soruyoruz." },
      { title: "Radar", body: "Sonunda beş sinyal şirketin şeklini çiziyor. Her şirketin şekli farklı." },
    ],
    fiveLabel: "Beş sinyal",
    five: [
      { name: "Gelir", body: "Para nereden geliyor ve ne kadar sağlam duruyor." },
      { name: "Ürün", body: "Müşteriye verilen söz ne kadar net." },
      { name: "Dağıtım", body: "Müşteriye nasıl ulaşılıyor, nasıl tutuluyor." },
      { name: "İnsan", body: "Ekip, lisans ve elde tutulan kıt kaynaklar." },
      { name: "Teknoloji", body: "Altyapı ve onu birlikte kurdukları ortaklar." },
    ],
    signals: { gelir: "GELİR", urun: "ÜRÜN", dagitim: "DAĞITIM", insan: "İNSAN", teknoloji: "TEKNOLOJİ" },
    signalsLower: { gelir: "Gelir", urun: "Ürün", dagitim: "Dağıtım", insan: "İnsan", teknoloji: "Teknoloji" },
    next: "Sıradaki adım",
    closeTitle: "Senin modelinde hangi kutu koyu?",
    closeLine: "Tuvali birlikte dolduralım, güçlü yeri ve eksik kutuyu birlikte bulalım.",
    cta: "Görüşme planla",
    disclaimer: "On the Radar, iyi kurulmuş iş modellerine fspark9'un gözünden yapılmış bir ön analizdir. Yatırım tavsiyesi değildir.",
    radarLabel: "Radar",
  },
};

export const radarEpisodeLabels: Record<Locale, RadarEpisodeLabels> = {
  en: {
    signal: "Signal",
    why: "Why it is on our radar",
    guess: "Guess · Revenue",
    right: "You got it.",
    wrong: "Not quite.",
    canvas: "Build the canvas · Business model",
    compare: "Side by side · Rivals",
    usecase: "How it works · One example",
    usecaseBack: "Back",
    usecaseNext: "Next",
    usecaseStep: "Step {i} / {n}",
    calc: "Work it out · Our estimate",
    moves: "The keystone · The clever moves",
    keystonePrompt: "Pull a block",
    keystonePlace: "Where it sits",
    keystoneAnswer: "Our answer",
    keystoneBack: "Put it back",
    keystoneTry: "Pull move {n}{suffix} and see the difference.",
    keystoneSuffixes: [],
    keystoneTower: "Moves",
    moveCount: "Move {i} / {n}",
    copy: "Hard to copy",
    difficulty: ["Easy", "Medium", "Hard"],
    weak: "Weak spot · Our question",
    weakTitle: "Which link do you think is weakest?",
    picked: "Your pick · ",
    full: "The full picture",
    radar: "Radar",
    view: "Our view",
    sources: "Sources",
    next: "Next step",
    board: "Business model canvas",
    radarStart: "Signals light up as you read. By the end you will see a shape that belongs to this company only.",
    radarDone: "All five signals are on. The strength sits mostly in {a} and {b}.",
    openBoard: "Canvas {n}/{t}",
    close: "Close",
    canvasLabel: "Business model canvas",
    signals: { gelir: "REVENUE", urun: "PRODUCT", dagitim: "DISTRIBUTION", insan: "PEOPLE", teknoloji: "TECHNOLOGY" },
    signalsLower: { gelir: "revenue", urun: "product", dagitim: "distribution", insan: "people", teknoloji: "technology" },
  },
  tr: {
    signal: "Sinyal",
    why: "Neden radarda",
    guess: "Tahmin et · Gelir",
    right: "Bildin.",
    wrong: "Tam olarak bu değil.",
    canvas: "Tuvali kuralım · İş modeli",
    compare: "Yan yana · Rakipler",
    usecase: "Nasıl çalışıyor · Bir örnek",
    usecaseBack: "Geri",
    usecaseNext: "İleri",
    usecaseStep: "Adım {i} / {n}",
    calc: "Hesapla · Bizim tahminimiz",
    moves: "Taşıyıcı taş · Akıllıca hamleler",
    keystonePrompt: "Bir taş çek",
    keystonePlace: "Tuvaldeki yeri",
    keystoneAnswer: "Bizim cevabımız",
    keystoneBack: "Taşı geri koy",
    keystoneTry: "Hamle {n}{suffix} çekip farkı gör.",
    keystoneSuffixes: ["'i", "'yi", "'ü"],
    keystoneTower: "Hamleler",
    moveCount: "Hamle {i} / {n}",
    copy: "Kopyalaması",
    difficulty: ["Kolay", "Orta", "Zor"],
    weak: "Kırılgan nokta · Bizim sorumuz",
    weakTitle: "Sence en zayıf halka hangisi?",
    picked: "Senin seçtiğin · ",
    full: "Tam resim",
    radar: "Radar",
    view: "Görüşümüz",
    sources: "Kaynaklar",
    next: "Sıradaki adım",
    board: "İş modeli tuvali",
    radarStart: "Okudukça sinyaller yanıyor. Bölüm sonunda bu şeklin bu şirkete özgü olduğunu göreceksin.",
    radarDone: "Beş sinyal de yandı. Güç en çok {a} ve {b} tarafında.",
    openBoard: "Tuval {n}/{t}",
    close: "Kapat",
    canvasLabel: "İş modeli tuvali",
    signals: { gelir: "GELİR", urun: "ÜRÜN", dagitim: "DAĞITIM", insan: "İNSAN", teknoloji: "TEKNOLOJİ" },
    signalsLower: { gelir: "gelir", urun: "ürün", dagitim: "dağıtım", insan: "insan", teknoloji: "teknoloji" },
  },
};

/** Bölümlerin ham gövdesi (anahtar EN bölüm slug'ı); seed-v3'ün kaynağı. */
export const radarBodies: Record<string, RadarFile> = {
  finmid: finmidJson as unknown as RadarFile,
};

/**
 * Sanity'deki belgenin aynası, bir dile inmiş hali: sayı, şirket adı, kanca,
 * SEO ve ülke bölümün kendi JSON'undan (`number`, `company`, `country`,
 * `titleTag`, `listHook`); seed da aynı kaynaktan yazar.
 */
export function radarDocFields(body: RadarFile, locale: Locale) {
  const text = body[locale];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.publishDate)) {
    throw new Error(`Radar "${body.slug}": publishDate (radara giriş tarihi, YYYY-MM-DD) zorunlu.`);
  }
  return {
    number: Number(body.number),
    subject: body.company,
    hook: text.listHook,
    seo: { title: text.titleTag, description: text.listHook },
    country: body.country,
    addedAt: body.publishDate,
  };
}

export const radarEpisodes: Record<Locale, Record<string, SparkRadarEpisode>> = {
  en: { finmid: toRadarEpisode(radarBodies.finmid, "en", radarDocFields(radarBodies.finmid, "en")) },
  tr: { finmid: toRadarEpisode(radarBodies.finmid, "tr", radarDocFields(radarBodies.finmid, "tr")) },
};
