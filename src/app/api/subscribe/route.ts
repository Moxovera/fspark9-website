import { NextResponse } from "next/server";

/**
 * Spark bülteni kaydı (Kit v4). Sıra: abone oluştur (inactive: onay bekliyor),
 * forma ekle (formun çift onay maili gider), kaynak ve dil etiketlerini ekle.
 * Anahtar ve kimlikler sadece sunucuda; eksikse 503 ("yakında açılıyor").
 * Honeypot (`website`) doluysa Kit'e gitmeden sessizce başarı.
 */
const KIT = "https://api.kit.com/v4";
const SOURCES = ["anasayfa", "spark-giris", "bolum-sonu", "sabit-kutu", "footer"] as const;
const LOCALES = ["tr", "en"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
// Sunucusuz ortamda örnek başına en iyi çaba hız sınırı.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  return recent.length > MAX_PER_WINDOW;
}

interface Body {
  email?: unknown;
  source?: unknown;
  locale?: unknown;
  website?: unknown;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = SOURCES.find((s) => s === body.source);
  const locale = LOCALES.find((l) => l === body.locale);
  if (!EMAIL.test(email) || email.length > 254 || !source || !locale) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const key = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  const sourceTag = {
    anasayfa: process.env.KIT_TAG_ANASAYFA,
    "spark-giris": process.env.KIT_TAG_SPARK_GIRIS,
    "bolum-sonu": process.env.KIT_TAG_BOLUM_SONU,
    "sabit-kutu": process.env.KIT_TAG_SABIT_KUTU,
    footer: process.env.KIT_TAG_FOOTER,
  }[source];
  const localeTag = locale === "tr" ? process.env.KIT_TAG_TR : process.env.KIT_TAG_EN;
  if (!key || !formId || !sourceTag || !localeTag) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const call = (path: string, payload: Record<string, unknown>) =>
    fetch(`${KIT}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Kit-Api-Key": key },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

  try {
    // Var olan aboneyi upsert değiştirmez (200); yeni abone onay bekler.
    const created = await call("/subscribers", { email_address: email, state: "inactive" });
    if (created.status === 422) return NextResponse.json({ error: "invalid" }, { status: 400 });
    if (!created.ok) throw new Error(`subscribers ${created.status}`);

    const toForm = await call(`/forms/${encodeURIComponent(formId)}/subscribers`, { email_address: email });
    if (!toForm.ok) throw new Error(`forms ${toForm.status}`);

    for (const tag of [sourceTag, localeTag]) {
      const tagged = await call(`/tags/${encodeURIComponent(tag)}/subscribers`, { email_address: email });
      if (!tagged.ok) throw new Error(`tags ${tagged.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("subscribe failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
