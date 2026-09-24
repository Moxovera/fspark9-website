# fspark9 legal update v1 · Privacy and Cookies

September 2026. The source texts are `src/content/legal/privacy.ts` and `cookies.ts`, which mirror Sanity `legalPage` (slugs `privacy` and `cookies`). This file lists only the blocks that change. Every other block stays word for word. These are drafts written plainly and they are not legal advice, so have them checked before they go live.

These changes ship with the new site. They cover two things:

- **The booking popup:** Cal.com now loads when the visitor clicks Book a call.
- **Vercel Web Analytics and Speed Insights:** both are already installed on the live site, but the current text says "No analytics", so the text is out of date today.

Nothing else changes. Imprint and Terms stay unchanged.

**What Vercel collects.** Taken from Vercel's own documentation, checked 23 September 2026 (vercel.com/docs/analytics/privacy-policy and vercel.com/docs/speed-insights/privacy-policy):

- **Web Analytics:** timestamp, page URL and route, referrer, filtered query parameters, country, region and city, operating system and version, browser and version, device type.
- **Cookies and identification:** there are no cookies. A visitor is recognised by a hash of the incoming request, which is discarded after 24 hours. The data is used only in aggregate.
- **Speed Insights:** route and URL, network speed, browser, device type, operating system, country, the page speed measurements (Web Vitals), and the time the event was received. It is not tied to an individual or an IP address.
- **Reporting window:** 1 month on the Hobby plan, 12 months on Pro. Vercel may keep the data longer.

---

### Privacy

**Last updated** (field)
EN: [the go live date of the new site]
TR: [yeni sitenin canlıya çıktığı gün]

**Section 3, the block that starts "All fonts, scripts, and images..."**
EN: All fonts, scripts, and images are served from this site's own domain. Nothing loads from Google Fonts or a font CDN. The site counts visits with Vercel Web Analytics, described below, which sets no cookies.
TR: Tüm fontlar, scriptler ve görseller bu sitenin kendi alan adından sunuluyor. Google Fonts ya da bir font CDN'inden hiçbir şey yüklenmiyor. Ziyaretler aşağıda anlatılan Vercel Web Analytics ile sayılıyor, bu araç çerez yerleştirmiyor.

**Section 3, new blocks after that one**
EN (b): To see how many people visit and which pages load slowly, the site uses Vercel Web Analytics and Vercel Speed Insights, both run by my hosting provider. They set no cookies. With each page view they record the page, the page you came from, your country, region and city, your browser, operating system and device type, and how fast the page loaded. They do not record who you are. Within a single day a visit is recognised through a hash of the request, and that hash is discarded after 24 hours. I only ever see totals.
EN (field) Why: To understand which pages are read and to keep the site fast.
EN (field) Legal basis: Article 6(1)(f) GDPR, my legitimate interest in knowing how the site is used and keeping it fast. Nothing is read from or stored on your device, so § 25 TDDDG does not apply.
EN (field) Retention: The figures are shown to me for one month. The visit hash is discarded after 24 hours.

TR (b): Siteyi kaç kişinin ziyaret ettiğini ve hangi sayfaların yavaş yüklendiğini görmek için, hosting sağlayıcımın sunduğu Vercel Web Analytics ve Vercel Speed Insights kullanılıyor. Çerez yerleştirmiyorlar. Her sayfa görüntülemesinde sayfayı, geldiğiniz sayfayı, ülkenizi, bölgenizi ve şehrinizi, tarayıcınızı, işletim sisteminizi, cihaz türünüzü ve sayfanın ne kadar hızlı yüklendiğini kaydediyorlar. Kim olduğunuzu kaydetmiyorlar. Aynı gün içinde bir ziyaret, isteğin bir özetiyle tanınıyor ve bu özet 24 saat sonra siliniyor. Ben sadece toplamları görüyorum.
TR (field) Neden: Hangi sayfaların okunduğunu anlamak ve siteyi hızlı tutmak için.
TR (field) Hukuki dayanak: GDPR 6(1)(f), sitenin nasıl kullanıldığını bilme ve siteyi hızlı tutma konusundaki meşru menfaatim. Cihazınızdan hiçbir şey okunmadığı ve cihazınızda hiçbir şey saklanmadığı için TDDDG § 25 uygulanmıyor.
TR (field) Saklama: Rakamlar bana bir ay boyunca gösteriliyor. Ziyaret özeti 24 saat sonra siliniyor.

