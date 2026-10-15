import { Fragment } from "react";
import { Link } from "@/i18n/navigation";
import type { DoraInlineProps, ServiceSlug } from "@/types/content";

const SERVICES: ServiceSlug[] = ["zero-to-live", "product-strategy", "embedded-finance", "expansion-gtm"];
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(service:[a-z-]+\))/;

/**
 * DORA raporunun satır içi işaretleri: **kalın**, *italik* ve
 * [metin](service:slug) hizmet sayfası linki. Metin kaynak dosyadaki
 * işaretleriyle birebir duruyor; burada sadece biçime dönüşüyor.
 */
export default function DoraInline({ text, locale }: DoraInlineProps) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(service:([a-z-]+)\)$/);
        if (link && SERVICES.includes(link[2] as ServiceSlug)) {
          return (
            <Link key={i} href={{ pathname: "/services/[slug]", params: { slug: link[2] } }} locale={locale}>
              {link[1]}
            </Link>
          );
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
