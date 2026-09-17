interface ComingSoonRowProps {
  index: number; // 1-based
  label: string; // "Coming Soon" / "Çok Yakında"
}

/**
 * Format 02 satırı — bu revizyonda BİLEREK dokunulmuyor: numara,
 * yer tutucu etiket, link YOK. Sadece yeni satır konteynerine
 * (row 01 ile aynı genişlik/hizalama) oturacak şekilde biçimlendirildi.
 * Kısa kalması KASITLI — row 01'in envanter taşıdığı için uzun olmasıyla
 * arasındaki yükseklik farkı, format 02'nin henüz karar beklediğini
 * gösteriyor (bkz. Spark revizyon brief §4: "do not equalise them").
 */
export default function ComingSoonRow({ index, label }: ComingSoonRowProps) {
  return (
    <div className="border-t border-ivory/12 py-8 pl-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.14em] text-ivory/40">
          {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs tracking-[0.14em] text-ivory/45 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
