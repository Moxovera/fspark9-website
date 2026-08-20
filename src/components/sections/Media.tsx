import Reveal from "@/components/ui/Reveal";
import MediaSlider from "@/components/sections/MediaSlider";
import type { MediaSection } from "@/types/content";

interface MediaProps {
  content: MediaSection;
}

export default function Media({ content }: MediaProps) {
  const { heading, intro, items } = content;

  return (
    <section id="media" className="bg-ivory px-7 py-[104px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-3.5 font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
            {heading}
          </h2>
        </Reveal>
        <Reveal className="mb-12 text-[1.05rem] text-muted">
          <p>{intro}</p>
        </Reveal>

        <MediaSlider>
          {items.map((item) => (
            <Reveal
              key={item.href}
              className="flex-[0_0_clamp(280px,30%,380px)] [scroll-snap-align:start]"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="block h-full rounded-2xl border border-navy/[0.12] bg-[#fffdf7] p-7 no-underline"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  {item.isVideo && (
                    <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border border-bronze/55">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        style={{ fill: "var(--bronze)" }}
                      >
                        <polygon points="7 4 20 12 7 20" />
                      </svg>
                    </span>
                  )}
                  {/* lang="en": text-transform:uppercase, elemanın diline göre
                      büyütür. Sayfa <html lang="tr"> olduğunda küçük "i" noktalı
                      "İ"ye dönüşüyor ve İngilizce yayın adları bozuluyordu
                      ("Fintech Istanbul" → "FİNTECH ISTANBUL").

                      Burada CSS transform'u kaldırıp metni kaynakta büyük harf
                      tutma yoluna (bkz. ServicesTabs.tsx'teki adım etiketleri)
                      GİDİLMEDİ, çünkü iki alan farklı şeyler: adım etiketi
                      dile göre çevrilen ve büyük harfliliği kendi kimliği olan
                      bir tasarım etiketi; buradaki source ise bir yayın/mecra
                      ADI — büyük harf sadece görünüm. Ad'ı kaynakta büyük harf
                      tutmak Studio önizlemelerine ve ekran okuyuculara da
                      sızardı.

                      lang="en" ayrıca doğru işaretleme: mediaItem.source
                      Sanity'de localeString DEĞİL, düz string (schema:
                      objects/mediaItem.ts) ve seed EN değerinden yazıyor
                      (scripts/seed-content.ts) — yani TR sayfasında da
                      İngilizce metin görünüyor. Bu alan ileride localeString'e
                      çevrilirse buradaki sabit lang de locale'e bağlanmalı. */}
                  <p
                    lang="en"
                    className="font-mono text-[11.5px] tracking-[0.1em] uppercase text-bronze"
                  >
                    {item.source}
                  </p>
                </div>
                <h3 className="mb-2.5 font-display text-[1.25rem] font-semibold leading-[1.28] text-navy">
                  {item.headline}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-charcoal">
                  {item.description}
                </p>
                {item.note && (
                  <p className="mt-3 font-mono text-[12.5px] text-muted">
                    {item.note}
                  </p>
                )}
              </a>
            </Reveal>
          ))}
        </MediaSlider>
      </div>
    </section>
  );
}
