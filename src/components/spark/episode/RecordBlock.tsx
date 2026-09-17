import type { LastDayRecordBlock } from "@/types/content";

interface RecordBlockProps {
  block: LastDayRecordBlock;
  label: string; // "RECORD" / "KAYIT"
  dayWord: string; // "DAY" / "GÜN"
}

/**
 * Sol çizgi: navy, solid, 3px. Mono etiket RECORD/KAYIT — renk TEK
 * BAŞINA ayırt edici olamaz (bkz. build prompt Part 0 erişilebilirlik
 * kuralı), bu yüzden hem çizgi stili hem metin etiketi birlikte var.
 */
export default function RecordBlock({ block, label, dayWord }: RecordBlockProps) {
  return (
    <div className="border-l-[3px] border-solid border-navy bg-navy/[0.03] py-6 pl-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-xs tracking-[0.14em] text-navy uppercase">{label}</span>
        <span className="font-mono text-xs tracking-[0.06em] text-muted">
          {dayWord} {block.day >= 0 ? String(block.day).padStart(3, "0") : block.day}
          {" · "}
          {block.date}
        </span>
      </div>
      <h3 className="mb-2 font-display text-[1.25rem] leading-[1.3] font-medium text-charcoal">
        {block.heading}
      </h3>
      <p className="mb-3 text-[0.98rem] leading-[1.66] text-charcoal/85">{block.body}</p>
      {block.quote && (
        <blockquote className="mb-3 border-l-2 border-navy/30 pl-4 text-[0.98rem] leading-[1.6] text-charcoal/80 italic">
          &ldquo;{block.quote}&rdquo;
          {block.quoteAttribution && (
            <footer className="mt-1 font-mono text-xs tracking-[0.04em] text-muted not-italic">
              {block.quoteAttribution}
            </footer>
          )}
        </blockquote>
      )}
      <a
        href={block.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.05em] text-navy underline decoration-navy/40 underline-offset-2 transition-colors duration-200 hover:text-bronze hover:decoration-bronze/50"
      >
        {/*
          sourceKind sabit, kısa bir İngilizce enum kelimesi (press/
          regulator/...) — lang="en" ile büyütülüyor. sourceLabel ise
          EN/TR karışık serbest metin (marka adı + başlık) olduğu için
          BÜYÜTÜLMÜYOR: "uppercase" tüm string'e uygulansaydı, Türkçe
          kelimelerdeki "i" tarayıcının TR büyütme kuralıyla "İ"ye
          dönüşürdü ama İngilizce özel isimlerde (ör. "Finextra") aynı
          kural yanlış şekilde "FİNEXTRA" üretir — ikisini aynı anda
          doğru büyütmenin yolu yok, bu yüzden doğal harf büyüklüğü
          tercih edildi.
        */}
        <span lang="en" className="uppercase">
          {block.sourceKind}
        </span>{" "}
        · {block.sourceLabel}
      </a>
    </div>
  );
}
