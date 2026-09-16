import Image from "next/image";

// Content slugs (fuzul-report-standalone.html / data.ts) use hyphenated
// names; the actual files in public/assets/bank-logos/ don't (pre-existing,
// not something this feature controls). This is the one place that maps
// between the two. halk-katilim has no file yet — not in PENDING (that set
// is fixed by the brief to dost-katilim/fuzul-katilim) so it renders the
// plain "missing" neutral circle rather than the dashed "pending" one.
const FILES: Record<string, string> = {
  "kuveyt-turk": "kuveytturk.svg",
  "vakif-katilim": "vakifkatilim.svg",
  "ziraat-katilim": "ziraatkatilim.svg",
  "albaraka-turk": "albaraka.svg",
  "emlak-katilim": "emlakkatilim.svg",
  "turkiye-finans": "turkiyefinans.svg",
  "dunya-katilim": "dunyakatilim.svg",
  "hayat-finans": "hayatfinans.svg",
  "tom-katilim": "tomkatilim.svg",
  "adil-katilim": "adilkatilim.svg",
};

const PENDING = new Set(["dost-katilim", "fuzul-katilim"]);

export function resolveBankLogoFile(slug: string): string | null {
  return FILES[slug] ? `/assets/bank-logos/${FILES[slug]}` : null;
}

export function isPendingBankLogo(slug: string): boolean {
  return PENDING.has(slug);
}

export function BankLogo({ slug, lg }: { slug: string; lg?: boolean }) {
  const file = FILES[slug];
  const pending = PENDING.has(slug);
  const size = lg ? 28 : 22;

  return (
    <span
      className={`bl${lg ? " lg" : ""}${!file ? " pending" : ""}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      {file ? (
        <Image src={`/assets/bank-logos/${file}`} alt="" width={size} height={size} />
      ) : pending ? null : (
        <span aria-hidden="true" />
      )}
    </span>
  );
}

/**
 * Content strings (table/heat cells) carry the literal
 * `<span class="bl" data-bank="slug"></span>` markup from the reference
 * file. This strips that prefix so it can be replaced with a real
 * <BankLogo>, and returns the rest of the html unchanged.
 */
export function parseBankPrefix(html: string): { slug: string | null; lg: boolean; rest: string } {
  const m = html.match(/^<span class="bl( lg)?" data-bank="([^"]+)"><\/span>/);
  if (!m) return { slug: null, lg: false, rest: html };
  return { slug: m[2], lg: Boolean(m[1]), rest: html.slice(m[0].length) };
}
