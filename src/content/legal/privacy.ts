import type { LegalPage } from "@/types/content";

export const en: LegalPage = {
  hero: {
    eyebrow: "Privacy",
    title: "What happens to your data.",
    intro: "Written plainly, built to meet Articles 13 and 14 GDPR.",
  },
  blocks: [
    { type: "field", label: "Last updated", lines: ["5 August 2026"] },
    {
      type: "b",
      text: "This page explains what happens to your data when you visit this site or get in touch. It is written plainly, but it is built to meet Articles 13 and 14 of the EU General Data Protection Regulation.",
    },
    { type: "h", text: "1. Who is responsible" },
    {
      type: "field",
      lines: [
        "Mehmet Burak Dikmen, trading as fspark9",
        "Beusselstrasse 31, 10553 Berlin, Germany",
        "Email: mehmetburakdikmen@gmail.com",
      ],
    },
    {
      type: "b",
      text: "I am the controller for the data described below. There is no separate data protection officer, because Article 37 GDPR does not require one at this size.",
    },
    { type: "h", text: "2. The short version" },
    {
      type: "b",
      text: "I run a consulting practice, not a data business. I do not sell data, I do not build advertising profiles, and I do not track you across the web. Most of what I hold is the contents of an email you sent me or a call you booked.",
    },
    {
      type: "b",
      text: "This site is aimed at businesses. It is not intended for consumers and not intended for anyone under 16.",
    },
    { type: "h", text: "3. When you just visit" },
    {
      type: "b",
      text: "My hosting provider records standard server logs on every page load: IP address, date and time, page requested, referring page, browser and operating system.",
    },
    {
      type: "field",
      label: "Why",
      lines: ["To serve the site, keep it stable, and detect attacks."],
    },
    {
      type: "field",
      label: "Legal basis",
      lines: [
        "Article 6(1)(f) GDPR, my legitimate interest in a working and secure website.",
      ],
    },
    {
      type: "field",
      label: "Retention",
      lines: ["30 days, then deleted or anonymised."],
    },
    {
      type: "b",
      text: "This is not combined with anything else and is not used to identify you.",
    },
    {
      type: "field",
      label: "Hosting provider",
      lines: [
        "Vercel Inc., United States. A data processing agreement under Article 28 GDPR is in place. Where data reaches the United States, the transfer is covered by the EU Standard Contractual Clauses.",
      ],
    },
    {
      type: "b",
      text: "All fonts, scripts, and images are served from this site’s own domain. Nothing loads from Google Fonts, a CDN, or any other third party server, so simply reading a page sends no data to anyone but my host.",
    },
    { type: "h", text: "4. When you book a call" },
    {
      type: "b",
      text: "The booking tool is provided by Cal.com, Inc. It does not load when the page loads. You see a placeholder, and Cal.com is only contacted after you click it. Until you click, nothing from Cal.com runs in your browser and Cal.com learns nothing about your visit.",
    },
    {
      type: "b",
      text: "Once you open it, you provide your name, your email address, and whatever you write in the notes field. Cal.com processes this to create the appointment and send confirmations and reminders. The booking arrives in my calendar and my inbox.",
    },
    {
      type: "field",
      label: "Why",
      lines: ["To arrange and hold the call you asked for."],
    },
    {
      type: "field",
      label: "Legal basis",
      lines: [
        "Article 6(1)(b) GDPR, steps taken at your request before entering into a contract. For loading the tool itself, Article 6(1)(a) GDPR and § 25(1) TDDDG, your consent, given by clicking to open it.",
      ],
    },
    {
      type: "field",
      label: "Retention",
      lines: [
        "[24] months after the call, unless it becomes an engagement, in which case section 5 applies.",
      ],
    },
    {
      type: "b",
      text: "Cal.com is a US company with EU infrastructure. Where data reaches the United States, the transfer runs on the EU Standard Contractual Clauses. A data processing agreement is in place. Their policy: https://cal.com/privacy",
    },
    { type: "h", text: "5. When you email me or become a client" },
    {
      type: "b",
      text: "If you write to me, I hold your message, your contact details, and my replies.",
    },
    {
      type: "field",
      label: "Why",
      lines: ["To answer you, and to run the engagement if we work together."],
    },
    {
      type: "field",
      label: "Legal basis",
      lines: [
        "Article 6(1)(b) GDPR for anything connected to a contract or its preparation, Article 6(1)(f) GDPR for general correspondence.",
      ],
    },
    {
      type: "field",
      label: "Retention",
      lines: [
        "Enquiries that go nowhere are deleted after [24] months. Anything connected to a paid engagement is kept as long as German commercial and tax law requires, which is six years under § 257 HGB and ten years under § 147 AO depending on the document.",
      ],
    },
    {
      type: "field",
      label: "Email provider",
      lines: ["Google (Gmail). A data processing agreement is in place."],
    },
    {
      type: "b",
      text: "Client data is handled under the engagement contract. Where I process personal data on a client’s behalf, we sign a separate data processing agreement under Article 28 GDPR before that processing starts.",
    },
    { type: "h", text: "6. Who else sees your data" },
    {
      type: "b",
      text: "Only the providers I need in order to operate. Each processes data on my instructions under an Article 28 GDPR agreement and may not use it for their own purposes.",
    },
    {
      type: "tbl",
      head: ["Provider", "What for", "Where"],
      rows: [
        ["Vercel Inc.", "Serving the website", "United States"],
        ["Cal.com, Inc.", "Scheduling calls, after you click", "EU / US"],
        ["Google (Gmail)", "Business email and calendar", "United States"],
      ],
    },
    {
      type: "b",
      text: "Beyond this I disclose data only where legally obliged, for example to tax authorities or under a valid court order.",
    },
    { type: "h", text: "7. What this site does not do" },
    {
      type: "b",
      text: "No advertising cookies. No retargeting pixels. No social media tracking. No analytics. No automated decision making or profiling under Article 22 GDPR. No selling or renting of data.",
    },
    {
      type: "b",
      text: "If any of this changes, this page is updated before the change goes live, and anything requiring consent will ask for it first.",
    },
    { type: "h", text: "8. Cookies" },
    {
      type: "b",
      text: "See the cookie notice. In short, this site sets nothing that is not strictly necessary, and the one third party tool it uses does not load until you click it.",
    },
    { type: "h", text: "9. Your rights" },
    { type: "b", text: "Under the GDPR you can ask me to:" },
    {
      type: "ul",
      items: [
        "confirm whether I hold data about you and give you a copy (Art. 15)",
        "correct anything inaccurate (Art. 16)",
        "delete your data (Art. 17), where no legal retention duty applies",
        "restrict processing (Art. 18)",
        "provide your data in a portable format (Art. 20)",
        "stop processing based on legitimate interest, on grounds relating to your situation (Art. 21)",
        "withdraw any consent you gave, at any time, with effect for the future (Art. 7(3))",
      ],
    },
    {
      type: "b",
      text: "Write to mehmetburakdikmen@gmail.com. I respond within one month. No charge, and no reason needed for a deletion request.",
    },
    {
      type: "b",
      text: "You can also complain to a supervisory authority. Mine is the Berlin Commissioner for Data Protection and Freedom of Information (Berliner Beauftragte für Datenschutz und Informationsfreiheit), and you may also go to the authority where you live or work.",
    },
    { type: "h", text: "10. Security" },
    {
      type: "b",
      text: "The site is served over TLS. Access to my email and files requires two factor authentication. No system is perfectly secure, but data sent to this site is encrypted in transit.",
    },
    {
      type: "b",
      text: "I do not ask clients for production customer data and do not want to receive it. Where work needs realistic data, we use anonymised or synthetic sets.",
    },
    { type: "h", text: "11. Changes" },
    {
      type: "b",
      text: "If the site changes in a way that affects data processing, this page is updated before the change goes live. The date at the top shows the last revision.",
    },
  ],
};

