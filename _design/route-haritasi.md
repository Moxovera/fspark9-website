# FSPARK9 · Alt Sayfa Route Haritası

Referans belge. İlgili route'a geçildiğinde tekrar açılır. Kod içermez.

Varsayım: `next-intl`, `localePrefix: 'as-needed'` (EN kök `/`, TR `/tr`).

| Route (EN) | Route (TR) | Dosya | dc.html karşılığı | Paylaşılan bileşenler |
|---|---|---|---|---|
| `/` | `/tr` | `src/app/[locale]/page.tsx` | `isHome` — 15 bölüm | `src/components/sections/*` (Hero, Framework, ProofStrip, Familiar, Audience, Comparison, Approach, Testimonials, Story, Services, CaseStudies, Process, Media, Faq, ClosingCta) |
| `/services` | `/tr/services` | `src/app/[locale]/services/page.tsx` | `page.hasBlocks` (dikey tab + panel) | `SubpageHero` (yeni, ortak) + `ServiceTabs` (yeni — Home'daki Services bölümüyle aynı `Service[]` verisini `rows` görünümünde render eder) |
| `/work` | `/tr/work` | `src/app/[locale]/work/page.tsx` | `page.hasCaseIndex` | `SubpageHero` + Home'daki "Selected work" ile **aynı** `CaseCard` bileşeni, `caseStudies.items`'tan beslenir |
| `/work/insha`, `/work/ruut` | `/tr/work/insha`, `/tr/work/ruut` | `src/app/[locale]/work/[slug]/page.tsx` (dinamik) | `page.hasCases` | `SubpageHero` + yeni `CaseDetail` bileşeni, aynı `CaseStudy` tipini render eder |
| `/story` | `/tr/story` | `src/app/[locale]/story/page.tsx` | `page.hasProse` + `page.hasVideo` | `SubpageHero` + yeni `ProseBlock` + Home'daki Story bölümündeki **aynı** portre foto/video toggle bileşeni |
| `/book` | `/tr/book` | `src/app/[locale]/book/page.tsx` | `page.hasBooking` | `SubpageHero` + yeni `BookingCalendar` — bu bileşen hem bu sayfada hem de site genelindeki booking overlay'inde (modal) kullanılmalı, iki ayrı implementasyon olmamalı |
| `/thank-you` | `/tr/thank-you` | `src/app/[locale]/thank-you/page.tsx` | `page.hasProse` + `page.hasLinks` | `SubpageHero` + `ProseBlock` + yeni `LinkGrid` |
| `/impressum` | `/tr/impressum` | `src/app/[locale]/impressum/page.tsx` | `page.hasLegal` | `SubpageHero` + yeni `LegalBlocks` (dc.html'deki `blk.isDiv/isH/isSh/isB/isField/isUl/isTbl` varyantlarını karşılar) |
| `/terms` | `/tr/kullanim-sartlari` | `src/app/[locale]/terms/page.tsx` | `page.hasLegal` | `SubpageHero` + `LegalBlocks` |
| `/privacy` | `/tr/gizlilik` | `src/app/[locale]/privacy/page.tsx` | `page.hasLegal` | `SubpageHero` + `LegalBlocks` |
| `/cookies` | `/tr/cerezler` | `src/app/[locale]/cookies/page.tsx` | `page.hasLegal` | `SubpageHero` + `LegalBlocks` |
| — | — | `src/app/[locale]/not-found.tsx` | `is404` | Bağımsız, minimal |

## Dikkat edilmesi gerekenler

- TR rotalarının bazıları EN'in birebir çevirisi değil (`terms`→`kullanim-sartlari`, `privacy`→`gizlilik`, `cookies`→`cerezler`). Bu, `next-intl`'in `pathnames` (yerelleştirilmiş rota) yapılandırmasıyla çözülür — düz `[locale]/terms` klasör adı her iki dilde de aynı kalır, next-intl URL'i dile göre çevirir. Bunu kurulumun başında `routing.ts`'te tanımlamak gerekiyor, sonradan eklemek route dosyalarının yeniden adlandırılmasını gerektirebilir.
- dc.html'de `/legal` de `/impressum` ile aynı sayfaya gidiyor (routes tablosunda alias). Next.js'te bunu `/legal` → `/impressum` redirect'i olarak `next.config.js`'te tanımlamak gerekecek.
- `booking` overlay'i (site genelinde her "Book a call" butonunun açtığı modal) bir route değil, global bir state/context. `/book` sayfası ile aynı `BookingCalendar` içeriğini paylaşmalı ki takvim mantığı iki yerde tekrar yazılmasın.
- Bu route haritası sadece dosya/URL/bileşen paylaşımını kapsıyor — `SubpageHero`, `LegalBlocks`, `ProseBlock`, `ServiceTabs`, `CaseDetail`, `LinkGrid`, `BookingCalendar` için `types/content.ts`'e yeni tipler eklemek gerekecek; bu tipler henüz eklenmedi, ilgili route'a geçildiğinde ele alınacak.
