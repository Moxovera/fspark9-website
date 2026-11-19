import Image from "next/image";
import Label from "@/components/brand/Label";
import { CheckIcon, LockIcon } from "@/components/icons";
import LeadForm from "@/components/lead/LeadForm";
import LeadHeader from "@/components/lead/LeadHeader";
import LeadProvider, { LeadHeroCard } from "@/components/lead/LeadProvider";
import LeadSticky from "@/components/lead/LeadSticky";
import { LEAD_FORM_ID } from "@/lib/lead";
import type { LeadPageViewProps } from "@/types/content";

const WRAP = "mx-auto w-full max-w-[1240px] px-5 min-[768px]:px-8";
const CUT = "[clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)]";
const INK_BUTTON = `inline-flex min-h-[52px] items-center justify-center gap-[10px] bg-ink pr-[38px] pl-[22px] font-sans text-[15px] leading-none font-bold whitespace-nowrap text-paper no-underline ${CUT}`;
const H2 = "m-0 font-display text-[clamp(32px,4.2vw,50px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-ink";

/**
 * Lead sayfası (İngiltere KOBİ raporu PDF'i). Tek hedef: e-posta bırak,
 * PDF insin. Düzen referans HTML'den (hero, sarı şerit, raporun içinden,
 * üç tespit, yazar ve kimin için, kapanış formu); bileşen dili sitenin:
 * kare köşe, kesik düğme, mono etiket.
 */
