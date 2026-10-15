import CutButton from "@/components/brand/CutButton";
import CutWord from "@/components/brand/CutWord";
import ReportNav from "@/components/spark/report/ReportNav";
import { MonoLine, SectionHead, bandPad, wrap } from "@/components/spark/report/ReportParts";
import DoraBlocks from "@/components/spark/report/dora/DoraBlocks";
import DoraDesk from "@/components/spark/report/dora/DoraDesk";
import DoraInline from "@/components/spark/report/dora/DoraInline";
import DoraStory from "@/components/spark/report/dora/DoraStory";
import DoraTimeline from "@/components/spark/report/dora/DoraTimeline";
import DominoSim from "@/components/spark/report/dora/DominoSim";
import { monoText } from "@/components/spark/decisions/styles";
import type { DoraEpisodeProps, DoraSection } from "@/types/content";

const section = (tone: "paper" | "white") => `scroll-mt-[150px] ${tone === "white" ? "bg-white" : "bg-paper"} ${bandPad}`;

/**
 * Sektör raporu Nº 02 DORA (layout "dora", görev Spark/sector reports).
 * Bauspar şablonunun parçaları (Ink açılış, yapışkan bölüm şeridi, bölüm
 * başlığı, Ink kapanış, kaynaklar) ve metnin sırası. Hareket sadece iki
 * yerde: Domino ve Elif'in telefonu (client yapraklar). Geri kalan statik;
 * Reveal, sayan rakam ya da parallax yok. Yapışkan şeridin ve telefonun
 * hiçbir atasında transform ya da overflow yok.
 */
