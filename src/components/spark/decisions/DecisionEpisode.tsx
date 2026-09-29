import { Link } from "@/i18n/navigation";
import BlockSources from "@/components/spark/decisions/BlockSources";
import ChoiceDecision from "@/components/spark/decisions/ChoiceDecision";
import EpisodeRuler from "@/components/spark/decisions/EpisodeRuler";
import ReaderPoll from "@/components/spark/decisions/ReaderPoll";
import { ClockProvider, ClockStop, EpisodeClock } from "@/components/spark/decisions/ClockTracker";
import { monoText } from "@/components/spark/decisions/styles";
import type { DecisionEpisodeProps, SparkClockStop } from "@/types/content";

const wrap = "mx-auto max-w-[1240px] px-5 min-[861px]:px-8";
const block = "bg-white px-5 pt-6 pb-7 min-[861px]:px-9 min-[861px]:pt-8 min-[861px]:pb-9";
const topRow = `${monoText} mb-[18px] flex flex-wrap justify-between gap-4 text-stone`;
const paragraphs = "[&>p]:m-0 [&>p+p]:mt-[14px]";

const paragraphsOf = (items: string[]) => (
  <div className={paragraphs}>
    {items.map((text) => (
      <p key={text}>{text}</p>
    ))}
  </div>
);

/**
 * Son Gün karar blokları şablonu (Nº 02 Nuri, prototip
 * _design/v2/boards/son-gun-02-nuri-v2.html): Ink açılış ve çerçeve rakam,
 * cetvel, standfirst, sonra 12 sütunda solda yapışkan saat (1-2), içerik
 * 4-11: giriş, beş karar, iki kayıt, okur sorusu, görüş, hizmet.
 *
 * Saatin atalarında transform/overflow yok (CLAUDE.md "Sticky"); bu
 * yüzden bloklar Reveal ile sarılmıyor.
 */
