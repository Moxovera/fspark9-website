"use client";

import KycPhone from "@/components/spark/report/kyc/KycPhone";
import { useStagger } from "@/components/spark/report/kyc/useStagger";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { useTabs } from "@/components/spark/report/psd3/useTabs";
import type { KycStoryProps } from "@/types/content";

/**
 * 10 User story: altı yıl sekmesi, Deniz'in telefonu ve yanında başlık,
 * metin ve "The real question" kutusu. Sekme değişince telefonun
 * mesajları tek tek gelir (useStagger). Ok tuşları, Home ve End sekmeler
 * arasında gezer.
 */
export default function KycStory({ story, template }: KycStoryProps) {
  const stagger = useStagger();
  const tabs = useTabs(story.years.length, 0, (i) => stagger.play(story.years[i].messages.length));
  const year = story.years[tabs.index];

  return (
    <>
      <div role="tablist" className="grid grid-cols-1 min-[561px]:flex min-[561px]:flex-wrap">
        {story.years.map((y, i) => (
          <button
            key={y.year}
            ref={tabs.setRef(i)}
            type="button"
            role="tab"
            id={`kyc-story-tab-${i}`}
            aria-selected={i === tabs.index}
            aria-controls="kyc-story-panel"
            tabIndex={i === tabs.index ? 0 : -1}
            onClick={() => tabs.select(i)}
            onKeyDown={(e) => tabs.onKeyDown(e, i)}
            className={`-mr-[1.5px] -mb-[1.5px] grid min-w-0 gap-0.5 border-[1.5px] border-ink px-4 py-3 text-left ${i === tabs.index ? "bg-ink text-paper" : ""}`}
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{y.year}</span>{" "}
            <span className="font-display text-[15px] font-bold">{y.title}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="kyc-story-panel"
        aria-labelledby={`kyc-story-tab-${tabs.index}`}
        className="mt-[26px] grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[861px]:grid-cols-[320px_minmax(0,1fr)]"
      >
        <KycPhone clock={`${story.clock} · ${year.year}`} messages={year.messages} visible={stagger.visible} keyPrefix={`y${tabs.index}`} />
        <div className="grid min-w-0 gap-[18px]">
          <p className="m-0 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] font-bold tracking-[-0.02em]">{year.title}</p>
          <p className="m-0 max-w-[60ch] text-[16.5px]">
            <Psd3Text text={year.text} template={template} />
          </p>
          <div className="border-t border-rule bg-paper p-4">
            <span className="mb-1.5 block font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase">{story.questionLabel}</span>{" "}
            <p className="m-0">
              <Psd3Text text={year.question} template={template} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
