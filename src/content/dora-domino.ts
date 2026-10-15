import type { DominoBackupTarget, DominoCountry, DominoService, Locale } from "@/types/content";

/**
 * Sektör raporu Nº 02 DORA, Domino simülasyonunun ağı (Claude Code
 * görevi §4, tablo birebir). Sağlayıcılar, kurumlar, servis bağımlılıkları
 * ve DORA modundaki yedekler. Kurgu kurumlar; yapı ESAs 2025 olay
 * raporundan esinleniyor. P5 ve P6'nın hiçbir kurumda yedeği yok (bilinçli).
 * Toplam servis sayısı buradan hesaplanır, elle yazılmaz (lib/domino.ts).
 * spark-dora.ts bunu dile indirip rapor gövdesine koyar.
 */

type Bi = Record<Locale, string>;

interface ProviderSeed {
  id: string;
  name: Bi;
}

interface InstitutionSeed {
  id: string;
  name: Bi;
  type: Bi;
  country: DominoCountry;
  deps: Partial<Record<DominoService, string[]>>;
  backups: { service: DominoService; from: string; to: DominoBackupTarget }[];
}

export const dominoProviders: ProviderSeed[] = [
  { id: "P1", name: { tr: "Bulut A", en: "Cloud A" } },
  { id: "P2", name: { tr: "Bulut B", en: "Cloud B" } },
  { id: "P3", name: { tr: "Veri merkezi", en: "Data centre" } },
  { id: "P4", name: { tr: "Kart işlemcisi", en: "Card processor" } },
  { id: "P5", name: { tr: "Ana bankacılık yazılımı", en: "Core banking software" } },
  { id: "P6", name: { tr: "Ortak ödeme altyapısı", en: "Shared payment rail" } },
];

/** Listede olmayan yedekler (ikinci işlemci, ikincil veri merkezi). */
export const dominoBackupNames: Record<"proc2" | "dc2", Bi> = {
  proc2: { tr: "İkinci işlemci", en: "Second processor" },
  dc2: { tr: "İkincil veri merkezi", en: "Secondary data centre" },
};

const bank: Bi = { tr: "Banka", en: "Bank" };
const payment: Bi = { tr: "Ödeme kuruluşu", en: "Payment institution" };

export const dominoInstitutions: InstitutionSeed[] = [
  {
    id: "I1",
    name: { tr: "Banka Kuzey", en: "North Bank" },
    type: bank,
    country: "DE",
    deps: { app: ["P1", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "app", from: "P1", to: "P2" }],
  },
  {
    id: "I2",
    name: { tr: "Banka Ren", en: "Rhine Bank" },
    type: bank,
    country: "DE",
    deps: { app: ["P2", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "card", from: "P4", to: "proc2" }],
  },
  {
    id: "I3",
    name: { tr: "Dijital Banka", en: "Digital Bank" },
    type: { tr: "Dijital banka", en: "Digital bank" },
    country: "DE",
    deps: { app: ["P1"], card: ["P4"], transfer: ["P1", "P6"] },
    backups: [
      { service: "app", from: "P1", to: "P2" },
      { service: "transfer", from: "P1", to: "P2" },
    ],
  },
  {
    id: "I4",
    name: { tr: "Banka Delta", en: "Delta Bank" },
    type: bank,
    country: "NL",
    deps: { app: ["P3", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "app", from: "P3", to: "dc2" }],
  },
  {
    id: "I5",
    name: { tr: "Alfa Ödeme", en: "Alpha Pay" },
    type: payment,
    country: "NL",
    deps: { app: ["P1"], card: ["P4"], transfer: ["P6"] },
    backups: [{ service: "card", from: "P4", to: "proc2" }],
  },
  {
    id: "I6",
    name: { tr: "Beta Ödeme", en: "Beta Pay" },
    type: payment,
    country: "FR",
    deps: { app: ["P2"], card: ["P4"], transfer: ["P2", "P6"] },
    backups: [],
  },
  {
    id: "I7",
    name: { tr: "Gama Para", en: "Gamma Money" },
    type: { tr: "E-para kuruluşu", en: "E-money institution" },
    country: "FR",
    deps: { app: ["P1"], card: ["P4"], transfer: ["P1", "P6"] },
    backups: [
      { service: "app", from: "P1", to: "P2" },
      { service: "transfer", from: "P1", to: "P2" },
    ],
  },
  {
    id: "I8",
    name: { tr: "Banka Loire", en: "Loire Bank" },
    type: bank,
    country: "FR",
    deps: { app: ["P3", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "app", from: "P3", to: "dc2" }],
  },
  {
    id: "I9",
    name: { tr: "Atlas Sigorta", en: "Atlas Insurance" },
    type: { tr: "Sigortacı", en: "Insurer" },
    country: "ES",
    deps: { app: ["P2", "P3"], transfer: ["P6"] },
    backups: [{ service: "app", from: "P3", to: "dc2" }],
  },
  {
    id: "I10",
    name: { tr: "Yatırım Platformu", en: "Invest Platform" },
    type: { tr: "Yatırım platformu", en: "Investment platform" },
    country: "ES",
    deps: { app: ["P1"], transfer: ["P6"] },
    backups: [{ service: "app", from: "P1", to: "P2" }],
  },
  {
    id: "I11",
    name: { tr: "Banka Ebro", en: "Ebro Bank" },
    type: bank,
    country: "ES",
    deps: { app: ["P3", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "card", from: "P4", to: "proc2" }],
  },
  {
    id: "I12",
    name: { tr: "Banka Tajo", en: "Tajo Bank" },
    type: bank,
    country: "ES",
    deps: { app: ["P2", "P5"], card: ["P4"], transfer: ["P5", "P6"] },
    backups: [{ service: "app", from: "P2", to: "P1" }],
  },
];
