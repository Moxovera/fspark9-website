"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface TooltipApi {
  show: (html: string, x: number, y: number) => void;
  move: (x: number, y: number) => void;
  hide: () => void;
}

const TooltipContext = createContext<TooltipApi | null>(null);

export function useChartTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useChartTooltip must be used inside <ChartTooltipProvider>");
  return ctx;
}

/**
 * One floating tooltip shared by every chart on the report, mirroring the
 * reference's single #tip element + pointerover/pointermove/pointerout
 * delegation (scratchpad script2.js:282-298) — marks call show/move/hide
 * directly via pointer/focus handlers instead of a document-level
 * listener, since each mark is a real React element here.
 */
export function ChartTooltipProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<string | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const tipRef = useRef<HTMLDivElement>(null);

  const place = useCallback((x: number, y: number) => {
    const tip = tipRef.current;
    const r = tip?.getBoundingClientRect();
    const w = r?.width ?? 0;
    const h = r?.height ?? 0;
    let left = x + 14;
    let top = y + 14;
    if (left + w > window.innerWidth - 8) left = x - w - 14;
    if (top + h > window.innerHeight - 8) top = y - h - 14;
    setPos({ left: Math.max(8, left), top: Math.max(8, top) });
  }, []);

  const show = useCallback(
    (html: string, x: number, y: number) => {
      posRef.current = { x, y };
      setContent(html);
      place(x, y);
    },
    [place],
  );

  const move = useCallback(
    (x: number, y: number) => {
      posRef.current = { x, y };
      if (content) place(x, y);
    },
    [content, place],
  );

  const hide = useCallback(() => setContent(null), []);

  return (
    <TooltipContext.Provider value={{ show, move, hide }}>
      {children}
      <div
        ref={tipRef}
        className={`tip${content ? " show" : ""}`}
        style={{ left: pos.left, top: pos.top }}
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    </TooltipContext.Provider>
  );
}

/** Spread onto an SVG mark (<path>/<circle>) to wire it into the shared tooltip. */
export function tipHandlers(tip: TooltipApi, html: string) {
  return {
    tabIndex: 0,
    onPointerEnter: (e: React.PointerEvent) => tip.show(html, e.clientX, e.clientY),
    onPointerMove: (e: React.PointerEvent) => tip.move(e.clientX, e.clientY),
    onPointerLeave: () => tip.hide(),
    onFocus: (e: React.FocusEvent<SVGElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      tip.show(html, r.right, r.top);
    },
    onBlur: () => tip.hide(),
  };
}
