import type { StoryPage } from "@/types/content";

// dc.html: t.pages.story (satır 1341/1629, hero) + t.storyProse (satır
// 1399-1406/1687-1694, gövde). Home'daki StorySection.paragraphs'tan
// (t.why.story) FARKLI bir metin — kısaltması değil, ayrı yazılmış.
const media: StoryPage["media"] = {
  type: "image",
  image: {
    url: "/assets/portrait.jpg",
    alt: "Portrait of Mehmet Burak Dikmen, founder of fspark9",
    width: 2829,
    height: 4241,
  },
};

export const en: StoryPage = {
  hero: {
    eyebrow: "Why I do this",
    title: "Money can't be sold like chocolate. It's earned through trust.",
    intro:
      "The story behind fspark9, what I believe about this work, and what the name means.",
  },
  media,
  prose: [
    { type: "head", text: "What I believe about this work" },
    {
      type: "body",
      text: "Most companies make the same mistakes. The wrong partner, the wrong licence, the wrong business model, the wrong way into the market. Or they start with the right partner and find out later that the risk appetites do not match, expectations clash, and the process hits a dead end. They spend on ads and the customers do not come, because the trust is not there yet. Time goes. Money goes. Targets slip.",
    },
    {
      type: "body",
      text: "And the cost is not only money. Runway burns, the team wears down, opportunities pass.",
    },
    {
      type: "body",
      text: "When I work with you, I tell you the truth first. Not what you want to hear. Usually I can see where you are stuck and where you are burning money before you finish explaining. I do not say yes to things that will not work. If a feature or a product is not worth the effort, I say so at the start, not three months in. In partner negotiations I push for the right balance, not just the lowest price.",
    },
    { type: "body", text: "Then we figure the rest out together." },
    { type: "head", text: "Where the name comes from" },
    {
      type: "body",
      text: "Nine is the last step, the point right before something is finished. Most projects stall exactly there. Spark is what gets it moving again. That last step is usually where I come in.",
    },
  ],
};

export const tr: StoryPage = {
  hero: {
    eyebrow: "Bunu Neden Yapıyorum",
    title: "Para, çikolata gibi satılmaz. Güvenle kazanılır.",
    intro:
      "fspark9'un arkasındaki hikaye, bu iş hakkında ne düşündüğüm ve ismin anlamı.",
  },
  media,
  prose: [
    { type: "head", text: "Bu iş hakkında ne düşünüyorum" },
    {
      type: "body",
      text: "Çoğu şirket aynı hataları yapıyor. Yanlış partner, yanlış lisans, yanlış iş modeli, pazara yanlış giriş. Ya da doğru partnerle başlıyor, sonra risk iştahlarının uyuşmadığı ortaya çıkıyor, beklentiler çatışıyor ve süreç çıkmaza giriyor. Reklama para veriyorlar ama müşteri gelmiyor, çünkü güven daha kurulmamış. Zaman gidiyor, para gidiyor, hedefler kayıyor.",
    },
    {
      type: "body",
      text: "Bunun bedeli sadece para da değil. Nakit eriyor, ekip yoruluyor, fırsatlar geçip gidiyor.",
    },
    {
      type: "body",
      text: "Sizinle çalışırken önce doğruyu söylerim. Duymak istediğinizi değil. Genelde nerede takıldığınızı ve nerede para yaktığınızı siz anlatmayı bitirmeden görürüm. Yürümeyecek işlere evet demem. Partner görüşmelerinde en ucuz fiyatın değil, doğru dengenin peşinden giderim.",
    },
    { type: "body", text: "Gerisini birlikte çözeriz." },
    { type: "head", text: "İsim nereden geliyor" },
    {
      type: "body",
      text: "9, son adımdır. Bir işin tamamlanmadan hemen önceki hali. Çoğu proje tam orada kalıyor. Spark ise onu yeniden harekete geçiren kıvılcım. Ben genelde o son adımda devreye giriyorum.",
    },
  ],
};