export default function LeadPageView({ page, locale, brandName, homeLabel }: LeadPageViewProps) {
  const img = (key: string, ext: "png" | "jpg") => `/reports/lp-${locale}-${key}.${ext}`;

  return (
    <LeadProvider locale={locale}>
      <LeadHeader homeLabel={homeLabel} brandName={brandName} navCta={page.navCta} locale={locale} />

      <main>
        {/* Hero */}
        <section className="on-ink relative bg-ink text-paper">
          <div
            className={`${WRAP} grid items-center gap-[110px] pt-[104px] pb-16 min-[960px]:grid-cols-[1.12fr_0.88fr] min-[960px]:gap-14 min-[960px]:pt-[136px] min-[960px]:pb-[88px]`}
          >
            <div>
              <span className="inline-flex items-center gap-[10px] border border-inkrule py-[6px] pr-[14px] pl-[6px] font-mono text-[12px] font-medium tracking-[0.06em] text-dust uppercase">
                <b className="bg-flare px-2 py-[3px] font-medium text-ink">{page.pillA}</b>
                <span>{page.pillB}</span>
              </span>
              <h1 className="mt-6 mb-5 font-display text-[clamp(40px,5.4vw,70px)] leading-[1.04] font-extrabold tracking-[-0.03em] text-paper">
                {page.h1Lead} <span className="text-flare">{page.h1Flare}</span>
              </h1>
              <p className="m-0 mb-7 max-w-[580px] text-[18px] leading-[1.5] text-paper/85 min-[600px]:text-[20px]">
                <b className="font-bold text-paper">{page.hookBold}</b> {page.hookRest}
              </p>
              <ul className="m-0 grid list-none gap-[10px] p-0">
                {page.checks.map((check) => (
                  <li key={check} className="flex items-start gap-3 text-[16.5px] leading-[1.45] text-paper/85">
                    <span className="mt-px flex size-6 flex-none items-center justify-center bg-flare text-ink">
                      <CheckIcon className="size-4" strokeWidth={2.4} />
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
              <dl className="m-0 mt-8 flex gap-[22px] border-t border-inkrule pt-6 min-[600px]:gap-[34px]">
                {page.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col-reverse">
                    <dt className="text-[13.5px] text-dust">{fact.label}</dt>
                    <dd className="m-0 font-display text-[32px] leading-none font-extrabold text-paper">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <LeadHeroCard
              id={LEAD_FORM_ID}
              className="relative scroll-mt-[120px] bg-paper px-5 pt-[150px] pb-[22px] text-ink min-[600px]:px-7 min-[600px]:pt-[168px] min-[600px]:pb-[26px]"
            >
              <Image
                src={img("players", "jpg")}
                alt=""
                width={714}
                height={1011}
                priority
                sizes="150px"
                className="absolute top-[-42px] left-1/2 w-[124px] translate-x-[-20%] rotate-[7deg] opacity-95 shadow-xl min-[600px]:w-[142px]"
              />
              <Image
                src={img("cover", "jpg")}
                alt=""
                width={714}
                height={1011}
                priority
                sizes="150px"
                className="absolute top-[-56px] left-1/2 w-[132px] -translate-x-1/2 rotate-[-4deg] shadow-2xl min-[600px]:w-[150px]"
              />
              <h2 className="m-0 mb-[6px] text-center font-display text-[27px] leading-[1.04] font-extrabold tracking-[-0.025em] text-ink">
                {page.cardTitle}
              </h2>
              <p className="m-0 mb-[18px] text-center text-[15.5px] leading-[1.5] text-stone">{page.cardText}</p>
              <LeadForm copy={page.form} placement="hero" locale={locale} pdf={page.pdf} ground="paper" />
              <ul className="m-0 mt-[14px] flex list-none flex-wrap justify-center gap-x-4 gap-y-[6px] p-0 font-mono text-[11px] font-medium tracking-[0.05em] text-stone uppercase">
                {page.trust.map((note) => (
                  <li key={note} className="flex items-center gap-[6px]">
                    <span aria-hidden="true" className="size-[7px] bg-flare" />
                    {note}
                  </li>
                ))}
              </ul>
            </LeadHeroCard>
          </div>
        </section>

        {/* Sarı şerit */}
        <div className="bg-flare text-ink">
          <dl className={`${WRAP} m-0 grid grid-cols-2 gap-6 py-[34px] min-[960px]:grid-cols-4`}>
            {page.band.map((stat) => (
              <div key={stat.value} className="flex flex-col-reverse">
                <dt className="mt-2 text-[14.5px] leading-[1.4]">{stat.label}</dt>
                <dd className="m-0 font-display text-[clamp(34px,4vw,50px)] leading-none font-extrabold tracking-[-0.03em]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Raporun içinden */}
        <section className="bg-paper py-16 min-[600px]:py-[92px]">
          <div className={WRAP}>
            <div className="mb-10 max-w-[720px]">
              <Label>{page.galleryKicker}</Label>
              <h2 className={`${H2} my-3`}>{page.galleryTitle}</h2>
              <p className="m-0 text-[17px] leading-[1.6] text-stone min-[600px]:text-[19px]">{page.galleryText}</p>
            </div>
            <div className="grid gap-5 min-[960px]:grid-cols-2">
              {page.gallery.map((item) => (
                <article key={item.key} className="relative flex flex-col gap-4 overflow-hidden border border-rule bg-white p-[22px]">
                  <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium tracking-[0.05em] text-stone uppercase">
                    <i className="bg-ink px-[7px] py-[2px] not-italic text-flare">{item.number}</i>
                    {item.tag}
                  </span>
                  <h3 className="m-0 font-display text-[23px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">{item.heading}</h3>
                  <p className="m-0 text-[15.5px] leading-[1.55] text-stone">{item.text}</p>
                  <div className={`relative mt-auto overflow-hidden border border-rule bg-white ${item.locked ? "max-h-[300px]" : ""}`}>
                    <Image
                      src={img(item.key, "png")}
                      alt={item.heading}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 960px) 560px, calc(100vw - 86px)"
                      className={`block h-auto w-full ${item.locked ? "opacity-80 blur-[3px]" : ""}`}
                    />
                    {item.locked && (
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent from-20% to-white to-[92%]" />
                    )}
                  </div>
                  {item.locked && (
                    <a href={`#${LEAD_FORM_ID}`} className={`${INK_BUTTON} absolute bottom-[34px] left-1/2 -translate-x-1/2`}>
                      <LockIcon className="size-[1.1em] flex-none" />
                      {page.lockedButton}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Dokuz tespitten üçü */}
        <section className="border-y border-rule bg-white py-16 min-[600px]:py-[92px]">
          <div className={WRAP}>
            <div className="mb-10 max-w-[720px]">
              <Label>{page.findingsKicker}</Label>
              <h2 className={`${H2} mt-3`}>{page.findingsTitle}</h2>
            </div>
            <div className="grid gap-[18px] min-[960px]:grid-cols-3">
              {page.findings.map((finding) => (
                <article key={finding.number} className="bg-paper p-6">
                  <span className="font-mono text-[12.5px] font-medium text-stone">{finding.number}</span>
                  <h3 className="my-2 font-display text-[21px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">{finding.heading}</h3>
                  <p className="m-0 text-[15.5px] leading-[1.55] text-stone">{finding.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-5 border-[1.5px] border-dashed border-stone px-6 py-[22px]">
              <Label className="-mb-[6px] w-full">{page.lockedFindingsLabel}</Label>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {page.lockedFindings.map((title) => (
                  <li key={title} className="bg-paper px-3 py-[6px] text-[14.5px] font-semibold text-ink blur-[2.2px] select-none">
                    {title}
                  </li>
                ))}
              </ul>
              <a href={`#${LEAD_FORM_ID}`} className={INK_BUTTON}>
                {page.lockedFindingsButton}
              </a>
            </div>
          </div>
        </section>

        {/* Yazar ve kimin için */}
        <section className="bg-paper py-16 min-[600px]:py-[92px]">
          <div className={`${WRAP} grid gap-5 min-[960px]:grid-cols-2`}>
            <div className="on-ink bg-ink p-[30px] text-paper">
              <span aria-hidden="true" className="mb-4 flex size-16 items-center justify-center rounded-full bg-flare font-display text-[24px] font-extrabold text-ink">
                {page.authorInitials}
              </span>
              <Label ground="ink" className="text-flare">{page.authorKicker}</Label>
              <h3 className="mt-2 mb-[10px] font-display text-[26px] leading-[1.1] font-extrabold tracking-[-0.025em] text-paper">{page.authorName}</h3>
              <p className="m-0 text-[16px] leading-[1.6] text-paper/80">{page.authorText}</p>
            </div>
            <div className="border border-rule bg-white p-[30px]">
              <Label>{page.whoKicker}</Label>
              <h3 className="mt-2 mb-[14px] font-display text-[26px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">{page.whoTitle}</h3>
              <ul className="m-0 list-none p-0">
                {page.who.map((line) => (
                  <li key={line} className="relative border-t border-rule py-[11px] pl-[30px] text-[16.5px] leading-[1.45] text-ink">
                    <span aria-hidden="true" className="absolute top-[17px] left-0 size-3 bg-flare outline-2 outline-ink" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Kapanış */}
        <section className="bg-paper pb-16 min-[600px]:pb-[92px]">
          <div className={WRAP}>
            <div className="on-ink grid items-center gap-10 bg-ink p-7 text-paper min-[600px]:p-9 min-[960px]:grid-cols-[1.1fr_0.9fr] min-[960px]:p-14">
              <div>
                <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-paper">
                  {page.finalTitle}
                </h2>
                <p className="mt-[14px] mb-0 text-[17px] leading-[1.6] text-paper/80">{page.finalText}</p>
              </div>
              <LeadForm copy={page.form} placement="bottom" locale={locale} pdf={page.pdf} ground="ink" />
            </div>
          </div>
        </section>
      </main>

      <LeadSticky label={page.sticky} />
    </LeadProvider>
  );
}
