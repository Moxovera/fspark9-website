"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import RadarRich, { RadarParas } from "@/components/spark/radar/RadarRich";
import { evaluateExpression, formatCalc } from "@/lib/radar";
import { fill } from "@/lib/format";
import { body, group, h2, h3, sectionLabel, smallButton } from "@/components/spark/radar/styles";
import type { RadarCalcProps, RadarUsecaseProps } from "@/types/content";

/**
 * Nasıl çalışıyor: tek bir işlem adım adım. Aktörler tek sırada, sıradaki
 * adımın iki aktörü koyulaşır ve aralarında ok çıkar (para düz, veri kesik
 * çizgili). Her aktörün altında o ana kadarki defter satırı durur. Geri,
 * İleri ve adım noktaları. Altında hesap makinesi.
 */
export default function RadarUsecase({ data, text, labels, locale, template }: RadarUsecaseProps) {
  const [current, setCurrent] = useState(0);
  const total = data.steps.length;
  const step = data.steps[current];
  const stepText = text.steps[current];
  const stepLabel = (i: number) => fill(labels.usecaseStep, { i, n: total });

  const from = step.from ? data.actors.indexOf(step.from) : -1;
  const to = step.to ? data.actors.indexOf(step.to) : -1;
  const hasFlow = from >= 0 && to >= 0;
  const first = Math.min(from, to);
  const span = Math.abs(from - to) + 1;

  return (
    <section id="usecase" className={group}>
      <span className={sectionLabel}>{labels.usecase}</span>
      <h2 className={h2}>
        <RadarRich text={text.title} template={template} />
      </h2>
      <div className={body}>
        <RadarParas items={text.intro} template={template} />
      </div>

      <div className="flex flex-col gap-[18px] border-t-2 border-ink bg-white p-5 max-[560px]:px-[10px] max-[560px]:py-4">
        <div className="grid gap-[6px] max-[560px]:gap-1" style={{ gridTemplateColumns: `repeat(${data.actors.length}, minmax(0, 1fr))` }}>
          {data.actors.map((actor, index) => {
            const actorText = text.actors[actor];
            const on = step.from === actor || step.to === actor;
            let ledger = "";
            let changed = false;
            for (let j = 0; j <= current; j++) {
              const value = text.steps[j].ledger?.[actor];
              if (value !== undefined) {
                ledger = value;
                changed = j === current;
              }
            }
            return (
              <div
                key={actor}
                data-actor={index}
                className={`flex min-w-0 flex-col gap-1 border px-2 py-[10px] transition-[background-color,color,border-color] duration-240 ease-brand max-[560px]:px-[5px] max-[560px]:py-2 ${
                  on ? "border-ink bg-ink text-paper" : "border-rule bg-paper"
                }`}
              >
                <span
                  className={`font-mono text-[11px] font-medium tracking-[0.08em] [overflow-wrap:anywhere] uppercase max-[560px]:text-[9px] max-[560px]:tracking-[0] max-[560px]:[overflow-wrap:normal] max-[560px]:break-keep ${on ? "text-paper" : "text-ink"}`}
                >
                  {actorText.label}
                </span>{" "}
                <span className={`text-[12.5px] leading-[1.3] max-[560px]:hidden ${on ? "text-dust" : "text-stone"}`}>
                  <RadarRich text={actorText.sub} template={template} />
                </span>{" "}
                <b
                  className={`mt-1 min-h-[1.35em] border-t pt-[6px] text-[12px] leading-[1.35] font-medium break-words max-[560px]:font-sans max-[560px]:text-[11.5px] max-[560px]:tracking-[0] ${
                    changed ? "rd-rise" : ""
                  } ${on ? "border-paper/25" : ledger ? "border-rule" : "border-transparent"} font-mono`}
                >
                  <RadarRich text={ledger} template={template} />
                </b>
              </div>
            );
          })}
        </div>

        <div className="grid min-h-[46px] gap-[6px] max-[560px]:gap-1" style={{ gridTemplateColumns: `repeat(${data.actors.length}, minmax(0, 1fr))` }}>
          <span
            hidden={!hasFlow}
            data-kind={step.kind ?? "money"}
            data-dir={to > from ? "right" : "left"}
            className="rd-bar"
            style={hasFlow ? ({ gridColumn: `${first + 1} / span ${span}`, "--span": span } as CSSProperties) : undefined}
          >
            <span className="rd-bar-line" />
            <span className="rd-bar-label">
              <RadarRich text={stepText.flow ?? ""} template={template} />
            </span>
          </span>
        </div>

        <div aria-live="polite" className="flex min-h-[150px] flex-col gap-[10px] border-t border-rule pt-4">
          <span className={sectionLabel}>{stepLabel(current + 1)}</span>
          <h3 className={h3}>
            <RadarRich text={stepText.title} template={template} />
          </h3>
          <div className={body}>
            <RadarParas items={stepText.body} template={template} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-[10px] max-[560px]:gap-[6px]">
          <button type="button" className={smallButton} disabled={current === 0} onClick={() => setCurrent(current - 1)}>
            <ArrowLeftIcon className="size-[14px] flex-none" />
            {labels.usecaseBack}
          </button>
          <div className="flex flex-nowrap justify-center gap-1">
            {data.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={stepLabel(i + 1)}
                aria-current={i === current ? "step" : "false"}
                onClick={() => setCurrent(i)}
                className={`flex h-11 w-[22px] cursor-pointer items-center border-0 bg-transparent p-0 max-[560px]:w-[14px] after:block after:h-2 after:w-full after:content-[''] ${
                  i === current ? "after:bg-ink" : "after:bg-rule"
                }`}
              />
            ))}
          </div>
          <button type="button" className={smallButton} disabled={current === total - 1} onClick={() => setCurrent(current + 1)}>
            {labels.usecaseNext}
            <ArrowRightIcon className="size-[14px] flex-none" />
          </button>
        </div>
      </div>

      {data.calc && text.calc && <RadarCalc calc={data.calc} text={text.calc} label={labels.calc} locale={locale} template={template} />}
    </section>
  );
}

