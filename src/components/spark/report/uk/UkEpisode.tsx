import ReportGate from "@/components/spark/gate/ReportGate";
import CutWord from "@/components/brand/CutWord";
import TextLink from "@/components/brand/TextLink";
import SparkTicker from "@/components/spark/hub/SparkTicker";
import { bandPad, wrap } from "@/components/spark/report/ReportParts";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import UkBalance from "@/components/spark/report/uk/UkBalance";
import UkBlocks from "@/components/spark/report/uk/UkBlocks";
import UkBoard from "@/components/spark/report/uk/UkBoard";
import UkCalendar from "@/components/spark/report/uk/UkCalendar";
import UkHead from "@/components/spark/report/uk/UkHead";
import UkMap from "@/components/spark/report/uk/UkMap";
import UkMoneyBars from "@/components/spark/report/uk/UkMoneyBars";
import UkPlayers from "@/components/spark/report/uk/UkPlayers";
import { UkSelectionProvider } from "@/components/spark/report/uk/UkSelection";
import UkStory from "@/components/spark/report/uk/UkStory";
import { monoText } from "@/components/spark/decisions/styles";
import { ArrowDownIcon } from "@/components/icons";
import type { UkEpisodeProps, UkTone } from "@/types/content";

const band = (tone: UkTone) => `scroll-mt-[150px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
/** 06 ile 11 arası bölümlerin zemini, sırayla. */
const SECTION_TONES: UkTone[] = ["white", "paper", "white", "paper", "white", "paper"];

/**
 * Sektör raporu Nº 06 İngiltere KOBİ bankacılığı (layout "uksme"). Açılış
 * (üç rakam, kayan şerit) ve 01 Kısa versiyon herkese açık; 02 Oyuncular
 * ve sonrası bülten kapısının arkasında (Studio'da "Devamı bültenle
 * açılsın" açıksa), Nº 05 ile aynı kapı. Etkileşimli bölümler client
 * yapraklar, geri kalanı server. Sayfada sonsuz dönen tek şey kayan şerit.
 */
export default function UkEpisode({ report, locale, gate }: UkEpisodeProps) {
  const { hero, short, players, map, balance, board, sections, money, story, mirror, calendar, gaps, note, sources, readingLabel } = report;
  const t = sources.sourceTemplate;
  const text = (s: string) => <Psd3Text text={s} template={t} />;

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
          </h1>
          <p className="m-0 max-w-[30ch] font-display text-[clamp(22px,2.6vw,30px)] leading-[1.25] font-medium tracking-[-0.01em]">{hero.sub}</p>
          <p className="mt-5 mb-0 max-w-[56ch] text-dust">{text(hero.lead)}</p>
          <div className="mt-[clamp(36px,5vw,56px)] grid max-w-[760px] grid-cols-1 gap-6 min-[601px]:grid-cols-3">
            {hero.stats.map((s) => (
              <div key={s.value} className="grid content-start gap-2 border-t-2 border-paper pt-3">
                <b className="font-display text-[clamp(40px,4.4vw,52px)] leading-none font-extrabold tracking-[-0.03em] text-flare">{s.value}</b>
                <span className="text-[14px] leading-[1.45] text-dust">{text(s.label)}</span>
              </div>
            ))}
          </div>
          <a
            href="#short"
            className="mt-[clamp(32px,4vw,44px)] inline-flex min-h-11 items-center gap-2.5 bg-flare px-[22px] py-3 text-[16px] font-bold text-ink no-underline"
          >
            {hero.cta}
            <ArrowDownIcon className="size-4" />
          </a>
        </div>
      </header>
      <SparkTicker items={report.ticker} />

      {/* 01 Kısa versiyon */}
      <section id="short" aria-labelledby="short-title" className={band("paper")}>
        <div className={wrap}>
          <UkHead head={short.head} id="short-title" template={t} />
          <ol className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 min-[821px]:grid-cols-2">
            {short.items.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 border-t border-rule py-4">
                <span className="pt-1 font-mono text-[12px] text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-1.5">
                  <h3 className="m-0 font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.015em]">{item.title}</h3>
                  <p className="m-0 text-[15.5px]">{text(item.text)}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="on-ink mt-[clamp(32px,5vw,56px)] grid gap-2 bg-ink px-[clamp(20px,3vw,32px)] py-[clamp(22px,3vw,32px)] text-paper">
            <span className={`${small} text-dust`}>{short.questionLabel}</span>
            <p className="m-0 max-w-[30ch] font-display text-[clamp(26px,3.6vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">{short.question}</p>
          </div>
          <div className="mt-5">
            <TextLink href="/uk-sme" label={short.pdfLabel} />
          </div>
        </div>
      </section>

      <ReportGate gate={gate} locale={locale}>
        <UkSelectionProvider>
          {/* 02 Oyuncular */}
          <section id="players" aria-labelledby="players-title" className={band("white")}>
            <div className={wrap}>
              <UkHead head={players.head} id="players-title" template={t} />
              <UkPlayers players={players} template={t} tone="white" />
            </div>
          </section>

          {/* 03 Harita */}
          <section id="map" aria-labelledby="map-title" className={band("paper")}>
            <div className={wrap}>
              <UkHead head={map.head} id="map-title" template={t} />
              <UkMap map={map} balance={balance} locale={locale} template={t} />
            </div>
          </section>

          {/* 04 Bilanço */}
          <section id="balance" aria-labelledby="balance-title" className={band("white")}>
            <div className={wrap}>
              <UkHead head={balance.head} id="balance-title" template={t} />
              <UkBalance balance={balance} players={map.players} legend={map.legend} locale={locale} template={t} tone="white" />
            </div>
          </section>
        </UkSelectionProvider>

        {/* 05 Puan tablosu */}
        <section id="scoreboard" aria-labelledby="scoreboard-title" className={band("paper")}>
          <div className={wrap}>
            <UkHead head={board.head} id="scoreboard-title" template={t} />
            <UkBoard board={board} locale={locale} />
            <p className="mt-7 mb-0 max-w-[760px] border-l-[3px] border-ink pl-4 text-[16px] text-stone">{text(board.note)}</p>
          </div>
        </section>

        {/* 06 ile 11: ortak bloklar */}
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={band(SECTION_TONES[i] ?? "paper")}>
            <div className={wrap}>
              <UkHead head={s.head} id={`${s.id}-title`} template={t} />
              <UkBlocks blocks={s.blocks} readingLabel={readingLabel} template={t} tone={SECTION_TONES[i] ?? "paper"} />
            </div>
          </section>
        ))}

        {/* 12 Para */}
        <section id="money" aria-labelledby="money-title" className={band("white")}>
          <div className={wrap}>
            <UkHead head={money.head} id="money-title" template={t} />
            <div className="grid grid-cols-1 items-end gap-9 min-[901px]:grid-cols-2">
              <UkMoneyBars bars={money.bars} title={money.barsTitle} locale={locale} />
              <div className="grid gap-3">
                <b className="font-display text-[clamp(70px,9vw,120px)] leading-[0.9] font-extrabold tracking-[-0.04em]">{money.stat}</b>
                <span className="max-w-[380px] text-stone">{text(money.statLabel)}</span>
              </div>
            </div>
            <h3 className="mt-14 mb-[18px] font-display text-[26px] leading-[1.15] font-extrabold tracking-[-0.02em]">{money.modelsTitle}</h3>
            <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-3">
              {money.models.map((m) => (
                <article key={m.name} className="grid content-start gap-2 border-t-2 border-ink bg-paper p-[22px]">
                  <h4 className="m-0 font-display text-[21px] leading-[1.2] font-extrabold tracking-[-0.015em]">{m.name}</h4>
                  <span className={`${small} text-stone`}>{m.who}</span>
                  <p className="m-0 text-[16px] text-stone">{text(m.text)}</p>
                </article>
              ))}
            </div>
            <p className="mt-7 mb-0 max-w-[760px] border-l-[3px] border-ink pl-4 text-[16px] text-stone">{text(money.note)}</p>
          </div>
        </section>

        {/* 13 Hikaye */}
        <section id="story" aria-labelledby="story-title" className={`on-ink scroll-mt-[150px] bg-ink text-paper ${bandPad}`}>
          <div className={wrap}>
            <UkHead head={story.head} id="story-title" template={t} ground="ink" />
            <UkStory story={story} gapsHref="#gaps" gapsLabel={`${gaps.head.index} ${gaps.head.title}`} template={t} />
          </div>
        </section>

        {/* 14 Ayna */}
        <section id="mirror" aria-labelledby="mirror-title" className={band("paper")}>
          <div className={wrap}>
            <UkHead head={mirror.head} id="mirror-title" template={t} />
            <div className="grid">
              {mirror.items.map((m) => (
                <article key={m.quote} className="grid grid-cols-1 gap-2.5 border-t border-rule py-[22px] min-[901px]:grid-cols-[1.3fr_1fr_1fr] min-[901px]:gap-[22px]">
                  <div className="grid content-start gap-2">
                    <h3 className="m-0 font-display text-[22px] leading-[1.2] font-extrabold tracking-[-0.015em]">“{m.quote}”</h3>
                    <p className="m-0 text-[16px] text-stone">{text(m.evidence)}</p>
                  </div>
                  <div className="grid content-start gap-1.5">
                    <span className={`${small} text-stone`}>{mirror.columns[1]}</span>
                    <p className="m-0 text-[16px]">{text(m.gap)}</p>
                  </div>
                  <div className="grid content-start gap-1.5">
                    <span className={`${small} text-stone`}>{mirror.columns[2]}</span>
                    <p className="m-0 text-[16px]">{text(m.fix)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 15 Takvim */}
        <section id="calendar" aria-labelledby="calendar-title" className={band("white")}>
          <div className={wrap}>
            <UkHead head={calendar.head} id="calendar-title" template={t} />
            <UkCalendar calendar={calendar} locale={locale} template={t} />
          </div>
        </section>

        {/* 16 Fırsatlar */}
        <section id="gaps" aria-labelledby="gaps-title" className={band("paper")}>
          <div className={wrap}>
            <UkHead head={gaps.head} id="gaps-title" template={t} />
            <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-2">
              {gaps.items.map((g, i) => (
                <article key={g.title} className="grid min-w-0 content-start gap-3 border-t-4 border-ink bg-white p-[clamp(20px,3vw,26px)]">
                  <span className="font-display text-[40px] leading-none font-extrabold text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="m-0 font-display text-[22px] leading-[1.15] font-extrabold tracking-[-0.02em]">{g.title}</h3>
                  <div className="grid gap-1">
                    <span className={`${small} text-stone`}>{gaps.evidenceLabel}</span>
                    <p className="m-0 text-[16px]">{text(g.evidence)}</p>
                  </div>
                  <SmeReading label={gaps.readingLabel} text={g.reading} template={t} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* fspark9 notu */}
        <section id="note" aria-labelledby="note-title" className={`on-ink bg-ink text-paper ${bandPad}`}>
          <div className={wrap}>
            <UkHead head={note.head} id="note-title" template={t} ground="ink" />
            <p className="mt-0 mb-5 max-w-[56ch] text-dust">{note.intro}</p>
            <ol className="m-0 grid max-w-[880px] list-none gap-0 p-0">
              {note.questions.map((q, i) => (
                <li key={q} className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-3 border-t border-inkrule py-5">
                  <span className="font-mono text-[13px] text-dust">{String(i + 1).padStart(2, "0")}</span>
                  <p className="m-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.25] font-bold tracking-[-0.015em]">{q}</p>
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
            <p className="mt-8 mb-0 text-[14px] text-dust">{note.disclaimer}</p>
          </div>
        </section>

        {/* Kaynaklar */}
        <section id="sources" aria-labelledby="sources-title" className={band("paper")}>
          <div className={wrap}>
            <UkHead head={sources.head} id="sources-title" template={t} />
            <div className="grid gap-8 [column-gap:40px] min-[901px]:grid-cols-2">
              {sources.groups.map((g) => (
                <div key={g.title} className="min-w-0">
                  <h3 className={`${small} mb-1 text-stone`}>{g.title}</h3>
                  <ol className="m-0 list-none p-0">
                    {g.items.map((s) => (
                      <li key={s.n} id={`source-${s.n}`} className="grid scroll-mt-[150px] grid-cols-[42px_1fr] gap-2 border-b border-rule py-2.5 text-[14px] target:bg-[color-mix(in_srgb,var(--flare)_30%,var(--paper))]">
                        <span className="font-mono text-[12px] text-stone">[{s.n}]</span>{" "}
                        <span className="min-w-0">
                          {s.label}.{" "}
                          <a href={s.href} target="_blank" rel="noopener" className="break-words">
                            {new URL(s.href).hostname.replace(/^www\./, "")}
                          </a>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ReportGate>
    </div>
  );
}
