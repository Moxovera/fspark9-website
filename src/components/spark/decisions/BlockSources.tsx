import { ArrowUpRightIcon } from "@/components/icons";
import { monoText } from "@/components/spark/decisions/styles";
import type { BlockSourcesProps } from "@/types/content";

/** Bloğun sonundaki kaynaklar: mono, altı çizili, dış ok, yeni sekme. */
export default function BlockSources({ label, sources }: BlockSourcesProps) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-[22px]">
      <p className={`${monoText} mt-0 mb-2 text-stone`}>{label}</p>
      <ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-[6px] p-0">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener"
              className="font-mono text-[13px] leading-[1.5] text-stone underline underline-offset-[3px] hover:text-ink"
            >
              {source.label}
              <ArrowUpRightIcon className="-my-1 ml-px inline-block size-[17px] align-[-3px]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
