# Hizmetler halka videosu · kontrol kaydı (2026-10-19)

> **Güncelleme (aynı gün, Burak'ın isteğiyle):** Halka masaüstünde 520 (600 değil), telefonda 300 (oynat dairesi 52, etiket 12/10 px). Önizleme, poster ve çizgi YouTube kimliği olmadan da görünüyor; oynat düğmesi, perde ve pencere sadece kimlik varken. Kimlikler girildi: TR `cDtyn01dpGM`, EN `Pr4kIn4GgPg` (Shorts; `/embed/` ile oynuyor, YouTube süresi 0:30). Aşağıdaki ölçü tablosu ilk sürüme ait; güncel ölçüler: 360/375/390 → halka 300, video 186, çizgi 3 px; 768/1180/1440 → halka 520, video 322, çizgi 3,47 px; 900 → 406. Yatay kaydırma, çakışma yok, etiket her genişlikte daire içinde. `local/` ekran görüntüleri güncel sürüm.

## Önizleme klibi ve poster

| | TR | EN |
|---|---|---|
| Kaynak | `fspark9-motion/out/TR/11-services.mp4` (ServicesOverview, `--props={"locale":"tr"}`) | `fspark9-motion/out/11-services.mp4` |
| Video | 1080×1350 (4:5), 30 fps, 890 kare, 29,67 sn → süre etiketi `0:30` | aynı |
| Aralık | kare 776 ile 889 (25,87 ile 29,67 sn) + son karenin 6 kare tutulması = 120 kare, 4,0 sn | aynı |
| Kırpma | kapanıştaki kadranın merkezinden kare: 2x karede (640, 151) 880×880 → 720×720 | aynı |
| MP4 (H.264, faststart, ses yok) | 78 KB | 77 KB |
| WebM (VP9, ses yok) | 59 KB | 58 KB |
| Poster AVIF / WebP | 11 / 14 KB | 11 / 14 KB |

- **Neden bu aralık.** `candidates.png` sekiz aday (A ile H, her biri 4,0 sn, +0/+1/+2/+3/+3,97 sn kareleri, daire maskeli, TR ve EN). Videonun ortasından tam kare kırpmada (A ile F) her sahnede üst kenarda yarım başlık var ("Bank offers all look alike.", "Your customers’ money…", "Which one is yours?"), kartlar ve kutular daire kenarında kesiliyor. Tek temiz an kapanış: kesim kadrana uçup 9. dilim olarak oturuyor, kadran dilim dilim doluyor. Kırpma bu yüzden videonun ortasından değil kadranın ortasından (kadranın altındaki "ONE RING · FOUR WAYS IN" etiketi kare dışında). G ve H'nin ilk karesinde "take it live / your team." yarım kalıyor; metin 776'da kadrajdan çıkıyor, aralık oradan başlıyor. Video 889'da bittiği için 776..889 = 114 kare; kadran 842'den sonra durgun, son kare 6 kez tutularak 4,0 sn'ye tamamlandı.
- Kırpma 440 piksellik (1x) bir alan olduğu için teslim MP4'ünden büyütmek yerine aralık Remotion'dan 2x çizildi (PNG dizisi, scratch klasöründe), orijinal dosyalara ve motion reposuna dokunulmadı. Komutlar `build-clips.py` başında.
- Kadranda yazı olmadığı için TR ve EN kareleri görsel olarak aynı (poster dosyaları bayt bayt aynı); yine de iki dil ayrı dosya.
- Poster = klibin son karesi: son kareden postere geçişte görüntü değişmiyor, sadece %38 Ink perde ve düğme geliyor.
- İlk kare, orta kare, son kare ve poster: `frames-tr.png`, `frames-en.png`. İlk karede sadece kesim şeridi (Flare paralelkenar) var, yazı ya da logo yok.

## Ölçüler (Playwright, yerel production build, preview test filmiyle)

| Genişlik | Halka | Video dairesi | Çizgi | Oynat dairesi | Etiket / süre | Yatay kaydırma |
|---|---|---|---|---|---|---|
| 375 | 343 | 213 | 3,43 px | 60 | 13 / 11 px | yok |
| 390 | 358 | 222 | 3,58 px | 60 | 13 / 11 px | yok |
| 768 | 600 | 372 | 4 px | 84 | 15 / 12 px | yok |
| 900 | 406 | 252 | 2,71 px | 84 | 15 / 12 px | yok |
| 1180 | 546 | 339 | 3,64 px | 84 | 15 / 12 px | yok |
| 1440 | 600 | 372 | 4 px | 84 | 15 / 12 px | yok |

- Halka hiçbir genişlikte hizmet listesiyle çakışmıyor, etiket her genişlikte daire içinde.
- Sayfa açılırken klip istenmiyor (sadece lazy poster, 11 KB); halkanın yarısı görünür olunca `services-preview-*.mp4` iniyor. YouTube'a pencere açılmadan 0 istek.
- Çizgi `currentTime / duration` ile dolu: en büyük sapma 0,004. Klip 4,0 sn oynuyor, 600 ms çapraz geçişten sonra DOM'dan kalkıyor (~4,8 sn), düğme geliyor.
- Reduced-motion: klip hiç istenmiyor, poster, dolu çizgi ve düğme hemen.
- Pencere: iframe oranı 0,800; 1440'ta 562×702 (78vh), 375'te 375×469 tam ekran pencerede. Odak içeride, Esc ile iframe kalkıyor (ses duruyor), odak halkadaki düğmeye dönüyor.
- Açılış filmi değişmedi: önizleme iniyor, halka doluyor, pencere 16:9 960 px, Esc sonrası odak düğmede.

Ekran görüntüleri `local/`: 01 bölüm, 02 önizleme oynuyor, 03 son hâl, 04 hover, 05 klavye odağı, 06 pencere, 07 reduced-motion (375 ve 1440, TR ve EN). `live/`: canlı fspark9.com, kimlikler boş (375, 768, 1440; TR ve EN). Canlıda halka bugünkü gibi: masaüstünde 300'lük boş kadran, telefonda kadran yok; `services-*` ve YouTube'a 0 istek, yatay kaydırma yok, açılış filmi düğmesi ve önizlemesi çalışıyor. Dosyalar canlıda 200 (video/mp4, video/webm, image/avif).

Vercel önizleme adresi (`fspark9-website-git-feat-services-video-…`) bu oturumda Vercel girişi istedi; önizleme kontrolü aynı commit'in yerel production build'inde yapıldı.

## Lighthouse mobil (performans)

| | LCP (ms) | CLS |
|---|---|---|
| Önce, canlı fspark9.com TR | 2223 / 2575 / 2502 | 0 |
| Önce, canlı fspark9.com EN | 2347 / 2199 / 2497 | 0 |
| Sonra, canlı fspark9.com TR (kimlik boş) | 2724 / 2650 / 2648 / 2647 / 2652 / 2724 | 0 |
| Sonra, canlı fspark9.com EN (kimlik boş) | 2502 / 2571 / 2498 | 0 |
| Yerel production build, video açık, TR | 3366 / 3438 / 3211 | 0 |
| Yerel production build, video açık, EN | 3438 / 3437 / 3283 | 0 |

Canlıda önce ve sonra sayfa ağırlığı aynı (690 / 689 KB), TBT 0 ile 3 ms, LCP öğesi portre. TR'deki ~150 ms fark kodla açıklanmıyor (kimlik boşken halka eski bileşenle çiziliyor, ek indirme yok); yeni deploy sonrası önbellek ve ölçüm oynaklığı olası. Bir hafta sonra Speed Insights saha verisiyle bakılmalı.

Yerelde CDN yok, mutlak değerler yüksek (açılış filmi kaydındaki yerel `main` ölçümü 3301 / 3358 ms ile aynı aralıkta). LCP öğesi her ölçümde portre; halka, poster ve klip hiç LCP olmadı.
