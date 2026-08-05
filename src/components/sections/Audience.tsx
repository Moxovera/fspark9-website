import type { AudienceSection } from "@/types/content";

interface AudienceProps {
  content: AudienceSection;
}

// Geçiş A: sadece açık/genişletilmiş kart hali. dc.html'deki kapalı-hal
// (hover-peek önizleme, ok işareti, ikon) ve accordion açma/kapama Geçiş
// C'de eklenecek — bu geçişte state yok, bileşen server component.
export default function Audience({ content }: AudienceProps) {
  const { heading, labels, cards } = content;

  return (
    <section className="bg-ivory px-7 pt-10 pb-[104px]">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-12 max-w-[26ch] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
          {heading}
        </h2>

        <div className="border-t border-navy/14">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="border-b border-navy/14 bg-navy/[0.035] px-1 pt-[38px] pb-11"
            >
              <div className="grid grid-cols-[76px_1fr] gap-5">
                <span className="pt-1.5 font-mono text-[13px] tracking-[0.1em] text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="max-w-[30ch] font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.22] font-medium text-navy">
                    {card.title}
                  </h3>
                  <div className="mt-7 flex max-w-[68ch] flex-col gap-[22px]">
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
                        {labels.problem}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.problem}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                        {labels.do}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.do}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                        {labels.result}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
