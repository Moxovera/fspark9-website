import type { ApproachSection } from "@/types/content";
import Reveal from "@/components/ui/Reveal";

interface ApproachProps {
  content: ApproachSection;
}

export default function Approach({ content }: ApproachProps) {
  const { heading, blocks } = content;

  return (
    <section className="bg-ivory px-7 pb-24">
      <div className="mx-auto max-w-[1280px]">
        {heading && (
          <Reveal>
            <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.2] font-medium text-navy">
              {heading}
            </h3>
          </Reveal>
        )}

        <div className="approach-row">
          {blocks.map((block) => (
            <Reveal key={block.number} className="approach-panel">
              <p className="approach-panel-number font-mono text-xs tracking-[0.12em] text-bronze">
                {String(block.number).padStart(2, "0")}
              </p>
              <div>
                <h4 className="approach-panel-title font-display text-[1.22rem] leading-[1.3] font-semibold text-navy">
                  {block.title}
                </h4>
                <div className="approach-panel-body">
                  <p className="max-w-[46ch] text-[15px] leading-[1.65] text-charcoal">
                    {block.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
