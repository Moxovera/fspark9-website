import type {
  TsdBarRow,
  TsdMeeting,
  TsdPhase,
  TsdRingSector,
  TsdUseCaseNode,
  TsdUseCaseStep,
} from "@/types/content";

// Tahsildar raporunun yapılandırılmış verisi (docs/locked/tahsildar-report.html
// içindeki satır içi değerler ve script dizileri). Metin tr.ts'te; buradaki
// diziler de referanstaki metni birebir taşıyor, değiştirilmez.

/** Şirket kredisinin milli gelire oranı, %. */
export const CREDIT_TO_GDP: TsdBarRow[] = [
  { label: "Romanya", value: 22, valueLabel: "%22", tone: "flare" },
  { label: "AB ortalaması", value: 66, valueLabel: "%66", tone: "ink" },
];
export const CREDIT_TO_GDP_MAX = 66;

/** Vadesi geçmiş faturası olan firma, 100 firmada. */
export const OVERDUE_FIRMS = 83;

/** Kanun ne diyor, pratikte ne oluyor (gün). */
export const PAYMENT_DAYS: TsdBarRow[] = [
  { label: "Firmalar arası yasal vade üst sınırı", value: 60, valueLabel: "60 gün", tone: "dust" },
  { label: "Ortalama tahsil süresi", value: 85, valueLabel: "85 gün", tone: "ink" },
  { label: "redBill'e bildirilen ödenmemiş faturada ortalama gecikme", value: 354, valueLabel: "354 gün", tone: "flare" },
];
export const PAYMENT_DAYS_MAX = 354;

/** Varlık payı, 2025 sonu, en büyük yedi banka (%). */
const BANK_SHARES: [string, number][] = [
  ["Banca Transilvania", 22.0],
  ["BCR", 13.8],
  ["CEC Bank", 11.2],
  ["UniCredit", 10.8],
  ["BRD", 10.0],
  ["Raiffeisen", 9.3],
  ["ING", 8.4],
];
export const BANK_SHARES_MAX = 22;
export const BANK_SHARE_ROWS: TsdBarRow[] = BANK_SHARES.map(([label, value], i) => ({
  label,
  value,
  valueLabel: "%" + value.toFixed(1).replace(".", ","),
  tone: i === 0 ? "flare" : "ink",
}));

/** Ortaklık haritası: dört alan, saat yönünde soldan başlayarak. */
export const PARTNER_RING: TsdRingSector[] = [
  {
    cat: "Ödeme",
    main: "Token",
    alts: ["EuPlătesc", "Netopia", "Smart Fintech"],
    title: "Token (Odero)",
    text: "Ana ödeme ortağı. Ödeme kabulü ve para transferi yetkisi var, Beko POS cihazlarını kendisi üretiyor, arkasında Koç var. Tahsildar ona en çok ihtiyaç duyduğu şeyi getiriyor: bayi ağlarından gelen düzenli işlem hacmi.",
    alt: "EuPlătesc özellikle RoPay ve anlık transfer için ikinci ortak adayı. Netopia ve Smart Fintech yedekte.",
  },
  {
    cat: "Finansman ve taksit",
    main: "Nexent Bank",
    alts: ["Banca Transilvania", "BCR", "Instant Factoring"],
    title: "Nexent Bank (Fiba)",
    text: "Ana finansman ve taksit ortağı. Romanya'daki en eksiksiz Türk kart modeli bu bankada: taksitli kart, 9.500 partner, SoftPOS ve mobil uygulama. Tahsildar zaten Fiba ile görüşüyor.",
    alt: "Banca Transilvania (Star programı, ticari kart dahil) ve BCR (ticari kartla her yerde taksit). Faktoringde Instant Factoring.",
  },
  {
    cat: "Dağıtım",
    main: "Türk bayi ağları",
    alts: ["SmartBill (Faz 2)", "Taksitli kart ağı"],
    title: "Türk kökenli bayi ağları",
    text: "Faz 1'in kapısı. Kastamonu, Yıldız Entegre, Beko ve Türk sermayeli toptancılar. Güven hazır, dil ortak, karar hızlı.",
    alt: "Faz 2'de SmartBill: Romanya'nın en yaygın fatura yazılımı, 85 binden fazla aktif müşteri. Ortaklıkta verinin kimde kalacağı baştan yazılmalı.",
  },
  {
    cat: "Risk verisi",
    main: "Banka skoru",
    alts: ["Ödeme geçmişi", "e-Factura", "Termene.ro, redBill"],
    title: "Nexent Bank kredi değerlendirmesi",
    text: "Limit ve taksit kararını banka verir. Bu kararı Tahsildar'ın ödeme geçmişi ve e-Factura verisi besler. Zamanla bayiye özel koşul önerisi otomatik üretilebilir.",
    alt: "Termene.ro ve redBill şirket bilgisi ve ödenmemiş fatura kaydı için alternatif kaynak.",
  },
];

