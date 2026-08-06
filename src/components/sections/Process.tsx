import Reveal from "@/components/ui/Reveal";
import ProcessTabs from "@/components/sections/ProcessTabs";
import type { ProcessSection } from "@/types/content";

interface ProcessProps {
  content: ProcessSection;
}

export default function Process({ content }: ProcessProps) {
  const { heading, steps, ctaLabel, ctaHref } = content;

  return (
    <section className="bg-navy px-7 py-[104px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-[52px] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-ivory">
            {heading}
          </h2>
        </Reveal>

        <ProcessTabs steps={steps} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      </div>
    </section>
  );
}
