import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // dc.html'in routes tablosuyla doğrulandı — impressum EN/TR'de aynı,
  // terms/privacy/cookies'in TR path'leri farklı.
  pathnames: {
    '/': '/',
    '/services': '/services',
    // v2: dört hizmet sayfası, slug iki dilde aynı (brief v4 §3)
    '/services/[slug]': '/services/[slug]',
    '/work': '/work',
    '/work/[slug]': '/work/[slug]',
    // v2: /story'nin yeni adı (brief v4 §3). /story 301'i next.config.ts'te.
    '/about': '/about',
    '/spark': '/spark',
    // formatSlug'un kendisi zaten locale'e göre farklı değer taşıyor
    // (the-last-day / son-gun) — next-intl'in statik pathnames haritası
    // içerik başına farklı slug çevirisini desteklemiyor, bu yüzden
    // segment adı iki dilde de aynı, gerçek çeviri route param'ında.
    '/spark/[formatSlug]': '/spark/[formatSlug]',
    '/spark/[formatSlug]/[episodeSlug]': '/spark/[formatSlug]/[episodeSlug]',
    '/thank-you': '/thank-you',
    '/impressum': '/impressum',
    '/terms': { en: '/terms', tr: '/kullanim-sartlari' },
    '/privacy': { en: '/privacy', tr: '/gizlilik' },
    '/cookies': { en: '/cookies', tr: '/cerezler' },
  },
})
