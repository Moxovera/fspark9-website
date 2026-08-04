import Hero from "@/components/sections/Hero";
import Framework from "@/components/sections/Framework";
import ProofStrip from "@/components/sections/ProofStrip";
import { en } from "@/content/en";
import { tr } from "@/content/tr";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = locale === "tr" ? tr : en;

  return (
    <main>
      <Hero content={content.hero} />
      <Framework steps={content.framework.steps} />
      <ProofStrip content={content.proofStrip} />
    </main>
  );
}
