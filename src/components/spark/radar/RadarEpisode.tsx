"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RadarBoard from "@/components/spark/radar/RadarBoard";
import RadarCanvas from "@/components/spark/radar/RadarCanvas";
import RadarCompare from "@/components/spark/radar/RadarCompare";
import RadarGuess from "@/components/spark/radar/RadarGuess";
import RadarKeystone from "@/components/spark/radar/RadarKeystone";
import RadarRich, { RadarParas } from "@/components/spark/radar/RadarRich";
import RadarShape from "@/components/spark/radar/RadarShape";
import RadarUsecase from "@/components/spark/radar/RadarUsecase";
import RadarWeak from "@/components/spark/radar/RadarWeak";
import { body, group, h2, sectionLabel } from "@/components/spark/radar/styles";
import { RADAR_SIGNALS, radarValues } from "@/lib/radar";
import type { RadarBlockId, RadarEpisodeProps } from "@/types/content";

/**
 * On the Radar bölümünün gövdesi (prototip Spark/Radar/finmid/radar-finmid.html):
 * sinyal, tahmin, nasıl çalışıyor + hesap makinesi, tuval paragrafları,
 * rakipler, taşıyıcı taş, zayıf halka, tam resim ve yanında okurken dolan
 * pano. Sayfada okurun yaptığı hiçbir şey saklanmaz ya da gönderilmez.
 * Hangi kutuların dolduğu ve hangi hamlelerin cevaplandığı burada tek
 * durum; pano ve bölümler ona bakar.
 */
