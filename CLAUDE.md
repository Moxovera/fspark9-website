# FSPARK9 · Repo Kuralları

Bu dosya repo kökünde durur. Claude Code her oturumda okur. Güncel durum ve açık işler `FSPARK9-DURUM.md`'de.

---

## Proje

Next.js 15 App Router + TypeScript + Tailwind v4 + Sanity CMS.
Tek repo, Vercel'de tek deploy. Sanity Studio `/studio` altında embed.

Diller: EN birincil (`/`), TR ikincil (`/tr`). `next-intl`, `localePrefix: 'as-needed'`.

---

## Tasarım kaynağı

- Brief: `_design/v2/fspark9-rebuild-brief-v4.md`
- Metin: `_design/v2/fspark9-site-copy-v2.md` (tek metin kaynağı, EN ve TR)
- Görsel: `_design/v2/boards/*.dc.html` ve `_design/v2/screens/*.png`
- Marka: `fspark9-brandbook-v3.md`

Metinde copy dosyası, görselde board kazanır. Copy'nin sessiz kaldığı yerde board'daki metin kullanılır.

Board'lar **Design Component** dosyası: tek dosyada şablon + `DCLogic` tabanlı JS sınıfı, tarayıcıda doğrudan açılıyor.

### DCLogic hakkında

**DCLogic'i port etme. Shim yazma. Taklit etme.** Sınıfın ne yaptığını oku, aynı davranışı React deyimleriyle yaz:

| DCLogic'te | Next.js'te |
|---|---|
| Sınıf alanı (state) | `useState`, `useRef` |
| Lifecycle metodu | `useEffect` |
| Şablon içi binding | JSX props |
| Event handler metodu | Bileşen içi fonksiyon |
| DOM sorgusu (`querySelector`) | `useRef` |

Doğrudan DOM manipülasyonu bırakılmayacak.

---

## Dönüştürme yöntemi: üç geçiş

Bir bölümü tek seferde bitirmeye çalışma. Her bölüm için sırayla:

**Geçiş A · Yapı.** JSX ve statik Tailwind sınıfları. Animasyon ve etkileşim yok.

**Geçiş B · Stil doğrulama.** Board'u yerel statik sunucu + Playwright ile gerçek tarayıcıda çalıştır, `getComputedStyle` ile hesaplanmış stil karşılaştırması yap; sadece kaynak kodu okumakla yetinme. 375px, 768px, 1440px.

**Geçiş C · Animasyon ve etkileşim.** Aşağıdaki kurallara göre, tek tek.

---

## Animasyon kuralları

Harici animasyon kütüphanesi **kurulmayacak**. Tek easing: `--ease-brand` (`cubic-bezier(0.2, 0.7, 0.2, 1)`). Her hareket `prefers-reduced-motion: reduce` altında kapalı.

### Scroll tetiklemeli reveal

`<head>`'deki bloklayıcı script `<html>`'e `js` sınıfı ekler, gizleme bu sınıfa bağlı (`.js .reveal`). JS kapalıysa içerik görünür. Observer tek hook'ta: `src/hooks/useReveal.ts`, sarmalayıcı `src/components/ui/Reveal.tsx`. Görünür olunca `unobserve`. Bölümler kendi observer'ını kurmaz.

Hareket sınıfları `globals.css`'te: `ring-draw`, `portrait-in`, `cut-wipe`, `dial-fill`, `dial-fill-result`, `marker-wipe`, `go-arrow`, `text-link-line`, `format-number`, `sheet-in-right`, `booking-backdrop`, `booking-window`.

### Canvas ya da mouse efekti eklenirse

Ayrı client component, `next/dynamic` ile `ssr: false`. `requestAnimationFrame` cleanup'ta `cancelAnimationFrame`. `devicePixelRatio` ölçeği, `ResizeObserver`, `{ passive: true }` dinleyiciler. Dokunmatik cihazda ve reduced-motion'da mount edilmez.

### Sticky

Sticky elemanın hiçbir atasında `transform`, `filter`, `perspective`, `will-change` ya da `overflow: hidden` olmaz; reveal sarmalayıcısı (translateY) sticky ataya konmaz. Scroll dinleyicisi gerekirse `{ passive: true }` + `requestAnimationFrame`; mümkünse `IntersectionObserver` ya da saf CSS.

---

## Kod kuralları

### Renk ve tipografi

Bileşende sabit hex kodu **yasak**. Renkler `globals.css` `:root` değişkenlerinden, Tailwind'e `@theme inline` ile bağlı:

```
paper · ink · white · stone · rule · flare · dust · inkrule · ring · headrule · portrait
```

Flare Paper üzerinde metin rengi olmaz (kontrast). CSS değişkeni okuyamayan yerler (OG görseli, canvas) `src/lib/brandColors.ts`'i kullanır; değerler `:root` ile birebir aynı tutulur.

Fontlar `next/font/google`, `src/lib/fonts.ts`: Epilogue (`font-display`, başlık ve rakam), Hanken Grotesk (`font-sans`, metin), Spline Sans Mono (`font-mono`, etiket). `latin-ext` şart (Türkçe). CDN link'i yok.

### Metin kuralları

Metinde uzun ve orta tire (—, –) yok. Unicode ok ya da sembol (`↗`, `→`) yok: her ok inline SVG, `src/components/icons` (24×24 viewBox, `stroke="currentColor"`, `strokeWidth` 1.8, yuvarlak uçlar). Gerekçe: U+2190–2199 okları bazı mobil tarayıcılarda emoji sunumuyla kalın çıkıyor, CSS ile düzeltilemiyor.

### Bileşen yapısı

