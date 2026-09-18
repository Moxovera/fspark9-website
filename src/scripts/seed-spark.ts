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
 * subjectLine/whatIsInside/statusLineSingular/Plural/hero.intro/
 * hookLabel, episode hook) burada YENİDEN YAZILMIYOR — content/en.ts ve
 * content/tr.ts içindeki `sparkCopy`'den import ediliyor. Tek kaynak burası değil,
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
  statusLineSingular: ls(sparkCopyEn.formatOne.statusLineSingular, sparkCopyTr.formatOne.statusLineSingular),
  statusLinePlural: ls(sparkCopyEn.formatOne.statusLinePlural, sparkCopyTr.formatOne.statusLinePlural),
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
  // Final interaction brief (17 Eylül 2026) — mekanik kelime dağarcığı.
  // "A rule forced this" / "Someone decided this" orijinal Faz 1
  // brief'inden birebir; eşleşme/eşleşmeme metinleri final brief'ten
  // birebir (brief sadece uyumsuzluk ve unsettled için tam metin verdi,
  // eşleşme metnini ben yazdım, uncertainty list'te işaretli).
  recordLabel: ls("RECORD", "KAYIT"),
  readingLabel: ls("READING", "OKUMA"),
  gapLabel: ls("GAP", "BOŞLUK"),
  // Orijinal Faz 1 brief altı yeni mekanik için TR karşılığı vermedi
  // (sadece RECORD/READING/GAP için verdi) — bunlar kendi çevirim,
  // uncertainty list'te işaretli.
  callLabel: ls("THE CALL", "KARAR"),
  estimateLabel: ls("THE ESTIMATE", "SAYI TAHMİNİ"),
  weighLabel: ls("THE WEIGH", "TARTI"),
  signalLabel: ls("THE SIGNAL", "SİNYAL"),
  secondOpinionLabel: ls("THE SECOND OPINION", "İKİNCİ GÖRÜŞ"),
  allocationLabel: ls("THE ALLOCATION", "DAĞILIM"),
  callOptionRuleLabel: ls("A rule forced this", "Bunu bir kural zorladı"),
  callOptionDecisionLabel: ls("Someone decided this", "Bunu biri kararlaştırdı"),
  callMatchLabel: ls("Your call matches the record.", "Tahmininiz kayıtla eşleşiyor."),
  callMismatchLabel: ls("The record went the other way.", "Kayıt başka yöne gitti."),
  callUnsettledLabel: ls("The record does not settle this.", "Kayıt bunu netleştirmiyor."),
  estimateHeldLabel: lt(
    "Held until the record opens on the last day.",
    "Kayıt son günde açılana kadar tutuluyor.",
  ),
  correctionInviteLabel: ls(
    "This is a standing invitation to correct the record.",
    "Bu, kaydı düzeltmek için açık bir davettir.",
  ),
  allocationCommitLabel: ls("Lock in this split", "Bu dağılımı kilitle"),
  ledgerToggleLabel: ls("Show the record only", "Sadece kaydı göster"),
  expertNotesHeading: ls("Expert Notes", "Uzman Notları"),
  expertNotesSignature: ls("Mehmet Burak Dikmen, fspark9", "Mehmet Burak Dikmen, fspark9"),
  scorecardHeading: ls("Your scorecard", "Puan durumunuz"),
  scorecardUnansweredLabel: ls("Not answered yet.", "Henüz yanıtlanmadı."),
  scorecardYourReadingLabel: ls("your reading", "sizin okumanız"),
  scorecardCrossEpisodeLabel: ls("answers across your episodes", "bölümler arası cevap"),
  scorecardShareLabel: ls("Share your pattern", "Kendi deseninizi paylaşın"),
  scorecardCopiedLabel: ls("Copied", "Kopyalandı"),
  scorecardPrivacyLine: ls(
    "Nothing here was sent anywhere. All of it lives in this browser.",
    "Buradan hiçbir şey gönderilmedi. Hepsi bu tarayıcıda duruyor.",
  ),
};

// ─────────────────────────────────────────────
// Episode 01 · sparkEpisode (Bó) — Record/Reading/Gap + altı mekanik
// ─────────────────────────────────────────────
//
// Final interaction brief (17 Eylül 2026), kullanıcının açık onayıyla:
// serbest biçimli gövde yerini `blocks`'a bıraktı. §3'teki yeni,
// kaynaklı kayıtlar eklendi (Bailie day056/079, Purdue day146),
// tarihsiz CEO gap'i kaldırıldı, yerine tarihli bir çelişki gap'i
// geldi. §2 gereği HİÇBİR bloğun elle girilmiş bir "day" alanı yok —
// sadece `date`, gün numarası DayMeasure/dayMath.ts'te render zamanında
// hesaplanıyor.
//
// CMA mektubu (day605) hakkında bilinçli bir karar: final brief'in §6
// akışı bundan hiç bahsetmiyor, ama episode'un standfirst'ü ("one
// regulatory filing that surfaced a year later, which none of the
// press coverage at the time had") doğrudan bunu vaat ediyor, VE
// brief'in kendi "Ten interactive moments" sayımı (4 Call + 2 Estimate
// anı + Weigh + Signal + SecondOpinion + Allocation = 10) CMA için
// yeni bir Call EKLENMEDEN tam tutuyor. Bu yüzden CMA kaydı KALDI ama
// orijinal brief'teki Call 7 sarmalayıcısı olmadan, düz bir Record +
// Reading + Gap olarak, akışın en sonunda (day605, kronolojik olarak
// gerçekten en son). Bkz. handback'teki uncertainty notu.

