import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import NotFoundBlock from "@/components/blocks/NotFoundBlock";
import { en, tr } from "@/content/not-found";

// Site içi 404 (brief v4 §7.8): `[locale]` ağacının içindeki `notFound()`
// çağrıları (ör. bilinmeyen vaka slug'ı) buraya düşüyor. Dil belli, blok
// tek dilde, header ve footer duruyor. `not-found.tsx` params almıyor,
// dil next-intl'in getLocale()'inden (Next 15.5'te params undefined).

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const content = locale === "tr" ? tr : en;
  return (
    <main>
      <title>{content.seoTitle}</title>
      <NotFoundBlock content={content} underHeader />
    </main>
  );
}
