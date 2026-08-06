import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { StorySection } from "@/types/content";

interface StoryProps {
  content: StorySection;
}

export default function Story({ content }: StoryProps) {
  const { heading, lead, paragraphs, link, media } = content;
  const image = media.type === "image" ? media.image : undefined;

  return (
    <section className="border-t border-ivory/[0.08] bg-navy px-7 py-[104px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-16">
        <div>
          <h2 className="mb-[30px] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-ivory">
            {heading}
          </h2>
          <p className="mb-[26px] font-display text-[clamp(1.35rem,2.1vw,1.7rem)] leading-[1.4] text-bronze">
            {lead}
          </p>
          <div className="flex flex-col gap-[18px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[1.02rem] leading-[1.68] text-ivory/76">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href={link.href}
            className="mt-[30px] inline-block border-b border-bronze/45 pb-1 font-mono text-[13px] tracking-[0.06em] text-ivory"
          >
            {link.label}
          </Link>
        </div>

        <div>
          <div className="relative aspect-[4/5] overflow-hidden border border-ivory/12">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center bg-ivory/4"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, color-mix(in srgb, var(--ivory) 7%, transparent) 0 2px, transparent 2px 12px)",
                }}
              >
                <span className="font-mono text-[11px] tracking-[0.08em] text-ivory/40 uppercase">
                  Portrait
                </span>
              </div>
            )}
          </div>
          {media.caption && (
            <p className="mt-4 font-mono text-[12.5px] tracking-[0.05em] text-ivory/55">
              {media.caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
