import type { DominoContent, DominoInstitution, DominoService } from "@/types/content";

/** Servis sırası her kurumda aynı: Uygulama, Kart, Havale. */
export const DOMINO_SERVICES: DominoService[] = ["app", "card", "transfer"];

export type DominoState = "live" | "down" | "backup";

export interface DominoHit {
  institution: string;
  service: DominoService;
  state: Exclude<DominoState, "live">;
  /** Yedeğe geçtiyse yedeğin kimliği (P1, P2, proc2, dc2). */
  to?: string;
}

export interface DominoOutcome {
  /** Sönme sırası: kurum sırası, kurum içinde Uygulama, Kart, Havale. */
  hits: DominoHit[];
  institutions: number;
  countries: number;
  down: number;
  rerouted: number;
}

/** Kurumun sahip olduğu servisler (olmayan servis gösterilmez). */
export function servicesOf(institution: DominoInstitution): DominoService[] {
  return DOMINO_SERVICES.filter((service) => institution.deps[service]?.length);
}

/** Ağdaki toplam servis sayısı, veriden. */
export function totalServices(content: DominoContent): number {
  return content.institutions.reduce((sum, institution) => sum + servicesOf(institution).length, 0);
}

/**
 * Bir sağlayıcı düşünce ne olur. Servis, bağlı olduğu sağlayıcılardan biri
 * düşerse düşer; DORA modunda o servis için o sağlayıcıya yedek tanımlıysa
 * yedeğe geçer. Kurum etkilendi = en az bir servisi düştü; ülke etkilendi =
 * o ülkede etkilenen en az bir kurum var. Yedeğe geçen servis sayılmaz.
 */
export function runOutage(content: DominoContent, provider: string, dora: boolean): DominoOutcome {
  const hits: DominoHit[] = [];
  const hitInstitutions = new Set<string>();
  const hitCountries = new Set<string>();
  for (const institution of content.institutions) {
    for (const service of servicesOf(institution)) {
      if (!institution.deps[service]?.includes(provider)) continue;
      const backup = dora ? institution.backups.find((b) => b.service === service && b.from === provider) : undefined;
      if (backup) {
        hits.push({ institution: institution.id, service, state: "backup", to: backup.to });
      } else {
        hits.push({ institution: institution.id, service, state: "down" });
        hitInstitutions.add(institution.id);
        hitCountries.add(institution.country);
      }
    }
  }
  return {
    hits,
    institutions: hitInstitutions.size,
    countries: hitCountries.size,
    down: hits.filter((h) => h.state === "down").length,
    rerouted: hits.filter((h) => h.state === "backup").length,
  };
}
