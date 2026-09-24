import type { ReactNode } from "react";
import NextLink from "next/link";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import type { NotFoundPage } from "@/types/content";

interface NotFoundBlockProps {
  content: NotFoundPage;
  /** Global 404'te sol üstte logo (header yok). */
  top?: ReactNode;
  /** Header'lı sayfada fixed header'ın altından başlamak için. */
  underHeader?: boolean;
}

/**
 * 404 bloğu (brief v4 §7.8, board NotFound / NotFoundM): Ink zemin, hiç
 * yanık dilimi olmayan kadran (sadece Flare dilim), "404", başlık, varsa
 * ikinci dilin satırı Dust ve lang'li, ana sayfa linkleri. Linkler
 * next/link: global 404 next-intl sağlayıcısının dışında render ediliyor.
 */
export default function NotFoundBlock({ content, top, underHeader = false }: NotFoundBlockProps) {
  return (
    <section
      className={`on-ink flex min-h-[100svh] flex-col bg-ink px-5 pt-8 pb-10 min-[900px]:px-16 min-[900px]:pt-12 min-[900px]:pb-14 ${
        underHeader ? "pt-24 min-[900px]:pt-[132px]" : ""
      }`}
    >
      {top}
      <div className="flex flex-grow flex-col justify-center gap-10 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-start min-[900px]:gap-24">
        <Dial lit={[]} size={140} tone="ink" className="min-[900px]:size-[280px]" />
        <div className="flex max-w-[760px] flex-col gap-5 min-[900px]:gap-7">
          <Label ground="ink">{content.label}</Label>
          <h1 className="m-0 font-display text-[40px] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-paper min-[900px]:text-[clamp(56px,6.112vw,88px)]">
            {content.heading}
          </h1>
          {content.secondLine && (
            <p
              lang={content.secondLine.lang}
              className="m-0 font-display text-[20px] leading-[1.2] font-bold tracking-[-0.015em] text-dust min-[900px]:text-[26px]"
            >
              {content.secondLine.text}
            </p>
          )}
          <div className="mt-2 flex flex-col items-start gap-5 min-[900px]:flex-row min-[900px]:gap-10">
            {content.links.map((link, i) => (
              <NextLink
                key={link.href}
                href={link.href}
                lang={link.lang}
                className="-my-[10px] inline-flex min-h-11 items-center text-[16px] font-bold text-paper no-underline"
              >
                <span className={`border-b-2 pb-[3px] leading-[normal] ${i === 0 ? "border-paper" : "border-dust"}`}>{link.label}</span>
              </NextLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