export default function DecisionEpisode({ episode, slug, lang }: DecisionEpisodeProps) {
  const { opening, labels, decisions, records, twist, view, service } = episode;
  const stops: SparkClockStop[] = [...decisions, ...records, twist, view].map(({ date, when }) => ({ date, when }));
  const questionId = `${slug}-question`;

  return (
    <>
      <header className="on-ink bg-ink pt-[72px] pb-16">
        <div className={`${wrap} grid grid-cols-1 items-end gap-7 min-[861px]:grid-cols-[1fr_auto] min-[861px]:gap-12`}>
          <div>
            <p className={`${monoText} m-0 text-dust`}>{opening.label}</p>
            <h1 className="mt-[18px] mb-[22px] font-display text-[clamp(88px,15vw,208px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-paper">
              {episode.subject}
            </h1>
            <p className={`${monoText} m-0 text-dust`}>{opening.meta}</p>
          </div>
          <div className="flex flex-col items-start gap-2 text-left min-[861px]:items-end min-[861px]:text-right">
            <span aria-hidden="true" className="text-outline-paper font-display text-[clamp(120px,16vw,220px)] leading-[0.8] font-extrabold tracking-[-0.04em]">
              {opening.figure}
            </span>
            <span className={`${monoText} text-dust`}>
              <span className="sr-only">{opening.figure} </span>
              {opening.figureLabel}
            </span>
          </div>
        </div>
      </header>

      <EpisodeRuler ticks={episode.ruler.ticks} after={episode.ruler.after} />

      <div className={`${wrap} pt-[72px] pb-6`}>
        <p className="mt-0 mb-[22px] max-w-[820px] font-display text-[clamp(26px,3vw,36px)] leading-[1.18] font-bold tracking-[-0.02em] text-ink">
          {episode.standfirst}
        </p>
        <p className={`${monoText} m-0 max-w-[820px] text-stone`}>{episode.provenance}</p>
      </div>

      <ClockProvider>
        <div className={`${wrap} block pb-24 min-[861px]:grid min-[861px]:grid-cols-12 min-[861px]:gap-6 min-[861px]:pt-10`}>
          <EpisodeClock stops={stops} rangeLabel={episode.clock.rangeLabel} start={episode.clock.start} end={episode.clock.end} />
          <div className="flex flex-col gap-7 text-[17px] leading-[1.55] text-ink min-[861px]:col-start-3 min-[861px]:col-end-13 min-[861px]:gap-10 min-[1101px]:col-start-4 min-[1101px]:col-end-12">
            <p className="m-0 text-[20px] leading-[1.5]">{episode.intro}</p>

            {decisions.map((decision, i) => (
              <ClockStop key={decision.date + decision.label} index={i} labelledBy={`${slug}-d${i + 1}`} className={`${block} border-t-4 border-ink`}>
                <div className={topRow}>
                  <span>{decision.label}</span>
                  <span>{decision.when}</span>
                </div>
                <h2
                  id={`${slug}-d${i + 1}`}
                  className="mt-0 mb-[18px] font-display text-[clamp(28px,3vw,36px)] leading-[1.08] font-extrabold tracking-[-0.025em]"
                >
                  {decision.title}
                </h2>
                {paragraphsOf(decision.paragraphs)}
                <ChoiceDecision options={decision.options} record={decision.record} labels={labels}>
                  {paragraphsOf(decision.reveal)}
                  <BlockSources label={labels.sourcesLabel} sources={decision.sources} />
                </ChoiceDecision>
              </ClockStop>
            ))}

            {records.map((record, i) => (
              <ClockStop key={record.date + record.label} index={decisions.length + i} className={`${block} border-t-2 border-ink`}>
                <div className={topRow}>
                  <span>{record.label}</span>
                  <span>{record.when}</span>
                </div>
                {paragraphsOf(record.paragraphs)}
                <BlockSources label={labels.sourcesLabel} sources={record.sources} />
              </ClockStop>
            ))}

            <ClockStop index={decisions.length + records.length} className={`${block} border-t-2 border-ink`}>
              <div className={topRow}>
                <span>{twist.label}</span>
                <span>{twist.when}</span>
              </div>
              {paragraphsOf(twist.paragraphs)}
              <h2
                id={questionId}
                className="mt-[26px] mb-3 font-display text-[clamp(26px,3vw,34px)] leading-[1.12] font-extrabold tracking-[-0.02em]"
              >
                {twist.poll.question}
              </h2>
              <ReaderPoll poll={twist.poll} episode={slug} lang={lang} questionId={questionId} />
              <div className="mt-[22px] flex flex-wrap gap-3">
                <a
                  href={twist.poll.sourceHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center border-2 border-ink bg-white px-[22px] text-[16px] leading-[normal] font-semibold text-ink no-underline"
                >
                  {twist.poll.sourceLabel}
                </a>
              </div>
            </ClockStop>

            <ClockStop index={decisions.length + records.length + 1} className="border-t border-rule pt-6">
              <p className={`${monoText} mt-0 mb-[14px] text-stone`}>{view.label}</p>
              <div className="mt-4 [&>p]:m-0 [&>p]:font-display [&>p]:text-[22px] [&>p]:leading-[1.4] [&>p]:font-bold [&>p]:tracking-[-0.01em] [&>p+p]:mt-4">
                {view.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </ClockStop>

            <section className="border-t-2 border-ink bg-white px-5 pt-6 pb-7 min-[861px]:px-9 min-[861px]:pt-8 min-[861px]:pb-9">
              <p className={`${monoText} m-0 text-stone`}>{service.label}</p>
              <h2 className="my-[14px] font-display text-[clamp(26px,3vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em]">
                {service.heading}
              </h2>
              <p className="mt-0 mb-[22px]">{service.body}</p>
              <Link
                href={{ pathname: "/services/[slug]", params: { slug: service.service } }}
                className="inline-flex min-h-12 items-center border-2 border-ink bg-white px-[22px] text-[16px] leading-[normal] font-semibold text-ink no-underline"
              >
                {service.ctaLabel}
              </Link>
            </section>
          </div>
        </div>
      </ClockProvider>
    </>
  );
}
