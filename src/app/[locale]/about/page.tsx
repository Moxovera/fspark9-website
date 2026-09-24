import type { Metadata } from "next";
import BackLink from "@/components/brand/BackLink";
import CutHeadline from "@/components/brand/CutHeadline";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import PairAndResult from "@/components/blocks/PairAndResult";
import RingStage from "@/components/blocks/RingStage";
import { about } from "@/content/about";
import { nextStep } from "@/content/chrome";
import { EIGHT_SLICES } from "@/lib/dial";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 About (brief v4 §7.5, board About / AboutM). /story'nin yeni adı;
// /story 301'i next.config.ts'te.

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const paths = { en: getPathname({ href: "/about", locale: "en" }), tr: getPathname({ href: "/about", locale: "tr" }) };
  return toMetadata(about[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = about[locale];

  return (
    <main>
      <RingStage
        portraitAlt={content.portraitAlt}
        textClassName="gap-5 pt-6 min-[900px]:gap-8 min-[900px]:pt-[120px]"
        ringClassName="mt-8"
      >
        <BackLink href="/" label={content.backLabel} ground="ink" className="-mb-2" />
        <Label ground="ink">{content.label}</Label>
        <CutHeadline
          headlineSentences={content.hero.headlineSentences}
          cutWord={content.hero.cutWord}
          className="m-0 font-display text-[40px] leading-[0.98] font-extrabold tracking-[-0.04em] text-paper min-[600px]:text-[52px] min-[900px]:text-[clamp(60px,5.556vw,80px)] min-[900px]:leading-[0.96]"
        />
      </RingStage>

      <PairAndResult
        pair={content.pair}
        result={content.result}
        slices={EIGHT_SLICES}
        variant="about"
        footer={
          <div className="mt-2 flex flex-col gap-2 border-t-2 border-ink pt-4 min-[900px]:mt-6 min-[900px]:flex-row min-[900px]:items-baseline min-[900px]:gap-8 min-[900px]:pt-5">
            <Label strong className="min-[900px]:w-[140px] min-[900px]:flex-none">
              {content.whyNine.label}
            </Label>
            <p className="m-0 font-display text-[19px] leading-[1.3] font-bold tracking-[-0.015em] text-ink min-[900px]:text-[22px]">
              {content.whyNine.text}
            </p>
          </div>
        }
      />

      <NextStep content={nextStep[locale]} />
    </main>
  );
}