/** Yol haritasının dört fazı. `left` hattaki yüzde konumu. */
export const ROADMAP_PHASES: TsdPhase[] = [
  {
    num: "0",
    when: "0 ile 2. ay",
    left: 0,
    title: "Faz 0: Zemini kurmak",
    goal: "Tek satır kod yazmadan önce hukuki çerçeveyi ve iki ana ortağı netleştirmek.",
    columns: [
      {
        heading: "Ne yapılır",
        items: [
          "Bükreş'te fintech hukukçusundan yazılı görüş",
          "Romanya şirketi ve yerel yüz",
          "Ürünün Romence, lei ve e-Factura bağlantısıyla uyarlanması",
        ],
      },
      {
        heading: "Kiminle",
        items: [
          "Token: kalıp, para transferi yetkisinin kapsamı, RoPay takvimi",
          "Nexent Bank: taksit, kredi kartı, limit verisi, gelir paylaşımı",
          "Hukuk bürosu",
        ],
      },
      {
        heading: "Dikkat",
        items: [
          "Tahsildar hiçbir akışta parayı tutmamalı",
          "Ortak sözleşmelerinde müşteri ilişkisi ve verinin kimde kalacağı yazılmalı",
        ],
      },
    ],
    exit: "İki ortakla imzalı sözleşme, yazılı hukuk görüşü ve test edilmiş e-Factura bağlantısı.",
  },
  {
    num: "1",
    when: "3 ile 9. ay",
    left: 33.3,
    title: "Faz 1: Türk kökenli bayi ağlarıyla pilot",
    goal: "İki üç şirkette modeli uçtan uca çalıştırmak ve sonuçları ölçmek. Türkçe konuşan küçük bir ekip yeterli.",
    columns: [
      {
        heading: "Nerede",
        items: [
          "Yapı malzemesi ve levha",
          "Mobilya",
          "Oto servis",
          "Taksit programının partner işyerleri içinde bu üç sektör",
        ],
      },
      {
        heading: "Aday şirketler",
        items: [
          "Kastamonu Entegre ve Yıldız Entegre",
          "Beko România",
          "Pladis ve Eti'nin distribütörleri",
          "TIAD üzerinden Türk sermayeli toptancılar",
        ],
      },
      {
        heading: "Ne ölçülür",
        items: ["Tahsil süresi", "Gecikme oranı", "Taksitli ödemenin payı", "Sistemi aktif kullanan alt bayi oranı"],
      },
    ],
    exit: "En az iki pilot canlıda, ölçülmüş bir iyileşme ve Romen distribütöre gösterilebilecek bir referans vaka.",
  },
  {
    num: "2",
    when: "9 ile 18. ay",
    left: 66.6,
    title: "Faz 2: Romen distribütörlere açılmak",
    goal: "Pilotun referansıyla yerel pazara girmek. Bu fazda iş kişisel ilişkiyle yayılır.",
    columns: [
      {
        heading: "Ekip",
        items: [
          "Yapı malzemesi ya da FMCG dağıtımından gelen Romen saha satışçı",
          "Telefonla destek veren bir kişi",
          "Kırsal bayi için sade ekran",
        ],
      },
      {
        heading: "Kanal ve ürün",
        items: ["SmartBill entegrasyonu ile dağıtım", "RoPay için EuPlătesc", "e-Factura ve ödeme verisiyle risk skoru"],
      },
      {
        heading: "Sektör",
        items: ["FMCG distribütörleri", "Beyaz eşya", "Tarım en son ve dikkatle"],
      },
    ],
    exit: "Romen müşteri sayısının Türk kökenli müşteriyi geçmesi ve en az bir alternatif finansman ortağının hazır olması.",
  },
  {
    num: "3",
    when: "18. aydan sonra",
    left: 100,
    title: "Faz 3: Yeni dikeyler ve Macaristan",
    goal: "Romanya'da oturmuş modeli yeni zincirlere ve ikinci ülkeye taşımak.",
    columns: [
      {
        heading: "Dental",
        items: [
          "Muayenehanelerin distribütörlerden vadeli alımı",
          "Hastanın pahalı tedaviyi taksitle ödemesi",
          'Pazar 7 milyar lei\'yi geçmiş durumda <span class="src">Termene.ro</span>',
        ],
      },
      {
        heading: "Diğer zincirler",
        items: ["Türk müteahhitlerin taşeron hakedişleri", "KoçZer ile tedarikçi ödemeleri", "Trendyol'un Romen satıcıları"],
      },
      {
        heading: "Macaristan",
        items: [
          'Token lisansını uluslararası büyüme için kullanmayı planlıyor <span class="src">The Diplomat</span>',
          "Avro ve forint için SEPA baştan planlanmalı",
        ],
      },
    ],
    exit: "Romanya'da kârlı çalışan bir birim ve Macaristan'da lisans kapsamı teyit edilmiş bir ödeme ortağı.",
  },
];

