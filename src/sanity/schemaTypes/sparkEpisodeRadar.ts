import { defineField, type FieldDefinition } from "sanity";

// On the Radar Nº 01 (finmid): dördüncü şablon, `radar`. Bu alan
// sparkEpisode'da "Radar" sekmesinde, sadece layout "radar" iken görünür.
// Bölümün gövdesi (kutular, hamleler, kullanım örneği, hesap makinesi,
// iki dildeki bütün metin, kaynaklar) tek JSON; şekli src/types/content.ts'teki
// RadarBody, aynası src/content/radar/<slug>.json. Sayı, şirket adı (subject),
// kanca ve SEO belgenin kendi alanlarından gelir; şehir ve ülke city/country'den.
// Metinde "**x**" kalın, "[n]" kaynak listesindeki n'inci kaynağa dipnottur.

const json = (value: unknown) => {
  if (typeof value !== "string" || value.trim() === "") return true;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return "Geçerli bir JSON değil.";
  }
};

/** sparkEpisode'un radar alanları (layout "radar"). */
export const radarFields: FieldDefinition[] = [
  defineField({
    name: "radarBody",
    title: "Radar body (JSON)",
    type: "text",
    rows: 30,
    description: "Bölümün tek JSON'u (RadarBody). Seed'den yazılır; metin düzeltmeleri için JSON içinde ilgili cümle değiştirilir.",
    validation: (r) => r.custom(json),
  }),
];