function inlineReading(heading: ReturnType<typeof ls>, body: ReturnType<typeof lt>) {
  return { _type: "sparkInlineReading" as const, _key: key(), heading, body };
}

function inlineGap(
  heading: ReturnType<typeof ls>,
  body: ReturnType<typeof lt>,
  whereItWouldBe?: ReturnType<typeof ls>,
) {
  return {
    _type: "sparkInlineGap" as const,
    _key: key(),
    heading,
    body,
    whereItWouldBe,
    invitesCorrection: true,
  };
}

const FINEXTRA = "https://www.finextra.com/newsarticle/34850/natwest-launches-digital-challenger-b";
const FINTECH_FUTURES =
  "https://www.fintechfutures.com/challenger-banks/rbs-neobank-b-reissues-cards-due-to-authentication-issue";
const FINTECH_FUTURES_BAILIE =
  "https://www.fintechfutures.com/2020/01/rbs-sees-flurry-of-executives-leave-including-bos-ceo/";
const CNBC = "https://www.cnbc.com/2020/02/14/rbs-profits-beat-expectations-to-rebrand-as-natwest.html";
const SIFTED = "https://sifted.eu/articles/bo-cpo-hire-antler-vc";
// Verdict'in 7 Mayıs 2020 tarihli haberi (ayrılışı Ocak'a yerleştiren
// "daha sonraki rapor") sadece çelişki gap'inin AÇIKLAMASINDA anılıyor,
// kendi source URL'i olan ayrı bir RECORD değil — final brief bunu
// "A later report" diye anıyor, kendi kaydı olacak kadar ayrıntı vermiyor.
// https://www.verdict.co.uk/bo-digital-bank-rbs-natwest/
const TECHCRUNCH = "https://techcrunch.com/2020/05/01/bo-shutter/";
// Computer Weekly kapanışı AYNI GÜN ayrıca haberleştirdi
// (https://www.computerweekly.com/news/252482560/...) — şema tek bir
// `source` alanı taşıyor (çoklu kaynak dizisi değil), bu yüzden burada
// ayrı bir tıklanabilir kaynak olarak eklenmedi, body metninde düz
// yazıyla anılıyor. Uncertainty list'te.
const CMA_LETTER =
  "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/995345/Public_letter_to_NatWest_2021__.pdf";

