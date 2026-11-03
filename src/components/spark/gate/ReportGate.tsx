import GatedContent from "@/components/spark/gate/GatedContent";
import type { ReportGateProps } from "@/types/content";

/**
 * Sektör raporlarında özetten sonrasını saran kilit. `gate` verilmezse
 * (Studio'da "Devamı bültenle açılsın" kapalı) içerik olduğu gibi çıkar.
 * Metin her durumda HTML'de durur; kilit sadece görsel (arama motoru okur).
 */
export default function ReportGate({ gate, locale, children }: ReportGateProps) {
  if (!gate) return <>{children}</>;
  return (
    <GatedContent newsletter={gate.newsletter} locale={locale}>
      {children}
    </GatedContent>
  );
}
