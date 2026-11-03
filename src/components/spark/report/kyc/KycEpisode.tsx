import ReportGate from "@/components/spark/gate/ReportGate";
import type { ReactNode } from "react";
import CutButton from "@/components/brand/CutButton";
import CutWord from "@/components/brand/CutWord";
import Portrait from "@/components/brand/Portrait";
import { bandPad, wrap } from "@/components/spark/report/ReportParts";
import KycCalculator from "@/components/spark/report/kyc/KycCalculator";
import KycMap from "@/components/spark/report/kyc/KycMap";
import KycMethods from "@/components/spark/report/kyc/KycMethods";
import KycPaths from "@/components/spark/report/kyc/KycPaths";
import KycSteps from "@/components/spark/report/kyc/KycSteps";
import KycStory from "@/components/spark/report/kyc/KycStory";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { monoText } from "@/components/spark/decisions/styles";
import type { KycEpisodeProps, KycTable, KycTone, Psd3Card, Psd3View, ReportHead } from "@/types/content";

type Tone = "paper" | "white";

const band = (tone: Tone) => `scroll-mt-[150px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;
/** Bandın üstündeki kutular zıt zeminde (referans `.white .card` ve `.paper .usecase`). */
const ground = (tone: Tone) => (tone === "white" ? "bg-paper" : "bg-white");
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
const chipBase = "inline-block border-[1.5px] border-current px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase";
const CHIP: Record<KycTone | "ink" | "dash", string> = {
  green: "text-positive",
  red: "text-negative",
  amber: "text-stone",
  ink: "text-ink",
  dash: "border-dashed text-stone",
};
const rowList = "grid border-b border-rule first:border-t-2 first:border-t-ink";

/**
 * Sektör raporu Nº 04 KYC ve KYB (layout "kyc", referans Spark/sector
 * reports/fspark9-sector-report-kyc-kyb-v1.html ve TR eşi). Referansın
 * kendi üst çubuğu, ilerleme çizgisi ve dil linki yok: yerlerini sitenin
 * header'ı ve dil anahtarı alıyor. On üç bölüm, Ink kapanış, en altta
 * kaynaklar. Etkileşimli bölümler client yapraklar; geri kalanı server.
 */
export default function KycEpisode({ report, locale, gate, portraitSrc, portraitAlt }: KycEpisodeProps) {
  const { hero, short, market, rules, map, position, kyb, marketing, money, voices, story, uk, next, note, close, sources } = report;
  const t = sources.sourceTemplate;
  const text = (s: string) => <Psd3Text text={s} template={t} />;

  const head = (h: ReportHead, id: string) => (
    <div className="mb-[clamp(28px,4vw,48px)] grid gap-2.5 border-t-2 border-ink pt-[18px]">
      <div className={`${monoText} flex flex-wrap gap-3.5`}>
        {h.index && <span>{h.index}</span>} <span>{h.label}</span>
      </div>
      {h.title && (
        <h2 id={id} className="m-0 font-display text-[clamp(26px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.025em] text-balance">
          {h.title}
        </h2>
      )}
      {h.lede && <p className="mt-1 mb-0 max-w-[64ch] text-stone">{text(h.lede)}</p>}
    </div>
  );

  const card = (c: { tag: string; first?: string; body: string }, tone: Tone) => (
    <article key={c.tag} className={`grid min-w-0 content-start gap-3 border-t-2 border-ink px-[22px] pt-[22px] pb-[26px] ${ground(tone)}`}>
      <span className={monoText}>{c.tag}</span>{" "}
      {c.first && (
        <>
          <p className="m-0 font-display text-[20px] leading-[1.22] font-bold tracking-[-0.015em]">{c.first}</p>{" "}
        </>
      )}
      <p className="m-0 text-[15.5px]">{text(c.body)}</p>
    </article>
  );

  const view = (v: Psd3View, tone: Tone) => (
    <div className={`mt-7 grid grid-cols-1 items-start gap-[22px] border-t-4 border-ink p-6 min-[901px]:grid-cols-[auto_1fr] ${ground(tone)}`}>
      <span className={monoText}>{v.label}</span>{" "}
      <p className="m-0 max-w-[56ch] font-display text-[clamp(19px,2.3vw,25px)] leading-[1.25] font-bold tracking-[-0.02em]">{text(v.text)}</p>
    </div>
  );

  const blockLabel = (label: string, className = "") => (
    <div className={`grid min-w-0 gap-1.5 ${className}`}>
      <span className={small}>{label}</span>
    </div>
  );

  const th = "border-t-2 border-b-[1.5px] border-ink px-3.5 py-[13px] text-left align-top font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
  const rowTh = "w-[24%] border-b border-rule px-3.5 py-[13px] text-left align-top font-display text-[15.5px] font-bold";
  const td = "border-b border-rule px-3.5 py-[13px] text-left align-top text-[15px]";
  const tableBox = (label: string, children: ReactNode) => (
    <div role="region" aria-label={label} tabIndex={0} className="mb-3 max-w-full overflow-x-auto">
      {children}
    </div>
  );
  const table = (data: KycTable, tone: Tone, label: string, numeric = false) =>
    tableBox(
      label,
      <table className={`w-full min-w-[640px] border-collapse ${ground(tone)}`}>
        <thead>
          <tr>
            {data.columns.map((c) => (
              <th key={c} scope="col" className={th}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className={rowTh}>
                {text(r.label)}
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className={`${td} ${numeric ? "whitespace-nowrap tabular-nums" : ""}`}>
                  {text(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>,
    );

  const chip = (label: string, tone: KycTone | "ink" | "dash") => <span className={`${chipBase} ${CHIP[tone]}`}>{label}</span>;

  // KYB çubukları: bugün ve çözümlerle toplam gün (referans `total`, `fastT`).
  const total = kyb.steps.reduce((a, s) => a + s.days, 0);
  const fast = kyb.steps.reduce((a, s) => a + s.days * s.factor, 0);
  const fastLabel = String(Math.round(fast * 10) / 10).replace(".", kyb.decimal);

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
          <h1 className="mt-[22px] mb-[26px] max-w-[11ch] font-display text-[clamp(50px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
            {hero.titleLead} <CutWord>{hero.titleCut}</CutWord>
          </h1>
          <p className="m-0 max-w-[48ch] text-[clamp(18px,2vw,22px)] leading-[1.45]">{hero.sub}</p>
          <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-2 border-t border-inkrule min-[821px]:grid-cols-4">
            {hero.figures.map((f, i) => (
              <div
                key={f.label}
                className={`min-w-0 border-inkrule pt-[22px] pr-[22px] pb-1 ${i % 2 === 0 ? "border-r" : "pl-[22px]"} ${i === 2 ? "border-t pl-0" : ""} ${i === 3 ? "border-t" : ""} min-[821px]:border-t-0 ${i > 0 ? "min-[821px]:pl-[22px]" : ""} ${i < 3 ? "min-[821px]:border-r" : ""}`}
              >
                <div className="font-display text-[clamp(32px,4.4vw,58px)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">{text(f.value)}</div>{" "}
                <div className="mt-2.5 text-[14.5px] leading-[1.45] text-dust">{text(f.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 01 Short version */}
      <section id="short" aria-labelledby="short-title" className={band("paper")}>
        <div className={wrap}>
          {head(short.head, "short-title")}
          <div className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-3">{short.cards.map((c: Psd3Card) => card(c, "paper"))}</div>
          {view(short.view, "paper")}
        </div>
      </section>

      <ReportGate gate={gate} locale={locale}>
      {/* 02 Market */}
      <section id="market" aria-labelledby="market-title" className={band("white")}>
        <div className={wrap}>
          {head(market.head, "market-title")}
          <div className="grid">
            {market.layers.map((l) => (
              <div
                key={l.key}
                className={`${rowList} grid-cols-[36px_1fr] items-baseline gap-x-3.5 gap-y-1.5 py-[18px] min-[821px]:grid-cols-[44px_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)] min-[821px]:gap-[18px]`}
              >
                <span className="font-mono text-[12px] text-stone">{l.key}</span>{" "}
                <h3 className="m-0 font-display text-[18px] leading-[1.18] font-extrabold tracking-[-0.015em]">{l.title}</h3>{" "}
                <span className="col-start-2 text-[15px] min-[821px]:col-start-auto">{l.text}</span>{" "}
                <span className="col-start-2 font-display text-[16px] font-bold min-[821px]:col-start-auto">{l.question}</span>
              </div>
            ))}
          </div>
          {blockLabel(market.sizeHeading, "mt-[clamp(36px,5vw,56px)] mb-3.5")}
          {table(market.sizeTable, "white", market.sizeHeading, true)}
          <p className="m-0 max-w-[80ch] text-[14px] text-stone">{text(market.sizeNote)}</p>
          <div className="mt-7 grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">{market.cards.map((c) => card(c, "white"))}</div>
        </div>
      </section>

      {/* 03 Rules */}
      <section id="rules" aria-labelledby="rules-title" className={band("paper")}>
        <div className={wrap}>
          {head(rules.head, "rules-title")}
          <KycMethods rules={rules} template={t} />
          {blockLabel(rules.timelineHeading, "mt-[clamp(40px,6vw,64px)]")}
          <div className="mt-2 ml-1.5 grid border-l-2 border-ink">
            {rules.timeline.map((item) => (
              <div
                key={item.date}
                className={`relative grid grid-cols-1 items-baseline gap-1.5 border-b border-rule py-[15px] pl-[26px] before:absolute before:top-[21px] before:-left-[7px] before:size-3 before:content-[''] min-[701px]:grid-cols-[150px_1fr_auto] min-[701px]:gap-5 ${item.state === "done" ? "before:bg-ink" : item.state === "now" ? "before:border-2 before:border-ink before:bg-flare" : "before:border-2 before:border-ink before:bg-white"}`}
              >
                <span className="font-mono text-[12.5px] tracking-[0.06em] uppercase">{item.date}</span>{" "}
                <span className="min-w-0 text-[16px]">{text(item.text)}</span>{" "}
                <span className={`${chipBase} justify-self-start ${item.state === "future" ? CHIP.dash : CHIP.ink}`}>{item.chip}</span>
              </div>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-1 gap-5 min-[901px]:grid-cols-3">{rules.cards.map((c) => card(c, "paper"))}</div>
          {view(rules.view, "paper")}
        </div>
      </section>

      {/* 04 Competition map */}
      <section id="map" aria-labelledby="map-title" className={band("white")}>
        <div className={wrap}>
          {head(map.head, "map-title")}
          <KycMap map={map} />
          {blockLabel(map.tableHeading, "mt-[clamp(36px,5vw,56px)] mb-3.5")}
          {table(map.table, "white", map.tableHeading)}
        </div>
      </section>

      {/* 05 Positioning */}
      <section id="position" aria-labelledby="position-title" className={band("paper")}>
        <div className={wrap}>
          {head(position.head, "position-title")}
          {tableBox(
            position.head.label,
            <table className="w-full min-w-[640px] border-collapse bg-white">
              <thead>
                <tr>
                  {position.table.columns.map((c) => (
                    <th key={c} scope="col" className={th}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {position.table.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={rowTh}>
                      {r.label}
                    </th>
                    {r.cells.map((c, i) => (
                      <td key={i} className={td}>
                        {c}
                      </td>
                    ))}
                    <td className={td}>{chip(r.chip.text, r.chip.tone)}</td>
                  </tr>
                ))}
              </tbody>
            </table>,
          )}
          <ul className="mt-[clamp(32px,5vw,52px)] mb-0 grid list-none p-0">
            {position.ways.map((w) => (
              <li key={w.key} className={`${rowList} grid-cols-[56px_minmax(0,1fr)] gap-4 py-[18px]`}>
                <span className="pt-1 font-mono text-[12px] text-stone">{w.key}</span>{" "}
                <div>
                  <h3 className="m-0 mb-1.5 font-display text-[18px] leading-[1.18] font-extrabold tracking-[-0.015em]">
                    {w.title}
                    {w.tag && (
                      <>
                        {" "}
                        <span className="ml-2 bg-flare px-1.5 py-0.5 align-middle font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase">{w.tag}</span>
                      </>
                    )}
                  </h3>{" "}
                  <p className="m-0 max-w-[72ch] text-[15.5px]">{text(w.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 KYB */}
      <section id="kyb" aria-labelledby="kyb-title" className={band("white")}>
        <div className={wrap}>
          {head(kyb.head, "kyb-title")}
          <KycSteps kyb={kyb} template={t} />
          <div className="mt-[22px] grid gap-2.5">
            {(
              [
                [kyb.barToday, 100, total, "bg-ink"],
                [kyb.barFast, (fast / total) * 100, fastLabel, "border-[1.5px] border-ink bg-flare"],
              ] as const
            ).map(([label, width, value, fill]) => (
              <div key={label} className="grid grid-cols-[120px_1fr_80px] items-center gap-3 text-[14px]">
                <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase">{label}</span>{" "}
                <span className="relative h-3.5 bg-rule">
                  <span className={`absolute inset-y-0 left-0 ${fill}`} style={{ width: `${width}%` }} />
                </span>{" "}
                <span className="text-right font-mono text-[12px]">
                  ~{value} {kyb.daysLabel}
                </span>
              </div>
            ))}
            <p className="m-0 max-w-[80ch] text-[14px] text-stone">{text(kyb.note)}</p>
          </div>
          {blockLabel(kyb.ideasHeading, "mt-[clamp(40px,6vw,64px)]")}
          <div className="mt-[22px] grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-4">
            {kyb.ideas.map((idea) => (
              <article key={idea.title} className="grid min-w-0 content-start gap-2.5 border-t-2 border-ink bg-paper p-[18px]">
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-stone uppercase">{idea.stage}</span>{" "}
                <h3 className="m-0 font-display text-[20px] leading-[1.18] font-extrabold tracking-[-0.015em]">{idea.title}</h3>{" "}
                <p className="m-0 text-[15px]">{text(idea.text)}</p>
              </article>
            ))}
          </div>
          {view(kyb.view, "white")}
        </div>
      </section>

      {/* 07 Marketing */}
      <section id="marketing" aria-labelledby="marketing-title" className={band("paper")}>
        <div className={wrap}>
          {head(marketing.head, "marketing-title")}
          <ul className="m-0 grid list-none p-0">
            {marketing.items.map((w) => (
              <li key={w.key} className={`${rowList} grid-cols-[56px_minmax(0,1fr)] gap-4 py-[18px]`}>
                <span className="pt-1 font-mono text-[12px] text-stone">{w.key}</span>{" "}
                <div>
                  <h3 className="m-0 mb-1.5 font-display text-[18px] leading-[1.18] font-extrabold tracking-[-0.015em]">{w.title}</h3>{" "}
                  <p className="m-0 max-w-[72ch] text-[15.5px]">{text(w.text)}</p>
                </div>
              </li>
            ))}
          </ul>
          {view(marketing.view, "paper")}
        </div>
      </section>

      {/* 08 Revenue models */}
      <section id="money" aria-labelledby="money-title" className={band("white")}>
        <div className={wrap}>
          {head(money.head, "money-title")}
          <KycCalculator money={money} locale={locale} template={t} />
          {blockLabel(money.streamsHeading, "mt-[clamp(36px,5vw,56px)] mb-1.5")}
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-6 p-0">
            {money.streams.map((s) => (
              <li key={s.title} className="grid gap-1 border-t border-rule py-3.5">
                <b className="font-display font-bold">{s.title}</b>{" "}
                <span className="text-[15px] text-stone">{text(s.text)}</span>
              </li>
            ))}
          </ul>
          {view(money.view, "white")}
        </div>
      </section>

      {/* 09 Customer voice */}
      <section id="voices" aria-labelledby="voices-title" className={band("paper")}>
        <div className={wrap}>
          {head(voices.head, "voices-title")}
          <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-2">
            {voices.items.map((v) => (
              <article key={v.quote} className="grid min-w-0 content-start gap-3 border-t-2 border-ink bg-white p-5">
                <div className="flex flex-wrap justify-between gap-2.5">
                  <span className={monoText}>{v.who}</span> {chip(v.chip, v.tone)}
                </div>{" "}
                <p className="m-0 font-display text-[18px] leading-[1.3] font-bold tracking-[-0.01em]">{v.quote}</p>{" "}
                <p className="m-0 text-[15px]">{text(v.text)}</p>
              </article>
            ))}
          </div>
          {blockLabel(voices.gapsHeading, "mt-[clamp(36px,5vw,56px)] mb-3.5")}
          {table(voices.gaps, "paper", voices.gapsHeading)}
        </div>
      </section>

      {/* 10 User story */}
      <section id="story" aria-labelledby="story-title" className={band("white")}>
        <div className={wrap}>
          {head(story.head, "story-title")}
          <KycStory story={story} template={t} />
        </div>
      </section>

      {/* 11 UK */}
      <section id="uk" aria-labelledby="uk-title" className={band("paper")}>
        <div className={wrap}>
          {head(uk.head, "uk-title")}
          {tableBox(
            uk.head.label,
            <table className="w-full min-w-[640px] border-collapse bg-white">
              <thead>
                <tr>
                  <th className={th} />
                  {uk.table.columns.map((c) => (
                    <th key={c} scope="col" className={th}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uk.table.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={rowTh}>
                      {r.label}
                    </th>
                    <td className={td}>{text(r.eu)}</td>
                    <td className={`${td} bg-paper`}>{text(r.uk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>,
          )}
          <div className="mt-[clamp(28px,4vw,44px)] mb-3 grid grid-cols-2 border-t-2 border-ink min-[821px]:grid-cols-4">
            {uk.figures.map((f, i) => (
              <div
                key={f.value}
                className={`grid min-w-0 content-start gap-2 border-b border-rule pt-[18px] pr-4 pb-4 ${i > 0 ? "border-l pl-4" : ""} ${i === 2 ? "max-[820px]:border-l-0 max-[820px]:pl-0" : ""}`}
              >
                <span className="font-display text-[clamp(28px,3.4vw,44px)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">{f.value}</span>{" "}
                <p className="m-0 text-[14px] text-stone">{text(f.text)}</p>
              </div>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid min-w-0 gap-1.5">
            <span className={small}>{uk.paths.heading}</span>{" "}
            <p className="m-0 max-w-[70ch] text-[15px] text-stone">{text(uk.paths.note)}</p>
          </div>
          <KycPaths paths={uk.paths} template={t} />
          {view(uk.view, "paper")}
        </div>
      </section>

      {/* 12 What's next */}
      <section id="next" aria-labelledby="next-title" className={band("white")}>
        <div className={wrap}>
          {head(next.head, "next-title")}
          <ul className="m-0 grid list-none p-0">
            {next.items.map((item) => (
              <li
                key={item.key}
                className={`${rowList} grid-cols-[36px_1fr] items-baseline gap-x-[18px] gap-y-2 py-[18px] min-[641px]:grid-cols-[44px_minmax(0,1fr)_auto]`}
              >
                <span className="font-mono text-[12px] text-stone">{item.key}</span>{" "}
                <span className="text-[15.5px]">
                  <b className="mb-1 block font-display text-[17.5px] font-bold">{item.title}</b> {text(item.text)}
                </span>{" "}
                <span className={`${chipBase} col-start-2 justify-self-start min-[641px]:col-start-auto ${item.level === "medium" ? CHIP.dash : CHIP.ink}`}>
                  {item.chip}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7 grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">{next.risks.map((r) => card({ tag: r.tag, body: r.text }, "white"))}</div>
        </div>
      </section>

      {/* 13 Expert note */}
      <section id="note" aria-label={note.head.label} className={band("paper")}>
        <div className={wrap}>
          {head(note.head, "note-title")}
          <div className="grid max-w-[940px] grid-cols-1 items-start gap-7 min-[641px]:grid-cols-[120px_minmax(0,1fr)]">
            <Portrait alt={portraitAlt} src={portraitSrc} sizes="120px" className="relative size-[84px] min-[641px]:size-[120px]" />
            <div>
              <blockquote className="m-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.3] font-bold tracking-[-0.015em]">{note.quote}</blockquote>
              <div className="mt-4 grid max-w-[64ch] gap-3">
                {note.paragraphs.map((p) => (
                  <p key={p} className="m-0">
                    {p}
                  </p>
                ))}
                <p className={`${monoText} m-0 text-ink`}>{note.signature}</p>
              </div>
              <ul aria-label={note.checklistLabel} className="mt-[22px] mb-0 grid list-none p-0">
                {note.checklist.map((item) => (
                  <li key={item} className="grid grid-cols-[18px_1fr] gap-3 border-b border-rule py-3 text-[15.5px] before:mt-[9px] before:size-2 before:bg-ink before:content-['']">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ink kapanış */}
      <section className={`on-ink bg-ink text-paper ${bandPad}`}>
        <div className={wrap}>
          <h2 className="m-0 max-w-[16ch] font-display text-[clamp(34px,5.6vw,72px)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">{close.title}</h2>
          <p className="mt-[18px] mb-0 max-w-[54ch] text-dust">{close.text}</p>
          <div className="mt-[30px] flex flex-wrap items-center gap-[22px]">
            <CutButton label={close.bookLabel} />{" "}
            <a href="#story" className="text-[15.5px] text-paper">
              {close.storyLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Kaynaklar */}
      <section id="sources" aria-labelledby="sources-title" className={band("paper")}>
        <div className={wrap}>
          {head(sources.head, "sources-title")}
          <ol className="m-0 list-none p-0 [column-gap:40px] [columns:2_380px]">
            {sources.items.map((s, i) => (
              <li key={s.href} id={`source-${i + 1}`} className="grid scroll-mt-[150px] grid-cols-[34px_1fr] gap-2 border-b border-rule py-2.5 text-[14px] [break-inside:avoid]">
                <span className="font-mono text-[12px] text-stone">[{i + 1}]</span>{" "}
                <span>
                  {s.label}.{" "}
                  <a href={s.href} target="_blank" rel="noopener" className="break-words">
                    {new URL(s.href).hostname}
                  </a>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-7 mb-0 max-w-[80ch] text-[13.5px] text-stone">{sources.foot}</p>
        </div>
      </section>
      </ReportGate>
    </div>
  );
}