export default function DoraEpisode({ report, locale }: DoraEpisodeProps) {
  const { hero, origin, domino, story, desks, close, sources } = report;
  const plain = (s: DoraSection, tone: "paper" | "white") => (
    <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={section(tone)}>
      <div className={wrap}>
        <SectionHead head={s.head} id={`${s.id}-title`} />
        <DoraBlocks blocks={s.blocks} locale={locale} />
      </div>
    </section>
  );

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
          <div className={`${monoText} flex flex-wrap gap-x-[18px] gap-y-1 text-dust`}>
            {hero.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h1 className="mt-[22px] mb-[26px] max-w-[14ch] font-display text-[clamp(44px,8vw,104px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
            {hero.titleLead} <CutWord className="animate-none!">{hero.titleCut}</CutWord>
          </h1>
          <p className="m-0 max-w-[52ch] text-[clamp(18px,2vw,22px)] leading-[1.45]">{hero.sub}</p>
          <div className="mt-[clamp(40px,6vw,72px)] border-t border-inkrule pt-6">
            <MonoLine className="text-dust">{hero.glance.heading}</MonoLine>
            <ul className="mt-4 mb-0 grid list-none grid-cols-1 gap-x-10 p-0 min-[901px]:grid-cols-2">
              {hero.glance.items.map((item) => (
                <li key={item} className="grid grid-cols-[18px_1fr] gap-3 border-b border-inkrule py-3 text-[15.5px] leading-[1.5] before:mt-[8px] before:size-2 before:bg-flare before:content-['']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <ReportNav items={report.nav} />

      <section id={origin.id} aria-labelledby={`${origin.id}-title`} className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={origin.head} id={`${origin.id}-title`} />
          <DoraBlocks blocks={origin.blocks} locale={locale} />
          <DoraTimeline timeline={origin.timeline} />
        </div>
      </section>

      {plain(report.scope, "white")}
      {plain(report.pillars, "paper")}

      <section id={domino.id} aria-labelledby={`${domino.id}-title`} className={section("white")}>
        <div className={wrap}>
          <SectionHead head={domino.head} id={`${domino.id}-title`} />
          <DoraBlocks blocks={domino.blocks} locale={locale} />
        </div>
        <div className="on-ink mt-[clamp(28px,4vw,44px)] bg-ink py-[clamp(28px,4vw,48px)] text-paper">
          <div className={wrap}>
            <DominoSim content={domino.sim} />
          </div>
        </div>
        <div className={`${wrap} mt-5`}>
          <p className="m-0 max-w-[80ch] text-[13.5px] text-stone italic">{domino.note}</p>
          <div className="mt-[clamp(28px,4vw,44px)]">
            <DoraBlocks blocks={domino.after} locale={locale} />
          </div>
        </div>
      </section>

      {plain(report.scorecard, "paper")}
      {plain(report.challenges, "white")}
      {plain(report.solved, "paper")}

      <section id={story.id} aria-labelledby={`${story.id}-title`} className={section("white")}>
        <div className={wrap}>
          <SectionHead head={story.head} id={`${story.id}-title`} />
          <p className="m-0 max-w-[80ch] text-[15px] text-stone italic">{story.intro}</p>
          <p className="mt-5 mb-[clamp(28px,4vw,48px)] max-w-[68ch]">{story.lead}</p>
          <DoraStory story={story} locale={locale} />
          <p className="mt-[clamp(28px,4vw,48px)] mb-0 max-w-[68ch] border-t-4 border-ink bg-paper p-[clamp(20px,3vw,32px)]">
            <DoraInline text={story.summary} locale={locale} />
          </p>
        </div>
      </section>

      {plain(report.market, "paper")}
      {plain(report.outcomes, "white")}
      {plain(report.uk, "paper")}
      {plain(report.turkey, "white")}

      <section id={desks.id} aria-labelledby={`${desks.id}-title`} className={section("paper")}>
        <div className={wrap}>
          <SectionHead head={desks.head} id={`${desks.id}-title`} />
          <DoraBlocks blocks={desks.blocks} locale={locale} />
          <div className="mt-[clamp(24px,3vw,36px)] grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
            {desks.items.map((desk, i) => (
              <article key={desk.title} aria-labelledby={`desk-${i}`} className="grid min-w-0 content-start gap-3 border-t-2 border-ink bg-white px-[22px] pt-[22px] pb-[26px]">
                <h3 id={`desk-${i}`} className="m-0 font-display text-[21px] leading-[1.2] font-extrabold tracking-[-0.015em]">
                  {desk.title}
                </h3>
                <p className="m-0 text-[15.5px]">{desk.scenario}</p>
                <DoraDesk options={desk.options} groupLabel={desk.title}>
                  <p className="m-0 text-[15.5px]">
                    <DoraInline text={desk.take} locale={locale} />
                  </p>
                </DoraDesk>
              </article>
            ))}
          </div>
        </div>
      </section>

      {plain(report.calendar, "white")}
      {plain(report.note, "paper")}

      <section className={`on-ink bg-ink text-paper ${bandPad}`}>
        <div className={wrap}>
          <h2 className="m-0 max-w-[20ch] font-display text-[clamp(30px,4.8vw,60px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance">{close.text}</h2>
          <div className="mt-[30px]">
            <CutButton label={close.bookLabel} />
          </div>
        </div>
      </section>

      <section id="kaynaklar" aria-labelledby="kaynaklar-title" className={section("white")}>
        <div className={wrap}>
          <SectionHead head={sources.head} id="kaynaklar-title" />
          {sources.groups.map((group, g) => {
            const offset = sources.groups.slice(0, g).reduce((sum, prev) => sum + prev.items.length, 0);
            return (
              <div key={group.heading} className={g > 0 ? "mt-8" : ""}>
                <h3 className={`${monoText} mt-0 mb-3 text-stone`}>{group.heading}</h3>
                <ol className="m-0 list-none p-0 [column-gap:40px] [columns:2_380px]">
                  {group.items.map((source, i) => (
                    <li key={source.href} id={`source-${offset + i + 1}`} className="grid grid-cols-[34px_1fr] gap-2 border-b border-rule py-2.5 text-[14px] [break-inside:avoid]">
                      <span className="font-mono text-[12px] text-stone">{`[${offset + i + 1}]`}</span>
                      <span>
                        {source.label}.{" "}
                        <a href={source.href} target="_blank" rel="noopener" className="break-words">
                          {new URL(source.href).hostname}
                        </a>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
          <p className="mt-7 mb-0 max-w-[80ch] text-[13.5px] text-stone italic">{sources.note}</p>
        </div>
      </section>
    </>
  );
}
