# Privacy · YouTube paragrafı (TASLAK, yayında değil)

Ana sayfadaki tanıtım filmi için Privacy sayfasına eklenecek metin. Burak onaylayınca `src/content/legal/privacy.ts` aynasına ve Sanity'deki Privacy belgesine girer (`npm run seed:v3` + `npm run check:drift`). Üslup mevcut Cal.com bölümüyle aynı tutuldu.

Siteye eklenen davranış (kodda doğrulandı, `docs/hero-video-check/`):

- Sayfa açılırken YouTube'a hiçbir istek gitmiyor, YouTube çerezi yok. Portredeki 4 saniyelik sessiz önizleme sitenin kendi sunucusundan geliyor (`/video/hero-preview-*.mp4`).
- Oynatıcı sadece ziyaretçi "Beni 90 saniyede tanıyın" düğmesine ya da portreye tıklayınca, `youtube-nocookie.com` (YouTube'un gelişmiş gizlilik modu) üstünden oluşturuluyor. Pencere kapanınca oynatıcı tamamen kaldırılıyor.

Not: mevcut "All fonts, scripts, and images are served from this site's own domain" cümlesi sayfa açılışı için hâlâ doğru; aşağıdaki paragraf tıklamadan sonrasını anlatıyor.

---

## EN

**Heading:** The intro video

When the page loads, nothing from YouTube loads. The short silent preview in the portrait comes from this site's own server.

The full film is hosted on YouTube. The player loads only when you click Meet me in 90 seconds or the portrait, and it loads from youtube-nocookie.com, YouTube's privacy-enhanced mode. Until you click, nothing from YouTube runs in your browser and YouTube learns nothing about your visit.

Once you click, the player connects to YouTube and Google servers. From that moment YouTube's own rules apply: YouTube receives your IP address and technical information about your browser and device, and may store information in your browser. When you close the window, the player is removed from the page.

YouTube is operated by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Where data reaches the United States, Google relies on the EU Standard Contractual Clauses and the Data Privacy Framework between the EU and the US. Their policy: https://policies.google.com/privacy

The legal basis is your consent, given by clicking play (Article 6(1)(a) GDPR, and § 25(1) TDDDG for anything stored in your browser). You can withdraw it at any time by closing the window.

**Processors table, new row:** Google Ireland Limited (YouTube) · Showing the intro video, after you click · EU / US

---

## TR

**Başlık:** Tanıtım videosu

Sayfa açılırken YouTube'dan hiçbir şey yüklenmiyor. Portredeki kısa ve sessiz önizleme bu sitenin kendi sunucusundan geliyor.

Filmin tamamı YouTube'da duruyor. Oynatıcı sadece Beni 90 saniyede tanıyın düğmesine ya da portreye tıkladığınızda yükleniyor ve YouTube'un gelişmiş gizlilik modu olan youtube-nocookie.com üzerinden geliyor. Tıklayana kadar tarayıcınızda YouTube'a ait hiçbir şey çalışmıyor ve YouTube ziyaretinizden haberdar olmuyor.

Tıkladığınız anda oynatıcı YouTube ve Google sunucularına bağlanıyor. O andan itibaren YouTube'un kendi kuralları geçerli: YouTube IP adresinizi, tarayıcınız ve cihazınız hakkında teknik bilgileri alıyor ve tarayıcınızda bilgi saklayabiliyor. Pencereyi kapattığınızda oynatıcı sayfadan tamamen kaldırılıyor.

YouTube'u Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, İrlanda) işletiyor. Verinin ABD'ye ulaştığı durumlarda Google AB Standart Sözleşme Maddelerine ve AB ile ABD arasındaki Veri Gizliliği Çerçevesine dayanıyor. Politikaları: https://policies.google.com/privacy

Hukuki dayanak, oynat düğmesine tıklayarak verdiğiniz onay (GDPR 6. madde 1. fıkra a bendi; tarayıcınızda saklanan bilgiler için TDDDG 25. madde 1. fıkra). Pencereyi kapatarak onayınızı istediğiniz an geri alabilirsiniz.

**İşleyenler tablosu, yeni satır:** Google Ireland Limited (YouTube) · Tanıtım videosunu göstermek, tıkladıktan sonra · AB / ABD

---

## Burak'ın kontrol etmesi gerekenler

- Hukuki dayanak (onay mı, meşru menfaat mi) ve TDDDG atfı: avukat ya da mevcut Privacy metnini hazırlayan kişiyle teyit edilmeli. Metin onay üzerine kurulu.
- Cookies sayfası: YouTube oynatıcısı tıklamadan sonra çerez ya da yerel depolama kullanabilir; Cookies sayfasına da kısa bir satır gerekebilir.
