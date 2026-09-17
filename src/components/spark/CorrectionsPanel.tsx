import { Fragment, type ReactNode } from "react";
import type { LastDayCorrectionLine } from "@/types/content";

interface CorrectionsPanelProps {
  lines: LastDayCorrectionLine[];
}

const ADDRESS_MARKER = "[ADDRESS TO BE SET]";

// Adres henüz belirlenmediği için body içindeki literal işaretleyiciyi
// (uydurma bir adres YERİNE) görsel olarak vurgular — build prompt:
// "Render the panel with a visible [ADDRESS TO BE SET] marker".
function withAddressMarker(text: string): ReactNode {
  if (!text.includes(ADDRESS_MARKER)) return text;
  const parts = text.split(ADDRESS_MARKER);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <mark className="rounded-sm bg-bronze/20 px-1 text-bronze">{ADDRESS_MARKER}</mark>
      )}
    </Fragment>
  ));
}

/**
 * Format sayfasındaki "Corrections" paneli — 3 satır, her biri kalın
 * bir giriş cümlesi + gövde (dc.html'deki markdown'ın **kalın** kısmı).
 * SparkPillars/howItWorks'ün mono etiket düzeninden BİLEREK farklı:
 * burada satır içi kalın metin, ayrı bir mono başlık yok.
 */
export default function CorrectionsPanel({ lines }: CorrectionsPanelProps) {
  if (lines.length === 0) return null;

  return (
    <div className="border border-bronze/25 bg-ivory/[0.02] p-8">
      <div className="flex flex-col gap-5">
        {lines.map((line) => (
          <p key={line.label} className="text-[0.98rem] leading-[1.68] text-ivory/78">
            <strong className="font-medium text-ivory">{line.label}</strong>{" "}
            {withAddressMarker(line.body)}
          </p>
        ))}
      </div>
    </div>
  );
}
