import { defineField, defineType } from "sanity";

// Bölüm sayfasının (Layer 3) sabit mekanik kelime dağarcığı — editoryal
// içerik değil, format'ın kendi UI kelimeleri (RECORD/READING/GAP mono
// etiketleri, call seçenekleri, ledger toggle, scorecard satırları).
// Bileşenlere hardcode edilmedi, format'tan geliyor — CLAUDE.md:
// "Bileşenler props alır, içine metin gömülmez."
export default defineType({
  name: "lastDayMechanicLabels",
  title: "Mechanic labels",
  type: "object",
  fields: [
    defineField({ name: "dayWord", title: "Day word (mono, e.g. \"DAY\")", type: "localeString" }),
    defineField({ name: "recordLabel", title: "Record label (mono)", type: "localeString" }),
    defineField({ name: "readingLabel", title: "Reading label (mono)", type: "localeString" }),
    defineField({ name: "gapLabel", title: "Gap label (mono)", type: "localeString" }),
    defineField({ name: "noteLabel", title: "Note label (e.g. \"fspark9 · Note\")", type: "localeString" }),
    defineField({ name: "restsOnLabel", title: "\"Rests on\" chip prefix", type: "localeString" }),
    defineField({ name: "callOptionRule", title: "Call option — rule", type: "localeString" }),
    defineField({ name: "callOptionDecision", title: "Call option — decision", type: "localeString" }),
    defineField({ name: "callRevealDiverged", title: "Call reveal — diverged from reader's choice", type: "localeString" }),
    defineField({ name: "callRevealUnsettled", title: "Call reveal — unsettled", type: "localeString" }),
    defineField({ name: "ledgerToggleLabel", title: "Ledger toggle label", type: "localeString" }),
    defineField({ name: "correctionsCtaLabel", title: "Gap \"invites correction\" link label", type: "localeString" }),
    defineField({ name: "scorecardHeading", title: "Scorecard heading", type: "localeString" }),
    defineField({ name: "scorecardMatched", title: "Scorecard — matched the record", type: "localeString" }),
    defineField({ name: "scorecardDiverged", title: "Scorecard — went the other way", type: "localeString" }),
    defineField({ name: "scorecardUnsettled", title: "Scorecard — the record does not say", type: "localeString" }),
    defineField({ name: "scorecardPending", title: "Scorecard — not answered yet", type: "localeString" }),
    defineField({ name: "publishedLabel", title: "\"Published\" date caption", type: "localeString" }),
    defineField({ name: "evidenceTakenLabel", title: "\"Evidence taken\" date caption", type: "localeString" }),
    defineField({ name: "lastCheckedLabel", title: "\"Last checked\" date caption", type: "localeString" }),
  ],
});
