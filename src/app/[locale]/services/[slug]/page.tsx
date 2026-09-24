import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import PageOpening from "@/components/blocks/PageOpening";
import IntroText from "@/components/blocks/IntroText";
import StepTiles from "@/components/services/StepTiles";
import OtherServices from "@/components/services/OtherServices";
import ServiceClose from "@/components/services/ServiceClose";
import { getChrome, getServicePages } from "@/sanity/lib/content";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 hizmet sayfası (brief v4 §7.3, board ServiceZTL / ServiceZTLM).
// İçerik Sanity servicePage belgelerinden, ortak etiketler servicesPage'ten.

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateStaticParams() {
  const servicePages = await getServicePages();
  return routing.locales.flatMap((locale) => servicePages[locale].map(({ slug }) => ({ locale, slug })));
}

async function find(locale: Locale, slug: string) {
  return (await getServicePages())[locale].find((page) => page.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await find(locale, slug);
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
  setRequestLocale(locale);
  const page = await find(locale, slug);
  if (!page) notFound();
  const { chrome, services } = (await getChrome())[locale];
  const summary = services.find((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug);
  const path = getPathname({ href: { pathname: "/services/[slug]", params: { slug } }, locale });
  const name = summary?.name ?? page.opening.label;

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, chrome, [
            { name: chrome.servicesLabel, path: getPathname({ href: "/services", locale }) },
            { name, path },
          ]),
          serviceJsonLd(name, page.seo.description, path),
        ]}
      />
      <PageOpening
        backHref="/"
        backLabel={page.backLabel}
        label={page.opening.label}
        heading={page.opening.heading}
        slices={summary?.slices}
      />
      <IntroText text={page.opening.intro} />
      <StepTiles label={page.stepsLabel} steps={page.steps} />
      <ServiceClose label={page.keepLabel} text={page.keep} ctaLabel={page.ctaLabel} />
      <OtherServices label={page.otherServicesLabel} services={others} />
    </main>
  );
}
