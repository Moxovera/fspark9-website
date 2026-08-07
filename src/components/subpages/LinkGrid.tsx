import { Link as IntlLink } from "@/i18n/navigation";
import type { Link } from "@/types/content";
import type { ComponentProps } from "react";

interface LinkGridProps {
  links: Link[];
}

// bkz. Header.tsx — content.ts'in genel Link tipi next-intl'in
// pathnames union'ıyla birebir örtüşmüyor.
type LinkHref = ComponentProps<typeof IntlLink>["href"];

/**
 * dc.html: page.hasLinks (satır 1005-1016) — /thank-you'ya özel, 2
 * kartlık kapanış grid'i. Ok (→) veriden gelmiyor, sabit.
 */
export default function LinkGrid({ links }: LinkGridProps) {
  return (
    <section className="bg-ivory px-7 pt-[72px] pb-24">
      <div className="mx-auto grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {links.map((link) => (
          <IntlLink
            key={link.href}
            href={link.href as LinkHref}
            className="block border border-navy/[0.14] bg-[#fffdf7] p-7 no-underline transition-[border-color,transform] duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-bronze"
          >
            <p className="mb-2.5 font-display text-[1.2rem] text-navy">{link.label}</p>
            <span className="font-mono text-[12.5px] text-bronze">→</span>
          </IntlLink>
        ))}
      </div>
    </section>
  );
}
