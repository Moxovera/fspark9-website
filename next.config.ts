import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Kök `app/layout.tsx` yok — `[locale]/layout.tsx` kendi <html><body>'sini
  // kuruyor (top-level dinamik segment). Next.js dokümantasyonu bunu
  // `global-not-found.js`'in tam olarak var olma sebebi olarak tanımlıyor
  // ("root layout is defined using top-level dynamic segments"). Bu bayrak
  // olmadan app/global-not-found.tsx render edilmez.
  experimental: {
    globalNotFound: true,
  },
  images: {
    // next/image'ın kendi optimizer route'u (/_next/image) varsayılan
    // olarak SVG dosyalarını reddediyor (XSS riski — bir SVG script
    // içerebilir). Bizim SVG'lerimiz (public/assets/*.svg) kendi
    // yazdığımız statik dosyalar, script içermiyor; yine de Next.js'in
    // önerdiği CSP ile optimizer'dan servis edilirken script çalışmasını
    // ayrıca engelliyoruz. Aynı izin Sanity'nin CDN'inden gelen görseller
    // (logo, case study kapak/screens, proof item logo vb.) için de
    // geçerli — onlar da kullanıcı girdisi değil, Studio'dan yüklenen
    // asset'ler.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    // Defense in depth alongside the per-page `robots` metadata
    // (src/app/(locked)/layout.tsx, .../locked/[client]/page.tsx): a header
    // is honored even by crawlers that don't parse the HTML head, and
    // Referrer-Policy keeps the client's report URL out of any outbound
    // referrer header from that page. Deliberately not added to
    // robots.txt (none exists) — a disallow line would advertise the path.
    return [
      {
        source: "/locked/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
  async redirects() {
    // dc.html: routes tablosunda /legal, /impressum ile aynı sayfaya
    // gidiyordu (alias). next-intl'in locale-prefix'li rotalarını bu
    // redirects() kuralları otomatik kapsamıyor — /tr/legal için ayrı
    // bir kural gerekiyor, aksi halde 404 dönüyor.
    return [
      { source: "/legal", destination: "/impressum", permanent: true },
      { source: "/tr/legal", destination: "/tr/impressum", permanent: true },
      // v2 (brief v4 §3, §11): /story artık /about. Brief 301 istiyor;
      // `permanent: true` 308 veriyor, bu yüzden statusCode açıkça 301.
      { source: "/story", destination: "/about", statusCode: 301 },
      { source: "/tr/story", destination: "/tr/about", statusCode: 301 },
      // /book kalktı: eski linkler randevu penceresini açsın (BookingProvider ?book=1).
      { source: "/book", destination: "/?book=1", statusCode: 301 },
      { source: "/tr/book", destination: "/tr?book=1", statusCode: 301 },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
