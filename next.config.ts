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
    // ayrıca engelliyoruz.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // dc.html: routes tablosunda /legal, /impressum ile aynı sayfaya
    // gidiyordu (alias). next-intl'in locale-prefix'li rotalarını bu
    // redirects() kuralları otomatik kapsamıyor — /tr/legal için ayrı
    // bir kural gerekiyor, aksi halde 404 dönüyor.
    return [
      { source: "/legal", destination: "/impressum", permanent: true },
      { source: "/tr/legal", destination: "/tr/impressum", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
