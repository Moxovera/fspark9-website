import HomeScrollMemory from "@/components/ui/HomeScrollMemory";
import CanvasField from "@/components/effects/CanvasFieldLoader";
import Hero from "@/components/sections/Hero";
import Framework from "@/components/sections/Framework";
import ProofStrip from "@/components/sections/ProofStrip";
import Audience from "@/components/sections/Audience";
import Comparison from "@/components/sections/Comparison";
import Approach from "@/components/sections/Approach";
import Testimonials from "@/components/sections/Testimonials";
import Story from "@/components/sections/Story";
import Services from "@/components/sections/Services";
import Media from "@/components/sections/Media";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  HOME_HERO_QUERY,
  HOME_FRAMEWORK_QUERY,
  HOME_PROOF_STRIP_QUERY,
  HOME_SERVICES_QUERY,
  HOME_COMPARISON_QUERY,
  HOME_APPROACH_QUERY,
  HOME_AUDIENCE_QUERY,
  HOME_STORY_QUERY,
  HOME_TESTIMONIALS_QUERY,
  HOME_MEDIA_QUERY,
  toHero,
  toFramework,
  toProofStrip,
  toServicesSection,
  toComparisonTable,
  toApproachSection,
  toAudienceSection,
  toStorySection,
  toTestimonialSection,
  toMediaSection,
} from "@/sanity/lib/queries";
import type {
  HOME_HERO_QUERYResult,
  HOME_FRAMEWORK_QUERYResult,
  HOME_PROOF_STRIP_QUERYResult,
  HOME_SERVICES_QUERYResult,
  HOME_COMPARISON_QUERYResult,
  HOME_APPROACH_QUERYResult,
  HOME_AUDIENCE_QUERYResult,
  HOME_STORY_QUERYResult,
  HOME_TESTIMONIALS_QUERYResult,
  HOME_MEDIA_QUERYResult,
} from "@/sanity/types";

// Familiar, CaseStudies, Process, Faq, ClosingCta bu geçişte YOK — bu
// bölümlerin Sanity şeması henüz yazılmadı (bkz. önceki aşamadaki kapsam
// listesi). Şemaları yazılınca buraya eklenecekler.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    heroResult,
    frameworkResult,
    proofStripResult,
    servicesResult,
    comparisonResult,
    approachResult,
    audienceResult,
    storyResult,
    testimonialsResult,
    mediaResult,
  ] = await Promise.all([
    sanityFetch<HOME_HERO_QUERYResult>({
      query: HOME_HERO_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_FRAMEWORK_QUERYResult>({
      query: HOME_FRAMEWORK_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_PROOF_STRIP_QUERYResult>({
      query: HOME_PROOF_STRIP_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_SERVICES_QUERYResult>({
      query: HOME_SERVICES_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_COMPARISON_QUERYResult>({
      query: HOME_COMPARISON_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_APPROACH_QUERYResult>({
      query: HOME_APPROACH_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_AUDIENCE_QUERYResult>({
      query: HOME_AUDIENCE_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_STORY_QUERYResult>({
      query: HOME_STORY_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_TESTIMONIALS_QUERYResult>({
      query: HOME_TESTIMONIALS_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_MEDIA_QUERYResult>({
      query: HOME_MEDIA_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
  ]);

  const hero = toHero(heroResult);
  const framework = toFramework(frameworkResult);
  const proofStrip = toProofStrip(proofStripResult);
  const services = toServicesSection(servicesResult);
  const comparison = toComparisonTable(comparisonResult);
  const approach = toApproachSection(approachResult);
  const audience = toAudienceSection(audienceResult);
  const story = toStorySection(storyResult);
  const testimonials = toTestimonialSection(testimonialsResult);
  const media = toMediaSection(mediaResult);

  return (
    <main>
      <HomeScrollMemory locale={locale} />
      <CanvasField />
      <Hero content={hero} />
      <Framework steps={framework.steps} />
      <ProofStrip content={proofStrip} />
      <Audience content={audience} />
      <Comparison content={comparison} />
      <Approach content={approach} />
      <Testimonials content={testimonials} />
      <Story content={story} />
      <Services content={services} />
      <Media content={media} />
    </main>
  );
}
