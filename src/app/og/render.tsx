import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brandColors";
import { EIGHT_SLICES, slicePath } from "@/lib/dial";
import { getHome } from "@/sanity/lib/content";
import { LOGO_LETTERS, LOGO_NINE_BODY, LOGO_NINE_SLICE, LOGO_NINE_TRANSFORM } from "@/components/brand/Logo";
import type { Locale } from "@/types/content";

// OG görseli (brief v4 §11, referans _design/v2/fspark9-og-{en,tr}-v1.png):
// Ink zemin, Paper wordmark (logo dosyasının path'leri), sağda çizgi
// halka ve tek Flare dilim, ana sayfa başlığı ve kesim, altta mono satır.
// Fontlar görsel üretilirken sunucuda indiriliyor; ziyaretçinin
// tarayıcısına Google Fonts'tan hiçbir şey gelmiyor.

async function loadGoogleFont(family: string, weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`)
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/);
  if (!match) throw new Error(`Could not resolve a truetype source for ${family} ${weight}`);
  return (await fetch(match[1])).arrayBuffer();
}

export async function renderOgImage(locale: Locale = "en") {
  const [epilogue, mono] = await Promise.all([loadGoogleFont("Epilogue", 800), loadGoogleFont("Spline Sans Mono", 500)]);
  const home = await getHome();
  const { headlineSentences, cutWord, eyebrowParts } = home[locale].opening;
  const last = headlineSentences[headlineSentences.length - 1];
  const at = last.lastIndexOf(cutWord);
  const cut = last.slice(at);
  const lines = [...headlineSentences.slice(0, -1), last.slice(0, at).trim()].filter(Boolean);
  const footer = [eyebrowParts[1], eyebrowParts[2], "fspark9.com"].map((p) => p.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-GB"));

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", position: "relative", backgroundColor: BRAND.ink, fontFamily: "Epilogue" }}>
        <svg width="520" height="520" viewBox="0 0 100 100" style={{ position: "absolute", left: 800, top: 95 }}>
          {EIGHT_SLICES.map((i) => (
            <path key={i} d={slicePath(i, 50, 35)} fill="none" stroke={BRAND.ring} strokeWidth="0.6" />
          ))}
          <path d={slicePath(9, 50, 35)} fill={BRAND.flare} />
        </svg>
        <svg width="125" height="34" viewBox="0 -1577 7420 2014" style={{ position: "absolute", left: 64, top: 56 }}>
          <g fill={BRAND.paper}>
            {LOGO_LETTERS.map((d) => (
              <path key={d.slice(0, 12)} d={d} />
            ))}
          </g>
          <g transform={LOGO_NINE_TRANSFORM}>
            <path d={LOGO_NINE_BODY[0]} fill={BRAND.paper} />
            <path d={LOGO_NINE_SLICE} fill={BRAND.flare} />
            <path d={LOGO_NINE_BODY[1]} fill={BRAND.paper} />
          </g>
        </svg>
        <div style={{ position: "absolute", left: 64, top: 162, display: "flex", flexDirection: "column", color: BRAND.paper, fontSize: 60, lineHeight: 1, letterSpacing: -2.7 }}>
          {lines.map((line) => (
            <div key={line} style={{ display: "flex", marginBottom: 2 }}>
              {line}
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 4 }}>
            <div style={{ display: "flex", height: 66, padding: "4px 4px 0 8px", backgroundColor: BRAND.flare, color: BRAND.ink, whiteSpace: "nowrap" }}>
              {cut}
            </div>
            <svg width="24" height="66" viewBox="0 0 24 66">
              <polygon points="0,0 24,0 0,66" fill={BRAND.flare} />
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", left: 64, top: 558, display: "flex", gap: 30, fontFamily: "Spline Sans Mono", fontSize: 16, letterSpacing: "0.1em", color: BRAND.dust }}>
          {footer.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Epilogue", data: epilogue, weight: 800, style: "normal" },
        { name: "Spline Sans Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
