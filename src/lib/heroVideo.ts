import type { HeroPreviewSources } from "@/types/content";

/**
 * Ana sayfa fspark9 imaj filminin 4 saniyelik sessiz önizlemesi: filmin açılış
 * montajı, soru kartından önce. Montaj iki dilde aynı, tek klip; dile göre
 * değişen sadece altyazı (Sanity). Dosyalar repoda (public/video). Üretim:
 * docs/hero-video-check/clip/build-film-clips.py.
 */
export function heroPreviewSources(): HeroPreviewSources {
  const base = "/video/home-film-preview";
  return { mp4: `${base}.mp4`, webm: `${base}.webm`, poster: `${base}.jpg` };
}

/**
 * About açılışındaki kişisel tanıtım filminin 4 saniyelik sessiz önizlemesi
 * (her dil kendi klibi, ağız ve ilk cümle dile göre). Üretim:
 * docs/hero-video-check/clip/build-clips.py.
 */
export function aboutPreviewSources(locale: string): HeroPreviewSources {
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

/**
 * Spark sayfası açılışındaki film kartının önizlemesi ve posteri (filmin
 * "No more boring blogs." anı, 4:5, tam kare). Üretim:
 * docs/spark-film-check/build-clips.py.
 */
export function sparkPreviewSources(locale: string): HeroPreviewSources {
  const lang = locale === "tr" ? "tr" : "en";
  return {
    mp4: `/video/spark-preview-${lang}.mp4`,
    webm: `/video/spark-preview-${lang}.webm`,
    poster: `/video/spark-poster-${lang}.webp`,
    posterAvif: `/video/spark-poster-${lang}.avif`,
  };
}
