import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Dial from "@/components/brand/Dial";
import GoButton from "@/components/brand/GoButton";
import Label from "@/components/brand/Label";
import { en, tr } from "@/content/thank-you";
import { EIGHT_SLICES } from "@/lib/dial";

// /thank-you (brief v4 §7.8, board ThankYou / ThankYouM). Randevu
// tamamlanınca CalEmbed buraya yönlendiriyor. noindex, sitemap dışında.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;
  return { title: page.seo.title, robots: { index: false, follow: false } };
}

export default async function ThankYouRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;

  return (
    <main className="bg-paper pt-16 min-[900px]:pt-[84px]">
      <section className="px-5 pt-10 pb-[72px] min-[900px]:px-8 min-[900px]:pt-[112px] min-[900px]:pb-[136px] min-[1280px]:px-16">
        <div className="flex flex-col gap-[22px] min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-6">
          <div className="flex flex-col gap-[22px] min-[900px]:col-span-8 min-[900px]:gap-7">
            <Label>{page.label}</Label>
            <h1 className="m-0 font-display text-[44px] leading-[0.96] font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[clamp(64px,6.112vw,88px)]">
              {page.heading}
            </h1>
            {page.paragraphs.map((text) => (
              <p key={text} className="m-0 max-w-[640px] text-[17px] leading-[1.6] text-ink min-[900px]:text-[19px]">
                {text}
              </p>
            ))}
            <div className="mt-1 border-t-2 border-b border-t-ink border-b-rule min-[900px]:mt-6">
              {page.links.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center justify-between gap-4 py-[18px] no-underline transition-colors duration-[160ms] ease-brand hover:bg-white ${i > 0 ? "border-t border-rule" : ""}`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[20px] leading-[normal] font-extrabold tracking-[-0.02em] text-ink min-[900px]:text-[26px]">
                      {link.label}
                    </span>
                    <Label as="span">{link.sublabel}</Label>
                  </span>
                  <GoButton size={48} className="max-[900px]:size-11" />
                </Link>
              ))}
            </div>
          </div>
          <div className="order-first min-[900px]:order-none min-[900px]:col-span-3 min-[900px]:col-start-10 min-[900px]:justify-self-end">
            <Dial lit={EIGHT_SLICES} size={96} className="min-[900px]:size-[280px]" />
          </div>
        </div>
      </section>
    </main>
  );
}
