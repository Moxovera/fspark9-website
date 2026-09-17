/**
 * Tek seferlik seed script — Spark bölümü.
 *
 * Revizyon v2 (Spark section revision brief v2, 17 Eylül 2026):
 * lastDayFormat/lastDayEpisode → sparkFormat/sparkEpisode (bkz. o
 * dosyaların yorumları). Format 02 BİLEREK bir doküman DEĞİL — mevcut
 * sabit "coming soon" satırı, kendi kararı ayrı gelene kadar veri
 * katmanına hiç girmiyor.
 *
 * TÜM kopya brief'in §3'ündeki tabloyla BİREBİR aynı — hiçbir cümle
 * parafraz edilmedi. Em dash/en dash HİÇBİR YERDE yok (brief'in ev
 * kuralı) — bölüm gövdesindeki anlatı bu geçişte virgül/nokta ile
 * yeniden yazıldı.
 *
 * §3'teki çakışan alanlar (hub eyebrow/title/purposeLine, format
 * subjectLine/whatIsInside/statusLine/hero.intro/hookLabel, episode
 * hook) burada YENİDEN YAZILMIYOR — content/en.ts ve content/tr.ts
 * içindeki `sparkCopy`'den import ediliyor. Tek kaynak burası değil,
 * o dosyalar; seed bu sabitleri Sanity'ye taşıyan tek yer. Sürüklenmeyi
 * yakalamak için scripts/check-spark-drift.ts, seedden sonra Sanity'yi
 * aynı `sparkCopy` sabitleriyle karşılaştırır.
 *
 * Gün sayıları (156 days, 11,413, 903 vb.) hâlâ launchDate/closureDate
 * ya da statik gerçeklerden geliyor, hiçbiri stat highlight'lar
 * DIŞINDA bir "dayCount" alanına YAZILMADI (bkz. dayMath.ts).
 *
 * Çalıştırma:
 *   SANITY_API_WRITE_TOKEN=... npm run seed:spark
 */
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";
import { sparkCopy as sparkCopyEn } from "../content/en";
import { sparkCopy as sparkCopyTr } from "../content/tr";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token with Editor access in " +
      "sanity.io/manage → API → Tokens, then run again with " +
      "SANITY_API_WRITE_TOKEN=... npm run seed:spark",
  );
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

function key() {
  return randomUUID();
}

function ls(en: string, tr: string) {
  return { _type: "localeString" as const, en, tr };
}

function lt(en: string, tr: string) {
  return { _type: "localeText" as const, en, tr };
}

// ─────────────────────────────────────────────
// Hub · sparkSection
// ─────────────────────────────────────────────

const sparkSectionDoc = {
  _id: "sparkSection",
  _type: "sparkSection",
  title: "Spark Section",
  hero: {
    _type: "pageHero",
    eyebrow: ls(sparkCopyEn.hub.eyebrow, sparkCopyTr.hub.eyebrow),
    title: ls(sparkCopyEn.hub.title, sparkCopyTr.hub.title),
    intro: lt(sparkCopyEn.hub.purposeLine, sparkCopyTr.hub.purposeLine),
  },
  // build prompt'ta bu tam ifade verilmedi — ana sayfa modülünün link
  // etiketi olarak makul bir varsayılan. Uncertainty list'te.
  homeLinkLabel: ls("Explore Spark", "Spark'ı keşfedin"),
  comingSoonLabel: ls("Coming Soon", "Çok Yakında"),
};

// ─────────────────────────────────────────────
// Format 01 · sparkFormat (The Last Day)
// ─────────────────────────────────────────────

