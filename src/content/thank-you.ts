import type { ThankYouPage } from "@/types/content";

// dc.html: t.pages.thanks (satır 1343/1631, hero) + t.thanksLinks
// (satır 1413-1416/1701-1704, kartlar). hasProse yok — uzun paragraf
// zaten hero.intro.
export const en: ThankYouPage = {
  hero: {
    eyebrow: "Confirmed",
    title: "You are on the calendar.",
    intro:
      "The invite is in your inbox. Two things that make the call more useful: reply to the invite with two or three lines about where you are, it saves us ten minutes. And if there is a deck, a flow or a partner proposal you would like me to look at, send it over. I will read it before we talk. If something comes up, move it from the invite. No need to apologise, it happens.",
  },
  links: [
    { label: "Two minutes on why I do this", href: "/story" },
    { label: "What was actually built", href: "/work" },
  ],
};

export const tr: ThankYouPage = {
  hero: {
    eyebrow: "Onaylandı",
    title: "Görüşme ayarlandı.",
    intro:
      "Davet e-postanıza düştü. Görüşmeyi daha verimli yapacak iki şey: davete cevap olarak nerede olduğunuzu iki üç satır yazın, bize on dakika kazandırır. Bakmamı istediğiniz bir sunum, akış ya da partner teklifi varsa gönderin, görüşmeden önce okurum. Bir şey çıkarsa daveti oradan öteleyebilirsiniz.",
  },
  links: [
    { label: "Bunu neden yaptığım üzerine iki dakika", href: "/story" },
    { label: "Gerçekte ne kuruldu", href: "/work" },
  ],
};
