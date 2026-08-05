import AudienceAccordion from "./AudienceAccordion";
import type { AudienceSection } from "@/types/content";

interface AudienceProps {
  content: AudienceSection;
}

export default function Audience({ content }: AudienceProps) {
  const { heading, labels, cards } = content;

  return (
    <section className="bg-ivory px-7 pt-10 pb-[104px]">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-12 max-w-[26ch] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
          {heading}
        </h2>

        <AudienceAccordion cards={cards} labels={labels} />
      </div>
    </section>
  );
}
