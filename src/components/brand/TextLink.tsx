import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";
import type { TextLinkProps } from "@/types/content";

/**
 * Altı çizili metin linki (brand book v3 §6: "cut button + underlined
 * text link"). Board: Hanken 700 15px, 2px alt çizgi, 10px aralıkla ok,
 * en az 44px dokunma yüksekliği. Ok, CutButton'daki gibi 1em görsel,
 * 0.6em yer kaplıyor.
 */
export default function TextLink({ href, label, ground = "paper", className }: TextLinkProps) {
  const color = ground === "ink" ? "text-paper" : "text-ink";
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center text-[15px] font-bold whitespace-nowrap no-underline ${color} ${className ?? ""}`}
    >
      <span className="text-link-line inline-flex items-center gap-[10px] pb-[5px] leading-[normal]">
        {label}
        <ArrowRightIcon className="go-arrow -mx-[0.2em] size-[1em] flex-none" />
      </span>
    </Link>
  );
}
