import type { AboutContent, Locale } from "@/types/content";

/**
 * About (v2, /about). Copy §4 ve §6c. Sanity pass'e kadar statik, sonra
 * aboutPage singleton'ı. Flare kesimi board'daki gibi son kelimede; TR'de
 * copy işaretlemiyor, "live." karşılığı seçildi.
 */
export const about: Record<Locale, AboutContent> = {
  en: {
    seo: {
      title: "About Mehmet Burak Dikmen | fspark9",
      description:
        "Over ten years in fintech and digital banking. Built insha from zero, took RUUT live in the UK. I join your team and work from the inside.",
    },
    backLabel: "Home",
    hero: {
      headlineSentences: ["I’m Mehmet Burak Dikmen.", "I help teams get financial products live."],
      cutWord: "live.",
    },
    pair: [
      {
        label: "Who I am",
        body: "I’ve spent more than ten years in fintech and digital banking. I built insha from zero. I turned RUUT into a digital bank and took it live in the UK. I worked on Paycell and Financell at Turkcell, and on digital strategy at Albaraka. I live in Berlin and work across Europe, the UK and Türkiye.",
      },
      {
        label: "Why I do this",
        body: "I’ve watched good products die in the handover between strategy, partners and the app team. I’ve made some of those mistakes myself. fspark9 is how other teams avoid paying for them twice. And every new project teaches me something I bring to the next one.",
      },
    ],
    result: {
      label: "How I work",
      body: "I join your team and work from the inside. Every decision comes with my recommendation and the reasons behind it. When I pick a partner, I pick the one that works for your business. I lead every project myself, and a small delivery team builds with me. When the product is live, I step back.",
    },
    whyNine: {
      label: "Why nine",
      text: "A launch has nine slices. Most teams get through eight. The ninth is the day it goes live, and that’s the one I care about.",
    },
    portraitAlt: "Mehmet Burak Dikmen",
  },
  tr: {
    seo: {
      title: "Mehmet Burak Dikmen hakkında | fspark9",
      description:
        "Fintech ve dijital bankacılıkta on yılı aşkın deneyim. insha’yı sıfırdan kurdum, RUUT’u İngiltere’de canlıya çıkardım. Ekibinize içeriden katılıyorum.",
    },
    backLabel: "Ana sayfa",
    hero: {
      headlineSentences: [
        "Ben Mehmet Burak Dikmen.",
        "Ekiplerin finansal ürünlerini canlıya çıkarmasına yardım ediyorum.",
      ],
      cutWord: "canlıya",
    },
    pair: [
      {
        label: "Ben kimim",
        body: "On yılı aşkın süredir fintech ve dijital bankacılıktayım. insha’yı sıfırdan kurdum. RUUT’u dijital bankaya dönüştürdüm ve İngiltere’de canlıya çıkardım. Turkcell’de Paycell ve Financell’de, Albaraka’da dijital strateji üzerinde çalıştım. Berlin’de yaşıyorum, Avrupa, İngiltere ve Türkiye’de çalışıyorum.",
      },
      {
        label: "Bu işi neden yapıyorum",
        body: "İyi ürünlerin strateji, partnerler ve uygulama ekibi arasındaki devirde öldüğünü çok gördüm. Bu hataların bazılarını ben de yaptım. fspark9, başka ekiplerin aynı bedeli ikinci kez ödememesi için var. Her yeni proje de bana bir sonrakine taşıdığım bir şey öğretiyor.",
      },
    ],
    result: {
      label: "Nasıl çalışıyorum",
      body: "Ekibinize katılıyorum ve içeriden çalışıyorum. Her kararın yanında önerim ve gerekçesi oluyor. Partner seçerken işinize en çok yarayanı seçiyorum. Her projeyi kendim yönetiyorum, küçük bir ekip de benimle birlikte kuruyor. Ürün canlıya çıkınca geri çekiliyorum.",
    },
    whyNine: {
      label: "Neden dokuz",
      text: "Bir lansmanın dokuz dilimi var. Çoğu ekip sekizini geçiyor. Dokuzuncusu ürünün canlıya çıktığı gün, benim önemsediğim de o.",
    },
    portraitAlt: "Mehmet Burak Dikmen",
  },
};
