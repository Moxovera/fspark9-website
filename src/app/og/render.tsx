import { ImageResponse } from "next/og";

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
// boşluk, süsleme yok — "fspark9" Playfair Display, alt satır Inter,
// site genelinde kullanılan aynı iki font.
export async function renderOgImage() {
  const [playfairData, interData] = await Promise.all([
    loadGoogleFont("Playfair Display", 600),
    loadGoogleFont("Inter", 400),
  ]);

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
        <div
          style={{
            fontFamily: "Playfair Display",
            fontSize: 104,
            fontWeight: 600,
            color: "#F7F4EC",
            letterSpacing: "-0.01em",
          }}
        >
          fspark9
        </div>
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
          Trust isn&apos;t marketed. It&apos;s built.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Playfair Display", data: playfairData, weight: 600, style: "normal" },
        { name: "Inter", data: interData, weight: 400, style: "normal" },
      ],
    },
  );
}
