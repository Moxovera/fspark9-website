import type { HeroPreviewSources } from "@/types/content";

/**
 * Ana sayfa tanıtım filminin 4 saniyelik sessiz önizlemesi. Dosyalar repoda
 * (public/video), Sanity'de değil: her dil kendi klibi (ağız ve ilk cümle
 * dile göre). Üretim: docs/hero-video-check/clip/build-clips.py.
 */
export function heroPreviewSources(locale: string): HeroPreviewSources {
  const base = `/video/hero-preview-${locale === "tr" ? "tr" : "en"}`;
  return { mp4: `${base}.mp4`, webm: `${base}.webm`, poster: `${base}.jpg` };
}

/**
 * Four services halkasının ortasındaki hizmetler videosunun önizlemesi ve
 * posteri (videonun açılış başlığı, kare kırpılmış). Üretim:
 * docs/services-video-check/build-clips.py.
 */
export function servicesPreviewSources(locale: string): HeroPreviewSources {
  const lang = locale === "tr" ? "tr" : "en";
  return {
    mp4: `/video/services-preview-${lang}.mp4`,
    webm: `/video/services-preview-${lang}.webm`,
    poster: `/video/services-poster-${lang}.webp`,
    posterAvif: `/video/services-poster-${lang}.avif`,
  };
}
