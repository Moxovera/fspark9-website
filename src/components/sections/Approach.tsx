import type { ApproachSection } from "@/types/content";

interface ApproachProps {
  content: ApproachSection;
}

export default function Approach({ content }: ApproachProps) {
  const { heading, blocks } = content;

  return (
    <section className="bg-ivory px-7 pb-24">
      <div className="mx-auto max-w-[1280px]">
        {heading && (
          <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.2] font-medium text-navy">
            {heading}
          </h3>
        )}

        <div className="mt-14 grid gap-[30px] min-[900px]:mt-[34px] min-[900px]:grid-cols-4 min-[900px]:gap-x-[10px] min-[900px]:gap-y-0 min-[900px]:border-t min-[900px]:border-navy/14">
          {blocks.map((block) => (
            <div
              key={block.number}
              className="bg-[color-mix(in_srgb,var(--bronze)_10%,var(--ivory)_90%)] p-[26px]"
            >
              <p className="mb-3 font-mono text-xs tracking-[0.12em] text-bronze">
                {String(block.number).padStart(2, "0")}
              </p>
              <h4 className="mb-3 font-display text-[1.22rem] leading-[1.3] font-semibold text-navy">
                {block.title}
              </h4>
              <p className="text-[15px] leading-[1.65] text-charcoal">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
