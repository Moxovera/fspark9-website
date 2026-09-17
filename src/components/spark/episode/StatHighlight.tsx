interface StatHighlightProps {
  figure: string;
  caption?: string;
}

/**
 * Bölüm gövdesinin içine serbestçe yerleştirilen büyük rakam/istatistik
 * (ör. "156 DAYS", "£100M"). Sol çizgi bronze/solid/3px — bkz.
 * EpisodeBody.tsx'teki Portable Text component eşlemesi.
 */
export default function StatHighlight({ figure, caption }: StatHighlightProps) {
  return (
    <div className="border-l-[3px] border-solid border-bronze bg-bronze/[0.04] py-6 pl-6">
      <p className="font-mono text-[clamp(2rem,5vw,3.2rem)] leading-none tracking-[-0.01em] text-bronze">
        {figure}
      </p>
      {caption && (
        <p className="mt-3 max-w-[52ch] text-[0.98rem] leading-[1.6] text-charcoal/80">
          {caption}
        </p>
      )}
    </div>
  );
}
