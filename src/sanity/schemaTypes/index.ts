import type { SchemaTypeDefinition } from "sanity";

import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import link from "./objects/link";
import hero from "./objects/hero";
import frameworkStep from "./objects/frameworkStep";
import framework from "./objects/framework";
import proofItem from "./objects/proofItem";
import proofStrip from "./objects/proofStrip";
import service from "./objects/service";
import servicesSection from "./objects/servicesSection";
import comparisonValue from "./objects/comparisonValue";
import comparisonRow from "./objects/comparisonRow";
import comparisonTable from "./objects/comparisonTable";
import approachBlock from "./objects/approachBlock";
import approachSection from "./objects/approachSection";
import audienceCard from "./objects/audienceCard";
import audienceSection from "./objects/audienceSection";
import storyMedia from "./objects/storyMedia";
import storySection from "./objects/storySection";
import testimonial from "./objects/testimonial";
import testimonialSection from "./objects/testimonialSection";
import mediaItem from "./objects/mediaItem";
import mediaSection from "./objects/mediaSection";
import bookingSection from "./objects/bookingSection";
import subpageCta from "./objects/subpageCta";
import legalBlockDiv from "./objects/legalBlockDiv";
import legalBlockHeading from "./objects/legalBlockHeading";
import legalBlockSubheading from "./objects/legalBlockSubheading";
import legalBlockBold from "./objects/legalBlockBold";
import legalBlockField from "./objects/legalBlockField";
import legalBlockList from "./objects/legalBlockList";
import legalBlockTable from "./objects/legalBlockTable";
import siteSettings from "./siteSettings";
import homePage from "./homePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    link,
    hero,
    frameworkStep,
    framework,
    proofItem,
    proofStrip,
    service,
    servicesSection,
    comparisonValue,
    comparisonRow,
    comparisonTable,
    approachBlock,
    approachSection,
    audienceCard,
    audienceSection,
    storyMedia,
    storySection,
    testimonial,
    testimonialSection,
    mediaItem,
    mediaSection,
    bookingSection,
    subpageCta,
    legalBlockDiv,
    legalBlockHeading,
    legalBlockSubheading,
    legalBlockBold,
    legalBlockField,
    legalBlockList,
    legalBlockTable,
    siteSettings,
    homePage,
  ],
};
