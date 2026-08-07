import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/sections/FaqAccordion";
import type { FaqSection } from "@/types/content";

interface FaqProps {
  content: FaqSection;
}

export default function Faq({ content }: FaqProps) {
  const { heading, items } = content;

  return (
    <section className="bg-ivory px-7 pb-[104px]">
      <div className="mx-auto max-w-[900px] border-t border-charcoal/[0.08] pt-24">
        <Reveal>
          <h2 className="mb-11 font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
            {heading}
          </h2>
        </Reveal>

        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
