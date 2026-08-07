import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import type { SiteSettings } from "@/types/content";
import type { ComponentProps } from "react";

interface FooterProps {
  settings: SiteSettings;
  locale: string;
}

// bkz. Header.tsx — aynı gerekçe: content.ts'in genel Link[] tipi
// (href: string) next-intl'in pathnames union'ıyla birebir örtüşmüyor.
type LinkHref = ComponentProps<typeof Link>["href"];

/**
 * pb-[116px] (<900px): MobileBookingBar.tsx sabit alt bar'ı bu genişlikte
 * görünüyor (~77.5px, EN/TR ve 320-414px arası ölçüldü, satır kırılmıyor)
 * ve sayfanın son elemanı bu bileşen olduğu için, ekstra pay olmadan
 * imza satırı ve copyright kalıcı olarak bar'ın altında kalıyordu —
 * kullanıcı daha aşağı kaydıramadığı için görünmez oluyordu.
 */
export default function Footer({ settings, locale }: FooterProps) {
  const { footer } = settings;
  const { tagline, nine, signature, email, linkedin, nav, legalLinks, legal, copyright } =
    footer;

  return (
    <footer className="bg-[color-mix(in_srgb,var(--navy)_75%,black_25%)] px-7 pt-[76px] pb-[34px] max-[900px]:pb-[116px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-11 pb-[52px]">
          <div>
            <Image
              src="/assets/lockup-reversed.svg"
              alt="fspark9"
              width={166}
              height={47}
              className="mb-[18px] h-auto w-[166px]"
            />
            <p className="mb-[22px] text-[14.5px] text-ivory/60">{tagline}</p>
            <p className="font-display text-[1.1rem] text-bronze">{nine}</p>
          </div>

          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href as LinkHref}
                className="text-[14.5px] text-ivory/72"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener"
              className="text-[14.5px] text-ivory/72"
            >
              LinkedIn
            </a>
            <a href={`mailto:${email}`} className="text-[14.5px] text-ivory/72">
              {email}
            </a>
            <div className="mt-2">
              <LocaleSwitcher locale={locale} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href as LinkHref} className="text-sm text-ivory/55">
                {item.label}
              </Link>
            ))}
            <p className="mt-2 text-[13px] leading-[1.6] text-ivory/40">{legal}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-5 border-t border-bronze/40 pt-[22px]">
          <p className="font-mono text-[12.5px] tracking-[0.08em] text-bronze">
            {signature}
          </p>
          <p className="text-[12.5px] text-ivory/40">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
