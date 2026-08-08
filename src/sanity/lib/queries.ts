import { defineQuery } from "next-sanity";

import type { Hero } from "@/types/content";
import type { HOME_HERO_QUERYResult } from "@/sanity/types";

// [$locale] ile dinamik alan erişimi (ör. eyebrow[$locale]) GROQ typegen
// tarafından statik çözümlenemiyor ve sonuç tipini belirsiz bir union'a
// düşürüyor (Array<LocaleString> | string | null). select() ile iki dilin
// statik dalına ayrılır; her dal coalesce ile en'e düşer, typegen temiz
// `string | null` üretir. Hero arayüzünün (types/content.ts) alan
// sırasıyla birebir eşleşir.
export const HOME_HERO_QUERY = defineQuery(`
  *[_type == "homePage"][0].hero{
    "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
    "headlinePrimary": select($locale == "tr" => coalesce(headlinePrimary.tr, headlinePrimary.en), headlinePrimary.en),
    "headlineAccent": select($locale == "tr" => coalesce(headlineAccent.tr, headlineAccent.en), headlineAccent.en),
    "bullets": select($locale == "tr" => coalesce(bullets.tr, bullets.en), bullets.en),
    "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en),
    "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
    "ctaHref": ctaHref,
    "ctaNote": select($locale == "tr" => coalesce(ctaNote.tr, ctaNote.en), ctaNote.en),
    "scrollLabel": select($locale == "tr" => coalesce(scrollLabel.tr, scrollLabel.en), scrollLabel.en)
  }
`);

// Sanity'de alanlar zorunlu değil (validation yok), bu yüzden typegen her
// alanı `| null` üretir. Boş bırakılmış bir alan render'ı kırmasın diye
// burada boş string/dizi'ye düşer — CMS içeriği eksiksizse bu dallara hiç
// girilmez.
export function toHero(result: HOME_HERO_QUERYResult): Hero {
  return {
    eyebrow: result?.eyebrow ?? "",
    headlinePrimary: result?.headlinePrimary ?? "",
    headlineAccent: result?.headlineAccent ?? "",
    bullets: result?.bullets ?? [],
    closingLine: result?.closingLine ?? "",
    ctaLabel: result?.ctaLabel ?? "",
    ctaHref: result?.ctaHref ?? "",
    ctaNote: result?.ctaNote ?? "",
    scrollLabel: result?.scrollLabel ?? "",
  };
}
