/**
 * Tek seferlik seed script — Spark bölümü, Layer 1 + 2 + 3.
 *
 * Ana seed-content.ts'ten kasıtlı olarak ayrı: Spark content/en.ts +
 * content/tr.ts'ten değil doğrudan build prompt'undaki İngilizce
 * metinden geliyor. Türkçe çeviriler bu script içinde elle yazıldı
 * (kelime kelime makine çevirisi değil) — kullanıcının açık isteği
 * üzerine (bkz. "translate if you dont have the text for all spark
 * session"). Alıntılar (quote) orijinal dilinde söylendiği için
 * TR'de de çevrildi, ama bu bir yorumlama değil, anlamı koruyan bir
 * çeviri — gazetecilik uygulamasında yabancı dildeki bir alıntının
 * çevrilerek aktarılması yaygındır.
 *
 * Episode 01 (Bó) içeriği build prompt'un "content spine"ından
 * birebir alındı — hiçbir tarih, rakam ya da alıntı icat edilmedi.
 * "NEEDS VERIFICATION" olarak işaretlenen ön-tarih olayları GAP olarak
 * modellendi, RECORD olarak DEĞİL (bkz. verification contract).
 * Call 6 (60 günlük bildirim süresinin kural mı olduğu) build
 * prompt'ta "NOT VERIFIED... cut this call" talimatıyla geldiği için
 * KESİLDİ — 7 değil 6 call yayınlandı, handback'te not edildi.
 *
 * Çalıştırma:
 *   SANITY_API_WRITE_TOKEN=... npm run seed:spark
 */
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token with Editor access in " +
      "sanity.io/manage → API → Tokens, then run again with " +
      "SANITY_API_WRITE_TOKEN=... npm run seed:spark",
  );
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

function ls(en: string, tr: string) {
  return { _type: "localeString" as const, en, tr };
}

function lt(en: string, tr: string) {
  return { _type: "localeText" as const, en, tr };
}

// ─────────────────────────────────────────────
// Layer 1 · sparkSection
// ─────────────────────────────────────────────

