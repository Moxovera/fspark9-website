'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useReveal'

/**
 * Çubuklar bir kez büyür (Sektör raporu Nº 06: bilanço, puan tablosu,
 * kredi sütunları). Eleman ilk kez görünür olunca, sonra `key` her
 * değiştiğinde (yeni sekme) sıfırdan hedefe. Gözlemci useReveal ile ortak.
 * `on` false iken CSS (`.js .uk-grow[data-grow="off"]`) çubuğu sıfırda
 * tutar; JS kapalıysa çubuklar tam boy görünür. Reduced-motion'da
 * useInView hemen true döner ve CSS geçişi kapalı.
 */
export function useGrow<T extends HTMLElement>(key: string) {
  const { ref, seen } = useInView<T>()
  const [grown, setGrown] = useState<string | null>(null)

  useEffect(() => {
    if (!seen) return
    // Sıfır hâli boyansın diye stil hesabını zorla, sonra hedefe geç (geçiş sıfırdan başlar).
    // requestAnimationFrame yerine zamanlayıcı: arka plandaki sekmede de çalışır.
    void ref.current?.offsetWidth
    const id = window.setTimeout(() => setGrown(key), 20)
    return () => window.clearTimeout(id)
  }, [seen, key, ref])

  return { ref, on: seen && grown === key }
}
