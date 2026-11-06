import ReportGate from "@/components/spark/gate/ReportGate";
import CutWord from "@/components/brand/CutWord";
import TextLink from "@/components/brand/TextLink";
import SparkTicker from "@/components/spark/hub/SparkTicker";
import { bandPad, wrap } from "@/components/spark/report/ReportParts";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeCost from "@/components/spark/report/sme/SmeCost";
import SmeMap from "@/components/spark/report/sme/SmeMap";
import SmeMirror from "@/components/spark/report/sme/SmeMirror";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import SmeStory from "@/components/spark/report/sme/SmeStory";
import SmeTimeline from "@/components/spark/report/sme/SmeTimeline";
import SmeTwins from "@/components/spark/report/sme/SmeTwins";
import { monoText } from "@/components/spark/decisions/styles";
import type { ReportHead, SmeEpisodeProps } from "@/types/content";

type Tone = "paper" | "white";

const band = (tone: Tone) => `scroll-mt-[150px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/**
 * Sektör raporu Nº 05 Almanya KOBİ bankacılığı (layout "sme"). Rapor
 * 14 bölüm, sayfa 7 durak; okur tek soruyu izler: hesap ile kredi
 * arasındaki köprüyü kim kuracak? Açılış (iki sayaç, kayan şerit), kısa
 * versiyon ve harita herkese açık; hesap ücretinden sonrası bülten kapısının
 * arkasında (Studio'da "Devamı bültenle açılsın" açıksa). Etkileşimli
 * duraklar client yapraklar; geri kalanı server. Sayfada sonsuz dönen tek
 * şey kayan şerit.
 */
export default function SmeEpisode({ report, locale, gate }: SmeEpisodeProps) {
  const { hero, short, map, cost, story, mirror, timeline, gaps, note, sources, readingLabel } = report;
  const t = sources.sourceTemplate;
  const text = (s: string) => <Psd3Text text={s} template={t} />;

  const head = (h: ReportHead, id: string, ink = false) => (
    <div className={`mb-[clamp(28px,4vw,48px)] grid gap-2.5 border-t-2 pt-[18px] ${ink ? "border-paper" : "border-ink"}`}>
      <div className={`${monoText} flex flex-wrap gap-3.5 ${ink ? "text-dust" : ""}`}>
        {h.index && <span>{h.index}</span>} <span>{h.label}</span>
      </div>
      <h2 id={id} className="m-0 max-w-[22ch] font-display text-[clamp(28px,3.8vw,46px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
        {h.title}
      </h2>
      {h.lede && <p className={`mt-1 mb-0 max-w-[62ch] ${ink ? "text-dust" : "text-stone"}`}>{text(h.lede)}</p>}
    </div>
  );

  // Kaynak numaraları gruplar boyunca kesintisiz.
  let n = 0;
  const groups = sources.groups.map((g) => ({ ...g, items: g.items.map((s) => ({ ...s, n: ++n })) }));

  return (
    <div className="text-[17px] leading-[1.55]">
      {/* Açılış */}
      <header className="on-ink relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden="true"
          className="text-outline-inkrule pointer-events-none absolute -top-[0.12em] right-[-1%] font-display text-[clamp(180px,32vw,420px)] leading-none font-extrabold tracking-[-0.06em] select-none"
        >
          {hero.bigNo}
        </div>
        <div className={`${wrap} ${bandPad} relative`}>
          <div className={`${monoText} flex flex-wrap gap-x-[18px] gap-y-1 text-dust`}>
            {hero.meta.map((item, i) => (
              <span key={item}>
                {i > 0 && " "}
                {item}
              </span>
            ))}
          </div>
          <h1 className="mt-[22px] mb-[26px] max-w-[15ch] font-display text-[clamp(40px,6.6vw,92px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
            {hero.titleLead} <CutWord>{hero.titleCut}</CutWord>
            {hero.titleTail && <> {hero.titleTail}</>}
          </h1>
          <p className="m-0 max-w-[52ch] text-[clamp(18px,2vw,22px)] leading-[1.45]">{hero.sub}</p>
          <div className="mt-[clamp(40px,6vw,72px)]">
            <SmeTwins twins={hero.twins} locale={locale} template={t} />
          </div>
          <p className="mt-6 mb-0 max-w-[40ch] font-display text-[clamp(20px,2.4vw,28px)] leading-[1.25] font-bold tracking-[-0.015em]">{hero.twinsLine}</p>
        </div>
      </header>
      <SparkTicker items={report.ticker} />

      {/* 01 Kısa versiyon */}
      <section id="short" aria-labelledby="short-title" className={band("paper")}>
        <div className={wrap}>
          {head(short.head, "short-title")}
          <ol className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 min-[821px]:grid-cols-2">
            {short.items.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 border-t border-rule py-4">
                <span className="pt-1 font-mono text-[12px] text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-1.5">
                  <h3 className="m-0 font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.015em]">{item.title}</h3>
                  <p className="m-0 text-[15.5px]">{text(item.text)}</p>
                  {item.reading && <SmeReading label={readingLabel} text={item.reading} template={t} className="mt-1.5" />}
                </div>
              </li>
            ))}
          </ol>
          <div className="on-ink mt-[clamp(32px,5vw,56px)] grid gap-2 bg-ink px-[clamp(20px,3vw,32px)] py-[clamp(22px,3vw,32px)] text-paper">
            <span className={`${small} text-dust`}>{short.questionLabel}</span>
            <p className="m-0 max-w-[30ch] font-display text-[clamp(26px,3.6vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">{short.question}</p>
          </div>
        </div>
      </section>

      {/* 02 Harita */}
      <section id="map" aria-labelledby="map-title" className={band("white")}>
        <div className={wrap}>
          {head(map.head, "map-title")}
          <SmeMap map={map} readingLabel={readingLabel} template={t} />
        </div>
      </section>

      <ReportGate gate={gate} locale={locale}>
        {/* 03 Hesap ücreti */}
        <section id="cost" aria-labelledby="cost-title" className={band("paper")}>
          <div className={wrap}>
            {head(cost.head, "cost-title")}
            <SmeCost cost={cost} locale={locale} template={t} />
          </div>
        </section>

        {/* 04 Kaan'ın 30 ayı */}
        <section id="kaan" aria-labelledby="kaan-title" className={band("white")}>
          <div className={wrap}>
            {head(story.head, "kaan-title")}
            <SmeStory story={story} locale={locale} template={t} />
          </div>
        </section>

        {/* 05 Ayna */}
        <section id="mirror" aria-labelledby="mirror-title" className={band("paper")}>
          <div className={wrap}>
            {head(mirror.head, "mirror-title")}
            <SmeMirror mirror={mirror} readingLabel={readingLabel} template={t} locale={locale} />
          </div>
        </section>

        {/* 06 Takvim */}
        <section id="calendar" aria-labelledby="calendar-title" className={band("white")}>
          <div className={wrap}>
            {head(timeline.head, "calendar-title")}
            <SmeTimeline timeline={timeline} readingLabel={readingLabel} template={t} />
            <h3 className={`${small} mt-[clamp(40px,6vw,64px)] mb-4`}>{timeline.effectsHeading}</h3>
            <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
              {timeline.effects.map((e, i) => (
                <article key={e.title} className="grid content-start gap-3 border-t-2 border-ink bg-paper px-5 pt-5 pb-6">
                  <span className="font-mono text-[12px] text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="m-0 font-display text-[19px] leading-[1.2] font-extrabold tracking-[-0.015em]">{e.title}</h4>
                  <SmeReading label={readingLabel} text={e.text} template={t} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 07 Sekiz boşluk */}
        <section id="gaps" aria-labelledby="gaps-title" className={band("paper")}>
          <div className={wrap}>
            {head(gaps.head, "gaps-title")}
            <div className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[1081px]:grid-cols-4">
              {gaps.items.map((g, i) => {
                const big = i === 0;
                // Son kart iki sütun: büyük kartla birlikte ızgara boşluksuz kapanır.
                const last = i === gaps.items.length - 1;
                return (
                  <article
                    key={g.key}
                    className={`grid min-w-0 content-start gap-3 border-t-4 p-5 ${big ? "on-ink border-flare bg-ink text-paper min-[641px]:col-span-2 min-[1081px]:row-span-2 min-[1081px]:p-8" : "border-ink bg-white"} ${last ? "min-[641px]:col-span-2" : ""}`}
                  >
                    <span className={`font-mono text-[12px] ${big ? "text-dust" : "text-stone"}`}>{g.key}</span>
                    <h3 className={`m-0 font-display leading-[1.12] font-extrabold tracking-[-0.02em] ${big ? "text-[clamp(28px,3.6vw,44px)]" : "text-[19px]"}`}>{g.title}</h3>
                    <div className="grid gap-1">
                      <span className={`${small} ${big ? "text-dust" : "text-stone"}`}>{gaps.evidenceLabel}</span>
                      <p className={`m-0 ${big ? "text-[17px]" : "text-[15px]"}`}>{text(g.evidence)}</p>
                    </div>
                    <SmeReading label={`${readingLabel} · ${gaps.chanceLabel}`} text={g.chance} template={t} ground={big ? "ink" : "paper"} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* fspark9 notu */}
        <section id="note" aria-labelledby="note-title" className={`on-ink bg-ink text-paper ${bandPad}`}>
          <div className={wrap}>
            {head(note.head, "note-title", true)}
            <p className="mt-0 mb-5 max-w-[56ch] text-dust">{note.intro}</p>
            <ol className="m-0 grid max-w-[880px] list-none gap-0 p-0">
              {note.questions.map((q, i) => (
                <li key={q} className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-3 border-t border-inkrule py-5">
                  <span className="font-mono text-[13px] text-dust">{String(i + 1).padStart(2, "0")}</span>
                  <p className="m-0 font-display text-[clamp(21px,2.6vw,30px)] leading-[1.2] font-bold tracking-[-0.02em]">{q}</p>
                </li>
              ))}
            </ol>
            <div className="mt-[clamp(28px,4vw,44px)] grid gap-2">
              <span className={`${small} text-dust`}>{note.linksLabel}</span>
              <div className="flex flex-wrap gap-x-8">
                {note.links.map((l) => (
                  <TextLink key={l.slug} href={{ pathname: "/services/[slug]", params: { slug: l.slug } }} label={l.label} ground="ink" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kaynaklar */}
        <section id="sources" aria-labelledby="sources-title" className={band("paper")}>
          <div className={wrap}>
            {head(sources.head, "sources-title")}
            <div className="grid gap-8 [column-gap:40px] min-[901px]:grid-cols-2">
              {groups.map((g) => (
                <div key={g.title} className="min-w-0">
                  <h3 className={`${small} mb-1 text-stone`}>{g.title}</h3>
                  <ol className="m-0 list-none p-0">
                    {g.items.map((s) => (
                      <li key={s.n} id={`source-${s.n}`} className="grid scroll-mt-[150px] grid-cols-[34px_1fr] gap-2 border-b border-rule py-2.5 text-[14px]">
                        <span className="font-mono text-[12px] text-stone">[{s.n}]</span>{" "}
                        <span className="min-w-0">
                          {s.label}.{" "}
                          <a href={s.href} target="_blank" rel="noopener" className="break-words">
                            {new URL(s.href).hostname}
                          </a>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="mt-7 mb-0 max-w-[80ch] text-[13.5px] text-stone">{sources.foot}</p>
          </div>
        </section>
      </ReportGate>
    </div>
  );
}