// Her gerçek, tarih, rakam ve alıntı final interaction brief'ten ya da
// (değişmeyen kısımlar için) daha önce onaylanmış içerikten birebir
// alındı. Em dash/en dash YOK. Her bloğun `date`'i var, hiçbirinin
// elle girilmiş bir "day" alanı YOK (final brief §2).
const episodeBlocks = [
  // Day 000 · launch
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-launch",
    date: "2019-11-27",
    heading: ls("The launch", "Lansman"),
    body: lt(
      "Bó launched publicly on 27 November 2019, following employee beta testing, on the App Store and Google Play. It was a cloud based product with its own Faster Payments connection, operating on parent RBS Group's banking licence rather than a separate one, with a yellow Visa debit card. Reported to be 18 months in development against a reported £100m budget, with Mark Bailie as Chief Executive and the brand built by Accenture Interactive. The slogan was \"Do Money Better\".",
      "Bó, çalışan beta testinin ardından 27 Kasım 2019'da App Store ve Google Play üzerinden halka açık olarak yayına girdi. Kendi Faster Payments bağlantısına sahip, ayrı bir bankacılık lisansı yerine ana şirket RBS Group'un lisansı altında çalışan bulut tabanlı bir üründü, sarı bir Visa banka kartıyla. Bildirildiğine göre 18 aylık bir geliştirme süreci ve bildirilen 100 milyon sterlinlik bir bütçe vardı. Mark Bailie Genel Müdür'dü ve marka Accenture Interactive tarafından kuruldu. Slogan \"Do Money Better\" idi.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("Finextra", "Finextra"),
      url: FINEXTRA,
      kind: "press",
    },
  },

  // Day 000 · THE ESTIMATE 1 (held)
  {
    _type: "sparkEstimate" as const,
    _key: key(),
    blockId: "estimate-customers",
    date: "2019-11-27",
    prompt: lt(
      "The reported build cost was more than a hundred million pounds, and 170 people ran it. Before you scroll, how many customers do you think it had on its last day?",
      "Raporlanan yapım maliyeti yüz milyon sterlinin üzerinde ve 170 kişi çalıştırıyordu. Devam etmeden önce, son gününde kaç müşterisi vardı sizce?",
    ),
    brackets: [
      { _key: key(), label: ls("Under 10,000", "10.000'in altında"), min: 0, max: 9999 },
      { _key: key(), label: ls("10,000 to 50,000", "10.000 ile 50.000 arası"), min: 10000, max: 49999 },
      { _key: key(), label: ls("50,000 to 250,000", "50.000 ile 250.000 arası"), min: 50000, max: 249999 },
      {
        _key: key(),
        label: ls("250,000 to 1 million", "250.000 ile 1 milyon arası"),
        min: 250000,
        max: 999999,
      },
      { _key: key(), label: ls("Over 1 million", "1 milyonun üzerinde"), min: 1000000, max: null },
    ],
  },

  // Day 000 · THE CALL 1
  {
    _type: "sparkCall" as const,
    _key: key(),
    blockId: "call-licence",
    date: "2019-11-27",
    prompt: lt(
      "A bank launches a standalone digital brand on its own banking licence rather than applying for a separate one. Rule, or decision?",
      "Bir banka, ayrı bir lisans başvurusu yapmak yerine kendi bankacılık lisansı üzerinde bağımsız bir dijital marka başlatıyor. Kural mı, karar mı?",
    ),
    answer: "decision",
    reveal: [
      inlineReading(
        ls("A trade with a shape", "Şekli olan bir takas"),
        lt(
          "Operating under the parent's banking licence removed the licensing timeline and cost. In exchange, the product inherited RBS's compliance surface, incident process and audit trail. That is a trade with a shape, not a mistake and not something any rule forced.",
          "Ana şirketin bankacılık lisansı altında çalışmak, lisanslama süresini ve maliyetini ortadan kaldırdı. Karşılığında ürün, RBS'in uyum yüzeyini, olay sürecini ve denetim izini devraldı. Bu, şekli olan bir takas, ne bir hata ne de bir kuralın zorunlu kıldığı bir şey.",
        ),
      ),
    ],
  },

  // Day 037 · PSD2 compliance cut off
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-psd2-cutoff",
    date: "2020-01-03",
    heading: ls("The compliance cut off", "Uyum kesim tarihi"),
    body: lt(
      "The compliance cut off date for Strong Customer Authentication under PSD2. Cards issued after this date were compliant with the incoming requirement. Cards issued before it were to be deactivated on 14 March 2020.",
      "PSD2 kapsamındaki Güçlü Müşteri Kimlik Doğrulaması için uyum kesim tarihi. Bu tarihten sonra çıkarılan kartlar yeni gereksinimle uyumluydu. Bundan önce çıkarılan kartların 14 Mart 2020'de devre dışı bırakılması planlandı.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("FinTech Futures", "FinTech Futures"),
      url: FINTECH_FUTURES,
      kind: "press",
    },
  },

  // Day 070 · 6,000 cards reissued
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-card-reissue",
    date: "2020-02-05",
    heading: ls("Six thousand cards reissued", "Altı bin kart yeniden veriliyor"),
    body: lt(
      "Reported that 6,000 customer cards were being reissued, for compliance with PSD2 and Strong Customer Authentication.",
      "PSD2 ve Güçlü Müşteri Kimlik Doğrulaması uyumu için 6.000 müşteri kartının yeniden verilmekte olduğu bildirildi.",
    ),
    quote: lt(
      "If you opened an account after 3 January, you will automatically have been sent a card that is compliant with the new legislation. Cards issued before 3 January but which are still in use will be deactivated on 14 March.",
      "3 Ocak'tan sonra hesap açtıysanız, otomatik olarak yeni mevzuata uyumlu bir kart gönderilmiş olacak. 3 Ocak'tan önce çıkarılan ama hâlâ kullanılan kartlar 14 Mart'ta devre dışı bırakılacak.",
    ),
    quoteAttribution: ls("Clair Whitefield, Bó's editor in chief.", "Clair Whitefield, Bó'nun yayın yönetmeni."),
    source: {
      _type: "sparkSource" as const,
      label: ls("FinTech Futures", "FinTech Futures"),
      url: FINTECH_FUTURES,
      kind: "press",
    },
  },

  // Day 070 · THE CALL 2
  {
    _type: "sparkCall" as const,
    _key: key(),
    blockId: "call-reissue-mechanism",
    date: "2020-02-05",
    prompt: lt(
      "A card estate issued in the first weeks of a product has to be replaced. Rule, or decision?",
      "Bir ürünün ilk haftalarında çıkarılan bir kart stoğunun değiştirilmesi gerekiyor. Kural mı, karar mı?",
    ),
    answer: "rule",
    reveal: [
      inlineReading(
        ls("What a compliance deadline does", "Bir uyum son tarihinin yaptığı şey"),
        lt(
          "A card reissue at week eleven is not one cost but three events: manufacture, delivery, and reactivation. The expensive one is the third, because it lands on a customer who has only just finished onboarding. PSD2 and the Strong Customer Authentication requirements forced the replacement itself. They did not choose which moment in a customer's life that replacement would land on.",
          "On birinci haftadaki bir kart yeniden verme işlemi tek bir maliyet değil üç olaydır: üretim, teslimat ve yeniden etkinleştirme. Pahalı olan üçüncüsüdür, çünkü daha yeni katılım sağlamış bir müşteriye düşer. PSD2 ve Güçlü Müşteri Kimlik Doğrulaması gereksinimleri değişimin kendisini zorladı. Bu değişimin bir müşterinin hayatının hangi anına denk geleceğini seçmediler.",
        ),
      ),
    ],
  },

  // Day 070 · THE WEIGH
  {
    _type: "sparkWeigh" as const,
    _key: key(),
    blockId: "weigh-reissue-cost",
    date: "2020-02-05",
    prompt: lt(
      "Six thousand cards had to be replaced eleven weeks in. Which of these cost the most?",
      "On birinci haftada altı bin kartın değişmesi gerekti. Bunlardan hangisi en pahalıya patladı?",
    ),
    disclaimer: ls("There is no right answer here. Pick the one you would defend.", "Burada doğru cevap yok. Savunacağınızı seçin."),
    options: [
      {
        _key: key(),
        label: ls("The plastic and the post", "Plastik ve posta"),
        line: ls(
          "Manufacture, personalisation and delivery, six thousand times over",
          "Üretim, kişiselleştirme ve teslimat, altı bin kez",
        ),
      },
      {
        _key: key(),
        label: ls("The operation behind it", "Arkasındaki operasyon"),
        line: ls(
          "Notices, a deactivation date, a contact centre, an activation flow run twice",
          "Bildirimler, bir devre dışı bırakma tarihi, bir çağrı merkezi, iki kez çalıştırılan bir etkinleştirme akışı",
        ),
      },
      {
        _key: key(),
        label: ls("The customer's confidence", "Müşterinin güveni"),
        line: ls(
          "A replacement landing on people who opened the account weeks ago",
          "Haftalar önce hesap açan insanlara düşen bir değişim",
        ),
      },
    ],
    revealGap: inlineGap(
      ls("No published cost", "Yayınlanmış bir maliyet yok"),
      lt(
        "No cost figure for the reissue appears in the public record. No per card cost, no operational cost, no retention effect was published.",
        "Yeniden verme işlemi için kamuya açık kayıtta bir maliyet rakamı yer almıyor. Kart başına maliyet, operasyonel maliyet ya da elde tutma etkisi hiç yayınlanmadı.",
      ),
      ls("A parent disclosure or a filed document.", "Bir ana şirket açıklaması ya da dosyalanmış bir belge."),
    ),
    revealReading: inlineReading(
      ls("Three events, not one cost", "Bir maliyet değil, üç olay"),
      lt(
        "A replacement is three events rather than one cost: a manufacture, a delivery, and an activation. The first two can be priced by anyone who has run a card programme. The third cannot be priced by anyone, which is precisely why it never appears in a published account, and why a reader who wants the real number will not find it here or anywhere.",
        "Bir değişim tek bir maliyet değil üç olaydır: üretim, teslimat ve etkinleştirme. İlk ikisi bir kart programı yürütmüş herkes tarafından fiyatlandırılabilir. Üçüncüsü hiç kimse tarafından fiyatlandırılamaz, tam olarak bu yüzden hiçbir yayınlanmış hesapta görünmez, ve gerçek rakamı isteyen bir okuyucu onu ne burada ne başka bir yerde bulur.",
      ),
    ),
  },

  // Day 056 · Bailie expected to step down (NEW)
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-bailie-expected",
    date: "2020-01-22",
    heading: ls("Bailie expected to step down", "Bailie'nin ayrılması bekleniyor"),
    body: lt(
      "Reported that Bó's chief executive Mark Bailie was expected to step down on or before 14 February, the date RBS was due to announce full year results. The same report carries two further figures: the build spend on the app was more than £100 million, and 170 people were employed to run it. The staff figure is reported, not filed.",
      "Bó'nun Genel Müdürü Mark Bailie'nin, RBS'in yıllık sonuçlarını açıklayacağı 14 Şubat'ta ya da öncesinde görevden ayrılmasının beklendiği bildirildi. Aynı haber iki rakam daha taşıyor: uygulamanın yapım harcaması 100 milyon sterlinin üzerindeydi, ve 170 kişi onu yürütmek için istihdam edilmişti. Personel rakamı raporlanmış, dosyalanmış değil.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("FinTech Futures", "FinTech Futures"),
      url: FINTECH_FUTURES_BAILIE,
      kind: "press",
    },
  },

  // Day 079 · Bailie leaves, Flament takes over (NEW)
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-flament-appointed",
    date: "2020-02-14",
    heading: ls("Bailie leaves, Flament takes over", "Bailie ayrılıyor, Flament devralıyor"),
    body: lt(
      "RBS confirmed Bailie had left, with immediate effect, on the day it announced full year results. Marieke Flament, chief executive of Mettle, the group's business banking product, took over Bó and ran both.",
      "RBS, Bailie'nin yıllık sonuçları açıkladığı gün, derhal yürürlüğe girecek şekilde ayrıldığını doğruladı. Grubun işletme bankacılığı ürünü Mettle'ın Genel Müdürü Marieke Flament, Bó'yu devraldı ve ikisini birden yönetti.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("CNBC", "CNBC"),
      url: CNBC,
      kind: "press",
    },
  },

  // Discrepancy gap (NEW, replaces the old undated CEO gap)
  {
    _type: "sparkGap" as const,
    _key: key(),
    date: "2020-02-14",
    heading: ls("Two published dates for the same departure", "Aynı ayrılış için iki yayınlanmış tarih"),
    body: lt(
      "A later report places the chief executive's departure in January. The confirmation report places it on 14 February, with immediate effect. Both are press.",
      "Daha sonraki bir haber, Genel Müdür'ün ayrılışını Ocak ayına yerleştiriyor. Doğrulama haberi ise bunu 14 Şubat'a, derhal yürürlüğe girecek şekilde yerleştiriyor. İkisi de basın kaynağı.",
    ),
    whereItWouldBe: ls("The RBS full year results, 14 February 2020.", "RBS'in yıllık sonuç açıklaması, 14 Şubat 2020."),
    invitesCorrection: true,
  },

  // Day 079 · THE SIGNAL (NEW)
  {
    _type: "sparkSignal" as const,
    _key: key(),
    blockId: "signal-appointment",
    date: "2020-02-14",
    prompt: lt(
      "From this day, the same person runs Bó and the group's business banking product. What does an appointment like that change?",
      "Bu günden itibaren Bó ile grubun işletme bankacılığı ürününü aynı kişi yönetiyor. Böyle bir atama neyi değiştirir?",
    ),
    notScoredLabel: ls("Not scored.", "Puanlanmıyor."),
    options: [
      ls("Nothing structural, one person can run two products", "Yapısal olarak hiçbir şey, bir kişi iki ürünü yönetebilir"),
      ls(
        "One roadmap and one budget conversation instead of two",
        "İki yerine tek bir yol haritası ve tek bir bütçe görüşmesi",
      ),
      ls("The record does not say", "Kayıt bunu söylemiyor"),
    ],
    revealReading: inlineReading(
      ls("Two dates, placed together", "Yan yana konan iki tarih"),
      lt(
        "Seventy seven days before Bó closed and its staff moved to Mettle, the two products were placed under one chief executive, and that appointment was published at the time. What was intended by it is not on the record and is not claimed here.",
        "Bó kapanmadan ve personeli Mettle'a taşınmadan yetmiş yedi gün önce, iki ürün tek bir Genel Müdür'ün altına yerleştirildi, ve bu atama o zaman yayınlandı. Bununla neyin amaçlandığı kayıtta yok ve burada iddia edilmiyor.",
      ),
    ),
  },

  // Day 108 · deactivation
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-deactivation",
    date: "2020-03-14",
    heading: ls("Cards deactivated", "Kartlar devre dışı bırakıldı"),
    body: lt(
      "Cards issued before 3 January were deactivated as scheduled, per the notice above.",
      "3 Ocak'tan önce çıkarılan kartlar, yukarıdaki bildirime göre planlandığı gibi devre dışı bırakıldı.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("FinTech Futures", "FinTech Futures"),
      url: FINTECH_FUTURES,
      kind: "press",
    },
  },

  // Day 108 · THE CALL 3
  {
    _type: "sparkCall" as const,
    _key: key(),
    blockId: "call-reissue-cost",
    date: "2020-03-14",
    prompt: lt(
      "What did a card re issue cost a product eleven weeks old, in customers?",
      "On bir haftalık bir ürüne bir kart yeniden verme işlemi müşteri açısından neye mal oldu?",
    ),
    answer: "unsettled",
    reveal: [
      inlineGap(
        ls("No published figure", "Yayınlanmış bir rakam yok"),
        lt(
          "The public record does not carry it. No customer number was published between launch and closure.",
          "Kamuya açık kayıt bunu taşımıyor. Lansman ile kapanış arasında hiçbir müşteri rakamı yayınlanmadı.",
        ),
        ls("A parent disclosure or a filed document.", "Bir ana şirket açıklaması ya da dosyalanmış bir belge."),
      ),
    ],
  },

  // Day 146 · Purdue departure (NEW), no mechanic
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-purdue-departure",
    date: "2020-04-21",
    heading: ls("The chief product officer leaves", "Ürün direktörü ayrılıyor"),
    body: lt(
      "Reported that Bó's chief product officer, Ollie Purdue, was leaving.",
      "Bó'nun ürün direktörü Ollie Purdue'nun ayrıldığı bildirildi.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("Sifted", "Sifted"),
      url: SIFTED,
      kind: "press",
    },
  },

  // Day 156 · closure
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-closure",
    date: "2020-05-01",
    heading: ls("Closure", "Kapanış"),
    body: lt(
      "NatWest Group announced Bó's closure alongside its Q1 2020 results, also reported the same day by Computer Weekly. Customers were given 60 days to withdraw their funds, and staff were transferred to Mettle, the parent's business banking product. 11,413 customers were on the books when Bó closed.",
      "NatWest Group, Bó'nun kapanışını Ç1 2020 sonuçlarıyla birlikte duyurdu, aynı gün Computer Weekly tarafından da haberleştirildi. Müşterilere fonlarını çekmeleri için 60 gün süre tanındı, ve personel ana şirketin işletme bankacılığı ürünü olan Mettle'a transfer edildi. Bó kapandığında 11.413 müşteri kayıtlıydı.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("TechCrunch", "TechCrunch"),
      url: TECHCRUNCH,
      kind: "press",
    },
  },

  // Day 156 · THE ESTIMATE 1 resolves
  {
    _type: "sparkEstimateReveal" as const,
    _key: key(),
    date: "2020-05-01",
    estimateBlockId: "estimate-customers",
    actualValue: 11413,
    actualLabel: ls("11,413 customers", "11.413 müşteri"),
    insideBracketLabel: ls("The record is inside your bracket.", "Kayıt sizin aralığınızın içinde."),
    belowBracketLabel: ls("The record came in lower.", "Kayıt daha düşük çıktı."),
    // Brief bu durumu tarif etmedi (sadece "inside" ve "lower" için tam
    // metin verdi) — gerçek değer (11.413) en düşük bracket'i seçen bir
    // okuyucu için bu dalı tetikler. Simetrik UI metni, uncertainty list'te.
    aboveBracketLabel: ls("The record came in higher.", "Kayıt daha yüksek çıktı."),
    derivedReading: inlineReading(
      ls("What it cost per customer", "Müşteri başına maliyeti"),
      lt(
        "The reported build spend divided by the customers on the books at closure works out to around £8,760 per customer. The hundred million pounds is a reported build figure rather than a filed total spend, the customer count is at closure rather than at peak, and the division is arithmetic done here rather than a figure anyone published.",
        "Raporlanan yapım harcamasının kapanıştaki müşteri sayısına bölünmesi, müşteri başına yaklaşık 8.760 sterline denk geliyor. Yüz milyon rakamı dosyalanmış bir toplam harcama değil raporlanmış bir yapım rakamı, müşteri sayısı zirvede değil kapanışta, ve bölme işlemi burada yapılan bir aritmetik, kimsenin yayınladığı bir rakam değil.",
      ),
    ),
  },

  // Day 156 · THE CALL 4
  {
    _type: "sparkCall" as const,
    _key: key(),
    blockId: "call-closure-thesis",
    date: "2020-05-01",
    prompt: lt("The closure. Rule, or decision?", "Kapanış. Kural mı, karar mı?"),
    answer: "decision",
    reveal: [
      inlineReading(
        ls("No rule closed Bó", "Bó'yu hiçbir kural kapatmadı"),
        lt(
          "No rule closed Bó. There was no supervisory action, no enforcement, no licence problem, no insolvency. The PSD2 reissue was a rule doing something concrete and expensive to a young card estate, but it was not what ended the product. Holding those two apart is the point of this episode.",
          "Bó'yu hiçbir kural kapatmadı. Herhangi bir denetim önlemi, yaptırım, lisans sorunu ya da iflas yoktu. PSD2 yeniden verme işlemi, genç bir kart stoğuna somut ve maliyetli bir şey yapan bir kuraldı, ama ürünü kapatan bu değildi. Bu ikisini birbirinden ayrı tutmak bu bölümün asıl meselesi.",
        ),
      ),
    ],
  },

  // Day 156 · THE SECOND OPINION (NEW)
  {
    _type: "sparkSecondOpinion" as const,
    _key: key(),
    blockId: "opinion-capital-allocation",
    date: "2020-05-01",
    prompt: lt(
      "Same technology, same budget, pointed at business banking instead. Was that a good use of the money?",
      "Aynı teknoloji, aynı bütçe, bu kez işletme bankacılığına yönlendirildi. Para doğru kullanılmış mıdır?",
    ),
    notScoredLabel: ls("Not scored.", "Puanlanmıyor."),
    options: [
      ls("Yes", "Evet"),
      ls("No", "Hayır"),
      ls("The record does not settle it", "Kayıt bunu netleştirmiyor"),
    ],
    readingA: inlineReading(
      ls("The operational read", "Operasyonel okuma"),
      lt(
        "Speed and iteration are the product in that category, and a large bank's build cycle is not naturally shaped to move that way.",
        "Bu kategoride hız ve yineleme ürünün kendisidir, ve büyük bir bankanın yapım döngüsü doğal olarak bu şekilde hareket edecek şekilde kurulmamıştır.",
      ),
    ),
    readingB: inlineReading(
      ls("The commercial read", "Ticari okuma"),
      lt(
        "Retail digital banking in the UK was already contested by 2019, with several well funded challengers competing for the same young mobile first customer and spending heavily to acquire them. Business banking was comparatively open ground with a customer worth more per account from the start. Pointing the same technology and budget at the less contested segment with the better revenue profile is not a hard call to defend, whatever the operational picture was.",
        "2019 itibarıyla İngiltere'de perakende dijital bankacılık zaten rekabetçiydi; aynı genç, mobil öncelikli müşteri için rekabet eden, onu kazanmak için ağır harcama yapan birçok iyi finanse edilmiş meydan okuyucu vardı. İşletme bankacılığı, hesap başına daha değerli bir müşteriyle görece daha açık bir alandı. Aynı teknolojiyi ve bütçeyi daha az rekabetçi, daha iyi gelir profiline sahip segmente yönlendirmek, operasyonel tablo ne olursa olsun savunması zor bir karar değil.",
      ),
    ),
    closingLine: lt(
      "There is no right answer here. There is a clear decision and a clear direction, and that is the part that matters.",
      "Burada doğru cevap yok. Net bir karar ve net bir yön var, önemli olan kısım o.",
    ),
  },

  // Day 156+ · transfer
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-transfer",
    date: "2020-05-01",
    heading: ls("Staff transferred", "Personel transfer edildi"),
    body: lt(
      "Staff were transferred to Mettle, the parent's business banking product, named here only as the destination of that transfer, with no comment on its current state or offering.",
      "Personel, ana şirketin işletme bankacılığı ürünü olan Mettle'a transfer edildi, burada yalnızca bu transferin hedefi olarak anılıyor, mevcut durumu ya da teklifi hakkında herhangi bir yorum yapılmıyor.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("TechCrunch", "TechCrunch"),
      url: TECHCRUNCH,
      kind: "press",
    },
  },

  // Day 156+ · THE ALLOCATION (NEW)
  {
    _type: "sparkAllocation" as const,
    _key: key(),
    blockId: "allocation-survived",
    date: "2020-05-01",
    prompt: lt(
      "More than a hundred million pounds, eighteen months, and 170 people. Split a hundred between what survived and what did not.",
      "Yüz milyon sterlinin üzerinde para, on sekiz ay ve 170 kişi. Kalanla kalmayan arasında yüz puanı paylaştırın.",
    ),
    notScoredLabel: ls("Not scored.", "Puanlanmıyor."),
    categoryALabel: ls("The brand and the customers", "Marka ve müşteriler"),
    categoryBLabel: ls("The technology and the people", "Teknoloji ve insanlar"),
    revealReading: inlineReading(
      ls("One side moved, one did not", "Biri taşındı, biri taşınmadı"),
      lt(
        "The record shows one of the two moved and the other did not. The brand closed and the customer relationships ended. The staff moved to another product in the same group, one that had shared a chief executive with this one since February. No figure is attached to either side because none was published.",
        "Kayıt, ikisinden birinin taşındığını diğerinin taşınmadığını gösteriyor. Marka kapandı ve müşteri ilişkileri sona erdi. Personel, Şubat'tan beri bu ürünle aynı Genel Müdür'ü paylaşan aynı gruptaki başka bir ürüne taşındı. Hiçbir rakam ikisine de eklenmedi çünkü hiçbiri yayınlanmadı.",
      ),
    ),
  },

  // Day 605 · CMA letter (KEPT, see file header comment on why, but
  // WITHOUT the original brief's Call 7 wrapper — plain Record/Reading/
  // Gap, not an 11th interactive moment).
  {
    _type: "sparkRecord" as const,
    _key: key(),
    blockId: "record-cma-letter",
    date: "2021-06-22",
    heading: ls("A regulator's letter, a year later", "Bir yıl sonra, bir düzenleyici mektubu"),
    body: lt(
      "The Competition and Markets Authority wrote a public letter to NatWest Group recording a breach of Article 20.6.2 of the Retail Banking Market Investigation Order 2017. The Order requires a Transaction History to be sent within 40 days of a personal current account closing, on an opt out basis. NatWest Group had run this on an opt in basis for former Bó customers, and as a result did not send one to 903 of them. The breach ran from 14 November 2019 to 1 May 2020. NatWest Group notified the CMA of it on 29 January 2021, as part of its 2020 annual compliance report.",
      "Rekabet ve Piyasalar Kurumu (CMA), NatWest Group'a yazdığı kamuya açık bir mektupla 2017 Perakende Bankacılık Piyasası Soruşturması Emri'nin 20.6.2 Maddesi'nin ihlal edildiğini kayda geçirdi. Emir, bir Hesap Hareketleri dökümünün, bir bireysel cari hesap kapandıktan sonra 40 gün içinde, opt out esasına göre gönderilmesini gerektiriyor. NatWest Group, eski Bó müşterileri için bunu opt in esasına göre yürütmüştü ve bunun sonucunda 903 kişiye bu döküm gönderilmedi. İhlal 14 Kasım 2019'dan 1 Mayıs 2020'ye kadar sürdü. NatWest Group bunu CMA'ya 29 Ocak 2021'de, 2020 yıllık uyum raporunun bir parçası olarak bildirdi.",
    ),
    source: {
      _type: "sparkSource" as const,
      label: ls("CMA public letter", "CMA'nın kamuya açık mektubu"),
      url: CMA_LETTER,
      kind: "regulator",
    },
  },
  {
    _type: "sparkReading" as const,
    _key: key(),
    date: "2021-06-22",
    heading: ls("The rule, named directly", "Kural, doğrudan adlandırılmış"),
    body: lt(
      "Article 20.6.2 of the Retail Banking Market Investigation Order 2017 requires a Transaction History sent within 40 days of closure, opt out by default. Against that requirement, 903 former customers did not receive one, on the dates the regulator published. The letter does not say why the process was opt in rather than opt out, and does not state what the CMA concluded about intent or competence, because the letter itself does not say that either.",
      "2017 Perakende Bankacılık Piyasası Soruşturması Emri'nin 20.6.2 Maddesi, kapanıştan sonra 40 gün içinde, varsayılan olarak opt out ile gönderilen bir Hesap Hareketleri dökümü gerektiriyor. Bu gereksinime karşı, 903 eski müşteri, düzenleyicinin yayınladığı tarihlerde bunu almadı. Mektup, sürecin neden opt in olduğunu söylemiyor, ve CMA'nın niyet ya da yetkinlik hakkında ne sonuca vardığını belirtmiyor, çünkü mektubun kendisi de bunu söylemiyor.",
    ),
    restsOn: ["record-cma-letter"],
  },
  {
    _type: "sparkGap" as const,
    _key: key(),
    date: "2021-06-22",
    heading: ls("Why opt in, and when corrected", "Neden opt in, ve ne zaman düzeltildi"),
    body: lt(
      "The letter does not state why the process was opt in rather than opt out, or when it was corrected.",
      "Mektup, sürecin neden opt out yerine opt in olduğunu, ya da ne zaman düzeltildiğini belirtmiyor.",
    ),
    whereItWouldBe: ls(
      "NatWest Group's subsequent compliance reporting to the CMA, not reviewed.",
      "NatWest Group'un CMA'ya sonraki uyum raporlaması, incelenmedi.",
    ),
    invitesCorrection: true,
  },
];

