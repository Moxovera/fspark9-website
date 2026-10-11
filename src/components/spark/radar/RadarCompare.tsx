import RadarRich, { RadarParas } from "@/components/spark/radar/RadarRich";
import { body, group, h2, sectionLabel } from "@/components/spark/radar/styles";
import type { RadarCompareProps } from "@/types/content";

/**
 * Rakipler yan yana: şirket başına bir sütun, `highlight` sütunu (bu
 * sayının şirketi) işaretli. Telefonda her satır yığılır ve her hücrenin
 * önünde şirket adı durur (gerçek metin, kopyalanır). Marka adları kendi
 * büyük küçük harfiyle.
 */
export default function RadarCompare({ text, data, label, template }: RadarCompareProps) {
  const highlight = data.highlight ?? 0;
  return (
    <section id="compare" className={group}>
      <span className={sectionLabel}>{label}</span>
      <h2 className={h2}>
        <RadarRich text={text.title} template={template} />
      </h2>
      {text.intro && text.intro.length > 0 && (
        <div className={body}>
          <RadarParas items={text.intro} template={template} />
        </div>
      )}
      <table className="rd-cmp w-full border-collapse border-t-2 border-ink bg-white text-[14.5px] leading-[1.4]">
        <thead>
          <tr>
            <th scope="col" className="border-b border-rule p-[10px] text-left" />
            {data.cols.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={`border-b border-rule p-[10px] text-left align-top font-mono text-[12px] font-normal tracking-[0.02em] ${i === highlight ? "text-ink" : "text-stone"}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {text.rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="w-[22%] border-b border-rule p-[10px] text-left align-top font-mono text-[11px] font-normal tracking-[0.04em] text-stone uppercase"
              >
                {row.label}
              </th>
              {row.cells.map((cell, i) => (
                <td key={data.cols[i]} className={`border-b border-rule p-[10px] text-left align-top ${i === highlight ? "bg-paper font-bold" : "font-normal"}`}>
                  <span className="rd-cmp-col">{data.cols[i]}{" · "}</span>
                  <RadarRich text={cell} template={template} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {text.takeaway && text.takeaway.length > 0 && (
        <div className={body}>
          <RadarParas items={text.takeaway} template={template} />
        </div>
      )}
    </section>
  );
}
