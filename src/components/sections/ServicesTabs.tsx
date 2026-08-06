"use client";

import { useState } from "react";
import type { Service } from "@/types/content";

interface ServicesTabsProps {
  items: Service[];
  labels: { problem: string; action: string; outcome: string };
}

// dc.html'de her tab için sabit, index'e bağlı SVG (bkz. AudienceCard'daki
// aynı karar) — veri kaynaklı değil, bu yüzden content.ts'te yer almıyor.
function BlueprintIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "var(--bronze)" : "var(--muted)"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" />
      <line x1="9.5" y1="9.5" x2="9.5" y2="21" />
    </svg>
  );
}

function HandshakeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "var(--bronze)" : "var(--muted)"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 14.5 5.8 18.2a3 3 0 1 1-4.2-4.2l3.7-3.7" />
      <path d="m14.5 9.5 3.7-3.7a3 3 0 1 1 4.2 4.2l-3.7 3.7" />
      <line x1="9" y1="15" x2="15" y2="9" />
    </svg>
  );
}

function GlobeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "var(--bronze)" : "var(--muted)"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </svg>
  );
}

function PhoneIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "var(--bronze)" : "var(--muted)"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M9.5 8.5h5" />
      <path d="M9.5 12h5" />
    </svg>
  );
}

const ICONS = [BlueprintIcon, HandshakeIcon, GlobeIcon, PhoneIcon];

// dc.html: st.waysTab index state'i (satır 2319-2334). Tab tıklaması
// doğrudan set ediyor (toggle değil) — AudienceAccordion'daki openIndex
// deseniyle aynı. Panel crossfade'i CSS :hover/:has() ile çözülemez,
// çünkü seçim tıklamayla kalıcı (mouse tab'dan uzaklaşınca kaybolmuyor),
// bu yüzden JS state kaçınılmaz. Approach/Testimonials'ın hover state'i
// CSS class'a taşıma sebebi (inline style :hover'ı ezer) burada geçerli
// değil — :hover yok, tıklama state'i var — o yüzden AudienceAccordion'ın
// inline-style deseniyle tutarlı gidildi.
//
// Dört panel de her zaman DOM'da (dc.html: grid-area: 1/1 ile üst üste
// bindirilmiş), sadece aktif olan opacity/pointer-events/visibility ile
// görünür — bu, panel içeriğinin crossfade ile geçmesini sağlıyor.
//
// zIndex: dc.html'de panelStyle'da hiç z-index yok — Playwright ile kare
// kare ölçüldüğünde (bkz. commit "fix(services): resolve panel crossfade
// z-index...") geçiş sırasında ~370ms boyunca iki panel de opacity>0 ve
// ikisi de visibility:visible; z-index olmadan hangisinin üstte göründüğü
// DOM/array sırasına bağlı kalıyor, aktif olana değil — bu da metinlerin
// okunaksız üst üste binmesine yol açıyordu (dc.html'de de aynı kusur var,
// bizim implementasyona özgü değil). Aktif panel her zaman zIndex:2 ile
// üstte tutuluyor, solan eski panel zIndex:1 ile altta kalıyor.
export default function ServicesTabs({ items, labels }: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid grid-cols-[minmax(280px,1fr)_2fr] items-start gap-11">
      <div className="flex flex-col gap-1">
        {items.map((item, i) => {
          const Icon = ICONS[i];
          const isActive = i === activeTab;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActiveTab(i)}
              aria-current={isActive ? "true" : undefined}
              className="focus-visible:outline-bronze grid cursor-pointer grid-cols-[42px_1fr] items-center gap-3.5 rounded-[14px] border-0 py-[22px] pr-[22px] pl-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderLeft: `3px solid ${isActive ? "var(--bronze)" : "transparent"}`,
                background: isActive
                  ? "color-mix(in srgb, var(--ivory) 50%, white 50%)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 16px 36px -22px color-mix(in srgb, var(--navy) 50%, transparent)"
                  : "none",
                opacity: isActive ? 1 : 0.55,
                transition:
                  "background .35s ease, opacity .35s ease, box-shadow .35s ease, border-color .35s ease",
              }}
            >
              <span
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: isActive
                    ? "color-mix(in srgb, var(--bronze) 14%, transparent)"
                    : "color-mix(in srgb, var(--navy) 5%, transparent)",
                  transition: "background .35s ease",
                }}
              >
                <Icon active={isActive} />
              </span>
              <div className="flex min-w-0 items-baseline gap-2.5">
                <span
                  className="shrink-0 font-mono text-[11.5px] tracking-[0.08em]"
                  style={{ color: isActive ? "var(--bronze)" : "var(--muted)" }}
                >
                  {String(item.number).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="mb-[7px] font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {item.tag}
                  </p>
                  <p
                    className="font-display text-[1.16rem] leading-[1.28] text-navy"
                    style={{
                      fontWeight: isActive ? 600 : 500,
                      transition: "font-weight .2s ease",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="grid overflow-hidden rounded-[20px] border border-navy/12"
        style={{
          background: "color-mix(in srgb, var(--ivory) 50%, white 50%)",
          boxShadow: "0 28px 64px -34px color-mix(in srgb, var(--navy) 45%, transparent)",
        }}
      >
        {items.map((item, i) => {
          const isActive = i === activeTab;
          return (
            <div
              key={item.slug}
              style={{
                gridArea: "1 / 1",
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 16}px)`,
                pointerEvents: isActive ? "auto" : "none",
                visibility: isActive ? "visible" : "hidden",
                transition:
                  "opacity .45s ease, transform .5s cubic-bezier(.2,.8,.2,1), visibility .45s",
              }}
            >
              <div className="px-[clamp(30px,3vw,44px)] py-[clamp(30px,3vw,44px)]">
                <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">
                  {labels.problem}
                </p>
                <p className="max-w-[68ch] text-[15.5px] leading-[1.66] text-charcoal">
                  {item.problem}
                </p>
              </div>
              <div
                className="border-y border-navy/[0.09] px-[clamp(30px,3vw,44px)] py-[clamp(30px,3vw,44px)]"
                style={{
                  background: "color-mix(in srgb, var(--bronze) 2%, var(--ivory) 98%)",
                }}
              >
                <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">
                  {labels.action}
                </p>
                <p className="max-w-[68ch] text-[15.5px] leading-[1.66] text-charcoal">
                  {item.action}
                </p>
              </div>
              <div className="border-l-[3px] border-bronze px-[clamp(30px,3vw,44px)] py-[clamp(30px,3vw,44px)]">
                <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                  {labels.outcome}
                </p>
                <p className="max-w-[68ch] text-[15.5px] leading-[1.66] text-charcoal">
                  {item.outcome}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
