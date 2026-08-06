import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import ServicesTabs from "@/components/sections/ServicesTabs";
import type { ServicesSection } from "@/types/content";

interface ServicesProps {
  content: ServicesSection;
}

export default function Services({ content }: ServicesProps) {
  const {
    heading,
    intro,
    labels,
    items,
    fullEngagementHeading,
    fullEngagementBody,
    link,
  } = content;

  return (
    <section className="bg-ivory px-7 py-[104px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-4 font-display text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.1] font-medium text-navy">
            {heading}
          </h2>
        </Reveal>
        <Reveal className="mb-14 text-[1.08rem] text-muted">
          <p>{intro}</p>
        </Reveal>

        {/* Masaüstü (≥900px, dc.html: st.w<900 eşiği): sol tab listesi +
            sağ panel, tıklama ve crossfade ServicesTabs'ta (client). */}
        <Reveal className="hidden min-[900px]:block">
          <ServicesTabs items={items} labels={labels} />
        </Reveal>

        {/* Mobil/tablet (<900px): her hizmet kendi kartında, problem/
            action/outcome hep açık, tab yok — dc.html'de her kart ayrı
            data-reveal="1". */}
        <div className="flex flex-col gap-5 min-[900px]:hidden">
          {items.map((item) => (
            <Reveal
              key={item.slug}
              className="rounded-[18px] border border-navy/12 bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)] p-[26px]"
            >
              <p className="mb-3 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                {String(item.number).padStart(2, "0")} · {item.tag}
              </p>
              <h3 className="mb-5 font-display text-[1.45rem] leading-[1.18] font-medium text-navy">
                {item.title}
              </h3>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {labels.problem}
              </p>
              <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.problem}</p>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {labels.action}
              </p>
              <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.action}</p>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
                {labels.outcome}
              </p>
              <p className="text-[15px] leading-[1.62] text-charcoal">{item.outcome}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 border-t border-charcoal/12 pt-[34px]"
        >
          <h4 className="font-display text-[1.6rem] leading-[1.2] font-medium text-navy">
            {fullEngagementHeading}
          </h4>
          <p className="col-span-2 min-w-0 text-[1rem] leading-[1.68] text-charcoal">
            {fullEngagementBody}
          </p>
        </Reveal>

        <Link
          href={link.href}
          className="mt-9 inline-block border-b border-bronze/40 pb-1 font-mono text-[13px] tracking-[0.06em] text-navy"
        >
          {link.label}
        </Link>
      </div>
    </section>
  );
}
