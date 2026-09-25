/**
 * FSPARK9 · İçerik ve props arayüzleri
 *
 * Bileşenler bu tiplere göre yazılır. Buradaki tipler dil çözümlenmiş
 * haldir (düz string). Sanity'de alanlar { en, tr } olarak duruyor;
 * src/sanity/lib/content.ts yükleyicileri aktif dile indirip bu tipleri
 * döndürüyor. src/content/*.ts aynı tiplerin statik aynası: seed-v3'ün
 * kaynağı ve check:drift'in karşılaştırdığı yer.
 *
 * Bölüm blokları (SparkEpisodeBlock) tek paylaşılan dizi, alanlar
 * içeride {en, tr} taşıyor.
 */

import type { CSSProperties, ReactNode } from "react";
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


// dc.html: is404 (satır 1030-1039) — SubpageHero YOK. dc.html'in
// kendisinde Header/Footer/mobil bar is404'te de render ediliyor
// (koşulsuz, satır 33/1042/1079); burada bilinçli olarak chrome'suz,
// bağımsız bir sayfa tercih edildi (app/global-not-found.tsx, [locale]
// layout'unu bypass ediyor — bkz. o dosyadaki yorum). "Ana sayfaya dön"
// linkinin href'i her zaman "/" — SubpageHero'daki "Geri" linkiyle aynı
// gerekçeyle veri olarak taşınmıyor, bileşende sabit.
/** 404 metni (v2, board NotFound). Sanity kapsamı dışında (CLAUDE.md). */
export interface NotFoundPage {
  seoTitle: string
  label: string
  heading: string
  /** Global 404'te ikinci dilin satırı; locale 404'ünde yok. */
  secondLine?: { text: string; lang: string }
  links: { label: string; href: string; lang?: string }[]
}

// dc.html: page.hasLinks (satır 1005-1016) — sadece label + href, ok
// (→) veriden gelmiyor, statik. Genel Link tipiyle birebir örtüştüğü
// için ayrı bir kart tipi gerekmedi.
/** /thank-you (v2, board ThankYou). Sanity kapsamı dışında (CLAUDE.md). */
export interface ThankYouPage {
  seo: PageSeoCopy
  label: string
  heading: string
  paragraphs: string[]
  links: { label: string; sublabel: string; href: NavHref }[]
}

// Revizyon v2 (bkz. Spark section revision brief v2): lastDayFormat/
// lastDayEpisode → sparkFormat/sparkEpisode. Format 02 kasıtlı olarak
// bir doküman DEĞİL — mevcut sabit "coming soon" karosu aynen kalıyor,
// bu yüzden burada sadece format 01 (ve gelecekte eklenecek gerçek
// formatlar) için tipler var.

// Bir bölümün hem hub envanter satırında hem liste sayfasında
// kullanılan özeti — gün sayısı burada TUTULMUYOR, DayMeasure
// bileşeni launchDate/closureDate'ten hesaplıyor (bkz.
// components/spark/day/dayMath.ts).
export interface SparkEpisodeSummary {
  number: number
  subject: string
  country: string
  launchDate: string | null
  closureDate: string | null
  publishedAt: string | null
  hook: string
  formatSlug: string
  episodeSlug: string
}

// ─────────────────────────────────────────────
// Spark · The Last Day liste sayfası (/spark/the-last-day)
// ─────────────────────────────────────────────

// Kullanıcı geri bildirimi sonrası kasıtlı olarak dar: kısa bir hero
// (purpose line) + bölüm listesi. howItWorks/corrections/closingLine
// YOK. Gün mekaniği kelime dağarcığı (singular/plural/notEstablished)
// burada, DayMeasure bileşenine geçiliyor.
export interface SparkFormatPage {
  episodes: SparkEpisodeSummary[]
  // Bu format'ın DİĞER locale'deki slug'ı (ör. TR'de "son-gun" iken EN
  // karşılığı "the-last-day") — LocaleSwitcher'ın dil değiştirirken
  // doğru URL'i kurabilmesi için (bkz. SparkAltSlugContext.tsx).
  altFormatSlug: string | null
}

// ─────────────────────────────────────────────
// Spark · Bölüm sayfası (/spark/the-last-day/01-bo)
// ─────────────────────────────────────────────

// Final interaction brief (17 Eylül 2026), kullanıcının açık onayıyla:
// serbest biçimli Portable Text gövdesi yerini Record/Reading/Gap +
// altı mekanik modeline bıraktı (bkz. sanity/schemaTypes/
// sparkEpisodeBlocks.ts). Hiçbir blok elle girilmiş bir "day" taşımıyor
// — gün numarası HER ZAMAN launchDate + bloğun date'inden hesaplanır
// (bkz. dayMath.ts:dayNumberLabel).

