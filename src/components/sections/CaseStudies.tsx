import Reveal from "@/components/ui/Reveal";
import CaseCard from "@/components/sections/CaseCard";
import type { CaseStudiesSection } from "@/types/content";

interface CaseStudiesProps {
  content: CaseStudiesSection;
}

export default function CaseStudies({ content }: CaseStudiesProps) {
  const { heading, intro, items, linkLabel } = content;

  return (
    <section className="bg-ivory px-7 pb-[104px]">
      <div className="mx-auto max-w-[1280px] border-t border-charcoal/[0.08] pt-24">
        {heading && (
          <Reveal>
            <h2 className="mb-4 font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
              {heading}
            </h2>
          </Reveal>
        )}
        <Reveal className="mb-12 max-w-[62ch] text-[1.05rem] leading-[1.6] text-muted">
          <p>{intro}</p>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[26px]">
          {items.map((item) => (
            <Reveal key={item.slug}>
              <CaseCard item={item} linkLabel={linkLabel} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
