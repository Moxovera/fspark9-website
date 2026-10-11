import BackLink from "@/components/brand/BackLink";
import CutButton from "@/components/brand/CutButton";
import GoButton from "@/components/brand/GoButton";
import RadarGlyph from "@/components/spark/radar/RadarGlyph";
import RadarIssueList from "@/components/spark/radar/RadarIssueList";
import RadarNet from "@/components/spark/radar/RadarNet";
import RadarShape from "@/components/spark/radar/RadarShape";
import { h2, mono } from "@/components/spark/radar/styles";
import { Link } from "@/i18n/navigation";
import { RADAR_SIGNALS } from "@/lib/radar";
import { fill } from "@/lib/format";
import type { RadarFormatPageProps } from "@/types/content";

const wrap = "mx-auto w-full max-w-[1312px]";
const gutter = "px-5 text-[17px] leading-[1.55] min-[900px]:px-8 min-[1280px]:px-16";
const group = "flex flex-col gap-[22px] border-t-2 border-ink pt-5";

/**
 * On the Radar format sayfası (prototip Spark/Radar-format/on-the-radar-format.html):
 * Ink açılış (dolu 03, başlık, konu cümlesi, hareketli radar), son sayı,
 * tüm sayılar, "Bu format hakkında", Ink kapanış ve feragat. Spark şeridi
 * (SparkSubnav) sayfa kabuğunda. Yayında sayı yoksa son sayı ve tüm sayılar
 * hiç çıkmaz; ilk sayı yayına girince kodsuz çıkar.
 */
export default function RadarFormatPage({ format, copy, sparkLabel, issues }: RadarFormatPageProps) {
  const latest = issues[0];
  const count = fill(issues.length === 1 ? copy.countOne : copy.countMany, { n: issues.length });

  return (
    <>
      <section className={`on-ink bg-ink text-paper ${gutter}`}>
        <div className={`${wrap} flex flex-col gap-7 pt-[18px] pb-16`}>
          <BackLink href="/spark" label={sparkLabel} ground="ink" />
          <div className="grid grid-cols-1 items-center gap-10 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,460px)] min-[960px]:gap-16">
            <div className="flex min-w-0 flex-col gap-[18px]">
              <span aria-hidden="true" className="font-display text-[clamp(96px,16vw,180px)] leading-[0.8] font-extrabold tracking-[-0.045em] text-paper">
                {format.number}
              </span>
              <span className={`${mono} text-dust`}>{copy.kicker}</span>
              <h1 className="m-0 font-display text-[clamp(44px,7vw,84px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance text-paper">{format.name}</h1>
              <p className="m-0 max-w-[40ch] text-[19px]">{format.line}</p>
            </div>
            <div aria-hidden="true" className="flex flex-col items-center">
              <RadarNet labels={copy.signals} />
            </div>
          </div>
        </div>
      </section>

      <div className={`${wrap} flex flex-col gap-[88px] pt-16 pb-24 ${gutter}`}>
        {latest && (
          <section aria-labelledby="radar-latest" className={group}>
            <span id="radar-latest" className={`${mono} text-stone`}>
              {copy.latest}
            </span>
            <article className="grid grid-cols-1 gap-7 border-t-2 border-ink bg-white px-5 pt-6 pb-7 min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,380px)] min-[860px]:gap-12 min-[860px]:px-9 min-[860px]:pt-8 min-[860px]:pb-9">
              <div className="flex min-w-0 flex-col gap-4">
                <span className={`${mono} text-stone`}>
                  {latest.numberLabel} · <span className="normal-case">{latest.company}</span> · {latest.place}
                </span>
                <h3 className="m-0 max-w-[18ch] font-display text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">{latest.headline}</h3>
                <p className="m-0 max-w-[52ch] text-[18px] text-stone">{latest.hook}</p>
                <Link href={latest.href} className="group mt-[6px] inline-flex items-center gap-[14px] self-start font-display text-[17px] font-bold no-underline">
                  {copy.readLong}
                  <GoButton size={48} className="go-flare" />
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center">
                <RadarShape
                  values={latest.values}
                  labels={copy.signals}
                  radius={92}
                  viewBox="-178 -132 356 270"
                  dots
                  title={`${copy.radarLabel}: ${latest.company}`}
                  className="h-auto w-full max-w-[360px]"
                />
              </div>
            </article>
          </section>
        )}

        {latest && (
          <section aria-labelledby="radar-all" className={group}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <span id="radar-all" className={`${mono} text-stone`}>
                {copy.all}
              </span>
              <span className={`${mono} text-stone`}>{count}</span>
            </div>
            <RadarIssueList issues={issues} copy={copy} />
          </section>
        )}

        <section aria-labelledby="radar-how" className={group}>
          <span className={`${mono} text-stone`}>{copy.about}</span>
          <h2 id="radar-how" className={h2}>
            {copy.howTitle}
          </h2>
          <div className="grid max-w-[62ch] grid-cols-1 gap-[6px]">
            {copy.aboutLines.map((line) => (
              <p key={line} className="m-0 text-[19px] leading-[1.5]">
                {line}
              </p>
            ))}
          </div>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2 p-0">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="flex min-w-0 flex-col gap-[10px] bg-white px-4 pt-[18px] pb-5">
                <RadarGlyph index={i} />
                <span className={`${mono} text-stone`}>
                  {i + 1} / {copy.steps.length}
                </span>
                <h3 className="m-0 font-display text-[19px] leading-[1.2] font-bold tracking-[-0.015em] text-balance">{step.title}</h3>
                <p className="m-0 text-[15px] leading-[1.45] text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
          <span className={`${mono} text-stone`}>{copy.fiveLabel}</span>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t border-rule p-0">
            {copy.five.map((signal, i) => (
              <li key={RADAR_SIGNALS[i]} className="flex min-w-0 flex-col gap-1 border-b border-rule py-[14px] pr-4">
                <span className={`${mono} text-ink`}>{signal.name}</span>
                <p className="m-0 text-[15px] leading-[1.45] text-stone">{signal.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={`on-ink bg-ink text-paper ${gutter}`}>
        <div className={`${wrap} flex flex-col items-start gap-[22px] pt-16 pb-[72px]`}>
          <span className={`${mono} text-dust`}>{copy.next}</span>
          <h2 className={`${h2} max-w-[20ch] text-paper`}>{copy.closeTitle}</h2>
          <p className="m-0 max-w-[52ch] text-[18px]">{copy.closeLine}</p>
          <CutButton label={copy.cta} />
        </div>
      </section>

      <footer className={gutter}>
        <div className={`${wrap} pt-7 pb-12`}>
          <p className="m-0 max-w-[90ch] text-[13px] text-stone">{copy.disclaimer}</p>
        </div>
      </footer>
    </>
  );
}
