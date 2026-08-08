"use client";

import { useHomeScrollMemory } from "@/hooks/useHomeScrollMemory";

interface HomeScrollMemoryProps {
  locale: string;
}

// Görünmez client-leaf — Home'un page.tsx'i (Server Component) tamamen
// client'a çevrilmeden useHomeScrollMemory'yi bağlar. bkz. o hook'un yorumu.
export default function HomeScrollMemory({ locale }: HomeScrollMemoryProps) {
  useHomeScrollMemory(locale);
  return null;
}
