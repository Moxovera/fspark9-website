import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceOpening from "@/components/services/ServiceOpening";
import StepTiles from "@/components/services/StepTiles";
import OtherServices from "@/components/services/OtherServices";
import ServiceClose from "@/components/services/ServiceClose";
import { servicePages } from "@/content/services";
import { services } from "@/content/chrome";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 hizmet sayfası (brief v4 §7.3, board ServiceZTL / ServiceZTLM).
// Metin src/content/services.ts'ten, Sanity pass'e kadar statik.

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => servicePages[locale].map(({ slug }) => ({ locale, slug })));
}

function find(locale: Locale, slug: string) {
  return servicePages[locale].find((page) => page.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = find(locale, slug);
  if (!page) return {};
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const href = { pathname: "/services/[slug]" as const, params: { slug } };
  const paths = { en: getPathname({ href, locale: "en" }), tr: getPathname({ href, locale: "tr" }) };
  return toMetadata(page.seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const page = find(locale, slug);
  if (!page) notFound();
  const summary = services[locale].find((s) => s.slug === slug);
  const others = services[locale].filter((s) => s.slug !== slug);

  return (
    <main>
      <ServiceOpening
        backHref="/"
        backLabel={page.backLabel}
        label={page.opening.label}
        heading={page.opening.heading}
        slices={summary?.slices}
      />
      <section className="bg-paper px-5 pt-14 pb-6 min-[900px]:px-8 min-[900px]:pt-24 min-[1280px]:px-16">
        <div className="min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
          <p className="m-0 text-[20px] leading-[1.5] text-ink min-[900px]:col-span-8 min-[900px]:max-w-[640px] min-[900px]:text-[26px] min-[900px]:leading-[1.45] min-[900px]:tracking-[-0.005em]">
            {page.opening.intro}
          </p>
        </div>
      </section>
      <StepTiles label={page.stepsLabel} steps={page.steps} />
      <OtherServices label={page.otherServicesLabel} services={others} />
      <ServiceClose label={page.keepLabel} text={page.keep} ctaLabel={page.ctaLabel} />
    </main>
  );
}
