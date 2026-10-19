/**
 * FSPARK9 · İçerik ve props arayüzleri
 *
 * Bileşenler bu tiplere göre yazılır. Buradaki tipler dil çözümlenmiş
 * haldir (düz string). Sanity'de alanlar { en, tr } olarak duruyor;
 * src/sanity/lib/content.ts yükleyicileri aktif dile indirip bu tipleri
 * döndürüyor. src/content/*.ts aynı tiplerin statik aynası: seed-v3'ün
 * kaynağı ve check:drift'in karşılaştırdığı yer.
 *
 * Spark bölüm hikâyesi (SparkEpisodeStory) Sanity'de tek belge, bölüm
 * ve karar dizileri paylaşılan, alanlar içeride {en, tr} taşıyor.
 */

import type { CSSProperties, ReactNode, RefObject } from "react";
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
  /** Gün sayısı yerine gösterilen süre ("7 years"); boşsa gün sayısı hesaplanır. */
  durationLabel: string | null
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

// Son Gün v3 (2026-09-26, prototip _design/v2/boards/son-gun-01-bo-v3.html):
// bölüm bir hikâye. Bölümler (chapter) sırayla akar, her biri yandaki
// kartın durumunu taşır; ilk dördünde bir karar anı var. Hiçbir şey
// tarayıcıda saklanmaz, puanlanmaz, gönderilmez.

/** Yandaki kartın hali: taslak (kesikli), canlı (Flare), arka yüz, kapalı (Rule). */
export type SparkCardMode = 'draft' | 'live' | 'flipped' | 'closed'

export interface SparkStoryCard {
  mode: SparkCardMode
  /** Kartın büyük rakamı ("000", "037"); lansmandan önce "?". */
  day: string
  /** Kartın mono satırı ("27 November 2019"). */
  state: string
  /** Kartın altındaki küçük yazı (geniş ekranda). */
  caption: string
  /** Dar ekrandaki ince şeridin başlığı. */
  title: string
  /** Gün saatli bölümlerde (dayClock) çubuğun doluluğu, yüzde. */
  progress?: number
  /** Şeritteki gün yazısı; boşsa dayTemplate ("Day 830"). */
  barDay?: string
}

export interface SparkServiceTag {
  name: string
  service: ServiceSlug
}

export interface SparkDecisionOption {
  /** "A", "B", "C" */
  key: string
  text: string
  answer: string
}

export interface SparkDecision {
  label: string
  question: string
  options: SparkDecisionOption[]
  didLabel: string
  title: string
  /** Paragraflar; "[n]" kaynak dipnotu olur. */
  body: string[]
  note: string
  services: SparkServiceTag[]
}

export interface SparkChapter {
  /** Sayfa içi çapa ("ch1"). */
  id: string
  label: string
  title: string
  lead: string
  /** Paragraflar; "[n]" kaynak dipnotu olur. */
  paragraphs: string[]
  card: SparkStoryCard
  decision?: SparkDecision
}

export interface SparkFinalOption {
  text: string
  service: ServiceSlug
  serviceName: string
  heading: string
  body: string
}

export interface SparkSourceLink {
  label: string
  href: string
}

export interface SparkStorySource {
  n: number
  /** Birden fazla link varsa etiketlerdeki sourceJoiner ile birleşir. */
  links: SparkSourceLink[]
}

export interface SparkEpisodeStory {
  number: number
  subject: string
  /** Format sayfasındaki satırın tek cümlesi. */
  hook: string
  seo: PageSeoCopy
  hero: {
    label: string
    title: string
    sub: string
    invite: string
    startLabel: string
    cardDay: string
    cardState: string
    /** Varsa kartın yerine çerçeve rakam ("2394", Fidor). */
    figure?: string
    figureLabel?: string
  }
  /**
   * Varsa yandaki kartın yerine nötr gün saati (Nº 03 Fidor): gün, çubuk
   * (durağın progress'i), "of 2394". Kart sadece Bó'nun hikâyesine ait.
   */
  dayClock?: { label: string; ofLabel: string }
  chapters: SparkChapter[]
  interlude?: {
    /** Bu id'li bölümden sonra gelir. */
    afterChapter: string
    text: string
    card: SparkStoryCard
  }
  lessons: { heading: string; body: string }[]
  /** Derslerden sonra fspark9 notu (Nuri'nin görüş bloğu gibi). */
  note?: { label: string; paragraphs: string[] }
  /** Son gün satırı, büyük yazı (ara bölüm tipografisi). */
  lastDay?: { label: string; text: string }
  finalQuestion: { label: string; title: string; lead?: string; ctaLabel: string; options: SparkFinalOption[] }
  next?: { number: string; name: string; line: string }
  sourcesLabel: string
  sources: SparkStorySource[]
  correctionLine: string
  /** NextStep başlığı bu sayfada. */
  closeHeading: string
}

// Son Gün Nº 02 (Nuri, prototip _design/v2/boards/son-gun-02-nuri-v2.html):
// hikâye yerine karar blokları. Açılış, cetvel, standfirst, yapışkan saat,
// beş karar (seç, gerçekte ne oldu), kayıt blokları, okur sorusu, görüş,
// hizmet. Seçimler sadece bileşen state'inde; okur cevabı e-postayla gelir
// (tarayıcıdan Web3Forms), hiçbir şey saklanmaz.

/** Cetveldeki bir iz. Etiketi olmayan iz soluk, yazısız. */
export interface SparkRulerTick {
  /** "YYYY-MM-DD" */
  date: string
  /** Mono tarih ("Jan 2018"); boşsa iz etiketsiz. */
  label: string
  /** Altındaki satır ("The cards stop"). */
  caption: string
}

export interface SparkChoiceOption {
  /** "A", "B", "C", "D" */
  key: string
  text: string
}

/** Saatin izlediği bir blok: tarihi (ilerleme) ve saatte görünen yazısı. */
export interface SparkClockStop {
  /** "YYYY-MM-DD" */
  date: string
  when: string
}

export interface SparkRecordBlock extends SparkClockStop {
  /** Üst satırın solu ("The countdown"). */
  label: string
  paragraphs: string[]
  sources: SparkSourceLink[]
}

export interface SparkChoiceDecision extends SparkRecordBlock {
  /** Karar başlığı (Epilogue 800). */
  title: string
  options: SparkChoiceOption[]
  /** Kayıttaki seçim ("B"). */
  record: string
  /** "What really happened" paragrafları. */
  reveal: string[]
}