export interface SparkSource {
  label: string
  url: string
  kind: 'regulator' | 'filing' | 'company' | 'court' | 'press'
}

export interface SparkInlineReading {
  heading: string
  body: string
}

export interface SparkRecordBlock {
  _type: 'sparkRecord'
  blockId: string
  date: string
  heading: string
  body: string
  quote?: string
  quoteAttribution?: string
  source: SparkSource
}

export interface SparkReadingBlock {
  _type: 'sparkReading'
  date: string
  heading: string
  body: string
  restsOn: string[]
}

export type SparkCallAnswer = 'rule' | 'decision' | 'unsettled'

export interface SparkCallBlock {
  _type: 'sparkCall'
  blockId: string
  date: string
  prompt: string
  answer: SparkCallAnswer
  reveal: SparkInlineReading
}

export interface SparkEstimateBracket {
  label: string
  min: number
  max: number | null // null = açık uçlu en üst aralık
}

// Okuyucu bracket'ı seçtiği anda actualValue/derivedReading AYNI yerde
// açılır — ayrı, sayfa sonuna kadar tutulan bir reveal bloğu YOK (18
// Eylül 2026, kullanıcı talebi: "cevapları hemen görsün").
export interface SparkEstimateBlock {
  _type: 'sparkEstimate'
  blockId: string
  date: string
  prompt: string
  brackets: SparkEstimateBracket[] // her zaman 5, düşükten yükseğe sıralı
  actualValue: number
  actualLabel: string
  insideBracketLabel: string
  belowBracketLabel: string
  aboveBracketLabel: string
  derivedReading: SparkInlineReading
}

export interface SparkWeighOption {
  label: string
  line: string
}

export interface SparkWeighBlock {
  _type: 'sparkWeigh'
  blockId: string
  date: string
  prompt: string
  disclaimer: string
  options: SparkWeighOption[] // her zaman 3
  revealReading: SparkInlineReading
}

export interface SparkSignalBlock {
  _type: 'sparkSignal'
  blockId: string
  date: string
  prompt: string
  notScoredLabel: string
  options: string[] // her zaman 3
  revealReading: SparkInlineReading
}

export interface SparkSecondOpinionBlock {
  _type: 'sparkSecondOpinion'
  blockId: string
  date: string
  prompt: string
  notScoredLabel: string
  options: string[] // her zaman 3
  readingA: SparkInlineReading
  readingB: SparkInlineReading
  closingLine: string
}

export interface SparkAllocationBlock {
  _type: 'sparkAllocation'
  blockId: string
  date: string
  prompt: string
  notScoredLabel: string
  categoryALabel: string
  categoryBLabel: string
  revealReading: SparkInlineReading
}

// fspark9'un kendi sesi — bölüm akışının ilgili noktasına gömülü (18
// Eylül 2026, kullanıcı talebi: "en sona eklemeyelim"), sayfa sonunda
// konsolide bir bölüm YOK.
export interface SparkNoteBlock {
  _type: 'sparkNote'
  date: string
  body: string
}

export type SparkEpisodeBlock =
  | SparkRecordBlock
  | SparkReadingBlock
  | SparkNoteBlock
  | SparkCallBlock
  | SparkEstimateBlock
  | SparkWeighBlock
  | SparkSignalBlock
  | SparkSecondOpinionBlock
  | SparkAllocationBlock

// Format seviyesinde, mekaniklerin sabit arayüz kelime dağarcığı —
// bölüme özel değil (bkz. sparkFormat.ts şeması). SparkFormatPage
// bunu taşır, episode sayfası format'tan okur.
export interface SparkMechanicVocabulary {
  recordLabel: string
  readingLabel: string
  callLabel: string
  estimateLabel: string
  weighLabel: string
  signalLabel: string
  secondOpinionLabel: string
  allocationLabel: string
  callOptionRuleLabel: string
  callOptionDecisionLabel: string
  callMatchLabel: string
  callMismatchLabel: string
  callUnsettledLabel: string
  allocationCommitLabel: string
  noteLabel: string
  scorecardHeading: string
  scorecardUnansweredLabel: string
  scorecardYourReadingLabel: string
  scorecardCrossEpisodeLabel: string
  scorecardShareLabel: string
  scorecardCopiedLabel: string
  scorecardPrivacyLine: string
}

