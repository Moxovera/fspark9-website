interface EpisodeNoteProps {
  body: string;
  label: string; // "fspark9 · Note" / "fspark9 · Not"
}

/**
 * fspark9'un kendi sesi — bölüm gövdesinin (Portable Text) içine
 * serbestçe yerleştirilir (bkz. EpisodeBody.tsx). Ledger/call mekaniği
 * kaldırıldığı için artık sade bir server component — herhangi bir
 * client state'e bağlı değil.
 */
export default function EpisodeNote({ body, label }: EpisodeNoteProps) {
  return (
    <aside className="flex flex-col items-start gap-4 rounded-md border border-bronze/35 bg-bronze/[0.08] p-6 shadow-[0_8px_24px_-8px_rgba(166,124,61,0.35)] min-[620px]:flex-row min-[620px]:items-start">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base text-ivory"
      >
        9
      </span>
      <div>
        <p className="mb-1.5 font-mono text-[11px] tracking-[0.08em] text-bronze normal-case">
          {label}
        </p>
        <p className="font-display text-[1.05rem] leading-[1.55] text-charcoal">{body}</p>
      </div>
    </aside>
  );
}
