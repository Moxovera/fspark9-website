import EpisodeNote from "@/components/spark/episode/EpisodeNote";

interface ExpertNotesProps {
  notes: string[];
  heading: string;
  noteLabel: string;
  signature: string;
}

/**
 * Final interaction brief §1: "the previous version of this brief was
 * too tight on this and it is corrected here" — inline serpiştirilmiş
 * notlar yerine bölüm sonunda tek, imzalı bir bölüm. Her giriş yine de
 * mevcut EpisodeNote kartını kullanıyor (bronz/navy-9 görsel dili
 * değişmedi), sadece artık gövde içine değil burada, gruplu render
 * ediliyor. Ledger modunda LedgerGate ile tamamen gizlenir.
 */
export default function ExpertNotes({ notes, heading, noteLabel, signature }: ExpertNotesProps) {
  if (notes.length === 0) return null;

  return (
    <section className="mt-4 border-t border-charcoal/10 pt-10">
      <h2 className="mb-6 font-display text-2xl font-medium text-charcoal">{heading}</h2>
      <div className="flex flex-col gap-5">
        {notes.map((body, index) => (
          <EpisodeNote key={index} body={body} label={noteLabel} />
        ))}
      </div>
      <p className="mt-6 font-mono text-xs tracking-[0.04em] text-muted">{signature}</p>
    </section>
  );
}
