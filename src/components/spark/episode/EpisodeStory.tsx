import { Fragment } from "react";
import Label from "@/components/brand/Label";
import SparkEpisodeRow from "@/components/spark/SparkEpisodeRow";
import DecisionTable from "@/components/spark/episode/DecisionTable";
import FinalQuestion from "@/components/spark/episode/FinalQuestion";
import FootnoteText from "@/components/spark/episode/FootnoteText";
import { StoryBar, StoryProvider, StoryRail, StoryStop } from "@/components/spark/episode/StoryTracker";
import Reveal from "@/components/ui/Reveal";
import { fill } from "@/lib/format";
import type { EpisodeStoryProps, SparkStoryCard } from "@/types/content";

const body = "text-[18px] leading-[1.6] text-ink";

/**
 * Bölüm sayfasının hikâye kısmı (prototip son-gun-01-bo-v3 `.story`): 12
 * sütun, 1000px'ten itibaren solda yapışkan kart (1-3), bölümler 5-11.
 * Altında kart gizli, header'ın altında ince şerit. Son bölümün içinde
 * dersler, son soru, sıradaki bölüm ve kaynaklar.
 *
 * Yapışkan kartın atalarında transform/overflow yok: Reveal sadece metin
 * bloklarını sarıyor (CLAUDE.md "Sticky").
 */
export default function EpisodeStory({ story, labels, nextHref }: EpisodeStoryProps) {
  const interludeAt = story.chapters.findIndex((chapter) => chapter.id === story.interlude.afterChapter);
  // Duraklar sayfadaki sırayla: bölümler, ara bölüm kendi yerinde.
  const stops: SparkStoryCard[] = story.chapters.flatMap((chapter, i) =>
    i === interludeAt ? [chapter.card, story.interlude.card] : [chapter.card],
  );
  const stopIndex = (i: number) => (interludeAt >= 0 && i > interludeAt ? i + 1 : i);
  const last = story.chapters.length - 1;

  return (
    <StoryProvider stops={stops}>
      <div>
        <StoryBar dayTemplate={labels.dayTemplate} />
        <div className="px-5 min-[900px]:px-8 min-[1280px]:px-16">
          <div className="grid grid-cols-1 gap-x-6 pt-10 min-[1000px]:grid-cols-12">
            <StoryRail />
            <div className="min-w-0 min-[1000px]:col-span-7 min-[1000px]:col-start-5">
              {story.chapters.map((chapter, i) => (
                <Fragment key={chapter.id}>
                  <StoryStop
                    index={stopIndex(i)}
                    id={chapter.id}
                    className={`scroll-mt-[140px] min-[1000px]:scroll-mt-[110px] ${i === 0 ? "pt-10" : "pt-[120px]"}`}
                  >
                    <Label as="p">
                      {chapter.label}
                    </Label>
                    <h2 className="mt-3 mb-[30px] font-display text-[clamp(40px,5.4vw,76px)] leading-[0.95] font-extrabold tracking-[-0.04em] text-ink">
                      {chapter.title}
                    </h2>
                    <Reveal>
                      <p className="mt-0 mb-5 max-w-[30ch] font-display text-[clamp(22px,2.4vw,28px)] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
                        <FootnoteText text={chapter.lead} template={labels.footnoteTemplate} />
                      </p>
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph} className={`mt-0 mb-5 max-w-[60ch] ${body}`}>
                          <FootnoteText text={paragraph} template={labels.footnoteTemplate} />
                        </p>
                      ))}
                    </Reveal>
                    {chapter.decision && (
                      <Reveal>
                        <DecisionTable decision={chapter.decision} labels={labels} />
                      </Reveal>
                    )}
                    {i === last && <Ending story={story} labels={labels} nextHref={nextHref} />}
                  </StoryStop>
                  {i === interludeAt && (
                    <StoryStop index={i + 1} as="div" className="pt-[180px]">
                      <p className="m-0 max-w-[16ch] font-display text-[clamp(34px,4.6vw,60px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink">
                        {story.interlude.text}
                      </p>
                    </StoryStop>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StoryProvider>
  );
}

function Ending({ story, labels, nextHref }: EpisodeStoryProps) {
  return (
    <>
      {story.lessons.length > 0 && (
        <Reveal>
          <ol className="m-0 mt-[34px] list-none border-t-2 border-ink p-0">
            {story.lessons.map((lesson, i) => (
              <li key={lesson.heading} className="grid grid-cols-[48px_1fr] gap-4 border-b border-rule py-[22px] min-[761px]:grid-cols-[64px_1fr]">
                <span className="font-display text-[34px] leading-none font-extrabold tracking-[-0.03em] text-ink">{i + 1}</span>
                <span>
                  <b className="mb-[6px] block font-display text-[23px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
                    {lesson.heading}
                  </b>
                  <span className="block text-[18px] leading-[1.6] text-stone">{lesson.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      <Reveal>
        <FinalQuestion content={story.finalQuestion} />
      </Reveal>

      <div className="mt-[90px] border-t border-rule">
        <SparkEpisodeRow
          title={fill(labels.nextTemplate, { name: story.next.name })}
          line={story.next.line}
          meta={story.next.number}
          href={nextHref}
        />
      </div>

      <div className="mt-[70px] mb-[110px] text-[14px] leading-[1.6] text-stone">
        <Label as="p">
          {story.sourcesLabel}
        </Label>
        <ol className="mt-[10px] mb-0 pl-[22px]">
          {story.sources.map((source) => (
            <li key={source.n} id={`source-${source.n}`} className="my-1 scroll-mt-[140px] min-[1000px]:scroll-mt-[110px]">
              {source.links.map((link, i) => (
                <Fragment key={link.href}>
                  {i > 0 && labels.sourceJoiner}
                  <a href={link.href} target="_blank" rel="noopener" className="text-stone underline underline-offset-2 hover:text-ink">
                    {link.label}
                  </a>
                </Fragment>
              ))}
            </li>
          ))}
        </ol>
        <p className="mt-[14px] mb-0">{story.correctionLine}</p>
      </div>
    </>
  );
}
