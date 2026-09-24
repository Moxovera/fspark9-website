"use client";

import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { useHeaderState } from "@/components/chrome/HeaderFrame";

const PANEL_ID = "services-menu";

/**
 * Header'daki "Services" butonu (board ServicesMenu). Tıklama ve klavye
 * (Enter/Space, native button) aç/kapa yapar, üzerine gelince 120ms
 * sonra açar. Açıkken 2px alt çizgi alır.
 */
export function ServicesMenuButton({ label }: { label: string }) {
  const { servicesOpen, toggleServices, scheduleOpenServices, cancelScheduledOpen, registerServicesButton } =
    useHeaderState();

  return (
    <button
      ref={registerServicesButton}
      type="button"
      aria-expanded={servicesOpen}
      aria-controls={PANEL_ID}
      onClick={() => {
        cancelScheduledOpen();
        toggleServices();
      }}
      onMouseEnter={() => {
        if (!servicesOpen) scheduleOpenServices();
      }}
      className={`flex cursor-pointer items-center gap-2 border-b-2 pt-[6px] pb-1 text-[15px] leading-[normal] font-medium text-paper group-data-[tone=light]/header:text-ink ${
        servicesOpen ? "border-current" : "border-transparent"
      }`}
    >
      {label}
      <ChevronDownIcon className="-mx-px size-[12px] flex-none" />
    </button>
  );
}

/**
 * Menü paneli: header'ın hemen altında tam genişlik White şerit. İçerik
 * (başlık bloğu ve dört hizmet kartı) server'da üretilip children olarak
 * geliyor. Kapalıyken DOM'da kalıyor ama `hidden`: ekran okuyucu ve Tab
 * sırasından çıkıyor.
 */
export function ServicesMenuPanel({ children }: { children: ReactNode }) {
  const { servicesOpen } = useHeaderState();

  return (
    <div
      id={PANEL_ID}
      hidden={!servicesOpen}
      className="absolute inset-x-0 top-[calc(100%+1px)] border-b border-rule bg-white max-[899px]:hidden"
    >
      {children}
    </div>
  );
}