export default function RadarEpisode({ episode, labels, locale, footnoteTemplate }: RadarEpisodeProps) {
  const { data, text } = episode;
  const [filled, setFilled] = useState<ReadonlySet<string>>(() => new Set());
  const [answered, setAnswered] = useState<ReadonlySet<string>>(() => new Set());
  const [highlight, setHighlight] = useState<{ id: string; seq: number } | null>(null);
  const paragraphs = useRef(new Map<string, HTMLElement>());
  const full = useMemo(() => radarValues(data), [data]);

  const fillBlock = useCallback((id: string) => {
    setFilled((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  // Tuval paragrafı ekranın üst yarısına gelince kutusu panoda dolar, bir kez.
  useEffect(() => {
    const nodes = [...paragraphs.current.values()];
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => fillBlock(node.dataset.block ?? ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          fillBlock((entry.target as HTMLElement).dataset.block ?? "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.4 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [fillBlock]);

  // Hamlenin tuvaldeki yeri panoda 1,6 sn çerçevelenir.
  useEffect(() => {
    if (!highlight) return;
    const timer = setTimeout(() => setHighlight(null), 1600);
    return () => clearTimeout(timer);
  }, [highlight]);

  function onPull(moveId: string) {
    const pulled = data.moves.find((m) => m.id === moveId);
    setAnswered((prev) => (prev.size === data.moves.length ? prev : new Set(data.moves.map((m) => m.id))));
    setFilled((prev) => new Set([...prev, ...data.moves.map((m) => m.ours)]));
    if (pulled) setHighlight({ id: pulled.ours, seq: Date.now() });
  }

  return (
    <div className="mx-auto grid w-full max-w-[1312px] text-[17px] leading-[1.55] grid-cols-1 gap-12 px-5 pt-14 pb-24 min-[900px]:px-8 min-[1080px]:grid-cols-[minmax(0,680px)_minmax(0,420px)] min-[1080px]:justify-between min-[1280px]:px-16">
      <article className="flex min-w-0 flex-col gap-[72px]">
        <section id="signal" className={group}>
          <span className={sectionLabel}>{labels.signal}</span>
          <div className={body}>
            <p className="m-0 text-[19px] leading-[1.5]">
              <RadarRich text={text.lead} template={footnoteTemplate} />
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] border-t border-rule">
            {text.idcard.map(([label, value]) => (
              <div key={label} className="flex min-w-0 flex-col gap-[3px] border-b border-rule py-[14px] pr-4">
                <span className={sectionLabel}>{label}</span>{" "}
                <b className="text-[16px] font-bold">
                  <RadarRich text={value} template={footnoteTemplate} />
                </b>
              </div>
            ))}
          </div>
          <div className="grid max-w-[62ch] grid-cols-1 gap-[6px]">
            <span className={sectionLabel}>{labels.why}</span>
            <RadarParas items={text.why} template={footnoteTemplate} />
          </div>
        </section>

        <RadarGuess text={text.guess} guess={data.guess} labels={labels} template={footnoteTemplate} onAnswer={fillBlock} />

        {data.usecase && text.usecase && (
          <RadarUsecase data={data.usecase} text={text.usecase} labels={labels} locale={locale} template={footnoteTemplate} />
        )}

        <section id="canvas" className={group}>
          <span className={sectionLabel}>{labels.canvas}</span>
          <h2 className={h2}>
            <RadarRich text={text.canvas.title} template={footnoteTemplate} />
          </h2>
          <div className={body}>
            <RadarParas items={text.canvas.intro} template={footnoteTemplate} />
          </div>
          <div className={body}>
            {data.order.map((id: RadarBlockId) => {
              const block = data.blocks.find((b) => b.id === id);
              const t = text.blocks[id];
              if (!block || !t) return null;
              const lit = filled.has(id);
              const quiet = block.kind === "quiet";
              return (
                <div
                  key={id}
                  data-block={id}
                  ref={(node) => {
                    if (node) paragraphs.current.set(id, node);
                    else paragraphs.current.delete(id);
                  }}
                  className="grid grid-cols-[118px_minmax(0,1fr)] items-start gap-4 border-t border-rule pt-4 max-[560px]:grid-cols-1 max-[560px]:gap-2"
                >
                  <span
                    className={`mt-[2px] justify-self-start border px-2 py-[5px] font-mono text-[11px] tracking-[0.06em] uppercase transition-all duration-480 ease-brand ${
                      !lit ? "border-dashed border-rule text-stone" : quiet ? "border-rule bg-white text-stone" : "border-ink bg-ink text-paper"
                    }`}
                  >
                    {t.tag}
                  </span>{" "}
                  <p className={`m-0 ${quiet ? "text-stone" : ""}`}>
                    <RadarRich text={t.para} template={footnoteTemplate} />
                    {t.note && (
                      <span className="mt-2 block text-[14px] text-stone">
                        <RadarRich text={t.note} template={footnoteTemplate} />
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {data.compare && text.compare && <RadarCompare text={text.compare} data={data.compare} label={labels.compare} template={footnoteTemplate} />}

        <RadarKeystone data={data} text={text} labels={labels} template={footnoteTemplate} full={full} onPull={onPull} />

        <RadarWeak text={text.weak} labels={labels} template={footnoteTemplate} />

        <section id="full" className={group}>
          <span className={sectionLabel}>{labels.full}</span>
          <h2 className={h2}>
            <RadarRich text={text.final.title} template={footnoteTemplate} />
          </h2>
          <div className="border-t-2 border-ink bg-white p-5">
            <RadarCanvas blocks={data.blocks} texts={text.blocks} mode="full" template={footnoteTemplate} label={labels.canvasLabel} />
          </div>
          <div className="grid grid-cols-1 items-center gap-6 border-t-2 border-ink bg-white px-5 py-6 min-[760px]:grid-cols-[minmax(0,340px)_minmax(0,1fr)] min-[760px]:gap-8">
            <RadarShape values={full} labels={labels.signals} radius={92} viewBox="-178 -132 356 270" dots title={labels.radar} className="h-auto w-full max-w-[360px] justify-self-center" />
            <div className="flex min-w-0 flex-col">
              {RADAR_SIGNALS.map((signal, i) => {
                const g = text.final.signals[signal];
                return (
                  <div key={signal} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-[14px] gap-y-1 ${i === 0 ? "pb-3" : "border-t border-rule py-3"}`}>
                    <span className={`${sectionLabel} !text-ink`}>{labels.signals[signal]}</span>{" "}
                    <span className="text-right font-display text-[15px] font-bold">{g.level}</span>{" "}
                    <span className="col-span-full h-[6px] bg-paper">
                      <i className="block h-full bg-ink" style={{ width: `${Math.round(full[signal] * 100)}%` }} />
                    </span>{" "}
                    <p className="col-span-full m-0 text-[14.5px] leading-[1.45] text-stone">
                      <RadarRich text={g.note} template={footnoteTemplate} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex max-w-[62ch] flex-col gap-[14px]">
            <span className={sectionLabel}>{labels.view}</span>
            <p className="m-0 font-display text-[24px] leading-[1.2] font-bold tracking-[-0.02em]">
              <RadarRich text={text.view.first} template={footnoteTemplate} />
            </p>
            <RadarParas items={text.view.body} template={footnoteTemplate} />
          </div>
        </section>
      </article>

      <RadarBoard data={data} text={text} labels={labels} template={footnoteTemplate} filled={filled} answered={answered} highlight={highlight?.id ?? null} />
    </div>
  );
}
