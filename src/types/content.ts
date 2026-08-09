/**
 * FSPARK9 · İçerik Arayüzleri
 * Konum: src/types/content.ts
 *
 * Bu dosya sözleşmedir. Bileşenler bu tiplere göre yazılır.
 *
 * Faz 2'de veri src/content/*.ts dosyalarından gelir.
 * Faz 3'te aynı veri Sanity'den gelir.
 * Bileşenler bu geçişte DEĞİŞMEZ.
 *
 * Not: buradaki tipler dil çözümlenmiş halidir (düz string).
 * Sanity şemasında alanlar { en, tr } olarak saklanır,
 * GROQ sorgusu aktif dile göre çözer ve bu tipleri döner.
 */

// ─────────────────────────────────────────────
// Ortak
// ─────────────────────────────────────────────

export type Locale = 'en' | 'tr'

export interface SanityImage {
  url: string
  alt: string
  width: number
  height: number
  lqip?: string // blur placeholder
}

export interface Link {
  label: string
  href: string
  external?: boolean
}

// ─────────────────────────────────────────────
// Site geneli
// ─────────────────────────────────────────────

export interface PageHero {
  eyebrow: string
  title: string
  intro: string
}

// dc.html: legalBlocks() — blk.isDiv/isH/isSh/isB/isField/isUl/isTbl.
// 'field' → dc.html'deki t:'f' (tek harf yerine okunabilir isim).
export type LegalBlock =
  | { type: 'div'; text: string }
  | { type: 'h'; text: string }
  | { type: 'sh'; text: string }
  | { type: 'b'; text: string }
  | { type: 'field'; label?: string; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'tbl'; head: string[]; rows: string[][] }

export interface LegalPage {
  hero: PageHero
  blocks: LegalBlock[]
}

// dc.html: t.storyProse / t.legalProse → prose() (satır 2389), sadece
// 2 varyant (isHead/isBody). LegalBlock'un 7 varyantlı union'ıyla
// KARIŞTIRILMAMALI — /story'nin düz makale metni için ayrı, daha basit
// bir tip. /thank-you bunu KULLANMAZ — pageDef'inde hasProse yok
// (satır 1343), tek paragrafı zaten PageHero.intro karşılıyor.
export type ProseBlock =
  | { type: 'head'; text: string }
  | { type: 'body'; text: string }

// dc.html: page.hasProse + page.hasVideo (satır 949-977) — SubpageHero
// + medya (StoryMedia, Home'daki StorySection.media ile aynı sözleşme)
// + prose. Medya render'ı Home'dakiyle aynı BİLEŞEN değil (16:9/tam
// genişlik vs 4:5/2 kolon), ama aynı veri tipini paylaşır.
export interface StoryPage {
  hero: PageHero
  media: StoryMedia
  prose: ProseBlock[]
}

// dc.html: page.book — hero'nun dışında sadece underCal (Cal embed'inin
// altındaki not metni). calLink SiteSettings.booking'ten reuse ediliyor,
// burada tekrarlanmıyor.
export interface BookPage {
  hero: PageHero
  underCal: string
}

// dc.html: is404 (satır 1030-1039) — SubpageHero YOK. dc.html'in
// kendisinde Header/Footer/mobil bar is404'te de render ediliyor
// (koşulsuz, satır 33/1042/1079); burada bilinçli olarak chrome'suz,
// bağımsız bir sayfa tercih edildi (app/global-not-found.tsx, [locale]
// layout'unu bypass ediyor — bkz. o dosyadaki yorum). "Ana sayfaya dön"
// linkinin href'i her zaman "/" — SubpageHero'daki "Geri" linkiyle aynı
// gerekçeyle veri olarak taşınmıyor, bileşende sabit.
export interface NotFoundPage {
  title: string
  linkLabel: string
}

// dc.html: page.hasLinks (satır 1005-1016) — sadece label + href, ok
// (→) veriden gelmiyor, statik. Genel Link tipiyle birebir örtüştüğü
// için ayrı bir kart tipi gerekmedi.
export interface ThankYouPage {
  hero: PageHero
  links: Link[]
}

