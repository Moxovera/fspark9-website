"use client";

import { createContext, useContext, useState } from "react";
import type { UkSelectionProviderProps } from "@/types/content";

type Selection = { player: string | null; setPlayer: (key: string) => void };

const SelectionContext = createContext<Selection>({ player: null, setPlayer: () => {} });

/**
 * Haritada seçilen oyuncu (03) bilanço tablosunda (04) da vurgulanır:
 * iki bölüm aynı seçimi okur.
 */
export function UkSelectionProvider({ children }: UkSelectionProviderProps) {
  const [player, setPlayer] = useState<string | null>(null);
  return <SelectionContext.Provider value={{ player, setPlayer }}>{children}</SelectionContext.Provider>;
}

export const useUkSelection = () => useContext(SelectionContext);
