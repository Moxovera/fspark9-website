import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { UkStats, tagText } from "@/components/spark/report/uk/UkBlocks";
import UkGroupDot from "@/components/spark/report/uk/UkGroupDot";
import { GROUP_OPEN_BORDER } from "@/components/spark/report/uk/groups";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { monoText } from "@/components/spark/decisions/styles";
import type { UkPlayersProps } from "@/types/content";

/**
 * 02 Oyuncular: dört rakam, altı grup kartı (yerel <details>: kapalıyken
 * renk noktası, ad, "N örnek" ve tek satır "nedir"; açıkken "Kimler" ve
 * "Bugün nerede"), altında koyu "beş terim" paneli.
 */
export default function UkPlayers({ players, template, tone }: UkPlayersProps) {
  const card = tone === "white" ? "bg-paper" : "bg-white";
  return (
    <div className="grid gap-[clamp(36px,5vw,56px)]">
      <UkStats items={players.stats} template={template} />

      <div className="grid grid-cols-1 items-start gap-3 min-[901px]:grid-cols-2">
        {players.groups.map((g) => (
          <details key={g.group} className={`group border-l-4 border-transparent ${card} ${GROUP_OPEN_BORDER[g.group]}`}>
            <summary className="grid min-h-11 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-5 py-[18px] [&::-webkit-details-marker]:hidden">
              <UkGroupDot group={g.group} className="mt-[7px] size-3.5" />
              <h3 className="m-0 font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.01em]">{g.name}</h3>
              <span className={`${tagText} border border-rule px-2 py-[3px] whitespace-nowrap text-stone`}>
                {g.count} {players.labels.examples}
              </span>
              <p className="col-start-2 col-end-4 mt-1 mb-0 text-[15.5px] text-stone">
                <span className="sr-only">{players.labels.what}: </span>
                <Psd3Text text={g.what} template={template} />
              </p>
              <span className={`${tagText} col-start-2 col-end-4 mt-1.5 flex items-center gap-1.5 text-stone`}>
                {players.labels.more}
                <PlusIcon className="size-4 group-open:hidden" />
                <MinusIcon className="hidden size-4 group-open:block" />
              </span>
            </summary>
            <div className="grid gap-1 border-t border-rule px-5 pt-1 pb-5 min-[601px]:pl-[46px]">
              <span className={`${tagText} mt-3 text-stone`}>{players.labels.who}</span>
              <p className="m-0 text-[15.5px]">
                <Psd3Text text={g.who} template={template} />
              </p>
              <span className={`${tagText} mt-3 text-stone`}>{players.labels.status}</span>
              <p className="m-0 text-[15.5px]">
                <Psd3Text text={g.status} template={template} />
              </p>
            </div>
          </details>
        ))}
      </div>

      <div className="on-ink bg-ink px-[clamp(20px,3vw,32px)] py-[clamp(24px,3vw,32px)] text-paper">
        <h3 className={`${monoText} m-0 mb-3 text-dust`}>{players.termsTitle}</h3>
        <dl className="m-0 grid">
          {players.terms.map((t) => (
            <div key={t.term} className="grid gap-1.5 border-t border-inkrule py-4 min-[901px]:grid-cols-[220px_minmax(0,1fr)] min-[901px]:gap-5">
              <dt className="font-display text-[19px] leading-[1.25] font-extrabold">{t.term}</dt>
              <dd className="m-0 text-[16px] text-dust">
                <Psd3Text text={t.text} template={template} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