function RadarCalc({ calc, text, label, locale, template }: RadarCalcProps) {
  const [inputs, setInputs] = useState<Record<string, number>>(() => Object.fromEntries(calc.inputs.map((input) => [input.id, input.value])));
  const results = useMemo(() => calc.outputs.map((output) => evaluateExpression(output.expr, inputs)), [calc.outputs, inputs]);
  const parts = calc.outputs.filter((output) => output.part);
  const labelOf = (id: string) => {
    const value = text.outputs[id];
    return typeof value === "string" ? value : value.label;
  };
  const shareOf = (id: string) => {
    const value = text.outputs[id];
    return typeof value === "string" ? "" : (value.share ?? "");
  };

  return (
    <div className="flex flex-col gap-[14px] border-t-2 border-ink bg-white p-5">
      <span className={sectionLabel}>{label}</span>
      <h3 className={h3}>
        <RadarRich text={text.title} template={template} />
      </h3>
      <div className={body}>
        <RadarParas items={text.intro} template={template} />
      </div>
      <div className="flex flex-col gap-[14px]">
        {calc.inputs.map((input) => (
          <label key={input.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-[6px] text-[15px]">
            <span>{text.inputs[input.id]}</span>{" "}
            <output className="font-display text-[17px] font-bold">{formatCalc(inputs[input.id], input.fmt, locale)}</output>{" "}
            <input
              type="range"
              min={input.min}
              max={input.max}
              step={input.step}
              value={inputs[input.id]}
              onChange={(event) => setInputs({ ...inputs, [input.id]: Number(event.target.value) })}
              className="col-span-full my-[2px] min-h-7 w-full accent-ink"
            />
          </label>
        ))}
      </div>
      {parts.length > 0 && (
        <div aria-hidden="true" className="flex gap-[3px]">
          {parts.map((output, k) => (
            <span key={output.id} className="flex min-w-0 flex-col gap-[6px] transition-[flex] duration-240 ease-brand" style={{ flex: output.part }}>
              <b className={`block h-[14px] ${output.main ? "bg-ink" : k === 0 ? "bg-stone" : "bg-rule"}`} />
              <i className={`font-mono text-[10.5px] leading-[1.2] tracking-[0.04em] [overflow-wrap:anywhere] uppercase not-italic ${output.main ? "text-ink" : "text-stone"}`}>
                {labelOf(output.id)}
              </i>
            </span>
          ))}
        </div>
      )}
      <table className="w-full border-collapse text-[15px] leading-[1.4]">
        <tbody>
          {calc.outputs.map((output, k) => (
            <tr key={output.id} className={output.main ? "font-bold" : ""}>
              <th scope="row" className={`border-b border-rule py-[10px] text-left align-baseline ${k === 0 ? "border-t" : ""} ${output.main ? "font-bold" : "font-normal"}`}>
                {labelOf(output.id)}
              </th>
              <td className={`border-b border-rule px-[14px] py-[10px] text-right align-baseline font-mono text-[12px] whitespace-nowrap text-stone ${k === 0 ? "border-t" : ""}`}>
                {shareOf(output.id)}
              </td>
              <td
                className={`w-[1%] border-b border-rule py-[10px] text-right align-baseline font-display font-bold whitespace-nowrap ${k === 0 ? "border-t" : ""} ${output.main ? "text-[21px]" : ""}`}
              >
                {formatCalc(results[k], output.fmt, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {text.note && (
        <p className="m-0 text-[13.5px] leading-[1.45] text-stone">
          <RadarRich text={text.note} template={template} />
        </p>
      )}
    </div>
  );
}
