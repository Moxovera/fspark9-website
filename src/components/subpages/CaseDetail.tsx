import Image from "next/image";
import type { CaseStudy } from "@/types/content";

interface CaseDetailProps {
  item: CaseStudy;
}

/**
 * dc.html: page.hasCases (satır 822-886). `screens` grid'i dc.html'de
 * sabit 3 kolon, ama içerik zaten dc.html'in ötesinde (insha 6 ekran,
 * RUUT 3) — kırpmak yerine auto-fit ile her iki sayıda da doğru
 * davranan bir grid kullanıldı (bilinçli sapma, kod içi not).
 */
export default function CaseDetail({ item }: CaseDetailProps) {
  const {
    name,
    subtitle,
    coverImage,
    problemHeading,
    problem,
    actionsHeading,
    actions,
    deliveredHeading,
    delivered,
    tags,
    screens,
  } = item;

  return (
    <section className="bg-ivory px-7 py-[88px]">
      <div className="mx-auto max-w-[1100px]">
        <div className="border-t-2 border-bronze pt-[34px]">
          <h2 className="mb-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] font-semibold text-navy">
            {name}
          </h2>
          <p className="mb-[34px] text-[1.05rem] text-bronze">{subtitle}</p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
            <div>
              <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {problemHeading}
              </p>
              <p className="mb-7 text-[15.5px] leading-[1.66] text-charcoal">{problem}</p>
              <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {actionsHeading}
              </p>
              <div className="flex flex-col gap-3">
                {actions.map((action) => (
                  <p key={action.label} className="text-[15px] leading-[1.6] text-charcoal">
                    <strong className="text-navy">{action.label}</strong> {action.description}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-[26px] flex flex-col gap-2.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-navy">
                  <Image
                    src={coverImage.url}
                    alt={coverImage.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
                  {screens.map((screen) => (
                    <div
                      key={screen.url}
                      className="relative aspect-[9/16] overflow-hidden rounded-xl border border-navy/10"
                      style={{ background: "color-mix(in srgb, var(--charcoal) 3%, var(--ivory) 97%)" }}
                    >
                      <Image
                        src={screen.url}
                        alt={screen.alt}
                        fill
                        sizes="(min-width: 768px) 15vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
                {deliveredHeading}
              </p>
              <p className="mb-5 text-[15.5px] leading-[1.66] text-charcoal">{delivered}</p>
              <p className="font-mono text-xs text-muted">{tags.join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
