import { Link } from "@/i18n/navigation";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import LegalBlocks from "@/components/subpages/LegalBlocks";
import type { LegalBlock, LegalPage, NavHref, SiteChrome } from "@/types/content";

interface LegalPageViewProps {
  page: LegalPage;
  legal: SiteChrome["legal"];
  current: NavHref;
}

/**
 * Yasal sayfa şablonu (brief v4 §7.8, board Legal / LegalM): açık header,
 * geri linki, dört gerçek link olan sekmeler (geçerli olan kalın ve 2px
 * alt çizgili), H1 (hero.title) ve yanında "Last updated", sonra bloklar.
 * NextStep yok, footer var. Metin Sanity'deki legalPage'den, hiçbir
 * kelimesi değişmiyor: hero.intro H1'in altında, "Last updated" alanı
 * bloklardan alınıp başlık satırına taşınıyor.
 */
export default function LegalPageView({ page, legal, current }: LegalPageViewProps) {
  // "Last updated" her sayfada ilk blok (etiketli alan); varsa başlık satırına taşınır.
  const updatedIndex = page.blocks[0]?.type === "field" && page.blocks[0].label ? 0 : -1;
  const updated = updatedIndex === 0 ? page.blocks[0] : undefined;
  const blocks: LegalBlock[] = updated ? page.blocks.filter((_, i) => i !== updatedIndex) : page.blocks;
  const updatedText = updated && updated.type === "field" ? `${updated.label} ${updated.lines.join(" ")}` : null;

  return (
    <main className="bg-paper pt-16 min-[900px]:pt-[84px]">
      <section className="flex flex-col gap-7 px-5 pt-6 pb-[72px] min-[900px]:gap-8 min-[900px]:px-8 min-[900px]:pt-[72px] min-[900px]:pb-[136px] min-[1280px]:px-16">
        <BackLink href="/" label={legal.backLabel} ground="paper" className="-mb-2" />
        <nav aria-label={legal.tabsLabel} className="flex flex-wrap gap-x-5 border-b border-rule min-[900px]:gap-x-8">
          {legal.tabs.map((tab) => {
            const active = tab.href === current;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`-mb-px inline-flex min-h-11 items-center border-b-2 text-[15px] leading-[normal] no-underline min-[900px]:text-[16px] ${
                  active ? "border-ink font-bold text-ink" : "border-transparent font-medium text-stone"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-7 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="m-0 font-display text-[44px] leading-[normal] font-extrabold tracking-[-0.04em] text-balance text-ink min-[900px]:text-[clamp(56px,6.112vw,88px)] min-[900px]:leading-[0.95]">
              {page.hero.title}
            </h1>
            {page.hero.intro && <p className="m-0 max-w-[640px] text-[17px] leading-[1.6] text-stone">{page.hero.intro}</p>}
          </div>
          {updatedText && <Label className="min-[900px]:flex-none">{updatedText}</Label>}
        </div>
        <div className="min-[900px]:mt-6">
          <LegalBlocks blocks={blocks} />
        </div>
      </section>
    </main>
  );
}
