"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { unlockAction, setLockedLangAction, type UnlockState } from "@/app/(locked)/locked/[client]/actions";
import type { Locale, LockedGateContent } from "@/types/content";
import { BrandMark } from "@/components/locked/BrandMark";

const initialState: UnlockState = { error: false };

export function LockedGate({
  client,
  initialLang,
  gate,
}: {
  client: string;
  initialLang: Locale;
  gate: Record<Locale, LockedGateContent>;
}) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const [, startTransition] = useTransition();
  const [state, formAction, pending] = useActionState(unlockAction.bind(null, client), initialState);
  const t = gate[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function changeLang(next: Locale) {
    if (next === lang) return;
    setLang(next);
    startTransition(() => {
      void setLockedLangAction(client, next);
    });
  }

  return (
    <div className="gate">
      <form className="gate-card" action={formAction} autoComplete="off">
        <BrandMark size={34} />
        <h1>{t.title}</h1>
        <p>{t.text}</p>
        <label htmlFor="gate-pass">{t.label}</label>
        <div className="gate-row">
          <input
            id="gate-pass"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
          <button type="submit" disabled={pending}>
            {t.btn}
          </button>
        </div>
        <div className="err" role="alert">
          {state.error ? t.err : ""}
        </div>
        <div className="lang-switch" role="group" aria-label="Dil / Language">
          <button type="button" aria-pressed={lang === "tr"} onClick={() => changeLang("tr")}>
            TR
          </button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => changeLang("en")}>
            EN
          </button>
        </div>
      </form>
    </div>
  );
}
