import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import TextLink from "@/components/brand/TextLink";
import PhonePair from "@/components/blocks/PhonePair";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";
import type { HomeContent } from "@/types/content";

interface HomeWorkProps {
  content: HomeContent["work"];
}

const H2 =
  "m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[56px] min-[900px]:leading-none";

/**
 * Work (board Main #work / HomeMobile). White zemin: öne çıkan insha
 * (rakamlar ve telefonlar), RUUT satırı, Turkcell ve Albaraka şeridi.
 * "All cases" masaüstünde başlığın sağında, mobilde en altta.
 */
export default function HomeWork({ content }: HomeWorkProps) {
  const { featured } = content;
  const caseHref = (slug: string) => ({ pathname: "/work/[slug]" as const, params: { slug } });

  return (
    <section className="bg-white px-5 pt-16 pb-14 min-[900px]:px-8 min-[900px]:pt-[136px] min-[900px]:pb-32 min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-10 min-[900px]:gap-16">
        <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between">
          <div className="flex flex-col gap-4 min-[900px]:gap-5">
            <Label>{content.label}</Label>
            <h2 className={H2}>{content.heading}</h2>
          </div>
          <div className="hidden min-[900px]:block">
            <TextLink href="/work" label={content.allLinkLabel} />
          </div>
        </div>

        <article className="flex flex-col gap-[18px] border-t-2 border-ink pt-7 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:gap-y-0 min-[900px]:pt-12">
          <div className="flex flex-col gap-[18px] min-[900px]:col-span-6 min-[900px]:gap-[22px]">
            <Label strong>{featured.label}</Label>
            <h3 className="m-0 font-display text-[28px] leading-[1.1] font-bold tracking-[-0.025em] text-ink min-[900px]:text-[40px] min-[900px]:leading-[1.08]">
              {featured.heading}
            </h3>
            <p className="m-0 text-[17px] leading-[1.55] text-ink min-[900px]:max-w-[520px]">{featured.text}</p>

            <PhonePair screens={featured.screens} className="my-3 min-[900px]:hidden" />

            <dl className="m-0 flex flex-col border-b border-rule min-[900px]:mt-5 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-10 min-[900px]:border-t min-[900px]:border-b-0 min-[900px]:pt-7">
              {featured.figures.map((figure) => (
                <div
                  key={figure.label}
                  className="flex items-baseline justify-between border-t border-rule py-[14px] min-[900px]:flex-col min-[900px]:items-start min-[900px]:justify-start min-[900px]:gap-2 min-[900px]:border-t-0 min-[900px]:py-0"
                >
                  <dt className="max-w-[150px] text-right text-[14px] leading-[normal] text-stone min-[900px]:leading-[1.4] min-[900px]:max-w-none min-[900px]:text-left">
                    {figure.label}
                  </dt>
                  <dd className="order-first m-0 font-display text-[36px] leading-none font-extrabold tracking-[-0.03em] text-ink min-[900px]:text-[50px]">
                    {figure.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-2 min-[900px]:mt-4">
              <TextLink href={caseHref(featured.slug)} label={featured.linkLabel} />
            </div>
          </div>
          <div className="hidden min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:block">
            <PhonePair screens={featured.screens} />
          </div>
        </article>

        <div className="flex flex-col">
          {content.rows.map((row) => (
            <Link
              key={row.slug}
              href={caseHref(row.slug)}
              className="group flex flex-col gap-[10px] border-y border-rule py-6 no-underline min-[900px]:grid min-[900px]:grid-cols-[200px_minmax(0,1fr)_260px_24px] min-[900px]:items-center min-[900px]:gap-8 min-[900px]:py-8"
            >
              <span className="flex items-center justify-between">
                <span className="font-display text-[26px] leading-[normal] font-extrabold tracking-[-0.03em] text-ink min-[900px]:text-[34px]">
                  {row.name}
                </span>
                <ArrowRightIcon className="go-arrow size-[18px] text-ink min-[900px]:hidden" />
              </span>
              <span className="text-[16px] leading-[1.5] text-ink min-[900px]:text-[17px]">{row.line}</span>
              <Label as="span">{row.tags}</Label>
              <ArrowRightIcon className="go-arrow hidden size-5 text-ink min-[900px]:block" />
            </Link>
          ))}

          <div className="mt-10 flex flex-col gap-[14px] min-[900px]:mt-0 min-[900px]:grid min-[900px]:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_24px] min-[900px]:items-baseline min-[900px]:gap-8 min-[900px]:border-b min-[900px]:border-rule min-[900px]:py-7">
            <Label>{content.alsoLabel}</Label>
            <div className="grid grid-cols-2 gap-5 min-[900px]:contents">
              {content.also.map((item) => (
                <div key={item.title} className="flex flex-col gap-1 min-[900px]:gap-[6px]">
                  <span className="font-display text-[20px] leading-[normal] font-bold tracking-[-0.02em] text-ink min-[900px]:text-[22px]">
                    {item.title}
                  </span>
                  <span className="text-[14px] leading-[1.45] text-stone min-[900px]:text-[15px] min-[900px]:leading-[1.5]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TextLink href="/work" label={content.allLinkLabel} className="min-[900px]:hidden" />
      </Reveal>
    </section>
  );
}
