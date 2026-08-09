import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_LOGO_QUERY, toSiteLogo } from "@/sanity/lib/queries";
import type { SITE_LOGO_QUERYResult } from "@/sanity/types";

// satori (next/og'un altındaki render motoru) sadece ttf/otf okuyabiliyor,
// woff2 değil. Google Fonts'un CSS2 API'si User-Agent'a göre farklı format
// döner: bir tarayıcı UA'sı woff2 tetikliyor, UA hiç gönderilmezse (Node'un
// varsayılan fetch'i) ttf dönüyor — o yüzden burada bilerek özel bir UA
// ayarlanmıyor.
async function loadGoogleFont(family: string, weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`)
  ).text();

  const match = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/);
  if (!match) {
    throw new Error(`Could not resolve a truetype source for ${family} ${weight}`);
  }
  return (await fetch(match[1])).arrayBuffer();
}

// brandbook tokenları: --navy #0B1F3A, --bronze #A67C3D, --ivory
// #F7F4EC (bkz. globals.css). Tek accent renk (bronz çizgi), bol
// boşluk, süsleme yok. Wordmark artık metin değil, siteSettings.logo'nun
// kendisi (aynı SVG, /assets/lockup-reversed.svg) — satori <img>
// içinde SVG okuyamıyor, bu yüzden Sanity'nin görsel API'sinden
// `?fm=png` ile PNG'ye çevrilmiş hali isteniyor.
export async function renderOgImage() {
  const [interData, logoResult] = await Promise.all([
    loadGoogleFont("Inter", 400),
    sanityFetch<SITE_LOGO_QUERYResult>({ query: SITE_LOGO_QUERY, tags: ["siteSettings"] }),
  ]);
  const logo = toSiteLogo(logoResult);
  if (!logo?.url) {
    throw new Error("siteSettings.logo is not set — upload it first (npm run upload-logo).");
  }

  // Orijinal SVG 3387x964 (bkz. upload-logo.ts çıktısı) — oran ~3.51:1.
  // Kart üzerinde 460px genişlik görünecek, Sanity'den 2x (920px) çekiliyor.
  const logoDisplayWidth = 460;
  const logoDisplayHeight = Math.round((logo.height ?? 964) > 0 ? (logoDisplayWidth * (logo.height ?? 964)) / (logo.width ?? 3387) : logoDisplayWidth / 3.51);
  const logoSrc = `${logo.url}?w=${logoDisplayWidth * 2}&fm=png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1F3A",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={logoDisplayWidth} height={logoDisplayHeight} alt="" />
        <div
          style={{
            width: 96,
            height: 2,
            backgroundColor: "#A67C3D",
            margin: "36px 0 30px",
          }}
        />
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 27,
            color: "rgba(247, 244, 236, 0.72)",
            letterSpacing: "0.01em",
          }}
        >
          Fintech and digital banking advisory
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: interData, weight: 400, style: "normal" }],
    },
  );
}
