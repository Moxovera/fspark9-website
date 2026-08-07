"use client";

import Cal from "@calcom/embed-react";

interface CalEmbedProps {
  calLink: string;
}

/**
 * @calcom/embed-react'in <Cal> bileşeni kendi içinde hook kullanıyor
 * (useRef vb.) — server component içine doğrudan konursa SSR'da patlıyor
 * ("useRef is not a function"). BookingOverlay.tsx zaten tamamen client
 * olduğu için bu sorunu yaşamıyordu; /book sayfası server olduğu için bu
 * küçük client-leaf gerekiyor — Reveal/MediaSlider'daki aynı desen.
 */
export default function CalEmbed({ calLink }: CalEmbedProps) {
  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%" }}
      config={{ theme: "light" }}
    />
  );
}
