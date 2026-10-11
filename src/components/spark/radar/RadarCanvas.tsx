import RadarRich from "@/components/spark/radar/RadarRich";
import type { RadarBlockId, RadarCanvasProps } from "@/types/content";

/** Tuvaldaki kutuların grid alanları (satır başı/sütun başı/satır sonu/sütun sonu). `kakr` ve `chcr` iki satıra yayılır. */
const AREAS: Record<RadarBlockId, string> = {
  kp: "1/1/3/3",
  ka: "1/3/2/5",
  kr: "2/3/3/5",
  kakr: "1/3/3/5",
  vp: "1/5/3/7",
  cr: "1/7/2/9",
  ch: "2/7/3/9",
  chcr: "1/7/3/9",
  cs: "1/9/3/11",
  cost: "3/1/4/6",
  rev: "3/6/4/11",
};

/**
 * Dokuz kutulu iş modeli tuvali. Üç kullanım: `mini` panodaki canlı tuval
 * (kutu, paragrafı görününce ya da cevap verilince dolar), `full` tam resim
 * (hepsi dolu, tam metin), `ks` taşıyıcı taş oyunundaki etiket tuvali (çekilen
 * hamlenin vurduğu kutular kesik çizgiye döner). Koyu kutu `strong`, beyaz
 * kutu `quiet`. Etiket ve metin yan yana olduğundan aralarında gerçek boşluk
 * var (kopyalanan metin yapışmaz).
 */
export default function RadarCanvas({ blocks, texts, mode, template, filled, hits, highlight, label, className }: RadarCanvasProps) {
  return (
    <div
      role={label ? "group" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`rd-canvas ${mode === "full" ? "rd-full" : mode === "ks" ? "rd-ks-canvas" : "rd-mini"} ${className ?? ""}`}
    >
      {blocks.map((block) => {
        const text = texts[block.id];
        if (!text) return null;
        const on = mode !== "mini" || Boolean(filled?.has(block.id));
        return (
          <div
            key={block.id}
            data-id={block.id}
            data-kind={on ? block.kind : undefined}
            data-on={on && mode !== "ks" ? "" : undefined}
            data-hit={hits?.has(block.id) ? "" : undefined}
            data-hl={highlight === block.id ? "" : undefined}
            className="rd-cell"
            style={{ gridArea: AREAS[block.id] }}
          >
            {mode === "ks" ? (
              <span className="rd-cl">{text.short}</span>
            ) : (
              <>
                <span className="rd-cl rd-full-l">{text.label}</span> <span className="rd-cl rd-short">{text.short}</span>{" "}
                <span className="rd-ct">
                  <RadarRich text={mode === "full" ? text.full : text.mini} template={template} />
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
