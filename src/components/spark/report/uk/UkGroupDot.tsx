import { GROUP_BG } from "@/components/spark/report/uk/groups";
import type { UkGroupDotProps } from "@/types/content";

/** Oyuncu grubunun renk noktası (dekoratif; grup adı her zaman yanında yazılı). */
export default function UkGroupDot({ group, className = "size-2.5" }: UkGroupDotProps) {
  return <span aria-hidden="true" className={`inline-block flex-none rounded-full ${GROUP_BG[group]} ${className}`} />;
}
