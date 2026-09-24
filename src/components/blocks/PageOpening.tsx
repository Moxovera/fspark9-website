import type { ReactNode } from "react";
import BackLink from "@/components/brand/BackLink";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import type { NavHref } from "@/types/content";

interface PageOpeningProps {
  backHref: NavHref;
  backLabel: string;
  label: string;
  heading: string;
  /** `service`: board ServiceZTL (88/44px başlık). `work`: board WorkList (96/48px). */
  variant?: "service" | "work";
  /** Verilirse sağda (mobilde altta) hizmetin kendi dilimleriyle büyük kadran. */
  slices?: readonly number[];
  children?: ReactNode;
}

const HEADING = {
  service:
    "text-[44px] min-[900px]:text-[clamp(64px,6.112vw,88px)]",
  work: "text-[48px] min-[900px]:text-[clamp(64px,6.667vw,96px)]",
} as const;

const PAD = {
  service: "min-[900px]:pt-[112px] min-[900px]:pb-[120px]",
  work: "min-[900px]:pt-[72px] min-[900px]:pb-[88px]",
} as const;

/**
 * Alt sayfa açılışı (board ServiceZTL, WorkList ve mobil karşılıkları):
 * Ink zemin, geri linki, etiket ve başlık. Hizmet sayfasında sağda
 * 340px (mobil 160px) kadran; /services ve /work'te kadran yok.
 */
export default function PageOpening({
  backHref,
  backLabel,
  label,
  heading,
  variant = "service",
  slices,
  children,
}: PageOpeningProps) {
  return (
    <section className="on-ink bg-ink pt-16 min-[900px]:pt-[84px]">
      <div
        className={`flex flex-col gap-5 px-5 pt-6 pb-16 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-6 min-[900px]:px-8 min-[1280px]:px-16 ${PAD[variant]}`}
      >
        <div className="flex flex-col gap-5 min-[900px]:col-span-8 min-[900px]:gap-7">
          <BackLink href={backHref} label={backLabel} ground="ink" className="-mb-2" />
          <Label ground="ink">{label}</Label>
          <h1
            className={`m-0 font-display leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-paper min-[900px]:leading-[0.95] ${HEADING[variant]}`}
          >
            {heading}
          </h1>
          {children}
        </div>
        {slices && (
          <div className="min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:flex min-[900px]:justify-end">
            <Dial lit={slices} size={160} tone="ink" className="min-[900px]:size-[clamp(240px,23.6vw,340px)]" />
          </div>
        )}
      </div>
    </section>
  );
}
