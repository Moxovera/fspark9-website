import type { TestimonialSection } from "@/types/content";
import Reveal from "@/components/ui/Reveal";
import TestimonialSlider from "@/components/sections/TestimonialSlider";

interface TestimonialsProps {
  content: TestimonialSection;
}

export default function Testimonials({ content }: TestimonialsProps) {
  return (
    <section className="border-t border-charcoal/[0.08] bg-ivory px-7 py-24">
      <Reveal className="mx-auto max-w-[1200px] overflow-hidden rounded-[26px] border border-navy/12 shadow-[0_34px_74px_-34px_rgba(11,31,58,0.45)]">
        <TestimonialSlider slides={content.items} />
      </Reveal>
    </section>
  );
}
