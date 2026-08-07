import SubpageHero from "@/components/subpages/SubpageHero";
import LegalBlocks from "@/components/subpages/LegalBlocks";
import { en, tr } from "@/content/legal/privacy";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";

export default async function PrivacyPage({
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
      <LegalBlocks blocks={page.blocks} />
    </main>
  );
}
