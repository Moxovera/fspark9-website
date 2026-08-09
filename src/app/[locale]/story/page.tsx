import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import ProseBlock from "@/components/subpages/ProseBlock";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  STORY_PAGE_QUERY,
  toStoryPage,
  STORY_PAGE_SEO_QUERY,
  toStoryPageSeo,
  SITE_SEO_QUERY,
  toSiteSeo,
  SITE_SUBPAGE_CTA_QUERY,
  toSubpageCta,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  STORY_PAGE_QUERYResult,
  STORY_PAGE_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SITE_SUBPAGE_CTA_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<STORY_PAGE_SEO_QUERYResult>({
      query: STORY_PAGE_SEO_QUERY,
      params: { locale },
      tags: ["storyPage"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toStoryPageSeo(seoResult), toSiteSeo(siteSeoResult));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const [result, subpageCtaResult] = await Promise.all([
    sanityFetch<STORY_PAGE_QUERYResult>({
      query: STORY_PAGE_QUERY,
      params: { locale },
      tags: ["storyPage"],
    }),
    sanityFetch<SITE_SUBPAGE_CTA_QUERYResult>({
      query: SITE_SUBPAGE_CTA_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);
  const page = toStoryPage(result);
  const subpageCta = toSubpageCta(subpageCtaResult);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <ProseBlock media={page.media} blocks={page.prose} />
      <SubpageClosingCta content={subpageCta} />
    </main>
  );
}
