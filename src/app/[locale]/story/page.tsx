import SubpageHero from "@/components/subpages/SubpageHero";
import ProseBlock from "@/components/subpages/ProseBlock";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { en, tr } from "@/content/story";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;
  const settings = locale === "tr" ? trSettings : enSettings;

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <ProseBlock media={page.media} blocks={page.prose} />
      <SubpageClosingCta content={settings.subpageCta} />
    </main>
  );
}
