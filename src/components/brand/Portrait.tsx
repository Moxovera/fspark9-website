import Image from "next/image";
import type { PortraitProps } from "@/types/content";

/**
 * Mehmet'in siyah beyaz yuvarlak portresi (brand book v3 §5, §6).
 * Grayscale, odak üst tarafta (50% 20%). Görsel yüklenene kadar zemin
 * Portrait tonu. Hero'da `priority` (LCP elemanı, brief §11). Konum
 * (relative ya da absolute) kullanan yerden className ile gelir: next/image
 * `fill` konumlu bir kapsayıcı istiyor.
 */
export default function Portrait({ alt, sizes, priority = false, className }: PortraitProps) {
  return (
    <div className={`overflow-hidden rounded-full bg-portrait ${className ?? ""}`}>
      <Image
        src="/assets/portrait.jpg"
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-[50%_20%] grayscale"
      />
    </div>
  );
}
