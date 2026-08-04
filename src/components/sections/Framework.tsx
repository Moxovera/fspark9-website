import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import type { FrameworkStep } from "@/types/content";

interface FrameworkProps {
  steps: FrameworkStep[];
}

// Kartların dekoratif "art" grafikleri veri kaynaklı değil — dc.html'de
// her kart için sabit, index'e bağlı şekiller (bkz. FSPARK9-DURUM.md).
// Hover'daki scale/rotate/glow saf CSS ile (.framework-card:hover
// .framework-motif, globals.css) — JS state gerekmiyor, bu yüzden
// bileşen server component olarak kalıyor.

function StrategyMotif() {
  return (
    <div className="relative flex h-[150px] w-[150px] items-center justify-center">
      <div
        className="absolute top-[5px] left-[5px] h-[140px] w-[140px] rounded-full"
        style={{
          border: "1px solid color-mix(in srgb, var(--bronze) 55%, transparent)",
          boxShadow:
            "0 0 40px color-mix(in srgb, var(--bronze) 35%, transparent) inset",
        }}
      />
      <div
        className="absolute top-[27px] left-[27px] h-24 w-24 rounded-[18px] rotate-45 backdrop-blur-[6px]"
        style={{
          border: "1px solid color-mix(in srgb, var(--ivory) 30%, transparent)",
          background:
            "linear-gradient(140deg, color-mix(in srgb, var(--ivory) 22%, transparent), color-mix(in srgb, var(--ivory) 4%, transparent))",
        }}
      />
      <span
        className="relative text-[40px] leading-none text-ivory"
        style={{
          textShadow: "0 0 22px color-mix(in srgb, var(--bronze) 80%, transparent)",
        }}
      >
        ↗
      </span>
    </div>
  );
}

function InfrastructureMotif() {
  const bars = [
    {
      transform: "translate(-26px, -40px) rotate(-8deg)",
      border: "1px solid color-mix(in srgb, var(--ivory) 28%, transparent)",
      background:
        "linear-gradient(120deg, color-mix(in srgb, var(--ivory) 20%, transparent), color-mix(in srgb, var(--ivory) 4%, transparent))",
      boxShadow: undefined,
    },
    {
      transform: "rotate(-8deg)",
      border: "1px solid color-mix(in srgb, var(--bronze) 60%, transparent)",
      background:
        "linear-gradient(120deg, color-mix(in srgb, var(--bronze) 32%, transparent), color-mix(in srgb, var(--ivory) 6%, transparent))",
      boxShadow: "0 0 34px color-mix(in srgb, var(--bronze) 40%, transparent)",
    },
    {
      transform: "translate(26px, 40px) rotate(-8deg)",
      border: "1px solid color-mix(in srgb, var(--ivory) 22%, transparent)",
      background:
        "linear-gradient(120deg, color-mix(in srgb, var(--ivory) 14%, transparent), color-mix(in srgb, var(--ivory) 2%, transparent))",
      boxShadow: undefined,
    },
  ];

  return (
    <>
      {bars.map((bar) => (
        <div
          key={bar.transform}
          className="absolute h-[46px] w-[150px] rounded-[10px]"
          style={{
            transform: bar.transform,
            border: bar.border,
            background: bar.background,
            boxShadow: bar.boxShadow,
          }}
        />
      ))}
    </>
  );
}

