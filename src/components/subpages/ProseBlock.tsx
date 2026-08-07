import Image from "next/image";
import type { ProseBlock as ProseBlockType, StoryMedia } from "@/types/content";

interface ProseBlockProps {
  media?: StoryMedia;
  blocks: ProseBlockType[];
}

/**
 * dc.html: page.hasProse + page.hasVideo (satır 949-977). /story ve
 * /thank-you paylaşıyor — medya sadece /story'de var (hasVideo).
 * Video henüz gerçek değil (bkz. StoryMedia yorumu) — Home'daki
 * Story.tsx ile aynı basitleştirme: tıklanamaz, sadece statik görsel.
 */
export default function ProseBlock({ media, blocks }: ProseBlockProps) {
  const image = media?.type === "image" ? media.image : undefined;

  return (
    <section className="bg-ivory px-7 py-[88px]">
      <div className="mx-auto max-w-[780px]">
        {media && (
          <>
            <div
              className="relative mb-[22px] aspect-video overflow-hidden bg-navy"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, color-mix(in srgb, var(--ivory) 7%, transparent) 0 2px, transparent 2px 12px)",
              }}
            >
              {image && (
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="780px"
                  className="object-cover object-[50%_28%]"
                />
              )}
            </div>
            <p className="mb-14 font-mono text-[12.5px] text-muted">
              {media.caption}
            </p>
          </>
        )}

        {blocks.map((block, i) =>
          block.type === "head" ? (
            <h2
              key={i}
              className="mt-12 mb-[30px] font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.18] font-medium text-navy"
            >
              {block.text}
            </h2>
          ) : (
            <p
              key={i}
              className="mb-[30px] text-[1.06rem] leading-[1.75] text-charcoal"
            >
              {block.text}
            </p>
          ),
        )}
      </div>
    </section>
  );
}
