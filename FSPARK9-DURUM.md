# FSPARK9 · Proje Durumu

Projeye yeni başlayan (ya da araya giren) biri için tek durum kaynağı. Kalıcı kurallar `CLAUDE.md`'de.

**v2 CANLIDA (2026-09-24).** Site brief v4'e göre baştan kuruldu (The Ninth Slice markası), içerik tamamen Sanity'den geliyor, eski v1 kodu, şeması ve içeriği temizlendi.

Son güncelleme: 2026-10-23

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
- `/locked` (Fuzul raporu) kendi kök layout'u ve CSS'iyle (`locked-report.css`) duruyor, 2026-09-24'te tasarımı v2 markasına geçti (Paper/Ink/Stone/Flare, Epilogue/Hanken/Spline, kare köşeler, v2 logo). İçerik ve mantık değişmedi: metin ve DOM önce/sonra birebir aynı (tek fark iki eski logo `<img>`'inin yerini tek `<svg>` logonun alması). Rapor tek temalı (açık).
- `/locked/tahsildar` (2026-09-30): ikinci kilitli rapor, sadece TR, "birlikte çalışmak" sayfası yok (`workingTogether: false`, 404). Kaynak ve onaylı metin `docs/locked/tahsildar-report.html`. Metin `src/content/locked/tahsildar/tr.ts`, veri `data.ts`, bileşenler `components/locked/tahsildar/`, stil `tahsildar.css` (her seçici `.tsd` altında, Fuzul CSS'iyle çakışmıyor). Şifre Vercel'de `LOCKED_TAHSILDAR_PASSWORD`. Tek dilli istemcide şifre ekranında dil düğmesi yok, `?lang=` yok sayılıyor.
- Apex domain birincil: `fspark9.com`, `www` ondan yönleniyor (Vercel domain ayarı).
- NextStep etiketi sadece ana sayfada numaralı ("05 · Next step"), diğer sayfalarda numarasız. Services menüsünde "How they fit" linki yok.

## Kullanıcı profili

- **Mehmet Burak Dikmen**: fspark9'un kurucusu, sitenin sahibi. Fintech ve dijital bankacılık danışmanlığı.
- Git kimliği: `Mehmet Burak Dikmen <mehmetburakdikmen@gmail.com>`. GitHub `Moxovera/fspark9-website`, Vercel'e bağlı.
- Türkçe çalışıyor. Teknik titizlik bekliyor: iddialar gerçek ölçümle (Playwright, canlı URL) doğrulanıyor.
- Metinleri Sanity Studio'dan kendisi düzenliyor.

## Veri akışı

- Sayfalar içeriği `src/sanity/lib/content.ts` yükleyicilerinden alıyor (`getChrome`, `getHome`, `getServicesIndex`, `getServicePages`, `getWorkPage`, `getCases`, `getAbout`, `getSparkHub`, `getSparkEpisodes`). Her biri tek sorguyla iki dili çekip `Record<Locale, T>` döndürüyor; `localize()` iki dilli alanları aktif dile indiriyor (TR boşsa EN).
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
- **Spark**: hub ve bölüm sayfası etiketleri (tekil), formatlar (format sayfası metni dahil), bölümler. Bölüm durumu `published`, `coming` (listede linksiz satır, sayfası 404, sitemap'te yok) ya da `draft`. Bölümün hikâyesi "Story" sekmesinde: açılış, bölümler (her birinin kartı ve isteğe bağlı kararı), ara bölüm, dersler, son soru, sıradaki, kaynaklar. Metinde `[n]` kaynağa dipnot olur.
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

- **Spark bülteni (2026-10-23, staging'de, Kit tarafı bekliyor).** Kit (ücretsiz plan) ile bülten: ana sayfa Spark bölümü yeniden kuruldu (Ink zemin, en yeni kart + Flare bülten kartı, alt şeritte sonraki iki yayın ve film satırı; eski "Spark nedir? İzleyin" hapı `SparkFilmButton` kalktı), Spark girişine `#bulten` bloğu (`inline-dark`; telefonda altta küçük dairesel film satırı), Son Gün sonunda hizmet önerisinin altında sessiz satır (`quiet`; `FinalQuestion` ve Nuri `DecisionEpisode`), her sayfanın footer'ında `#bulten` şeridi (link yerine doğrudan form), header'da "BÜLTEN" etiketi ve mobil menüde "Spark bültenine abone olun" satırı (footer'a kayıp alana odaklanır), `/spark` altında sabit kutu (küçültülebilir, `NewsletterBox`). Kit'e iki yeni etiket ve ortam değişkeni: `kaynak-sabit-kutu` / `KIT_TAG_SABIT_KUTU`, `kaynak-footer` / `KIT_TAG_FOOTER`. Bileşenler `components/spark/newsletter/`, API `src/app/api/subscribe/route.ts`. Metinler Sanity Spark → Newsletter (`--only=newsletter` seed'i yazıldı, drift temiz). Gizlilik metni (yeni 5. bölüm, Kit satırı) `src/content/legal/privacy.ts`'te hazır ama **Sanity'ye yazılmadı**: canlıya geçerken `npm run seed:v3` ile (tam seed, önce `check:drift`) ya da gizlilik yamasıyla yazılacak. Kit'te bekleyenler: form + çift onay, beş etiket, API anahtarı, dokuz ortam değişkeni (CLAUDE.md "Spark bülteni"). Sonra: üç formdan gerçek kayıt testi (onay maili, etiketler, `inactive` aboneyi forma eklemenin onay mailini gerçekten tetiklediği), `main`'e geçiş. Temizlik (canlıdan sonra): `homePage.spark` içinde artık kullanılmayan `heading`, `text`, `linkLabel` ve `sparkFilm.homeButtonLabel` alanları.
- **Spark film kartı (2026-10-19).** Spark sayfasının Ink açılışında 4:5 film kartı (400x500; sol sütunda bağlantı, "Spark", alt başlık), ana sayfa Spark bölümünde "Spark nedir? İzleyin" düğmesi (resim ve klip yok, `VideoModal` ana sayfada açılır). Önizleme `useClipPreview` ortak hook'uyla (`start: afterLoad`: sayfa `load` + boşta + görünür; 3g dahil yavaş bağlantıda, saveData ve reduced-motion'da hiç inmez). Poster `<canvas>` (img LCP adayı oluyordu). Dosyalar `public/video/spark-{preview,poster}-{tr,en}.*`, üretimi `docs/spark-film-check/build-clips.py` (kare 88 ile 135, 544x680). Sanity: Spark → Film sekmesi → **Spark film** (`youtubeIdTr`, `youtubeIdEn`, süre, düğme, aria, pencere başlığı, ana sayfa düğmesi, Kapat). Sadece metinleri yazmak: `npm run seed:v3 -- --only=spark-film` (kimliklere dokunmaz). Kimlik boşsa kart ve düğme yok (preview ve yerelde boş kimlik yerine test filmi). Kontrol kaydı `docs/spark-film-check/README.md`.
- **Hizmetler halka videosu (2026-10-19).** Ana sayfa "02 · Dört hizmet" halkasının ortasında hizmetler motion videosu (fspark9-motion video 11, ServicesOverview, dikey 4:5, 29,7 sn). Bileşen `components/home/ServicesRing.tsx` (ServicePicker içinde, sadece ana sayfa; /services'te yok). Halkanın %50'si görünür olunca 4 sn sessiz önizleme bir kez oynar, iç çizgi klibe bağlı dolar, sonra poster + hap; tıklayınca `VideoModal` 4:5 (`aspect`, `eyebrow` propları). Halka masaüstünde 520'ye kadar, telefonda 300 ve her zaman önizlemeli; oynat düğmesi ve pencere sadece kimlik varken. Kimlikler: TR `cDtyn01dpGM`, EN `Pr4kIn4GgPg` (Shorts). Klip ve poster `public/video/services-{preview,poster}-{tr,en}.*`, üretimi `docs/services-video-check/build-clips.py` (videonun açılış başlığı, kare 0 ile 83 + son kare tutma, 960 kare kırpma). Oynat düğmesi açılış filmindeki hap, dairenin alt kenarında. Sanity: Home → Four services sekmesi → **Services video** (`youtubeIdTr`, `youtubeIdEn`, süre, düğme, aria, pencere başlığı). Sadece bu alanları yazmak: `npm run seed:v3 -- --only=services-video` (kimliklere dokunmaz). Preview ve yerelde boş kimlik yerine açılış filmiyle aynı test filmi. Kontrol kaydı `docs/services-video-check/README.md`.
- **Ana sayfa tanıtım filmi (2026-10-17).** Açılış yeniden düzenlendi (FİNAL · Masaüstü / Telefon): halka 1440'ta 600px, merkezi x 1250 ve "Görüşme ayarla" satırına bağlı (video düğmesi her genişlikte butonla aynı hizada, CSS ile); telefonda portre en üstte. Bileşenler `components/home/HomeOpening.tsx`, `HeroVideo.tsx` (düğme, 4 sn sessiz önizleme, klibe bağlı ilerleme halkası), `components/ui/VideoModal.tsx` (youtube-nocookie, tıklamadan sonra; About ve Spark da kullanabilir). Klipler `public/video/hero-preview-{tr,en}.{mp4,webm,jpg}`, üretimi `docs/hero-video-check/clip/build-clips.py` (ham çekimlerin 30 fps kopyası + filmin renk eşleme ve grade'i). Sanity: Home → Opening sekmesi → **Hero video** (`youtubeIdTr`, `youtubeIdEn`, süre, etiketler, önizleme altyazısı) ve Opening içinde `heroTextMobile`, `showProof`, `bankCount`, `bankCountLabel`, `proofCase` (insha; 2. ve 3. rakam), `proofUsersLabel`, `proofLiveLabel`. Sadece bu alanları yazmak: `npm run seed:v3 -- --only=home-hero` (YouTube kimliklerine dokunmaz; tam seed de onları korur).
  - **Kimlik boşsa** o dilde düğme, halka izi ve önizleme yok. Preview ve yerelde (canlıda asla) boş kimlik yerine test filmi (Big Buck Bunny, `HERO_VIDEO_PREVIEW_ID` `src/sanity/lib/content.ts`), `check:drift` bunu boş sayar. Burak kimlikleri girince kendiliğinden devreden çıkar; ayna `src/content/home.ts` `heroVideo.youtubeId` güncellenmezse drift farkı normal.
  - LCP: mobilde portre (ana sayfa portresi %1 opaklıktan belirir; 0'dan belirseydi Chrome onu saymıyor, sonradan beliren klip LCP oluyordu), masaüstünde başlık.
  - Privacy paragrafı taslak: `docs/privacy-youtube-draft.md` (Burak onaylayacak, yayında değil).

- **On the Radar (Spark formatı 03) ve Nº 01 finmid (2026-10-12).** Doğrudan canlı (`main`). Format sayfası `components/spark/radar/RadarFormatPage` (sadece `on-the-radar`; Son Gün ve Sector reports şablonda), bölüm şablonu `layout: radar` (`RadarEpisode`: tahmin, nasıl çalışıyor + hesap makinesi, tuval, rakipler, taşıyıcı taş oyunu, zayıf halka, tam resim, yapışkan pano). Gövde tek JSON: `src/content/radar/finmid.json` (Sanity `sparkEpisode.radarBody`), radar değerleri `src/lib/radar.ts` (format sayfası, pano ve tam resim aynı kural). Sabit etiketler `src/content/spark-radar.ts`. Belgeler `sparkFormat-on-the-radar` ve `sparkEpisode-on-the-radar-01`; yazmak için sadece `seed:v3 -- --only=on-the-radar` ve `--only=radar-finmid [--publish-radar-finmid]`, ardından `check:drift`. Ana sayfa kartının "Read the analysis" etiketi şemada format başına kart etiketi olmadığı için yok (kartlar ortak "Read the episode" kullanıyor).
- **Son Gün Nº 04 Yolt (2026-10-07).** Prompt, metin ve prototip `Spark/Yolt/`. Slug `04-yolt` (Nuri ve Fidor deseni; prompttaki `yolt` yerine), şablon Fidor'unki (`story`, kart yok, `dayClock`). Ayna `src/content/spark-yolt.ts` prototipten üretildi, her cümle metin dosyasına karşı doğrulandı. Sanity belgesi `sparkEpisode-the-last-day-04`. Önizleme: `npm run seed:v3 -- --only=yolt`; canlıya çıkış (kod main'de deploy olduktan sonra): `npm run seed:v3 -- --only=yolt --publish-yolt`, ardından `check:drift`. Ana sayfa aynası en yeni üç kartı tutar (Yolt, Bauspar, Fidor); seed'deki Bó ve Nuri `cardLine` aramaları kart aynada yoksa Sanity değerine dokunmaz.

