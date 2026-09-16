// Renders a small, trusted, developer-authored HTML fragment extracted
// verbatim from the reference file (strong/em/br/sup and the [n] source-ref
// anchors) — never user input. See the "Report body" note in
// src/types/content.ts.
export function RichText({ html, as = "span", className }: { html: string; as?: "span" | "div"; className?: string }) {
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
