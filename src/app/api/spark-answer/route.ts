import nodemailer from "nodemailer";
import { getSparkEpisodes, getSparkHub } from "@/sanity/lib/content";
import {
  ANSWER_FREE_KEY,
  ANSWER_MAX_CHARS,
  ANSWER_MAX_WORDS,
  ANSWER_MIN_ELAPSED_MS,
  EMAIL_PATTERN,
  countWords,
} from "@/lib/sparkAnswer";

// Son Gün okur cevabı (Nº 02 brief §5). Gelen cevap doğrulanıp
// info@fspark9.com'a düz metin e-posta olarak gidiyor; hiçbir şey
// saklanmıyor. Gmail SMTP, info@fspark9.com'u zaten gönderen hesapla:
// SMTP_USER, SMTP_PASS (Gmail uygulama şifresi), SPARK_ANSWER_TO
// (varsayılan info@fspark9.com). Değerler sadece Vercel'de.
//
// 200 gönderildi, 400 doğrulama (bal küpü dolu ya da 3 saniyeden hızlı
// gönderim dahil), 500 gönderim hatası.

export const dynamic = "force-dynamic";

const CHOICES = ["A", "B", "C", "D"] as const;

interface Answer {
  episode: string;
  lang: "en" | "tr";
  choice: string;
  choiceLabel: string;
  text: string;
  email: string;
  company: string;
  elapsedMs: number;
  page: string;
}

const bad = (reason: string) => Response.json({ ok: false, error: reason }, { status: 400 });

function parse(body: unknown): Answer | string {
  if (!body || typeof body !== "object") return "body";
  const b = body as Record<string, unknown>;
  const str = (key: string) => (typeof b[key] === "string" ? (b[key] as string) : "");
  const answer: Answer = {
    episode: str("episode"),
    lang: b.lang === "tr" ? "tr" : "en",
    choice: str("choice"),
    choiceLabel: str("choiceLabel").trim(),
    text: str("text").trim(),
    email: str("email").trim(),
    company: str("company"),
    elapsedMs: typeof b.elapsedMs === "number" ? b.elapsedMs : 0,
    page: str("page"),
  };
  if (b.lang !== "en" && b.lang !== "tr") return "lang";
  if (!/^[a-z0-9-]{1,60}$/.test(answer.episode)) return "episode";
  if (!(CHOICES as readonly string[]).includes(answer.choice)) return "choice";
  if (answer.choiceLabel.length > 300) return "choiceLabel";
  if (answer.company) return "spam";
  if (!Number.isFinite(answer.elapsedMs) || answer.elapsedMs < ANSWER_MIN_ELAPSED_MS) return "spam";
  if (answer.text.length > ANSWER_MAX_CHARS || countWords(answer.text) > ANSWER_MAX_WORDS) return "text";
  if (answer.choice === ANSWER_FREE_KEY && countWords(answer.text) === 0) return "text";
  if (answer.email && (answer.email.length > 254 || !EMAIL_PATTERN.test(answer.email))) return "email";
  try {
    const url = new URL(answer.page);
    if ((url.protocol !== "https:" && url.protocol !== "http:") || answer.page.length > 500) return "page";
  } catch {
    return "page";
  }
  return answer;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("json");
  }
  const answer = parse(body);
  if (typeof answer === "string") return bad(answer);

  // Bölüm yayında olmalı; konu, format adı ve seçeneğin metni sunucudan.
  const [episodes, hub] = await Promise.all([getSparkEpisodes(), getSparkHub()]);
  const en = episodes.en.find((entry) => entry.slug === answer.episode);
  const tr = en && episodes.tr.find((entry) => entry.story.number === en.story.number && entry.altFormatSlug === en.formatSlug);
  if (!en || !tr || tr.layout !== "decisions") return bad("episode");
  const formatName = hub.tr.formats.find((format) => format.slug === tr.formatSlug)?.name ?? "";
  const title = `${formatName} Nº ${String(tr.story.number).padStart(2, "0")} · ${tr.story.subject}`;
  const local = answer.lang === "tr" ? tr : en;
  const choiceLabel =
    (local.layout === "decisions" && local.story.twist.poll.options.find((option) => option.key === answer.choice)?.text) ||
    answer.choiceLabel;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("spark-answer: SMTP_USER or SMTP_PASS missing");
    return Response.json({ ok: false, error: "send" }, { status: 500 });
  }

  const lines = [
    `Episode: ${title}`,
    `Language: ${answer.lang}`,
    `Choice: ${answer.choice} · ${choiceLabel}`,
    "",
    "Text:",
    answer.text || "none",
    "",
    `Email: ${answer.email || "none"}`,
    `Page: ${answer.page}`,
    `Time (UTC): ${new Date().toISOString()}`,
  ];

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transport.sendMail({
      from: "fspark9 Spark <info@fspark9.com>",
      to: process.env.SPARK_ANSWER_TO || "info@fspark9.com",
      ...(answer.email ? { replyTo: answer.email } : {}),
      subject: `${title} · cevap ${answer.choice}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("spark-answer: send failed", error);
    return Response.json({ ok: false, error: "send" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
