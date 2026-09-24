import type { BrandCaseProps } from "@/types/content";

// fspark9 her yerde küçük harf. Mono etiketler CSS ile büyük harfe
// dönüyor; metindeki "fspark9" bu dönüşümden muaf tutuluyor (.nt).
export function BrandCase({ text }: BrandCaseProps) {
  const parts = text.split(/(fspark9)/i);
  return (
    <>
      {parts.map((part, i) =>
        /^fspark9$/i.test(part) ? (
          <span key={i} className="nt">
            fspark9
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