export const tr: LegalPage = {
  hero: {
    eyebrow: "Gizlilik",
    title: "Verinize ne oluyor.",
    intro:
      "Sade yazıldı, GDPR 13. ve 14. maddeleri karşılayacak şekilde kuruldu.",
  },
  blocks: [
    { type: "field", label: "Son güncelleme", lines: ["5 Ağustos 2026"] },
    {
      type: "b",
      text: "Bu sayfa, bu siteyi ziyaret ettiğinizde ya da benimle iletişime geçtiğinizde verilerinize ne olduğunu anlatıyor. Sade yazdım ama Avrupa Birliği Genel Veri Koruma Tüzüğü’nün (GDPR) 13. ve 14. maddelerini karşılayacak şekilde kuruldu. Türkiye’den bağlanıyorsanız, KVKK kapsamındaki haklarınız burada sayılanlarla örtüşüyor ve aynı adresten kullanabilirsiniz.",
    },
    { type: "h", text: "1. Sorumlu kim" },
    {
      type: "field",
      lines: [
        "Mehmet Burak Dikmen, fspark9 ticari adıyla",
        "Beusselstrasse 31, 10553 Berlin, Almanya",
        "E-posta: mehmetburakdikmen@gmail.com",
      ],
    },
    {
      type: "b",
      text: "Aşağıda anlatılan veriler için veri sorumlusu benim. Ayrı bir veri koruma görevlisi yok, GDPR 37. madde bu ölçekte zorunlu kılmıyor.",
    },
    { type: "h", text: "2. Kısa hali" },
    {
      type: "b",
      text: "Ben danışmanlık yapıyorum, veri işi yapmıyorum. Veri satmıyorum, reklam profili çıkarmıyorum ve sizi internette takip etmiyorum. Elimde tuttuğum şeyin büyük kısmı bana gönderdiğiniz bir e-posta ya da oluşturduğunuz bir randevu.",
    },
    {
      type: "b",
      text: "Bu site şirketlere yöneliktir. Tüketicilere ve 16 yaşından küçüklere yönelik değildir.",
    },
    { type: "h", text: "3. Sadece siteyi gezdiğinizde" },
    {
      type: "b",
      text: "Hosting sağlayıcım her sayfa açılışında standart sunucu logu tutuyor: IP adresi, tarih ve saat, açılan sayfa, geldiğiniz sayfa, tarayıcı ve işletim sistemi.",
    },
    {
      type: "field",
      label: "Neden",
      lines: ["Siteyi sunmak, çalışır ve güvenli tutmak, saldırıyı fark etmek."],
    },
    {
      type: "field",
      label: "Hukuki dayanak",
      lines: [
        "GDPR 6(1)(f), çalışan ve güvenli bir site işletmedeki meşru menfaatim.",
      ],
    },
    {
      type: "field",
      label: "Saklama",
      lines: ["30 gün, sonra siliniyor ya da anonimleştiriliyor."],
    },
    {
      type: "b",
      text: "Bu veri başka hiçbir şeyle birleştirilmiyor ve sizi tanımlamak için kullanılmıyor.",
    },
    {
      type: "field",
      label: "Hosting sağlayıcı",
      lines: [
        "Vercel Inc., ABD. GDPR 28. madde kapsamında veri işleme sözleşmesi mevcut. Verinin ABD’ye ulaştığı durumlarda aktarım AB Standart Sözleşme Maddeleri kapsamındadır.",
      ],
    },
    {
      type: "b",
      text: "Tüm fontlar, scriptler ve görseller bu sitenin kendi alan adından sunuluyor. Google Fonts, CDN ya da başka bir üçüncü taraf sunucudan hiçbir şey yüklenmiyor. Yani bir sayfayı okumanız, hosting sağlayıcım dışında kimseye veri göndermiyor.",
    },
    { type: "h", text: "4. Görüşme talebi oluşturduğunuzda" },
    {
      type: "b",
      text: "Randevu aracını Cal.com, Inc. sağlıyor. Sayfa açıldığında yüklenmiyor. Bir yer tutucu görüyorsunuz ve Cal.com’a ancak siz tıkladıktan sonra bağlanılıyor. Siz tıklayana kadar Cal.com’a ait hiçbir şey tarayıcınızda çalışmıyor ve Cal.com ziyaretiniz hakkında hiçbir şey öğrenmiyor.",
    },
    {
      type: "b",
      text: "Açtıktan sonra adınızı, e-posta adresinizi ve not alanına yazdıklarınızı veriyorsunuz. Cal.com bunları randevuyu oluşturmak, onay ve hatırlatma göndermek için işliyor. Randevu takvimime ve e-posta kutuma düşüyor.",
    },
    {
      type: "field",
      label: "Neden",
      lines: ["Talep ettiğiniz görüşmeyi ayarlamak ve yapmak."],
    },
    {
      type: "field",
      label: "Hukuki dayanak",
      lines: [
        "GDPR 6(1)(b), talebiniz üzerine atılan sözleşme öncesi adımlar. Aracın yüklenmesi için GDPR 6(1)(a) ve § 25(1) TDDDG, yani tıklayarak verdiğiniz rıza.",
      ],
    },
    {
      type: "field",
      label: "Saklama",
      lines: [
        "Görüşmeden [24] ay sonra siliniyor. Görüşme bir işe dönüşürse 5. bölüm geçerli olur.",
      ],
    },
    {
      type: "b",
      text: "Cal.com, AB altyapısı olan bir ABD şirketi. Verinin ABD’ye ulaştığı durumlarda aktarım AB Standart Sözleşme Maddeleri’ne dayanıyor. Veri işleme sözleşmesi mevcut. Politikaları: https://cal.com/privacy",
    },
    { type: "h", text: "5. Bana e-posta yazdığınızda ya da müşteri olduğunuzda" },
    {
      type: "b",
      text: "Bana yazarsanız mesajınızı, iletişim bilgilerinizi ve cevaplarımı saklarım.",
    },
    {
      type: "field",
      label: "Neden",
      lines: ["Size cevap vermek ve birlikte çalışırsak işi yürütmek."],
    },
    {
      type: "field",
      label: "Hukuki dayanak",
      lines: [
        "Sözleşmeye ya da hazırlığına bağlı her şey için GDPR 6(1)(b), genel yazışma için GDPR 6(1)(f).",
      ],
    },
    {
      type: "field",
      label: "Saklama",
      lines: [
        "Sonuçlanmayan görüşmeler [24] ay sonra siliniyor. Ücretli bir işe bağlı olanlar, Alman ticaret ve vergi hukukunun gerektirdiği süre boyunca kalıyor. Bu süre belgeye göre § 257 HGB’ye göre altı, § 147 AO’ya göre on yıl.",
      ],
    },
    {
      type: "field",
      label: "E-posta sağlayıcı",
      lines: ["Google (Gmail). Veri işleme sözleşmesi mevcut."],
    },
    {
      type: "b",
      text: "Müşteri verisi sözleşme kapsamında ele alınır. Bir müşteri adına kişisel veri işlediğim durumlarda, işleme başlamadan önce GDPR 28. madde kapsamında ayrı bir veri işleme sözleşmesi imzalarız.",
    },
    { type: "h", text: "6. Verinizi başka kim görüyor" },
    {
      type: "b",
      text: "Sadece işi yürütmek için ihtiyacım olan sağlayıcılar. Her biri GDPR 28. madde kapsamında bir sözleşmeyle, benim talimatımla veri işliyor ve kendi amaçları için kullanamıyor.",
    },
    {
      type: "tbl",
      head: ["Sağlayıcı", "Ne için", "Nerede"],
      rows: [
        ["Vercel Inc.", "Siteyi sunmak", "ABD"],
        ["Cal.com, Inc.", "Randevu, siz tıkladıktan sonra", "AB / ABD"],
        ["Google (Gmail)", "Kurumsal e-posta ve takvim", "ABD"],
      ],
    },
    {
      type: "b",
      text: "Bunun dışında veriyi sadece yasal zorunluluk halinde, örneğin vergi idaresine ya da geçerli bir mahkeme kararına karşılık paylaşırım.",
    },
    { type: "h", text: "7. Bu sitenin yapmadıkları" },
    {
      type: "b",
      text: "Reklam çerezi yok. Yeniden hedefleme pikseli yok. Sosyal medya takibi yok. Analitik yok. GDPR 22. madde kapsamında otomatik karar verme ve profilleme yok. Veri satışı ve kiralaması yok.",
    },
    {
      type: "b",
      text: "Bunlardan biri değişirse, değişiklik yayına girmeden önce bu sayfa güncellenir ve rıza gerektiren her şey önce rıza ister.",
    },
    { type: "h", text: "8. Çerezler" },
    {
      type: "b",
      text: "Bkz. çerez bildirimi. Kısacası bu site, kesinlikle gerekli olmayan hiçbir şey yerleştirmiyor ve kullandığı tek üçüncü taraf araç siz tıklamadan yüklenmiyor.",
    },
    { type: "h", text: "9. Haklarınız" },
    { type: "b", text: "GDPR kapsamında benden şunları isteyebilirsiniz:" },
    {
      type: "ul",
      items: [
        "hakkınızda veri tutup tutmadığımı doğrulamamı ve bir kopyasını vermemi (Md. 15)",
        "yanlış olanı düzeltmemi (Md. 16)",
        "verinizi silmemi (Md. 17), yasal saklama zorunluluğu yoksa",
        "işlemeyi kısıtlamamı (Md. 18)",
        "verinizi taşınabilir bir formatta vermemi (Md. 20)",
        "durumunuza bağlı gerekçelerle, meşru menfaate dayanan işlemeyi durdurmamı (Md. 21)",
        "verdiğiniz rızayı, ileriye etkili olacak şekilde istediğiniz zaman geri çekmenizi (Md. 7(3))",
      ],
    },
    {
      type: "b",
      text: "mehmetburakdikmen@gmail.com adresine yazın. Bir ay içinde dönerim. Ücret yok, silme talebi için gerekçe belirtmeniz gerekmiyor.",
    },
    {
      type: "b",
      text: "Bir denetim otoritesine de şikâyet edebilirsiniz. Benimle ilgili otorite Berlin Veri Koruma ve Bilgi Özgürlüğü Komiseri (Berliner Beauftragte für Datenschutz und Informationsfreiheit). Yaşadığınız ya da çalıştığınız yerdeki otoriteye de gidebilirsiniz. Türkiye’de yerleşikseniz Kişisel Verileri Koruma Kurumu’na başvurabilirsiniz.",
    },
    { type: "h", text: "10. Güvenlik" },
    {
      type: "b",
      text: "Site TLS üzerinden sunuluyor. E-postama ve dosyalarıma erişim iki faktörlü doğrulama gerektiriyor. Hiçbir sistem kusursuz güvenli değil, ama bu siteye gönderilen veri iletim sırasında şifreleniyor.",
    },
    {
      type: "b",
      text: "Müşterilerden canlı müşteri verisi istemiyorum ve almak da istemiyorum. İş gerçekçi veri gerektiriyorsa anonimleştirilmiş ya da sentetik veri seti kullanıyoruz.",
    },
    { type: "h", text: "11. Değişiklikler" },
    {
      type: "b",
      text: "Site, veri işlemeyi etkileyecek şekilde değişirse, değişiklik yayına girmeden önce bu sayfa güncellenir. En üstteki tarih son revizyonu gösterir.",
    },
  ],
};
