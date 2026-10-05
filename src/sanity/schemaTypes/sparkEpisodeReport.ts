import { defineField, type FieldDefinition } from "sanity";

// Sektör raporları Nº 01 (Bauspar, prototip Spark/sector reports/
// fspark9-sektor-raporu-bauspar.html): rapor şablonu. Bu alan sparkEpisode'da
// "Report" sekmesinde, sadece layout "report" iken görünür. Raporun gövdesi
// (bölümler, simülatör cümleleri, grafik serisi, karşılaştırma tablosu,
// kaynaklar) dile göre tek JSON; şekli src/types/content.ts'teki
// SparkReport. Sayı, konu, kanca ve SEO belgenin kendi alanlarından gelir.
// Metindeki "[n]" kaynak listesindeki n'inci kaynağa dipnot olur.

const json = (value: unknown) => {
  if (typeof value !== "string" || value.trim() === "") return true;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return "Geçerli bir JSON değil.";
  }
};

/** sparkEpisode'un rapor alanları (layout "report"). */
export const reportFields: FieldDefinition[] = [
  defineField({
    name: "reportBody",
    title: "Report body",
    type: "object",
    description: "Dil başına tek JSON (SparkReport). Seed'den yazılır; metin düzeltmeleri için JSON içinde ilgili cümle değiştirilir.",
    fields: [
      defineField({ name: "en", title: "English (JSON)", type: "text", rows: 24, validation: (r) => r.custom(json) }),
      defineField({ name: "tr", title: "Türkçe (JSON)", type: "text", rows: 24, validation: (r) => r.custom(json) }),
    ],
  }),
];
