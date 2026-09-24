import { Link } from "@/i18n/navigation";
import GoButton from "@/components/brand/GoButton";
import Label from "@/components/brand/Label";
import type { CaseContent } from "@/types/content";

interface CaseRowProps {
  item: CaseContent;
  readLabel: string;
}

/**
 * Work listesinde bir vaka (board WorkList / WorkListM). Satırın tamamı
 * tek link: ad, tek satır, hizmet etiketleri, bir kanıt rakamı, "Read the
 * case" ve kare Ink ok (masaüstü 64px, mobil 44px). Hover'da zemin
 * Paper'dan White'a, ok 4px sağa (brief §10).
 *
 * Board'daki 4/4/2/2 sütun düzeni ancak ~1360px'ten itibaren sığıyor;
 * altında kanıt rakamı "Read the case"in altına kayıyordu. 900-1359
 * arası 3/4/3/2, rakam genişlikle küçülüyor, buton metni butonun üstünde.
 */
export default function CaseRow({ item, readLabel }: CaseRowProps) {
  return (
    <Link
      href={{ pathname: "/work/[slug]", params: { slug: item.slug } }}
      className="group flex flex-col gap-3 border-t-2 border-ink pt-6 pb-7 no-underline transition-colors duration-[160ms] ease-brand hover:bg-white min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-6 min-[900px]:pt-10 min-[900px]:pb-11"
    >
      <span className="flex items-baseline justify-between min-[900px]:col-span-3 min-[1360px]:col-span-4">
        <span className="font-display text-[44px] leading-none font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[clamp(64px,6.112vw,88px)] min-[900px]:leading-[0.9] min-[900px]:tracking-[-0.045em]">
          {item.name}
        </span>
        <Label as="span" className="min-[900px]:hidden">
          {item.market}
        </Label>
      </span>
      <span className="flex flex-col gap-3 min-[900px]:col-span-4 min-[1360px]:col-span-4">
        <span className="text-[17px] leading-[1.5] text-ink min-[900px]:text-[19px] min-[900px]:leading-[1.45]">
          {item.subtitle}
        </span>
        <Label as="span" strong className="hidden min-[900px]:block">
          {item.tags}
        </Label>
      </span>
      <span className="flex min-w-0 items-baseline gap-[10px] min-[900px]:col-span-3 min-[900px]:flex-col min-[900px]:items-start min-[900px]:gap-[6px] min-[1360px]:col-span-2">
        <span className="font-display text-[32px] leading-[normal] font-extrabold tracking-[-0.03em] text-ink min-[900px]:text-[clamp(36px,3.334vw,48px)] min-[900px]:leading-none min-[900px]:tracking-[-0.035em] min-[900px]:whitespace-nowrap">
          {item.proof.value}
        </span>
        <Label as="span">{item.proof.label}</Label>
      </span>
      <Label as="span" strong className="min-[900px]:hidden">
        {item.tags}
      </Label>
      <span className="flex items-center justify-end gap-[10px] text-right text-[15px] leading-[normal] font-bold text-ink min-[900px]:col-span-2 min-[900px]:col-start-11 min-[900px]:flex-col min-[900px]:items-end min-[900px]:gap-2 min-[1360px]:flex-row min-[1360px]:items-center min-[1360px]:gap-[14px] min-[1360px]:whitespace-nowrap">
        {readLabel}
        <GoButton size={44} className="min-[900px]:size-16 min-[900px]:text-[26px]" />
      </span>
    </Link>
  );
}
