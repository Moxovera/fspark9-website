# Spark film kartı · kontrol kaydı (2026-10-19)

> **Güncelleme (aynı gün, Burak'ın isteğiyle):** Kart dikdörtgen yerine **daire** (siteki halkalar gibi): 400×400, çevresinde ilerleme çizgisi (Stone zemin, Paper dolgu, üstten saat yönünde). Klip ve poster kare kırpma (kaynak karenin 1080 genişliğinde, y 238'den), 544×544: MP4 75 / 68 KB, WebM 55 / 50 KB, poster AVIF 8 / 6 KB (EN / TR). Film penceresi hâlâ 4:5. Spark açılışına Flare "Formatları inceleyin" / "Explore the formats" düğmesi (`#formats`). YouTube kimlikleri girildi: TR `3OO8d3qkEKE`, EN `6thCAqIHRyc` (Sanity + ayna). Aşağıdaki ölçüler ve ekran görüntüleri ilk (4:5) sürüme ait; `local/` güncel daire sürümü.

Spark sayfasının Ink açılışına 4:5 film kartı, ana sayfadaki Spark bölümüne "Spark nedir? İzleyin" düğmesi.

## Film ve klip

| | TR | EN |
|---|---|---|
| Film | `fspark9-motion/out/TR/07-spark.mp4` (SparkPromo, `--props={"locale":"tr"}`) | `out/07-spark.mp4` |
| Boyut, süre | 1080×1350 (4:5), 30 fps, 28,07 sn → etiket `0:28` | aynı |
| Aralık | kare 88 ile 135 (2,93 ile 4,5 sn) + son karenin 72 kare tutulması = 120 kare, 4,0 sn | aynı |
| MP4 (H.264, faststart, ses yok) | 84 KB | 89 KB |
| WebM (VP9, ses yok) | 60 KB | 63 KB |
| Poster AVIF / WebP | 6 / 6 KB | 8 / 8 KB |

- Kareler Remotion'dan 1x PNG olarak çizildi (orijinal dosyalara dokunulmadı), `build-clips.py` 544×680'e indirip kodluyor.
- **Neden 544×680.** İstenen 540×675'in yüksekliği tek sayı, yuv420p (H.264 ve VP9) kodlayamıyor. 544×680 tam 4:5, sitede 400×500 gösterilir.
- **Neden bu aralık.** `candidates.png` beş aday (A 76, B 80, C 84, D 88, E 92; her biri +0, +0,5, +1, +1,5, +2 ve +4 sn kareleri, EN ve TR). Yazı kare 135'te oturuyor (134 ile 135 arası fark sıfır, sonrası sadece ince iplik kıpırtısı), hepsi orada bitiyor. A ve B sayfanın metin bandını da gösteriyor ama kıvılcım henüz yok; C'nin ilk karesi boş bant; E'de sayfa çoktan parçalanmış. D (88): kıvılcım sayfanın üstünde, sayfa hâlâ bütün, kesimden hemen önce.
- Poster = klibin son karesi (aynı ölçekleme); klip son karesi ile poster arasındaki ortalama piksel farkı 0,2 ile 0,3 (WebP), kodek kaynaklı. `frames-*.png`: ilk, orta, son kare ve poster.

## Davranış (yerel production build, preview test filmiyle)

- Sayfa açılırken: sadece poster (canvas'a çizilir, `fetchPriority=low`), `load` olayından sonra (+40 ms) klip (`requestIdleCallback`). YouTube'a pencere açılana kadar 0 istek.
- Çizgi `currentTime / duration`: 2,1 sn'de %52,5 (beklenen %52,5).
- Klibin sonunda 600 ms çapraz geçiş, perde ve düğme 500 ms'de gelir; sonra hiçbir şey hareket etmez.
- Hiç inmiyor: `prefers-reduced-motion` (0 istek), `saveData` (0), Slow 3G emülasyonu `effectiveType 3g` (0), klip 3 sn'de hazır olmazsa (5 sn geciktirilen klip DOM'dan kalkıyor, düğme görünür).
- Pencere: oran 0,800 (1440'ta 562×702, 375'te 375×469), Esc ile iframe kalkıyor, odak karta dönüyor.
- Ana sayfa: düğme 44 px yüksek, açılışta 0 `spark-` ve YouTube isteği, tıklayınca pencere ana sayfada açılıyor.
- Kimlik boşken (HERO_VIDEO_PREVIEW_OFF=1 build): kart yok, düğme yok, açılış bugünkü (h1 34 px).
- Yatay kaydırma, taşma yok (375, 768, 1440; TR ve EN). Kart 375'te 343×429, 768 ve üstünde 400×500.
- Ölçüt: Four services halkası (3 geçişli akış `useClipPreview` ortak hook'una taşındı) ve açılış filmi önizlemesi aynı çalışıyor.

## LCP

`<img>` poster Chrome'da LCP adayı oluyordu (176 bin px², "Spark" yazısı 44 bin) ve opaklık 0'dan belirmek yetmedi (görünür olunca sayılıyor). Poster bu yüzden `<canvas>`. Ölçüm (PerformanceObserver): LCP adayı sadece "Spark" yazısı; klip hiç aday olmadı.

## Lighthouse mobil, yerel production build (yerelde CDN yok, mutlak değerler yüksek)

| | Önce | Sonra |
|---|---|---|
| `/tr/spark` Performance | 88 / 88 / 88 | 95 / 93 / 93 |
| `/tr/spark` LCP (ms) | 3929 / 3913 / 3913 | 2907 / 3212 / 3213 |
| `/spark` Performance | 94 / 88 | 94 / 95 / 94 |
| `/spark` LCP (ms) | 3063 / 3912 | 3059 / 2902 / 3061 |
| `/tr` (ana sayfa) Performance | 91 / 91 / 92 | 91 / 91 / 91 |
| `/tr` LCP (ms) | 3516 / 3439 / 3283 | 3528 / 3438 / 3437 |
| CLS, TBT | 0, 0 ile 1 ms | 0, 0 ile 8 ms |
| Toplam indirme (`/tr/spark`, lab) | 445 KB | 437 KB (klip lab penceresinde sayılmadı) |

Canlı ölçüm: yayın sonrası bu dosyanın altına eklenir.
