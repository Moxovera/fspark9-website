import type { LegalPage } from "@/types/content";

export const en: LegalPage = {
  hero: {
    eyebrow: "Cookies",
    title: "This site does not track you.",
    intro:
      "No advertising cookies, no analytics cookies, no consent banner, because there is nothing to consent to.",
  },
  blocks: [
    { type: "field", label: "Last updated", lines: ["5 August 2026"] },
    { type: "h", text: "The short version" },
    {
      type: "b",
      text: "This site does not track you. No advertising cookies, no analytics cookies, no social media cookies. There is no consent banner because there is nothing to consent to.",
    },
    { type: "h", text: "What is actually set" },
    {
      type: "tbl",
      head: ["Name", "Set by", "What it does", "Type", "Lifetime"],
      rows: [
        [
          "lang",
          "This site",
          "Remembers your language choice",
          "Strictly necessary",
          "12 months",
        ],
      ],
    },
    {
      type: "b",
      text: "Strictly necessary cookies do not require consent under § 25(2) TDDDG. They exist to make the site work, not to learn anything about you.",
    },
    { type: "h", text: "The booking tool" },
    {
      type: "b",
      text: "The booking tool comes from Cal.com. It is not loaded with the page. Until you click to open it, no request goes to Cal.com, no cookie from them is set, and they learn nothing about your visit.",
    },
    {
      type: "b",
      text: "When you click, you are choosing to load it. At that point Cal.com sets its own cookies, which are needed to run the booking. If you would rather not, email me instead at mehmetburakdikmen@gmail.com and we will arrange a time that way.",
    },
    {
      type: "b",
      text: "Cal.com’s own cookie handling is described at https://cal.com/privacy",
    },
    { type: "h", text: "Everything else is served from here" },
    {
      type: "b",
      text: "All fonts, scripts, and images come from this site’s own domain. Nothing is loaded from Google Fonts, a CDN, or any other third party, so reading a page sends no data anywhere except to my hosting provider.",
    },
    { type: "h", text: "If this changes" },
    {
      type: "b",
      text: "If I add analytics, embedded video, or anything else that needs consent, a banner will appear before that thing loads. The reject button will be as easy to find and click as the accept button, and you will be able to change your mind at any time from this page. This notice is updated before any such change goes live.",
    },
    { type: "h", text: "Controlling cookies yourself" },
    {
      type: "b",
      text: "Your browser can block or delete cookies from any site, including strictly necessary ones. Blocking them here may break the language switcher and nothing more serious. Look under Privacy in Chrome, Firefox, Safari, or Edge.",
    },
    { type: "h", text: "Questions" },
    {
      type: "b",
      text: "mehmetburakdikmen@gmail.com. See also the privacy policy.",
    },
  ],
};

export const tr: LegalPage = {
  hero: {
    eyebrow: "Çerezler",
    title: "Bu site sizi takip etmiyor.",
    intro:
      "Reklam çerezi yok, analitik çerezi yok, rıza penceresi de yok, çünkü rıza verilecek bir şey yok.",
  },
  blocks: [
    { type: "field", label: "Son güncelleme", lines: ["5 Ağustos 2026"] },
    { type: "h", text: "Kısa hali" },
    {
      type: "b",
      text: "Bu site sizi takip etmiyor. Reklam çerezi yok, analitik çerezi yok, sosyal medya çerezi yok. Rıza penceresi de yok, çünkü rıza verilecek bir şey yok.",
    },
    { type: "h", text: "Gerçekte ne yerleşiyor" },
    {
      type: "tbl",
      head: ["Ad", "Kim yerleştiriyor", "Ne yapıyor", "Tür", "Ömrü"],
      rows: [
        [
          "lang",
          "Bu site",
          "Dil tercihinizi hatırlıyor",
          "Kesinlikle gerekli",
          "12 ay",
        ],
      ],
    },
    {
      type: "b",
      text: "Kesinlikle gerekli çerezler § 25(2) TDDDG kapsamında rıza gerektirmiyor. Sitenin çalışması için varlar, sizin hakkınızda bir şey öğrenmek için değil.",
    },
    { type: "h", text: "Randevu aracı" },
    {
      type: "b",
      text: "Randevu aracı Cal.com’dan geliyor. Sayfayla birlikte yüklenmiyor. Siz açmak için tıklayana kadar Cal.com’a hiçbir istek gitmiyor, onlara ait hiçbir çerez yerleşmiyor ve ziyaretiniz hakkında hiçbir şey öğrenmiyorlar.",
    },
    {
      type: "b",
      text: "Tıkladığınızda yüklenmesini siz seçmiş oluyorsunuz. O andan itibaren Cal.com randevunun çalışması için gereken kendi çerezlerini yerleştiriyor. Bunu tercih etmiyorsanız mehmetburakdikmen@gmail.com adresine yazın, saati o şekilde ayarlayalım.",
    },
    {
      type: "b",
      text: "Cal.com’un kendi çerez yaklaşımı: https://cal.com/privacy",
    },
    { type: "h", text: "Geri kalan her şey buradan sunuluyor" },
    {
      type: "b",
      text: "Tüm fontlar, scriptler ve görseller bu sitenin kendi alan adından geliyor. Google Fonts, CDN ya da başka bir üçüncü taraftan hiçbir şey yüklenmiyor. Yani bir sayfayı okumanız, hosting sağlayıcım dışında hiçbir yere veri göndermiyor.",
    },
    { type: "h", text: "Bu değişirse" },
    {
      type: "b",
      text: "Analitik, gömülü video ya da rıza gerektiren başka bir şey eklersem, o şey yüklenmeden önce bir pencere çıkar. Reddet butonu, kabul butonu kadar kolay bulunur ve kolay tıklanır olur. Fikrinizi istediğiniz zaman bu sayfadan değiştirebilirsiniz. Böyle bir değişiklik yayına girmeden önce bu bildirim güncellenir.",
    },
    { type: "h", text: "Çerezleri kendiniz kontrol etmek" },
    {
      type: "b",
      text: "Tarayıcınız, kesinlikle gerekli olanlar dahil her siteden gelen çerezleri engelleyebilir ya da silebilir. Burada engellerseniz dil değiştirici bozulabilir, daha ciddi bir sonucu olmaz. Chrome, Firefox, Safari ve Edge’de Gizlilik bölümüne bakın.",
    },
    { type: "h", text: "Soru" },
    {
      type: "b",
      text: "mehmetburakdikmen@gmail.com. Ayrıca bkz. gizlilik politikası.",
    },
  ],
};
