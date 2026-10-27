import CutButton from "@/components/brand/CutButton";
import CutWord from "@/components/brand/CutWord";
import Portrait from "@/components/brand/Portrait";
import Reveal from "@/components/ui/Reveal";
import CountFigure from "@/components/spark/report/CountFigure";
import { bandPad, wrap } from "@/components/spark/report/ReportParts";
import Psd3Changes from "@/components/spark/report/psd3/Psd3Changes";
import Psd3Fida from "@/components/spark/report/psd3/Psd3Fida";
import Psd3Game from "@/components/spark/report/psd3/Psd3Game";
import Psd3Impact from "@/components/spark/report/psd3/Psd3Impact";
import Psd3Journey from "@/components/spark/report/psd3/Psd3Journey";
import Psd3Models from "@/components/spark/report/psd3/Psd3Models";
import Psd3Status from "@/components/spark/report/psd3/Psd3Status";
import Psd3Story from "@/components/spark/report/psd3/Psd3Story";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { monoText } from "@/components/spark/decisions/styles";
import type { Psd3Card, Psd3View, ReportHead, Psd3EpisodeProps } from "@/types/content";

const band = (tone: "paper" | "white") => `scroll-mt-[96px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/**
 * Sektör raporu Nº 03 PSD3, PSR ve FiDA (layout "psd3", referans
 * Spark/sector reports/fspark9-sector-report-psd3-fida-v1.html ve TR
 * eşi). Referansın kendi üst çubuğu, ilerleme çizgisi ve dil linki yok:
 * yerlerini sitenin header'ı ve dil anahtarı alıyor. Etkileşimli
 * bölümler client yapraklar; geri kalanı server. Kaynaklar Ink
 * kapanışın altında.
 */
export default function Psd3Episode({ report, locale, portraitSrc, portraitAlt }: Psd3EpisodeProps) {
  const { hero, short, status, live, changes, fida, story, game, impact, models, uk, note, close, sources } = report;
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
      {h.lede && <p className="mt-1 mb-0 max-w-[62ch] text-stone">{text(h.lede)}</p>}
    </div>
  );

  const card = (c: Psd3Card, tagClass: string) => (
    <article className="grid h-full min-w-0 content-start gap-3 border-t-2 border-ink bg-white px-[22px] pt-[22px] pb-[26px]">
      <span className={tagClass}>{c.tag}</span>{" "}
      <p className="m-0 font-display text-[21px] leading-[1.2] font-bold tracking-[-0.015em]">{c.first}</p>{" "}
      <p className="m-0 text-[15.5px]">{text(c.body)}</p>
    </article>
  );

  const view = (v: Psd3View) => (
    <div className="mt-7 grid grid-cols-1 items-start gap-[22px] border-t-4 border-ink bg-white p-6 min-[901px]:grid-cols-[auto_1fr]">
      <span className={monoText}>{v.label}</span>{" "}
      <p className="m-0 max-w-[52ch] font-display text-[clamp(20px,2.4vw,26px)] leading-[1.22] font-bold tracking-[-0.02em]">{v.text}</p>
    </div>
  );

  const swatch = [
    "bg-ink",
    "bg-stone",
    "bg-[repeating-linear-gradient(45deg,var(--ink)_0_2px,var(--white)_2px_5px)]",
    "bg-rule",
  ];
  const bar = ["bg-ink", "bg-stone", "bg-[repeating-linear-gradient(45deg,var(--ink)_0_2px,var(--white)_2px_6px)]", "bg-rule"];

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
          <h1 className="mt-[22px] mb-[26px] max-w-[11ch] font-display text-[clamp(52px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
            {hero.titleLead} <CutWord>{hero.titleCut}</CutWord>
          </h1>
          <p className="m-0 max-w-[46ch] text-[clamp(18px,2vw,22px)] leading-[1.45]">{hero.sub}</p>
          <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-2 border-t border-inkrule min-[821px]:grid-cols-4">
            {hero.figures.map((f, i) => (
              <div
                key={f.label}
                className={`min-w-0 border-inkrule pt-[22px] pr-[22px] pb-1 ${i % 2 === 0 ? "border-r" : "pl-[22px]"} ${i === 2 ? "border-t pl-0" : ""} ${i === 3 ? "border-t" : ""} min-[821px]:border-t-0 ${i > 0 ? "min-[821px]:pl-[22px]" : ""} ${i < 3 ? "min-[821px]:border-r" : ""}`}
              >
                <div className="font-display text-[clamp(34px,4.6vw,60px)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap tabular-nums">
                  <CountFigure figure={f} locale={locale} />
                </div>{" "}
                <div className="mt-2.5 text-[14.5px] leading-[1.45] text-dust">{text(f.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 01 The short version */}
      <section id="short" aria-labelledby="short-title" className={band("paper")}>
        <div className={wrap}>
          {head(short.head, "short-title")}
          <div className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-3">
            {short.cards.map((c) => (
              <Reveal key={c.tag} className="h-full">
                {card(c, monoText)}
              </Reveal>
            ))}
          </div>
          <Reveal>{view(short.view)}</Reveal>
        </div>
      </section>

      {/* 02 Where things stand */}
      <section id="status" aria-labelledby="status-title" className={band("white")}>
        <div className={wrap}>
          {head(status.head, "status-title")}
          <Psd3Status status={status} template={t} />
        </div>
      </section>

      {/* 03 Already live */}
      <section id="live" aria-labelledby="live-title" className={band("paper")}>
        <div className={wrap}>
          {head(live.head, "live-title")}
          <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[961px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <article className="grid min-w-0 gap-[22px] border-t-2 border-ink bg-white p-[clamp(20px,3vw,30px)]">
              <div className="grid gap-1.5">
                <span className={small}>{live.checkHeading}</span>{" "}
                <p className="m-0 text-[14px] text-stone">{text(live.checkNote)}</p>
              </div>
              <div role="img" aria-label={live.stackLabel} className="flex h-11 w-full border-[1.5px] border-ink">
                {live.stack.map((s, i) => (
                  <span key={s.value} className={`block h-full min-w-0 ${bar[i]}`} style={{ width: `${s.share}%` }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 min-[561px]:grid-cols-4">
                {live.stack.map((s, i) => (
                  <div key={s.value} className="grid min-w-0 gap-1">
                    <span className="font-display text-[clamp(24px,3vw,34px)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">{s.value}</span>{" "}
                    <span className="flex items-start gap-2 text-[13.5px] text-stone">
                      <i aria-hidden="true" className={`mt-[3px] size-3 flex-none border border-ink ${swatch[i]}`} />
                      {text(s.text)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid gap-1.5">
                <span className={small}>{live.surveyHeading}</span>{" "}
                <p className="m-0 text-[14px] text-stone">{text(live.surveyNote)}</p>
              </div>
              <div className="grid grid-cols-1 border-t border-rule min-[561px]:grid-cols-3">
                {live.survey.map((s, i) => (
                  <div
                    key={s.value}
                    className={`grid min-w-0 content-start gap-1.5 pt-4 pr-4 pb-1 ${i > 0 ? "border-t border-rule min-[561px]:border-t-0 min-[561px]:border-l min-[561px]:pl-4" : ""}`}
                  >
                    <span className="font-display text-[34px] leading-none font-extrabold tracking-[-0.03em]">{s.value}</span>{" "}
                    <p className="m-0 text-[14px] text-stone">{text(s.text)}</p>
                  </div>
                ))}
              </div>
              <span className={small}>{live.lessonsHeading}</span>
              <ul className="m-0 grid list-none p-0">
                {live.lessons.map((l) => (
                  <li key={l} className="grid grid-cols-[18px_1fr] gap-3 border-b border-rule py-[11px] text-[15px] before:mt-2 before:size-2 before:bg-ink before:content-['']">
                    <span>{text(l)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-rule bg-white p-4">
                <span className={`${monoText} mb-1.5 block`}>{live.view.label}</span>{" "}
                <p className="m-0">{text(live.view.text)}</p>
              </div>
            </article>
            <div>
              <div className="mb-3.5">
                <span className={small}>{live.listHeading}</span>
              </div>
              <div className="grid">
                {live.list.map((item, i) => (
                  <div
                    key={item.date + item.text}
                    className={`grid grid-cols-1 gap-1.5 border-b border-rule py-4 min-[561px]:grid-cols-[120px_1fr] min-[561px]:gap-4 ${i === 0 ? "border-t-2 border-t-ink" : ""}`}
                  >
                    <span className="grid content-start gap-2 font-mono text-[12px] tracking-[0.06em] uppercase">
                      {item.date}{" "}
                      <span
                        className={`justify-self-start border-[1.5px] border-current px-[7px] py-[3px] text-[10.5px] tracking-[0.08em] whitespace-nowrap ${item.state === "next" ? "border-dashed text-stone" : "text-ink"}`}
                      >
                        {item.chip}
                      </span>
                    </span>{" "}
                    <span className="min-w-0 text-[15.5px]">{text(item.text)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 What changes */}
      <section id="changes" aria-labelledby="changes-title" className={band("paper")}>
        <div className={wrap}>
          {head(changes.head, "changes-title")}
          <Psd3Changes changes={changes} template={t} />
        </div>
      </section>

      {/* 05 FiDA */}
      <section id="fida" aria-labelledby="fida-title" className={band("white")}>
        <div className={wrap}>
          {head(fida.head, "fida-title")}
          <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Psd3Fida fida={fida} template={t} />
            <div className="grid">
              {fida.mechanics.map((m, i) => (
                <div
                  key={m.key}
                  className={`grid grid-cols-1 gap-1 border-b border-rule py-3.5 min-[561px]:grid-cols-[150px_1fr] min-[561px]:gap-4 ${i === 0 ? "border-t-2 border-t-ink" : ""}`}
                >
                  <span className="pt-[3px] font-mono text-[12px] tracking-[0.08em] uppercase">{m.key}</span>{" "}
                  <span className="min-w-0 text-[15.5px]">{text(m.text)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 User story */}
      <section id="story" aria-labelledby="story-title" className={band("white")}>
        <div className={wrap}>
          {head(story.head, "story-title")}
          <Psd3Story story={story} template={t} />
        </div>
      </section>

      {/* 07 Who pays? */}
      <section id="whopays" aria-labelledby="whopays-title" className={band("paper")}>
        <div className={wrap}>
          {head(game.head, "whopays-title")}
          <Psd3Game game={game} template={t} />
        </div>
      </section>

      {/* 08 Impact finder */}
      <section id="impact" aria-labelledby="impact-title" className={band("white")}>
        <div className={wrap}>
          {head(impact.head, "impact-title")}
          <Psd3Impact impact={impact} locale={locale} />
        </div>
      </section>

      {/* 09 Business models */}
      <section id="models" aria-labelledby="models-title" className={band("white")}>
        <div className={wrap}>
          {head(models.head, "models-title")}
          <Psd3Models models={models} />
        </div>
      </section>

      {/* 10 UK lens */}
      <section id="uk" aria-labelledby="uk-title" className={band("paper")}>
        <div className={wrap}>
          {head(uk.head, "uk-title")}
          <div role="region" aria-label={uk.head.label} tabIndex={0} className="mb-[clamp(28px,4vw,44px)] max-w-full overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse bg-white">
              <thead>
                <tr>
                  <th className="border-t-2 border-b-[1.5px] border-ink" />
                  {uk.table.columns.map((c) => (
                    <th key={c} scope="col" className="border-t-2 border-b-[1.5px] border-ink px-3.5 py-[13px] text-left align-top font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uk.table.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="w-[22%] border-b border-rule px-3.5 py-[13px] text-left align-top font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase">
                      {r.label}
                    </th>
                    <td className="border-b border-rule px-3.5 py-[13px] text-left align-top text-[15px]">{text(r.eu)}</td>
                    <td className="border-b border-rule bg-paper px-3.5 py-[13px] text-left align-top text-[15px]">{text(r.uk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-3">
            <span className={small}>{uk.figuresHeading}</span>
          </div>
          <div className="mb-3 grid grid-cols-2 border-t-2 border-ink min-[821px]:grid-cols-4">
            {uk.figures.map((f, i) => (
              <div
                key={f.value}
                className={`grid min-w-0 content-start gap-2 border-b border-rule pt-[18px] pr-4 pb-4 ${i > 0 ? "border-l pl-4" : ""} ${i === 2 ? "max-[820px]:border-l-0 max-[820px]:pl-0" : ""}`}
              >
                <span className={`font-display text-[clamp(30px,3.6vw,46px)] leading-none font-extrabold tracking-[-0.03em] tabular-nums ${f.warn ? "text-negative" : ""}`}>
                  {text(f.value)}
                </span>{" "}
                <p className="m-0 text-[14px] text-stone">{text(f.text)}</p>
              </div>
            ))}
          </div>
          <p className="m-0 text-[14px] text-stone">{text(uk.figuresNote)}</p>
          <div className="mt-[clamp(28px,4vw,44px)] grid grid-cols-1 gap-5 min-[861px]:grid-cols-2">
            {uk.cards.map((c) => (
              <div key={c.tag}>{card(c, "font-mono text-[10.5px] tracking-[0.08em] text-stone uppercase")}</div>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,56px)]">
            <div className="grid gap-1.5">
              <span className={small}>{uk.journey.heading}</span>{" "}
              <p className="m-0 text-[14px] text-stone">{text(uk.journey.note)}</p>
            </div>
            <Psd3Journey journey={uk.journey} />
          </div>
          {view(uk.view)}
        </div>
      </section>

      {/* 11 Expert note */}
      <section id="note" aria-label={note.head.label} className={band("white")}>
        <div className={wrap}>
          {head(note.head, "note-title")}
          <div className="grid max-w-[900px] grid-cols-1 items-start gap-7 min-[641px]:grid-cols-[120px_minmax(0,1fr)]">
            <Portrait alt={portraitAlt} src={portraitSrc} sizes="120px" className="relative size-[84px] min-[641px]:size-[120px]" />
            <div>
              <blockquote className="m-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.3] font-bold tracking-[-0.015em]">{note.quote}</blockquote>
              <div className="mt-4 grid max-w-[62ch] gap-3">
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
          <p className="mt-[18px] mb-0 max-w-[52ch] text-dust">{close.text}</p>
          <div className="mt-[30px] flex flex-wrap items-center gap-[22px]">
            <CutButton label={close.bookLabel} />{" "}
            <a href="#whopays" className="text-[15.5px] text-paper">
              {close.gameLabel}
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
              <li key={s.href} id={`source-${i + 1}`} className="grid scroll-mt-[96px] grid-cols-[34px_1fr] gap-2 border-b border-rule py-2.5 text-[14px] [break-inside:avoid]">
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
    </div>
  );
}