/** Uçtan uca örnek: zincirin dört halkası ve üç ortak. */
export const USE_CASE_CHAIN: TsdUseCaseNode[] = [
  { id: "u", role: "Üretici", name: "Kastamonu Romanya" },
  { id: "a", role: "Ana bayi", name: "Cluj'daki levha bayisi" },
  { id: "b", role: "Alt bayi", name: "60 mobilya atölyesi" },
  { id: "s", role: "Son kullanıcı", name: "Dolap yaptıran ev sahibi" },
];

export const USE_CASE_PARTNERS: TsdUseCaseNode[] = [
  { id: "t", role: "Ekran ve koşul", name: "Tahsildar" },
  { id: "k", role: "Ödeme", name: "Token" },
  { id: "c", role: "Taksit ve risk", name: "Nexent Bank" },
];

export const USE_CASE_STEPS: TsdUseCaseStep[] = [
  {
    title: "Fatura kendiliğinden düşer",
    nodes: ["u", "a", "t"],
    text: "Kastamonu, Cluj'daki ana bayisine ay başında 400 bin lei'lik levha faturası keser. Fatura e-Factura'dan geçer ve Tahsildar'a kendiliğinden düşer.",
  },
  {
    title: "Ana bayi koşulları tanımlar",
    nodes: ["a", "b", "t"],
    text: "Ana bayi levhaları bölgedeki 60 mobilya atölyesine satar. Beş yıldır hiç geciktirmeyen atölyeye kredi kartıyla 6 taksit ve 60 gün vade, yeni atölyeye peşin, sezonda büyük sipariş verene özel kampanya tanımlar.",
  },
  {
    title: "Atölye taksitle öder",
    nodes: ["b", "a", "k", "c"],
    text: "Bir atölye 25 bin lei'lik siparişini Tahsildar ekranından kredi kartıyla 6 taksitle öder. Ödemeyi Token işler, ana bayinin hesabına 25 bin lei peşin geçer. Taksit riski Nexent Bank'ta.",
  },
  {
    title: "Atölye son kullanıcıdan tahsil eder",
    nodes: ["b", "s", "k", "t"],
    text: "Atölye, dolap yaptırdığı ev sahibine Tahsildar'dan 18 bin lei'lik tahsilat linki gönderir. Ev sahibi kendi kartıyla ya da RoPay ile öder.",
  },
  {
    title: "Ana bayi bütün ağı görür",
    nodes: ["a", "b", "t"],
    text: "Ana bayi ekranında 60 atölyenin toplam borcunu, kimin hangi koşulla çalıştığını ve kimin geciktiğini görür. Geciken atölyeye otomatik hatırlatma gider, isterse o atölyenin koşulunu tek tıkla peşine çevirir.",
  },
  {
    title: "Üretici kampanya açar",
    nodes: ["u", "a", "b", "c"],
    text: 'Kastamonu, ana bayisinin kendisine zamanında ödediğini görür. Sezon başında bütün bayi ağına "taksit maliyetini ben karşılıyorum" kampanyası açabilir. Herkes kazanır: üretici satışını, ana bayi peşin parasını, atölye nefesini, Nexent Bank yeni müşterisini, Token hacmini.',
  },
];

