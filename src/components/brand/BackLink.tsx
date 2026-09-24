import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import type { BackLinkProps } from "@/types/content";

/**
 * Alt sayfaların başındaki "bir üst seviye" linki (brand book v3 §6
 * "Back link"): mono, büyük harf, SVG ok, en az 44px yükseklik. Ink
 * zeminde Dust, açık zeminde Stone.
 */
export default function BackLink({ href, label, ground, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center gap-[10px] self-start font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] uppercase no-underline ${ground === "ink" ? "text-dust" : "text-stone"} ${className ?? ""}`}
    >
      <ArrowLeftIcon className="-mx-[2.5px] size-[15px] flex-none" />
      {label}
    </Link>
  );
}
