/** Spark işareti: dokuzuncu dilim, küçük Flare daire. Dekoratif. */
export default function SparkMark({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`block size-[14px] flex-none rounded-full bg-flare ${className ?? ""}`} />;
}