function ProductMotif() {
  return (
    <>
      <div
        className="absolute h-[156px] w-32 overflow-hidden rounded-[18px]"
        style={{
          border: "1px solid color-mix(in srgb, var(--ivory) 32%, transparent)",
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--ivory) 18%, transparent), color-mix(in srgb, var(--ivory) 4%, transparent))",
          boxShadow: "0 0 44px color-mix(in srgb, var(--bronze) 28%, transparent)",
        }}
      >
        <div
          className="absolute top-[10px] left-1/2 h-[6px] w-[42px] -translate-x-1/2 rounded-full"
          style={{ background: "color-mix(in srgb, var(--ivory) 35%, transparent)" }}
        />
        <div
          className="absolute top-[34px] right-3.5 left-3.5 h-[30px] rounded-lg"
          style={{
            border: "1px solid color-mix(in srgb, var(--ivory) 24%, transparent)",
            background: "color-mix(in srgb, var(--ivory) 10%, transparent)",
          }}
        />
        <div
          className="absolute top-[74px] right-[42px] left-3.5 h-2 rounded-full"
          style={{ background: "color-mix(in srgb, var(--ivory) 22%, transparent)" }}
        />
        <div
          className="absolute top-[90px] right-[60px] left-3.5 h-2 rounded-full"
          style={{ background: "color-mix(in srgb, var(--ivory) 16%, transparent)" }}
        />
        <div
          className="absolute right-3.5 bottom-3.5 left-3.5 h-[26px] rounded-lg"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--bronze) 75%, transparent), color-mix(in srgb, var(--bronze) 40%, transparent))",
          }}
        />
      </div>
      <div
        className="absolute h-10 w-24 rounded-[10px] backdrop-blur-[6px]"
        style={{
          transform: "translate(74px, -46px) rotate(9deg)",
          border: "1px solid color-mix(in srgb, var(--bronze) 55%, transparent)",
          background:
            "linear-gradient(120deg, color-mix(in srgb, var(--bronze) 28%, transparent), color-mix(in srgb, var(--ivory) 6%, transparent))",
        }}
      />
      <div
        className="absolute h-[34px] w-21 rounded-[10px] backdrop-blur-[6px]"
        style={{
          transform: "translate(-72px, 52px) rotate(-10deg)",
          border: "1px solid color-mix(in srgb, var(--ivory) 26%, transparent)",
          background:
            "linear-gradient(120deg, color-mix(in srgb, var(--ivory) 18%, transparent), color-mix(in srgb, var(--ivory) 3%, transparent))",
        }}
      />
    </>
  );
}

const MOTIFS = [StrategyMotif, InfrastructureMotif, ProductMotif];

const FRAME_GRADIENTS = [
  { position: "70% 12%", bronzeOpacity: 42, transparentStop: 62 },
  { position: "30% 14%", bronzeOpacity: 38, transparentStop: 60 },
  { position: "50% 10%", bronzeOpacity: 36, transparentStop: 60 },
];

export default function Framework({ steps }: FrameworkProps) {
  return (
    <section className="border-t border-bronze/45 bg-ivory px-7 pt-[104px] pb-[112px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {steps.map((step, i) => {
          const Motif = MOTIFS[i];
          return (
            <Reveal key={step.id}>
              <Link
                href="/services"
                className="framework-card block rounded-[20px] p-3.5 backdrop-blur-lg"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in srgb, var(--ivory) 96%, transparent), color-mix(in srgb, var(--ivory) 70%, transparent))",
                }}
              >
                <div
                  className="relative h-[232px] overflow-hidden rounded-[14px]"
                  style={{
                    border: "1px solid color-mix(in srgb, var(--navy) 16%, transparent)",
                    background: `radial-gradient(120% 90% at ${FRAME_GRADIENTS[i].position}, color-mix(in srgb, var(--bronze) ${FRAME_GRADIENTS[i].bronzeOpacity}%, transparent), transparent ${FRAME_GRADIENTS[i].transparentStop}%), var(--navy)`,
                  }}
                >
                  <span className="absolute top-4 left-[18px] font-mono text-[15px] tracking-[0.08em] text-ivory/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute top-[14px] right-[18px] text-lg text-ivory/55">
                    ↗
                  </span>
                  <div className="framework-motif absolute inset-0 flex items-center justify-center">
                    <Motif />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 px-3 pt-6 pb-2.5">
                  <h3 className="font-display text-[1.6rem] font-semibold text-navy">
                    {step.label}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-muted">
                    {step.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
