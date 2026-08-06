import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import ServicesTabs from "@/components/sections/ServicesTabs";
import ServicesAccordion from "@/components/sections/ServicesAccordion";
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

        {/* Mobil/tablet (<900px): her hizmet kapalı başlayan bir accordion
            kartında (ServicesAccordion, client) — dc.html'de mobil kart
            hep açık ama bu, sayfanın aşırı uzamasını önlemek için kasıtlı
            bir sapma (bkz. FSPARK9-DURUM.md). */}
        <div className="min-[900px]:hidden">
          <ServicesAccordion items={items} labels={labels} />
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
