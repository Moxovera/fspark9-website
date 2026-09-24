import { Link } from "@/i18n/navigation";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import { ArrowRightIcon } from "@/components/icons";
import type { OtherServicesProps } from "@/types/content";

/** Diğer üç hizmete geçiş şeridi (board ServiceZTL / ServiceZTLM). */
export default function OtherServices({ label, services }: OtherServicesProps) {
  return (
    <section className="flex flex-col gap-4 bg-white px-5 pt-14 pb-16 min-[900px]:gap-6 min-[900px]:px-8 min-[900px]:py-[88px] min-[1280px]:px-16">
      <Label>{label}</Label>
      <div className="flex flex-col min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-x-6">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
            className="group flex items-center gap-[14px] border-t border-rule py-4 no-underline min-[900px]:gap-[18px] min-[900px]:border-t-2 min-[900px]:border-ink min-[900px]:py-[22px]"
          >
            <Dial lit={service.slices} size={36} className="min-[900px]:size-11" />
            <span className="flex-grow font-display text-[19px] leading-[normal] font-bold text-ink min-[900px]:text-[22px] min-[900px]:tracking-[-0.02em]">
              {service.name}
            </span>
            <ArrowRightIcon className="go-arrow size-4 text-ink min-[900px]:size-[18px]" />
          </Link>
        ))}
      </div>
    </section>
  );
}
