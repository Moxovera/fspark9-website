import type { JsonLdProps } from "@/types/content";

// Sayfa içi JSON-LD. `<` kaçırılıyor ki metin içindeki bir "</script>"
// etiketi kapatamasın.
export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
