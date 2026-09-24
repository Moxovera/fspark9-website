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
