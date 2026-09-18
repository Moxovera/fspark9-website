import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { en, tr } from "@/content/not-found";

// `experimental.globalNotFound` (next.config.ts) sadece hiçbir route'a
// eşleşmeyen (framework seviyesi "no route matched") URL'leri
// yakalıyor — `[locale]/spark/.../page.tsx` gibi eşleşen bir dinamik
// route İÇİNDEN çağrılan `notFound()` bu kapsama girmiyor, en yakın
// `not-found.tsx` sınırını arıyor. Bu segment ağacında öyle bir dosya
// olmadığı için Next.js kendi çıplak varsayılan 404'üne düşüyordu
// (kullanıcı geri bildirimi, 18 Eylül 2026 — LocaleSwitcher'ın Spark
// format/episode sayfalarında dil değiştirirken ürettiği geçersiz
// URL'in ikinci belirtisi, bkz. SparkAltSlugContext.tsx). Bu dosya o
// boşluğu dolduruyor — `[locale]/layout.tsx`'in içinde render edildiği
// için Header/Footer chrome'u koruyor (global-not-found.tsx'in aksine,
// o BİLEREK chrome'suz, bkz. o dosyanın yorumu — burası site içi bir
// ölü linke düşüyor, chrome'un kalması daha doğru).
// `not-found.tsx` özel dosyası, aynı segment'teki `page.tsx`/`layout.tsx`'in
// aksine `params` PROP'U ALMIYOR (Next.js 15.5.22'de denendi, `params`
// undefined geliyor) — locale next-intl'in kendi request-scoped
// `getLocale()`'i üzerinden okunuyor, route params'tan değil.
export default async function LocaleNotFound() {
  const locale = await getLocale();
  const copy = locale === "tr" ? tr : en;

  return (
    <main className="flex min-h-[60svh] items-center bg-navy px-7 py-[120px]">
      <div className="mx-auto max-w-[1000px]">
        <Image
          src="/assets/symbol-reversed.svg"
          alt=""
          width={64}
          height={100}
          className="mb-10 h-16 w-auto opacity-80"
        />
        <h1 className="mb-7 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] font-medium text-ivory">
          {copy.title}
        </h1>
        <Link
          href="/"
          className="inline-block border-b border-bronze/45 pb-1 font-mono text-sm tracking-[0.06em] text-ivory"
        >
          {copy.linkLabel}
        </Link>
      </div>
    </main>
  );
}
