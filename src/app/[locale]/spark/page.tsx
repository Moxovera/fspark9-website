import SubpageHero from "@/components/subpages/SubpageHero";
import { en, tr } from "@/content/spark";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";

// İlk kurulum: içerik yok, sadece hero (bkz. BookPage aynı desen).
// Sonraki fazda gerçek içerik gelince SubpageHero'nun altına bölümler
// eklenecek.
export default async function SparkPage({
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
    </main>
  );
}
