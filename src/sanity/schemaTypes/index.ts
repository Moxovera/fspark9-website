import type { SchemaTypeDefinition } from "sanity";
import siteSettings from "./siteSettings";
import homePage from "./homePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage],
};
