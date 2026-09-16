"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/types/content";
import { Wordmark } from "@/components/locked/Wordmark";
import { setLockedLangAction } from "@/app/(locked)/locked/[client]/actions";
import { useScrollProgress } from "./useScrollProgress";
import { useActiveChapter } from "./useActiveChapter";

/**
 * Chapter nav + language switch + scroll progress line. Switching language
 * here persists the cookie and does a client-side (RSC) navigation to the
 * same URL with ?lang= set — not a full browser reload, but a real
 * server round-trip rather than the reference's dual-tree CSS toggle. That
 * trade-off was made deliberately given the size of this report: rendering
 * both languages' full chapter/chart trees at once roughly doubles payload
 * and hook-mounting surface for a report this size.
 */
export function ReportTopBar({
  client,
  lang,
  heroId,
  chapters,
}: {
  client: string;
  lang: Locale;
  heroId: string;
  chapters: { id: string; nav: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const progress = useScrollProgress();
  const active = useActiveChapter(chapters.map((c) => c.id));

  function changeLang(next: Locale) {
    if (next === lang) return;
    startTransition(() => {
      void setLockedLangAction(client, next);
      router.replace(`${pathname}?lang=${next}`);
    });
  }

  return (
    <header className="topbar" id="top">
      <div className="topbar-inner">
        <a className="wm" href={`#${heroId}`} aria-label="fspark9">
          <Wordmark height={22} />
        </a>
        <nav className="chapters" aria-label={lang === "tr" ? "Bölümler" : "Chapters"}>
          {chapters.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? "on" : undefined}>
              {c.nav}
            </a>
          ))}
        </nav>
        <div className="lang-switch" role="group" aria-label="Dil / Language">
          <button type="button" aria-pressed={lang === "tr"} onClick={() => changeLang("tr")}>
            TR
          </button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => changeLang("en")}>
            EN
          </button>
        </div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </header>
  );
}
