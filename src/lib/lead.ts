import { track } from "@vercel/analytics";
import { kitFormAction } from "@/lib/newsletter";
import { WEB3FORMS_ENDPOINT } from "@/lib/sparkAnswer";
import type { LeadFormPlacement, Locale } from "@/types/content";

/**
 * Lead sayfası (/uk-sme) gönderimi. Sunucu yok, sitenin iki mevcut
 * gönderim yolu tarayıcıdan:
 *
 * - Onay kutusu işaretliyse aynı Kit formu (Spark kilidi ve footer şeridiyle
 *   ortak, `submitToKit` gibi `fetch` + `Accept: application/json`). Ek
 *   alanlar Kit'in form uç noktasına `fields[...]` olarak gider; Kit'te aynı
 *   anahtarla bir özel alan varsa abonenin üstüne yazılır, yoksa yok sayılır.
 * - Her lead (onaylı ya da değil) Web3Forms'a (Nº 02 okur anketinin
 *   kullandığı anahtar) tek satır kayıt olarak: e-posta, kaynak, form, dil,
 *   onay, UTM. Onaysız lead sadece burada durur, Spark listesine girmez.
 *
 * İkisi de `keepalive` ile ve beklenmeden gönderilir: okur PDF için hiçbir
 * cevabı beklemez, hata sadece konsola yazılır.
 */
export const LEAD_SOURCE = "leadmagnet-uk-sme";
export const LEAD_FORM_ID = "lead-form";

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
  for (const key of UTM_KEYS) if (payload[key]) body.set(`fields[${key}]`, payload[key]);
  const response = await fetch(action, { method: "POST", body, headers: { Accept: "application/json" }, keepalive: true });
  if (!response.ok) throw new Error(`Kit responded ${response.status}`);
  const data: unknown = await response.json().catch(() => null);
  if (typeof data === "object" && data !== null && (data as { status?: unknown }).status === "error") {
    throw new Error("Kit rejected the address");
  }
}

async function sendToLog(payload: LeadPayload) {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
  if (!key) throw new Error("NEXT_PUBLIC_WEB3FORMS_KEY is not set");
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    keepalive: true,
    body: JSON.stringify({
      access_key: key,
      subject: `Lead ${payload.source} · ${payload.lang} · ${payload.form} · consent ${payload.consent ? "yes" : "no"}`,
      from_name: "fspark9 lead page",
      botcheck: "",
      ...payload,
      consent: payload.consent ? "yes" : "no",
    }),
  });
  if (!response.ok) throw new Error(`Web3Forms responded ${response.status}`);
}

export function submitLead(payload: LeadPayload) {
  const jobs: Promise<void>[] = [sendToLog(payload)];
  if (payload.consent) jobs.push(sendToKit(payload));
  void Promise.allSettled(jobs).then((results) => {
    results.forEach((result) => {
      if (result.status === "rejected") console.error("lead: signup call failed", result.reason);
    });
  });
}
