import type { Metadata } from "next";
import HomeScrollMemory from "@/components/ui/HomeScrollMemory";
import CanvasField from "@/components/effects/CanvasFieldLoader";
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
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  HOME_HERO_QUERY,
  HOME_FRAMEWORK_QUERY,
  HOME_PROOF_STRIP_QUERY,
  HOME_FAMILIAR_QUERY,
  HOME_SERVICES_QUERY,
  HOME_COMPARISON_QUERY,
  HOME_APPROACH_QUERY,
  HOME_AUDIENCE_QUERY,
  HOME_STORY_QUERY,
  HOME_TESTIMONIALS_QUERY,
  HOME_CASE_STUDIES_SECTION_QUERY,
  CASE_STUDIES_LIST_QUERY,
  HOME_PROCESS_QUERY,
  HOME_MEDIA_QUERY,
  HOME_FAQ_QUERY,
  HOME_CLOSING_CTA_QUERY,
  HOME_SEO_QUERY,
  toHero,
  toFramework,
  toProofStrip,
  toFamiliarSection,
  toServicesSection,
  toComparisonTable,
  toApproachSection,
  toAudienceSection,
  toStorySection,
  toTestimonialSection,
  toCaseStudiesSection,
  toCaseStudies,
  toProcessSection,
  toMediaSection,
  toFaqSection,
  toClosingCta,
  toHomeSeo,
} from "@/sanity/lib/queries";
import type {
  HOME_HERO_QUERYResult,
  HOME_FRAMEWORK_QUERYResult,
  HOME_PROOF_STRIP_QUERYResult,
  HOME_FAMILIAR_QUERYResult,
  HOME_SERVICES_QUERYResult,
  HOME_COMPARISON_QUERYResult,
  HOME_APPROACH_QUERYResult,
  HOME_AUDIENCE_QUERYResult,
  HOME_STORY_QUERYResult,
  HOME_TESTIMONIALS_QUERYResult,
  HOME_CASE_STUDIES_SECTION_QUERYResult,
  CASE_STUDIES_LIST_QUERYResult,
  HOME_PROCESS_QUERYResult,
  HOME_MEDIA_QUERYResult,
  HOME_FAQ_QUERYResult,
  HOME_CLOSING_CTA_QUERYResult,
  HOME_SEO_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoResult = await sanityFetch<HOME_SEO_QUERYResult>({
    query: HOME_SEO_QUERY,
    params: { locale },
    tags: ["homePage"],
  });
  const seo = toHomeSeo(seoResult);

  return {
    title: seo.title || "fspark9",
    description: seo.description || "Trust isn't marketed. It's built.",
    ...(seo.noIndex ? { robots: { index: false } } : {}),
    ...(seo.ogImage?.url
      ? { openGraph: { images: [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] } }
      : {}),
  };
}

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
    familiarResult,
    servicesResult,
    comparisonResult,
    approachResult,
    audienceResult,
    storyResult,
    testimonialsResult,
    caseStudiesSectionResult,
    caseStudiesListResult,
    processResult,
    mediaResult,
    faqResult,
    closingCtaResult,
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
    sanityFetch<HOME_FAMILIAR_QUERYResult>({
      query: HOME_FAMILIAR_QUERY,
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
    sanityFetch<HOME_CASE_STUDIES_SECTION_QUERYResult>({
      query: HOME_CASE_STUDIES_SECTION_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<CASE_STUDIES_LIST_QUERYResult>({
      query: CASE_STUDIES_LIST_QUERY,
      params: { locale },
      tags: ["caseStudy"],
    }),
    sanityFetch<HOME_PROCESS_QUERYResult>({
      query: HOME_PROCESS_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_MEDIA_QUERYResult>({
      query: HOME_MEDIA_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_FAQ_QUERYResult>({
      query: HOME_FAQ_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
    sanityFetch<HOME_CLOSING_CTA_QUERYResult>({
      query: HOME_CLOSING_CTA_QUERY,
      params: { locale },
      tags: ["homePage"],
    }),
  ]);

  const hero = toHero(heroResult);
  const framework = toFramework(frameworkResult);
  const proofStrip = toProofStrip(proofStripResult);
  const familiar = toFamiliarSection(familiarResult);
  const services = toServicesSection(servicesResult);
  const comparison = toComparisonTable(comparisonResult);
  const approach = toApproachSection(approachResult);
  const audience = toAudienceSection(audienceResult);
  const story = toStorySection(storyResult);
  const testimonials = toTestimonialSection(testimonialsResult);
  const caseStudies = toCaseStudiesSection(
    caseStudiesSectionResult,
    toCaseStudies(caseStudiesListResult),
  );
  const process = toProcessSection(processResult);
  const media = toMediaSection(mediaResult);
  const faq = toFaqSection(faqResult);
  const closingCta = toClosingCta(closingCtaResult);

  return (
    <main>
      <HomeScrollMemory locale={locale} />
      <CanvasField />
      <Hero content={hero} />
      <Framework steps={framework.steps} />
      <ProofStrip content={proofStrip} />
      <Familiar content={familiar} />
      <Audience content={audience} />
      <Comparison content={comparison} />
      <Approach content={approach} />
      <Testimonials content={testimonials} />
      <Story content={story} />
      <Services content={services} />
      <CaseStudies content={caseStudies} />
      <Process content={process} />
      <Media content={media} />
      <Faq content={faq} />
      <ClosingCta content={closingCta} />
    </main>
  );
}
