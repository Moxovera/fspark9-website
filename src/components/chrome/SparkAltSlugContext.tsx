"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface SparkAltSlug {
  formatSlug: string;
  episodeSlug?: string;
}

interface SparkAltSlugContextValue {
  altSlug: SparkAltSlug | null;
  setAltSlug: (value: SparkAltSlug | null) => void;
}

const SparkAltSlugContext = createContext<SparkAltSlugContextValue | null>(null);

/**
 * Spark format/episode sayfalarının slug'ı locale'e göre FARKLI (ör.
 * "the-last-day" / "son-gun") — next-intl'in statik pathnames haritası
 * bunu bilemez, çünkü bu slug'lar Sanity içeriğinden geliyor, route
 * config'inden değil. LocaleSwitcher (Header içinde, kök layout'ta
 * render edilir) bu yüzden dil değiştirirken hangi slug'ın hedef
 * locale'e karşılık geldiğini kendi başına bilemiyordu, güncel locale'in
 * kendi params'ını hedef locale'e olduğu gibi taşıyıp geçersiz bir
 * URL'e (ve 404'e) gidiyordu (kullanıcı geri bildirimi, 18 Eylül 2026).
 *
 * Çözüm: format/episode sayfaları (server component) zaten Sanity'den
 * HER İKİ locale'in slug'ını da çekebiliyor — bu context, o bilgiyi
 * (SparkAltSlugRegistrar aracılığıyla) Header'ın erişebileceği bir yere
 * taşıyor. Layout, page'in ÜSTÜNDE render edildiği için normal prop
 * geçişiyle bu veriye erişilemiyordu.
 */
export function SparkAltSlugProvider({ children }: { children: ReactNode }) {
  const [altSlug, setAltSlug] = useState<SparkAltSlug | null>(null);
  return (
    <SparkAltSlugContext.Provider value={{ altSlug, setAltSlug }}>
      {children}
    </SparkAltSlugContext.Provider>
  );
}

export function useSparkAltSlug() {
  const ctx = useContext(SparkAltSlugContext);
  if (!ctx) {
    throw new Error("useSparkAltSlug must be used within SparkAltSlugProvider");
  }
  return ctx;
}
