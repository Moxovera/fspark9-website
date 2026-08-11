import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BookingCta from "@/components/booking/BookingCta";
import type { Hero as HeroContent } from "@/types/content";

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const {
    eyebrow,
    headlinePrimary,
    headlineAccent,
    bullets,
    closingLine,
    ctaLabel,
    ctaNote,
    scrollLabel,
  } = content;

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy px-7 pt-[166px] pb-16"
      style={{
        backgroundImage: [
          "radial-gradient(120% 80% at 78% 8%, color-mix(in srgb, var(--bronze) 20%, transparent), transparent 60%)",
          "radial-gradient(90% 70% at 8% 92%, color-mix(in srgb, var(--ivory) 6%, transparent), transparent 60%)",
        ].join(", "),
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--ivory) 3.5%, transparent) 1px, transparent 1px)",
          backgroundSize: "100% 46px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <Reveal>
          <p className="mb-5 font-mono text-[13px] tracking-[0.16em] text-bronze uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal>
          <h1 className="max-w-[17ch] text-balance font-display text-[clamp(2.7rem,6.4vw,5.6rem)] leading-[1.04] font-semibold tracking-[-0.015em] text-ivory">
            {headlinePrimary}
            <br />
            <span className="text-bronze">{headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal className="mt-9 flex max-w-[56ch] flex-col gap-[22px]">
          <ul className="m-0 flex list-none flex-col items-start gap-[13px] p-0">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-baseline gap-3.5 text-left text-[clamp(1.02rem,1.35vw,1.22rem)] leading-[1.5] text-ivory/82"
              >
                <Image
                  src="/assets/symbol-reversed.svg"
                  alt=""
                  width={64}
                  height={100}
                  className="h-[1.35em] w-auto shrink-0 translate-y-[0.18em]"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.5] font-medium text-ivory">
            {closingLine}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start gap-3.5">
          <BookingCta className="bg-bronze px-8 py-[18px] font-sans text-base font-medium text-ivory transition-[transform,box-shadow,background-color] duration-[250ms] ease-out hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--bronze)_88%,white)] hover:shadow-[0_14px_40px_rgba(166,124,61,0.4)]">
            {ctaLabel}
          </BookingCta>
          <p className="max-w-[46ch] text-sm leading-[1.55] text-ivory/50">
            {ctaNote}
          </p>
        </Reveal>
      </div>

      {/* Masaüstünde section'ın altına absolute sabitlenir (dc.html'deki gibi).
          dc.html'de bunun için ayrı bir mobil davranış tanımlı değil, ama
          genişletilmiş Hero içeriğiyle absolute+bottom-26px dar ekranlarda
          CTA bloğunun üzerine biniyor — bu yüzden md: altında normal akışa
          dönüp CTA bloğunun altına iniyor. */}
      <div className="mt-12 flex flex-col items-center gap-2.5 md:absolute md:inset-x-0 md:bottom-[26px] md:z-[2] md:mt-0">
        <span className="font-mono text-[10.5px] tracking-[0.2em] text-ivory/45 uppercase">
          {scrollLabel}
        </span>
        <span
          className="block h-[46px] w-px origin-top animate-[fs-cue-line_2.2s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--bronze) 85%, transparent))",
          }}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-[fs-cue-bob_2.2s_ease-in-out_infinite] text-bronze motion-reduce:animate-none"
        >
          <polyline points="6 10 12 16 18 10" />
        </svg>
      </div>
    </section>
  );
}