const sparkFormatDoc = {
  _id: "sparkFormat-the-last-day",
  _type: "sparkFormat",
  number: 1,
  name: ls(sparkCopyEn.formatOne.name, sparkCopyTr.formatOne.name),
  slug: {
    _type: "localeSlug",
    en: { _type: "slug", current: "the-last-day" },
    tr: { _type: "slug", current: "son-gun" },
  },
  subjectLine: lt(sparkCopyEn.formatOne.subjectLine, sparkCopyTr.formatOne.subjectLine),
  whatIsInside: lt(sparkCopyEn.formatOne.whatIsInside, sparkCopyTr.formatOne.whatIsInside),
  status: "live",
  statusLine: lt(sparkCopyEn.formatOne.statusLine, sparkCopyTr.formatOne.statusLine),
  orderRank: 1,
  hero: {
    _type: "pageHero",
    eyebrow: ls(sparkCopyEn.hub.title, sparkCopyTr.hub.title),
    title: ls(sparkCopyEn.formatOne.name, sparkCopyTr.formatOne.name),
    intro: lt(sparkCopyEn.lastDayList.purposeLine, sparkCopyTr.lastDayList.purposeLine),
  },
  hookLabel: ls(sparkCopyEn.lastDayList.readLink, sparkCopyTr.lastDayList.readLink),
  // Türkçe sayı sonrası çoğul eki almıyor ("1 gün" / "156 gün") — bu
  // tahmin değil, dilin kuralı.
  dayCountSingular: ls("day", "gün"),
  dayCountPlural: ls("days", "gün"),
  dayLabel: ls("DAY", "GÜN"),
  dayNotEstablishedLabel: ls("not established", "belirlenemedi"),
  noteLabel: ls("fspark9 · Note", "fspark9 · Not"),
};

// ─────────────────────────────────────────────
// Episode 01 · sparkEpisode (Bó) — serbest biçimli gövde
// ─────────────────────────────────────────────

type Part = string | { text: string; link?: string; bold?: boolean };

function block(style: "normal" | "h2" | "h3" | "blockquote", parts: Part[]) {
  const markDefs: { _type: "link"; _key: string; href: string }[] = [];
  const children = parts.map((part) => {
    if (typeof part === "string") {
      return { _type: "span" as const, _key: key(), text: part, marks: [] as string[] };
    }
    const marks: string[] = [];
    if (part.bold) marks.push("strong");
    if (part.link) {
      const markKey = key();
      markDefs.push({ _type: "link" as const, _key: markKey, href: part.link });
      marks.push(markKey);
    }
    return { _type: "span" as const, _key: key(), text: part.text, marks };
  });
  return { _type: "block" as const, _key: key(), style, children, markDefs };
}

function stat(figure: string, caption?: string) {
  return { _type: "statHighlight" as const, _key: key(), figure, caption };
}

function note(body: string) {
  return { _type: "noteHighlight" as const, _key: key(), body };
}

const FINEXTRA = "https://www.finextra.com/newsarticle/34850/natwest-launches-digital-challenger-b";
const CITY_AM = "https://www.cityam.com/rbs-under-fire-over-fake-reviews-for-new-app/";
const FINTECH_FUTURES =
  "https://www.fintechfutures.com/challenger-banks/rbs-neobank-b-reissues-cards-due-to-authentication-issue";
const TECHCRUNCH = "https://techcrunch.com/2020/05/01/bo-shutter/";
const COMPUTER_WEEKLY =
  "https://www.computerweekly.com/news/252482560/NatWest-Bank-shutters-its-app-based-bank-after-five-months";
const CMA_LETTER =
  "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/995345/Public_letter_to_NatWest_2021__.pdf";

