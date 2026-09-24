# FSPARK9 · Proje Durumu

Projeye yeni başlayan (ya da araya giren) biri için tek durum kaynağı. Kalıcı kurallar `CLAUDE.md`'de.

**v2 CANLIDA (2026-09-24).** Site brief v4'e göre baştan kuruldu (The Ninth Slice markası), içerik tamamen Sanity'den geliyor, eski v1 kodu, şeması ve içeriği temizlendi.

Son güncelleme: 2026-09-24

---

## Kaynaklar

| Dosya | Ne |
|---|---|
| `_design/v2/fspark9-rebuild-brief-v4.md` | Rebuild brief'i: rotalar, tokenlar, Sanity şeması, hareket, SEO, kontrol listesi |
| `_design/v2/fspark9-site-copy-v2.md` | Tek metin kaynağı (EN ve TR), §6c SEO başlıkları, dilim haritası |
| `_design/v2/boards/*.dc.html`, `_design/v2/screens/*.png` | Görsel kaynak (board'lar). Metinde copy, görselde board kazanır |
| `fspark9-brandbook-v3.md` | Marka: renkler, fontlar, halka, kesim, hareket |
| `fspark9-legal-update-v2.md` | Privacy ve Cookies metin güncellemesi (uygulandı) |
| `_design/v2/logo/` | Logo paketi (wordmark, 9 sembolü, favicon, apple-icon) |

## Kilitlenmiş kararlar

- Next.js 15.5 App Router, TypeScript, Tailwind v4 (CSS-first, tokenlar `globals.css` `@theme inline`).
- next-intl 4, `localePrefix: 'as-needed'`: EN kökte, TR `/tr`. Pathname çevirileri `src/i18n/routing.ts`.
- Üç kök layout: `[locale]/layout.tsx` (site), `global-not-found.tsx` (dil bilmeyen 404), `(locked)/layout.tsx` (kilitli raporlar). Analytics ve Speed Insights üçünde de.
- Renkler: paper, ink, white, stone, rule, flare, dust, inkrule, ring, headrule, portrait. Bileşende hex yok. Canvas/OG gibi CSS değişkeni okuyamayan yerler için `src/lib/brandColors.ts`.
- Fontlar `next/font`: Epilogue (başlık, rakam), Hanken Grotesk (metin), Spline Sans Mono (etiket). latin-ext şart.
- Tek easing `--ease-brand`. Tüm hareketler reduced-motion'da kapalı.
- `/locked` (Fuzul raporu) v2'den bağımsız, kendi CSS'i ve fontları var. Her değişiklikte önce/sonra ekran görüntüsüyle birebir aynı kaldığı doğrulanıyor.
- Apex domain birincil: `fspark9.com`, `www` ondan yönleniyor (Vercel domain ayarı).
- NextStep etiketi sadece ana sayfada numaralı ("05 · Next step"), diğer sayfalarda numarasız. Services menüsünde "How they fit" linki yok.

## Kullanıcı profili

- **Mehmet Burak Dikmen**: fspark9'un kurucusu, sitenin sahibi. Fintech ve dijital bankacılık danışmanlığı.
- Git kimliği: `Mehmet Burak Dikmen <mehmetburakdikmen@gmail.com>`. GitHub `Moxovera/fspark9-website`, Vercel'e bağlı.
- Türkçe çalışıyor. Teknik titizlik bekliyor: iddialar gerçek ölçümle (Playwright, canlı URL) doğrulanıyor.
- Metinleri Sanity Studio'dan kendisi düzenliyor.

## Veri akışı

- Sayfalar içeriği `src/sanity/lib/content.ts` yükleyicilerinden alıyor (`getChrome`, `getHome`, `getServicesIndex`, `getServicePages`, `getWorkPage`, `getCases`, `getAbout`, `getSparkHub`). Her biri tek sorguyla iki dili çekip `Record<Locale, T>` döndürüyor; `localize()` iki dilli alanları aktif dile indiriyor (TR boşsa EN).
- Legal, SEO, logo ve bölüm sayfası sorguları `src/sanity/lib/queries.ts`'te.
- ISR 60 saniye: Studio'da yayınlanan değişiklik en geç bir dakikada sitede.
- `src/content/*.ts` sitenin aynası: `npm run seed:v3` buradan Sanity'ye yazıyor, `npm run check:drift` Sanity'yi buna karşı alan alan karşılaştırıyor. Studio'da metin değiştirildikten sonra drift farkı normal: ya aynayı güncelle ya da farkı kabul et.
- Statik kalan (bilinçli): `/thank-you`, iki 404. `/book` artık `/?book=1`'e 301, randevu penceresi her sayfada.

## Sanity yapısı

Studio `/studio`, menü `src/sanity/structure.ts`:

- **Site settings** (tekil): header, Services menüsü, footer, randevu penceresi (calLink), Next step bloğu, yasal sekmeler, varsayılan SEO, OG görselleri (EN ve TR ayrı), logo.
- **Home** (tekil): açılış, Start where you are, Four services, Work, With me, Spark metinleri. Spark kartları bölümlerden otomatik.
- **Services**: Services page (tekil, ortak etiketler dahil) ve dört hizmet belgesi (ad, satır, kitle, dilimler, adımlar, kapanış).
- **Work**: Work page (tekil) ve vakalar (hikaye, rakamlar, kaynaklar, ekranlar, hizmet referansları; dilimler hizmetlerden hesaplanıyor).
- **About** (tekil).
- **Spark**: hub ve bölüm sayfası etiketleri (tekil), formatlar, bölümler. Bölüm durumu `published`, `coming` (listede linksiz satır, sayfası 404, sitemap'te yok) ya da `draft`.
- **Legal pages** ×4.

Tekil belgeler Studio'da yeni oluşturulamıyor ve silinemiyor.

## Scriptler

| Komut | Ne yapar |
|---|---|
| `npm run seed:v3` | src/content'ten Sanity'ye yazar (görsellere ve bölüm bloklarına dokunmaz). `-- --dry` listeler |
| `npm run check:drift` | Sanity ile src/content'i alan alan karşılaştırır, fark varsa exit 1 |
| `npm run cleanup:v3` | v1'den kalan belgeleri ve referanssız görselleri listeler, `-- --confirm` ile siler |
| `npm run upload-og-image` | Çalışan bir sunucudan `/og` ve `/og?locale=tr`'yi alıp Site settings'e yükler |
| `npm run typegen` | Şema çıkarır ve sorgu tiplerini üretir (`src/sanity/types.ts`) |

## Açık işler

- `npm run cleanup:v3 -- --confirm`: v1'den kalan 3 belge (eski ana sayfa, taslağı, storyPage) ve referanssız görseller. Geri alınamaz; yedek alındı (Sanity'nin JSON dökümü).
- Search Console: sitemap gönderimi, ana sayfa, dört hizmet, `/work`, `/about`, `/spark` (EN ve TR) için indeksleme isteği; bir hafta sonra Pages raporu.
- Rich Results Test: her şablon için (Service, Article, Person, BreadcrumbList).
- Lighthouse mobil, canlı (2026-09-24): performans 95 ile 99; erişilebilirlik, best practices, SEO 100; CLS 0. LCP ana sayfada 2.2 sn, diğer sayfalarda 2.7 ile 2.9 sn (hedef 2.5 altı). Bir hafta sonra Speed Insights saha verisiyle bakılacak.
- Studio localhost'ta ve preview adresinde açılmıyor (CORS origin kayıtlı değil), fspark9.com/studio'da açılıyor. Gerekirse sanity.io/manage'dan `http://localhost:3000` eklenir.
- next-intl `setRequestLocale` her layout ve sayfada çağrılıyor; yoksa sayfalar dinamik render olur ve CDN önbelleğe almaz (v1'den beri böyleydi, düzeltildi).

## Bilinen ve kabul edilmiş

- Genel 404 `/tr/...` adreslerinde de `lang=en`: kök layout dili bilemiyor, iki dili birden gösteriyor.
- Birkaç büyük başlıkta satır kutuları 2 ile 8px üst üste biniyor: board'larla aynı (leading < 1).

## Çözülen hatalardan kalan dersler

- Tailwind v4'te `max-[Npx]:` N'i hariç tutuyor; eşiğin kendisi yazılır.
- next-intl typed pathnames: dinamik rotalarda `{ pathname, params }` nesnesi kullanılır, string değil.
- Üçüncü parti client-only bileşen (hook kullanan) server component'e doğrudan konmaz, küçük bir `"use client"` sarmalayıcıya alınır (`CalEmbed`).
- next/image optimizer yerel SVG'yi varsayılan olarak reddediyor; `dangerouslyAllowSVG` + kısıtlayıcı CSP `next.config.ts`'te. Görsel içeren her değişiklik production build ile denenir.
- Logo paketindeki `favicon.ico`'nun PNG'leri RGB'ydi, Next çözemedi; RGBA olarak yeniden üretildi.
- GROQ `*[_id == "x"]` typegen'de bütün belge tiplerinin birleşimini üretiyor; sorgulara `_type == "x"` filtresi eklenir.
- Unicode ok karakterleri mobilde emoji sunumuyla kalın çıkıyor; her ok inline SVG.