export interface SparkReaderPoll {
  question: string
  options: SparkChoiceOption[]
  /** Serbest metni açan seçenek ("D"). */
  freeKey: string
  freeLabel: string
  freePlaceholder: string
  /** "{n} / 250 words" */
  counterTemplate: string
  emailLabel: string
  submitLabel: string
  sendingLabel: string
  privacyLine: string
  thanks: string
  tooLong: string
  emptyText: string
  error: string
  sourceLabel: string
  sourceHref: string
}

export interface SparkDecisionEpisode {
  number: number
  subject: string
  hook: string
  seo: PageSeoCopy
  opening: {
    label: string
    meta: string
    figure: string
    figureLabel: string
  }
  ruler: {
    ticks: SparkRulerTick[]
    /** Çizginin altındaki mono not ("Nine months later · ..."). */
    after: string
  }
  standfirst: string
  provenance: string
  clock: {
    /** Başlangıç yazısı ve geniş ekranda çubuğun altı ("2015 to 2023"). */
    rangeLabel: string
    /** İlerleme çubuğunun başı ve sonu, "YYYY-MM-DD". */
    start: string
    end: string
  }
  intro: string
  labels: {
    ask: string
    skip: string
    match: string
    noMatch: string
    revealLabel: string
    sourcesLabel: string
  }
  decisions: SparkChoiceDecision[]
  records: SparkRecordBlock[]
  twist: SparkRecordBlock & { poll: SparkReaderPoll }
  view: SparkClockStop & { label: string; paragraphs: string[] }
  service: {
    label: string
    heading: string
    body: string
    ctaLabel: string
    service: ServiceSlug
  }
}

// Sektör raporu (Spark Nº 01 Bauspar, prototip
// Spark/sector reports/fspark9-sektor-raporu-bauspar.html): bir sayfalık
// rapor. Metindeki "[n]" kaynak listesindeki n'inci kaynağa dipnot olur.
// Sanity'de `reportBody` iki dilli JSON olarak durur; sayı, konu, kanca ve
// SEO belgenin kendi alanlarından gelir.

export type ReportSectionId =
  | 'kisa'
  | 'kullanici'
  | 'pazar'
  | 'model'
  | 'tuketici'
  | 'oyuncular'
  | 'kullanim'
  | 'iki-ulke'
  | 'dersler'
  | 'oneriler'
  | 'gorus'
  | 'kaynaklar'

export interface ReportHead {
  /** "01"; kaynaklarda boş. */
  index: string
  label: string
  title: string
  lede?: string
}

export interface ReportFigure {
  value: string
  label: string
}

/** Açılışta sayarak gelen rakam. `template` içinde "{n}" sayının yeri ("{n} mn"). */
export interface ReportCountFigure extends ReportFigure {
  to: number
  decimals: number
  template: string
}

export interface ReportCard {
  tag: string
  first: string
  body: string
}

export interface ReportRow {
  key: string
  text: string
}

export interface ReportPreset {
  key: 'early' | 'late'
  name: string
  down: number
  month: number
  usesInterest: boolean
}

/** Simülatörün dile bağlı cümleleri. {x} tutar, {n} plan ayı, {t} teslim ayı, {d} fark ay, {l} kredi. */
export interface ReportSimTexts {
  monthValue: string
  hint: string
  yesPositive: string
  yesNegative: string
  no: string
  poolFee: string
  ownSaved: string
  ownLoan: string
  ownNet: string
  rentValue: string
  difference: string
  waiting: string
  home: string
  lastInstalment: string
  signing: string
  custom: string
  /** "{x}" bölüm 2'deki sabit satır: "Ev 200.000 €, taksit ayda 1.000 €". */
  constants: string
}

export interface ReportSource {
  label: string
  href?: string
}

export interface SparkReport {
  number: number
  subject: string
  hook: string
  seo: PageSeoCopy
  nav: { id: ReportSectionId; label: string }[]
  hero: {
    meta: string[]
    bigNo: string
    titleLead: string
    titleCut: string
    sub: string
    left: { label: string; figures: ReportCountFigure[] }
    right: { label: string; figures: ReportCountFigure[] }
    simulatorLabel: string
    proposalsLabel: string
  }
  short: { head: ReportHead; cards: ReportCard[]; view: { tag: string; first: string; linkLabel: string } }
  simulator: {
    head: ReportHead
    storyLabel: string
    /** Sabitler ve varsayımlar, iki dilde aynı. */
    values: { price: number; monthly: number; feePct: number; bankRate: number; depositRate: number; rent: number }
    presets: ReportPreset[]
    interestLabel: string
    yes: string
    no: string
    downLabel: string
    monthLabel: string
    feeLabel: string
    moreLabel: string
    bankRateLabel: string
    depositRateLabel: string
    rentLabel: string
    note: string
    stories: ReportCard[]
    math: ReportCard
    texts: ReportSimTexts
  }
  market: {
    head: ReportHead
    figures: ReportFigure[]
    metrics: { key: 'contracts' | 'sum'; label: string; valueTemplate: string; decimals: number; title: string }[]
    years: string[]
    contracts: number[]
    sum: number[]
    caption: string
    rows: ReportRow[]
  }
  model: {
    head: ReportHead
    stepLabel: string
    steps: { title: string; body: string }[]
    order: { heading: string; items: ReportRow[] }
    earns: { heading: string; items: ReportRow[] }
    risks: ReportCard[]
  }
  consumers: { head: ReportHead; figures: ReportFigure[] }
  players: {
    head: ReportHead
    share: { label: string; basis: number }[]
    legend: string
    channelLabel: string
    noteLabel: string
    items: { name: string; group: string; channel: string; note: string }[]
  }
  uses: {
    head: ReportHead
    renovation: {
      tag: string
      first: string
      meter: { label: string; value: string; width: number; target?: boolean }[]
      paragraphs: string[]
    }
    vehicles: { tag: string; first: string; figures: ReportFigure[]; paragraphs: string[] }
  }
  compare: {
    head: ReportHead
    measureLabel: string
    columns: string[]
    rows: { measure: string; cells: string[] }[]
    note: string
  }
  lessons: { head: ReportHead; groups: { heading: string; items: { title: string; body: string }[] }[] }
  proposals: {
    head: ReportHead
    items: { tag: string; first: string; body: string; details: ReportRow[] }[]
    bridge: { tag: string; first: string; points: string[] }
  }
  view: { head: ReportHead; paragraphs: string[]; expert: { tag: string; quote: string; body: string; signature: string; initials: string } }
  close: { label: string; title: string; body: string; bookLabel: string; backLabel: string }
  sources: { head: ReportHead; items: ReportSource[]; note: string }
}

