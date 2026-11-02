import type { KycPhoneProps } from "@/types/content";

/**
 * Telefon çerçevesi (referans `.phone`): üstte saat satırı, altında
 * mesajlar. `visible`'dan sonraki mesajlar aşağıda ve görünmez bekler;
 * görünür olunca 480ms'de yerine gelir. Köşeleri yuvarlak olan tek yer.
 */
export default function KycPhone({ clock, messages, visible, keyPrefix }: KycPhoneProps) {
  return (
    <div
      aria-live="polite"
      className="relative mx-auto flex min-h-[420px] w-[300px] max-w-full flex-col gap-2.5 rounded-[38px] border-[10px] border-ink bg-paper px-3.5 pt-[34px] pb-[22px] before:absolute before:top-2.5 before:left-1/2 before:h-1.5 before:w-20 before:-translate-x-1/2 before:rounded-[3px] before:bg-ink before:content-['']"
    >
      <div className="mb-1 text-center font-mono text-[11px] tracking-[0.06em] text-stone">{clock}</div>
      {messages.map((msg, i) => (
        <div
          key={`${keyPrefix}-${i}`}
          className={`grid gap-[3px] rounded-[14px] bg-white px-[13px] py-[11px] transition-[opacity,transform] duration-[480ms] ease-brand motion-reduce:transition-none ${msg.good ? "border-[1.5px] border-ink" : msg.bad ? "border border-negative" : "border border-rule"} ${i < visible ? "" : "translate-y-2 opacity-0"}`}
        >
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-stone uppercase">{msg.app}</span>{" "}
          <span className="text-[14.5px] leading-[1.4]">{msg.text}</span>
          {msg.sub && (
            <>
              {" "}
              <span className="text-[12.5px] text-stone">{msg.sub}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
