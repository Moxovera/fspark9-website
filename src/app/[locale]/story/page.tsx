import SubpageHero from "@/components/subpages/SubpageHero";
import ProseBlock from "@/components/subpages/ProseBlock";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import { STORY_PAGE_QUERY, toStoryPage } from "@/sanity/lib/queries";
import type { STORY_PAGE_QUERYResult } from "@/sanity/types";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const result = await sanityFetch<STORY_PAGE_QUERYResult>({
    query: STORY_PAGE_QUERY,
    params: { locale },
    tags: ["storyPage"],
  });
  const page = toStoryPage(result);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <ProseBlock media={page.media} blocks={page.prose} />
      <SubpageClosingCta content={settings.subpageCta} />
    </main>
  );
}
