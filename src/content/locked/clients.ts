import type { Locale, LockedGateContent } from "@/types/content";

export interface LockedClient {
  defaultLocale: Locale;
  // Tek dilli raporda (Tahsildar) şifre ekranında dil düğmesi yok ve
  // ?lang= yok sayılır (resolveLockedState bu listeye göre süzer).
  locales: readonly Locale[];
  passwordEnv: string;
  title: Partial<Record<Locale, string>>;
  // Gate boilerplate, not the report itself (see src/content/locked/<slug>/
  // for the actual report content).
  gate: Partial<Record<Locale, LockedGateContent>>;
  // "Birlikte çalışmak" sayfası. Verilmezse var (Fuzul); false ise
  // /locked/<slug>/working-together 404 döner.
  workingTogether?: boolean;
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
  tahsildar: {
    defaultLocale: "tr",
    locales: ["tr"],
    passwordEnv: "LOCKED_TAHSILDAR_PASSWORD",
    title: { tr: "Zinciri hızlandırmak" },
    workingTogether: false,
    gate: {
      tr: {
        title: "Bu rapor Tahsildar için özel olarak hazırlandı.",
        text: "Devam etmek için size iletilen şifreyi girin.",
        label: "Şifre",
        btn: "Raporu aç",
        err: "Şifre hatalı. Lütfen tekrar deneyin.",
      },
    },
  },
} as const satisfies Record<string, LockedClient>;

export type LockedClientSlug = keyof typeof lockedClients;

export function getLockedClient(slug: string): LockedClient | null {
  if (slug in lockedClients) {
    return lockedClients[slug as LockedClientSlug];
  }
  return null;
}
