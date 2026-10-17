# Ana sayfa tanıtım filmi · kontrol kaydı (2026-10-17)

## Önizleme klibi (`clip/`)

| | TR | EN |
|---|---|---|
| Kaynak | `fspark9-motion/projects/TRmbdvideofinal/work/01_giris.cfr.mp4` (ham `src/01_giris.mov`'un 30 fps kopyası) | `.../ENMBDvideofinal/work/01_intro.cfr.mp4` (ham `src/01_intro.mov`) |
| Aralık | kare 28 ile 147, 0,933 ile 4,933 sn | kare 28 ile 147, 0,933 ile 4,933 sn |
| Renk | filmin take 1 eşlemesi (birim) + filmin GRADE'i | filmin take 1 eşlemesi (×1,10 lift) + filmin GRADE'i |
| Kadraj | 720×720, yüz merkezi x 585 | 720×720, yüz merkezi x 512 |
| MP4 / WebM / poster | 283 / 305 / 28 KB | 266 / 294 / 32 KB |
| Altyazı | Merhaba, ben Burak. | Hey, I’m Burak. |

İlk ve son kareler: `clip/{tr,en}-first.jpg`, `clip/{tr,en}-last.jpg`. Üretim betiği `clip/build-clips.py` (orijinal dosyalara dokunmaz).

## Ekran görüntüleri

- `local/`: production build (`npm run build && npm run start`), preview test filmiyle. 01 açılış, 02 önizleme oynuyor, 03 son, 04 hover, 05 klavye odağı, 06 pencere, 07 Esc sonrası odak düğmede, 08 reduced-motion, `id-empty` kimlik boş build (`HERO_VIDEO_PREVIEW_OFF=1`).
- `live/`: fspark9.com, kimlikler boş (bugünkü canlı hâl).

## Ölçümler

- Hiza (portrenin alt kenarı ile "Görüşme ayarla" ortası): 900, 1024, 1180, 1280, 1440, 1728'de 0 ile 1 px.
- Yatay kaydırma: 375, 390, 768, 1180, 1440'ta yok. 900 ve 1024'te var ama bu işten önce de vardı: İşler bölümündeki telefon çifti (`components/blocks/PhonePair.tsx`), canlıda aynı.
- Telefon 390×844: TR'de buton 738'de, EN'de 701'de bitiyor (sabit randevu çubuğu 771'de başlıyor).
- Önizleme: load'dan sonra iniyor, altyazı 0,34 sn'de geliyor 3,64 sn'de gidiyor, klip 4,0 sn'de bitiyor, halka currentTime / duration ile doluyor, 600 ms çapraz geçişten sonra klip DOM'dan kalkıyor.
- Klip hiç istenmiyor: reduced-motion, saveData, 2g. Klip 3 sn'de hazır değilse kalkıyor, halka dolu.
- Pencere: tıklamadan önce YouTube'a 0 istek, 0 çerez. iframe `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0&modestbranding=1&playsinline=1`. Odak içeride, Esc ve zemin kapatıyor, iframe kalkıyor, odak düğmeye dönüyor, kaydırma kilidi açılıyor.

## Lighthouse mobil (performans, 3 ölçüm)

| | Önce (canlı) | Sonra (canlı) |
|---|---|---|
| TR LCP | 2497 / 2498 / 2498 ms | 2494 / 2503 / 2497 ms |
| EN LCP | 2418 / 2495 / 2496 ms | 2493 / 2496 / 2495 ms |
| CLS | 0 | 0 |
| LCP öğesi | başlık | portre (masaüstünde başlık) |

Canlıda kimlik boş, klip inmiyor. Klipli durum yerel production build'de, aynı makinede `main` ile yan yana: TR ortanca 3301 → 3362 ms, EN 3358 → 3398 ms (yerelde CDN yok, mutlak değerler yüksek), CLS 0. Klip hiçbir ölçümde LCP olmadı.