const sparkSectionDoc = {
  _id: "sparkSection",
  _type: "sparkSection",
  title: "Spark Section",
  hero: {
    _type: "pageHero",
    eyebrow: ls("fspark9", "fspark9"),
    title: ls("Spark", "Spark"),
    intro: lt(
      "This is not another blog about fintech. What is here is different in all three ways that matter: what we choose to look at, where the information comes from, and how it reaches you. Most writing about this industry hands you someone's conclusion and asks you to trust it. These pieces hand you the actual record instead, dated and sourced, in the order it happened, and keep that record visibly separate from anything we make of it. Then they stop and ask you to call it before we do. Where the record does not settle something, we say so rather than filling the hole. Change how something is presented and you change what actually gets through, which is the point.",
      "Bu, fintech hakkında bir blog daha değil. Burada olan şey, önemli olan üç noktada da farklı: neye baktığımız, bilginin nereden geldiği ve size nasıl ulaştığı. Bu sektör hakkındaki yazıların çoğu size birinin vardığı sonucu verir ve ona güvenmenizi ister. Bu yazılar ise size gerçek kaydın kendisini veriyor, tarihli ve kaynaklı, olduğu sırayla, ve bu kaydı ondan çıkardığımız her şeyden görünür şekilde ayrı tutuyor. Sonra durup, biz söylemeden önce sizin karar vermenizi istiyoruz. Kaydın bir şeyi netleştirmediği yerde, boşluğu doldurmak yerine bunu söylüyoruz. Bir şeyin nasıl sunulduğunu değiştirmek aslında ne geçtiğini değiştirir — mesele de bu.",
    ),
  },
  pillars: [
    {
      _type: "sparkLabeledLine",
      _key: "record",
      label: ls("THE RECORD", "THE RECORD"),
      body: lt(
        "Filings, regulatory letters, release notes, statements on file. Shown as themselves, with the date and the source, not summarised into a takeaway.",
        "Başvurular, düzenleyici mektupları, sürüm notları, kayıtlı beyanlar. Bir çıkarıma indirgenmeden, tarihi ve kaynağıyla birlikte, oldukları gibi gösterilir.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "call",
      label: ls("YOUR CALL", "YOUR CALL"),
      body: lt(
        "The page holds the answer back at certain points and asks what you think happened. Your calls stay in your browser and build up across episodes.",
        "Sayfa belirli noktalarda cevabı geride tutar ve sizce ne olduğunu sorar. Tahminleriniz tarayıcınızda kalır ve bölümler boyunca birikir.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "gaps",
      label: ls("THE GAPS", "THE GAPS"),
      body: lt(
        "What could not be established is marked where it sits, not buried in a footnote. You will see the holes in the record, because they are part of it.",
        "Tespit edilemeyen şey, bir dipnota gömülmek yerine, tam olarak ait olduğu yerde işaretlenir. Kayıttaki boşlukları göreceksiniz, çünkü onlar da kaydın bir parçası.",
      ),
    },
  ],
  closingLine: lt(
    "One format is live. More are coming.",
    "Şu an bir format yayında. Daha fazlası geliyor.",
  ),
  episodeCountSingular: ls("episode", "bölüm"),
  episodeCountPlural: ls("episodes", "bölüm"),
  // build prompt'ta bu tam ifade verilmedi — ana sayfa modülünün link
  // etiketi olarak makul bir varsayılan. Uncertainty list'te.
  homeLinkLabel: ls("Explore Spark", "Spark'ı keşfedin"),
};

// ─────────────────────────────────────────────
// Layer 2 · lastDayFormat
// ─────────────────────────────────────────────

const lastDayFormatDoc = {
  _id: "lastDayFormat-the-last-day",
  _type: "lastDayFormat",
  name: ls("The Last Day", "Son Gün"),
  slug: {
    _type: "localeSlug",
    en: { _type: "slug", current: "the-last-day" },
    tr: { _type: "slug", current: "son-gun" },
  },
  description: lt(
    "What a company that stopped left behind in the public record, read in order, from launch to last day.",
    "Faaliyeti duran bir şirketin kamuya açık kayıtta bıraktıkları — lansmandan son güne, sırasıyla okunuyor.",
  ),
  hero: {
    _type: "pageHero",
    eyebrow: ls("Spark", "Spark"),
    title: ls("The Last Day", "Son Gün"),
    intro: lt(
      "Every subject read here has already closed. Each episode follows one company or one product from its first public day to its last, using only what is on the dated public record: filings, regulatory correspondence, statements made on the record at the time. This is not a ranking and it does not hand out a verdict. It lays out what actually happened, keeps our reading of it clearly marked as ours, and asks you one question at six points along the way.",
      "Burada okuduğunuz her konu artık kapanmış durumda. Her bölüm, bir şirketi ya da bir ürünü ilk kamuya açık gününden son gününe kadar, yalnızca tarihli kamuya açık kayıtta olanı kullanarak takip eder: başvurular, düzenleyici yazışmalar, o dönemde kayda geçmiş beyanlar. Bu bir sıralama değil ve bir hüküm vermiyor. Gerçekte ne olduğunu ortaya koyar, kendi yorumumuzu açıkça bizim olarak işaretler ve yol boyunca altı noktada size bir soru sorar.",
    ),
  },
  howItWorks: [
    {
      _type: "sparkLabeledLine",
      _key: "clock",
      label: ls("The clock.", "Saat."),
      body: lt(
        "Every episode is measured in days, from day zero to the last day. Every document on the page is stamped with the day it landed.",
        "Her bölüm gün cinsinden ölçülür, sıfırıncı günden son güne kadar. Sayfadaki her belge, ulaştığı günle damgalanır.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "record-only",
      label: ls("The record only.", "Sadece kayıt."),
      body: lt(
        "One toggle strips out every reading, every question and every note, leaving nothing but the dated documents and the declared gaps. What is left is what happened.",
        "Tek bir geçiş düğmesi her okumayı, her soruyu ve her notu kaldırır, geriye yalnızca tarihli belgeler ve belirtilmiş boşluklar kalır. Geriye kalan, olanın kendisidir.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "call",
      label: ls("The call.", "Tahmin."),
      body: lt(
        "Six times, the record is held back and you get asked one thing: was this forced by a rule, or was it a decision. One of the six has no answer, because the record does not settle it. Your calls are yours and they stay in your browser.",
        "Altı kez, kayıt geride tutulur ve size tek bir şey sorulur: bu bir kural tarafından mı zorunlu kılındı, yoksa bir karar mıydı. Altıdan birinin cevabı yok, çünkü kayıt bunu netleştirmiyor. Tahminleriniz size ait ve tarayıcınızda kalır.",
      ),
    },
  ],
  closingLine: lt(
    "Nobody who worked at these companies set out to fail, and this format is not about them. It is about what the record shows once it is separated from the story told about it afterward.",
    "Bu şirketlerde çalışan hiç kimse başarısız olmak için yola çıkmadı, ve bu format onlarla ilgili değil. Mesele, kayıt sonradan anlatılan hikâyeden ayrıldığında ne gösterdiği.",
  ),
  corrections: [
    {
      _type: "sparkLabeledLine",
      _key: "corrections",
      label: ls("Corrections.", "Düzeltmeler."),
      body: lt(
        "If anything here is factually wrong, write to [ADDRESS TO BE SET] with the episode number and the sentence. Every correction we accept is published at the foot of the episode, with the date it was made and what changed. We do not edit a published sentence without saying so.",
        "Burada gerçeklere aykırı bir şey varsa, bölüm numarasını ve cümleyi belirterek [ADDRESS TO BE SET] adresine yazın. Kabul ettiğimiz her düzeltme, yapıldığı tarih ve neyin değiştiğiyle birlikte bölümün altında yayınlanır. Yayınlanmış bir cümleyi, bunu belirtmeden düzenlemeyiz.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "dates",
      label: ls("Every episode carries three dates.", "Her bölüm üç tarih taşır."),
      body: lt(
        "When it was published, when the evidence was taken, and when it was last checked. A document that was reachable when we took it may not be reachable when you read it. That is why we date the taking.",
        "Yayınlandığı tarih, kanıtın alındığı tarih ve son kontrol edildiği tarih. Bizim aldığımız sırada erişilebilir olan bir belge, siz okurken erişilebilir olmayabilir. Alım tarihini belirtmemizin nedeni bu.",
      ),
    },
    {
      _type: "sparkLabeledLine",
      _key: "reply",
      label: ls("Right of reply.", "Yanıt hakkı."),
      body: lt(
        "Where a subject has a living parent, an appointed administrator or liquidator, or a press contact, we tell them two working days before publication. That is for accuracy, not for permission.",
        "Bir konunun hayatta olan bir ana şirketi, atanmış bir yöneticisi ya da tasfiye memuru, ya da bir basın irtibat kişisi varsa, yayından iki iş günü önce onlara haber veririz. Bu, izin almak için değil, doğruluk için.",
      ),
    },
  ],
  // Türkçe sayı sonrası çoğul eki almıyor ("1 gün" / "156 gün") — bu
  // tahmin değil, dilin kuralı.
  dayCountSingular: ls("day", "gün"),
  dayCountPlural: ls("days", "gün"),
  mechanicLabels: {
    _type: "lastDayMechanicLabels",
    dayWord: ls("DAY", "GÜN"),
    recordLabel: ls("RECORD", "KAYIT"),
    readingLabel: ls("READING", "OKUMA"),
    gapLabel: ls("GAP", "BOŞLUK"),
    noteLabel: ls("fspark9 · Note", "fspark9 · Not"),
    restsOnLabel: ls("Rests on", "Dayandığı kayıt"),
    callOptionRule: ls("A rule forced this", "Bir kural bunu zorunlu kıldı"),
    callOptionDecision: ls("Someone decided this", "Biri buna karar verdi"),
    callRevealDiverged: ls(
      "The record went the other way",
      "Kayıt başka yönde çıktı",
    ),
    callRevealUnsettled: ls(
      "The record does not settle this",
      "Kayıt bunu netleştirmiyor",
    ),
    ledgerToggleLabel: ls("Show the record only", "Sadece kaydı göster"),
    correctionsCtaLabel: ls("Report a correction", "Bir düzeltme bildir"),
    scorecardHeading: ls("Your calls", "Sizin tahminleriniz"),
    scorecardMatched: ls("Matched the record", "Kayıtla örtüştü"),
    scorecardDiverged: ls("Went the other way", "Başka yönde çıktı"),
    scorecardUnsettled: ls("The record does not say", "Kayıt söylemiyor"),
    scorecardPending: ls("Not answered yet", "Henüz yanıtlanmadı"),
    publishedLabel: ls("Published", "Yayın tarihi"),
    evidenceTakenLabel: ls("Evidence taken", "Kanıt alım tarihi"),
    lastCheckedLabel: ls("Last checked", "Son kontrol tarihi"),
  },
};

// ─────────────────────────────────────────────
// Layer 3 · lastDayEpisode (01 · Bó)
// ─────────────────────────────────────────────

function record(opts: {
  key: string;
  day: number;
  date: string;
  heading: [string, string];
  body: [string, string];
  quote?: [string, string];
  quoteAttribution?: [string, string];
  sourceLabel: [string, string];
  sourceUrl: string;
  sourceKind: "regulator" | "filing" | "company" | "court" | "press";
}) {
  return {
    _type: "lastDayRecordBlock",
    _key: opts.key,
    day: opts.day,
    date: opts.date,
    heading: ls(...opts.heading),
    body: lt(...opts.body),
    ...(opts.quote ? { quote: lt(...opts.quote) } : {}),
    ...(opts.quoteAttribution ? { quoteAttribution: ls(...opts.quoteAttribution) } : {}),
    sourceLabel: ls(...opts.sourceLabel),
    sourceUrl: opts.sourceUrl,
    sourceKind: opts.sourceKind,
  };
}

function reading(opts: {
  key: string;
  day: number;
  heading: [string, string];
  body: [string, string];
  restsOn: string[];
}) {
  return {
    _type: "lastDayReadingBlock",
    _key: opts.key,
    day: opts.day,
    heading: ls(...opts.heading),
    body: lt(...opts.body),
    restsOn: opts.restsOn,
  };
}

function gap(opts: {
  key: string;
  day?: number;
  heading: [string, string];
  body: [string, string];
  whereItWouldBe?: [string, string];
  invitesCorrection?: boolean;
}) {
  return {
    _type: "lastDayGapBlock",
    _key: opts.key,
    ...(opts.day !== undefined ? { day: opts.day } : {}),
    heading: ls(...opts.heading),
    body: lt(...opts.body),
    ...(opts.whereItWouldBe ? { whereItWouldBe: ls(...opts.whereItWouldBe) } : {}),
    invitesCorrection: opts.invitesCorrection ?? true,
  };
}

function call(opts: {
  key: string;
  id: string;
  day: number;
  prompt: [string, string];
  answer: "rule" | "decision" | "unsettled";
  revealBlocks: ReturnType<typeof record | typeof reading | typeof gap>[];
}) {
  return {
    _type: "lastDayCallBlock",
    _key: opts.key,
    id: opts.id,
    day: opts.day,
    prompt: lt(...opts.prompt),
    answer: opts.answer,
    revealBlocks: opts.revealBlocks,
  };
}

function note(opts: { key: string; day: number; body: [string, string] }) {
  return {
    _type: "lastDayNoteBlock",
    _key: opts.key,
    day: opts.day,
    body: lt(...opts.body),
  };
}

// Kaynak URL'leri:
// Finextra   https://www.finextra.com/newsarticle/34850/natwest-launches-digital-challenger-b
// City AM    https://www.cityam.com/rbs-under-fire-over-fake-reviews-for-new-app/
// FinTech Futures https://www.fintechfutures.com/challenger-banks/rbs-neobank-b-reissues-cards-due-to-authentication-issue
// TechCrunch https://techcrunch.com/2020/05/01/bo-shutter/
// Computer Weekly https://www.computerweekly.com/news/252482560/NatWest-Bank-shutters-its-app-based-bank-after-five-months
// CMA        https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/995345/Public_letter_to_NatWest_2021__.pdf
const FINEXTRA = "https://www.finextra.com/newsarticle/34850/natwest-launches-digital-challenger-b";
const CITY_AM = "https://www.cityam.com/rbs-under-fire-over-fake-reviews-for-new-app/";
const FINTECH_FUTURES =
  "https://www.fintechfutures.com/challenger-banks/rbs-neobank-b-reissues-cards-due-to-authentication-issue";
const TECHCRUNCH = "https://techcrunch.com/2020/05/01/bo-shutter/";
const COMPUTER_WEEKLY =
  "https://www.computerweekly.com/news/252482560/NatWest-Bank-shutters-its-app-based-bank-after-five-months";
const CMA_LETTER =
  "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/995345/Public_letter_to_NatWest_2021__.pdf";

const episodeBlocks = [
  gap({
    key: "gap-pre-2018-03",
    day: -434,
    heading: [
      "A digital banking brand takes shape",
      "Bir dijital bankacılık markası şekilleniyor",
    ],
    body: [
      "RBS Group's plan to establish a digital banking brand is sourced only through a citation chain, not read at source. The announcement and its details could not be independently verified here.",
      "RBS Group'un bir dijital bankacılık markası kurma planı yalnızca bir atıf zinciri üzerinden biliniyor, kaynağında okunmadı. Duyurunun kendisi ve ayrıntıları burada bağımsız olarak doğrulanamadı.",
    ],
    whereItWouldBe: [
      "RBS Group's own 2018 corporate announcements or annual report",
      "RBS Group'un 2018 kurumsal duyuruları ya da yıllık raporu",
    ],
  }),
  gap({
    key: "gap-pre-2018-09",
    heading: ["The Bó brand name is announced", "Bó marka adı duyuruluyor"],
    body: [
      "The Bó brand name and its development beginning are established only through a citation chain, not through a source read directly. The date is treated as approximate here for that reason.",
      "Bó marka adı ve geliştirme sürecinin başlangıcı yalnızca bir atıf zinciri üzerinden biliniyor, doğrudan kaynağında okunmadı. Bu yüzden tarih burada yaklaşık olarak ele alınıyor.",
    ],
  }),
  record({
    key: "rec-launch",
    day: 0,
    date: "2019-11-27",
    heading: ["Bó launches publicly", "Bó halka açık olarak yayına giriyor"],
    body: [
      'Public launch, following employee beta testing, on the App Store and Google Play. A cloud based product with its own Faster Payments connection, operating on the parent\'s banking licence rather than a separate one. Yellow Visa debit card. Reported to be 18 months in development against a reported £100m budget. Mark Bailie held the role of Chief Executive. Brand developed by Accenture Interactive. Slogan "Do Money Better".',
      'Çalışan beta testinin ardından, App Store ve Google Play üzerinden halka açık lansman. Kendi Faster Payments bağlantısına sahip, ayrı bir bankacılık lisansı yerine ana şirketin lisansı altında çalışan bulut tabanlı bir ürün. Sarı Visa banka kartı. Bildirildiğine göre 18 aylık geliştirme süreci ve bildirilen 100 milyon sterlinlik bütçe. Mark Bailie, Genel Müdür rolünü üstlendi. Marka, Accenture Interactive tarafından geliştirildi. Slogan: "Do Money Better".',
    ],
    sourceLabel: [
      'Finextra, "NatWest launches digital challenger Bó"',
      'Finextra, "NatWest, dijital meydan okuyucu Bó\'yu piyasaya sürüyor"',
    ],
    sourceUrl: FINEXTRA,
    sourceKind: "press",
  }),
  call({
    key: "call-1",
    id: "licence-choice",
    day: 0,
    prompt: [
      "A bank launches a standalone digital brand on its own banking licence rather than applying for a separate one. Rule, or decision?",
      "Bir banka, ayrı bir bankacılık lisansı için başvurmak yerine kendi lisansı altında bağımsız bir dijital marka başlatıyor. Kural mı, karar mı?",
    ],
    answer: "decision",
    revealBlocks: [
      reading({
        key: "read-licence",
        day: 0,
        heading: ["A trade with a shape", "Şekli olan bir takas"],
        body: [
          "Operating under the parent's permission removes the licensing timeline and cost, and in exchange the product inherits the parent's compliance surface, its incident process and its audit trail. Nothing about that is a mistake and nothing about it is forced. It is a trade with a shape.",
          "Ana şirketin izni altında çalışmak, lisanslama süresini ve maliyetini ortadan kaldırır; karşılığında ürün, ana şirketin uyum yüzeyini, olay sürecini ve denetim izini devralır. Bunun hiçbir yanı bir hata değil ve hiçbir yanı zorunlu değil. Şekli olan bir takas.",
        ],
        restsOn: ["Bó launches publicly"],
      }),
    ],
  }),
  note({
    key: "note-day0",
    day: 0,
    body: [
      "A high street bank and a digital-first challenger are not solving the same problem with different branding. They are running different operating models, and the gap between them shows up in places that are easy to underrate from the outside. Speed of the kind these products need is not a feature you add later. It is closer to an organisational habit, and habits built for a different kind of banking do not transfer quickly.",
      "Bir şubeli banka ile dijital öncelikli bir meydan okuyucu, aynı sorunu farklı bir markalamayla çözmüyor. Farklı işletim modelleri yürütüyorlar, ve aralarındaki fark, dışarıdan bakınca hafife alınması kolay yerlerde ortaya çıkıyor. Bu tür ürünlerin ihtiyaç duyduğu hız, sonradan eklenen bir özellik değildir. Kurumsal bir alışkanlığa daha yakındır, ve farklı bir bankacılık türü için kurulmuş alışkanlıklar hızlı aktarılmaz.",
    ],
  }),
  gap({
    key: "gap-no-product-record",
    day: 0,
    heading: [
      "No product record was found reachable",
      "Erişilebilir bir ürün kaydı bulunamadı",
    ],
    body: [
      "No Bó changelog, release notes archive, engineering blog or public roadmap was found reachable for this episode. That is why this episode reads the regulatory record rather than a product record.",
      "Bu bölüm için erişilebilir bir Bó değişiklik günlüğü, sürüm notu arşivi, mühendislik blogu ya da kamuya açık yol haritası bulunamadı. Bu bölümün ürün kaydı yerine düzenleyici kaydı okumasının nedeni bu.",
    ],
    invitesCorrection: true,
  }),
  record({
    key: "rec-fake-reviews",
    day: 11,
    date: "2019-12-08",
    heading: [
      "Pre-launch reviews surface in the public App Store listing",
      "Lansman öncesi yorumlar App Store'daki halka açık listede ortaya çıkıyor",
    ],
    body: [
      "In the days around public launch, a number of App Store reviews dated before the 27 November public availability date were identified by users and by press. Some were later reported to match the names of RBS employees. RBS confirmed that around 2,800 people, including staff, had taken part in a pre launch trial programme.",
      "Halka açık lansmanın olduğu günlerde, 27 Kasım halka açılış tarihinden önceki tarihleri taşıyan bir dizi App Store yorumu kullanıcılar ve basın tarafından fark edildi. Bazılarının, daha sonra bildirildiğine göre, RBS çalışanlarının isimleriyle eşleştiği görüldü. RBS, personel dahil yaklaşık 2.800 kişinin bir lansman öncesi deneme programına katıldığını doğruladı.",
    ],
    quote: [
      "We test our products, including with staff, before they are available to our customers and use feedback from the pilots to improve the services and products we offer.",
      "Müşterilerimize sunulmadan önce ürünlerimizi, personel dahil olmak üzere test ediyoruz ve sunduğumuz hizmet ve ürünleri geliştirmek için pilot programlardan gelen geri bildirimleri kullanıyoruz.",
    ],
    quoteAttribution: [
      "RBS spokesperson, as reported by City AM",
      "RBS sözcüsü, City AM'e göre",
    ],
    sourceLabel: [
      'City AM, "RBS under fire over fake reviews for new banking app Bó"',
      'City AM, "RBS, yeni bankacılık uygulaması Bó için sahte yorumlar nedeniyle eleştiri altında"',
    ],
    sourceUrl: CITY_AM,
    sourceKind: "press",
  }),
  call({
    key: "call-2",
    id: "review-sequencing",
    day: 11,
    prompt: [
      "A product's first public reviews include ones dated before public launch, written by trial participants. Rule, or decision?",
      "Bir ürünün ilk halka açık yorumları arasında, halka açık lansmandan önceki tarihleri taşıyan ve deneme katılımcıları tarafından yazılmış yorumlar var. Kural mı, karar mı?",
    ],
    answer: "decision",
    revealBlocks: [
      reading({
        key: "read-sequencing",
        day: 11,
        heading: ["Sequencing without disclosure", "Açıklama olmadan sıralama"],
        body: [
          "Pre launch trial programmes are standard practice and compatible with genuine testing. What turns a normal practice into a visible problem is sequencing and disclosure: reviews appearing in the same public feed as day one customers' reviews, with no marker distinguishing the two. That is a product and process choice, not something any rule requires or forbids.",
          "Lansman öncesi deneme programları standart bir uygulamadır ve gerçek testlerle uyumludur. Normal bir uygulamayı görünür bir soruna dönüştüren şey sıralama ve açıklama eksikliğidir: yorumların, ikisini ayıran hiçbir işaret olmadan, birinci gün müşterilerinin yorumlarıyla aynı halka açık akışta görünmesi. Bu bir ürün ve süreç tercihidir, hiçbir kuralın zorunlu kıldığı ya da yasakladığı bir şey değil.",
        ],
        restsOn: ["Pre-launch reviews surface in the public App Store listing"],
      }),
    ],
  }),
  record({
    key: "rec-cutoff",
    day: 38,
    date: "2020-01-03",
    heading: [
      "The compliance cut off date for card issuance",
      "Kart ihracı için uyum kesim tarihi",
    ],
    body: [
      "Cards issued after this date were compliant with the incoming Strong Customer Authentication requirement. Cards issued before it were scheduled for deactivation on 14 March 2020.",
      "Bu tarihten sonra çıkarılan kartlar, gelmekte olan Güçlü Müşteri Kimlik Doğrulama gerekliliğine uyumluydu. Bu tarihten önce çıkarılan kartların 14 Mart 2020'de devre dışı bırakılması planlandı.",
    ],
    sourceLabel: [
      'FinTech Futures, "RBS neobank Bó reissues cards due to authentication issue"',
      'FinTech Futures, "RBS\'in yeni banka markası Bó, kimlik doğrulama sorunu nedeniyle kartları yeniden veriyor"',
    ],
    sourceUrl: FINTECH_FUTURES,
    sourceKind: "press",
  }),
  record({
    key: "rec-reissue-reported",
    day: 71,
    date: "2020-02-05",
    heading: [
      "6,000 cards reported reissued for PSD2 compliance",
      "PSD2 uyumu için 6.000 kartın yeniden verildiği bildirildi",
    ],
    body: [
      "Reported that 6,000 customer cards were being reissued, for compliance with PSD2 and Strong Customer Authentication.",
      "PSD2 ve Güçlü Müşteri Kimlik Doğrulaması gerekliliklerine uyum sağlamak için 6.000 müşteri kartının yeniden verilmekte olduğu bildirildi.",
    ],
    quote: [
      "If you opened an account after 3 January, you will automatically have been sent a card that is compliant with the new legislation. Cards issued before 3 January but which are still in use will be deactivated on 14 March.",
      "3 Ocak'tan sonra hesap açtıysanız, otomatik olarak yeni mevzuata uyumlu bir kart gönderilmiş olacak. 3 Ocak'tan önce çıkarılan ama hâlâ kullanılan kartlar 14 Mart'ta devre dışı bırakılacak.",
    ],
    quoteAttribution: [
      "Clair Whitefield, Bó's editor in chief",
      "Clair Whitefield, Bó'nun yayın yönetmeni",
    ],
    sourceLabel: [
      'FinTech Futures, "RBS neobank Bó reissues cards due to authentication issue"',
      'FinTech Futures, "RBS\'in yeni banka markası Bó, kimlik doğrulama sorunu nedeniyle kartları yeniden veriyor"',
    ],
    sourceUrl: FINTECH_FUTURES,
    sourceKind: "press",
  }),
  call({
    key: "call-3",
    id: "card-reissue-rule",
    day: 38,
    prompt: [
      "A card estate issued in the first weeks of a product has to be replaced. Rule, or decision?",
      "Bir ürünün ilk haftalarında çıkarılan kart stoğunun değiştirilmesi gerekiyor. Kural mı, karar mı?",
    ],
    answer: "rule",
    revealBlocks: [
      reading({
        key: "read-cutoff-mechanism",
        day: 38,
        heading: [
          "What a compliance cut off does, mechanically",
          "Bir uyum kesim tarihinin, mekanik olarak, yaptığı şey",
        ],
        body: [
          "Name the instrument: PSD2 and the Strong Customer Authentication requirements. A compliance cut off does something mechanical and unavoidable to a card estate: every card issued before the line has to be replaced after it, and the cost is not the plastic, it is that each replacement is a re activation event landing on a customer who has only just onboarded. The two dates are on the record; what anyone should have anticipated is not for this page to say.",
          "Aracı adlandıralım: PSD2 ve Güçlü Müşteri Kimlik Doğrulaması gereklilikleri. Bir uyum kesim tarihi, kart stoğuna mekanik ve kaçınılmaz bir şey yapar: kesim tarihinden önce çıkarılan her kart sonrasında değiştirilmek zorundadır, ve maliyet plastiğin kendisi değildir — her değişim, daha yeni katılım sağlamış bir müşteriye düşen bir yeniden etkinleştirme olayıdır. İki tarih de kayıtta; kimin neyi öngörmüş olması gerektiğini söylemek bu sayfanın işi değil.",
        ],
        restsOn: [
          "The compliance cut off date for card issuance",
          "6,000 cards reported reissued for PSD2 compliance",
        ],
      }),
    ],
  }),
  note({
    key: "note-day38",
    day: 38,
    body: [
      "This is what that habit costs in practice. A compliance deadline landing three months into a product's life is not a technical problem, it is an operational one, and how fast an organisation can turn a card estate over is decided long before the deadline exists.",
      "Bu alışkanlığın pratikte maliyeti işte bu. Bir ürünün hayatının üçüncü ayına denk gelen bir uyum son tarihi teknik bir sorun değil, operasyonel bir sorundur; bir kuruluşun bir kart stoğunu ne kadar hızlı devredebileceği, son tarih var olmadan çok önce belirlenir.",
    ],
  }),
  record({
    key: "rec-deactivated",
    day: 108,
    date: "2020-03-14",
    heading: [
      "Cards issued before the cut off are deactivated",
      "Kesim tarihinden önce çıkarılan kartlar devre dışı bırakılıyor",
    ],
    body: [
      "Cards issued before 3 January were deactivated on this date, per the notice reported above.",
      "3 Ocak'tan önce çıkarılan kartlar, yukarıda bildirilen duyuruya göre bu tarihte devre dışı bırakıldı.",
    ],
    sourceLabel: [
      'FinTech Futures, "RBS neobank Bó reissues cards due to authentication issue"',
      'FinTech Futures, "RBS\'in yeni banka markası Bó, kimlik doğrulama sorunu nedeniyle kartları yeniden veriyor"',
    ],
    sourceUrl: FINTECH_FUTURES,
    sourceKind: "press",
  }),
  call({
    key: "call-4",
    id: "customer-cost-unsettled",
    day: 108,
    prompt: [
      "What did a card re-issue cost a product eleven weeks old, in customers?",
      "On bir haftalık bir ürüne, kart yeniden verme işlemi müşteri açısından neye mal oldu?",
    ],
    answer: "unsettled",
    revealBlocks: [
      gap({
        key: "gap-no-customer-number",
        day: 108,
        heading: ["No customer number published", "Yayınlanmış bir müşteri sayısı yok"],
        body: [
          "The public record does not carry a customer count between launch and closure other than the total at closure. No figure tied to the card re-issue itself was published.",
          "Kamuya açık kayıt, kapanıştaki toplam dışında, lansman ile kapanış arasında bir müşteri sayısı taşımıyor. Kart yeniden verme işleminin kendisine bağlı bir rakam yayınlanmadı.",
        ],
        whereItWouldBe: [
          "A parent disclosure or a filed document covering this period",
          "Bu dönemi kapsayan bir ana şirket açıklaması ya da başvuru belgesi",
        ],
      }),
    ],
  }),
  gap({
    key: "gap-ceo-departure",
    day: 120,
    heading: [
      "The date of the CEO's departure is not established",
      "CEO'nun ayrılış tarihi belirlenemedi",
    ],
    body: [
      "Mark Bailie announced he would leave the role of Chief Executive. The exact date of that announcement is not established in any source read for this episode.",
      "Mark Bailie, Genel Müdürlük görevinden ayrılacağını duyurdu. Bu duyurunun tam tarihi, bu bölüm için okunan hiçbir kaynakta belirlenemedi.",
    ],
    whereItWouldBe: [
      "A dated press announcement or a NatWest Group disclosure naming the date",
      "Tarihli bir basın duyurusu ya da tarihi belirten bir NatWest Group açıklaması",
    ],
  }),
  note({
    key: "note-ceo-departure",
    day: 120,
    body: [
      "Leadership movement packed into a young product's first quarter is a real constraint on what that product can do next, and the public record almost never says what else was happening inside the business at the time. Choosing to stop rather than keep funding something through that kind of disruption is a defensible call, even though stopping five months after a high-profile launch will always read, from the outside, as a failure. Sometimes the harder and more disciplined move is recognising quickly that something is not the right fit, rather than letting a mismatch run for the sake of not looking like it stopped.",
      "Genç bir ürünün ilk çeyreğine sıkışan liderlik hareketliliği, o ürünün bundan sonra ne yapabileceği üzerinde gerçek bir kısıtlamadır, ve kamuya açık kayıt neredeyse hiçbir zaman o sırada işletmenin içinde başka nelerin olduğunu söylemez. Bu tür bir kesintiyi finanse etmeye devam etmek yerine durdurmayı seçmek savunulabilir bir karardır, yüksek profilli bir lansmandan beş ay sonra durmak dışarıdan her zaman bir başarısızlık gibi okunacak olsa da. Bazen daha zor ve daha disiplinli hamle, durmuş gibi görünmemek uğruna bir uyumsuzluğun sürmesine izin vermek yerine, bir şeyin doğru uyum olmadığını hızlıca fark etmektir.",
    ],
  }),
  record({
    key: "rec-closure",
    day: 156,
    date: "2020-05-01",
    heading: [
      "Closure announced alongside Q1 2020 results",
      "Kapanış, Ç1 2020 sonuçlarıyla birlikte duyuruldu",
    ],
    body: [
      "Closure announced, alongside NatWest Group's Q1 2020 results. 11,413 customers at closure. Customers given 60 days from the announcement to withdraw funds. Staff transferred to Mettle, the parent's business banking product — referred to here only as the destination of that transfer, with no comment on its current state or offering.",
      "Kapanış, NatWest Group'un Ç1 2020 sonuçlarıyla birlikte duyuruldu. Kapanışta 11.413 müşteri vardı. Müşterilere, duyurudan itibaren fonlarını çekmeleri için 60 gün süre tanındı. Personel, ana şirketin işletme bankacılığı ürünü olan Mettle'a transfer edildi — burada yalnızca bu transferin hedefi olarak anılıyor, mevcut durumu ya da teklifi hakkında herhangi bir yorum yapılmıyor.",
    ],
    sourceLabel: [
      'TechCrunch, "NatWest shutters its Bó digital bank just five months after launch"',
      'TechCrunch, "NatWest, lansmandan sadece beş ay sonra Bó dijital bankasını kapatıyor"',
    ],
    sourceUrl: TECHCRUNCH,
    sourceKind: "press",
  }),
  record({
    key: "rec-closure-trade-press",
    day: 156,
    date: "2020-05-01",
    heading: [
      "Closure covered by trade press",
      "Kapanış sektör basınında da yer aldı",
    ],
    body: [
      "The closure and the staff transfer to Mettle were also reported by Computer Weekly, corroborating the TechCrunch account.",
      "Kapanış ve personelin Mettle'a transferi, TechCrunch'ın anlattıklarını doğrulayarak Computer Weekly tarafından da haberleştirildi.",
    ],
    sourceLabel: [
      'Computer Weekly, "NatWest Bank shutters its app-based bank after five months"',
      'Computer Weekly, "NatWest Bank, beş ay sonra uygulama tabanlı bankasını kapatıyor"',
    ],
    sourceUrl: COMPUTER_WEEKLY,
    sourceKind: "press",
  }),
  gap({
    key: "gap-primary-not-read",
    day: 156,
    heading: [
      "The primary closure document has not been read at source",
      "Birincil kapanış belgesi kaynağında okunmadı",
    ],
    body: [
      "NatWest Group's own Q1 2020 results, published 1 May 2020, is the primary record for the closure and has not yet been pulled and checked. This episode currently cites press coverage of that document rather than the document itself.",
      "NatWest Group'un kendi Ç1 2020 sonuçları, 1 Mayıs 2020'de yayınlandı ve kapanış için birincil kayıt bu belge; henüz alınıp kontrol edilmedi. Bu bölüm şu an belgenin kendisi yerine ona dair basın haberlerini kaynak gösteriyor.",
    ],
    whereItWouldBe: [
      "investors.natwestgroup.com, NatWest Group Q1 2020 results, 1 May 2020",
      "investors.natwestgroup.com, NatWest Group Ç1 2020 sonuçları, 1 Mayıs 2020",
    ],
  }),
  call({
    key: "call-5",
    id: "closure-thesis",
    day: 156,
    prompt: [
      "The closure. Rule, or decision?",
      "Kapanış. Kural mı, karar mı?",
    ],
    answer: "decision",
    revealBlocks: [
      reading({
        key: "read-closure-thesis",
        day: 156,
        heading: ["No rule closed Bó", "Bó'yu hiçbir kural kapatmadı"],
        body: [
          "No rule closed Bó. There was no supervisory action, no enforcement, no licence problem, no insolvency. A publication that sells advice on how not to fail, opening its failure format by declining to blame the regulator, says more about its method than a manifesto would. The separate, real regulatory point is that PSD2 and Strong Customer Authentication did impose a dated and expensive re-issuance on a card estate three months old — a rule doing something concrete. It did not close the product. Holding those two apart is the whole episode.",
          "Bó'yu hiçbir kural kapatmadı. Herhangi bir denetim önlemi, yaptırım, lisans sorunu ya da iflas yoktu. Başarısız olmamayı öğütleyen bir yayının, kendi başarısızlık formatını düzenleyiciyi suçlamayı reddederek açması, bir manifestodan daha fazlasını söyler yöntemi hakkında. Ayrı ve gerçek olan düzenleyici mesele ise, PSD2 ve Güçlü Müşteri Kimlik Doğrulaması'nın, üç aylık bir kart stoğuna tarihli ve maliyetli bir yeniden verme işlemini dayatmış olması — bir kuralın somut bir şey yaptığı yer burası. Ama ürünü kapatan bu değildi. Bu ikisini birbirinden ayrı tutmak, bölümün tamamı.",
        ],
        restsOn: [
          "Closure announced alongside Q1 2020 results",
          "The compliance cut off date for card issuance",
        ],
      }),
    ],
  }),
  note({
    key: "note-day156",
    day: 156,
    body: [
      "Retail digital banking in the UK was already crowded by 2019, several funded challengers fighting for the same customer, all spending heavily to acquire them. SME banking asks for a different set of capabilities: credit assessment, lending relationships, compliance infrastructure at scale, the kind of thing a traditional bank has usually spent decades building. Redirecting technology and people toward the segment where an incumbent's existing strengths actually apply, rather than continuing to compete on the challengers' terms, is a reasonable capital allocation call. Some traditional banks are simply better positioned to build a strong SME digital offer than a strong retail one, and that is a fair thing for an incumbent to conclude about itself.",
      "2019 itibarıyla İngiltere'de perakende dijital bankacılık zaten kalabalıktı; aynı müşteri için mücadele eden, onu kazanmak için ağır harcama yapan birçok fonlanmış meydan okuyucu vardı. KOBİ bankacılığı ise farklı bir yetenek setini gerektirir: kredi değerlendirmesi, kredi ilişkileri, ölçekte uyum altyapısı — geleneksel bir bankanın genellikle on yıllar boyunca inşa ettiği türden şeyler. Teknolojiyi ve insanları, meydan okuyucuların şartlarında rekabet etmeye devam etmek yerine, yerleşik bir oyuncunun mevcut güçlü yanlarının gerçekten geçerli olduğu segmente yönlendirmek, makul bir sermaye tahsisi kararıdır. Bazı geleneksel bankalar, güçlü bir perakende teklifi kurmaktan çok, güçlü bir KOBİ dijital teklifi kurmak için daha iyi konumdadır, ve bir yerleşik oyuncunun kendisi hakkında bu sonuca varması adil bir şeydir.",
    ],
  }),
  record({
    key: "rec-cma-letter",
    day: 605,
    date: "2021-06-22",
    heading: [
      "The CMA publishes a letter recording a breach",
      "CMA, bir ihlali kayda geçiren bir mektup yayınlıyor",
    ],
    body: [
      "The Competition and Markets Authority wrote a public letter to NatWest Group, dated 22 June 2021, recording a breach of Article 20.6.2 of the Retail Banking Market Investigation Order 2017. The Order requires that a Transaction History be sent within 40 days of a personal current account closing, on an opt-out basis rather than opt-in. NatWest Group had offered Transaction Histories to former Bó customers on an opt-in basis, and as a result did not send them to 903 former Bó customers whose accounts closed. The letter records the breach as running from 14 November 2019 to 1 May 2020, and states that NatWest Group notified the CMA of it on 29 January 2021 as part of its 2020 annual compliance report.",
      "Rekabet ve Piyasalar Kurumu (CMA), 22 Haziran 2021 tarihli, NatWest Group'a yazılmış kamuya açık bir mektupla, 2017 Perakende Bankacılık Piyasası Soruşturması Emri'nin 20.6.2 Maddesi'nin ihlal edildiğini kayda geçirdi. Emir, bir Hesap Hareketleri dökümünün, bir bireysel cari hesap kapandıktan sonra 40 gün içinde, opt-in değil opt-out esasına göre gönderilmesini gerektiriyor. NatWest Group, eski Bó müşterilerine Hesap Hareketleri dökümünü opt-in esasına göre sunmuştu ve bunun sonucunda, hesapları kapanan 903 eski Bó müşterisine bu döküm gönderilmedi. Mektup, ihlalin 14 Kasım 2019'dan 1 Mayıs 2020'ye kadar sürdüğünü kayda geçiriyor ve NatWest Group'un bunu CMA'ya 29 Ocak 2021'de, 2020 yıllık uyum raporunun bir parçası olarak bildirdiğini belirtiyor.",
    ],
    sourceLabel: [
      'Competition and Markets Authority, "Public letter to NatWest 2021"',
      'Rekabet ve Piyasalar Kurumu, "NatWest\'e kamuya açık mektup, 2021"',
    ],
    sourceUrl: CMA_LETTER,
    sourceKind: "regulator",
  }),
  gap({
    key: "gap-opt-in-why",
    day: 605,
    heading: [
      "The letter does not say why the process was opt-in, or when it was corrected",
      "Mektup, sürecin neden opt-in olduğunu ya da ne zaman düzeltildiğini söylemiyor",
    ],
    body: [
      "The CMA's letter records the breach and the notification but does not state why NatWest Group's process was opt-in rather than opt-out, or when the process was subsequently corrected.",
      "CMA'nın mektubu ihlali ve bildirimi kayda geçiriyor, ama NatWest Group'un sürecinin neden opt-out değil opt-in olduğunu, ya da sürecin sonrasında ne zaman düzeltildiğini belirtmiyor.",
    ],
    whereItWouldBe: [
      "NatWest Group's subsequent compliance reporting to the CMA, not reviewed here",
      "NatWest Group'un CMA'ya sonraki uyum raporlaması, burada incelenmedi",
    ],
  }),
  call({
    key: "call-6",
    id: "transaction-history-rule",
    day: 605,
    prompt: [
      "Sending a customer their transaction history after an account closes. Rule, or decision?",
      "Bir hesap kapandıktan sonra müşteriye hesap hareketleri dökümünü göndermek. Kural mı, karar mı?",
    ],
    answer: "rule",
    revealBlocks: [
      reading({
        key: "read-article-2062",
        day: 605,
        heading: ["Article 20.6.2, named directly", "Madde 20.6.2, doğrudan adlandırılıyor"],
        body: [
          "Name the instrument directly: Article 20.6.2 of the Retail Banking Market Investigation Order 2017. It requires a Transaction History sent within 40 days of closure, opt-out by default. Against that requirement, on the dates the regulator published: NatWest Group ran an opt-in process and 903 former Bó customers did not receive one. The letter records the breach; it does not say what the CMA concluded about intent or competence, and neither does this page.",
          "Aracı doğrudan adlandıralım: 2017 Perakende Bankacılık Piyasası Soruşturması Emri'nin 20.6.2 Maddesi. Bu madde, kapanıştan 40 gün içinde, varsayılan olarak opt-out esasına göre bir Hesap Hareketleri dökümü gönderilmesini gerektirir. Bu gerekliliğe karşı, düzenleyicinin yayınladığı tarihlerde: NatWest Group bir opt-in süreci yürüttü ve 903 eski Bó müşterisi bu dökümü almadı. Mektup ihlali kayda geçiriyor; CMA'nın niyet ya da yeterlilik hakkında ne sonuca vardığını söylemiyor, bu sayfa da söylemiyor.",
        ],
        restsOn: ["The CMA publishes a letter recording a breach"],
      }),
    ],
  }),
  note({
    key: "note-day605",
    day: 605,
    body: [
      "Worth saying, because it rarely gets said about neobanks generally: running a retail digital bank at any real scale is hard in ways that have nothing to do with strategy. New account opening is one of the first things fraudsters test against any new digital bank. A retail product aimed at mass adoption needs servicing infrastructure, statements, transaction histories, complaints handling, built to handle volume correctly from day one, not bolted on afterward. That weight is a real part of what building a proper digital challenger costs, on top of the technology itself.",
      "Söylemeye değer, çünkü genel olarak neobankalar hakkında nadiren söylenir: bir perakende dijital bankayı gerçek bir ölçekte yürütmek, stratejiyle hiçbir ilgisi olmayan şekillerde zordur. Yeni hesap açma, dolandırıcıların herhangi bir yeni dijital bankaya karşı ilk test ettiği şeylerden biridir. Kitlesel benimsemeyi hedefleyen bir perakende ürünü, sonradan eklenmek yerine ilk günden itibaren hacmi doğru şekilde kaldıracak şekilde kurulmuş servis altyapısına, hesap özetlerine, hesap hareketleri dökümlerine, şikâyet yönetimine ihtiyaç duyar. Bu yük, teknolojinin kendisinin üzerine, düzgün bir dijital meydan okuyucu kurmanın gerçek bir maliyet parçasıdır.",
    ],
  }),
];

const lastDayEpisodeDoc = {
  _id: "lastDayEpisode-01-bo",
  _type: "lastDayEpisode",
  format: { _type: "reference", _ref: lastDayFormatDoc._id },
  number: 1,
  slug: {
    _type: "localeSlug",
    en: { _type: "slug", current: "01-bo" },
    tr: { _type: "slug", current: "01-bo" },
  },
  subject: "Bó",
  parent: "NatWest Group plc",
  market: "United Kingdom",
  dayZero: "2019-11-27",
  dayLast: "2020-05-01",
  standfirst: lt(
    "A hundred million pounds and eighteen months to build. Eleven thousand four hundred and thirteen customers when it closed. And one regulatory filing that surfaced a year later, which none of the press coverage at the time had.",
    "Yüz milyon sterlin ve on sekiz aylık bir inşa süreci. Kapandığında on bir bin dört yüz on üç müşteri. Ve bir yıl sonra ortaya çıkan, dönemin hiçbir basın haberinde olmayan bir düzenleyici başvuru.",
  ),
  publishedAt: new Date().toISOString().slice(0, 10),
  evidenceTakenAt: new Date().toISOString().slice(0, 10),
  lastCheckedAt: new Date().toISOString().slice(0, 10),
  teaserFigure: ls("156 DAYS", "156 GÜN"),
  teaserLine: lt(
    "A hundred million pounds and eighteen months to build. Eleven thousand four hundred and thirteen customers when it closed. And one regulatory filing that surfaced a year later, which none of the press coverage at the time had.",
    "Yüz milyon sterlin ve on sekiz aylık bir inşa süreci. Kapandığında on bir bin dört yüz on üç müşteri. Ve bir yıl sonra ortaya çıkan, dönemin hiçbir basın haberinde olmayan bir düzenleyici başvuru.",
  ),
  blocks: episodeBlocks,
};

async function main() {
  await Promise.all([
    client.createOrReplace(sparkSectionDoc),
    client.createOrReplace(lastDayFormatDoc),
    client.createOrReplace(lastDayEpisodeDoc),
  ]);
  console.log("Seeded sparkSection, lastDayFormat (the-last-day), lastDayEpisode (01-bo).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
