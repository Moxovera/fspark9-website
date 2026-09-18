interface ComingSoonRowProps {
  index: number; // 1-based
  label: string; // "Coming Soon" / "Çok Yakında"
  tone: "onNavy" | "onIvory";
}

/**
 * Format 02 satırı — bu revizyonda BİLEREK dokunulmuyor: numara,
 * yer tutucu etiket, link YOK. Sadece yeni satır konteynerine
 * (row 01 ile aynı genişlik/hizalama) oturacak şekilde biçimlendirildi.
 * Kısa kalması KASITLI — row 01'in envanter taşıdığı için uzun olmasıyla
 * arasındaki yükseklik farkı, format 02'nin henüz karar beklediğini
 * gösteriyor (bkz. Spark revizyon brief §4: "do not equalise them").
 *
 * Her zaman `SparkFormatRows`'un son elemanı, bu yüzden sayfanın alt
 * boşluğunu (`pb-[120px]`) kendi renkli arka planının içinde taşıyor —
 * eskiden bunu sarmalayıcı section taşıyordu, artık satırlar kendi
 * arka planını taşıdığı için burada.
 */
export default function ComingSoonRow({ index, label, tone }: ComingSoonRowProps) {
  const isOnIvory = tone === "onIvory";
  return (
    <div
      className={`border-t pb-[120px] ${isOnIvory ? "border-charcoal/[0.08] bg-ivory" : "border-ivory/12 bg-navy"}`}
    >
      <div className="mx-auto max-w-[1000px] px-7">
        <div className="py-8 pl-8">
          <div className="flex items-baseline gap-4">
            <span className={`font-mono text-xs tracking-[0.14em] ${isOnIvory ? "text-navy/40" : "text-ivory/40"}`}>
              {String(index).padStart(2, "0")}
            </span>
            <span
              className={`font-mono text-xs tracking-[0.14em] uppercase ${
                isOnIvory ? "text-navy/45" : "text-ivory/45"
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
