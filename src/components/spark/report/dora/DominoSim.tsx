"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { fill } from "@/lib/format";
import { DOMINO_SERVICES, runOutage, servicesOf, totalServices, type DominoHit, type DominoState } from "@/lib/domino";
import { monoText } from "@/components/spark/decisions/styles";
import type { DominoCountry, DominoInstitution, DominoService, DominoSimProps } from "@/types/content";

type Phase = "idle" | "running" | "done";
type Mode = "normal" | "dora";

const COUNTRIES: DominoCountry[] = ["DE", "NL", "FR", "ES"];
/** Görev §4 akış: sağlayıcı söner, ~250 ms sonra çizgiler, sonra servisler 70 ms arayla. */
const LINES_AT = 250;
const FIRST_AT = 330;
const STEP = 70;
/** DORA modunda ağ sıfırlanıp aynı arıza bu kadar sonra yeniden oynar. */
const REPLAY_AT = 420;

const mono11 = "font-mono text-[11px] leading-[1.3] tracking-[0.06em] uppercase";
const primary =
  "inline-flex min-h-11 cursor-pointer items-center bg-flare py-[14px] pr-[40px] pl-[20px] font-sans text-[15px] leading-none font-bold text-ink [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)] disabled:cursor-not-allowed disabled:opacity-35";
const secondary =
  "inline-flex min-h-11 cursor-pointer items-center border-[1.5px] border-paper bg-transparent px-[18px] py-3 text-left font-sans text-[15px] leading-[1.2] font-bold text-paper hover:bg-paper hover:text-ink";

interface Path {
  key: string;
  provider: string;
  institution: string;
  d: string;
}

/**
 * Domino simülasyonu (görev §4). Okur bir sağlayıcı seçip fişini çeker;
 * sağlayıcı söner, ondan çıkan çizgiler kararır, etkilenen servisler sırayla
 * söner. Sonra aynı arıza DORA modunda oynar: yedeği olan servis Flare
 * çizgiyle yedeğe geçer, olmayan yine düşer ama "bilgilendirildi" etiketi
 * alır. Hesap saf fonksiyonda (lib/domino.ts). Her oynatma okurun bir
 * tıklamasıyla bir kez; döngü yok. Zamanlayıcılar sıfırlamada ve unmount'ta
 * temizlenir. reduced-motion'da zamanlayıcı yok, son durum anında.
 * Çizgiler 768 px ve üstünde (SVG, ResizeObserver ile ölçülür); altında her
 * kartta bağlı olduğu sağlayıcılar etiket olarak.
 */