// Her gerçek, tarih, rakam ve alıntı build prompt'un content spine'ından
// birebir alındı. Doğrulanmamış ön-tarih (Mart/Eylül 2018) olayları ve
// resmi "gap" aparatı bilinçli olarak anlatıdan çıkarıldı. Em dash/en
// dash YOK, hepsi virgül/nokta ile yeniden yazıldı (revizyon v2 ev kuralı).
const bodyEn = [
  block("h2", ["The launch"]),
  block("normal", [
    "Bó launched publicly on 27 November 2019, following employee beta testing, on the App Store and Google Play (",
    { text: "Finextra", link: FINEXTRA },
    "). It was a cloud based product with its own Faster Payments connection, operating on parent RBS Group's banking licence rather than a separate one, with a yellow Visa debit card. Reported to be 18 months in development against a reported £100m budget, with Mark Bailie as Chief Executive and the brand built by Accenture Interactive. The slogan was \"Do Money Better\".",
  ]),
  stat("156 DAYS", "From launch to the day the closure was announced."),
  block("normal", [
    "Operating under the parent's banking licence removed the licensing timeline and cost. In exchange, the product inherited RBS's compliance surface, incident process and audit trail. That is a trade with a shape, not a mistake and not something any rule forced.",
  ]),
  note(
    "A high street bank and a digital-first challenger are not solving the same problem with different branding. They are running different operating models, and the gap between them shows up in places that are easy to underrate from the outside. Speed of the kind these products need is not a feature you add later. It is closer to an organisational habit, and habits built for a different kind of banking do not transfer quickly.",
  ),
  block("normal", [
    "In the days around launch, App Store reviews dated before the public availability date were spotted by users and press. Some were later reported to match the names of RBS employees. RBS confirmed that around 2,800 people, including staff, had taken part in a pre launch trial programme (",
    { text: "City AM", link: CITY_AM },
    ").",
  ]),
  block("blockquote", [
    "We test our products, including with staff, before they are available to our customers and use feedback from the pilots to improve the services and products we offer.",
  ]),
  block("normal", ["RBS spokesperson, as reported by City AM."]),
  block("normal", [
    "Pre launch trial programmes are standard practice. What turned this into a visible problem was sequencing, not the practice itself: the reviews appeared in the same public feed as day one customers' reviews, with nothing marking the difference between the two.",
  ]),
  block("h2", ["The card reissue"]),
  block("normal", [
    "By 3 January 2020, a compliance cut off for Strong Customer Authentication under PSD2 meant every card issued before that date had to be replaced. On 5 February 2020, it was reported that 6,000 customer cards were being reissued (",
    { text: "FinTech Futures", link: FINTECH_FUTURES },
    ").",
  ]),
  block("blockquote", [
    "If you opened an account after 3 January, you will automatically have been sent a card that is compliant with the new legislation. Cards issued before 3 January but which are still in use will be deactivated on 14 March.",
  ]),
  block("normal", ["Clair Whitefield, Bó's editor in chief."]),
  block("normal", [
    "Those cards were deactivated as scheduled on 14 March 2020, day 108 of the product's life. The rule did something concrete and unavoidable: every card issued before the line had to be replaced after it, and each replacement was a re activation event landing on a customer who had only just onboarded.",
  ]),
  note(
    "This is what that habit costs in practice. A compliance deadline landing three months into a product's life is not a technical problem, it is an operational one, and how fast an organisation can turn a card estate over is decided long before the deadline exists.",
  ),
  block("normal", [
    "What that reissue cost in customers was never published. The public record carries no figure for it, only the total at closure. Mark Bailie's departure from the Chief Executive role was also announced around this time, though the exact date was never made public.",
  ]),
  block("h2", ["The closure"]),
  block("normal", [
    "On 1 May 2020, day 156, NatWest Group announced Bó's closure alongside its Q1 2020 results (",
    { text: "TechCrunch", link: TECHCRUNCH },
    ", ",
    { text: "Computer Weekly", link: COMPUTER_WEEKLY },
    "). Customers were given 60 days to withdraw their funds, and staff were transferred to Mettle, the parent's business banking product, named here only as the destination of that transfer, with no comment on its current state or offering.",
  ]),
  stat("11,413", "Customers on the books when Bó closed."),
  block("normal", [
    "No rule closed Bó. There was no supervisory action, no enforcement, no licence problem, no insolvency. The PSD2 reissue was a rule doing something concrete and expensive to a young card estate, but it was not what ended the product. Holding those two apart is the point of this episode.",
  ]),
  note(
    "Retail digital banking in the UK was already crowded by 2019, several funded challengers fighting for the same customer, all spending heavily to acquire them. SME banking asks for a different set of capabilities: credit assessment, lending relationships, compliance infrastructure at scale, the kind of thing a traditional bank has usually spent decades building. Redirecting technology and people toward the segment where an incumbent's existing strengths actually apply, rather than continuing to compete on the challengers' terms, is a reasonable capital allocation call. Some traditional banks are simply better positioned to build a strong SME digital offer than a strong retail one, and that is a fair thing for an incumbent to conclude about itself.",
  ),
  block("h2", ["What came after"]),
  block("normal", [
    "More than a year later, on 22 June 2021, the Competition and Markets Authority wrote a public letter to NatWest Group recording a breach of Article 20.6.2 of the Retail Banking Market Investigation Order 2017 (",
    { text: "CMA public letter", link: CMA_LETTER },
    "). The Order requires a Transaction History to be sent within 40 days of a personal current account closing, on an opt out basis. NatWest Group had run this on an opt in basis for former Bó customers, and as a result did not send one to 903 of them. The breach ran from 14 November 2019 to 1 May 2020. NatWest Group notified the CMA of it on 29 January 2021, as part of its 2020 annual compliance report.",
  ]),
  stat("903", "Former Bó customers who did not receive a transaction history they were owed."),
  note(
    "Worth saying, because it rarely gets said about neobanks generally: running a retail digital bank at any real scale is hard in ways that have nothing to do with strategy. New account opening is one of the first things fraudsters test against any new digital bank. A retail product aimed at mass adoption needs servicing infrastructure, statements, transaction histories, complaints handling, built to handle volume correctly from day one, not bolted on afterward. That weight is a real part of what building a proper digital challenger costs, on top of the technology itself.",
  ),
];