**Section 4, the block that starts "The booking tool is provided by Cal.com..."** (there is no /book page and no placeholder any more)
EN: The booking tool is provided by Cal.com, Inc. It does not load when the page loads. It loads only when you click Book a call, which opens the booking window on this site. Until you click, nothing from Cal.com runs in your browser and Cal.com learns nothing about your visit.
TR: Randevu aracını Cal.com, Inc. sağlıyor. Sayfa açıldığında yüklenmiyor. Sadece Görüşme ayarla butonuna bastığınızda, bu sitede açılan randevu penceresinde yükleniyor. Siz tıklayana kadar Cal.com'a ait hiçbir şey tarayıcınızda çalışmıyor ve Cal.com ziyaretiniz hakkında hiçbir şey öğrenmiyor.

**Section 4, Legal basis field.** Only "clicking to open it" changes.
EN: Article 6(1)(b) GDPR, steps taken at your request before entering into a contract. For loading the tool itself, Article 6(1)(a) GDPR and § 25(1) TDDDG, your consent, given by clicking Book a call.
TR: GDPR 6(1)(b), sözleşme öncesinde sizin talebinizle atılan adımlar. Aracın yüklenmesi için GDPR 6(1)(a) ve TDDDG § 25(1), Görüşme ayarla butonuna basarak verdiğiniz onay.

**Section 6, the table.** Add this row after Vercel.
EN: Vercel Inc. · Visit counts and page speed, without cookies · United States
TR: Vercel Inc. · Çerezsiz ziyaret sayımı ve sayfa hızı · ABD

**Section 7, the first block**
EN: No advertising cookies. No retargeting pixels. No social media tracking. No analytics cookies. No automated decision making or profiling under Article 22 GDPR. No selling or renting of data.
TR: Reklam çerezi yok. Yeniden hedefleme pikseli yok. Sosyal medya takibi yok. Analiz çerezi yok. GDPR 22. madde kapsamında otomatik karar ya da profilleme yok. Veri satışı ya da kiralama yok.

### Cookies

**Hero intro**
EN: No advertising cookies, no analytics cookies, no consent banner, because there is nothing to consent to.
(unchanged, still true in step 1)

**"The booking tool", first block**
EN: The booking tool comes from Cal.com. It is not loaded with the page. Until you click Book a call, no request goes to Cal.com, no cookie from them is set, and they learn nothing about your visit.
TR: Randevu aracı Cal.com'dan geliyor. Sayfayla birlikte yüklenmiyor. Görüşme ayarla butonuna basana kadar Cal.com'a hiçbir istek gitmiyor, onlara ait hiçbir çerez yerleşmiyor ve ziyaretiniz hakkında hiçbir şey öğrenmiyorlar.

**"Everything else is served from here"**
EN: All fonts, scripts, and images come from this site's own domain. Nothing is loaded from Google Fonts or a font CDN. Visits are counted with Vercel Web Analytics, which sets no cookies and stores nothing on your device.
TR: Tüm fontlar, scriptler ve görseller bu sitenin kendi alan adından geliyor. Google Fonts ya da bir font CDN'inden hiçbir şey yüklenmiyor. Ziyaretler Vercel Web Analytics ile sayılıyor, bu araç çerez yerleştirmiyor ve cihazınızda hiçbir şey saklamıyor.

**The cookie table.** Check the real cookie name before publishing. next-intl sets `NEXT_LOCALE` by default, while the table says `lang`. Write down whatever the new site actually sets.


