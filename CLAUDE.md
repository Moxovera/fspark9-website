# FSPARK9 · Repo Kuralları

Bu dosya repo kökünde durur. Claude Code her oturumda okur.

---

## Proje

Next.js 15 App Router + TypeScript + Tailwind + Sanity CMS.
Tek repo, Vercel'de tek deploy. Sanity Studio `/studio` altında embed.

Diller: EN birincil (`/`), TR ikincil (`/tr`). `next-intl`, `localePrefix: 'as-needed'`.

---

## Tasarım kaynağı

Gerçek kaynak: `_design/fspark9.dc.html`

Bu bir **Design Component** dosyası. Tek dosyada HTML benzeri şablon + `DCLogic` tabanlı bir JS mantık sınıfı bulunuyor. Tarayıcıda doğrudan açılabiliyor.

### DCLogic hakkında

**DCLogic'i port etme. Shim yazma. Taklit etme.**

DCLogic bir Claude Design çalışma zamanıdır. React üzerine kuruludur ama React değildir. Yapılacak şey sınıfın **ne yaptığını okumak** ve aynı davranışı React deyimleriyle sıfırdan yazmaktır:

| DCLogic'te | Next.js'te |
|---|---|
| Sınıf alanı (state) | `useState`, `useRef` |
| Lifecycle metodu | `useEffect` |
| Şablon içi binding | JSX props |
| Event handler metodu | Bileşen içi fonksiyon |
| DOM sorgusu (`querySelector`) | `useRef` |

`querySelector` ile DOM'a doğrudan erişen kod React'e taşınırken **ref'e çevrilecek.** Doğrudan DOM manipülasyonu bırakılmayacak.

---

## Dönüştürme yöntemi: üç geçiş

Bir bölümü tek seferde bitirmeye çalışma. Her bölüm için sırayla:

**Geçiş A · Yapı**
Şablonu JSX'e çevir. Sadece markup ve statik Tailwind sınıfları. Animasyon yok, etkileşim yok. Sonuç: doğru görünen ama hareketsiz bölüm.

**Geçiş B · Stil doğrulama**
Orijinal `.dc.html` dosyasını tarayıcıda yan sekmede aç, karşılaştır. 375px, 768px, 1440px. Fark varsa burada düzelt.

**Geçiş C · Animasyon ve etkileşim**
Aşağıdaki animasyon kurallarına göre ekle. Tek tek, biri bittikten sonra diğeri.

---

## Animasyon kuralları

Projede üç animasyon tipi var. Her biri farklı ele alınır. Harici animasyon kütüphanesi **kurulmayacak**, mevcut CSS ve JS yaklaşımı korunacak.

### 1. Scroll tetiklemeli reveal

**Problem:** Sunucuda render edilirken eleman `opacity: 0` ile çıkar. JS yüklenene kadar içerik görünmez. JS hata verirse kalıcı görünmez. Tarayıcı arama motoru ve JS'siz kullanıcı boş sayfa görür.

**Çözüm:** `<head>` içinde bloklayıcı satır içi script ile `<html>` etiketine `js` sınıfı ekle. CSS'te gizleme kuralını bu sınıfa bağla.

```tsx
// layout.tsx, <head> içinde
<script dangerouslySetInnerHTML={{
  __html: `document.documentElement.classList.add('js')`
}} />
```

```css
/* globals.css */
.reveal { opacity: 1; transform: none; }
.js .reveal { opacity: 0; transform: translateY(24px); }
.js .reveal.is-visible {
  opacity: 1; transform: none;
  transition: opacity .6s ease, transform .6s ease;
}
@media (prefers-reduced-motion: reduce) {
  .js .reveal { opacity: 1; transform: none; transition: none; }
}
```

JS kapalıysa içerik görünür. JS açıksa flash olmadan gizlenir ve animasyonla gelir.

**Observer tek bir hook'ta toplanır:** `src/hooks/useReveal.ts`. Her bölüm kendi observer'ını kurmaz. Görünür olduktan sonra `unobserve` çağrılır.

### 2. Mouse tracking canvas efekti

**Kurallar:**

- Ayrı bir client component olacak: `src/components/effects/CanvasField.tsx`
- `next/dynamic` ile `ssr: false` yüklenecek. Sunucuda canvas'ın hiçbir işi yok.
- `requestAnimationFrame` döngüsü `useEffect` cleanup'ında **mutlaka** `cancelAnimationFrame` ile durdurulacak. Durdurulmazsa route değişiminde bellek sızıntısı ve arka planda dönen döngü kalır.
- `devicePixelRatio` ile ölçeklenecek, yoksa retina ekranda bulanık çıkar
- Resize dinleyicisi `ResizeObserver` ile, `window.resize` ile değil
- **Dokunmatik cihazda hiç mount edilmeyecek.** Mouse tracking'in mobilde karşılığı yok, sadece pil ve performans yakar.
- `prefers-reduced-motion: reduce` ise mount edilmeyecek
- Mouse dinleyicisi `{ passive: true }` olacak

