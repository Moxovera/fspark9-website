import { track } from "@vercel/analytics";
import { kitFormAction } from "@/lib/newsletter";
import type { LeadFormPlacement, Locale } from "@/types/content";

/**
 * Lead sayfası (/uk-sme) gönderimi. Sunucu yok, her lead tarayıcıdan sitenin
 * Kit formuna gider (Spark kilidi ve footer şeridiyle aynı form, `fetch` +
 * `Accept: application/json`). Kit onay mailini her zamanki gibi yollar ama
 * PDF onayı beklemez. Ek alanlar `fields[...]` olarak gider; Kit'te aynı
 * anahtarla bir özel alan varsa abonenin üstüne yazılır, yoksa yok sayılır.
 * Onay kutusu `fields[spark_consent]` (yes / no) olarak kaydedilir.
 *
 * İstek `keepalive` ile ve beklenmeden gönderilir: okur PDF için hiçbir
 * cevabı beklemez, hata sadece konsola yazılır.
 */
export const LEAD_SOURCE = "leadmagnet-uk-sme";
export const LEAD_FORM_ID = "lead-form";
/** PDF ve paylaşım görseli değişince artar: tarayıcı ve LinkedIn yenisini çeker (dosya adı aynı kalır). */
export const LEAD_ASSET_VERSION = "2";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type LeadUtm = Record<UtmKey, string>;

export interface LeadPayload extends LeadUtm {
  email: string;
  lang: Locale;
  consent: boolean;
  source: typeof LEAD_SOURCE;
  form: LeadFormPlacement;
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email);
}

export function readUtm(): LeadUtm {
  const query = new URLSearchParams(window.location.search);
  return {
    utm_source: query.get("utm_source") ?? "",
    utm_medium: query.get("utm_medium") ?? "",
    utm_campaign: query.get("utm_campaign") ?? "",
    utm_content: query.get("utm_content") ?? "",
  };
}

export type LeadEvent = "lead_page_view" | "lead_submit" | "lead_pdf_download" | "lead_sticky_click";

/** Vercel Web Analytics özel olayı: her olayda dil ve utm_campaign. */
export function trackLead(event: LeadEvent, lang: Locale, extra?: Record<string, string>) {
  try {
    track(event, { lang, utm_campaign: readUtm().utm_campaign || "none", ...extra });
  } catch (error) {
    console.error("lead: analytics event failed", event, error);
  }
}

async function sendToKit(payload: LeadPayload) {
  const action = kitFormAction(payload.lang);
  if (!action) throw new Error("Kit form action is not set");
  const body = new FormData();
  body.set("email_address", payload.email);
  body.set("fields[source]", payload.source);
  body.set("fields[lead_form]", payload.form);
  body.set("fields[lead_lang]", payload.lang);
  body.set("fields[spark_consent]", payload.consent ? "yes" : "no");
  for (const key of UTM_KEYS) if (payload[key]) body.set(`fields[${key}]`, payload[key]);
  const response = await fetch(action, { method: "POST", body, headers: { Accept: "application/json" }, keepalive: true });
  if (!response.ok) throw new Error(`Kit responded ${response.status}`);
  const data: unknown = await response.json().catch(() => null);
  if (typeof data === "object" && data !== null && (data as { status?: unknown }).status === "error") {
    throw new Error("Kit rejected the address");
  }
}

export function submitLead(payload: LeadPayload) {
  sendToKit(payload).catch((error: unknown) => console.error("lead: signup call failed", error));
}
