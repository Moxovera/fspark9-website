"use client";

import { useEffect, useState } from "react";
import { GateConfirmedStrip } from "@/components/spark/gate/GateStrips";
import { markConfirmed } from "@/lib/sparkReader";
import type { ConfirmReturnProps } from "@/types/content";

const PARAMS = ["onay", "confirmed"];

/**
 * Kit onay mailinden dönüş: /spark?onay=1 (TR) ya da /spark?confirmed=1 (EN).
 * Durumu `confirmed` yapar, parametreyi adresten siler ve en üstte bir kez
 * onay şeridini gösterir.
 */
export default function ConfirmReturn({ content }: ConfirmReturnProps) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hit = PARAMS.some((name) => url.searchParams.has(name));
    if (!hit) return;
    PARAMS.forEach((name) => url.searchParams.delete(name));
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    markConfirmed();
    setShown(true);
  }, []);

  if (!shown) return null;
  return <GateConfirmedStrip content={content} onClose={() => setShown(false)} />;
}
