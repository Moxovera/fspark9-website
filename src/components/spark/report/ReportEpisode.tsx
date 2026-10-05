import type { CSSProperties, ReactNode } from "react";
import CutButton from "@/components/brand/CutButton";
import CutWord from "@/components/brand/CutWord";
import Reveal from "@/components/ui/Reveal";
import CountFigure from "@/components/spark/report/CountFigure";
import PoolSimulator from "@/components/spark/report/PoolSimulator";
import ReportLessons from "@/components/spark/report/ReportLessons";
import ReportNav from "@/components/spark/report/ReportNav";
import TrendChart from "@/components/spark/report/TrendChart";
import { FigureRow, MonoLine, ReportCardBlock, ReportRefs, SectionHead, bandPad, wrap } from "@/components/spark/report/ReportParts";
import { monoText } from "@/components/spark/decisions/styles";
import type { ReportEpisodeProps } from "@/types/content";

const section = (tone: "paper" | "white") => `scroll-mt-[150px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;
const firstLine = "m-0 max-w-[52ch] font-display text-[clamp(20px,2.4vw,27px)] leading-[1.22] font-bold tracking-[-0.02em]";
const panel = "grid min-w-0 content-start gap-3 border-t-2 border-ink bg-white px-[22px] pt-[22px] pb-[26px]";
const panelFirst = "m-0 font-display text-[21px] leading-[1.2] font-bold tracking-[-0.015em]";
const subHeading = "mb-3.5 mt-0 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]";

/**
 * Sektör raporu şablonu (Spark Nº 01 Bauspar, prototip Spark/sector
 * reports/fspark9-sektor-raporu-bauspar.html): Ink açılış ve köprü
 * rakamları, yapışkan bölüm şeridi, on bir bölüm, kapanış, kaynaklar.
 * Sunucu bileşeni; etkileşim (simülatör, grafik, akordeon, şerit, sayaç)
 * küçük client yapraklarda. Yapışkan şeridin hiçbir atasında transform ya
 * da overflow yok: Reveal sadece bölümlerin içindeki bloklarda.
 */
export default function ReportEpisode({ report, locale, footnoteTemplate }: ReportEpisodeProps) {
  const { hero, short, simulator, market, model, consumers, players, uses, compare, lessons, proposals, view, close, sources } = report;
  const refs = (text: string) => <ReportRefs text={text} template={footnoteTemplate} />;

  return (
    <>
      <header className="on-ink relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden="true"
          className="text-outline-inkrule pointer-events-none absolute -top-[0.12em] right-[-1%] font-display text-[clamp(180px,32vw,420px)] leading-none font-extrabold select-none"
        >
          {hero.bigNo}
        </div>
        <div className={`${wrap} ${bandPad} relative`}>
          <div className={`${monoText} flex flex-wrap gap-[18px] text-dust`}>
            {hero.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h1 className="mt-[22px] mb-[26px] max-w-[11ch] font-display text-[clamp(52px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
            {hero.titleLead} <CutWord>{hero.titleCut}</CutWord>
          </h1>
          <p className="m-0 max-w-[48ch] text-[clamp(18px,2vw,22px)] leading-[1.45]">{hero.sub}</p>
          <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 items-end gap-[clamp(14px,3vw,36px)] border-t border-inkrule pt-6 min-[821px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            {[hero.left, hero.right].map((side, index) => (
              <div key={side.label} className={`grid min-w-0 gap-3.5 ${index === 1 ? "min-[821px]:order-3 min-[821px]:text-right" : "min-[821px]:order-1"}`}>
                <MonoLine className="text-dust">{side.label}</MonoLine>
                <div className={`grid grid-cols-2 gap-[18px] ${index === 1 ? "min-[821px]:[direction:rtl] min-[821px]:[&>*]:[direction:ltr]" : ""}`}>
                  {side.figures.map((figure) => (
                    <div key={figure.label} className="min-w-0">
                      <div className="font-display text-[clamp(28px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap tabular-nums max-[420px]:text-[30px]">
                        <CountFigure figure={figure} locale={locale} />
                      </div>
                      <div className="mt-2 text-[14px] leading-[1.45] text-dust">{refs(figure.label)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div aria-hidden="true" className="hidden h-16 w-[clamp(60px,10vw,140px)] self-center min-[821px]:order-2 min-[821px]:block">
              <svg viewBox="0 0 140 64" preserveAspectRatio="none" className="block size-full overflow-visible">
                <path d="M0 60 Q70 -10 140 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="mt-[34px] flex flex-wrap items-center gap-[22px] text-[15.5px]">
            <a href="#kullanici" className="text-paper">
              {hero.simulatorLabel}
            </a>
            <a href="#oneriler" className="text-paper">
              {hero.proposalsLabel}
            </a>
          </div>
        </div>
      </header>

      <ReportNav items={report.nav} />

      <section id="kisa" aria-labelledby="kisa-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={short.head} id="kisa-title" />
          <Reveal className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-3">
            {short.cards.map((card) => (
              <ReportCardBlock key={card.tag} card={card} template={footnoteTemplate} />
            ))}
          </Reveal>
          <Reveal className="mt-5 grid gap-3.5 border-t-4 border-ink bg-white p-[clamp(20px,3vw,32px)]">
            <MonoLine>{short.view.tag}</MonoLine>
            <p className={firstLine}>{short.view.first}</p>
            <a href="#oneriler" className="text-[15.5px]">
              {short.view.linkLabel}
            </a>
          </Reveal>
        </div>
      </section>

      <section id="kullanici" aria-labelledby="kullanici-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={simulator.head} id="kullanici-title" />
          <PoolSimulator content={simulator} locale={locale} footnoteTemplate={footnoteTemplate} />
        </div>
      </section>

      <section id="pazar" aria-labelledby="pazar-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={market.head} id="pazar-title" />
          <FigureRow figures={market.figures} template={footnoteTemplate} />
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <TrendChart content={market} locale={locale} footnoteTemplate={footnoteTemplate} />
            <KeyRows rows={market.rows} refs={refs} />
          </div>
        </div>
      </section>

      <section id="model" aria-labelledby="model-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={model.head} id="model-title" />
          <Reveal>
            <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-ink p-0 min-[981px]:grid-cols-5">
              {model.steps.map((step, i) => (
                <li
                  key={step.title}
                  className={`grid min-w-0 content-start gap-2.5 border-rule py-4 max-[980px]:border-b min-[981px]:border-r min-[981px]:pt-[18px] min-[981px]:pr-[18px] min-[981px]:pb-[22px] ${
                    i > 0 ? "min-[981px]:pl-[18px]" : ""
                  } ${i === model.steps.length - 1 ? "min-[981px]:border-r-0" : ""}`}
                >
                  <span className="font-mono text-[12px] tracking-[0.08em] text-stone">{`${model.stepLabel} ${i + 1}`}</span>
                  <b className="font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.01em]">{step.title}</b>
                  <p className="m-0 text-[15px]">{refs(step.body)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-2">
            <div>
              <h3 className={subHeading}>{model.order.heading}</h3>
              <div className="grid grid-cols-1 border-t-2 border-ink min-[561px]:grid-cols-2">
                {model.order.items.map((item, i) => (
                  <div
                    key={item.key}
                    className={`grid content-start gap-2 pt-[18px] pb-5 ${i === 0 ? "min-[561px]:pr-[18px]" : "min-[561px]:border-l min-[561px]:border-rule min-[561px]:pl-[18px]"}`}
                  >
                    <MonoLine>{item.key}</MonoLine>
                    <p className="m-0 text-[15.5px]">{refs(item.text)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={subHeading}>{model.earns.heading}</h3>
              <KeyRows rows={model.earns.items} refs={refs} />
            </div>
          </div>
          <Reveal className="mt-[clamp(36px,5vw,56px)] grid grid-cols-1 gap-5 min-[901px]:grid-cols-3">
            {model.risks.map((card) => (
              <ReportCardBlock key={card.tag} card={card} template={footnoteTemplate} onWhite />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="tuketici" aria-labelledby="tuketici-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={consumers.head} id="tuketici-title" />
          <FigureRow figures={consumers.figures} template={footnoteTemplate} />
        </div>
      </section>

      <section id="oyuncular" aria-labelledby="oyuncular-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={players.head} id="oyuncular-title" />
          <div className="mt-2 flex h-14 border-[1.5px] border-ink">
            {players.share.map((part, i) => (
              <div
                key={part.label}
                style={{ flexBasis: `${part.basis}%` }}
                className={`flex min-w-0 items-center overflow-hidden px-3 font-mono text-[12px] tracking-[0.06em] whitespace-nowrap ${
                  i === 0 ? "bg-ink text-paper" : i === 1 ? "bg-stone text-white" : "bg-white text-ink"
                }`}
              >
                {part.label}
              </div>
            ))}
          </div>
          <p className="mt-2.5 mb-0 text-[14px] text-stone">{refs(players.legend)}</p>
          <div className="mt-[clamp(28px,4vw,44px)]">
            {players.items.map((player, i) => (
              <div
                key={player.name}
                className={`grid grid-cols-1 gap-2.5 border-b border-rule py-[18px] min-[861px]:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] min-[861px]:gap-6 ${i === 0 ? "border-t-2 border-t-ink" : ""}`}
              >
                <div>
                  <h3 className="m-0 font-display text-[19px] leading-[1.15] font-extrabold tracking-[-0.015em]">{player.name}</h3>
                  <p className="mt-1 mb-0 text-[14px] text-stone">{player.group}</p>
                </div>
                <p className="m-0 text-[15.5px]">
                  <span className="mb-1 block font-mono text-[11px] tracking-[0.08em] text-stone uppercase">{players.channelLabel}</span>
                  {refs(player.channel)}
                </p>
                <p className="m-0 text-[15.5px]">
                  <span className="mb-1 block font-mono text-[11px] tracking-[0.08em] text-stone uppercase">{players.noteLabel}</span>
                  {refs(player.note)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kullanim" aria-labelledby="kullanim-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={uses.head} id="kullanim-title" />
          <div className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
            <Reveal className={panel}>
              <MonoLine className="text-stone">{uses.renovation.tag}</MonoLine>
              <p className={panelFirst}>{uses.renovation.first}</p>
              <div className="mt-1.5 grid gap-2.5">
                {uses.renovation.meter.map((row) => (
                  <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_64px] items-center gap-3 text-[14.5px] min-[561px]:grid-cols-[150px_minmax(0,1fr)_72px]">
                    <span>{row.label}</span>
                    <div className="relative col-span-2 row-start-2 h-3.5 bg-rule min-[561px]:col-span-1 min-[561px]:row-start-auto">
                      <span
                        style={{ "--w": `${row.width}%` } as CSSProperties}
                        className={`meter-fill absolute inset-y-0 left-0 ${row.target ? "border-[1.5px] border-dashed border-ink bg-transparent" : "bg-ink"}`}
                      />
                    </div>
                    <span className="text-right font-display font-bold">{row.value}</span>
                  </div>
                ))}
              </div>
              {uses.renovation.paragraphs.map((text) => (
                <p key={text} className="m-0 text-[15.5px]">
                  {refs(text)}
                </p>
              ))}
            </Reveal>
            <Reveal className={panel}>
              <MonoLine className="text-stone">{uses.vehicles.tag}</MonoLine>
              <p className={panelFirst}>{uses.vehicles.first}</p>
              <FigureRow figures={uses.vehicles.figures} template={footnoteTemplate} two />
              {uses.vehicles.paragraphs.map((text) => (
                <p key={text} className="m-0 text-[15.5px]">
                  {refs(text)}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section id="iki-ulke" aria-labelledby="iki-ulke-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={compare.head} id="iki-ulke-title" />
          <div role="region" aria-labelledby="iki-ulke-title" tabIndex={0} className="overflow-x-auto border-t-2 border-ink">
            <table className="w-full min-w-[760px] border-collapse text-[15px]">
              <thead>
                <tr>
                  <th scope="col" className="w-[170px] border-b border-rule py-3.5 pr-3.5 text-left align-top">
                    <span className="sr-only">{compare.measureLabel}</span>
                  </th>
                  {compare.columns.map((column) => (
                    <th key={column} scope="col" className="border-b border-l border-rule py-3.5 pr-3.5 pl-3.5 text-left align-top font-display text-[18px] font-extrabold tracking-[-0.01em]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((row) => (
                  <tr key={row.measure}>
                    <th scope="row" className="w-[170px] border-b border-rule py-3.5 pr-3.5 text-left align-top font-mono text-[11.5px] font-medium tracking-[0.08em] text-stone uppercase">
                      {row.measure}
                    </th>
                    {row.cells.map((cell) => (
                      <td key={cell} className="border-b border-l border-rule py-3.5 pr-3.5 pl-3.5 text-left align-top">
                        {refs(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-7 mb-0 max-w-[80ch] text-[13.5px] text-stone">{compare.note}</p>
        </div>
      </section>

      <section id="dersler" aria-labelledby="dersler-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={lessons.head} id="dersler-title" />
          <ReportLessons groups={lessons.groups} />
        </div>
      </section>

      <section id="oneriler" aria-labelledby="oneriler-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={proposals.head} id="oneriler-title" />
          <Reveal className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
            {proposals.items.map((item) => (
              <article key={item.tag} className="grid min-w-0 content-start gap-3 border-t-2 border-ink bg-paper px-[22px] pt-[22px] pb-[26px]">
                <MonoLine className="text-stone">{item.tag}</MonoLine>
                <p className={panelFirst}>{item.first}</p>
                <p className="m-0 text-[15.5px]">{item.body}</p>
                {item.details.map((detail) => (
                  <div key={detail.key} className="grid gap-1 border-t border-rule pt-3 text-[15.5px]">
                    <b className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase">{detail.key}</b>
                    <span>{detail.text}</span>
                  </div>
                ))}
              </article>
            ))}
          </Reveal>
          <Reveal className="mt-5 grid gap-3.5 border-t-4 border-ink bg-paper p-[clamp(22px,3vw,34px)]">
            <MonoLine>{proposals.bridge.tag}</MonoLine>
            <p className="m-0 max-w-[40ch] font-display text-[clamp(22px,2.8vw,32px)] leading-[1.18] font-bold tracking-[-0.02em]">{proposals.bridge.first}</p>
            <ul className="m-0 grid list-none gap-0 p-0">
              {proposals.bridge.points.map((point) => (
                <li key={point} className="grid grid-cols-[18px_1fr] gap-3 border-b border-rule py-3 text-[15.5px] before:mt-[9px] before:size-2 before:bg-ink before:content-['']">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="gorus" aria-labelledby="gorus-title" className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={view.head} id="gorus-title" />
          <div className="grid gap-3.5 border-t-4 border-ink bg-white p-[clamp(20px,3vw,32px)]">
            {view.paragraphs.map((text) => (
              <p key={text} className="m-0 max-w-[62ch]">
                {refs(text)}
              </p>
            ))}
          </div>
          <div className="mt-[clamp(40px,6vw,64px)] grid max-w-[900px] grid-cols-1 items-start gap-7 min-[641px]:grid-cols-[120px_minmax(0,1fr)]">
            <div
              aria-hidden="true"
              className="grid size-[84px] place-items-center rounded-full bg-ink font-display text-[28px] font-extrabold tracking-[-0.04em] text-paper min-[641px]:size-[120px] min-[641px]:text-[40px]"
            >
              {view.expert.initials}
            </div>
            <div>
              <MonoLine>{view.expert.tag}</MonoLine>
              <blockquote className="mx-0 mt-2.5 mb-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.3] font-bold tracking-[-0.015em]">{view.expert.quote}</blockquote>
              <div className="mt-4 grid max-w-[62ch] gap-3">
                <p className="m-0">{view.expert.body}</p>
                <p className={`${monoText} m-0 text-ink`}>{view.expert.signature}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`on-ink bg-ink text-paper ${bandPad}`}>
        <div className={wrap}>
          <MonoLine className="text-dust">{close.label}</MonoLine>
          <h2 className="mt-4 mb-0 max-w-[16ch] font-display text-[clamp(34px,5.6vw,72px)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">{close.title}</h2>
          <p className="mt-[18px] mb-0 max-w-[52ch] text-dust">{close.body}</p>
          <div className="mt-[30px] flex flex-wrap items-center gap-[22px]">
            <CutButton label={close.bookLabel} />
            <a href="#kullanici" className="text-[15.5px] text-paper">
              {close.backLabel}
            </a>
          </div>
        </div>
      </section>

      <section id="kaynaklar" aria-labelledby="kaynaklar-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={sources.head} id="kaynaklar-title" />
          <ol className="m-0 list-none p-0 [column-gap:40px] [columns:2_380px]">
            {sources.items.map((source, i) => (
              <li key={source.label} id={`source-${i + 1}`} className="grid scroll-mt-[150px] grid-cols-[34px_1fr] gap-2 border-b border-rule py-2.5 text-[14px] [break-inside:avoid]">
                <span className="font-mono text-[12px] text-stone">{`[${i + 1}]`}</span>
                <span>
                  {source.label}.
                  {source.href && (
                    <>
                      {" "}
                      <a href={source.href} target="_blank" rel="noopener" className="break-words">
                        {new URL(source.href).hostname}
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-7 mb-0 max-w-[80ch] text-[13.5px] text-stone">{sources.note}</p>
        </div>
      </section>
    </>
  );
}

/** Mono anahtar ve metin satırları (prototip `.mech`). */
function KeyRows({ rows, refs }: { rows: { key: string; text: string }[]; refs: (text: string) => ReactNode }) {
  return (
    <div className="grid border-t-2 border-ink">
      {rows.map((row) => (
        <div key={row.key} className="grid grid-cols-1 gap-1 border-b border-rule py-3.5 min-[561px]:grid-cols-[170px_1fr] min-[561px]:gap-4">
          <span className={`${monoText} pt-[3px]`}>{row.key}</span>
          <span className="min-w-0 text-[15.5px]">{refs(row.text)}</span>
        </div>
      ))}
    </div>
  );
}
