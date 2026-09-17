import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/sections/ServicesAccordion";
import type { ComponentProps } from "react";

// bkz. Header.tsx — content.ts'in genel Link tipi next-intl'in
// pathnames union'ıyla birebir örtüşmüyor.
type LinkHref = ComponentProps<typeof Link>["href"];

interface QuietLinkProps {
  // Düz string (statik route) YA DA next-intl'in {pathname, params}
  // nesnesi (templated route, ör. /spark/[formatSlug]/[episodeSlug]) —
  // bkz. FormatCard.tsx'teki "Insufficient params" hatası, aynı sorunu
  // burada da önlemek için tip düz string'e daraltılmadı.
  href: LinkHref;
  label: string;
  className?: string;
}

/**
 * Sessiz metin linki — Story.tsx'teki "read the story" linkiyle aynı
 * görsel dil (mono, alt çizgi, bronz hover), burada tekrar kullanılabilir
 * bir bileşene çıkarıldı. Kutulu buton DEĞİL — Spark bölümünün "One link
 * at the bottom, using the NextLine quiet text link pattern... not a
 * boxed button" gereksinimi.
 */
export default function QuietLink({ href, label, className }: QuietLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 border-b border-bronze/45 pb-1 font-mono text-[13px] tracking-[0.06em] text-ivory transition-colors duration-200 hover:text-bronze ${className ?? ""}`}
    >
      {label}
      <span
        className="inline-block h-[13px] w-[13px] [&>svg]:h-full [&>svg]:w-full"
        aria-hidden="true"
      >
        <ArrowRightIcon />
      </span>
    </Link>
  );
}
