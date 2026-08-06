"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/types/content";

interface TestimonialSliderProps {
  slides: Testimonial[];
}

type PendingFocus = "prev" | "next" | "dot" | null;

function PrevIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// dc.html: st.testi index'i + testiDots[i].go + testiPrev/testiNext
// (satır 2295-2303). dc.html'in Math.min/Math.max clamp'i t.builds.testi
// dinamik olabileceği için var — burada slides sabit bir prop, mod
// aritmetiği zaten kendi içinde tutarlı, ayrı bir clamp gerekmiyor.
// Dot'lar dc.html'de <span onClick>, ok butonları zaten <button> —
// AudienceAccordion'daki aynı erişilebilirlik kararıyla dot'lar da
// gerçek <button> oldu (klavye erişimi için).
// dc.html her slaytın dot/ok kontrollerini kendi panelinde tekrar ediyor
// (sc-for testiSlides içinde) — track sadece görsel olarak kaydırıyor,
// ekran dışındaki slaytların düğmeleri DOM'da hâlâ Tab ile erişilebilir
// kalıyor. React'e taşırken bu görünmez-ama-odaklanabilir kusuru
// bırakmadık: aktif olmayan slaytlar inert + aria-hidden.
//
// inert'in kendi yan etkisi: tıklanan buton kendi paneli inert olunca
// odağını kaybediyor (taşıyıcı inert olan bir eleman fokus tutamaz),
// fokus document.body'ye düşüyor — klavye kullanıcısı sayfanın başına
// atılmış oluyor. pendingFocusRef + effect bunu telafi ediyor: hangi
// kontrolün tetiklendiğini hatırlayıp yeni aktif slaytın karşılık gelen
// kontrolüne fokusu geri taşıyor.
export default function TestimonialSlider({ slides }: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pendingFocusRef = useRef<PendingFocus>(null);
  const prevBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dotBtnRefs = useRef<(HTMLButtonElement | null)[][]>([]);

  useEffect(() => {
    const pending = pendingFocusRef.current;
    pendingFocusRef.current = null;
    if (!pending) return;
    if (pending === "prev") prevBtnRefs.current[activeIndex]?.focus();
    else if (pending === "next") nextBtnRefs.current[activeIndex]?.focus();
    else dotBtnRefs.current[activeIndex]?.[activeIndex]?.focus();
  }, [activeIndex]);

  if (slides.length === 0) return null;

  const goPrev = () => {
    pendingFocusRef.current = "prev";
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  };
  const goNext = () => {
    pendingFocusRef.current = "next";
    setActiveIndex((i) => (i + 1) % slides.length);
  };
  const goToDot = (i: number) => {
    pendingFocusRef.current = "dot";
    setActiveIndex(i);
  };

  return (
    <div
      className="testimonial-track flex w-full"
      style={{ transform: `translateX(${-activeIndex * 100}%)` }}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.order}
          className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
          style={{ flex: "0 0 100%" }}
          inert={slideIndex !== activeIndex}
          aria-hidden={slideIndex !== activeIndex}
        >
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 bg-navy px-8 py-[clamp(40px,4.4vw,68px)] text-center">
            <p className="max-w-[22ch] text-pretty font-display text-[clamp(1.5rem,2.3vw,2.05rem)] leading-[1.22] font-medium text-ivory">
              {slide.headline}
            </p>
            <button
              type="button"
              className="testimonial-cta rounded-full px-[30px] py-[15px] text-[14.5px] font-medium"
            >
              {slide.ctaLabel}
            </button>
          </div>
          <div className="flex min-h-[400px] flex-col justify-between gap-10 bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)] px-8 py-[clamp(40px,4.4vw,62px)]">
            <div>
              <p className="mb-[26px] text-pretty font-display text-[clamp(1.18rem,1.8vw,1.6rem)] leading-[1.45] font-medium text-navy">
                {slide.quote}
              </p>
              <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                {slide.attribution}
              </p>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div
                role="group"
                aria-label="Testimonial navigation"
                className="flex items-center gap-[9px]"
              >
                {slides.map((s, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={s.order}
                      ref={(el) => {
                        (dotBtnRefs.current[slideIndex] ??= [])[i] = el;
                      }}
                      type="button"
                      onClick={() => goToDot(i)}
                      aria-label={`Go to testimonial ${i + 1} of ${slides.length}`}
                      aria-current={isActive ? "true" : undefined}
                      className="focus-visible:outline-bronze cursor-pointer rounded-full border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        width: isActive ? "26px" : "8px",
                        height: "8px",
                        background: isActive
                          ? "var(--bronze)"
                          : "color-mix(in srgb, var(--navy) 18%, transparent)",
                        transition:
                          "width .4s cubic-bezier(.2,.8,.2,1), background .3s ease",
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex gap-2.5">
                <button
                  ref={(el) => {
                    prevBtnRefs.current[slideIndex] = el;
                  }}
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="testimonial-nav-btn focus-visible:outline-bronze flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <PrevIcon />
                </button>
                <button
                  ref={(el) => {
                    nextBtnRefs.current[slideIndex] = el;
                  }}
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="testimonial-nav-btn focus-visible:outline-bronze flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <NextIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