/** İlk görüşülecekler, sırasıyla. İlk dördü "İlk dört". */
export const MEETINGS: TsdMeeting[] = [
  {
    phase: 0,
    live: true,
    title: "Token Payment Services",
    who: "CEO Burak Yıldıran, Deputy CEO Nicoleta Ionescu",
    text: "Ana ödeme ortağı. Güncel üye işyeri sayısı; alt üye işyeri ya da temsilci modeline açıklık; para transferi yetkisinin ana bayiye ve üreticiye dağıtan akışa izin verip vermediği; RoPay takvimi; bankanın kredi kartlarıyla yapılan taksitin kendi altyapısından geçip geçmeyeceği; lisansın Macaristan'a taşınması.",
  },
  {
    phase: 0,
    live: true,
    title: "Nexent Bank",
    who: "Kart, SoftPOS ve KOBİ ekipleri",
    text: "Ana finansman ve taksit ortağı. Alt bayiler taksit programına partner işyeri olarak nasıl girer, firmalara kredi kartı veriliyor mu; taksit maliyeti ve oranlar; SoftPOS distribütör deneyiminde kaç distribütör kullandı, hangi sektörde tuttu, nerede tökezledi; e-Factura verisiyle limit; gelir paylaşımı.",
  },
  {
    phase: 0,
    live: false,
    title: "Fintech hukukçusu",
    who: "KPMG Legal (Toncescu și Asociații), Token'ın lisansında çalışmış",
    text: "Para akışı teknik sağlayıcı sayılır mı, temsilci kaydı ne kadar sürer, e-Factura verisi hangi rızayla kullanılır, yeni AB ödeme kuralları neyi değiştirir. Yazılı görüş.",
  },
  {
    phase: 0,
    live: false,
    title: "Mert Kaftanoğlu",
    who: "Forvis Mazars Romanya, Türk Masası lideri",
    text: "Birleşik Ödeme'nin lisansı nerede takıldı, hangi hukuk bürosuyla çalıştılar. Türk kökenli bayi ağı olan şirketlere giriş.",
  },
  {
    phase: 1,
    live: false,
    title: "TIAD",
    who: "Genel sekreter Barbaros Yıkar",
    text: "Romanya'daki Türk İş İnsanları Derneği. Türk sermayeli toptancılara ve dağıtımcılara kurumsal kapı.",
  },
  {
    phase: 1,
    live: false,
    title: "Kastamonu Entegre Romanya",
    who: "Reghin fabrikası",
    text: "Bayi ve atölye yapısı, bugünkü tahsilat sorunu, pilot için ilk aday.",
  },
  {
    phase: 1,
    live: false,
    title: "Yıldız Entegre",
    who: "Romanya operasyonu",
    text: "Kastamonu'ya benzer bir bayi yapısı olup olmadığının teyidi.",
  },
  {
    phase: 1,
    live: false,
    title: "Beko România ve KoçZer",
    who: "Koç Grubu",
    text: "İç pazarda satış bayi mi zincir mi üzerinden gidiyor. KoçZer'in tedarikçi ödemeleri farklı bir kullanım olarak.",
  },
  {
    phase: 1,
    live: false,
    title: "Pladis ve Eti Romanya",
    who: "Gıda üretimi ve dağıtımı",
    text: "Hangi distribütörlerle çalışıyorlar. Distribütör pilotu ve üretici destekli taksit kampanyası.",
  },
  {
    phase: 2,
    live: false,
    title: "EuPlătesc",
    who: "Ödeme kuruluşu",
    text: "RoPay'e doğrudan bağlı ilk ödeme kuruluşu. Anlık transfer için ikinci ortak, PayFac takvimi.",
  },
  {
    phase: 2,
    live: false,
    title: "Netopia Payments",
    who: "CEO Raluca Micu",
    text: "Alternatif ödeme ortağı. Üye işyeri finansmanı planlarının Tahsildar ile çakışıp çakışmadığı.",
  },
  {
    phase: 2,
    live: false,
    title: "Banca Transilvania ve BCR",
    who: "BT CEO'su Ömer Tetik ve Star ekibi",
    text: "Alternatif taksit ve finansman ortakları. Ömer Tetik İzmir'de büyüdü, Finansbank ve Credit Europe'tan geliyor, ulaşılabilir bir ilişki.",
  },
  {
    phase: 2,
    live: false,
    title: "SmartBill",
    who: "Fatura yazılımı",
    text: "Faz 2 dağıtım kanalı. Entegrasyon, koşullu ödeme sayfası, yönlendirme payı ve verinin kimde kalacağı.",
  },
  {
    phase: 2,
    live: false,
    title: "Termene.ro (redBill)",
    who: "Şirket bilgi platformu",
    text: "Alternatif risk verisi ve ödenmemiş fatura kaydı.",
  },
  {
    phase: 3,
    live: false,
    title: "Dental distribütör ve Regina Maria Dental Clinics",
    who: "Sonraki faz",
    text: "Muayenehanelerin vadeli malzeme alımında ve hastanın taksitli ödemesinde sorunun doğrulanması.",
  },
];

/** Kapanıştaki katlanır kaynak listesi. */
export const SOURCES: string[] = [
  "Atradius, Payment Practices Barometer 2026",
  "BNR, Banca Națională a României, finansal istikrar ve kayıt verileri",
  "Kanun 72/2013, Kanun 70/2015, Kanun 210/2019",
  "ANAF, e-Factura ve nakit işlemler rehberi (StartupCafe aracılığıyla)",
  "Factureaza.ro, e-Factura ve POS zorunluluğu",
  "Termene.ro ve redBill verileri",
  "Odero blog ve Business Forum, Token lisansı",
  "Economedia, Ziarul Financiar, Profit.ro",
  "Revista Biz, HotNews, Wall-Street.ro, StartupCafe",
  "Forbes România, Economica.net, Romania Insider",
  "Bursa.ro ve Agerpres, faktoring pazarı",
  "Kinstellar, Mondaq, bne IntelliNews, bankacılık vergisi ve kârlılık",
  "DLA Piper, Pavel Margarit & Associates (Legal500)",
  "Forvis Mazars Türk Masası, TIAD",
  "CursDeGuvernare, Capital, The Diplomat",
  "wiiw, Foreign Policy, Al Jazeera, Puterea, BZI",
];