/** Sanity'de duran gövde: sayı, konu, kanca ve SEO belgenin alanlarından gelir. */
export type SparkReportBody = Omit<SparkReport, 'number' | 'subject' | 'hook' | 'seo'>

// Sektör raporu Nº 02 DORA (layout "dora", metin Spark/sector reports/
// Spark Sektör Raporu DORA.md). Bauspar gibi `reportBody` iki dilli JSON;
// bölümler sıralı bloklardan oluşur. Metin içinde **kalın**, *italik* ve
// [metin](service:slug) hizmet linki işaretleri DoraInline'da çözülür.

export type DoraBlock =
  | { type: 'p'; text: string }
  /** Küçük puntolu italik not. */
  | { type: 'note'; text: string }
  /** Bölüm içi alt başlık (h3). */
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  /** Tablo; dar ekranda her satır bir kart. `figures`: ilk sütun büyük mono rakam. */
  | { type: 'table'; head: string[]; rows: string[][]; figures?: boolean }

export interface DoraSection {
  id: string
  head: ReportHead
  blocks: DoraBlock[]
}

export type DominoService = 'app' | 'card' | 'transfer'
export type DominoCountry = 'DE' | 'NL' | 'FR' | 'ES'
/** Yedek: listedeki bir sağlayıcı (P1, P2) ya da listede olmayan ikinci işlemci / ikincil veri merkezi. */
export type DominoBackupTarget = string

export interface DominoProvider {
  id: string
  name: string
}

export interface DominoInstitution {
  id: string
  name: string
  type: string
  country: DominoCountry
  deps: Partial<Record<DominoService, string[]>>
  backups: { service: DominoService; from: string; to: DominoBackupTarget }[]
}

export interface DominoContent {
  providers: DominoProvider[]
  institutions: DominoInstitution[]
  /** Listede olmayan yedeklerin adı (proc2, dc2). */
  backupNames: Record<string, string>
  countries: Record<DominoCountry, string>
  services: Record<DominoService, string>
  labels: {
    stage: string
    choose: string
    pull: string
    replay: string
    reset: string
    down: string
    backup: string
    informed: string
    dependsOn: string
    hint: string
    counters: { institutions: string; countries: string; services: string; notice: string }
    noticeNormal: string
    noticeDora: string
    noticeNote: string
    /** {institutions} {countries} {services} */
    resultNormal: string
    /** {services} {rerouted} */
    resultDora: string
    sharedRail: string
    modeNormal: string
    modeDora: string
  }
}

export interface DoraPhoneContent {
  account: string
  sceneLabel: string
  s1: {
    balanceLabel: string
    balance: string
    banner: string
    pendingHeading: string
    pendingLabel: string
    rows: { label: string; amount: string }[]
    support: string
  }
  s2: {
    pushApp: string
    push: string
    info: string
    rowLabel: string
    rowAmount: string
    queuedLabel: string
    time: string
  }
  s3: {
    title: string
    before: string
    after: string
    note: string
  }
}

export interface SparkDoraReport {
  number: number
  subject: string
  hook: string
  seo: PageSeo
  nav: { id: string; label: string }[]
  hero: {
    meta: string[]
    bigNo: string
    titleLead: string
    titleCut: string
    sub: string
    glance: { heading: string; items: string[] }
  }
  origin: DoraSection & {
    timeline: {
      heading: string
      events: { date: string; text: string }[]
      /** "Bugün" işareti bu sıradaki olaydan sonra (Flare). */
      today: { date: string; label: string; after: number }
    }
  }
  scope: DoraSection
  pillars: DoraSection
  domino: DoraSection & { note: string; after: DoraBlock[]; sim: DominoContent }
  scorecard: DoraSection
  challenges: DoraSection
  solved: DoraSection
  story: {
    id: string
    head: ReportHead
    intro: string
    lead: string
    scenes: { title: string; body: string }[]
    summary: string
    phone: DoraPhoneContent
  }
  market: DoraSection
  outcomes: DoraSection
  uk: DoraSection
  turkey: DoraSection
  desks: DoraSection & {
    items: { title: string; scenario: string; options: { key: string; text: string }[]; take: string }[]
  }
  calendar: DoraSection
  note: DoraSection
  close: { text: string; bookLabel: string }
  sources: { head: ReportHead; groups: { heading: string; items: { label: string; href: string }[] }[]; note: string }
}

export type SparkDoraReportBody = Omit<SparkDoraReport, 'number' | 'subject' | 'hook' | 'seo'>

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
  /** İç yarıçap (viewBox birimi, dış 50). Varsayılan 35; ana sayfa telefonda 41.1 (146/120 px). */
  inner?: number
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
  /** Verilirse randevu penceresi yerine bu sayfaya giden link. */
  href?: NavHref
  /** Verilirse sayfa içi çapa (id, "#" olmadan). */
  anchor?: string
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

export interface HeroVideoContent {
  /** Bu dilin filmi; boşsa video düğmesi ve önizleme görünmez. */
  youtubeId: string
  /** Düğmedeki süre, ör. "1:30". */
  durationLabel: string
  buttonLabel: string
  ariaLabel: string
  title: string
  /** Sessiz önizleme sırasında portrenin altındaki satır (Burak'ın o 4 saniyede söylediği). */
  caption: string
  closeLabel: string
}

/** Four services halkasının ortasındaki hizmetler videosu (dikey, 4:5). */
export interface ServicesVideoContent {
  /** Bu dilin videosu; boşsa önizleme ve poster var, oynat düğmesi ve pencere yok. */
  youtubeId: string
  /** Düğmedeki ve penceredeki süre, ör. "0:30". */
  durationLabel: string
  buttonLabel: string
  ariaLabel: string
  title: string
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
    /** Telefonda intro yerine görünen kısa metin (Sanity'de boşsa intro). */
    heroTextMobile: string
    /**
     * Butonların altındaki kanıt satırı: kurulan banka sayısı ve vakanın
     * (insha) kullanıcı ve canlıya çıkış rakamları. Sanity'de kapalıysa yok.
     */
    proof?: FigureItem[]
  }
  /** Açılıştaki tanıtım filmi. `youtubeId` boşsa düğme ve önizleme hiç yok. */
  heroVideo: HeroVideoContent
  /** Four services halkasındaki video. `youtubeId` boşsa düğmesiz önizleme. */
  servicesVideo: ServicesVideoContent
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
  allIssuesLabel: string
  daysUnit: string
  /** Format sayfası (Son Gün v3): Ink açılışın tek satırı. */
  line: string
  /** Bölüm listesine kaydıran Flare buton ("Read the episodes"). */
  startLabel?: string
  /** "Nasıl okunur" bölümü; adım yoksa bölüm çıkmaz. */
  howLabel?: string
  howHeading?: string
  howSteps: { title: string; body: string }[]
  episodesLabel: string
  /** Sayfa sonundaki NextStep başlığı; boşsa sitenin başlığı. */
  closeHeading?: string
}

