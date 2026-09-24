"use client";

import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useSparkAltSlug } from "@/components/chrome/SparkAltSlugContext";
import type { ComponentProps } from "react";

interface LocaleSwitcherProps {
  locale: string;
  /**
   * `header`: rengini header'ın tonundan alır (koyu: Paper/Dust, açık:
   * Ink/Stone). `ink`: her zaman koyu zemin (mobil menü).
   */
  ground?: "header" | "ink";
}

// usePathname()'in dönüş tipi /work/[slug], /spark/[formatSlug] gibi
// dinamik route KALIPLARINI (köşeli parantezli literal template) döner,
// çözülmüş path'i değil — next-intl'in Link'i templated bir href'i
// {pathname, params} nesnesi olmadan reddediyor ("Insufficient params
// provided for localized pathname"). useParams() güncel route'un gerçek
// segment değerlerini verir; ikisini birlikte geçmek hem statik hem
// dinamik route'larda çalışır (statik route'larda params boş obje).
type LinkHref = ComponentProps<typeof Link>["href"];

const SPARK_FORMAT_PATTERN = "/spark/[formatSlug]";
const SPARK_EPISODE_PATTERN = "/spark/[formatSlug]/[episodeSlug]";

/**
 * dc.html: EN/TR span'leri `st.lang`'ı flip'liyor, içerik SPA içinde
 * yerinde yeniden render oluyor — gerçek bir "aynı sayfada kal" kavramı
 * yok, çünkü zaten route değişmiyor. Next.js'te gerçek route'lar
 * olduğu için burada path-preserving olması gerekiyor: kullanıcı
 * /services'teyken dile geçince /tr/services'e gitmeli, ana sayfaya
 * değil. `usePathname()` next-intl'in locale önekini zaten
 * çıkarıyor, `Link`'in `locale` prop'u hedef dile göre doğru URL'i
 * kuruyor — bu yüzden client sınırı sadece bu okuma için gerekiyor,
 * ekstra state yok.
 *
 * Spark'ın format/episode sayfaları İSTİSNA: slug'ları (ör.
 * "the-last-day"/"son-gun") locale'e göre FARKLI, güncel locale'in
 * params'ını hedef locale'e olduğu gibi taşımak geçersiz bir URL'e
 * (404) götürüyordu (kullanıcı geri bildirimi, 18 Eylül 2026). Bu
 * yüzden bu iki route kalıbında `useSparkAltSlug()`'dan (bkz. o
 * dosyanın yorumu) gelen, sayfanın kendi Sanity verisinden bilinen
 * gerçek karşılık slug kullanılıyor.
 */
export default function LocaleSwitcher({ locale, ground = "header" }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();
  const { altSlug } = useSparkAltSlug();

  const isSparkFormat = pathname === SPARK_FORMAT_PATTERN;
  const isSparkEpisode = pathname === SPARK_EPISODE_PATTERN;

  function hrefFor(targetLocale: "en" | "tr"): LinkHref {
    if ((isSparkFormat || isSparkEpisode) && targetLocale !== locale) {
      if (!altSlug) {
        // Diğer locale'in slug'ı henüz bilinmiyor (bkz. Registrar'ın
        // useEffect gecikmesi) — geçersiz bir URL'e link vermek yerine
        // Spark hub'ına düş, hiçbir zaman 404'e gitme.
        return "/spark";
      }
      if (isSparkEpisode && altSlug.episodeSlug) {
        return {
          pathname: SPARK_EPISODE_PATTERN,
          params: { formatSlug: altSlug.formatSlug, episodeSlug: altSlug.episodeSlug },
        } as unknown as LinkHref;
      }
      return {
        pathname: SPARK_FORMAT_PATTERN,
        params: { formatSlug: altSlug.formatSlug },
      } as unknown as LinkHref;
    }
    return { pathname, params } as unknown as LinkHref;
  }

  // Board: etkin dil Paper ve 1px alt çizgili, diğeri ve ayraç Dust.
  // Açık header'da aynısı Ink/Stone ile.
  const follow = ground === "header";
  const activeColor = follow ? "text-paper group-data-[tone=light]/header:text-ink" : "text-paper";
  const quietColor = follow ? "text-dust group-data-[tone=light]/header:text-stone" : "text-dust";

  function item(target: "en" | "tr", label: string) {
    const active = locale === target;
    return (
      <Link
        href={hrefFor(target)}
        locale={target}
        aria-current={active ? "true" : undefined}
        className={`inline-flex min-h-11 items-center px-1 no-underline ${active ? activeColor : quietColor}`}
      >
        <span className={active ? "border-b border-current pb-[2px]" : undefined}>{label}</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em]">
      {item("en", "EN")}
      <span aria-hidden="true" className={quietColor}>/</span>
      {item("tr", "TR")}
    </div>
  );
}
