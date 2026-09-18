"use client";

import { useEffect } from "react";
import { useSparkAltSlug, type SparkAltSlug } from "@/components/chrome/SparkAltSlugContext";

/**
 * Görünmez client yaprağı — Spark format/episode sayfalarının server'da
 * zaten elinde olan "diğer locale'deki slug" bilgisini
 * SparkAltSlugContext'e yazar, LocaleSwitcher bunu okur (bkz. o
 * dosyanın yorumu). Sayfa değişince yeni değeri yazar, unmount olunca
 * temizler ki başka bir sayfaya geçildiğinde eski slug kalmasın.
 */
export default function SparkAltSlugRegistrar({ formatSlug, episodeSlug }: SparkAltSlug) {
  const { setAltSlug } = useSparkAltSlug();

  useEffect(() => {
    setAltSlug({ formatSlug, episodeSlug });
    return () => setAltSlug(null);
  }, [formatSlug, episodeSlug, setAltSlug]);

  return null;
}
