import { Link } from "@/i18n/navigation";
import type { ServicesSection } from "@/types/content";

interface ServicesProps {
  content: ServicesSection;
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

export default function Services({ content }: ServicesProps) {
  const {
    heading,
    intro,
    labels,
    items,
    fullEngagementHeading,
    fullEngagementBody,
    link,
  } = content;
  const activeItem = items[0];

  return (
    <section className="bg-ivory px-7 py-[104px]">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-4 font-display text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.1] font-medium text-navy">
          {heading}
        </h2>
        <p className="mb-14 text-[1.08rem] text-muted">{intro}</p>

        {/* Masaüstü (≥900px, dc.html: st.w<900 eşiği): sol tab listesi +
            sağ panel. Geçiş A'da tab tıklaması yok, sadece ilk hizmet
            (index 0) açık/vurgulu gösteriliyor, diğer üçü pasif tab
            olarak duruyor — crossfade Geçiş C'ye kalıyor. */}
        <div className="hidden min-[900px]:grid min-[900px]:grid-cols-[minmax(280px,1fr)_2fr] min-[900px]:items-start min-[900px]:gap-11">
          <div className="flex flex-col gap-1">
            {items.map((item, i) => {
              const Icon = ICONS[i];
              const isActive = i === 0;
              return (
                <div
                  key={item.slug}
                  className="grid grid-cols-[42px_1fr] items-center gap-3.5 rounded-[14px] py-[22px] pr-[22px] pl-5"
                  style={{
                    borderLeft: `3px solid ${isActive ? "var(--bronze)" : "transparent"}`,
                    background: isActive
                      ? "color-mix(in srgb, var(--ivory) 50%, white 50%)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 16px 36px -22px color-mix(in srgb, var(--navy) 50%, transparent)"
                      : "none",
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  <span
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: isActive
                        ? "color-mix(in srgb, var(--bronze) 14%, transparent)"
                        : "color-mix(in srgb, var(--navy) 5%, transparent)",
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
                        className={`font-display text-[1.16rem] leading-[1.28] text-navy ${
                          isActive ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="overflow-hidden rounded-[20px] border border-navy/12"
            style={{
              background: "color-mix(in srgb, var(--ivory) 50%, white 50%)",
              boxShadow:
                "0 28px 64px -34px color-mix(in srgb, var(--navy) 45%, transparent)",
            }}
          >
            <div className="px-[clamp(30px,3vw,44px)] py-[clamp(30px,3vw,44px)]">
              <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">
                {labels.problem}
              </p>
              <p className="max-w-[68ch] text-[15.5px] leading-[1.66] text-charcoal">
                {activeItem.problem}
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
                {activeItem.action}
              </p>
            </div>
            <div className="border-l-[3px] border-bronze px-[clamp(30px,3vw,44px)] py-[clamp(30px,3vw,44px)]">
              <p className="mb-2.5 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                {labels.outcome}
              </p>
              <p className="max-w-[68ch] text-[15.5px] leading-[1.66] text-charcoal">
                {activeItem.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Mobil/tablet (<900px): her hizmet kendi kartında, problem/
            action/outcome hep açık, tab yok. */}
        <div className="flex flex-col gap-5 min-[900px]:hidden">
          {items.map((item) => (
            <div
              key={item.slug}
              className="rounded-[18px] border border-navy/12 p-[26px]"
              style={{ background: "color-mix(in srgb, var(--ivory) 50%, white 50%)" }}
            >
              <p className="mb-3 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                {String(item.number).padStart(2, "0")} · {item.tag}
              </p>
              <h3 className="mb-5 font-display text-[1.45rem] leading-[1.18] font-medium text-navy">
                {item.title}
              </h3>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {labels.problem}
              </p>
              <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.problem}</p>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                {labels.action}
              </p>
              <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.action}</p>
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
                {labels.outcome}
              </p>
              <p className="text-[15px] leading-[1.62] text-charcoal">{item.outcome}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 border-t border-charcoal/12 pt-[34px]">
          <h4 className="font-display text-[1.6rem] leading-[1.2] font-medium text-navy">
            {fullEngagementHeading}
          </h4>
          <p className="col-span-2 min-w-0 text-[1rem] leading-[1.68] text-charcoal">
            {fullEngagementBody}
          </p>
        </div>

        <Link
          href={link.href}
          className="mt-9 inline-block border-b border-bronze/40 pb-1 font-mono text-[13px] tracking-[0.06em] text-navy"
        >
          {link.label}
        </Link>
      </div>
    </section>
  );
}
