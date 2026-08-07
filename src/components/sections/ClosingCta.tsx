import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import type { ClosingCta as ClosingCtaContent } from "@/types/content";

interface ClosingCtaProps {
  content: ClosingCtaContent;
}

export default function ClosingCta({ content }: ClosingCtaProps) {
  const { quote, quoteAttribution, headline, body, ctaLabel, ctaHref, note } =
    content;

  return (
    <section className="flex min-h-[92svh] flex-col justify-center bg-navy px-7 pt-[110px] pb-[120px]">
      <div className="mx-auto w-full max-w-[1000px]">
        <Reveal className="mb-[68px] border-l-2 border-bronze pl-7">
          <p className="mb-3.5 max-w-[60ch] text-[1.05rem] leading-[1.65] text-ivory/72">
            {quote}
          </p>
          <p className="font-mono text-xs tracking-[0.1em] text-bronze uppercase">
            {quoteAttribution}
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mb-7 max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.06] font-medium tracking-[-0.015em] text-ivory">
            {headline}
          </h2>
        </Reveal>

        {body && (
          <Reveal className="mb-10 max-w-[62ch] text-[1.08rem] leading-[1.68] text-ivory/74">
            <p>{body}</p>
          </Reveal>
        )}

        <Reveal className="flex flex-col items-start gap-3.5">
          <Link
            href={ctaHref}
            className="bg-bronze px-8 py-[18px] font-sans text-base font-medium text-ivory"
          >
            {ctaLabel}
          </Link>
          {note && (
            <p className="max-w-[46ch] text-sm leading-[1.55] text-ivory/50">
              {note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
