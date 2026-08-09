import SubpageHero from "@/components/subpages/SubpageHero";
import CalEmbed from "@/components/booking/CalEmbed";
import { en, tr } from "@/content/book";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_BOOKING_QUERY, toBookingSection } from "@/sanity/lib/queries";
import type { SITE_BOOKING_QUERYResult } from "@/sanity/types";

/**
 * dc.html: page.hasBooking (satır 979-1003). Kart çerçevesi (üst bar
 * "cal.com / mburakdikmen / quick-chat" + "30 min") dc.html'de HİÇ
 * templated değil, doğrudan literal metin — bu yüzden burada da sabit
 * (calLink'ten türetilmiyor, dc.html'in kendi davranışıyla tutarlı).
 * Sağdaki sahte gün/saat ızgarası BookingOverlay.tsx'teki gibi gerçek
 * <Cal> inline embed'iyle değişti — overlay'in backdrop/×/stopPropagation
 * chrome'u burada yok, bu tam sayfa, modal değil.
 */
export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;
  const settings = locale === "tr" ? trSettings : enSettings;

  const bookingResult = await sanityFetch<SITE_BOOKING_QUERYResult>({
    query: SITE_BOOKING_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const booking = toBookingSection(bookingResult);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <section className="bg-ivory px-7 pt-20 pb-24">
        <div className="mx-auto max-w-[900px]">
          <div className="border border-navy/[0.14] bg-[#fffdf7] p-[clamp(24px,3vw,40px)]">
            <div className="mb-[26px] flex flex-wrap items-center justify-between gap-5 border-b border-navy/10 pb-[18px]">
              <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                cal.com / mburakdikmen / quick-chat
              </p>
              <p className="font-mono text-xs text-bronze">30 min</p>
            </div>
            <div className="min-h-[600px]">
              <CalEmbed calLink={booking.calLink} redirectTo="/thank-you" />
            </div>
          </div>
          <p className="mt-6 text-[15px] text-muted">{page.underCal}</p>
        </div>
      </section>
    </main>
  );
}
