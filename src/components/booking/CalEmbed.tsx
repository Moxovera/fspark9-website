"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useRouter } from "@/i18n/navigation";

// router.push'un href parametresi Link'in href'iyle aynı GÖRÜNEN ama
// aslında hafifçe farklı bir union (query alanı QueryParams vs
// ParsedUrlQueryInput) — bkz. Header.tsx'teki LinkHref deseni, burada
// router.push'a özel türetildi.
type PushHref = Parameters<ReturnType<typeof useRouter>["push"]>[0];

interface CalEmbedProps {
  calLink: string;
  // Verilirse, rezervasyon tamamlanınca (Cal'in bookingSuccessfulV2
  // event'i) buraya yönlendirilir. Verilmezse hiç dinleyici kurulmaz —
  // mevcut davranış (Cal'in kendi iframe içi onay ekranı) korunur.
  redirectTo?: string;
  // BookingOverlay.tsx gibi kendi açık/kapalı state'ini tutan çağıranlar
  // için — yönlendirmeden HEMEN önce çağrılır (overlay kapanıp state
  // temizlensin, sonra sayfa değişsin). /book sayfası gibi zaten kendi
  // başına bir sayfa olan çağıranlarda gerekmez.
  onBookingSuccessful?: () => void;
}

/**
 * @calcom/embed-react'in <Cal> bileşeni kendi içinde hook kullanıyor
 * (useRef vb.) — server component içine doğrudan konursa SSR'da patlıyor
 * ("useRef is not a function"). BookingOverlay.tsx zaten tamamen client
 * olduğu için bu sorunu yaşamıyordu; /book sayfası server olduğu için bu
 * küçük client-leaf gerekiyor — Reveal/MediaSlider'daki aynı desen.
 *
 * redirectTo: Cal.com'un resmi embed event'i (bookingSuccessfulV2, eski
 * bookingSuccessful artık deprecated) dinleniyor. Yönlendirme mantığı
 * kasıtlı olarak burada, çağıran taraflarda değil — /book/page.tsx server
 * component olduğu için bir callback/closure prop'u inşa edip geçiremez;
 * bunun yerine sadece serileştirilebilir bir string (`redirectTo`) alıp
 * router.push'u kendi içinde (zaten client olduğu için) çağırıyor.
 *
 * Bilinen, kabul edilen bir pürüz: Cal.com'un kendi GitHub issue'sunda
 * (calcom/cal.com#12499) doğrulandığı üzere, event'i dinleyip yönlendirme
 * yapıldığında Cal'in kendi "Booking Confirmed" ekranı iframe içinde çok
 * kısa bir an görünüyor, sonra yönlendirme devreye giriyor — embed'in
 * kendi onay ekranını bastıran resmi bir konfigürasyon yok.
 */
export default function CalEmbed({ calLink, redirectTo, onBookingSuccessful }: CalEmbedProps) {
  const router = useRouter();

  useEffect(() => {
    if (!redirectTo) return;

    // getCalApi() asenkron — cleanup, promise henüz çözülmeden (kullanıcı
    // hızlıca sayfadan ayrılırsa) tetiklenebilir. cancelled bayrağı, o
    // durumda dinleyicinin hiç kaydedilmemesini garanti ediyor.
    let cal: Awaited<ReturnType<typeof getCalApi>> | undefined;
    let cancelled = false;
    const handleBookingSuccessful = () => {
      onBookingSuccessful?.();
      router.push(redirectTo as PushHref);
    };

    getCalApi().then((api) => {
      if (cancelled) return;
      cal = api;
      cal("on", { action: "bookingSuccessfulV2", callback: handleBookingSuccessful });
    });

    return () => {
      cancelled = true;
      cal?.("off", { action: "bookingSuccessfulV2", callback: handleBookingSuccessful });
    };
  }, [redirectTo, onBookingSuccessful, router]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%" }}
      config={{ theme: "light" }}
    />
  );
}