const bodyTr = [
  block("h2", ["Lansman"]),
  block("normal", [
    "Bó, çalışan beta testinin ardından 27 Kasım 2019'da App Store ve Google Play üzerinden halka açık olarak yayına girdi (",
    { text: "Finextra", link: FINEXTRA },
    "). Kendi Faster Payments bağlantısına sahip, ayrı bir bankacılık lisansı yerine ana şirket RBS Group'un lisansı altında çalışan bulut tabanlı bir üründü, sarı bir Visa banka kartıyla. Bildirildiğine göre 18 aylık bir geliştirme süreci ve bildirilen 100 milyon sterlinlik bir bütçe vardı. Mark Bailie Genel Müdür'dü ve marka Accenture Interactive tarafından kuruldu. Slogan \"Do Money Better\" idi.",
  ]),
  stat("156 GÜN", "Lansmandan kapanış duyurusuna kadar geçen süre."),
  block("normal", [
    "Ana şirketin bankacılık lisansı altında çalışmak, lisanslama süresini ve maliyetini ortadan kaldırdı. Karşılığında ürün, RBS'in uyum yüzeyini, olay sürecini ve denetim izini devraldı. Bu, şekli olan bir takas, ne bir hata ne de bir kuralın zorunlu kıldığı bir şey.",
  ]),
  note(
    "Bir şubeli banka ile dijital öncelikli bir meydan okuyucu, aynı sorunu farklı bir markalamayla çözmüyor. Farklı işletim modelleri yürütüyorlar, ve aralarındaki fark, dışarıdan bakınca hafife alınması kolay yerlerde ortaya çıkıyor. Bu tür ürünlerin ihtiyaç duyduğu hız, sonradan eklenen bir özellik değildir. Kurumsal bir alışkanlığa daha yakındır, ve farklı bir bankacılık türü için kurulmuş alışkanlıklar hızlı aktarılmaz.",
  ),
  block("normal", [
    "Lansmanın olduğu günlerde, halka açılış tarihinden önceki tarihleri taşıyan App Store yorumları kullanıcılar ve basın tarafından fark edildi. Bazılarının, daha sonra bildirildiğine göre, RBS çalışanlarının isimleriyle eşleştiği görüldü. RBS, personel dahil yaklaşık 2.800 kişinin bir lansman öncesi deneme programına katıldığını doğruladı (",
    { text: "City AM", link: CITY_AM },
    ").",
  ]),
  block("blockquote", [
    "Müşterilerimize sunulmadan önce ürünlerimizi, personel dahil olmak üzere test ediyoruz ve sunduğumuz hizmet ve ürünleri geliştirmek için pilot programlardan gelen geri bildirimleri kullanıyoruz.",
  ]),
  block("normal", ["RBS sözcüsü, City AM'e göre."]),
  block("normal", [
    "Lansman öncesi deneme programları standart bir uygulamadır. Normal bir uygulamayı görünür bir soruna dönüştüren şey, uygulamanın kendisi değil sıralamaydı: yorumlar, ikisini ayıran hiçbir işaret olmadan, birinci gün müşterilerinin yorumlarıyla aynı halka açık akışta göründü.",
  ]),
  block("h2", ["Kart yeniden verme"]),
  block("normal", [
    "3 Ocak 2020 itibarıyla, PSD2 kapsamındaki Güçlü Müşteri Kimlik Doğrulaması için bir uyum kesim tarihi, bu tarihten önce çıkarılan her kartın değiştirilmesi gerektiği anlamına geliyordu. 5 Şubat 2020'de, 6.000 müşteri kartının yeniden verilmekte olduğu bildirildi (",
    { text: "FinTech Futures", link: FINTECH_FUTURES },
    ").",
  ]),
  block("blockquote", [
    "3 Ocak'tan sonra hesap açtıysanız, otomatik olarak yeni mevzuata uyumlu bir kart gönderilmiş olacak. 3 Ocak'tan önce çıkarılan ama hâlâ kullanılan kartlar 14 Mart'ta devre dışı bırakılacak.",
  ]),
  block("normal", ["Clair Whitefield, Bó'nun yayın yönetmeni."]),
  block("normal", [
    "Bu kartlar, planlandığı gibi 14 Mart 2020'de, ürünün hayatının 108. gününde, devre dışı bırakıldı. Kural somut ve kaçınılmaz bir şey yaptı: kesim tarihinden önce çıkarılan her kart sonrasında değiştirilmek zorundaydı, ve her değişim, daha yeni katılım sağlamış bir müşteriye düşen bir yeniden etkinleştirme olayıydı.",
  ]),
  note(
    "Bu alışkanlığın pratikte maliyeti işte bu. Bir ürünün hayatının üçüncü ayına denk gelen bir uyum son tarihi teknik bir sorun değil, operasyonel bir sorundur; bir kuruluşun bir kart stoğunu ne kadar hızlı devredebileceği, son tarih var olmadan çok önce belirlenir.",
  ),
  block("normal", [
    "Bu yeniden verme işleminin müşteri açısından maliyeti hiç yayınlanmadı. Kamuya açık kayıt, kapanıştaki toplam dışında bir rakam taşımıyor. Mark Bailie'nin Genel Müdürlük görevinden ayrılışı da bu sıralarda duyuruldu, ama tam tarihi hiç kamuya açıklanmadı.",
  ]),
  block("h2", ["Kapanış"]),
  block("normal", [
    "1 Mayıs 2020'de, 156. günde, NatWest Group, Bó'nun kapanışını Ç1 2020 sonuçlarıyla birlikte duyurdu (",
    { text: "TechCrunch", link: TECHCRUNCH },
    ", ",
    { text: "Computer Weekly", link: COMPUTER_WEEKLY },
    "). Müşterilere fonlarını çekmeleri için 60 gün süre tanındı, ve personel ana şirketin işletme bankacılığı ürünü olan Mettle'a transfer edildi, burada yalnızca bu transferin hedefi olarak anılıyor, mevcut durumu ya da teklifi hakkında herhangi bir yorum yapılmıyor.",
  ]),
  stat("11.413", "Bó kapandığında kayıtlı müşteri sayısı."),
  block("normal", [
    "Bó'yu hiçbir kural kapatmadı. Herhangi bir denetim önlemi, yaptırım, lisans sorunu ya da iflas yoktu. PSD2 yeniden verme işlemi, genç bir kart stoğuna somut ve maliyetli bir şey yapan bir kuraldı, ama ürünü kapatan bu değildi. Bu ikisini birbirinden ayrı tutmak bu bölümün asıl meselesi.",
  ]),
  note(
    "2019 itibarıyla İngiltere'de perakende dijital bankacılık zaten kalabalıktı; aynı müşteri için mücadele eden, onu kazanmak için ağır harcama yapan birçok fonlanmış meydan okuyucu vardı. KOBİ bankacılığı ise farklı bir yetenek setini gerektirir: kredi değerlendirmesi, kredi ilişkileri, ölçekte uyum altyapısı, geleneksel bir bankanın genellikle on yıllar boyunca inşa ettiği türden şeyler. Teknolojiyi ve insanları, meydan okuyucuların şartlarında rekabet etmeye devam etmek yerine, yerleşik bir oyuncunun mevcut güçlü yanlarının gerçekten geçerli olduğu segmente yönlendirmek, makul bir sermaye tahsisi kararıdır. Bazı geleneksel bankalar, güçlü bir perakende teklifi kurmaktan çok, güçlü bir KOBİ dijital teklifi kurmak için daha iyi konumdadır, ve bir yerleşik oyuncunun kendisi hakkında bu sonuca varması adil bir şeydir.",
  ),
  block("h2", ["Sonrasında olanlar"]),
  block("normal", [
    "Bir yıldan fazla bir süre sonra, 22 Haziran 2021'de, Rekabet ve Piyasalar Kurumu (CMA), NatWest Group'a yazdığı kamuya açık bir mektupla 2017 Perakende Bankacılık Piyasası Soruşturması Emri'nin 20.6.2 Maddesi'nin ihlal edildiğini kayda geçirdi (",
    { text: "CMA'nın kamuya açık mektubu", link: CMA_LETTER },
    "). Emir, bir Hesap Hareketleri dökümünün, bir bireysel cari hesap kapandıktan sonra 40 gün içinde, opt out esasına göre gönderilmesini gerektiriyor. NatWest Group, eski Bó müşterileri için bunu opt in esasına göre yürütmüştü ve bunun sonucunda 903 kişiye bu döküm gönderilmedi. İhlal 14 Kasım 2019'dan 1 Mayıs 2020'ye kadar sürdü. NatWest Group bunu CMA'ya 29 Ocak 2021'de, 2020 yıllık uyum raporunun bir parçası olarak bildirdi.",
  ]),
  stat("903", "Hak ettikleri hesap hareketleri dökümünü almayan eski Bó müşterisi sayısı."),
  note(
    "Söylemeye değer, çünkü genel olarak neobankalar hakkında nadiren söylenir: bir perakende dijital bankayı gerçek bir ölçekte yürütmek, stratejiyle hiçbir ilgisi olmayan şekillerde zordur. Yeni hesap açma, dolandırıcıların herhangi bir yeni dijital bankaya karşı ilk test ettiği şeylerden biridir. Kitlesel benimsemeyi hedefleyen bir perakende ürünü, sonradan eklenmek yerine ilk günden itibaren hacmi doğru şekilde kaldıracak şekilde kurulmuş servis altyapısına, hesap özetlerine, hesap hareketleri dökümlerine, şikâyet yönetimine ihtiyaç duyar. Bu yük, teknolojinin kendisinin üzerine, düzgün bir dijital meydan okuyucu kurmanın gerçek bir maliyet parçasıdır.",
  ),
];

