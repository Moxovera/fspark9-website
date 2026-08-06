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

export interface SiteSettings {
  brandName: string
  nav: Link[]
  ctaLabel: string
  ctaHref: string
  footer: {
    tagline: string        // "Trust isn't marketed. It's built."
    email: string
    linkedin: string
    legalLinks: Link[]     // Imprint, Privacy
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
}

export interface ServicesSection {
  heading: string          // "Four ways to start"
  intro: string             // "Most people come in through one of these and then hand me the rest."
  labels: {
    problem: string        // "The problem"
    action: string           // "What I do"
    outcome: string          // "You get"
  }
  items: Service[]
  fullEngagementHeading: string   // dc.html: wholeTitle
  fullEngagementBody: string        // dc.html: wholeBody
  link: Link                          // "See what each of these looks like in practice →"
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
