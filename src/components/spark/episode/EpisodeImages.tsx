import Image from "next/image";
import type { EpisodeImagesProps } from "@/types/content";

/**
 * Bölümün hazır görselleri (sparkEpisode.images): fotoğraf ve uygulama
 * ekranları, bağlı oldukları bölümün metninin altında. Dikey görseller
 * (telefon ekranı, kart) dar ve yan yana, yataylar (web sayfası) metin
 * sütununun genişliğinde. Altında kısa açıklama ve kaynak.
 */
export default function EpisodeImages({ images, at, className }: EpisodeImagesProps) {
  const here = images.filter((image) => image.at === at);
  if (here.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-start gap-6 ${className ?? ""}`}>
      {here.map((image) => {
        const tall = image.height > image.width;
        return (
          <figure key={image.url} className={`m-0 ${tall ? "w-[min(100%,280px)]" : "w-full max-w-[720px]"}`}>
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={tall ? "280px" : "(min-width: 1000px) 720px, 100vw"}
              placeholder={image.lqip ? "blur" : "empty"}
              blurDataURL={image.lqip}
              className="block h-auto w-full border border-rule"
            />
            <figcaption className="mt-[10px] text-[14px] leading-[1.5] text-stone">
              {image.caption && <span className="block">{image.caption}</span>}
              {image.credit &&
                (image.href ? (
                  <a href={image.href} target="_blank" rel="noopener" className="text-stone underline underline-offset-2 hover:text-ink">
                    {image.credit}
                  </a>
                ) : (
                  <span>{image.credit}</span>
                ))}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
