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
    '/work': '/work',
    '/work/[slug]': '/work/[slug]',
    '/story': '/story',
    '/book': '/book',
    '/thank-you': '/thank-you',
    '/impressum': '/impressum',
    '/terms': { en: '/terms', tr: '/kullanim-sartlari' },
    '/privacy': { en: '/privacy', tr: '/gizlilik' },
    '/cookies': { en: '/cookies', tr: '/cerezler' },
  },
})