// Bölüm sayfası — final interaction brief ile yeniden kuruldu. `blocks`
// TEK bir sıralı dizi (locale başına ayrı diziler DEĞİL, bkz.
// sparkEpisode.ts şema yorumu), çünkü mekanik sırası ve state anahtarları
// (blockId) dilden bağımsız kalmalı.
export interface SparkEpisodePage extends SparkMechanicVocabulary {
  number: number
  subject: string
  publishedAt: string | null
  evidenceTakenAt: string | null
  lastCheckedAt: string | null
  parent?: string
  country: string
  launchDate: string | null
  closureDate: string | null
  // Bu bölümün ve format'ının DİĞER locale'deki slug'ları — bkz.
  // SparkFormatPage.altFormatSlug yorumu, aynı gerekçe.
  altFormatSlug: string | null
  altEpisodeSlug: string | null
  formatName: string
  standfirst: string
  blocks: SparkEpisodeBlock[]
  dayLabel: string // "DAY" / "GÜN"
  dayCountSingular: string
  dayCountPlural: string
  dayNotEstablishedLabel: string
  backHref: { formatSlug: string } // /spark/[formatSlug]'a next-intl typed pathname ile geri döner
}

export interface PageSeo {
  title: string
  description: string
  ogImage?: SanityImage
  noIndex?: boolean
}

// ─────────────────────────────────────────────
// Kilitli müşteri raporları (/locked/[client])
// Kapsam dışı: Sanity'ye taşınmaz (bkz. CLAUDE.md "Veri akışı").
// ─────────────────────────────────────────────

export interface LockedGateContent {
  title: string
  text: string
  label: string
  btn: string
  err: string
}

// ── Report body (fspark9-locked-fuzul-claude-code-brief.md) ──
// Block shape mirrors the reference file's actual DOM structure (ported by
// a jsdom extraction script, not hand-retyped, to guarantee the copy is
// byte-exact — see fuzul/fspark9-locked-fuzul-claude-code-brief.md).
// `html` fields hold small, trusted, developer-authored rich-text
// fragments (strong/em/br/<span class="src"><a href="#k1">[1]</a></span>
// source refs) — never user input. Bank-logo slots inside table/heat cells
// are the literal `<span class="bl" data-bank="slug"></span>` markup from
// the source; components parse that prefix out (see parseBankPrefix) and
// render a real BankLogo instead of raw-rendering it.

export interface ReportSourceIds {
  sourceIds?: string[]
}

export interface HtmlBlock extends ReportSourceIds {
  kind: 'prose' | 'pull' | 'small'
  html: string
}

export interface H3Block {
  kind: 'h3'
  text: string
}

export interface NoteBlock {
  kind: 'note'
  html: string
}

export interface ListBlock {
  kind: 'list'
  items: string[]
}

export interface TableCell {
  tag: string
  cls: string
  html: string
}

export interface TableBlock {
  kind: 'table'
  isHeat: boolean
  head: string[] | null
  /** non-null when the original used data-fill (bank-rows / heat-rows / refs) — computed, not content */
  bodyFillAttr: string | null
  rows: TableCell[][] | null
  minWidth: string | null
}

export interface DetailsBlock {
  kind: 'details'
  sumT: string
  sumH: string
  table: TableBlock
}

export interface MeterInfo {
  ariaLabel: string
  fillPct: number
  labels: { leftStyle: string; goal: boolean; text: string }[]
}

export type ChartKey =
  | 'growth'
  | 'shareSteps'
  | 'share'
  | 'bubble'
  | 'capital'
  | 'points'
  | 'rates'
  | 'kt'
  | 'tfs'
  | 'fzbranch'
  | 'map'

export interface FigureBlock {
  kind: 'figure'
  title: string
  sub: string
  segButtons: { mode: string; label: string }[] | null
  legendItems: { color: string; label: string }[] | null
  meter: MeterInfo | null
  chart: ChartKey | null
  chartAria: string | null
  caption: string | null
  detailsNested: DetailsBlock | null
}

export interface HomesBlock {
  kind: 'homes'
  items: { title: string; on: number; big: string; small: string }[]
  legend: string[]
}

export interface JourneyBlock {
  kind: 'journey'
  title: string
  steps: { h5: string; p: string }[]
  bankName: string | null
  bankSlug: string | null
  bankText: string | null
}

export interface TimelineBlock {
  kind: 'timeline'
  items: { date: string; slug: string | null; lg: boolean; title: string; body: string; fz: boolean }[]
}

export interface MoveBlockData {
  kind: 'moveBlock'
  letter: string
  title: string
  intro: string
  moves: { no: string; title: string; body: string; note: string | null }[]
}

export interface TrioCard {
  k: string
  kStyle: string | null
  h4: string
  p: string | null
  dl: { dt: string; dd: string }[] | null
  flow: { tag: string; text: string }[] | null
  fz: boolean
}

export interface TrioBlock {
  kind: 'trio'
  cards: TrioCard[]
}

export interface TwoBlock {
  kind: 'two'
  style: string | null
  cols: ReportBlock[]
}

export interface GroupBlock {
  kind: 'group'
  blocks: ReportBlock[]
}

