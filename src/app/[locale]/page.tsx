import HomeScrollMemory from "@/components/ui/HomeScrollMemory";
import Hero from "@/components/sections/Hero";
import Framework from "@/components/sections/Framework";
import ProofStrip from "@/components/sections/ProofStrip";
import Familiar from "@/components/sections/Familiar";
import Audience from "@/components/sections/Audience";
import Comparison from "@/components/sections/Comparison";
import Approach from "@/components/sections/Approach";
import Testimonials from "@/components/sections/Testimonials";
import Story from "@/components/sections/Story";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Process from "@/components/sections/Process";
import Media from "@/components/sections/Media";
import Faq from "@/components/sections/Faq";
import ClosingCta from "@/components/sections/ClosingCta";
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
      <HomeScrollMemory locale={locale} />
      <Hero content={content.hero} />
      <Framework steps={content.framework.steps} />
      <ProofStrip content={content.proofStrip} />
      <Familiar content={content.familiar} />
      <Audience content={content.audience} />
      <Comparison content={content.comparison} />
      <Approach content={content.approach} />
      <Testimonials content={content.testimonials} />
      <Story content={content.story} />
      <Services content={content.services} />
      <CaseStudies content={content.caseStudies} />
      <Process content={content.process} />
      <Media content={content.media} />
      <Faq content={content.faq} />
      <ClosingCta content={content.closingCta} />
    </main>
  );
}
