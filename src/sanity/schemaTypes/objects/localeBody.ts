import { defineArrayMember, defineField, defineType } from "sanity";

// localeString/localeText'in Portable Text karşılığı — ama AYNI ŞEKİLDE
// DEĞİL: oradaki alanlar düz string'ken burada en/tr birer bağımsız
// zengin içerik dizisi. Bir dilin paragraf/başlık sırası ve sayısı
// diğerinden bağımsız olabilir (bir çeviri her zaman birebir aynı
// yapıda olmak zorunda değil), bu yüzden tek bir dizi + alan bazlı
// {en,tr} objesi yerine iki AYRI dizi kullanılıyor. Kullanıcı geri
// bildirimi sonrası: sabit RECORD/READING/GAP/CALL şablonu kaldırıldı,
// her bölüm burada serbestçe kendi yapısını kurabiliyor (başlık,
// paragraf, alıntı, liste, statHighlight, noteHighlight).
export default defineType({
  name: "localeBody",
  title: "Localized body",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "statHighlight" }),
        defineArrayMember({ type: "noteHighlight" }),
      ],
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "statHighlight" }),
        defineArrayMember({ type: "noteHighlight" }),
      ],
    }),
  ],
});
