import { Link } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import { ArrowDownIcon } from "@/components/icons";
import { LEAD_FORM_ID } from "@/lib/lead";
import type { LeadHeaderProps } from "@/types/content";

/**
 * Lead sayfasının header'ı: menü yok. Koyu hero'nun üstünde duruyor (sabit
 * değil): logo ana sayfaya, dil değiştirici aynı sayfanın öbür diline,
 * küçük Flare düğme forma.
 */
export default function LeadHeader({ homeLabel, brandName, navCta, locale }: LeadHeaderProps) {
  return (
    <header className="on-ink absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex h-[63px] max-w-[1240px] items-center justify-between px-5 min-[900px]:h-[83px] min-[900px]:px-8">
        <Link href="/" aria-label={homeLabel} className="flex min-h-11 items-center text-paper">
          <Logo label={brandName} className="h-[22px] min-[900px]:h-[27px]" />
        </Link>
        <div className="flex items-center gap-4 min-[900px]:gap-6">
          <LocaleSwitcher locale={locale} ground="ink" />
          <a
            href={`#${LEAD_FORM_ID}`}
            className="hidden min-h-11 items-center gap-2 bg-flare pr-[30px] pl-4 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-ink no-underline [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)] min-[600px]:inline-flex"
          >
            {navCta}
            <ArrowDownIcon className="size-[1em] flex-none" />
          </a>
        </div>
      </div>
    </header>
  );
}
