"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

// Tek hedefli kampanya sayfaları: kendi header'ları var, site menüsü,
// mobil randevu çubuğu ve Spark bülten kutusu gösterilmez. Footer kalır.
const BARE_ROUTES = new Set<string>(["/uk-sme"]);

/** Sitenin çerçeve parçalarını yalın sayfalarda çizmez. */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.has(pathname)) return null;
  return <>{children}</>;
}
