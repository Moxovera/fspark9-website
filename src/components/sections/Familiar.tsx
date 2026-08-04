import type { FamiliarSection } from "@/types/content";

interface FamiliarProps {
  content: FamiliarSection;
}

export default function Familiar({ content }: FamiliarProps) {
  const { heading, points, closingLine } = content;

  return (
    <section className="border-t border-bronze/45 bg-navy px-7 pt-[104px] pb-[120px]">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="mb-14 max-w-[22ch] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-ivory">
          {heading}
        </h2>

        <div className="flex flex-col gap-[26px] pb-2">
          {points.map((point) => (
            <div
              key={point.order}
              className="rounded-[20px] backdrop-blur-[18px]"
              style={{
                border: "1px solid color-mix(in srgb, var(--ivory) 14%, transparent)",
                background:
                  "linear-gradient(160deg, color-mix(in srgb, var(--ivory) 10%, transparent), color-mix(in srgb, var(--ivory) 3%, transparent))",
                boxShadow:
                  "0 26px 70px color-mix(in srgb, color-mix(in srgb, var(--navy) 35%, black) 50%, transparent)",
              }}
            >
              {/* Sayı sütunu mobilde 132px yerine 85px — dc.html'de bu ayrım
                  yok (sabit 132px), bilinçli mobil sapma: metne daha çok
                  yer açmak için. sm: ve üstü dc.html ile birebir aynı. */}
              <div className="grid grid-cols-[85px_1fr] items-start gap-7 px-10 pt-9.5 pb-10 sm:grid-cols-[132px_1fr]">
                <span className="font-display text-[clamp(2.6rem,4.4vw,3.6rem)] leading-[0.9] font-semibold tracking-[-0.02em] text-bronze">
                  {String(point.order).padStart(2, "0")}
                </span>
                <p className="text-pretty font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.45] font-normal text-ivory">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 max-w-[62ch] border-l-2 border-bronze pl-6 text-[1.05rem] leading-[1.6] text-ivory/82">
          {closingLine}
        </p>
      </div>
    </section>
  );
}