export type ReportBlock =
  | HtmlBlock
  | H3Block
  | NoteBlock
  | ListBlock
  | TableBlock
  | DetailsBlock
  | FigureBlock
  | HomesBlock
  | JourneyBlock
  | TimelineBlock
  | MoveBlockData
  | TrioBlock
  | TwoBlock
  | GroupBlock

export interface ReportChapter {
  id: string
  nav: string
  eyebrow: string
  heading: string
  lede: string
  blocks: ReportBlock[]
}

export interface ReportHeroStat {
  /** raw html for a plain value (e.g. "%14", "4,92<small>trilyon TL</small>") */
  v: string
  l: string
  sourceIds: string[]
}

export interface ReportHeroContent {
  eyebrow: string
  /** e.g. "Evin<br>Bankası <em>Olmak</em>" — split into lines/em by ReportHero */
  h1: string
  sub: string
  whoB: string
  whoSpan: string
  stats: ReportHeroStat[]
}

export interface ReportSummaryPoint {
  title: string
  body: string
  sourceIds: string[]
}

export interface ReportSummaryContent {
  eyebrow: string
  heading: string
  points: ReportSummaryPoint[]
  proposal: { tagNum: string; tagLabel: string; heading: string; body: string; aside: string }
}

export interface ReportClosingContent {
  eyebrow: string
  /** blockquote innerHTML, incl. <em> */
  quote: string
  lede: string
  signP: string
  contact: string
  method: string
}

export interface ReportChartStrings {
  growth: string[]
  shareSteps: string[]
  grp: { ozel: string; kamu: string; yeni: string }
  shareOther: string
  merged: string
  mergedTipTitle: string
  mergedTipLine1: string
  mergedTipLine2: string
  shareTipSuffix: string
  trn: string
  bn: string
  axAssets: string
  axRoa: string
  tipAssets: string
  tipRoa: string
  tipGrowth: string
  emlakNote: string
  loss: string
  capital: { name: string; caption: string; slug: string }[]
  points: { name: string; value: string; caption: string; slug: string | null }[]
  policy: string
  rateTip: string
  ktCur: string
  ktOther: string
  ktCurTip: string
  ktOtherTip: string
  tfs: string[]
  tfsUnit: string
  fzb: string[]
  branches: string
  map: {
    zone: string
    xl: string
    xr: string
    x: string
    yb: string
    yt: string
    pts: Record<string, string>
    names: Record<string, string>
  }
  lv: Record<'0' | '1' | '2' | '3' | '4', string>
  heat: [string, number[]][]
  facts: [string, string[]][]
  heatSrc: string
  heatSrc2: string
  heatSrc3: string
  note: string
  noteAria: string
  sources: string
  /** the quiet "how could we turn this into a working relationship" link text (NextLine) */
  nextLine: string
  /** topbar "back to the report" link, shown on the working-together page */
  backToReport: string
}

export interface WorkingTogetherItem {
  num: string
  label: string
  lead: string
  detail: string
}

export interface WorkingTogetherContent {
  pageTitle: string
  eyebrow: string
  heroTitle: string
  metaLine: string
  summaryHeading: string
  summaryBody: string
  supportHeading: string
  items: WorkingTogetherItem[]
  closingLabel: string
  ctaLabel: string
  ctaUrl: string
  ctaUrlDisplay: string
  bioName: string
  bioTitle: string
  bioBody: string
  nextStepBadge: string
  nextStepText: string
}

export interface LockedReportContent {
  hero: ReportHeroContent
  summary: ReportSummaryContent
  chapters: ReportChapter[]
  closing: ReportClosingContent
  workingTogether: WorkingTogetherContent
  charts: ReportChartStrings
}

// ─────────────────────────────────────────────
// Marka parçaları (v2 rebuild, brief v4 §7.1)
// src/components/brand/*
// ─────────────────────────────────────────────

/** Bileşenin üzerinde durduğu zemin. `ink`: koyu açılış/kapanış, `paper`: açık zemin (Paper ya da White). */
export type BrandGround = 'paper' | 'ink'

export interface DialProps {
  /** Yanık dilimler, 1..8. Dokuzuncu hiç yazılmaz, hep Flare. */
  lit: readonly number[]
  size: number
  tone?: BrandGround
  className?: string
}

export interface RingOutlineProps {
  className?: string
  /** Yüklemede çizim animasyonu (sadece açılışta). */
  animate?: boolean
}

export interface LogoProps {
  /** Gövde rengi. `ink`: Paper/White zeminde, `paper`: Ink zeminde. Verilmezse currentColor. */
  tone?: 'ink' | 'paper'
  /** Ekran okuyucu etiketi (marka adı). */
  label: string
  className?: string
}

