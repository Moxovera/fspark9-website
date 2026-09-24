import BackLink from "@/components/brand/BackLink";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import type { NavHref } from "@/types/content";

interface ServiceOpeningProps {
  backHref: NavHref;
  backLabel: string;
  label: string;
  heading: string;
  /** Verilirse sağda (mobilde altta) hizmetin kendi dilimleriyle büyük kadran. */
  slices?: readonly number[];
}

/**
 * Hizmet sayfası açılışı (board ServiceZTL / ServiceZTLM): Ink, geri
 * linki, etiket, başlık ve 340px (mobil 160px) kadran. /services index de
 * aynı deseni kadransız kullanıyor.
 */
export default function ServiceOpening({ backHref, backLabel, label, heading, slices }: ServiceOpeningProps) {
  return (
    <section className="on-ink bg-ink pt-16 min-[900px]:pt-[84px]">
      <div className="flex flex-col gap-5 px-5 pt-6 pb-16 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-6 min-[900px]:px-8 min-[900px]:pt-[112px] min-[900px]:pb-[120px] min-[1280px]:px-16">
        <div className="flex flex-col gap-5 min-[900px]:col-span-8 min-[900px]:gap-7">
          <BackLink href={backHref} label={backLabel} ground="ink" className="-mb-2" />
          <Label ground="ink">{label}</Label>
          <h1 className="m-0 font-display text-[44px] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-paper min-[900px]:text-[clamp(64px,6.112vw,88px)] min-[900px]:leading-[0.95]">
            {heading}
          </h1>
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
