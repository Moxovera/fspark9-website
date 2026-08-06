import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import type { ProcessSection } from "@/types/content";

interface ProcessProps {
  content: ProcessSection;
}

// dc.html: state.step (varsayılan 0), tab tıklaması setState({step:i}) ile
// değişiyor. Sağ içerik alanı SADECE aktif adımın body+detail+CTA'sını
// gösteriyor (Services'in panel-stack crossfade'inden farklı — burada tek
// bir conditional render var, key değişince fs-fade CSS animasyonuyla
// yeniden oynatılıyor). Geçiş A'da sadece ilk adım (index 0) aktif/statik
// gösteriliyor, tıklama Geçiş C'de eklenecek.
// Tab'lar dc.html'de <div onClick> — AudienceAccordion'daki aynı
// erişilebilirlik kararıyla gerçek <button> kullanıldı.
export default function Process({ content }: ProcessProps) {
  const { heading, steps, ctaLabel, ctaHref } = content;
  const activeStep = steps[0];

  return (
    <section className="bg-navy px-7 py-[104px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-[52px] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-ivory">
            {heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-14">
          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isActive = i === 0;
              return (
                <button
                  key={step.number}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  className="focus-visible:outline-bronze flex cursor-pointer items-baseline gap-[18px] border-0 bg-transparent py-[22px] pr-[22px] pl-5 text-left transition-[background-color,color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderLeft: `2px solid ${isActive ? "var(--bronze)" : "color-mix(in srgb, var(--ivory) 15%, transparent)"}`,
                    background: isActive
                      ? "color-mix(in srgb, var(--ivory) 5%, transparent)"
                      : "transparent",
                    color: isActive
                      ? "var(--ivory)"
                      : "color-mix(in srgb, var(--ivory) 55%, transparent)",
                  }}
                >
                  <span className="font-mono text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none text-bronze">
                    {String(step.number).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.25]">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="col-span-2 flex min-h-[260px] min-w-0 flex-col gap-[26px]">
            <p className="text-pretty font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.4] font-medium text-ivory">
              {activeStep.description}
            </p>
            <p className="max-w-[56ch] text-[15px] leading-[1.65] text-ivory/60">
              {activeStep.detail}
            </p>
            <Link
              href={ctaHref}
              className="self-start bg-bronze px-[26px] py-[15px] text-[15px] font-medium text-ivory"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
