import Label from "@/components/brand/Label";
import ServicePicker from "@/components/home/ServicePicker";
import type { HomeContent, ServiceSummary } from "@/types/content";

interface FourServicesProps {
  content: HomeContent["fourServices"];
  services: ServiceSummary[];
}

/**
 * Four services (board Main #services / HomeMobile). Metin server'da,
 * kadran ve satırlar ServicePicker'da. Ana sayfa ve /services aynı bloğu
 * kullanıyor (brief v4 §7.6).
 */
export default function FourServices({ content, services }: FourServicesProps) {
  return (
    <section className="bg-paper px-5 py-16 min-[900px]:px-8 min-[900px]:py-[136px] min-[1280px]:px-16">
      <ServicePicker
        services={services}
        intro={
          <>
            <Label>{content.label}</Label>
            <h2 className="m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[56px] min-[900px]:leading-none">
              {content.heading}
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink min-[900px]:max-w-[420px]">{content.intro}</p>
          </>
        }
      />
    </section>
  );
}
