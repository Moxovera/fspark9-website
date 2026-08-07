import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
    // gidiyordu (alias).
    return [
      { source: "/legal", destination: "/impressum", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