/** Spark tanıtım filmi (dikey, 4:5). `youtubeId` boşsa Spark sayfasında kart ve ana sayfada düğme hiç yok. */
export interface SparkFilmContent {
  /** Bu dilin filmi (youtubeIdTr / youtubeIdEn'den). */
  youtubeId: string
  /** Kartta ve pencerede süre, ör. "0:28". */
  durationLabel: string
  /** Kartta oynat düğmesinin etiketi. */
  buttonLabel: string
  ariaLabel: string
  /** Pencere başlığı: sayfanın alt başlığı. */
  modalTitle: string
  /** Ana sayfadaki Spark bölümünün düğmesi ("Spark nedir? İzleyin"). */
  homeButtonLabel: string
  closeLabel: string
}

export interface SparkHubContent {
  seo: PageSeoCopy
  bigWord: string
  heading: string
  film: SparkFilmContent
  /** Açılıştaki Flare düğme: formatlar bölümüne iner (film kartı varken). */
  exploreLabel: string
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

/**
 * Yayındaki bir bölüm, bu dildeki ve diğer dildeki slug'larıyla
 * (getSparkEpisodes). `layout` sayfanın şablonunu seçer: Bó hikâye,
 * Nuri karar blokları.
 */
export type SparkEpisodeEntry = SparkEpisodeEntryBase &
  (
    | { layout: 'story'; story: SparkEpisodeStory }
    | { layout: 'decisions'; story: SparkDecisionEpisode }
    | { layout: 'report'; story: SparkReport }
    | { layout: 'dora'; story: SparkDoraReport }
    | { layout: 'radar'; story: SparkRadarEpisode }
  )

interface SparkEpisodeEntryBase {
  launchDate: string | null
  closureDate: string | null
  /** "7 years"; boşsa gün sayısı tarihlerden. */
  durationLabel: string | null
  slug: string
  altSlug: string
  formatSlug: string
  altFormatSlug: string
  publishedAt: string | null
  modifiedAt: string | null
}

/** Bölüm sayfasının ortak etiketleri (Son Gün v3). "{x}" yer tutucuları kodda doldurulur. */
export interface SparkEpisodeLabels {
  /** "{key}" seçilen yolun harfi. */
  yourPickTemplate: string
  roadTemplate: string
  otherRoadsLabel: string
  noteLabel: string
  /** Dar ekran şeridinde "{n}" kartın günü. */
  dayTemplate: string
  /** "{name}" sıradaki bölümün konusu. */
  nextTemplate: string
  /** Dipnot linkinin erişilebilir adı, "{n}" kaynak numarası. */
  footnoteTemplate: string
  /** Bir kaynaktaki iki linkin arası (", and " / " ve "). */
  sourceJoiner: string
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
  /** Gün sayısının yerine geçen süre ("7 years"), bölümde yazılıysa. */
  durationLabel?: string
  href?: NavHref
  /** Gelecek sayılarda durum ("Coming next"), yayındakilerde yayın tarihi. */
  statusLabel: string
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
  /** Sayfaya özel başlık (Son Gün format ve bölüm sayfaları); kesimsiz, daha küçük. */
  heading?: string;
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
  /** Ana sayfadaki tanıtım filmi; `youtubeId` boşsa ya da yoksa düz portre. */
  video?: HeroVideoContent;
  preview?: HeroPreviewSources;
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
  /** Sadece ana sayfada: halkanın ortasındaki video (kimlik boşsa düğmesiz önizleme). /services'te yok. */
  ring?: ServicesRingProps;
}

/** Büyük halka (children: Dial) ve ortasındaki video. */
export interface ServicesRingStageProps {
  ring: ServicesRingProps;
  children: ReactNode;
}

/** Halkanın ortasındaki önizleme ve pencere (ana sayfa Four services). */
export interface ServicesRingProps {
  video: ServicesVideoContent;
  preview: HeroPreviewSources;
  /** Penceredeki etiket satırının ilk parçası ("02 · Dört hizmet"). */
  sectionLabel: string;
  closeLabel: string;
}

export interface HomeOpeningProps {
  content: HomeContent["opening"];
  video: HeroVideoContent;
  /** Önizleme kliplerinin dili (public/video/hero-preview-{locale}.*). */
  locale: string;
}

/** Önizleme klibinin dosyaları (sitenin kendi sunucusundan, YouTube'dan değil). */
export interface HeroPreviewSources {
  mp4: string;
  webm: string;
  poster: string;
  /** Verilirse poster <picture> içinde önce AVIF olarak sunulur. */
  posterAvif?: string;
}

export interface HeroVideoButtonProps {
  video: HeroVideoContent;
  preview: HeroPreviewSources;
  /** Portre: sunucuda üretilen next/image, önizleme bunun üstüne biner. */
  children: ReactNode;
}

export interface VideoModalProps {
  /** YouTube kimliği; oynatıcı sadece pencere açıkken oluşturulur. */
  youtubeId: string;
  title: string;
  /** Başlığın üstündeki küçük etiket satırı (ör. "02 · Dört hizmet · 0:30"). */
  eyebrow?: string;
  /** Oynatıcının en boy oranı (genişlik / yükseklik). Varsayılan 16:9. */
  aspect?: number;
  closeLabel: string;
  open: boolean;
  onClose: () => void;
  /** Kapanınca odağın döneceği kontrol (pencereyi açan düğme). */
  returnFocusRef: RefObject<HTMLElement | null>;
}

export interface HomeWorkProps {
  content: HomeContent["work"];
}

export interface ServicePickerProps {
  services: ServiceSummary[];
  /** Sol sütunun üst kısmı (etiket, başlık, metin), server'da üretilir. */
  intro: ReactNode;
  /** Ana sayfada video varsa büyük halka ve ortasındaki video. */
  ring?: ServicesRingProps;
}

export interface SparkCardsProps {
  content: HomeContent["spark"];
  /** Spark filmi; `youtubeId` boşsa "Spark nedir? İzleyin" düğmesi yok. */
  film: SparkFilmContent;
  /** Penceredeki etiket satırının ilk parçası ("Spark"). */
  sparkLabel: string;
}

export interface SparkFilmCardProps {
  film: SparkFilmContent;
  preview: HeroPreviewSources;
  /** Penceredeki etiket satırının ilk parçası ("Spark"). */
  sparkLabel: string;
}

export interface SparkFilmButtonProps {
  film: SparkFilmContent;
  sparkLabel: string;
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

export interface SparkEpisodeRowProps {
  /** Soldaki sayı ("Nº 01"). */
  number: string;
  title: string;
  line: string;
  /** Mono satır ("156 days · 24 Sep 2026"); dar ekranda gizli, boşsa yok. */
  meta: string;
  /** Yayındaki bölüm: link ve kare ok. Yoksa Stone, linksiz, oksuz. */
  href?: NavHref;
}

export interface StoryCardFace {
  day: string;
  state: string;
}

export interface StoryCardProps {
  mode: SparkCardMode;
  front: StoryCardFace;
  /** Arka yüz (flipped/closed); açılıştaki kartta yok. */
  back?: StoryCardFace;
  className?: string;
}

export interface StoryProviderProps {
  /** Sırayla her durağın kartı (bölümler ve ara bölüm, sayfadaki sırayla). */
  stops: SparkStoryCard[];
  children: ReactNode;
}

export interface StoryStopProps {
  /** stops dizisindeki sıra. */
  index: number;
  id?: string;
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
}

export interface StoryBarProps {
  dayTemplate: string;
  /** Gün saatli bölümde şeritte küçük kart yok. */
  clock?: SparkEpisodeStory["dayClock"];
}

export interface StoryRailProps {
  /** Varsa kartın yerine gün saati. */
  clock?: SparkEpisodeStory["dayClock"];
}

export interface EpisodeStoryProps {
  story: SparkEpisodeStory;
  labels: SparkEpisodeLabels;
  /** Sıradaki sayı yayındaysa bölüm sonundaki satırın linki. */
  nextHref?: NavHref;
}

export interface DecisionEpisodeProps {
  episode: SparkDecisionEpisode;
  /** Okur cevabı e-postasının konusu ("Son Gün Nº 02 · Nuri"). */
  answerSubject: string;
  /** Bölümün EN slug'ı ("02-nuri"): çapa id'leri ve okur cevabındaki bölüm. */
  slug: string;
  lang: Locale;
}

export interface EpisodeRulerProps {
  ticks: SparkRulerTick[];
  after: string;
}

export interface ClockProviderProps {
  children: ReactNode;
}

export interface ClockStopProps {
  /** EpisodeClock'a verilen `stops` dizisindeki sıra. */
  index: number;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

export interface EpisodeClockProps {
  stops: SparkClockStop[];
  rangeLabel: string;
  start: string;
  end: string;
}

export interface ChoiceOptionsProps {
  options: SparkChoiceOption[];
  chosen: string | null;
  onChoose: (key: string) => void;
  /** Grubun erişilebilir adı; `labelledBy` verilirse o kullanılır. */
  groupLabel?: string;
  labelledBy?: string;
}

export interface ChoiceDecisionProps {
  options: SparkChoiceOption[];
  record: string;
  labels: SparkDecisionEpisode["labels"];
  /** "Gerçekte" içeriği, sunucuda render edilir. */
  children: ReactNode;
}

export interface ReaderPollProps {
  poll: SparkReaderPoll;
  episode: string;
  lang: Locale;
  /** Sorunun başlığının id'si (seçenek grubunun adı). */
  questionId: string;
  /** E-posta konusunun başı, her dilde TR ("Son Gün Nº 02 · Nuri"); sonuna " · cevap D". */
  subject: string;
}

export interface BlockSourcesProps {
  label: string;
  sources: SparkSourceLink[];
}

export interface FootnoteTextProps {
  text: string;
  /** "{n}" kaynak numarası (linkin erişilebilir adı). */
  template: string;
}

export interface DecisionTableProps {
  decision: SparkDecision;
  labels: SparkEpisodeLabels;
}

export interface FinalQuestionProps {
  content: SparkEpisodeStory["finalQuestion"];
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
  /** "tr" ise binlik ayraç nokta (65.000), değilse virgül (65,000). */
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

// ─────────────────────────────────────────────
// Kilitli rapor: Tahsildar (/locked/tahsildar)
// Kaynak: docs/locked/tahsildar-report.html. Metin src/content/locked/
// tahsildar/tr.ts, yapılandırılmış veri data.ts. `html` alanları küçük,
// geliştiricinin yazdığı zengin metin parçaları (strong, b ve
// <span class="src"> kaynak etiketi), kullanıcı girdisi değil.
// ─────────────────────────────────────────────

export type TsdBarTone = "ink" | "flare" | "dust"

export interface TsdBarRow {
  label: string
  value: number
  valueLabel: string
  tone: TsdBarTone
}

/** Yatay çubuklu şekil; çubuk genişliği value / max. */
export interface TsdHBarsProps {
  title: string
  sub: string
  rows: TsdBarRow[]
  max: number
  caption: string
  /** Figür üst boşluğu sıfır (yan metinle aynı hizada). */
  flush?: boolean
}

export interface TsdHundredGridProps {
  title: string
  sub: string
  on: number
  unit: string
  ariaLabel: string
  caption: string
}

export interface TsdStat {
  value: string
  small?: string
  label: string
  src: string
}

export interface TsdStatStripProps {
  items: TsdStat[]
}

export interface TsdDecision {
  lead: string
  text: string
}

export interface TsdDecisionListProps {
  items: TsdDecision[]
}

export interface TsdLever {
  title: string
  text: string
}

/** White kart, 4 px Ink üst çizgi: "Yol haritasının özü" ve "Asıl fırsat". */
export interface TsdResultCardProps {
  variant: "proposal" | "key"
  tag: string
  title: string
  text: string
  aside?: string
  levers?: TsdLever[]
}

export interface TsdCard {
  k: string
  title: string
  html: string
  fz?: boolean
  flow?: string[]
}

export type TsdCardVariant = "legs" | "trio" | "pay" | "wins" | "ctx"

export interface TsdCardGridProps {
  variant: TsdCardVariant
  items: TsdCard[]
  flowSep?: string
}

export interface TsdMatrixCell {
  level: 0 | 2 | 3 | 4
  label: string
  note?: string
}

export interface TsdMatrixRow {
  need: string
  cells: TsdMatrixCell[]
}

/** Son sütun Tahsildar (Flare tonlu). */
export interface TsdCapabilityMatrixProps {
  head: string[]
  rows: TsdMatrixRow[]
}

export interface TsdTableProps {
  head: string[]
  rows: string[][]
}

export interface TsdFact {
  title: string
  html: string
}

export interface TsdFactRowProps {
  items: TsdFact[]
  four?: boolean
}

export interface TsdStep {
  lead: string
  text: string
}

export interface TsdStepListProps {
  items: TsdStep[]
}

export interface TsdRisk {
  cat: string
  title: string
  text: string
}

export interface TsdRiskListProps {
  items: TsdRisk[]
}

export interface TsdNoteProps {
  html: string
  label: string
}

export interface TsdRingSector {
  cat: string
  main: string
  alts: string[]
  title: string
  text: string
  alt: string
}

export interface TsdPartnerRingProps {
  sectors: TsdRingSector[]
  figureTitle: string
  figureSub: string
  ariaLabel: string
  centerTitle: string
  centerSub: string
  /** "{cat}, ana ortak" kalıbındaki ek. */
  detailSuffix: string
  altsLabel: string
}

export interface TsdPhaseColumn {
  heading: string
  items: string[]
}

export interface TsdPhase {
  num: string
  when: string
  left: number
  title: string
  goal: string
  columns: TsdPhaseColumn[]
  exit: string
}

export interface TsdRoadmapProps {
  phases: TsdPhase[]
  ariaLabel: string
  exitLabel: string
}

export interface TsdUseCaseNode {
  id: string
  role: string
  name: string
}

export interface TsdUseCaseStep {
  title: string
  nodes: string[]
  text: string
}

export interface TsdUseCaseStepperProps {
  chain: TsdUseCaseNode[]
  partners: TsdUseCaseNode[]
  steps: TsdUseCaseStep[]
  labels: { prev: string; next: string; restart: string; play: string; stop: string }
}

export interface TsdMeeting {
  phase: number
  live: boolean
  title: string
  who: string
  text: string
}

export interface TsdMeetingFilter {
  key: "all" | "0" | "1" | "2"
  label: string
}

export interface TsdMeetingListProps {
  meetings: TsdMeeting[]
  filters: TsdMeetingFilter[]
  labels: {
    filterAria: string
    countSuffix: string
    phase: string
    live: string
    firstFour: string
  }
}

export type TsdBlock =
  | { type: "h3"; text: string }
  | { type: "prose"; paras: string[]; space?: "md" | "lg" }
  | { type: "small"; html: string }
  | { type: "pull"; text: string }
  | { type: "note"; html: string }
  | { type: "hbars"; figure: TsdHBarsProps }
  | { type: "grid100"; figure: TsdHundredGridProps }
  | { type: "two"; items: TsdBlock[] }
  | { type: "result"; card: TsdResultCardProps }
  | { type: "cards"; grid: TsdCardGridProps }
  | { type: "matrix"; table: TsdCapabilityMatrixProps }
  | { type: "table"; table: TsdTableProps }
  | { type: "facts"; row: TsdFactRowProps }
  | { type: "steps"; items: TsdStep[] }
  | { type: "risks"; items: TsdRisk[] }
  | { type: "ring"; ring: TsdPartnerRingProps }
  | { type: "roadmap"; roadmap: TsdRoadmapProps }
  | { type: "useCase"; useCase: TsdUseCaseStepperProps }
  | { type: "meetings"; meetings: TsdMeetingListProps }

export interface TsdChapter {
  id: string
  nav: string
  eyebrow: string
  title: string
  lede: string
  blocks: TsdBlock[]
}

export interface TsdChainHeroProps {
  nodes: { title: string; sub: string }[]
  bracket: string
  legendGoods: string
  legendMoney: string
}

export interface TsdCutWordProps {
  text: string
}

export interface TsdHero {
  id: string
  eyebrow: string
  titleLead: string
  titleCut: string
  sub: string
  author: string
  authorMeta: string
  chain: TsdChainHeroProps
  stats: TsdStat[]
  summary: {
    eyebrow: string
    title: string
    items: TsdDecision[]
    result: TsdResultCardProps
  }
}

export interface TsdHeroProps {
  hero: TsdHero
}

export interface TsdClosingStageProps {
  id: string
  quote: string
  lede: string
  name: string
  contact: string[]
  method: string
  sourcesLabel: string
  sources: string[]
}

export interface TsdTopBarProps {
  heroId: string
  navLabel: string
  chapters: { id: string; nav: string }[]
}

export interface TahsildarReportContent {
  navLabel: string
  noteLabel: string
  hero: TsdHero
  chapters: TsdChapter[]
  closing: TsdClosingStageProps
}

export interface TahsildarReportProps {
  content: TahsildarReportContent
}

export interface TsdBlockRendererProps {
  block: TsdBlock
  noteLabel: string
}

// Sektör raporu bileşenleri (components/spark/report)
export interface ReportEpisodeProps {
  report: SparkReport
  locale: Locale
  /** "Source {n}" dipnot linkinin erişilebilir adı. */
  footnoteTemplate: string
}

export interface ReportRefsProps {
  text: string
  template: string
}

export interface ReportHeadProps {
  head: ReportHead
  id: string
}

export interface ReportNavProps {
  items: { id: string; label: string }[]
}

export interface ReportCountFigureProps {
  figure: ReportCountFigure
  locale: Locale
}

// Sektör raporu Nº 02 DORA bileşenleri (components/spark/report/dora)
export interface DoraEpisodeProps {
  report: SparkDoraReport
  locale: Locale
}

export interface DoraInlineProps {
  text: string
  locale: Locale
}

export interface DoraBlocksProps {
  blocks: DoraBlock[]
  locale: Locale
}

export interface DominoSimProps {
  content: DominoContent
}

export interface DoraPhoneProps {
  phone: DoraPhoneContent
  scene: 0 | 1 | 2
  /** Sahne 3'ün etiketi değişti mi ("Ertelendi"). */
  postponed: boolean
  className?: string
}

export interface DoraStoryProps {
  story: SparkDoraReport['story']
  locale: Locale
}

export interface DoraTimelineProps {
  timeline: SparkDoraReport['origin']['timeline']
}

export interface DoraDeskProps {
  options: { key: string; text: string }[]
  groupLabel: string
  children: ReactNode
}

export interface PoolSimulatorProps {
  content: SparkReport['simulator']
  locale: Locale
  footnoteTemplate: string
}

export interface TrendChartProps {
  content: SparkReport['market']
  locale: Locale
  footnoteTemplate: string
}

export interface ReportLessonsProps {
  groups: SparkReport['lessons']['groups']
}

// ─────────────────────────────────────────────
// On the Radar (Spark format 03). Bölüm gövdesi tek JSON
// (src/content/radar/<slug>.json, Sanity'de sparkEpisode.radarBody);
// dilden bağımsız kısım `RadarData`, dile bağlı kısım `RadarText`.
// ─────────────────────────────────────────────

/** Beş sinyal, radarda başlangıç üstte ve saat yönünde bu sırayla. */
export type RadarSignal = 'gelir' | 'urun' | 'dagitim' | 'insan' | 'teknoloji'
export type RadarValues = Record<RadarSignal, number>
/** Dokuz kutulu tuvalin kutuları; `kakr` ve `chcr` iki satıra yayılan birleşik kutular. */
export type RadarBlockId = 'kp' | 'ka' | 'kr' | 'kakr' | 'vp' | 'cr' | 'ch' | 'chcr' | 'cs' | 'cost' | 'rev'
export type RadarOptionKey = 'a' | 'b' | 'c' | 'd'
export type RadarCalcFormat = 'eur' | 'pct' | 'dec'
export type RadarFlowKind = 'money' | 'data' | 'offer'

export interface RadarBlockDef {
  id: RadarBlockId
  /** strong: koyu kutu, quiet: beyaz kutu. */
  kind: 'strong' | 'quiet'
  signal: RadarSignal
  weight: number
}

export interface RadarMoveDef {
  id: string
  /** Hamlenin tuvaldeki yeri; hamle yapıldığında bu kutu da dolar. */
  ours: RadarBlockId
  difficulty: 1 | 2 | 3
  /** Hamle cevaplandığında panodaki radara eklenen değer. */
  bonus?: Partial<RadarValues>
  /** Taş çekilince kesik çizgiye dönen kutular. */
  hits: RadarBlockId[]
  /** Taş çekilince radardan düşen değer (negatif). */
  drop?: Partial<RadarValues>
  keystone?: boolean
}

export interface RadarUsecaseStepDef {
  from?: string
  to?: string
  kind?: RadarFlowKind
}

export interface RadarCalcInputDef {
  id: string
  min: number
  max: number
  step: number
  value: number
  fmt: RadarCalcFormat
}

export interface RadarCalcOutputDef {
  id: string
  /** Girdi kimlikleriyle yazılmış aritmetik ifade ("tutar * ucret / 100"). */
  expr: string
  fmt: RadarCalcFormat
  main?: boolean
  /** Bölüşüm çubuğundaki payı. */
  part?: number
}

export interface RadarSource {
  title: string
  url: string
}

export interface RadarData {
  blocks: RadarBlockDef[]
  /** Tuval paragraflarının sırası. */
  order: RadarBlockId[]
  guess: { correct: RadarOptionKey; fills: RadarBlockId }
  usecase?: {
    actors: string[]
    steps: RadarUsecaseStepDef[]
    calc?: { inputs: RadarCalcInputDef[]; outputs: RadarCalcOutputDef[] }
  }
  moves: RadarMoveDef[]
  sources: RadarSource[]
  compare?: { cols: string[]; highlight?: number }
}

export interface RadarBlockText {
  label: string
  /** Küçük tuval ve telefondaki kısa etiket. */
  short: string
  tag: string
  mini: string
  full: string
  para: string
  note?: string
}

export interface RadarUsecaseStepText {
  title: string
  flow?: string
  body: string[]
  ledger?: Record<string, string>
}

export interface RadarCalcOutputText {
  label: string
  share?: string
}

export interface RadarText {
  titleTag: string
  listHook: string
  place: string
  /** Açılıştaki büyük konturlu rakam ve altındaki etiket (Son Gün Fidor'daki gibi şirkete özel); yoksa format numarası. */
  figure?: { value: string; label: string }
  headline: string
  line: string
  lead: string
  /** [etiket, değer] çiftleri. */
  idcard: [string, string][]
  why: string[]
  guess: {
    title: string
    options: Record<RadarOptionKey, string>
    feedback: Record<RadarOptionKey, string>
    answer: string[]
  }
  usecase?: {
    title: string
    intro: string[]
    actors: Record<string, { label: string; sub: string }>
    steps: RadarUsecaseStepText[]
    calc?: {
      title: string
      intro: string[]
      inputs: Record<string, string>
      outputs: Record<string, string | RadarCalcOutputText>
      note?: string
    }
  }
  canvas: { title: string; intro: string[] }
  blocks: Partial<Record<RadarBlockId, RadarBlockText>>
  moves: Record<string, { title: string; q: string; pull: string; why: string[] }>
  weak: { items: { t: string; ctx: string; q: string }[]; follow?: string }
  final: { title: string; signals: Record<RadarSignal, { level: string; note: string }> }
  view: { first: string; body: string[] }
  close: { title: string; line: string; cta: string }
  disclaimer: string
  keystone: { title: string; intro: string[]; answer: string[] }
  compare?: {
    title: string
    intro?: string[]
    rows: { label: string; cells: string[] }[]
    takeaway?: string[]
  }
}

/** Sanity'de ve src/content/radar/*.json'da duran ham gövde: ortak kısım ve iki dil. */
export type RadarBody = Omit<RadarData, 'sources'> & {
  sources: { title: Record<Locale, string>; url: string }[]
  en: RadarText
  tr: RadarText
}

/** src/content/radar/<slug>.json: gövde ve belgenin kendi alanlarının kaynağı olan üst bilgi. */
export interface RadarFile extends RadarBody {
  number: string
  slug: string
  company: string
  city: string
  country: string
  /** Yayın tarihi (YYYY-MM-DD). */
  publishDate: string
}

/** Bir On the Radar sayısı, bir dile indirilmiş hali (bölüm sayfasının `story`'si). */
export interface SparkRadarEpisode {
  number: number
  /** Şirket adı, kendi büyük küçük harfiyle ("finmid"). */
  subject: string
  hook: string
  seo: PageSeoCopy
  country: string
  data: RadarData
  text: RadarText
}

/** Bölüm sayfasının sabit etiketleri (src/content/spark-radar.ts). "{x}" yer tutucuları kodda doldurulur. */
export interface RadarEpisodeLabels {
  signal: string
  why: string
  guess: string
  right: string
  wrong: string
  canvas: string
  compare: string
  usecase: string
  usecaseBack: string
  usecaseNext: string
  /** "{i}" adım, "{n}" toplam. */
  usecaseStep: string
  calc: string
  moves: string
  keystonePrompt: string
  keystonePlace: string
  keystoneAnswer: string
  keystoneBack: string
  /** "{n}" hamle numarası, "{suffix}" numaraya eklenen ek ("'i", "'yi", "'ü"; İngilizcede boş). */
  keystoneTry: string
  keystoneSuffixes: string[]
  keystoneTower: string
  /** "{i}" hamle, "{n}" toplam. */
  moveCount: string
  copy: string
  difficulty: [string, string, string]
  weak: string
  weakTitle: string
  picked: string
  full: string
  radar: string
  view: string
  sources: string
  next: string
  board: string
  radarStart: string
  /** "{a}" ve "{b}": en güçlü iki sinyal. */
  radarDone: string
  /** "{n}" dolu kutu, "{t}" toplam. */
  openBoard: string
  close: string
  canvasLabel: string
  /** Sinyallerin büyük harfli ve küçük harfli adları. */
  signals: Record<RadarSignal, string>
  signalsLower: Record<RadarSignal, string>
}

export interface RadarEpisodeProps {
  episode: SparkRadarEpisode
  labels: RadarEpisodeLabels
  locale: Locale
  /** "Source {n}" dipnot linkinin erişilebilir adı. */
  footnoteTemplate: string
}

/** Format sayfasının sabit metni (src/content/spark-radar.ts), kelimesi kelimesine prototipten. */
export interface RadarFormatCopy {
  kicker: string
  latest: string
  readLong: string
  readShort: string
  all: string
  /** "{n}" yayındaki sayı. */
  countOne: string
  countMany: string
  filter: string
  filterAll: string
  strongest: string
  showAll: string
  about: string
  howTitle: string
  aboutLines: string[]
  steps: { title: string; body: string }[]
  fiveLabel: string
  five: { name: string; body: string }[]
  signals: Record<RadarSignal, string>
  signalsLower: Record<RadarSignal, string>
  next: string
  closeTitle: string
  closeLine: string
  cta: string
  disclaimer: string
  radarLabel: string
}

/** Format sayfasındaki bir sayı: radar şekli bölümün kendi JSON'undan. */
export interface RadarIssue {
  numberLabel: string
  company: string
  place: string
  country: string
  headline: string
  hook: string
  values: RadarValues
  strongest: RadarSignal
  href: NavHref
}

export interface RadarFormatPageProps {
  format: SparkFormatContent
  copy: RadarFormatCopy
  sparkLabel: string
  /** Yayındaki sayılar, en yenisi başta. */
  issues: RadarIssue[]
}

export interface RadarShapeProps {
  values: RadarValues
  /** Eksen etiketleri (büyük harfli ad), verilmezse etiket çizilmez. */
  labels?: Record<RadarSignal, string>
  /** Etiketi koyu yazılacak sinyaller (panoda yanmış olanlar); verilmezse hepsi. */
  lit?: Partial<Record<RadarSignal, boolean>>
  radius: number
  viewBox: string
  /** Değeri 0 olan eksenlerde nokta çizilmez; poligon her zaman en az .04. */
  dots?: boolean
  className?: string
  tone?: 'paper' | 'ink'
  title: string
}

// On the Radar bileşenleri (components/spark/radar)
export interface RadarRichProps {
  text: string
  /** "Source {n}" dipnot linkinin erişilebilir adı. */
  template: string
}

export interface RadarParasProps {
  items: string[]
  template: string
  className?: string
}

export interface RadarCanvasProps {
  blocks: RadarBlockDef[]
  texts: RadarText['blocks']
  /** mini: panodaki canlı tuval · full: tam resim · ks: taşıyıcı taş oyunundaki etiket tuvali. */
  mode: 'mini' | 'full' | 'ks'
  template: string
  /** mini: dolmuş kutular. */
  filled?: ReadonlySet<string>
  /** ks: çekilen hamlenin vurduğu kutular. */
  hits?: ReadonlySet<string>
  /** Kısa süre çerçevelenen kutu (hamlenin tuvaldeki yeri). */
  highlight?: string | null
  /** Verilirse tuval adlı bir grup (tam resim); verilmezse dekoratif, ekran okuyucudan gizli. */
  label?: string
  className?: string
}

export interface RadarGuessProps {
  text: RadarText['guess']
  guess: RadarData['guess']
  labels: Pick<RadarEpisodeLabels, 'guess' | 'right' | 'wrong'>
  template: string
  onAnswer: (blockId: RadarBlockId) => void
}

export interface RadarUsecaseProps {
  data: NonNullable<RadarData['usecase']>
  text: NonNullable<RadarText['usecase']>
  labels: Pick<RadarEpisodeLabels, 'usecase' | 'usecaseBack' | 'usecaseNext' | 'usecaseStep' | 'calc'>
  locale: Locale
  template: string
}

export interface RadarCalcProps {
  calc: NonNullable<NonNullable<RadarData['usecase']>['calc']>
  text: NonNullable<NonNullable<RadarText['usecase']>['calc']>
  label: string
  locale: Locale
  template: string
}

export interface RadarKeystoneProps {
  data: RadarData
  text: RadarText
  labels: RadarEpisodeLabels
  template: string
  /** Tam resmin değerleri; oyunun radarı buradan başlar. */
  full: RadarValues
  /** Bir taş çekildi: bütün hamleler cevaplanmış sayılır, `ours` kutuları dolar. */
  onPull: (moveId: string) => void
}

export interface RadarWeakProps {
  text: RadarText['weak']
  labels: Pick<RadarEpisodeLabels, 'weak' | 'weakTitle' | 'picked'>
  template: string
}

export interface RadarCompareProps {
  text: NonNullable<RadarText['compare']>
  data: NonNullable<RadarData['compare']>
  label: string
  template: string
}

export interface RadarBoardProps {
  data: RadarData
  text: RadarText
  labels: RadarEpisodeLabels
  template: string
  filled: ReadonlySet<string>
  answered: ReadonlySet<string>
  highlight: string | null
}

export interface RadarOpeningProps {
  episode: SparkRadarEpisode
  formatName: string
  /** Büyük konturlu format numarası ("03"). */
  formatNumber: string
  /** "Nº 01". */
  numberLabel: string
  backLabel: string
  template: string
}

export interface RadarCloseProps {
  text: RadarText
  nextLabel: string
  template: string
}

export interface RadarSourcesProps {
  sources: RadarSource[]
  label: string
  disclaimer: string
  template: string
}

export interface RadarGlyphProps {
  index: number
}

export interface RadarNetProps {
  labels: Record<RadarSignal, string>
}

export interface RadarIssueListProps {
  issues: RadarIssue[]
  copy: RadarFormatCopy
}
