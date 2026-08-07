"use client";

import { useState } from "react";
import { HandshakeIcon, GlobeIcon } from "@/components/sections/ServicesTabs";
import type { Service, ServicesSection } from "@/types/content";

interface ServicesDetailTabsProps {
  items: Service[];
  labels: ServicesSection["labels"];
}

// dc.html: svcTabs (satır 2358-2374) — /services'in kendi tab+panel
// kabuğu. Home'un ServicesTabs.tsx'iyle AYNI değil: b.i0/b.i3 ikonları
// farklı (bkz. aşağıdaki CompassIcon/PhoneDashIcon), numara rozeti yok,
// panel 3 anlamlı satır yerine 4 satırlık zebra-desenli bir grid.
// Sadece i1/i2 (Handshake/Globe) Home'la path olarak birebir aynı.
function CompassIcon({ active }: { active: boolean }) {
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
      <polygon points="15.5 8.5 10.8 10.8 8.5 15.5 13.2 13.2" />
    </svg>
  );
}

function PhoneDashIcon({ active }: { active: boolean }) {
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
      <line x1="10.5" y1="18.2" x2="13.5" y2="18.2" />
    </svg>
  );
}

const ICONS = [CompassIcon, HandshakeIcon, GlobeIcon, PhoneDashIcon];

// dc.html: rowAccent (satır 2357), 4 satırın etiket rengi sırayla
// bronze/muted/navy/off-brand-bronze — bkz. globals.css'teki
// color-mix() notu (#8A6A45 için).
const ROW_ACCENTS = [
  "var(--bronze)",
  "var(--muted)",
  "var(--navy)",
  "color-mix(in srgb, var(--bronze) 80%, var(--navy) 20%)",
];

function rowsFor(item: Service, labels: ServicesSection["labels"]) {
  return [
    { label: labels.rightDoor, text: item.rightDoor },
    { label: labels.notRightDoor, text: item.notRightDoor },
    { label: labels.duration, text: item.duration },
    { label: labels.runsOn, text: item.runsOn },
  ];
}

export default function ServicesDetailTabs({ items, labels }: ServicesDetailTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid grid-cols-[minmax(290px,1fr)_2fr] items-start gap-11">
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
              className="focus-visible:outline-bronze flex cursor-pointer items-center gap-3.5 rounded-[14px] border-0 py-[18px] px-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
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
              <div className="min-w-0">
                <p className="mb-1.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {item.tag}
                </p>
                <p
                  className="font-display text-[1.12rem] leading-[1.26] text-navy"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    transition: "font-weight .2s ease",
                  }}
                >
                  {item.title}
                </p>
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
          const rows = rowsFor(item, labels);
          return (
            <div
              key={item.slug}
              className="flex h-full flex-col"
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
              <div className="bg-navy px-[clamp(28px,3vw,40px)] py-[clamp(28px,3vw,40px)]">
                <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                  {item.tag}
                </p>
                <h2 className="font-display text-[clamp(1.5rem,2.4vw,2.05rem)] leading-[1.14] font-medium text-ivory">
                  {item.title}
                </h2>
              </div>
              <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] content-stretch">
                {rows.map((row, j) => (
                  <div
                    key={row.label}
                    className="border-t border-l border-navy/[0.09] px-[clamp(24px,2.4vw,32px)] py-[clamp(24px,2.4vw,32px)]"
                    style={{
                      background: j % 2
                        ? "color-mix(in srgb, var(--bronze) 3%, var(--ivory) 97%)"
                        : "color-mix(in srgb, var(--ivory) 50%, white 50%)",
                    }}
                  >
                    <p
                      className="mb-2.5 font-mono text-[11px] tracking-[0.14em] uppercase"
                      style={{ color: ROW_ACCENTS[j % 4] }}
                    >
                      {row.label}
                    </p>
                    <p className="text-[15px] leading-[1.64] text-charcoal">{row.text}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