// dc.html: page.hasCta (satır 1018-1026) — /services, /work, /work/insha,
// /work/ruut ve /story'nin paylaştığı kapanış bölümü. t.final.headline/sub
// + t.hero.cta'dan geliyor, Home'un kendi ClosingCta'sındaki alıntı
// (quote/quoteAttribution) burada YOK — o yüzden ClosingCta'yı genişletmek
// yerine ayrı, daha dar bir tip. Sayfa başına tekrarlanmıyor, SiteSettings
// altında tek kaynak — her sayfa sadece hasCta bayrağıyla gösterip
// göstermeyeceğine karar verir.
export interface SubpageCta {
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface BookingSection {
  calLink: string      // dc.html: cal.com/mburakdikmen/quick-chat — @calcom/embed-react'in calLink prop'u
  title: string          // "A free 30 minute call"
  body: string
  meta1: string          // "30 min · Video call"
  meta2: string          // "Europe / Istanbul · timezone detected"
}

export interface SiteSettings {
  nav: Link[]
  backLabel: string      // dc.html: t.nav.back ("Back"/"Geri") — tüm alt sayfa hero'larındaki "geri" pill'i
  ctaLabel: string
  ctaHref: string
  logo?: SanityImage      // header/footer lockup — Sanity'de var, boşsa bileşen /assets/lockup-reversed.svg'ye düşer
  booking: BookingSection
  subpageCta: SubpageCta
  footer: {
    tagline: string        // "Trust isn't marketed. It's built."
    nine: string            // "Nine is the last step. Spark is what lights it."
    signature: string       // "TRUST ISN'T MARKETED. IT'S BUILT." — alt bar
    email: string
    linkedin: string
    nav: Link[]              // orta nav sütunu — legalLinks'ten ayrı
    legalLinks: Link[]       // Impressum, Privacy, Cookies, Terms of use (4 öğe)
    legal: string            // tam yasal adres satırı, copyright'tan ayrı
    copyright: string
  }
  defaultOgImage: SanityImage
}

export interface PageSeo {
  title: string
  description: string
  ogImage?: SanityImage
  noIndex?: boolean
}

// ─────────────────────────────────────────────
// 1 · Hero
// ─────────────────────────────────────────────

export interface Hero {
  eyebrow: string          // başlığın üstündeki kicker satırı — dc.html: t.hero.eyebrow
  headlinePrimary: string  // başlığın ilk satırı, ivory — dc.html: t.hero.h1a
  headlineAccent: string   // başlığın ikinci satırı, bronz, <br> ile ayrılır — dc.html: t.hero.h1b
  bullets: string[]        // ikonlu 3 kısa madde — dc.html: t.hero.bullets
  closingLine: string      // madde listesinden sonraki vurgu cümlesi — dc.html: t.hero.subLast
  ctaLabel: string         // "Book a free 30 minute call" — dc.html: t.hero.cta
  ctaHref: string          // dc.html'de yok, gerçek routing için eklendi
  ctaNote: string          // butonun altındaki satır — dc.html: t.hero.note
  scrollLabel: string      // scroll ipucunun üstündeki küçük etiket — dc.html: t.hero.scroll
}

// ─────────────────────────────────────────────
// 2 · Ana çerçeve (üç kutu)
// ─────────────────────────────────────────────

export interface FrameworkStep {
  id: 'decide' | 'setup' | 'ship'
  label: string           // "Decide"
  description: string
}

export interface Framework {
  steps: FrameworkStep[]  // her zaman 3 adet
}

// ─────────────────────────────────────────────
// 3 · Kanıt şeridi
// ─────────────────────────────────────────────

export interface ProofItem {
  name: string            // "insha"
  logo?: SanityImage       // dc.html'de görsel yok, sadece isim — Sanity'de eklenince otomatik kullanılacak
  line: string
  order: number
}

export interface ProofStrip {
  kicker: string           // "Where I did the work"
  roles: string            // "Product & growth leadership · Digital banking · Market entry"
  items: ProofItem[]
  link: Link                // "See what was actually built →" — /work'e gider
}

// ─────────────────────────────────────────────
// 4 · Vaka analizleri
// ─────────────────────────────────────────────

export interface CaseStudyAction {
  label: string           // "Proposition"
  description: string
}

export interface CaseStudy {
  slug: string            // "insha" | "ruut" — /work/${slug} bileşende türetilir, ayrıca href saklanmaz
  name: string
  location?: string       // "Berlin"
  subtitle: string        // "Europe's first interest free, digital only bank"
  body: string             // dc.html: t.work.cards[].body — ana sayfa özet kartının tek paragrafı.
                             // KARIŞTIRMA: problem'dan farklı — o, vaka detay sayfasının problem bölümü.
  coverImage: SanityImage // dc.html: t.work.cards[] kapak görseli (16:10) — screens'ten farklı,
                             // o detay sayfasının çoklu ekran görüntüleri için
  problemHeading: string
  problem: string
  actionsHeading: string
  actions: CaseStudyAction[]
  deliveredHeading: string
  delivered: string
  tags: string[]          // ["Proposition", "Partner Selection", ...]
  screens: SanityImage[]  // ürün ekranları (vaka detay sayfası)
  // dc.html: t.pages.caseInsha/caseRuut (satır 1339-1340) — /work/[slug]
  // sayfasının SubpageHero'su. title zaten `name` ile birebir aynı,
  // yeniden kullanılıyor. eyebrow iki vakada da aynı metin ("Case
  // study"/"Vaka İncelemesi") ama dc.html'in kendi veri modelinde her
  // sayfaya ayrı yazılmış. detailIntro, `body` (kart özeti) ve `problem`
  // (detay bölümü) dışında ÜÇÜNCÜ, kısa bir tanıtım metni — karıştırma.
  detailEyebrow: string
  detailIntro: string
  logo?: SanityImage       // dc.html'de karşılığı yok, şu an kullanılmıyor — ProofStrip.logo?
                             // kararıyla tutarlı, ileride basın/medya amaçlı kullanılabilir
  order: number
}

export interface CaseStudiesSection {
  heading?: string
  intro: string            // eski adı: pairingNote — dc.html: t.work.intro
  items: CaseStudy[]
  linkLabel: string          // dc.html: c.link, "Read the case →" — her kartta aynı, section
                                // seviyesinde paylaşılıyor (ServicesSection.labels ile aynı desen);
                                // href her kart için slug'dan türetiliyor, burada saklanmıyor
}

// dc.html: page.hasCaseIndex (satır 796-820) — /work index'in kendi
// heading/intro'su YOK, SubpageHero'nun eyebrow/title/intro'su yeterli
// (Home'daki CaseStudiesSection.heading/.intro burada tekrarlanmıyor).
// Kart grid'i Home'daki HomePage.caseStudies.items + .linkLabel'i AYNEN
// kullanıyor — page.tsx ikisini birleştirir, ServicesPage'le aynı desen.
export interface WorkPage {
  hero: PageHero
}

// ─────────────────────────────────────────────
// 5 · Giriş kapıları (hizmetler)
// ─────────────────────────────────────────────
// dc.html'de "Four ways to start" — sol dikey tab listesi + sağ panel
// (masaüstü), her hizmet kendi kartında (mobil). problem/do/get
// etiketleri (t.ways.labels) section seviyesinde paylaşılıyor, her
// item'da tekrar etmiyor — AudienceSection.labels ile aynı desen.
// İkon yok: dc.html'de her tab için sabit, index'e bağlı SVG (bkz.
// AudienceCard'daki aynı karar) — veri kaynaklı değil, bileşende sabit.

export interface Service {
  slug: string
  number: number       // 1-4
  title: string          // dc.html: name — "Proposition and Product Blueprint"
  tag: string             // dc.html: tag — "Decide" / "Set up" / "Set up and ship" / "Ship", düz görüntü metni
  problem: string
  action: string           // dc.html: do
  outcome: string          // dc.html: get
  // dc.html: t.servicesBlocks[].rows (satır 1349) — /services sayfasının
  // (page.hasBlocks) kendi 4 satırı. Home'daki problem/action/outcome'dan
  // TAMAMEN FARKLI içerik (kalifiye edici metin, satış metni değil), ama
  // aynı 4 hizmet/aynı sıra — bu yüzden ayrı bir tip yerine Service'e ek
  // alan olarak eklendi.
  rightDoor: string       // rows[0].text — "When this is the right door"
  notRightDoor: string  // rows[1].text — "When it is not"
  duration: string          // rows[2].text — "How long"
  runsOn: string             // rows[3].text — "What it runs on"
}

export interface ServicesSection {
  heading: string          // "Four ways to start"
  intro: string             // "Most people come in through one of these and then hand me the rest."
  labels: {
    problem: string        // "The problem"
    action: string           // "What I do"
    outcome: string          // "You get"
    rightDoor: string
    notRightDoor: string
    duration: string
    runsOn: string
  }
  items: Service[]
  fullEngagementHeading: string   // dc.html: wholeTitle
  fullEngagementBody: string        // dc.html: wholeBody
  link: Link                          // "See what each of these looks like in practice →"
}

// dc.html: page.hasBlocks (satır 727-793) — /services sayfasının kendi
// hero'su dışında ek veri taşımaz. Satır/panel içeriği (Service[] +
// ServicesSection.labels) Home'daki HomePage.services'ten AYNEN
// tekrar kullanılıyor — burada tekrarlanmıyor, page.tsx ikisini birleştirir.
export interface ServicesPage {
  hero: PageHero
}

// ─────────────────────────────────────────────
// 6 · Fark tablosu
// ─────────────────────────────────────────────

export type ComparisonValue = {
  state: 'yes' | 'no' | 'partial'
  note?: string           // "A concept deck", "Only what you specify"
}

/**
 * dc.html kaynağında hücreler düz string olarak geliyor (ör. 'Yes', 'No',
 * 'A concept deck'). Sanity'ye taşırken eşleme kuralı:
 *   'Yes'  → { state: 'yes' }
 *   'No'   → { state: 'no' }
 *   diğer her metin → { state: 'partial', note: <metin> }
 * Bu dönüşüm içerik göçü sırasında elle yapılır, bileşen bunu bilmez.
 */
export interface ComparisonRow {
  label: string           // "Strategy firms"
  isUs?: boolean          // fspark9 satırı vurgulanır
  decide: ComparisonValue
  setup: ComparisonValue
  ship: ComparisonValue
}

export interface ComparisonTable {
  heading?: string         // dc.html: t.builds.title
  intro?: string             // dc.html: t.builds.intro
  scrollHint: string         // mobilde yatay kaydırmalı tabloda görünen ipucu metni, ör. "Scroll" / "Kaydırın" — dc.html'de karşılığı yok, QA güncellemesiyle eklendi
  columnLabels: {
    decide: string
    setup: string
    ship: string
  }
  rows: ComparisonRow[]
}

// ─────────────────────────────────────────────
// 7 · "What I do differently" (dört blok)
// ─────────────────────────────────────────────
// dc.html'de "The side that builds it" bölümünün, karşılaştırma
// tablosundan hemen sonra gelen alt kısmı (afterHead + blocks).
// KARIŞTIRMA: dc.html'in "Why I do this" başlıklı ayrı bölümü
// (video/foto + hikaye paragrafları) bu tip DEĞİL, StorySection'dır.

export interface ApproachBlock {
  number: number          // 1-4
  title: string
  body: string
}

export interface ApproachSection {
  heading?: string         // "What I do differently"
  blocks: ApproachBlock[]
}

// ─────────────────────────────────────────────
// 8 · Kimler için (accordion satırları)
// ─────────────────────────────────────────────

export interface AudienceCard {
  title: string
  problem: string          // "The problem"
  do: string                // "What I do"
  result: string             // "The result"
  // İkon yok: dc.html'de her kart için sabit, index'e bağlı SVG
  // template içine gömülü — veriden gelmiyor, bu yüzden burada yer almıyor.
}

export interface AudienceSection {
  heading: string
  labels: {
    problem: string   // "The problem"
    do: string          // "What I do"
    result: string       // "The result"
  }
  cards: AudienceCard[]
}

// ─────────────────────────────────────────────
// 9 · Hikaye
// ─────────────────────────────────────────────
// dc.html'de "Why I do this" başlığı altında görünür (portre foto/video +
// hikaye paragrafları). KARIŞTIRMA: ApproachSection ile aynı değil —
// o, "The side that builds it" içindeki "What I do differently" bloğudur.
//
// dc.html'de medya (foto/video) bir runtime toggle DEĞİL — editor-time
// bir prop (portraitMedia: 'photo' | 'video'), tıklama işlevsiz bir
// no-op (playVideo: () => {}). Video şimdilik gerçek değil, ileride
// YouTube embed olarak eklenecek (dosya olarak gömülmeyecek, performans
// için). Video-moddaki "slot" placeholder etiketi (dc.html: t.why.slot,
// "[ portrait / 2 min video ]") kasıtlı olarak buraya taşınmadı —
// dc.html'e özgü bir tasarımcı notu, gerçek bir YouTube embed'inin
// (kendi thumbnail/play butonuyla gelir) karşılığı yok.

export interface StoryMedia {
  type: 'image' | 'youtube'
  image?: SanityImage    // type: 'image' iken zorunlu (runtime'da kontrol edilir)
  youtubeId?: string      // type: 'youtube' iken zorunlu (runtime'da kontrol edilir) — henüz kullanılmıyor
  caption?: string          // dc.html: video modunda t.why.caption, foto modunda photoCaption (varsayılan boş) — medyayla birlikte taşınıyor
}

export interface StorySection {
  heading: string
  lead: string               // eski adı: pullQuote — dc.html: t.why.lead, gövdeden alıntı değil, başlık altı ayrı bir vurgu cümlesi
  paragraphs: string[]    // sitedeki en insani bölüm, çok paragraflı
  link: Link                  // "Read the whole story →"
  media: StoryMedia
}

// ─────────────────────────────────────────────
// 10 · Nasıl çalışırım
// ─────────────────────────────────────────────

export interface ProcessStep {
  number: number
  title: string
  description: string     // ana metin — dc.html'de 'body' (adım değişince fade ile giren büyük paragraf)
  detail: string            // ikincil, küçük punto metin — dc.html'de 'detail'
}

export interface ProcessSection {
  heading: string
  steps: ProcessStep[]    // üç adım
  ctaLabel: string          // dc.html: t.how.cta, "Book the call →"
  ctaHref: string             // dc.html'de yok — openBooking() bir overlay açıyor, henüz kurulmadı;
                                // Hero'daki gibi geçici olarak "/book"a gidiyor (bkz. FSPARK9-DURUM.md)
}

// ─────────────────────────────────────────────
// 11 · SSS
// ─────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer: string
  order: number
}

