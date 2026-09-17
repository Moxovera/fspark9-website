"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import type { Locale } from "@/types/content";
import { Wordmark } from "@/components/locked/Wordmark";
import { setLockedLangAction } from "@/app/(locked)/locked/[client]/actions";
import { useScrollProgress } from "./useScrollProgress";

/**
 * Same top bar as the report (ReportTopBar), minus the chapter nav — this
 * page has no chapters — plus a quiet "back to the report" link in its
 * place. Language switching works the same way (persist cookie, soft
 * navigation to ?lang=).
 */
export function WorkingTogetherTopBar({
  client,
  lang,
  backLabel,
}: {
  client: string;
  lang: Locale;
  backLabel: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const progress = useScrollProgress();

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
        <Link className="wm" href={`/locked/${client}`} aria-label="fspark9">
          <Wordmark height={22} />
        </Link>
        <nav className="chapters" aria-label={backLabel}>
          <Link href={`/locked/${client}`}>{backLabel}</Link>
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
