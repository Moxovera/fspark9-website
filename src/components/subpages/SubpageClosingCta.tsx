import BookingCta from "@/components/booking/BookingCta";
import type { SubpageCta } from "@/types/content";

interface SubpageClosingCtaProps {
  content: SubpageCta;
}

/**
 * dc.html: page.hasCta (satır 1018-1026) — /services, /work,
 * /work/insha, /work/ruut, /story paylaşıyor. Home'un kendi ClosingCta'sının
 * kısaltılmış hali (alıntı/attribution yok). Buton BookingCta ile aynı
 * desen — dc.html'de onClick={openBooking}, sayfaya gitmiyor.
 */
export default function SubpageClosingCta({ content }: SubpageClosingCtaProps) {
  const { headline, body, ctaLabel } = content;

  return (
    <section className="bg-navy px-7 pt-[104px] pb-[112px]">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-[26px] max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.08] font-medium text-ivory">
          {headline}
        </h2>
        <p className="mb-[38px] max-w-[60ch] text-[1.06rem] leading-[1.68] text-ivory/74">
          {body}
        </p>
        <BookingCta className="bg-bronze px-8 py-[18px] font-sans text-base font-medium text-ivory transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(166,124,61,0.4)]">
          {ctaLabel}
        </BookingCta>
      </div>
    </section>
  );
}