```tsx
const CanvasField = dynamic(() => import('./CanvasField'), { ssr: false })
```

### 3. Kart yığını (card stack) scroll animasyonu

**Problem:** `position: sticky` bir üst elemanda `transform`, `filter`, `perspective` veya `will-change` varsa **sessizce çalışmaz.** Bileşenleştirme sırasında sarmalayıcı div eklenince en sık kırılan yer burasıdır.

**Kurallar:**

- Sticky elemanın hiçbir atasında `transform` benzeri bir özellik olmayacak. Reveal animasyonu `translateY` kullandığı için bu bölümde reveal sarmalayıcısı sticky ataya konmayacak.
- Sticky container'ın ataları `overflow: hidden` içermeyecek, bu da sticky'yi kırar
- Scroll dinleyicisi kullanılıyorsa `{ passive: true }` olacak ve `requestAnimationFrame` ile kısılacak. Her scroll olayında layout okuma yapılmayacak.
- Mümkünse scroll ilerlemesi `IntersectionObserver` eşikleri veya CSS `position: sticky` ile çözülecek, JS scroll matematiği son çare

---

## Kod kuralları

### Renk ve tipografi

Sabit hex kodu **yasak**. Tüm renkler `globals.css` içindeki CSS değişkenlerinden, Tailwind config üzerinden.

```
--navy · --bronze · --ivory · --charcoal
```

Fontlar `next/font/google` ile: Playfair Display (başlık), Inter (gövde), IBM Plex Mono (numara ve etiket). CDN link'i kullanılmayacak.

### Bileşen yapısı

```
src/
  app/[locale]/
    page.tsx                  → ana sayfa, bölümleri dizer
    layout.tsx
  components/
    sections/                 → her bölüm ayrı dosya
      Hero.tsx
      Framework.tsx
      ProofStrip.tsx
      CaseStudies.tsx
      Services.tsx
      Comparison.tsx
      WhyMe.tsx
      Story.tsx
      Faq.tsx
      ClosingCta.tsx
    ui/                       → tekrar kullanılan parçalar
    effects/                  → canvas ve görsel efektler
  hooks/
  types/content.ts            → tüm içerik arayüzleri
  content/                    → Faz 2 geçici veri, Faz 3'te Sanity alır
  sanity/
```

### Bileşen kuralları

- Bileşenler **props alır**. İçine metin gömülmez. Tek bir sabit metin bile.
- Props tipleri `types/content.ts` içinde tanımlı. Bileşen kendi tipini oradan import eder.
- Varsayılan Server Component. `'use client'` sadece animasyon, canvas, form ve etkileşim için.
- `'use client'` mümkün olan en küçük bileşene konulacak. Bölümün tamamı client olmayacak, sadece animasyonlu parçası.
- Tekrarlanan yapılar (vaka analizi, hizmet kartı, SSS satırı) tek bileşen + dizi olarak yazılacak. Kopyala yapıştır yok.

### Veri akışı

Faz 2'de veri `src/content/*.ts` dosyalarından gelir.
Faz 3'te aynı veri Sanity'den gelir.

**Bileşenler bu geçişte değişmeyecek.** Sadece `page.tsx` içindeki veri kaynağı değişecek. Bileşen `types/content.ts` arayüzüne göre yazıldıysa bu otomatik çalışır.

### Erişilebilirlik

- Her görselde anlamlı `alt`. Dekoratifse `alt=""`.
- SSS accordion ise klavye ile açılıp kapanabilir olacak, `<button>` kullanılacak, `div` + onClick değil
- Odak halkası (focus ring) kaldırılmayacak, marka rengiyle özelleştirilecek
- Renk kontrastı WCAG AA. Bronz üzerine fildişi kombinasyonu kontrol edilecek.

---

## Çalışma düzeni

- **Tek istekte tek bölüm.** "Tüm tasarımı çevir" isteği kabul edilmeyecek.
- Her bölüm bitince: `npm run build` çalıştır, hata varsa düzelt, sonra commit.
- Her bölüm ayrı commit. Mesaj: `feat(section): hero`
- Push sonrası Vercel preview linkinde kontrol edilir.

## Yapılmayacaklar

- Harici animasyon kütüphanesi kurmak (framer-motion, GSAP, AOS)
- CSS-in-JS kütüphanesi eklemek
- Tasarımı "iyileştirmek". Tasarım kilitli, birebir uygulanacak.
- `any` tipi kullanmak
- `useEffect` içinde cleanup yazmadan dinleyici veya döngü başlatmak
- Metni bileşen içine gömmek
