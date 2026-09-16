"use client";

import { useEffect } from "react";
import type { Locale } from "@/types/content";

/**
 * (locked)/layout.tsx sets <html lang="tr"> as a static default (it sits
 * above the [client] segment and can't read the active language server
 * side — see the comment there). Without this, CSS text-transform:
 * uppercase keeps applying Turkish casing rules (dotted İ) to English
 * text on the EN report, since the browser still thinks lang="tr".
 */
export function SyncHtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