export interface FaqSection {
  heading: string
  items: FaqItem[]
}

// ─────────────────────────────────────────────
// 12 · Kapanış
// ─────────────────────────────────────────────

export interface ClosingCta {
  quote: string
  quoteAttribution: string
  headline: string
  body?: string
  ctaLabel: string
  ctaHref: string
  note?: string
}

// ─────────────────────────────────────────────
// 13 · "Does this sound familiar" (sticky kart yığını)
// ─────────────────────────────────────────────
// dc.html'de ProofStrip'ten hemen sonra gelir. Kartların üstündeki
// "01, 02..." numarası dc.html'de sunum amaçlı üretiliyor (zero-pad
// index); Sanity'de sıralanabilir olması için burada gerçek bir
// `order` alanı olarak tutuluyor.

export interface FamiliarPoint {
  text: string
  order: number
}

export interface FamiliarSection {
  heading: string          // "Any of this sound familiar?"
  points: FamiliarPoint[]
  closingLine: string      // "None of this means the idea is wrong..."
}

// ─────────────────────────────────────────────
// 14 · Testimonial slider
// ─────────────────────────────────────────────
// dc.html'de "The side that builds it" bölümünün hemen altında, ayrı
// bir slider olarak yer alır. Gerçek veride kişi adı YOK — sadece
// unvan + kurum tek bir string olarak geliyor (ör. "Head of Digital
// Banking · European BaaS partner"), bu yüzden `attribution` adı
// kullanılıyor, `name`/`title` değil.