/**
 * Eğik kenarlı buton. Her örnek randevu penceresini açar (BookingCta).
 * `flare`: sayfa içi ana buton; `paper`: koyu header; `ink`: açık header
 * ve Ink'e ihtiyaç duyan yerler (ör. Allocation "Lock in this split").
 */
export interface CutButtonProps {
  label: string
  tone?: 'flare' | 'paper' | 'ink'
  size?: 'default' | 'header'
  className?: string
}

export type GoButtonSize = 64 | 48 | 44 | 40

export interface GoButtonProps {
  size: GoButtonSize
  className?: string
}

export interface BackLinkProps {
  href: import('react').ComponentProps<typeof import('@/i18n/navigation').Link>['href']
  label: string
  /** Zemin: `ink` ise Dust, `paper` ise Stone. */
  ground: BrandGround
  className?: string
}

export interface LabelProps {
  children: import('react').ReactNode
  /** Zemin: `ink` ise Dust, `paper` ise Stone. `strong`: Ink (ya da Ink zeminde Paper). */
  ground?: BrandGround
  strong?: boolean
  as?: 'div' | 'span' | 'p' | 'h2'
  className?: string
}

export interface CutWordProps {
  children: import('react').ReactNode
  className?: string
}

// ─────────────────────────────────────────────
// Site çerçevesi (v2): header, Services menüsü, mobil menü, footer,
// mobil randevu çubuğu. Veri: Sanity siteSettings ve servicePage
// (src/sanity/lib/content.ts getChrome).
// ─────────────────────────────────────────────

/** next-intl Link'in kabul ettiği href (pathnames union'ı). */
export type NavHref = import('react').ComponentProps<typeof import('@/i18n/navigation').Link>['href']

export type ServiceSlug = 'zero-to-live' | 'product-strategy' | 'embedded-finance' | 'expansion-gtm'

/** Bir hizmetin menü ve satır özeti (brief v4 §6.1 servicePage: name, shortLine, audience, slices). */
export interface ServiceSummary {
  slug: ServiceSlug
  name: string
  shortLine: string
  audience: string
  /** Yanık dilimler 1..8 (dokuzuncu hep yanık, saklanmaz). */
  slices: readonly number[]
}

export interface NavItem {
  label: string
  href: NavHref
}

export interface SiteChrome {
  /** Logonun ekran okuyucu adı. */
  brandName: string
  /** Logo linkinin etiketi (ana sayfaya gider). */
  homeLabel: string
  servicesLabel: string
  /** Services menüsünden sonraki linkler: Work, About, Spark. */
  nav: NavItem[]
  servicesMenu: {
    label: string
    heading: string
  }
  bookLabel: string
  /** Mobil menü katmanının ekran okuyucu adı. */
  menuLabel: string
  menuOpenLabel: string
  menuCloseLabel: string
  footer: {
    email: string
    linkedinHref: string
    linkedinLabel: string
    legalLinks: NavItem[]
    copyright: string
  }
  /** Randevu penceresi (board Booking). calLink Sanity'den. */
  booking: {
    title: string
    meta: string
    closeLabel: string
    poweredBy: string
  }
  /** Yasal sayfaların sekmeleri ve geri linki (board Legal). */
  legal: {
    backLabel: string
    tabsLabel: string
    tabs: NavItem[]
  }
}

// ─────────────────────────────────────────────
// v2 sayfa içerikleri (brief v4 §6.1, §7). Kaynak: site copy v2.
// Veri: src/content/{chrome,home,services,work,about,spark}.ts
// ─────────────────────────────────────────────

export interface PageSeoCopy {
  title: string
  description: string
}

/** Kapanış bloğu (siteSettings.nextStep). Etiket ana sayfada numaralı, diğer sayfalarda numarasız. */
export interface NextStepContent {
  label: string
  /** Ana sayfadaki numaralı etiket ("05 · Next step"). */
  homeLabel: string
  headlineLead: string
  /** Flare kesimi alan kelime. */
  headlineCut: string
  steps: string[]
  ctaLabel: string
}

export interface TitleText {
  title: string
  text: string
}

export interface FigureItem {
  value: string
  label: string
}

/** Açılış başlığı: her cümle kendi satırında, son cümlenin sonundaki `cutWord` Flare kesimde. */
export interface HeadlineWithCut {
  headlineSentences: string[]
  cutWord: string
}

