'use client'

import { useEffect, useRef } from 'react'

// CLAUDE.md: "Observer tek bir hook'ta toplanır... Her bölüm kendi
// observer'ını kurmaz." — bu yüzden IntersectionObserver modül seviyesinde
// tek bir örnek olarak tutulur, her useReveal() çağrısı aynı örneği paylaşır.
let sharedObserver: IntersectionObserver | null = null
const revealCallbacks = new WeakMap<Element, () => void>()

function getObserver() {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        revealCallbacks.get(entry.target)?.()
        sharedObserver?.unobserve(entry.target)
        revealCallbacks.delete(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  return sharedObserver
}

/**
 * Bir elemanı görünür olduğunda `.is-visible` sınıfıyla işaretler.
 * Kullanım: `const ref = useReveal<HTMLDivElement>()`, sonra
 * `<div ref={ref} className="reveal">...</div>`.
 */
export function useReveal<T extends HTMLElement>() {
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

    const observer = getObserver()
    revealCallbacks.set(el, () => el.classList.add('is-visible'))
    observer.observe(el)

    return () => {
      revealCallbacks.delete(el)
      observer.unobserve(el)
    }
  }, [])

  return ref
}
