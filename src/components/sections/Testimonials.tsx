import type { TestimonialSection } from "@/types/content";

interface TestimonialsProps {
  content: TestimonialSection;
}

// Geçiş A: sadece ilk slayt statik gösteriliyor. Diğer testimonial'lar
// content.ts'ten geliyor ama track/dot/prev-next mantığı (dc.html:
// st.testi, testiTrackStyle) Geçiş C'de eklenecek — bu yüzden dot/ok
// kontrolleri burada hiç yok, işlevsiz buton eklememek için.
export default function Testimonials({ content }: TestimonialsProps) {
  const slide = content.items[0];
  if (!slide) return null;

  return (
    <section className="border-t border-charcoal/[0.08] bg-ivory px-7 py-24">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[26px] border border-navy/12 shadow-[0_34px_74px_-34px_rgba(11,31,58,0.45)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 bg-navy px-8 py-[clamp(40px,4.4vw,68px)] text-center">
            <p className="max-w-[22ch] text-pretty font-display text-[clamp(1.5rem,2.3vw,2.05rem)] leading-[1.22] font-medium text-ivory">
              {slide.headline}
            </p>
            <button
              type="button"
              className="testimonial-cta rounded-full px-[30px] py-[15px] text-[14.5px] font-medium"
            >
              {slide.ctaLabel}
            </button>
          </div>
          <div className="flex min-h-[400px] flex-col justify-between gap-10 bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)] px-8 py-[clamp(40px,4.4vw,62px)]">
            <div>
              <p className="mb-[26px] text-pretty font-display text-[clamp(1.18rem,1.8vw,1.6rem)] leading-[1.45] font-medium text-navy">
                {slide.quote}
              </p>
              <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                {slide.attribution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