```
src/
  app/[locale]/                → sayfalar (home, services, services/[slug], work, work/[slug],
                                 about, spark, spark/[formatSlug], spark/[formatSlug]/[episodeSlug],
                                 thank-you, impressum, privacy, cookies, terms)
  app/global-not-found.tsx     → dil bilmeyen 404 (kendi <html>'i)
  app/(locked)/                → kilitli müşteri raporları, v2'den bağımsız
  app/og/                      → OG görseli (EN, ?locale=tr)
  components/
    brand/                     → Dial, RingOutline, Logo, CutButton, GoButton, Label, CutHeadline ...
    chrome/                    → Header, ServicesMenu, MobileNav, Footer, MobileBookingBar
    blocks/                    → sayfalar arası bloklar (NextStep, PageOpening, PairAndResult ...)
    home/ services/ work/ spark/ subpages/ booking/
    icons/  ui/  seo/  effects/
    locked/                    → sadece /locked
  hooks/
  types/content.ts             → tüm içerik ve props arayüzleri
  content/                     → Sanity içeriğinin statik aynası (seed ve drift kaynağı)
  sanity/                      → şema, Studio menüsü, sorgular, yükleyiciler
  scripts/                     → seed-v3, check-drift, cleanup-v3, upload-og-image
```

### Bileşen kuralları

- Bileşenler **props alır**. İçine metin gömülmez, tek bir sabit metin bile.
- Props tipleri `types/content.ts`'te. Bileşen kendi tipini oradan import eder, dosya içinde props arayüzü tanımlanmaz. (İç state ve context değer tipleri istisna.)
- Varsayılan Server Component. `'use client'` sadece animasyon, form ve etkileşim için, mümkün olan en küçük bileşene.
- Tekrarlanan yapılar tek bileşen + dizi.

### Veri akışı

Sayfa içeriği Sanity'den. Yükleyiciler `src/sanity/lib/content.ts`: tek sorguyla iki dili çekip `Record<Locale, T>` döndürür, `localize()` iki dilli alanları (`localeString`, `localeText`) aktif dile indirir. Sayfa `content[locale]` ile okur. Legal, SEO, logo ve bölüm sayfası sorguları `src/sanity/lib/queries.ts`'te. ISR 60 saniye.

- GROQ sorgularında tekil belgeler `*[_type == "x" && _id == "x"]` ile çekilir (sadece `_id` filtresi typegen'de bütün tiplerin birleşimini üretir).
- Şema değişince `npm run typegen`.
- `src/content/*.ts` aynadır: `npm run seed:v3` buradan Sanity'ye yazar, `npm run check:drift` Sanity'yi buna karşı alan alan karşılaştırır. İçerik şekli ya da eşleme kodu değiştiğinde ikisi de çalıştırılır.
- Statik kalan (bilinçli): `/thank-you` ve iki 404. Tekrar eden, düzenlenecek içerikleri yok.
- Görseller (vaka ekranları, isteğe bağlı portre, OG) sadece Sanity'de.

### Erişilebilirlik

- Her görselde anlamlı `alt`, dekoratifse `alt=""`.
- Açılır/kapanır her şey `<button>`, klavye ile çalışır. Diyaloglar `useDialogFocus` (odak tuzağı, Escape, kaydırma kilidi, odak iadesi).
- Odak halkası kaldırılmaz (2px Ink, Ink zeminde Paper).
- Kontrast WCAG AA, dokunma hedefi en az 44px, sayfa başına tek h1, başlık sırası atlanmaz.

---

## Analytics

Vercel Web Analytics (`@vercel/analytics/next`) ve Speed Insights (`@vercel/speed-insights/next`). Üç ayrı kök HTML var ve üçünde de ikisi birden duruyor: `src/app/[locale]/layout.tsx`, `src/app/global-not-found.tsx`, `src/app/(locked)/layout.tsx`. Yeni bir kök HTML dosyası eklenirse oraya da eklenir.

---

## Çalışma düzeni

- **Tek istekte tek bölüm.** "Tüm tasarımı çevir" isteği kabul edilmeyecek.
- Her bölüm bitince `npm run build` ve `npm run lint`, hata varsa düzelt, sonra commit. Mesaj: `feat(section): hero`.
- Geliştirme `staging` dalında. Push sonrası Vercel preview linkinde kontrol edilir (SSO arkasında). `main` canlıdır, oraya sadece kullanıcının onayıyla geçilir.

## Bölüm tamamlama kontrol listesi

Bir bölüm "bitti" denmeden önce:

1. 375px, 768px, 1440px'te görsel kontrol (ara genişlikler 900 ve 1180 de).
2. Hiçbir eleman başka bir elemanın üzerine binmiyor, taşmıyor, kesilmiyor.
3. absolute/fixed her eleman üç genişlikte ayrı ayrı kontrol edilir.
4. `npm run build` ve `npm run lint` hatasız.
5. Görsel/medya içeren bölümlerde `npm run build && npm run start` ile gerçek production build test edilir, `npm run dev` yetmez (optimizer davranışı farklı).
6. Board ile yan yana karşılaştırılır.
7. İçerik ya da Sanity eşlemesi değiştiyse `npm run check:drift` temiz.
8. `/locked` önce/sonra ekran görüntüleri aynı.

Bu maddeler geçmeden commit atılmaz, bölüm tamamlandı diye raporlanmaz.

## Yapılmayacaklar

- Harici animasyon kütüphanesi (framer-motion, GSAP, AOS)
- CSS-in-JS kütüphanesi
- Tasarımı "iyileştirmek". Tasarım kilitli, birebir uygulanır.
- `any` tipi
- `useEffect` içinde cleanup yazmadan dinleyici ya da döngü başlatmak
- Metni bileşen içine gömmek
