import type { ThankYouPage } from "@/types/content";

// /thank-you (v2, board ThankYou). Copy §6b: metin aynı, iki paragrafa
// bölündü. Linklerin küçük etiketleri board'dan (About, Work). SEO §6c,
// sayfa noindex.
export const en: ThankYouPage = {
  seo: { title: "You are on the calendar | fspark9", description: "" },
  label: "Confirmed",
  heading: "You are on the calendar.",
  paragraphs: [
    "The invite is in your inbox. Two things that make the call more useful: reply to the invite with two or three lines about where you are, it saves us ten minutes. And if there is a deck, a flow or a partner proposal you would like me to look at, send it over. I will read it before we talk.",
    "If something comes up, move it from the invite. No need to apologise, it happens.",
  ],
  links: [
    { label: "Two minutes on why I do this", sublabel: "About", href: "/about" },
    { label: "What was actually built", sublabel: "Work", href: "/work" },
  ],
};

export const tr: ThankYouPage = {
  seo: { title: "Görüşme ayarlandı | fspark9", description: "" },
  label: "Onaylandı",
  heading: "Görüşme ayarlandı.",
  paragraphs: [
    "Davet e-postanıza düştü. Görüşmeyi daha verimli yapacak iki şey: davete cevap olarak nerede olduğunuzu iki üç satır yazın, bize on dakika kazandırır. Bakmamı istediğiniz bir sunum, akış ya da partner teklifi varsa gönderin, görüşmeden önce okurum.",
    "Bir şey çıkarsa daveti oradan öteleyebilirsiniz.",
  ],
  links: [
    { label: "Bunu neden yaptığım üzerine iki dakika", sublabel: "Hakkımda", href: "/about" },
    { label: "Gerçekte ne kuruldu", sublabel: "İşler", href: "/work" },
  ],
};

// Spark bülteni kaydı sonrası (Kit formu buraya yönlendirir). Söz her yerde aynı:
// ayda bir mail, o ayın Spark'ları, istediğin an çık.
export const newsletterEn: ThankYouPage = {
  seo: { title: "Your sign-up is in | fspark9", description: "" },
  label: "Newsletter",
  heading: "Your sign-up is in.",
  paragraphs: [
    "We sent a confirmation link to your inbox. Click it to finish signing up. Until you do, we will not send you anything.",
    "Then it is one email a month: that month's Sparks, with a short note. You can leave any time.",
  ],
  links: [{ label: "See what is on Spark", sublabel: "Spark", href: "/spark" }],
};

export const newsletterTr: ThankYouPage = {
  seo: { title: "Kaydınız alındı | fspark9", description: "" },
  label: "Bülten",
  heading: "Kaydınız alındı.",
  paragraphs: [
    "Mailinize bir onay linki gönderdik. Kaydı tamamlamak için linke tıklayın. Tıklamazsanız size hiçbir şey göndermeyiz.",
    "Sonrasında ayda bir mail gelir: o ayın Spark'ları, kısa bir notla. İstediğiniz an çıkabilirsiniz.",
  ],
  links: [{ label: "Spark'ta neler var", sublabel: "Spark", href: "/spark" }],
};
