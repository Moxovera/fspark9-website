import { PortableText, type PortableTextComponents } from "@portabletext/react";
import StatHighlight from "@/components/spark/episode/StatHighlight";
import EpisodeNote from "@/components/spark/episode/EpisodeNote";
import type { LastDayBodyBlock } from "@/types/content";

interface EpisodeBodyProps {
  value: LastDayBodyBlock[];
  noteLabel: string;
}

/**
 * Serbest biçimli bölüm gövdesi — kullanıcı geri bildirimi sonrası
 * sabit record/reading/gap/call şablonunun yerine geçti. Portable
 * Text'in standart blokları (başlık/paragraf/alıntı/liste) + iki özel
 * blok (statHighlight, noteHighlight) — her bölüm bunları istediği
 * sırada, istediği kadar kullanır, hiçbiri zorunlu değil.
 */
export default function EpisodeBody({ value, noteLabel }: EpisodeBodyProps) {
  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="mt-4 mb-2 font-display text-[1.6rem] leading-[1.25] font-medium text-charcoal">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-2 mb-1 font-display text-[1.3rem] leading-[1.3] font-medium text-charcoal">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-[1.02rem] leading-[1.72] text-charcoal/85">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-navy/30 pl-5 text-[1.05rem] leading-[1.65] text-charcoal/80 italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="flex list-disc flex-col gap-2 pl-6 text-[1.02rem] leading-[1.6] text-charcoal/85">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="flex list-decimal flex-col gap-2 pl-6 text-[1.02rem] leading-[1.6] text-charcoal/85">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium text-charcoal">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ value: link, children }) => (
        <a
          href={link?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy underline decoration-navy/40 underline-offset-2 transition-colors duration-200 hover:text-bronze hover:decoration-bronze/50"
        >
          {children}
        </a>
      ),
    },
    types: {
      statHighlight: ({ value: stat }) => (
        <StatHighlight figure={stat.figure} caption={stat.caption} />
      ),
      noteHighlight: ({ value: note }) => <EpisodeNote body={note.body} label={noteLabel} />,
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
