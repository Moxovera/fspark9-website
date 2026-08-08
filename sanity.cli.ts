import { defineCliConfig } from "sanity/cli";

// env.ts kullanılmıyor: CLI komutları (schema extract, typegen generate)
// .env.local'i yüklemeden sanity.cli.ts'i okuyor, env.ts'in throw eden
// assertValue'su bu komutları kırar. api alanı sadece `sanity deploy` gibi
// projeye bağlanan komutlarda gerekli, yerel schema/typegen için gerekmiyor.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "./src/sanity/types.ts",
  },
});
