import type { LegalPage } from "@/types/content";

// dc.html: legalDocs().impressum — tek, üç dilli bir belge, siteLocale'e
// göre değişmiyor (Almanca sürüm bağlayıcı, İngilizce/Türkçe bilgi
// amaçlı). Bu yüzden EN ve TR sayfası aynı `blocks`'u paylaşıyor,
// sadece hero (eyebrow/title/intro) dile göre değişiyor.
const blocks: LegalPage["blocks"] = [
  { type: "div", text: "Deutsch · verbindliche Fassung" },
  { type: "h", text: "Impressum" },
  {
    type: "field",
    label: "Angaben gemäß § 5 DDG",
    lines: [
      "Mehmet Burak Dikmen",
      "fspark9",
      "Beusselstraße 31",
      "10553 Berlin",
      "Deutschland",
    ],
  },
  {
    type: "field",
    label: "Vertreten durch",
    lines: ["Mehmet Burak Dikmen, Inhaber"],
  },
  {
    type: "field",
    label: "Kontakt",
    lines: ["E-Mail: mehmetburakdikmen@gmail.com"],
  },
  {
    type: "field",
    label: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    lines: ["Mehmet Burak Dikmen, Anschrift wie oben"],
  },
  {
    type: "field",
    label: "Tätigkeit",
    lines: [
      "Unternehmensberatung im Bereich Financial Services. Die Leistungen richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB. Verträge mit Verbrauchern werden nicht geschlossen.",
    ],
  },
  {
    type: "field",
    label: "Verbraucherstreitbeilegung",
    lines: [
      "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
  { type: "div", text: "English · for information" },
  { type: "h", text: "Legal Notice" },
  {
    type: "field",
    label: "Information pursuant to § 5 DDG (German Digital Services Act)",
    lines: [
      "Mehmet Burak Dikmen",
      "fspark9",
      "Beusselstrasse 31",
      "10553 Berlin",
      "Germany",
    ],
  },
  {
    type: "field",
    label: "Represented by",
    lines: ["Mehmet Burak Dikmen, owner"],
  },
  {
    type: "field",
    label: "Contact",
    lines: ["Email: mehmetburakdikmen@gmail.com"],
  },
  {
    type: "field",
    label: "Responsible for editorial content pursuant to § 18 (2) MStV",
    lines: ["Mehmet Burak Dikmen, address as above"],
  },
  {
    type: "field",
    label: "Activity",
    lines: [
      "Management consultancy in financial services. Services are provided exclusively to businesses within the meaning of § 14 German Civil Code. No contracts are concluded with consumers.",
    ],
  },
  {
    type: "field",
    label: "Consumer dispute resolution",
    lines: [
      "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    ],
  },
  { type: "div", text: "Türkçe · bilgilendirme amaçlı" },
  { type: "h", text: "Künye" },
  {
    type: "field",
    label: "§ 5 DDG uyarınca bilgiler",
    lines: [
      "Mehmet Burak Dikmen",
      "fspark9",
      "Beusselstrasse 31",
      "10553 Berlin",
      "Almanya",
    ],
  },
  {
    type: "field",
    label: "Temsil eden",
    lines: ["Mehmet Burak Dikmen, işletme sahibi"],
  },
  {
    type: "field",
    label: "İletişim",
    lines: ["E-posta: mehmetburakdikmen@gmail.com"],
  },
  {
    type: "field",
    label: "§ 18 (2) MStV uyarınca içerikten sorumlu",
    lines: ["Mehmet Burak Dikmen, adres yukarıdaki ile aynı"],
  },
  {
    type: "field",
    label: "Faaliyet",
    lines: [
      "Finansal hizmetler alanında yönetim danışmanlığı. Hizmetler yalnızca Alman Medeni Kanunu § 14 anlamındaki işletmelere sunulur. Tüketicilerle sözleşme yapılmaz.",
    ],
  },
  {
    type: "field",
    label: "Tüketici uyuşmazlık çözümü",
    lines: [
      "Tüketici hakem heyetleri önündeki uyuşmazlık çözüm süreçlerine katılmaya istekli ve yükümlü değiliz.",
    ],
  },
];

export const en: LegalPage = {
  hero: {
    eyebrow: "Impressum",
    title: "Who is behind this site.",
    intro:
      "Information pursuant to § 5 DDG. The German version is the authoritative one; English and Turkish follow below.",
  },
  blocks,
};

export const tr: LegalPage = {
  hero: {
    eyebrow: "Künye",
    title: "Bu sitenin arkasında kim var.",
    intro:
      "§ 5 DDG uyarınca bilgiler. Almanca sürüm asıldır, İngilizce ve Türkçe sürümler altta yer alır.",
  },
  blocks,
};
