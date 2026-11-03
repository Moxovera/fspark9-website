"use client";

import { useEffect } from "react";
import { markConfirmed, markPendingFromThanks } from "@/lib/sparkReader";

/** Teşekkür sayfaları: açılınca okurun durumunu yazar. Ekrana bir şey çizmez. */
export default function ReaderMark({ status }: { status: "pending" | "confirmed" }) {
  useEffect(() => {
    if (status === "confirmed") markConfirmed();
    else markPendingFromThanks();
  }, [status]);
  return null;
}
