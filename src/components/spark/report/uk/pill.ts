/** Seçim düğmesi (sekme, filtre, oyuncu): Nº 05 haritasının düğmeleri gibi kare, 1.5px Ink çerçeve, seçiliyken Ink zemin. */
export const pill = (on: boolean, size = "text-[14.5px]") =>
  `inline-flex min-h-11 items-center gap-2 border-[1.5px] border-ink px-3.5 py-2 text-left font-semibold transition-colors duration-150 ease-brand motion-reduce:transition-none ${size} ${
    on ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-ink/5"
  }`;
