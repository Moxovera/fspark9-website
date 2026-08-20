import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import type { FrameworkStep } from "@/types/content";
import type { ComponentProps } from "react";

interface FrameworkProps {
  steps: FrameworkStep[];
}

// Kart yüzeyi tek bir sabit stilde — marka kuralı sayfa başına tek aksan
// rengine izin verdiği için varyant (gradient/renk seçimi) yok. Referans
// bileşenindeki cva "gradient" varyantı bu yüzden düşürüldü: tutacak
// varyant kalmayınca cva sabit bir sınıf dizesini fonksiyona sarmaktan
// başka iş yapmıyordu. İleride gerçek bir varyant gerekirse bu sabit
// doğrudan cva'ya çevrilebilir.
const cardClassName =
  "framework-card flex h-full flex-col rounded-[20px] border border-navy bg-ivory p-8 " +
  "focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2";

// next-intl'in Link'i tipli rota kullanıyor (düz string kabul etmiyor),
// bu yüzden href tipi doğrudan Link'ten türetiliyor.
interface FrameworkCardProps {
  step: number;
  label: string;
  description: string;
  href: ComponentProps<typeof Link>["href"];
}

// Hover'daki kalkma (translateY -4px + scale 1.03) saf CSS ile
// (.framework-card:hover, globals.css). CLAUDE.md harici animasyon
// kütüphanesi kurmayı yasakladığı için referanstaki framer-motion
// variant'ı CSS geçişine çevrildi — görsel sonuç aynı, bileşen de
// server component olarak kalıyor ('use client' sınırı gerekmiyor).
function FrameworkCard({ step, label, description, href }: FrameworkCardProps) {
  return (
    <Link href={href} className={cardClassName}>
      <span className="font-mono text-[13px] tracking-[0.18em] text-bronze">
        {String(step).padStart(2, "0")}
      </span>
      <span aria-hidden className="mt-4 block h-0.5 w-8 bg-bronze" />
      <h3 className="font-display mt-7 text-[1.75rem] leading-[1.2] font-bold text-navy">
        {label}
      </h3>
      <p className="mt-3.5 text-[15px] leading-[1.65] text-muted">
        {description}
      </p>
    </Link>
  );
}

export default function Framework({ steps }: FrameworkProps) {
  return (
    <section className="border-t border-bronze/45 bg-ivory px-7 pt-[104px] pb-[112px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.id} className="h-full">
            <FrameworkCard
              step={i + 1}
              label={step.label}
              description={step.description}
              href="/services"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
