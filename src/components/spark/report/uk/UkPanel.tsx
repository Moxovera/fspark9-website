import { MinusIcon, PlusIcon } from "@/components/icons";
import type { UkPanelProps } from "@/types/content";

/** Kapalı başlayan büyük açılır panel (bilanço tabloları): yerel <details>, artı/eksi. */
export default function UkPanel({ title, children, tone }: UkPanelProps) {
  return (
    <details className={`group border-t-2 border-ink ${tone === "white" ? "bg-paper" : "bg-white"}`}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-display text-[18px] leading-[1.3] font-bold [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon className="size-5 flex-none text-stone group-open:hidden" />
        <MinusIcon className="hidden size-5 flex-none text-stone group-open:block" />
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
