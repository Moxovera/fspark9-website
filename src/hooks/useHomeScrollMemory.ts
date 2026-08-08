"use client";

import { useEffect } from "react";

const STORAGE_KEY_PREFIX = "home-scroll-y";

/**
 * dc.html: goBackHome()'daki _homeScroll hack'inin (SPA'ya özel) React
 * karşılığı — gerçek route değişiminde JS state hayatta kalmıyor, bu
 * yüzden sessionStorage kullanılıyor.
 *
 * "Ayrılmadan hemen önce kaydet" yerine Home'dayken SÜREKLİ (rAF ile
 * kısılmış) scrollY yazılıyor — hangi yoldan ayrılırsa ayrılsın (Geri
 * linki, header'daki başka bir link, tarayıcının kendi geri tuşu),
 * sessionStorage'da zaten birkaç frame öncesine ait güncel değer duruyor.
 * Restore, Home her mount olduğunda bir kere çalışıyor (ilk ziyarette
 * sessionStorage boş olduğu için no-op, doğal olarak 0'da kalır).
 *
 * Anahtar locale'e göre ayrılıyor (home-scroll-y:en / :tr) — EN/TR Home
 * aynı düzende ama bunu garantiye almak ucuz.
 *
 * useEffect, useLayoutEffect DEĞİL — bilerek. Playwright'la ikisi de
 * ölçüldü: Next.js App Router'ın kendi "navigasyonda en üste kaydır"
 * davranışı da bir passive effect gibi çalışıyor ve TÜM layout effect'lerden
 * SONRA tetikleniyor. useLayoutEffect ile restore önce uygulanıyor, sonra
 * Next'in kendi sıfırlaması onu eziyordu — dönüşte scrollY hep 0'da
 * kalıyordu (tam bozulma, flash'tan çok daha kötü). useEffect Next'in
 * sıfırlamasından SONRA çalıştığı için doğru pozisyonu kalıcı olarak
 * kazanıyor — bedeli ~20-35ms'lik, gözle zar zor fark edilen bir "flash"
 * (scrollY kısa süre 0 görünüp sonra kaydedilen pozisyona atlıyor).
 * Doğruluk > pürüzsüzlük tercih edildi.
 */
export function useHomeScrollMemory(locale: string) {
  useEffect(() => {
    const key = `${STORAGE_KEY_PREFIX}:${locale}`;

    const saved = sessionStorage.getItem(key);
    if (saved !== null) {
      const y = Number(saved);
      if (Number.isFinite(y)) {
        window.scrollTo(0, y);
      }
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [locale]);
}
