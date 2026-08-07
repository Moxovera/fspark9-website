"use client";

import { Link, usePathname } from "@/i18n/navigation";

interface LocaleSwitcherProps {
  locale: string;
}

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
 */
export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-[7px] font-mono text-[12.5px] tracking-[0.08em]">
      <Link
        href={pathname}
        locale="en"
        className={locale === "en" ? "text-ivory" : "text-ivory/45"}
      >
        EN
      </Link>
      <span className="text-ivory/30">|</span>
      <Link
        href={pathname}
        locale="tr"
        className={locale === "tr" ? "text-ivory" : "text-ivory/45"}
      >
        TR
      </Link>
    </div>
  );
}
