import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/types/content";

interface CaseCardProps {
  item: CaseStudy;
  linkLabel: string;
  // dc.html: Home'un "Selected work" kartı köşeli (satır 588), /work
  // index'in kartı border-radius:18px alıyor (satır 800) — tek gerçek
  // fark, hover gölgesi opaklığı (.22/.24) zaten paylaşılan
  // .case-study-card CSS class'ında eziliyor.
  rounded?: boolean;
}

export default function CaseCard({ item, linkLabel, rounded }: CaseCardProps) {
  return (
    <Link
      href={{ pathname: "/work/[slug]", params: { slug: item.slug } }}
      className={`case-study-card block h-full bg-navy text-ivory no-underline ${
        rounded ? "rounded-[18px] overflow-hidden" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <Image
          src={item.coverImage.url}
          alt={item.coverImage.alt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="p-[30px]">
        <h3 className="mb-1.5 font-display text-[1.6rem] font-semibold text-ivory">
          {item.name}
        </h3>
        <p className="mb-[18px] text-[14.5px] text-bronze">{item.subtitle}</p>
        <p className="mb-[22px] text-[15px] leading-[1.62] text-ivory/74">{item.body}</p>
        <p className="mb-[18px] font-mono text-[11.5px] tracking-[0.06em] text-ivory/50">
          {item.tags.join(" · ")}
        </p>
        <span className="font-mono text-[12.5px] text-bronze">{linkLabel}</span>
      </div>
    </Link>
  );
}
