import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import CaseDetail from "@/components/subpages/CaseDetail";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { en as enHome, siteSettings as enSettings } from "@/content/en";
import { tr as trHome, siteSettings as trSettings } from "@/content/tr";

const SLUGS = ["insha", "ruut"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

/**
 * dc.html: page.hasCases (satır 822-886) — pageKey caseInsha/caseRuut
 * için `page.cases` tek elemanlı ([t.cases[0]] / [t.cases[1]], satır
 * 2383), döngü değil. Hero title zaten `item.name`'le birebir aynı,
 * ayrı bir alan taşımıyor — sadece eyebrow/intro CaseStudy'ye eklendi
 * (detailEyebrow/detailIntro).
 */
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const home = locale === "tr" ? trHome : enHome;
  const settings = locale === "tr" ? trSettings : enSettings;
  const item = home.caseStudies.items.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <SubpageHero
        hero={{ eyebrow: item.detailEyebrow, title: item.name, intro: item.detailIntro }}
        backLabel={settings.backLabel}
        backHref="/work"
      />
      <CaseDetail item={item} />
      <SubpageClosingCta content={settings.subpageCta} />
    </main>
  );
}
