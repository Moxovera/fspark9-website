import type { SVGProps } from "react";

/**
 * Sitenin tek ikon seti (CLAUDE.md "İkonlar", brief v4 §2). Board'lar
 * okları ve kapatma işaretini Unicode metin glyph'i olarak çiziyor,
 * bunlar burada inline SVG. Hepsi 24x24 viewBox, currentColor, 1.8
 * stroke, yuvarlak uç ve birleşim. Boyut ve renk kullanan yerden
 * className ile verilir, ikon hep dekoratif (aria-hidden): etiketi
 * taşıyan her zaman ikonu içeren link ya da buton.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Icon({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return <Icon d="M4 12h16M14 6l6 6-6 6" {...props} />;
}

export function ArrowLeftIcon(props: IconProps) {
  return <Icon d="M20 12H4M10 6l-6 6 6 6" {...props} />;
}

export function ArrowDownIcon(props: IconProps) {
  return <Icon d="M12 4v16M6 14l6 6 6-6" {...props} />;
}

/** Dış bağlantı oku (kaynak linkleri). */
export function ArrowUpRightIcon(props: IconProps) {
  return <Icon d="M7 17 17 7M8 7h9v9" {...props} />;
}

/** Services menü butonundaki açılır ok. */
export function ChevronDownIcon(props: IconProps) {
  return <Icon d="M5 9l7 7 7-7" {...props} />;
}

export function CloseIcon(props: IconProps) {
  return <Icon d="M5 5l14 14M19 5 5 19" {...props} />;
}

/** Mobil header'daki iki çizgili menü işareti (board HomeMobile: 24px genişlik, 12px aralık). */
export function MenuIcon(props: IconProps) {
  return <Icon d="M0 6h24M0 18h24" {...props} />;
}
