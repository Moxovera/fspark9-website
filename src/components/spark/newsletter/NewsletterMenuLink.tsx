"use client";

import type { MouseEvent } from "react";
import { MailIcon } from "@/components/icons";
import { NEWSLETTER_ID, jumpToNewsletter } from "@/lib/newsletter";
import type { NewsletterMenuLinkProps } from "@/types/content";

/**
 * Menüdeki bülten girişi: masaüstü header'da "Spark"ın yanında Flare etiket,
 * telefon menüsünde "Spark" satırının altında link. İkisi de aynı sayfanın
 * footer şeridine (#bulten) iner; JS yokken düz çapa çalışır.
 */
export default function NewsletterMenuLink({ variant, content, onBeforeJump }: NewsletterMenuLinkProps) {
  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (onBeforeJump) {
      onBeforeJump();
      // Menü katmanı kapanıp kaydırma kilidi kalksın, sonra kay.
      window.requestAnimationFrame(() => window.requestAnimationFrame(jumpToNewsletter));
      return;
    }
    jumpToNewsletter();
  };

  if (variant === "desktop") {
    return (
      <a
        href={`#${NEWSLETTER_ID}`}
        onClick={go}
        aria-label={content.menuAriaLabel}
        className="inline-flex h-[26px] items-center gap-[6px] bg-flare px-2 font-mono text-[11px] leading-none font-medium tracking-[0.08em] whitespace-nowrap text-ink uppercase no-underline"
      >
        <MailIcon className="size-[14px] flex-none" />
        {content.menuLabel}
      </a>
    );
  }
  return (
    <a
      href={`#${NEWSLETTER_ID}`}
      onClick={go}
      className="inline-flex min-h-11 items-center gap-2 pb-[14px] font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-flare uppercase no-underline"
    >
      <MailIcon className="size-4 flex-none" />
      {content.menuPhoneLabel}
    </a>
  );
}
