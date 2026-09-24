import type { Metadata } from "next";
import PageOpening from "@/components/blocks/PageOpening";
import IntroText from "@/components/blocks/IntroText";
import NextStep from "@/components/blocks/NextStep";
import CaseRow from "@/components/work/CaseRow";
import Reveal from "@/components/ui/Reveal";
import { cases, workPage } from "@/content/work";
import { nextStep } from "@/content/chrome";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 /work (brief v4 §7.4, board WorkList / WorkListM). Also şeridi yok.

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const paths = { en: getPathname({ href: "/work", locale: "en" }), tr: getPathname({ href: "/work", locale: "tr" }) };
  return toMetadata(workPage[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function WorkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = workPage[locale];

  return (
    <main>
      <PageOpening variant="work" backHref="/" backLabel={content.backLabel} label={content.label} heading={content.heading} />
      <IntroText text={content.lead} />
      <section className="bg-paper px-5 pt-8 pb-[72px] min-[900px]:px-8 min-[900px]:pt-14 min-[900px]:pb-[136px] min-[1280px]:px-16">
        <Reveal className="flex flex-col border-b border-rule">
          {cases[locale].map((item) => (
            <CaseRow key={item.slug} item={item} readLabel={content.readLabel} />
          ))}
        </Reveal>
      </section>
      <NextStep content={nextStep[locale]} />
    </main>
  );
}
