import { kitFormAction } from "@/lib/newsletter";
import type { Locale } from "@/types/content";

/**
 * Spark okurunun tarayıcıdaki durumu (localStorage). Bülten formlarının
 * hepsi bu anahtarı ortak kullanır; sunucuya gitmez. Her okuma ve yazma
 * try/catch içinde: depolama çalışmazsa `available` false olur ve kilit
 * hiç gösterilmez.
 */
export const READER_KEY = "fspark9_spark_reader";
const COUNTED_KEY = "fspark9_spark_reminder_counted";

export type ReaderStatus = "pending" | "confirmed";

export interface SparkReaderState {
  email: string;
  status: ReaderStatus;
  /** Kayıt zamanı (ISO). */
  since: string;
  /** Hatırlatmanın gösterildiği ziyaret sayısı. */
  reminders: number;
  /** Bu zamana kadar hatırlatma yok (ISO) ya da null. */
  snoozedUntil: string | null;
}

export interface ReaderSnapshot {
  /** İstemcide depolama okundu mu (SSR ve hidrasyonda false). */
  ready: boolean;
  /** Depolama çalışıyor mu. */
  available: boolean;
  reader: SparkReaderState | null;
}

export const MAX_REMINDERS = 3;
const DAY_MS = 24 * 60 * 60 * 1000;
export const SNOOZE_DAYS = 14;
export const REMINDER_WINDOW_DAYS = 60;

const SERVER_SNAPSHOT: ReaderSnapshot = { ready: false, available: false, reader: null };

let snapshot: ReaderSnapshot = SERVER_SNAPSHOT;
let lastRaw: string | null = null;
const listeners = new Set<() => void>();

function parse(raw: string | null): SparkReaderState | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const v = value as Record<string, unknown>;
    if (v.status !== "pending" && v.status !== "confirmed") return null;
    return {
      email: typeof v.email === "string" ? v.email : "",
      status: v.status,
      since: typeof v.since === "string" ? v.since : new Date().toISOString(),
      reminders: typeof v.reminders === "number" ? v.reminders : 0,
      snoozedUntil: typeof v.snoozedUntil === "string" ? v.snoozedUntil : null,
    };
  } catch {
    return null;
  }
}

/** Depoyu okur; değişen bir şey varsa anlık görüntüyü yeniler. */
function load() {
  let available = true;
  let raw: string | null = null;
  try {
    const probe = "fspark9_probe";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    raw = window.localStorage.getItem(READER_KEY);
  } catch {
    available = false;
  }
  if (snapshot.ready && snapshot.available === available && raw === lastRaw) return;
  lastRaw = raw;
  snapshot = { ready: true, available, reader: parse(raw) };
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeReader(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== READER_KEY) return;
    load();
    emit();
  };
  window.addEventListener("storage", onStorage, { passive: true });
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getReaderSnapshot(): ReaderSnapshot {
  return snapshot;
}

export function getServerReaderSnapshot(): ReaderSnapshot {
  return SERVER_SNAPSHOT;
}

function write(next: SparkReaderState) {
  try {
    window.localStorage.setItem(READER_KEY, JSON.stringify(next));
  } catch {
    // Depolama kapalı: durum bu sayfa görünümünde bile saklanmaz.
  }
  load();
  emit();
}

/** Yeni kayıt: onay bekliyor. Aynı adres zaten pending ise sayaçlar korunur. */
export function markPending(email: string) {
  const current = snapshot.reader;
  if (current && current.status === "confirmed" && current.email === email) return;
  if (current && current.status === "pending" && current.email === email) return;
  write({ email, status: "pending", since: new Date().toISOString(), reminders: 0, snoozedUntil: null });
}

const SUBMITTED_KEY = "fspark9_spark_submitted";

/** Düz HTML formlar (footer, sabit kutu...) sayfadan ayrılmadan önce adresi oturumda tutar. */
export function rememberSubmittedEmail(email: string) {
  try {
    window.sessionStorage.setItem(SUBMITTED_KEY, email.trim());
  } catch {
    // Oturum depolaması kapalı: teşekkür sayfası adressiz yazar.
  }
}