export interface HomeContent {
  seo: PageSeoCopy
  opening: HeadlineWithCut & {
    /** Etiket parçaları. Mobilde board sadece ilk ve sonu gösteriyor. */
    eyebrowParts: string[]
    intro: string
    ctaLabel: string
    secondaryLinkLabel: string
    portraitAlt: string
    portraitSrc?: string
  }
  startWhereYouAre: {
    label: string
    heading: string
    text: string
    items: TitleText[]
  }
  fourServices: {
    label: string
    heading: string
    intro: string
  }
  work: {
    label: string
    heading: string
    allLinkLabel: string
    featured: {
      slug: string
      label: string
      heading: string
      text: string
      figures: FigureItem[]
      linkLabel: string
      screens: { src: string; alt: string }[]
    }
    rows: { slug: string; name: string; line: string; tags: string }[]
    alsoLabel: string
    also: TitleText[]
  }
  withMe: {
    label: string
    heading: string
    text: string
    points: TitleText[]
    portraitAlt: string
    portraitSrc?: string
  }
  spark: {
    label: string
    heading: string
    text: string
    linkLabel: string
    cards: SparkCardContent[]
  }
}

export interface SparkCardContent {
  format: string
  number: string
  title: string
  line: string
  /** Yayında olan bölüm: tarih ve okuma linki. Gelecek bölüm: durum etiketi. */
  date?: string
  linkLabel?: string
  href?: NavHref
  status?: string
}

export interface ServiceStep {
  /** Zero to Live'da her adımın adı var; diğer üç hizmette sadece satır var. */
  title?: string
  line: string
  slices: readonly number[]
}

export interface ServicePageContent {
  slug: ServiceSlug
  seo: PageSeoCopy
  backLabel: string
  opening: { label: string; heading: string; intro: string }
  stepsLabel: string
  steps: ServiceStep[]
  otherServicesLabel: string
  keepLabel: string
  keep: string
  ctaLabel: string
}

export interface ServicesIndexContent {
  seo: PageSeoCopy
  backLabel: string
  opening: { label: string; heading: string; intro: string }
}

export interface CaseContent {
  slug: string
  seo: PageSeoCopy
  name: string
  subtitle: string
  /** Pazar / şehir (board: "Germany", "Germany, Austria, UK"). */
  market: string
  tags: string
  services: ServiceSlug[]
  /** Kart deseni (brand book "Story card"): ilk cümle büyük (lead), gerisi metin. */
  problem: { label: string; lead: string; body: string }
  actions: { label: string; items: string[] }
  delivered: { label: string; lead: string; body: string }
  figures?: FigureItem[]
  proof: FigureItem
  sources: string[]
  /** Sanity'deki ekran görüntüleri (ilk ikisi). Statik kaynakta yok. */
  screens?: SanityImage[]
  /** Belgenin Sanity tarihleri (Article JSON-LD). Statik kaynakta yok. */
  publishedAt?: string
  modifiedAt?: string
}

export interface WorkPageContent {
  seo: PageSeoCopy
  backLabel: string
  label: string
  heading: string
  lead: string
  readLabel: string
  /** Vaka sayfası etiketleri (board CaseInsha). */
  caseLabel: string
  caseBackLabel: string
  sourcesLabel: string
  nextCaseLabel: string
}

export interface AboutContent {
  seo: PageSeoCopy
  backLabel: string
  label: string
  hero: HeadlineWithCut
  /** Story card'lar: ilk cümle büyük (lead), gerisi metin (board About). */
  pair: { label: string; lead: string; body: string }[]
  result: { label: string; lead: string; body: string }
  whyNine: { label: string; text: string }
  portraitAlt: string
  portraitSrc?: string
}

/**
 * Henüz yayında olmayan sayı (status: coming). Yayındaki bölümler
 * Sanity'den geliyor (gün sayısı computeDayCount ile hesaplanır, hiç
 * elle yazılmaz); burada sadece listede Stone ve linksiz duran satırlar.
 */
export interface SparkComingIssue {
  number: string
  subject: string
  hook: string
  statusLabel: string
}

export interface SparkFormatContent {
  number: string
  name: string
  /** Bu dildeki slug (the-last-day / son-gun). */
  slug: string
  status: 'live' | 'preparing'
  seo: PageSeoCopy
  description: string
  /** Copy'de sadece The Last Day'in açma linki var. */
  openLabel?: string
  comingIssues: SparkComingIssue[]
  /** Hub'daki "preparing" formatın açma linki yerine gösterdiği satır (board SparkIndex). */
  preparingLine?: string
  aboutLabel: string
  aboutLines: string[]
  showAllLabel: string
  allIssuesLabel: string
  daysUnit: string
  /** Format sayfası liste başlığı ve sütunları (board LastDay). */
  episodesLabel: string
  columns: { number: string; company: string; days: string; published: string }
  /** "{n}" yerine toplam bölüm sayısı gelir. */
  showAllTemplate: string
}

