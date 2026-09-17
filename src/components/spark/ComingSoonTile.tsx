interface ComingSoonTileProps {
  index: number; // 1-based
  label: string; // "Coming Soon" / "Çok Yakında"
}

/**
 * Henüz var olmayan bir sonraki format için yer tutucu — kullanıcı
 * geri bildirimi: "02 · Coming Soon" görünsün ki insanlar daha
 * fazlasının geleceğini anlasın. Kesikli çizgi (dashed) kasıtlı: bu
 * sitede zaten "henüz burada değil" anlamına gelen bir görsel dil
 * (bkz. gap/boşluk kavramı) — tıklanamaz, sadece bekleneni işaret eder.
 */
export default function ComingSoonTile({ index, label }: ComingSoonTileProps) {
  return (
    <div className="flex flex-col justify-between border border-dashed border-ivory/20 p-10 sm:p-12">
      <p className="mb-4 font-mono text-xs tracking-[0.14em] text-ivory/40">
        {String(index).padStart(2, "0")}
      </p>
      <p className="font-mono text-xs tracking-[0.14em] text-ivory/45 uppercase">{label}</p>
    </div>
  );
}
