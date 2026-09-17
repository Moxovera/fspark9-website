import Link from "next/link";
import { ArrowRightIcon } from "@/components/sections/ServicesAccordion";

// Quiet link from the report to the working-together page. The reference
// put this above the fspark9/Mehmet Burak Dikmen byline in the hero; moved
// to just below it per design review, matching where it already sits in
// the closing section (after .sign). The "→" in the source was a literal
// arrow character — swapped for the site's existing ArrowRightIcon per
// CLAUDE.md's rule against embedding Unicode arrows.
export function NextLine({
  href,
  text,
  className,
  external,
}: {
  href: string;
  text: string;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      {text}
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        <ArrowRightIcon />
      </span>
    </>
  );
  return (
    <p className={`next-line${className ? ` ${className}` : ""}`}>
      {external ? (
        <a href={href} target="_blank" rel="noopener">
          {inner}
        </a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </p>
  );
}