- **Son Gün Nº 03 Fidor Bank canlıda (2026-10-02).** Prompt `Spark/Fidor/son-gun-fidor-claude-code-prompt.md`, metin `Spark/Fidor/son-gun-fidor-icerik-tr-en.md`, prototip `Spark/Fidor/son-gun-fidor.html` (kopyası `_design/v2/boards/son-gun-fidor.html`). Slug `03-fidor`, şablon `story` (Bó'nunki) ama kart yok: `dayClock` doluysa yandaki kartın yerine gün saati, açılışta kartın yerine çerçeve gün sayısı (`hero.figure`). Yeni isteğe bağlı alanlar: `hero.figure/figureLabel`, `dayClock`, kartta `progress/barDay`, `note`, `lastDay`, `finalQuestion.lead`; `interlude` ve `next` artık isteğe bağlı. Ayna `src/content/spark-fidor.ts` (prototipten çıkarıldı, her cümle metin dosyasına karşı doğrulandı).
  - Önizleme: Sanity'de `status: draft` + `previewLive: true`. Canlı kod draft'ı hiç okumuyor (coming gibi linksiz satır da yok); staging kodu `draft` ya da `coming` + `previewLive`'ı yayındaki gibi gösteriyor.
  - Sadece Fidor belgesini yazmak: `npm run seed:v3 -- --only=fidor`. Canlıya çıkış (main onaylandıktan sonra): `npm run seed:v3 -- --only=fidor --publish-fidor`, ardından `check:drift`.

- **Son Gün Nº 02 Nuri canlıda (2026-09-29).** Brief `Spark/Nuri/son-gun-02-nuri-claude-code-brief-v2.md`, metin `Spark/Nuri/son-gun-02-nuri-metin-tr-en-v2.md`, prototip `_design/v2/boards/son-gun-02-nuri-v2.html`. Bölümün ikinci şablonu var: `sparkEpisode.layout` story (Bó) ya da decisions (Nuri, `components/spark/decisions/`). Okur cevabı tarayıcıdan doğrudan Web3Forms'a gidiyor (sunucu yok); anahtar `.env.production`'da (commit'li, herkese açık, tasarım gereği; Vercel'de aynı adla tanımlanırsa o geçerli). Anahtar yoksa gönder düğmesi gizli. OG görseli `/og/episode?slug=02-nuri&locale=tr`.
  - Sonraki bölümler için ön izleme: Sanity'de `status: coming` + `previewLive: true` bölümü sadece preview (staging) ve yerelde yayındaki gibi gösterir (`src/sanity/lib/preview.ts`, `VERCEL_ENV`). Şerit artık bölüm adı taşımıyor (format satırları), canlıya çıkışta değişmesi gerekmiyor.
  - Canlıya çıkış yapıldı: `main` 9dc362c, ardından `npm run seed:v3 -- --only=spark --publish-nuri`; `check:drift` temiz.

- **Son Gün v3 canlıda (2026-09-26):** format sayfası ve Bó yeniden tasarlandı (brief `_design/v2/claude-code-son-gun-v3.md`, prototip `_design/v2/boards/son-gun-01-bo-v3.html`). Eski mekanikler, gün saati, cetvel, localStorage ve Day 573 içeriği koddan, eski alanlar Sanity'den silindi (`cleanup:v3 --confirm --fields-only`). v1'den kalan 3 belge ve referanssız görseller hâlâ duruyor (aşağıdaki madde).
- Sadece Spark belgelerini yazmak için `npm run seed:v3 -- --only=spark`; tam seed Studio'daki düzenlemeleri aynadan ezer, önce `check:drift` temiz olmalı.
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
- next-intl varsayılan olarak HTTP `Link` başlığına hreflang yazıyor ve dile göre değişen slug'ları (Spark) bilmiyor; `alternateLinks: false`, hreflang sadece HTML ve sitemap'te.