// Expert Notes — bölüm sonunda tek, imzalı bölüm (final brief §1).
// İlk üçü daha önce onaylanmış içerikten birebir. Orijinal Faz 1
// brief'in "leadership movement" notu buraya EKLENDİ (tarih artık
// belirlendiği için "the date is not established" varsayımı geçersiz,
// ama notun asıl noktası, liderlik hareketliliğinin gerçek bir
// kısıtlama olması, hâlâ geçerli). Orijinal day156 notu ("Retail
// digital banking in the UK was already crowded...") DÜŞÜRÜLDÜ, çünkü
// içeriği artık SECOND OPINION'ın Reading B'siyle neredeyse birebir
// çakışıyor — aynı argümanı iki kere tekrarlamamak için (handback'te
// işaretli).
const expertNotes = [
  lt(
    "A high street bank and a digital-first challenger are not solving the same problem with different branding. They are running different operating models, and the gap between them shows up in places that are easy to underrate from the outside. Speed of the kind these products need is not a feature you add later. It is closer to an organisational habit, and habits built for a different kind of banking do not transfer quickly.",
    "Bir şubeli banka ile dijital öncelikli bir meydan okuyucu, aynı sorunu farklı bir markalamayla çözmüyor. Farklı işletim modelleri yürütüyorlar, ve aralarındaki fark, dışarıdan bakınca hafife alınması kolay yerlerde ortaya çıkıyor. Bu tür ürünlerin ihtiyaç duyduğu hız, sonradan eklenen bir özellik değildir. Kurumsal bir alışkanlığa daha yakındır, ve farklı bir bankacılık türü için kurulmuş alışkanlıklar hızlı aktarılmaz.",
  ),
  lt(
    "This is what that habit costs in practice. A compliance deadline landing three months into a product's life is not a technical problem, it is an operational one, and how fast an organisation can turn a card estate over is decided long before the deadline exists.",
    "Bu alışkanlığın pratikte maliyeti işte bu. Bir ürünün hayatının üçüncü ayına denk gelen bir uyum son tarihi teknik bir sorun değil, operasyonel bir sorundur; bir kuruluşun bir kart stoğunu ne kadar hızlı devredebileceği, son tarih var olmadan çok önce belirlenir.",
  ),
  lt(
    "Leadership movement packed into a young product's first quarter is a real constraint on what that product can do next, and the public record almost never says what else was happening inside the business at the time. Choosing to stop rather than keep funding something through that kind of disruption is a defensible call, even though stopping five months after a high-profile launch will always read, from the outside, as a failure. Sometimes the harder and more disciplined move is recognising quickly that something is not the right fit, rather than letting a mismatch run for the sake of not looking like it stopped.",
    "Genç bir ürünün ilk çeyreğine sıkışan liderlik hareketliliği, o ürünün bundan sonra ne yapabileceği üzerinde gerçek bir kısıtlama yaratır, ve kamuya açık kayıt işletmenin içinde o sırada başka neler olduğunu neredeyse hiç söylemez. Böyle bir karışıklık boyunca bir şeyi fonlamaya devam etmek yerine durdurmayı seçmek savunulabilir bir karardır, yüksek profilli bir lansmandan beş ay sonra durmak dışarıdan her zaman bir başarısızlık gibi okunsa bile. Bazen daha zor ve daha disiplinli hamle, bir uyumsuzluğun durmuş gibi görünmemek uğruna sürmesine izin vermek yerine, bir şeyin doğru uyum olmadığını hızlıca fark etmektir.",
  ),
  lt(
    "Worth saying, because it rarely gets said about neobanks generally: running a retail digital bank at any real scale is hard in ways that have nothing to do with strategy. New account opening is one of the first things fraudsters test against any new digital bank. A retail product aimed at mass adoption needs servicing infrastructure, statements, transaction histories, complaints handling, built to handle volume correctly from day one, not bolted on afterward. That weight is a real part of what building a proper digital challenger costs, on top of the technology itself.",
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
  blocks: episodeBlocks,
  expertNotes,
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
