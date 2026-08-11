import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Marquee from "@/components/effects/Marquee";
import type { ProofItem, ProofStrip as ProofStripContent } from "@/types/content";
import type { ComponentProps } from "react";

interface ProofStripProps {
  content: ProofStripContent;
}

// bkz. chrome/Header.tsx — content.ts'in genel Link tipi next-intl'in
// pathnames union'ıyla birebir örtüşmüyor.
type LinkHref = ComponentProps<typeof Link>["href"];

function ProofCard({ item }: { item: ProofItem }) {
  return (
    <div
      className="w-[340px] shrink-0 px-[34px]"
      style={{
        borderLeft: "1px solid color-mix(in srgb, var(--bronze) 35%, transparent)",
      }}
    >
      {item.logo ? (
        <Image
          src={item.logo.url}
          alt={item.logo.alt || item.name}
          width={item.logo.width}
          height={item.logo.height}
          className="mb-2.5 h-8 w-auto"
        />
      ) : (
        <p className="mb-2.5 font-display text-[1.6rem] font-semibold text-navy">
          {item.name}
        </p>
      )}
      <p className="text-[13.5px] leading-[1.55] text-charcoal/66">
        {item.line}
      </p>
    </div>
  );
}

export default function ProofStrip({ content }: ProofStripProps) {
  const { kicker, roles, items, link } = content;
  // Kesintisiz döngü için liste iki kez basılıyor — dc.html: credLoop =
  // t.cred.items.concat(t.cred.items). Marquee, track genişliğinin
  // yarısı kadar kayınca başa sarıyor, bu yüzden döngü görünmez.
  const loopedItems = [...items, ...items];

  return (
    <section className="border-t border-charcoal/8 bg-ivory pt-[76px] pb-[84px]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-baseline gap-x-5.5 gap-y-2 px-7 pb-7.5">
        <p className="font-mono text-xs tracking-[0.16em] text-bronze uppercase">
          {kicker}
        </p>
        <p className="text-[13.5px] tracking-[0.01em] text-charcoal/60">
          {roles}
        </p>
      </div>

      <Marquee
        className="overflow-hidden py-[34px]"
        style={{
          background: "color-mix(in srgb, var(--bronze) 7%, var(--ivory))",
          borderTop: "1px solid color-mix(in srgb, var(--bronze) 22%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--bronze) 22%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        {loopedItems.map((item, i) => (
          <ProofCard key={`${item.name}-${i}`} item={item} />
        ))}
      </Marquee>

      <div className="mx-auto max-w-[1280px] px-7 pt-11">
        <Link
          href={link.href as LinkHref}
          className="border-b border-navy/35 pb-1 font-mono text-[13px] tracking-[0.06em] text-navy transition-colors duration-200 hover:text-bronze"
        >
          {link.label}
        </Link>
      </div>
    </section>
  );
}
