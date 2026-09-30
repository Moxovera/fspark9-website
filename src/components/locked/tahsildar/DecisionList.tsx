import type { TsdDecisionListProps } from "@/types/content";

export function DecisionList({ items }: TsdDecisionListProps) {
  return (
    <ol>
      {items.map((d) => (
        <li key={d.lead}>
          <b>{d.lead}</b>
          {d.text}
        </li>
      ))}
    </ol>
  );
}