export interface Testimonial {
  headline: string        // slaytın sol panelindeki başlık, "Want the banking side taken off your plate?"
  quote: string
  attribution: string      // unvan + kurum, tek satır — kişi adı içermiyor
  ctaLabel: string          // "Book a call"
  order: number
}

export interface TestimonialSection {
  heading?: string          // dc.html'de bu bölümün başlığı yok, ileride eklenebilir diye opsiyonel
  items: Testimonial[]
}

// ─────────────────────────────────────────────
// 15 · Medya / basın
// ─────────────────────────────────────────────

export interface MediaItem {
  source: string           // yayın adı — dc.html'de 'pub'
  headline: string
  description: string       // dc.html'de 'line'
  note?: string               // tarih / ek not
  href: string
  isVideo?: boolean
  order: number
}

export interface MediaSection {
  heading: string
  intro: string
  items: MediaItem[]
}

// ─────────────────────────────────────────────
// Sayfalar
// ─────────────────────────────────────────────

export interface HomePage {
  seo: PageSeo
  hero: Hero
  framework: Framework
  proofStrip: ProofStrip
  familiar: FamiliarSection          // YENİ
  caseStudies: CaseStudiesSection
  services: ServicesSection
  comparison: ComparisonTable
  approach: ApproachSection           // eski adı: whyMe
  testimonials: TestimonialSection   // YENİ
  audience: AudienceSection
  story: StorySection
  process: ProcessSection
  media: MediaSection                 // YENİ
  faq: FaqSection
  closingCta: ClosingCta
}