export interface SparkHubContent {
  seo: PageSeoCopy
  bigWord: string
  heading: string
  /** Kayan şerit parçaları (copy §5) ve son parçası. */
  tickerItems: string[]
  tickerTail: string
  readLabel: string
  /** Hub'ın geri linki (Home). */
  backLabel: string
  /** Format ve bölüm sayfalarının geri linki ve üst şeridi (Spark). */
  sparkLabel: string
  formatsLabel: string
  /** Canlıya çıkış tarihi belli olana kadar yayın tarihi yer tutucusu. */
  launchDateLabel: string
  formats: SparkFormatContent[]
  /** Bölüm sayfası etiketleri (copy §6b, board Episode). "{x}" yer tutucuları kodda doldurulur. */
  episode: SparkEpisodeLabels
}

export interface SparkEpisodeLabels {
  daysOpenLabel: string
  daysOpenShortLabel: string
  /** "{from}" ve "{to}" tarihlerle dolar. */
  dateRangeTemplate: string
  rulerLabel: string
  afterClosureLabel: string
  builtFromLabel: string
  evidenceTakenLabel: string
  lastCheckedLabel: string
  clockDayLabel: string
  /** "{n}" kapanış günüyle dolar. */
  clockOfTemplate: string
  readingResultLabel: string
  scorecardLabel: string
  /** "{format}" format adıyla dolar. */
  nextTemplate: string
  sourceLabel: string
}

export interface TextLinkProps {
  href: NavHref
  label: string
  ground?: BrandGround
  className?: string
}

export interface CutHeadlineProps extends HeadlineWithCut {
  className?: string
}

export interface PortraitProps {
  alt: string
  /** Sanity'den yüklenmiş portre; yoksa public/assets/portrait.jpg. */
  src?: string
  /** next/image sizes; boyut kullanan yerden className ile. */
  sizes: string
  priority?: boolean
  className?: string
}

export interface PhonePairProps {
  screens: { src: string; alt: string }[]
  className?: string
}

/** Bir format listesindeki sayı: yayındaki (Sanity) ya da gelecek (statik). */
export interface SparkIssue {
  number: number
  numberLabel: string
  subject: string
  hook: string
  status: 'published' | 'coming'
  /** computeDayCount ile hesaplanır; gelecek sayılarda null. */
  days: number | null
  href?: NavHref
  /** Gelecek sayılarda durum ("Coming next"), yayındakilerde yayın tarihi. */
  statusLabel: string
}

/** Bölüm bloklarının ortak bağlamı (tarih hesabı, dil, etiketler). */
export interface EpisodeContext {
  launchDate: string
  closureDate: string
  dayLabel: string
  locale: Locale
  labels: SparkEpisodeLabels
  vocabulary: SparkMechanicVocabulary
}

export interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

// ─────────────────────────────────────────────
// Bileşen props (src/components)
// ─────────────────────────────────────────────

export interface IntroTextProps {
  text: string;
}

export interface NextStepProps {
  content: NextStepContent;
  /** Sadece ana sayfada numaralı etiket (kullanıcı kararı, 24 Eylül 2026). */
  numbered?: boolean;
}

export interface NotFoundBlockProps {
  content: NotFoundPage;
  /** Global 404'te sol üstte logo (header yok). */
  top?: ReactNode;
  /** Header'lı sayfada fixed header'ın altından başlamak için. */
  underHeader?: boolean;
}

export interface PageOpeningProps {
  backHref: NavHref;
  backLabel: string;
  label: string;
  heading: string;
  /** `service`: board ServiceZTL (88/44px başlık). `work`: board WorkList (96/48px). */
  variant?: "service" | "work";
  /** Verilirse sağda (mobilde altta) hizmetin kendi dilimleriyle büyük kadran. */
  slices?: readonly number[];
  children?: ReactNode;
}

export interface StoryCardContent {
  label: string;
  lead?: string;
  body?: string;
  /** Madde listesi (7px Ink kareler, numara yok). */
  items?: string[];
}

export interface PairAndResultProps {
  pair: StoryCardContent[];
  result: StoryCardContent;
  /** Sonuç kartındaki tam kadranın yanık dilimleri. */
  slices: readonly number[];
  /** Kartların altına (ör. kaynak satırı, Why nine). */
  footer?: ReactNode;
  /**
   * Board farkları: vaka sayfasında sonuç kartı 56px aşağıda, bölüm alt
   * boşluğu 96px; About'ta 24px ve 120px.
   */
  variant?: "case" | "about";
}

export interface RingStageProps {
  portraitAlt: string;
  portraitSrc?: string;
  /** Metin sütunu. */
  children: ReactNode;
  /** Metin sütununun üst boşluğu ve aralıkları (board Main: 112px / 32px; About: 120px). */
  textClassName: string;
  /** Mobilde halka bloğunun üst boşluğu (Main 40px, About 32px). */
  ringClassName?: string;
}

export interface BookingCtaProps {
  className?: string;
  children: ReactNode;
}

export interface BookingOverlayProps {
  calLink: string;
  labels: SiteChrome["booking"];
}