/** Teşekkür sayfaları: adres bilinmeyebilir (boş kalır), mevcut kayıt korunur. */
export function markPendingFromThanks() {
  if (!snapshot.ready) load();
  let email = "";
  try {
    email = window.sessionStorage.getItem(SUBMITTED_KEY) ?? "";
    window.sessionStorage.removeItem(SUBMITTED_KEY);
  } catch {
    // Okunamadı: adressiz devam.
  }
  const current = snapshot.reader;
  if (current && (current.status === "confirmed" || !email || current.email === email)) return;
  write({ email, status: "pending", since: new Date().toISOString(), reminders: 0, snoozedUntil: null });
}

export function markConfirmed(email?: string) {
  if (!snapshot.ready) load();
  const current = snapshot.reader;
  write({
    email: email ?? current?.email ?? "",
    status: "confirmed",
    since: current?.since ?? new Date().toISOString(),
    reminders: 0,
    snoozedUntil: null,
  });
}

/** "Adresi değiştir": yeni adres, sayaçlar sıfır. */
export function replaceEmail(email: string) {
  write({ email, status: "pending", since: new Date().toISOString(), reminders: 0, snoozedUntil: null });
}

/** Hatırlatma kapatıldı: 14 gün gösterilmez. */
export function snoozeReminder() {
  const current = snapshot.reader;
  if (!current) return;
  write({ ...current, snoozedUntil: new Date(Date.now() + SNOOZE_DAYS * DAY_MS).toISOString() });
}

/**
 * Hatırlatma gösterilsin mi? Onay bekleyen okur, kayıttan 60 günden az,
 * ertelenmemiş ve en fazla 3 farklı ziyarette. Aynı ziyarette (oturumda)
 * başka kilitli sayfaya geçerse tekrar sayılmaz, gösterilmeye devam eder.
 */
export function reminderDue(reader: SparkReaderState | null): boolean {
  if (!reader || reader.status !== "pending" || !reader.email) return false;
  const now = Date.now();
  if (now - Date.parse(reader.since) > REMINDER_WINDOW_DAYS * DAY_MS) return false;
  if (reader.snoozedUntil && Date.parse(reader.snoozedUntil) > now) return false;
  return sessionCounted() || reader.reminders < MAX_REMINDERS;
}

function sessionCounted(): boolean {
  try {
    return window.sessionStorage.getItem(COUNTED_KEY) === "1";
  } catch {
    return false;
  }
}

/** Hatırlatma ekrana gelince bu ziyareti bir kez sayar. */
export function countReminderVisit() {
  const current = snapshot.reader;
  if (!current || sessionCounted()) return;
  try {
    window.sessionStorage.setItem(COUNTED_KEY, "1");
  } catch {
    // Oturum depolaması kapalı: sayaç her açılışta artar, 3'te durur.
  }
  write({ ...current, reminders: current.reminders + 1 });
}

export type KitResult = "ok" | "invalid" | "error";

/**
 * Aynı Kit formuna arka planda gönderir (düz HTML formla aynı alan adı).
 * Kit'in form adresi CORS'a açık; sunucu rotası gerekmiyor.
 */
export async function submitToKit(locale: Locale, email: string): Promise<KitResult> {
  const action = kitFormAction(locale);
  if (!action) return "error";
  const body = new FormData();
  body.set("email_address", email);
  try {
    const response = await fetch(action, { method: "POST", body, headers: { Accept: "application/json" } });
    if (response.status === 400 || response.status === 422) return "invalid";
    if (!response.ok) return "error";
    const data: unknown = await response.json().catch(() => null);
    if (typeof data === "object" && data !== null && (data as { status?: unknown }).status === "error") return "invalid";
    return "ok";
  } catch {
    return "error";
  }
}

// Kilitli bir rapor sayfada açıkken sabit bülten kutusu görünmez.
let lockedGates = 0;
const gateListeners = new Set<() => void>();

export function registerLockedGate() {
  lockedGates += 1;
  gateListeners.forEach((listener) => listener());
  return () => {
    lockedGates -= 1;
    gateListeners.forEach((listener) => listener());
  };
}

export function subscribeGate(listener: () => void) {
  gateListeners.add(listener);
  return () => {
    gateListeners.delete(listener);
  };
}

export function getGateLocked() {
  return lockedGates > 0;
}
