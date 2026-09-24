import { Link } from "@/i18n/navigation";
import type { SparkSubnavProps } from "@/types/content";

/**
 * Format ve bölüm sayfalarında header altındaki Spark şeridi (brand book
 * v3 §6, board LastDay / Episode): "Spark" ve numaralı formatlar, geçerli
 * olan 2px Paper alt çizgili. Kaydırılabilir, taşmaz.
 */
export default function SparkSubnav({ sparkLabel, formats, currentSlug }: SparkSubnavProps) {
  return (
    <nav className="on-ink flex items-center gap-5 overflow-x-auto border-b border-inkrule bg-ink px-5 whitespace-nowrap min-[900px]:gap-9 min-[900px]:px-16">
      <Link
        href="/spark"
        className="inline-flex min-h-11 flex-none items-center border-r border-inkrule pr-3 font-display leading-[normal] text-[18px] font-extrabold tracking-[-0.02em] text-paper no-underline min-[900px]:pr-5 min-[900px]:text-[20px]"
      >
        {sparkLabel}
      </Link>
      {formats.map((format) => {
        const current = format.slug === currentSlug;
        return (
          <Link
            key={format.slug}
            href={{ pathname: "/spark/[formatSlug]", params: { formatSlug: format.slug } }}
            aria-current={current ? "page" : undefined}
            className={`inline-flex min-h-11 flex-none items-center gap-2 border-b-2 text-[14px] leading-[normal] no-underline min-[900px]:text-[15px] ${
              current ? "border-paper font-bold text-paper" : "border-transparent font-medium text-dust"
            }`}
          >
            <span className="font-mono text-[11px] tracking-[0.08em]">{format.number}</span>
            {format.name}
          </Link>
        );
      })}
    </nav>
  );
}