export interface BookingProviderProps {
  children: ReactNode;
}

export interface CalEmbedProps {
  calLink: string;
  // Verilirse, rezervasyon tamamlanınca (Cal'in bookingSuccessfulV2
  // event'i) buraya yönlendirilir. Verilmezse hiç dinleyici kurulmaz —
  // mevcut davranış (Cal'in kendi iframe içi onay ekranı) korunur.
  redirectTo?: string;
  // BookingOverlay.tsx gibi kendi açık/kapalı state'ini tutan çağıranlar
  // için — yönlendirmeden HEMEN önce çağrılır (overlay kapanıp state
  // temizlensin, sonra sayfa değişsin). /book sayfası gibi zaten kendi
  // başına bir sayfa olan çağıranlarda gerekmez.
  onBookingSuccessful?: () => void;
}

export interface FooterProps {
  chrome: SiteChrome;
}

export interface HeaderProps {
  chrome: SiteChrome;
  services: ServiceSummary[];
  locale: string;
}

export interface LocaleSwitcherProps {
  locale: string;
  /**
   * `header`: rengini header'ın tonundan alır (koyu: Paper/Dust, açık:
   * Ink/Stone). `ink`: her zaman koyu zemin (mobil menü).
   */
  ground?: "header" | "ink";
}

export interface MobileBookingBarProps {
  label: string;
}

export interface MobileNavProps {
  chrome: SiteChrome;
  services: ServiceSummary[];
  locale: string;
}

export interface MarqueeProps {
  className?: string;
  style?: CSSProperties;
  /** Bir tam turun süresi (brief v4 §10: Spark şeridi 40 saniye). */
  loopSeconds?: number;
  children: ReactNode;
}

export interface FourServicesProps {
  content: HomeContent["fourServices"];
  services: ServiceSummary[];
}

export interface HomeOpeningProps {
  content: HomeContent["opening"];
}

export interface HomeWorkProps {
  content: HomeContent["work"];
}

export interface ServicePickerProps {
  services: ServiceSummary[];
  /** Sol sütunun üst kısmı (etiket, başlık, metin), server'da üretilir. */
  intro: ReactNode;
}

export interface SparkCardsProps {
  content: HomeContent["spark"];
}

export interface StartWhereYouAreProps {
  content: HomeContent["startWhereYouAre"];
}

export interface WithMeProps {
  content: HomeContent["withMe"];
}

export interface OtherServicesProps {
  label: string;
  services: ServiceSummary[];
}

export interface ServiceCloseProps {
  label: string;
  text: string;
  ctaLabel: string;
}

export interface StepTilesProps {
  label: string;
  steps: ServiceStep[];
}

export interface SparkSubnavProps {
  sparkLabel: string;
  formats: SparkFormatContent[];
  currentSlug: string;
}

export interface EpisodeClockProps {
  ctx: Pick<EpisodeContext, "launchDate" | "closureDate" | "locale" | "labels">;
}

export interface EpisodeRulerProps {
  blocks: SparkEpisodeBlock[];
  ctx: EpisodeContext;
}

export interface EpisodeListProps {
  issues: SparkIssue[];
  labels: Pick<SparkFormatContent, "episodesLabel" | "columns" | "showAllTemplate" | "daysUnit">;
}

export interface FormatBlockProps {
  format: SparkFormatContent;
  issues: SparkIssue[];
  readLabel: string;
}

export interface IssueRowProps {
  issue: SparkIssue;
  readLabel: string;
  first: boolean;
}

export interface SparkTickerProps {
  items: string[];
}

export interface LegalBlocksProps {
  blocks: LegalBlock[];
}

export interface LegalPageViewProps {
  page: LegalPage;
  legal: SiteChrome["legal"];
  current: NavHref;
}

export interface HomeScrollMemoryProps {
  locale: string;
}

export interface RevealProps {
  className?: string;
  children: ReactNode;
}

export interface CasePhonesProps {
  screens: SanityImage[];
  className?: string;
}

export interface CaseRowProps {
  item: CaseContent;
  readLabel: string;
}

export interface CountUpValueProps {
  value: string;
  /** "tr" ise binlik ayraç nokta (40.000), değilse virgül (40,000). */
  locale: string;
  className?: string;
}

export interface MarkerFiguresProps {
  figures: FigureItem[];
  locale: string;
}

/** Kilitli raporun logo ve sembolü (src/components/locked/Wordmark.tsx). */
export interface LockedMarkProps {
  height: number
  className?: string
}

/** Etiket metni; içindeki fspark9 büyük harf dönüşümünden muaf. */
export interface BrandCaseProps {
  text: string
}

/** Büyük rakam, sondaki kelime birimi küçük (src/components/brand/FigureValue.tsx). */
export interface FigureValueProps {
  value: string
}