/** Landing B (deneyim açısı) ve Landing C (gömülü finans açısı) */
export interface LandingPage {
  slug: string
  seo: PageSeo
  hero: Hero
  sections: Array<
    | { type: 'framework'; data: Framework }
    | { type: 'proofStrip'; data: ProofStrip }
    | { type: 'caseStudies'; data: CaseStudiesSection }
    | { type: 'services'; data: ServicesSection }
    | { type: 'comparison'; data: ComparisonTable }
    | { type: 'approach'; data: ApproachSection }
    | { type: 'faq'; data: FaqSection }
  >
  closingCta: ClosingCta
}

// ─────────────────────────────────────────────
// Blog · Faz 3'te şema yazılır, Faz 5'te doldurulur
// ─────────────────────────────────────────────

export interface Author {
  name: string
  role: string
  avatar?: SanityImage
}

export interface Category {
  slug: string
  title: string
}

/** Sanity Portable Text bloğu. Render bileşeni Faz 5'te yazılır. */
export type PortableTextBlock = unknown

export interface Post {
  slug: string
  language: Locale        // blog DOKÜMAN bazlı i18n kullanır
  title: string
  excerpt: string
  publishedAt: string     // ISO
  updatedAt?: string
  author: Author
  categories: Category[]
  coverImage?: SanityImage
  body: PortableTextBlock[]
  seo: PageSeo
  /** Varsa diğer dildeki karşılığı. Zorunlu değil. */
  translationSlug?: string
}

export type PostListItem = Pick<
  Post,
  'slug' | 'title' | 'excerpt' | 'publishedAt' | 'coverImage' | 'categories'
>