export default function DominoSim({ content }: DominoSimProps) {
  const { providers, institutions, labels } = content;
  const total = useMemo(() => totalServices(content), [content]);

  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("normal");
  const [phase, setPhase] = useState<Phase>("idle");
  const [providerOff, setProviderOff] = useState(false);
  const [linesOff, setLinesOff] = useState(false);
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);

  const outcome = useMemo(() => (selected ? runOutage(content, selected, mode === "dora") : null), [content, selected, mode]);
  const hitState = useMemo(() => {
    const map = new Map<string, DominoHit>();
    outcome?.hits.slice(0, shown).forEach((hit) => map.set(`${hit.institution}:${hit.service}`, hit));
    return map;
  }, [outcome, shown]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const resetNetwork = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setProviderOff(false);
    setLinesOff(false);
    setShown(0);
  }, [clearTimers]);

  const play = useCallback(
    (provider: string, dora: boolean, delay = 0) => {
      const hits = runOutage(content, provider, dora).hits.length;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setProviderOff(true);
        setLinesOff(true);
        setShown(hits);
        setPhase("done");
        return;
      }
      const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, delay + ms));
      setPhase("running");
      at(0, () => setProviderOff(true));
      at(LINES_AT, () => setLinesOff(true));
      for (let i = 0; i < hits; i++) at(FIRST_AT + i * STEP, () => setShown(i + 1));
      at(FIRST_AT + Math.max(hits - 1, 0) * STEP + 120, () => setPhase("done"));
    },
    [content],
  );

  const choose = (id: string) => {
    resetNetwork();
    setMode("normal");
    setSelected(id);
  };
  const pull = () => {
    if (!selected || phase !== "idle") return;
    play(selected, mode === "dora");
  };
  const replay = () => {
    if (!selected) return;
    resetNetwork();
    setMode("dora");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    play(selected, true, reduced ? 0 : REPLAY_AT);
  };
  const reset = () => {
    resetNetwork();
    setMode("normal");
    setSelected(null);
  };

  // Sağlayıcı seçimi radyo grubu gibi: oklar seçimi taşır, odak seçilende.
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const onChipKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = providers[(index + delta + providers.length) % providers.length];
    choose(next.id);
    chipRefs.current[next.id]?.focus();
  };

  // Çizgiler: sağlayıcı çipinin altından kurum kartının üstüne.
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<Path[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = stage.getBoundingClientRect();
      const next: Path[] = [];
      for (const institution of institutions) {
        const card = cardRefs.current[institution.id]?.getBoundingClientRect();
        if (!card) continue;
        const ids = new Set<string>([...providerIds(institution), ...institution.backups.map((b) => b.to)]);
        for (const id of ids) {
          const chip = chipRefs.current[id]?.getBoundingClientRect();
          if (!chip) continue;
          const x1 = chip.left + chip.width / 2 - box.left;
          const y1 = chip.bottom - box.top;
          const x2 = card.left + card.width / 2 - box.left;
          const y2 = card.top - box.top;
          const mid = y1 + Math.min(70, (y2 - y1) / 2);
          next.push({ key: `${id}-${institution.id}`, provider: id, institution: institution.id, d: `M${x1} ${y1} C${x1} ${mid} ${x2} ${mid} ${x2} ${y2}` });
        }
      }
      setPaths(next);
      setSize({ w: box.width, h: box.height });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    schedule();
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [institutions]);

  const serviceState = (institution: string, service: DominoService): { state: DominoState; to?: string } => {
    const hit = hitState.get(`${institution}:${service}`);
    return hit ? { state: hit.state, to: hit.to } : { state: "live" };
  };
  const backupName = (to: string) => providers.find((p) => p.id === to)?.name ?? content.backupNames[to] ?? to;
  const informed = mode === "dora";

  const done = phase === "done" && outcome !== null;
  const result = done
    ? mode === "dora"
      ? fill(labels.resultDora, { services: outcome.down, rerouted: outcome.rerouted })
      : fill(labels.resultNormal, { institutions: outcome.institutions, countries: outcome.countries, services: outcome.down })
    : "";
  const counters = [
    { label: labels.counters.institutions, value: `${done ? outcome.institutions : 0} / ${institutions.length}` },
    { label: labels.counters.countries, value: `${done ? outcome.countries : 0} / ${COUNTRIES.length}` },
    { label: labels.counters.services, value: `${done ? outcome.down : 0} / ${total}` },
  ];

  return (
    <div role="group" aria-label={labels.stage} className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1.5">
          <span className={`${monoText} text-dust`} id="domino-choose">
            {labels.choose}
          </span>
          <span className={`${mono11} text-paper`}>{mode === "dora" ? labels.modeDora : labels.modeNormal}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={primary} disabled={!selected || phase !== "idle" || mode === "dora"} onClick={pull}>
            {labels.pull}
          </button>
          {mode === "normal" && phase === "done" && (
            <button type="button" className={secondary} onClick={replay}>
              {labels.replay}
            </button>
          )}
          <button type="button" className={`${monoText} min-h-11 cursor-pointer border-0 bg-transparent px-2 text-paper underline underline-offset-4`} onClick={reset}>
            {labels.reset}
          </button>
        </div>
      </div>

      <p aria-live="polite" className="m-0 min-h-[3.2em] max-w-[60ch] font-display text-[clamp(18px,2vw,22px)] leading-[1.35] font-bold">
        {result || <span className="font-sans text-[15.5px] font-normal text-dust">{labels.hint}</span>}
        {done && mode === "dora" && selected === "P6" && <span className="mt-2 block font-sans text-[16px] font-normal text-paper">{labels.sharedRail}</span>}
      </p>

      <div ref={stageRef} className="relative">
        <svg aria-hidden="true" width={size.w} height={size.h} className="pointer-events-none absolute inset-0 hidden min-[768px]:block">
          {paths.map((path) => {
            const backupLine = institutions
              .find((i) => i.id === path.institution)
              ?.backups.some((b) => b.to === path.provider && b.from === selected && serviceState(path.institution, b.service).state === "backup");
            const isBackupOnly = !providerIds(institutions.find((i) => i.id === path.institution)).has(path.provider);
            if (isBackupOnly && !backupLine) return null;
            const dead = linesOff && path.provider === selected;
            return (
              <path
                key={path.key}
                d={path.d}
                fill="none"
                strokeWidth={backupLine ? 1.6 : 1}
                strokeDasharray={dead ? "3 5" : undefined}
                className={`domino-fade ${backupLine ? "stroke-flare opacity-100" : dead ? "stroke-dust opacity-25" : "stroke-paper opacity-[0.16]"}`}
              />
            );
          })}
        </svg>

        <div role="radiogroup" aria-labelledby="domino-choose" className="relative z-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] min-[768px]:mx-0 min-[768px]:grid min-[768px]:grid-cols-6 min-[768px]:overflow-visible min-[768px]:px-0 [&::-webkit-scrollbar]:hidden">
          {providers.map((provider, index) => {
            const checked = selected === provider.id;
            const off = checked && providerOff;
            return (
              <button
                key={provider.id}
                ref={(el) => {
                  chipRefs.current[provider.id] = el;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked || (!selected && index === 0) ? 0 : -1}
                onClick={() => choose(provider.id)}
                onKeyDown={(event) => onChipKey(event, index)}
                className={`domino-fade grid min-h-11 flex-none cursor-pointer content-center gap-0.5 border-[1.5px] px-3 py-2 text-left text-[14px] leading-[1.25] font-bold whitespace-nowrap min-[768px]:whitespace-normal ${
                  checked ? (off ? "border-dust bg-inkrule text-dust" : "border-paper bg-paper text-ink") : "border-inkrule bg-ink text-paper hover:border-paper"
                }`}
              >
                <span className={off ? "line-through" : ""}>{provider.name}</span>
                {off && <span className={`${mono11} font-normal`}>{labels.down}</span>}
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 gap-x-6 gap-y-6 min-[768px]:mt-[96px] min-[768px]:grid-cols-2 min-[768px]:gap-y-[88px] min-[1024px]:grid-cols-4 min-[1024px]:gap-y-6">
          {COUNTRIES.map((country) => (
            <div key={country} className="grid content-start gap-2.5">
              <span className={`${monoText} text-dust`}>{`${country} · ${content.countries[country]}`}</span>
              {institutions
                .filter((i) => i.country === country)
                .map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                    cardRef={(el) => {
                      cardRefs.current[institution.id] = el;
                    }}
                    serviceState={serviceState}
                    serviceNames={content.services}
                    providerName={(id) => providers.find((p) => p.id === id)?.name ?? id}
                    backupName={backupName}
                    pulled={providerOff ? selected : null}
                    informed={informed}
                    labels={labels}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      <dl className="m-0 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-inkrule pt-6 min-[1024px]:grid-cols-4">
        {counters.map((counter) => (
          <div key={counter.label} className="grid content-start gap-2">
            <dt className={`${mono11} order-2 text-dust`}>{counter.label}</dt>
            <dd className="order-1 m-0 font-mono text-[clamp(26px,3.6vw,40px)] leading-none font-medium tabular-nums">{counter.value}</dd>
          </div>
        ))}
        <div className="grid content-start gap-2">
          <dt className={`${mono11} order-2 text-dust`}>{labels.counters.notice}</dt>
          <dd className={`order-1 m-0 font-mono text-[clamp(22px,2.6vw,32px)] leading-[1.25] font-medium ${done && mode === "dora" ? "text-flare" : ""}`}>
            {done ? (mode === "dora" ? labels.noticeDora : labels.noticeNormal) : "?"}
          </dd>
          <dd className="order-3 m-0 text-[12.5px] leading-[1.45] text-dust">{labels.noticeNote}</dd>
        </div>
      </dl>
    </div>
  );
}

function providerIds(institution: DominoInstitution | undefined): Set<string> {
  return new Set(Object.values(institution?.deps ?? {}).flat());
}

function InstitutionCard({
  institution,
  cardRef,
  serviceState,
  serviceNames,
  providerName,
  backupName,
  pulled,
  informed,
  labels,
}: {
  institution: DominoInstitution;
  cardRef: (el: HTMLDivElement | null) => void;
  serviceState: (institution: string, service: DominoService) => { state: DominoState; to?: string };
  serviceNames: Record<DominoService, string>;
  providerName: (id: string) => string;
  backupName: (id: string) => string;
  pulled: string | null;
  informed: boolean;
  labels: DominoSimProps["content"]["labels"];
}) {
  const services = servicesOf(institution);
  const states = services.map((service) => ({ service, ...serviceState(institution.id, service) }));
  const hit = states.some((s) => s.state === "down");
  const backups = [...new Set(states.filter((s) => s.state === "backup" && s.to).map((s) => s.to as string))];

  return (
    <div ref={cardRef} className="grid gap-2.5 border-[1.5px] border-inkrule bg-ink p-3.5">
      <div className="grid gap-0.5">
        <span className={`domino-fade font-display text-[15.5px] leading-[1.2] font-bold ${hit ? "text-dust" : "text-paper"}`}>{institution.name}</span>
        <span className="text-[12.5px] leading-[1.3] text-dust">{institution.type}</span>
      </div>
      <ul className="m-0 grid list-none gap-1.5 p-0">
        {DOMINO_SERVICES.filter((s) => services.includes(s)).map((service) => {
          const { state, to } = states.find((s) => s.service === service) ?? { state: "live" as const };
          return (
            <li key={service} className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                aria-hidden="true"
                className={`domino-fade size-2 flex-none rounded-full ${state === "down" ? "bg-inkrule" : state === "backup" ? "bg-flare shadow-[0_0_0_3px_color-mix(in_srgb,var(--flare)_28%,transparent)]" : "bg-paper"}`}
              />
              <span className={`${mono11} domino-fade ${state === "down" ? "text-dust line-through" : "text-paper"}`}>{serviceNames[service]}</span>
              {state === "down" && <span className={`${mono11} text-dust`}>{labels.down}</span>}
              {state === "backup" && to && <span className={`${mono11} text-flare`}>{`${labels.backup}: ${backupName(to)}`}</span>}
              {state === "down" && informed && <span className={`${mono11} border border-inkrule px-1.5 py-0.5 text-paper`}>{labels.informed}</span>}
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap items-center gap-1.5 min-[768px]:hidden">
        <span className={`${mono11} text-dust`}>{labels.dependsOn}</span>
        {[...providerIds(institution)].map((id) => {
          const off = pulled === id;
          return (
            <span key={id} className={`${mono11} domino-fade border px-1.5 py-0.5 ${off ? "border-inkrule text-dust line-through" : "border-inkrule text-paper"}`}>
              {providerName(id)}
            </span>
          );
        })}
        {backups.map((id) => (
          <span key={id} className={`${mono11} border border-flare px-1.5 py-0.5 text-flare`}>
            {backupName(id)}
          </span>
        ))}
      </div>
    </div>
  );
}