const sparkEpisodeDoc = {
  _id: "sparkEpisode-01-bo",
  _type: "sparkEpisode",
  format: { _type: "reference", _ref: sparkFormatDoc._id },
  number: 1,
  slug: {
    _type: "localeSlug",
    en: { _type: "slug", current: "01-bo" },
    tr: { _type: "slug", current: "01-bo" },
  },
  subject: "Bó",
  parent: "NatWest Group plc",
  country: "United Kingdom",
  launchDate: "2019-11-27",
  closureDate: "2020-05-01",
  standfirst: lt(
    "A hundred million pounds and eighteen months to build. Eleven thousand four hundred and thirteen customers when it closed. And one regulatory filing that surfaced a year later, which none of the press coverage at the time had.",
    "Yüz milyon sterlin ve on sekiz aylık bir inşa süreci. Kapandığında on bir bin dört yüz on üç müşteri. Ve bir yıl sonra ortaya çıkan, dönemin hiçbir basın haberinde olmayan bir düzenleyici başvuru.",
  ),
  // Brief §3 tablosundaki tam kopya — hem liste sayfasındaki tek satır
  // hem de ana sayfadaki "the spark" teaser'ı için tek kaynak.
  hook: lt(sparkCopyEn.lastDayList.episodeOneHook, sparkCopyTr.lastDayList.episodeOneHook),
  status: "published",
  publishedAt: new Date().toISOString().slice(0, 10),
  evidenceTakenAt: new Date().toISOString().slice(0, 10),
  lastCheckedAt: new Date().toISOString().slice(0, 10),
  body: {
    _type: "localeBody",
    en: bodyEn,
    tr: bodyTr,
  },
};

async function main() {
  await Promise.all([
    client.createOrReplace(sparkSectionDoc),
    client.createOrReplace(sparkFormatDoc),
    client.createOrReplace(sparkEpisodeDoc),
  ]);
  // Eski lastDayFormat/lastDayEpisode dokümanları (revizyon v1'den
  // kalan) temizleniyor — şema artık bu _type'ları tanımıyor, döküman
  // olarak kalmaları orphan veri bırakır.
  await client.delete("lastDayFormat-the-last-day").catch(() => undefined);
  await client.delete("lastDayEpisode-01-bo").catch(() => undefined);
  console.log("Seeded sparkSection, sparkFormat (the-last-day), sparkEpisode (01-bo).");
  console.log("Removed legacy lastDayFormat/lastDayEpisode documents, if present.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
