import type { Locale, SparkHubContent } from "@/types/content";

/**
 * Spark hub ve format sayfalarının metni (v2). Copy §5, §6 ve §6c.
 * Bölümler (Bó) Sanity'de: konu, gün sayısı (computeDayCount), tarih.
 * Buradaki sıradaki sayılar (Nuri, Sector reports Nº 01) Sanity'de
 * `coming` durumlu bölümler olarak duruyor. Site bu metni Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve
 * check:drift'in karşılaştırdığı ayna.
 *
 * Copy'de TR karşılığı olmayan etiketler (readLabel, showAllLabel,
 * allIssuesLabel) teslim notunda onaya sunuldu.
 */
export const spark: Record<Locale, SparkHubContent> = {
  en: {
    seo: {
      title: "Spark: fintech postmortems and sector reports | fspark9",
      description:
        "Short, sharp formats that get companies moving. The Last Day and sector reports, numbered and dated.",
    },
    bigWord: "Spark",
    heading: "Short, sharp formats that get companies moving.",
    tickerItems: [
      "The Last Day Nº 01 · Bó",
      "The Last Day Nº 02 · Nuri · Coming next",
      "Sector report Nº 01 · In preparation",
    ],
    tickerTail: "Numbered and dated",
    readLabel: "Read",
    backLabel: "Home",
    sparkLabel: "Spark",
    formatsLabel: "Formats",
    launchDateLabel: "[Launch date]",
    episode: {
      daysOpenLabel: "days open, launch to closure",
      daysOpenShortLabel: "days open",
      dateRangeTemplate: "{from} to {to}",
      rulerLabel: "The record, day by day",
      afterClosureLabel: "Then, a year later",
      builtFromLabel: "Built from the public record",
      evidenceTakenLabel: "Evidence taken {date}",
      lastCheckedLabel: "Last checked {date}",
      clockDayLabel: "Day",
      clockOfTemplate: "of {n}",
      readingResultLabel: "Your reading, not scored.",
      scorecardLabel: "After the last day",
      nextTemplate: "Next in {format}",
      sourceLabel: "Source",
    },
    formats: [
      {
        number: "01",
        name: "The Last Day",
        slug: "the-last-day",
        status: "live",
        seo: {
          title: "The Last Day: why fintechs and banks closed | fspark9",
          description:
            "The last months of fintechs and banks that closed, read from the public record, one episode at a time.",
        },
        description: "The last months of fintechs and banks that closed, read from the public record.",
        openLabel: "Open The Last Day",
        comingIssues: [{ number: "Nº 02", subject: "Nuri", hook: "Formerly Bitwala.", statusLabel: "Coming next" }],
        aboutLabel: "About this format",
        aboutLines: [
          "Every episode ends on the company’s last day.",
          "Every claim points to a public record.",
          "Numbered and dated.",
        ],
        showAllLabel: "Show all",
        allIssuesLabel: "All {n} issues",
        daysUnit: "days",
        episodesLabel: "Episodes, newest first",
        columns: { number: "Nº", company: "Company", days: "Days", published: "Published" },
        showAllTemplate: "Show all {n} episodes",
      },
      {
        number: "02",
        name: "Sector reports",
        slug: "sector-reports",
        status: "preparing",
        seo: {
          title: "Sector reports | fspark9 Spark",
          description: "Market reads with our own notes and a clear view at the end. The first report is in preparation.",
        },
        description: "Market reads with our own notes and a clear view at the end.",
        preparingLine: "First issue in preparation",
        comingIssues: [
          { number: "Nº 01", subject: "Sector reports", hook: "", statusLabel: "In preparation" },
        ],
        aboutLabel: "About this format",
        aboutLines: [],
        showAllLabel: "Show all",
        allIssuesLabel: "All {n} issues",
        daysUnit: "days",
        episodesLabel: "Episodes, newest first",
        columns: { number: "Nº", company: "Company", days: "Days", published: "Published" },
        showAllTemplate: "Show all {n} episodes",
      },
    ],
  },
  tr: {
    seo: {
      title: "Spark: fintech otopsileri ve sektör raporları | fspark9",
      description:
        "Şirketleri harekete geçiren kısa ve net formatlar. Son Gün ve sektör raporları, numaralı ve tarihli.",
    },
    bigWord: "Spark",
    heading: "Şirketleri harekete geçiren kısa ve net formatlar.",
    tickerItems: [
      "Son Gün Nº 01 · Bó",
      "Son Gün Nº 02 · Nuri · Sırada",
      "Sektör raporu Nº 01 · Hazırlanıyor",
    ],
    tickerTail: "Numaralı ve tarihli",
    readLabel: "Okuyun",
    backLabel: "Ana sayfa",
    sparkLabel: "Spark",
    formatsLabel: "Formatlar",
    launchDateLabel: "[Canlıya çıkış tarihi]",
    episode: {
      daysOpenLabel: "gün, lansmandan kapanışa",
      daysOpenShortLabel: "gün açık",
      dateRangeTemplate: "{from}'dan {to}'ye",
      rulerLabel: "Gün gün kayıt",
      afterClosureLabel: "Bir yıl sonra",
      builtFromLabel: "Kamuya açık kayıtlardan",
      evidenceTakenLabel: "Kanıt tarihi {date}",
      lastCheckedLabel: "Son kontrol {date}",
      clockDayLabel: "Gün",
      clockOfTemplate: "{n} içinden",
      readingResultLabel: "Sizin okumanız, puanlanmıyor.",
      scorecardLabel: "Son günden sonra",
      nextTemplate: "{format}’de sıradaki",
      sourceLabel: "Kaynak",
    },
    formats: [
      {
        number: "01",
        name: "Son Gün",
        slug: "son-gun",
        status: "live",
        seo: {
          title: "Son Gün: fintech ve bankalar neden kapandı | fspark9",
          description: "Kapanan fintech ve bankaların son ayları, kamuya açık kayıtlardan, bölüm bölüm.",
        },
        description: "Kapanan fintech ve bankaların son aylarını kamuya açık kayıtlardan okuyoruz.",
        openLabel: "Son Gün’ü açın",
        comingIssues: [{ number: "Nº 02", subject: "Nuri", hook: "Eski adıyla Bitwala.", statusLabel: "Sırada" }],
        aboutLabel: "Bu format hakkında",
        aboutLines: [
          "Her bölüm şirketin son günüyle biter.",
          "Her iddia kamuya açık bir kayda dayanır.",
          "Numaralı ve tarihli.",
        ],
        showAllLabel: "Tümünü göster",
        allIssuesLabel: "{n} sayının tümü",
        daysUnit: "gün",
        episodesLabel: "Bölümler, en yenisi üstte",
        columns: { number: "Nº", company: "Şirket", days: "Gün", published: "Yayın" },
        showAllTemplate: "{n} bölümün tümünü göster",
      },
      {
        number: "02",
        name: "Sektör raporları",
        slug: "sektor-raporlari",
        status: "preparing",
        seo: {
          title: "Sektör raporları | fspark9 Spark",
          description: "Kendi notlarımızla pazar okumaları, sonunda net bir görüş. İlk rapor hazırlanıyor.",
        },
        description: "Kendi notlarımızla pazar okumaları, sonunda net bir görüş.",
        preparingLine: "İlk sayı hazırlanıyor",
        comingIssues: [{ number: "Nº 01", subject: "Sektör raporları", hook: "", statusLabel: "Hazırlanıyor" }],
        aboutLabel: "Bu format hakkında",
        aboutLines: [],
        showAllLabel: "Tümünü göster",
        allIssuesLabel: "{n} sayının tümü",
        daysUnit: "gün",
        episodesLabel: "Bölümler, en yenisi üstte",
        columns: { number: "Nº", company: "Şirket", days: "Gün", published: "Yayın" },
        showAllTemplate: "{n} bölümün tümünü göster",
      },
    ],
  },
};
