"use client";

import { useEffect, useRef, useState } from "react";
import DoraInline from "@/components/spark/report/dora/DoraInline";
import DoraPhone from "@/components/spark/report/dora/DoraPhone";
import type { DoraStoryProps } from "@/types/content";

/** Sahne 3'e geçtikten sonra etiketin "Ertelendi" olması (görev §5). */
const POSTPONE_AFTER = 600;

/**
 * Elif'in üç arızası (görev §5). 1024 px ve üstünde solda yapışkan telefon,
 * sağda sahneler: kalın başlıklı paragraf ekranın ortasından geçince
 * (IntersectionObserver) telefon o sahneye geçer. Altında yapışkan yok; her
 * sahnenin üstünde kendi ekranıyla küçük telefon. Sahne 3'ün etiketi ilk
 * görüldüğünde bir kez değişir, geri dönmez. Telefonun hiçbir atasında
 * transform ya da overflow yok.
 */
export default function DoraStory({ story, locale }: DoraStoryProps) {
  const [scene, setScene] = useState<0 | 1 | 2>(0);
  const [postponed, setPostponed] = useState(false);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = sceneRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index === 0 || index === 1 || index === 2) setScene(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sceneRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (scene !== 2 || postponed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPostponed(true);
      return;
    }
    const timer = window.setTimeout(() => setPostponed(true), POSTPONE_AFTER);
    return () => window.clearTimeout(timer);
  }, [scene, postponed]);

  return (
    <div className="grid grid-cols-1 gap-x-[clamp(40px,6vw,88px)] min-[1024px]:grid-cols-[300px_minmax(0,1fr)]">
      <div aria-hidden="true" className="hidden min-[1024px]:block">
        <div className="sticky top-[150px]">
          <DoraPhone phone={story.phone} scene={scene} postponed={postponed} className="h-[580px] w-[290px]" />
        </div>
      </div>
      <div className="grid gap-0">
        {story.scenes.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="grid content-start gap-5 border-t-2 border-ink py-8 min-[1024px]:min-h-[64vh] min-[1024px]:py-10"
          >
            <DoraPhone
              phone={story.phone}
              scene={i as 0 | 1 | 2}
              postponed={i === 2 ? postponed : false}
              className="h-[430px] w-[260px] min-[1024px]:hidden"
            />
            <p className="m-0 max-w-[60ch] text-[17px] leading-[1.6]">
              <strong className="mb-1.5 block font-display text-[21px] leading-[1.2] font-extrabold tracking-[-0.015em]">{s.title}</strong>
              <DoraInline text={s.body} locale={locale} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
