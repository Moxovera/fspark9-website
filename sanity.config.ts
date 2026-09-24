"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { SINGLETONS, schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const singletons = new Set<string>(SINGLETONS);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    ...schema,
    // Tekil belgeler "yeni oluştur" menüsünde görünmesin.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Tekil belgeler silinemesin ve kopyalanamasın.
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType) ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action)) : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
