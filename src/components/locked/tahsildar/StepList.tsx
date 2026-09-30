import type { TsdStepListProps } from "@/types/content";

// Para akışı, numaralı (CSS sayacı).
export function StepList({ items }: TsdStepListProps) {
  return (
    <ol className="steps">
      {items.map((s) => (
        <li key={s.lead}>
          <p>
            <b>{s.lead}</b> {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
