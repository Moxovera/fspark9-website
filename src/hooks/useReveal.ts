'use client'

import { useEffect, useRef } from 'react'

// CLAUDE.md: "Observer tek bir hook'ta toplanır... Her bölüm kendi
// observer'ını kurmaz." — bu yüzden IntersectionObserver modül seviyesinde
// tek bir örnek olarak tutulur, her useReveal() çağrısı aynı örneği paylaşır.
// Varsayılan eşik tek örnek; özel eşik isteyen çağrılar (kilitli
// raporun referansı 0.3 kullanıyor) eşik başına tek bir örnek paylaşır.
const observers = new Map<string, IntersectionObserver>()
const revealCallbacks = new WeakMap<Element, () => void>()

function getObserver(threshold?: number) {
  const key = threshold === undefined ? 'default' : String(threshold)
  const existing = observers.get(key)
  if (existing) return existing

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        revealCallbacks.get(entry.target)?.()
        observer.unobserve(entry.target)
        revealCallbacks.delete(entry.target)
      }
    },
    threshold === undefined
      ? { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      : { threshold },
  )
  observers.set(key, observer)

  return observer
}

/**
 * Bir elemanı görünür olduğunda `.is-visible` sınıfıyla işaretler.
 * Kullanım: `const ref = useReveal<HTMLDivElement>()`, sonra
 * `<div ref={ref} className="reveal">...</div>`.
 */
export function useReveal<T extends HTMLElement>(threshold?: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) {
      el.classList.add('is-visible')
      return
    }

    const observer = getObserver(threshold)
    revealCallbacks.set(el, () => el.classList.add('is-visible'))
    observer.observe(el)

    return () => {
      revealCallbacks.delete(el)
      observer.unobserve(el)
    }
  }, [threshold])

  return ref
}
