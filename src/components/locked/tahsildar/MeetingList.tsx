"use client";

import { useState } from "react";
import type { TsdMeetingFilter, TsdMeetingListProps } from "@/types/content";

const FIRST = 4;

function matches(filter: TsdMeetingFilter["key"], phase: number) {
  if (filter === "all") return true;
  if (filter === "2") return phase >= 2;
  return String(phase) === filter;
}

// On beş görüşme kartı, faz süzgeci ve canlı sayı. İlk ikisinde
// "Görüşme sürüyor", ilk dördünde "İlk dört" etiketi.
export function MeetingList({ meetings, filters, labels }: TsdMeetingListProps) {
  const [filter, setFilter] = useState<TsdMeetingFilter["key"]>("all");
  const count = meetings.filter((m) => matches(filter, m.phase)).length;

  return (
    <>
      <div className="meet-head">
        <div className="seg" role="group" aria-label={labels.filterAria}>
          {filters.map((f) => (
            <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <span className="small" aria-live="polite">
          {count} {labels.countSuffix}
        </span>
      </div>
      <div className="meets">
        {meetings.map((m, k) => (
          <article key={m.title} className={k < FIRST ? "mt first" : "mt"} hidden={!matches(filter, m.phase)}>
            <span className="no">{k + 1}</span>
            <div>
              <h4>{m.title}</h4>
              <p className="who">{m.who}</p>
              <p>{m.text}</p>
              <div className="tags">
                <span>
                  {labels.phase} {m.phase}
                </span>
                {m.live && <span className="live">{labels.live}</span>}
                {k < FIRST && <span>{labels.firstFour}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
