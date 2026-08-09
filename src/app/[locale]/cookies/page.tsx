import SubpageHero from "@/components/subpages/SubpageHero";
import LegalBlocks from "@/components/subpages/LegalBlocks";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LEGAL_PAGE_QUERY, toLegalPage } from "@/sanity/lib/queries";
import type { LEGAL_PAGE_QUERYResult } from "@/sanity/types";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const result = await sanityFetch<LEGAL_PAGE_QUERYResult>({
    query: LEGAL_PAGE_QUERY,
    params: { locale, slug: "cookies" },
    tags: ["legalPage:cookies"],
  });
  const page = toLegalPage(result);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <LegalBlocks blocks={page.blocks} />
    </main>
  );
}
