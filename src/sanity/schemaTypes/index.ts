import type { SchemaTypeDefinition } from "sanity";

import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import localeSlug from "./objects/localeSlug";
import statHighlight from "./objects/statHighlight";
import noteHighlight from "./objects/noteHighlight";
import seo from "./objects/seo";
import pageHero from "./objects/pageHero";
import legalBlockDiv from "./objects/legalBlockDiv";
import legalBlockHeading from "./objects/legalBlockHeading";
import legalBlockSubheading from "./objects/legalBlockSubheading";
import legalBlockBold from "./objects/legalBlockBold";
import legalBlockField from "./objects/legalBlockField";
import legalBlockList from "./objects/legalBlockList";
import legalBlockTable from "./objects/legalBlockTable";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import servicesPage from "./servicesPage";
import servicePage from "./servicePage";
import workPage from "./workPage";
import caseStudy from "./caseStudy";
import aboutPage from "./aboutPage";
import legalPage from "./legalPage";
import sparkSection from "./sparkSection";
import sparkFormat from "./sparkFormat";
import sparkEpisode from "./sparkEpisode";
import { sparkEpisodeBlockTypes } from "./sparkEpisodeBlocks";

/** Tek belgeli tipler: Studio'da liste değil doğrudan belge açılır, yeni oluşturulamaz. */
export const SINGLETONS = ["siteSettings", "homePage", "servicesPage", "workPage", "aboutPage", "sparkSection"] as const;

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeSlug,
    statHighlight,
    noteHighlight,
    seo,
    pageHero,
    legalBlockDiv,
    legalBlockHeading,
    legalBlockSubheading,
    legalBlockBold,
    legalBlockField,
    legalBlockList,
    legalBlockTable,
    siteSettings,
    homePage,
    servicesPage,
    servicePage,
    workPage,
    caseStudy,
    aboutPage,
    legalPage,
    sparkSection,
    sparkFormat,
    sparkEpisode,
    ...sparkEpisodeBlockTypes,
  ],
};
