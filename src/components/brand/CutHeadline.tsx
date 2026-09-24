import CutWord from "@/components/brand/CutWord";
import type { CutHeadlineProps } from "@/types/content";

/**
 * Açılış başlıklarının cümle düzeni (copy: "each sentence of the headline
 * starts on its own line"). `cutWord` başlıktaki son geçtiği yerde Flare
 * kesime alınır. Başlık etiketi ve ölçüsü kullanan yerden gelir.
 */
export default function CutHeadline({ headlineSentences, cutWord, className }: CutHeadlineProps) {
  const cutIndex = headlineSentences.findLastIndex((sentence) => sentence.includes(cutWord));

  return (
    <h1 className={className}>
      {headlineSentences.map((sentence, i) => {
        if (i !== cutIndex) {
          return (
            <span key={sentence} className="block text-balance">
              {sentence}
            </span>
          );
        }
        const at = sentence.lastIndexOf(cutWord);
        return (
          <span key={sentence} className="block text-balance">
            {sentence.slice(0, at)}
            <CutWord>{cutWord}</CutWord>
            {sentence.slice(at + cutWord.length)}
          </span>
        );
      })}
    </h1>
  );
}
