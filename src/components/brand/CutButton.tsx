import BookingCta from "@/components/booking/BookingCta";
import { ArrowRightIcon } from "@/components/icons";
import type { CutButtonProps } from "@/types/content";

const TONE = {
  flare: "bg-flare text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
} as const;

// Board ölçüleri: sayfa içi 15px / 17-44-17-22, header 14px / 14-40-14-18.
const SIZE = {
  default: "text-[15px] py-[17px] pr-[44px] pl-[22px]",
  header: "text-[14px] py-[14px] pr-[40px] pl-[18px]",
} as const;

/**
 * Eğik sağ kenarlı buton (brand book v3 §5 "Cut", 18px eğim). Sitede tek
 * çağrı metni var ("Book a call") ve her örnek randevu penceresini açar,
 * bu yüzden bileşen BookingCta'yı sarıyor: kendisi server, sadece içteki
 * buton client.
 */
export default function CutButton({ label, tone = "flare", size = "default", className }: CutButtonProps) {
  // Board'daki metin oku (mono, 0.6em ilerleme) yerine SVG ok: görsel
  // boyutu 1em, negatif yatay margin ile kapladığı yer 0.6em, böylece
  // buton genişliği board'la aynı kalıyor.
  return (
    <BookingCta
      className={`group inline-flex items-center gap-[14px] font-sans leading-none font-bold whitespace-nowrap [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)] ${TONE[tone]} ${SIZE[size]} ${className ?? ""}`}
    >
      {label}
      <ArrowRightIcon className="go-arrow -mx-[0.2em] size-[1em] flex-none" />
    </BookingCta>
  );
}
