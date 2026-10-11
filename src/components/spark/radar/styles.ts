// On the Radar bölüm sayfasının ortak sınıfları (prototip radar-finmid.html
// .group, .mono, h2). Sınıflar tek yerde, bölüm bileşenleri import eder.

/** Bölüm: 2px Ink üst çizgi, 20px üst boşluk, alt öğeler arası 20px. Yapışkan header'ın altında kalmasın diye kaydırma payı. */
export const group = "flex scroll-mt-[108px] flex-col gap-5 border-t-2 border-ink pt-5";

/** Mono etiket (12px, büyük harf, +0.08em). Rengi kullanan seçer. */
export const mono = "font-mono text-[12px] font-medium tracking-[0.08em] uppercase";

export const sectionLabel = `${mono} text-stone`;

export const h2 = "m-0 font-display text-[clamp(26px,3.6vw,34px)] leading-[1.1] font-bold tracking-[-0.025em] text-balance";

export const h3 = "m-0 font-display text-[21px] leading-[1.2] font-bold tracking-[-0.015em] text-balance";

/** Düz metin sütunu (62ch). */
export const body = "flex max-w-[62ch] flex-col gap-4";

/** Seçenek düğmesi (tahmin ve zayıf halka). */
export const option = (picked: boolean, anyPicked: boolean) =>
  `flex min-h-11 items-start gap-[14px] bg-white text-left text-[16px] leading-[1.4] text-ink transition-[border-color] duration-160 ease-brand ${
    picked ? "border-2 border-ink px-[15px] py-[14px]" : "border border-rule px-4 py-[15px]"
  } ${anyPicked ? "cursor-default" : "cursor-pointer hover:border-ink"} disabled:text-stone`;

export const options = "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2";

/** Cevap kutusu: beyaz, 2px Ink üst çizgi. */
export const reveal = "rd-rise flex flex-col gap-[10px] border-t-2 border-ink bg-white px-5 pt-[18px] pb-5";

export const verdict = "font-display text-[19px] font-bold tracking-[-0.015em]";

/** Kenarlıklı küçük düğme (Geri, İleri, Taşı geri koy). */
export const smallButton =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 border border-ink bg-transparent px-[14px] font-mono text-[12px] tracking-[0.06em] whitespace-nowrap text-ink uppercase disabled:cursor-default disabled:opacity-35 max-[560px]:px-[10px] max-[560px]:text-[11px] max-[560px]:tracking-[0.02em]";
