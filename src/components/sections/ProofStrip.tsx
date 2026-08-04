import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ProofStrip as ProofStripContent } from "@/types/content";

interface ProofStripProps {
  content: ProofStripContent;
}

export default function ProofStrip({ content }: ProofStripProps) {
  const { kicker, roles, items, link } = content;

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

      <div
        className="overflow-hidden py-[34px]"
        style={{
          background: "color-mix(in srgb, var(--bronze) 15%, var(--ivory))",
          borderTop: "1px solid color-mix(in srgb, var(--bronze) 22%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--bronze) 22%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max">
          {items.map((item) => (
            <div
              key={item.name}
              className="w-[340px] shrink-0 px-[34px]"
              style={{
                borderLeft:
                  "1px solid color-mix(in srgb, var(--bronze) 35%, transparent)",
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
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-7 pt-11">
        <Link
          href={link.href}
          className="border-b border-navy/35 pb-1 font-mono text-[13px] tracking-[0.06em] text-navy"
        >
          {link.label}
        </Link>
      </div>
    </section>
  );
}
