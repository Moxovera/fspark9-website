"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import { ArrowRightIcon } from "@/components/icons";
import { EIGHT_SLICES } from "@/lib/dial";
import type { ServiceSummary } from "@/types/content";

interface ServicePickerProps {
  services: ServiceSummary[];
  /** Sol sütunun üst kısmı (etiket, başlık, metin), server'da üretilir. */
  intro: ReactNode;
}

/**
 * Four services etkileşimi (brief v4 §7.2, board Main #services).
 * Dinlenme halinde büyük kadranın 1-8 dilimi yanık. Bir satırın üzerine
 * gelince ya da odaklanınca sadece o hizmetin dilimleri yanar, diğer
 * satırlar 0.4'e söner. Dokunmatikte ilk dokunuş satırı yakar, ikincisi
 * sayfaya gider. Bölümün tek client parçası bu.
 *
 * Sol sütun board'daki gibi sticky (top 120px): bu bileşenin hiçbir
 * atasında transform yok, Reveal sarmalayıcısı bu bölüme konmuyor.
 */
export default function ServicePicker({ services, intro }: ServicePickerProps) {
  const [active, setActive] = useState<number | null>(null);
  const lastPointer = useRef<string>("mouse");
  const lit = active === null ? EIGHT_SLICES : services[active].slices;

  return (
    <div className="min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
      <div className="flex flex-col gap-4 min-[900px]:sticky min-[900px]:top-[120px] min-[900px]:col-span-6 min-[900px]:gap-5 min-[900px]:self-start">
        {intro}
        <div className="mt-10 hidden min-[900px]:block">
          <Dial lit={lit} size={300} className="max-w-full" />
        </div>
      </div>

      <div
        onMouseLeave={() => setActive(null)}
        className="mt-8 flex flex-col border-t-2 border-b border-t-ink border-b-rule min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:mt-1 min-[900px]:self-start"
      >
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
            onPointerDown={(event) => {
              lastPointer.current = event.pointerType;
            }}
            onClick={(event) => {
              if (lastPointer.current === "touch" && active !== i) {
                event.preventDefault();
                setActive(i);
              }
            }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`group grid grid-cols-[48px_minmax(0,1fr)_20px] items-start gap-4 py-6 no-underline transition-opacity duration-[250ms] ease-brand min-[900px]:grid-cols-[64px_minmax(0,460px)_24px] min-[900px]:items-center min-[900px]:justify-start min-[900px]:gap-7 min-[900px]:py-[30px] ${
              i > 0 ? "border-t border-rule" : ""
            } ${active === null || active === i ? "opacity-100" : "opacity-40"}`}
          >
            <Dial lit={service.slices} size={48} className="min-[900px]:size-16" />
            <span className="flex flex-col gap-2">
              <span className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink min-[900px]:text-[30px] min-[900px]:leading-[1.05] min-[900px]:tracking-[-0.03em]">
                {service.name}
              </span>
              <span className="max-w-[460px] text-[15px] leading-[1.5] text-ink min-[900px]:text-[16px]">
                {service.shortLine}
              </span>
              <Label as="span" className="min-[900px]:mt-1">
                {service.audience}
              </Label>
            </span>
            <ArrowRightIcon className="go-arrow mt-[5px] size-[18px] text-ink min-[900px]:mt-0 min-[900px]:size-5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
