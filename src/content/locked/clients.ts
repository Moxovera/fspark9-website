import type { Locale, LockedGateContent } from "@/types/content";

export interface LockedClient {
  defaultLocale: Locale;
  locales: Locale[];
  passwordEnv: string;
  title: Record<Locale, string>;
  // Gate boilerplate (not the report itself — see src/content/locked/fuzul/
  // for the actual report content).
  gate: Record<Locale, LockedGateContent>;
}

export const lockedClients = {
  fuzul: {
    defaultLocale: "tr",
    locales: ["tr", "en"],
    passwordEnv: "LOCKED_FUZUL_PASSWORD",
    title: { tr: "Evin Bankası Olmak", en: "The Bank for Home" },
    gate: {
      tr: {
        title: "Bu rapor Fuzul Katılım için özel olarak hazırlandı.",
        text: "Devam etmek için size iletilen şifreyi girin.",
        label: "Şifre",
        btn: "Raporu aç",
        err: "Şifre hatalı. Lütfen tekrar deneyin.",
      },
      en: {
        title: "This report was prepared exclusively for Fuzul Katılım.",
        text: "Enter the password you received to continue.",
        label: "Password",
        btn: "Open report",
        err: "Incorrect password. Please try again.",
      },
    },
  },
} as const satisfies Record<string, LockedClient>;

export type LockedClientSlug = keyof typeof lockedClients;

export function getLockedClient(slug: string) {
  if (slug in lockedClients) {
    return lockedClients[slug as LockedClientSlug];
  }
  return null;
}
