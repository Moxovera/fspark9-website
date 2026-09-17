// Ported verbatim from fuzul-report-standalone.html's <script> block
// (BANKS/TOTAL/GRP/nameToSlug/REFS) — locale-independent, shared by both
// languages. See fuzul/fspark9-locked-fuzul-claude-code-brief.md.

export interface BankFigure {
  n: string;
  slug: string;
  a: number; // assets, TRY billion
  p: number; // H1 net profit, TRY million
  g: number; // growth since start of year, %
  grp: "ozel" | "kamu" | "yeni";
  anchor: "start" | "middle" | "end";
  up?: boolean;
  emlak?: boolean;
  roa: number; // profit / assets, %
  share: number; // % of TOTAL
}

const TOTAL = 4920;

type RawBank = Omit<BankFigure, "roa" | "share"> & { roa?: number };

const RAW_BANKS: RawBank[] = [
  { n: "Kuveyt Türk", slug: "kuveyt-turk", a: 1472, p: 23775, g: 8.8, grp: "ozel", anchor: "end" },
  { n: "Vakıf Katılım", slug: "vakif-katilim", a: 922.4, p: 5189, g: 17.6, grp: "kamu", anchor: "middle", up: true },
  { n: "Ziraat Katılım", slug: "ziraat-katilim", a: 885, p: 3120, g: 15.1, grp: "kamu", anchor: "middle", up: false },
  { n: "Albaraka Türk", slug: "albaraka-turk", a: 534, p: 3087, g: 14.5, grp: "ozel", anchor: "end" },
  { n: "Emlak Katılım", slug: "emlak-katilim", a: 436, p: 8900, g: 13.2, grp: "kamu", roa: 1.92, anchor: "end", emlak: true },
  { n: "Türkiye Finans", slug: "turkiye-finans", a: 436, p: 4578, g: 11.7, grp: "ozel", anchor: "end" },
  { n: "Dünya Katılım", slug: "dunya-katilim", a: 119, p: 3074, g: 19.4, grp: "yeni", anchor: "start" },
  { n: "Hayat Finans", slug: "hayat-finans", a: 40, p: 90, g: 58.4, grp: "yeni", anchor: "middle", up: true },
  { n: "TOM Katılım", slug: "tom-katilim", a: 30, p: -895, g: 28.6, grp: "yeni", anchor: "start" },
];

export const BANKS: BankFigure[] = RAW_BANKS.map((b) => ({
  ...b,
  roa: b.roa ?? +((b.p / 1000 / b.a) * 100).toFixed(2),
  share: +((b.a / TOTAL) * 100).toFixed(1),
}));

export { TOTAL };

export const GRP: Record<BankFigure["grp"], string> = {
  ozel: "var(--s-ozel)",
  kamu: "var(--s-kamu)",
  yeni: "var(--s-yeni)",
};

// Monthly TRY profit-share rates (ProfitShareDots chart) — bank names here
// are the same in both languages in the reference, so this stays
// locale-independent like BANKS/REFS.
export interface RateFigure {
  name: string;
  value: number;
  grp: BankFigure["grp"];
  slug: string;
}

export const RATES: RateFigure[] = [
  { name: "Türkiye Finans", value: 37.74, grp: "ozel", slug: "turkiye-finans" },
  { name: "Hayat Finans", value: 37.05, grp: "yeni", slug: "hayat-finans" },
  { name: "Kuveyt Türk", value: 35.91, grp: "ozel", slug: "kuveyt-turk" },
  { name: "Dünya Katılım", value: 33.14, grp: "yeni", slug: "dunya-katilim" },
  { name: "Emlak Katılım", value: 32.08, grp: "kamu", slug: "emlak-katilim" },
  { name: "Vakıf Katılım", value: 31.5, grp: "kamu", slug: "vakif-katilim" },
  { name: "Albaraka Türk", value: 31.25, grp: "ozel", slug: "albaraka-turk" },
  { name: "Ziraat Katılım", value: 27.9, grp: "kamu", slug: "ziraat-katilim" },
];

// [id, description (Turkish, not translated per language in the reference), url]
export const REFS: [string, string, string][] = [
  ["1", "Banka Dünyası, Katılım bankalarının aktif büyüklük ve kâr karşılaştırması, 30 Haziran 2026", "https://bankadunyasi.com/katilim-bankalarinin-aktif-buyukluk-ve-kar-rakamlarinin-karsilastirilmasi-30-haziran-2026/"],
  ["3", "TC Lira, Albaraka Türk'te verimlilik alarmı", "https://tclira.com/albaraka-turkte-verimlilik-alarmi-karin-yuzde-20si-karsilik-iptalinden-geldi/"],
  ["4", "Patron Rehberi, Kuveyt Türk katılım finansında liderliği pekiştirdi, Ağustos 2026", "https://www.patronrehberi.com/finans/44451/kuveyt-turk-katilim-finansinda-liderligi-pekistirdi/"],
  ["5", "Banka Dünyası, Katılım bankalarının çalışan ve şube sayısı karşılaştırması 2024 / 2025", "https://bankadunyasi.com/katilim-bankalarinin-31-aralik-2024-31-aralik-2025-calisan-ve-sube-sayisi-karsilastirmasi/"],
  ["6", "Borsa Gündem, TKBB: katılım bankalarının net dönem kârı 86 milyar TL", "https://www.borsagundem.com.tr/tkbb-akben-katilim-bankalarinin-net-donem-kari-86-milyar-tl-oldu"],
  ["7", "Türkiye Gazetesi, Rakamlarla katılım bankacılığı, Mayıs 2026", "https://www.turkiyegazetesi.com.tr/tasarruf-ortagim/rakamlarla-katilim-bankaciligi-sektor-buyumeye-devam-ediyor-1789197"],
  ["8", "Banka Dünyası, Katılım bankalarının çalışan ve şube sayısı 2025 / Haziran 2026", "https://bankadunyasi.com/katilim-bankalarinin-31-aralik-2025-30-haziran-2026-calisan-ve-sube-sayisi-karsilastirmasi/"],
  ["9", "Ekonomim, Katılım bankacılığı strateji belgesi güncellendi", "https://www.ekonomim.com/finans/haberler/turkiye-katilim-bankaciligi-strateji-belgesi-guncellendi-haberi-615828"],
  ["10", "Ekonomi Gazetesi, Kamu katılım bankalarının birleştirilmesi: yeniden düşünmek", "https://www.ekonomigazetesi.com/kose-yazisi/kamu-katilim-bankalarinin-birlestirilmesi-yeniden-dusunmek-84842"],
  ["11", "Banka Dünyası, Kamu katılım bankacılığında büyük birleşme", "https://bankadunyasi.com/kamu-katilim-bankaciliginda-buyuk-birlesme-tarih-netlesti/"],
  ["12", "Emlak Katılım basın bülteni, halka arz süreci, Nisan 2026", "https://asset.emlakkatilim.com.tr/documents/basin-odasi/bultenler/2026/emlak-katilim-halka-arz-surecini-resmen-baslatti.pdf"],
  ["13", "Fuzul Holding kurumsal site", "https://fuzulholding.com/"],
  ["14", "Yeni Şafak, Fuzul Holding beş yılda 10 bin konut üretecek", "https://www.yenisafak.com/ekonomi/fuzul-holding-yatirimlarini-2025te-de-surdurecek-bes-yilda-10-bin-konut-uretecek-4668668"],
  ["15", "AA, Fuzul tasarruf finansman sektöründeki eğilimlere dair analiz", "https://www.aa.com.tr/tr/isdunyasi/finans/fuzul-tasarruf-finansman-sektorundeki-egilimlere-dair-analiz-yayimladi/697165"],
  ["15b", "AA, Tasarruf finansman sektöründe aktif katılımcı sayısı 500 bine yaklaştı", "https://www.aa.com.tr/tr/ekonomi/tasarruf-finansman-sektorundeki-aktif-katilimci-sayisi-500-bine-yaklasti/3446509"],
  ["16", "Şehir Medya, Konut piyasasında nakit dönemi (TÜİK verisi)", "https://www.sehirmedya.com/ozel-haber/konut-piyasasinda-nakit-donemi-546329"],
  ["17", "Dünya Gazetesi, Fuzul Katılım Bankası'na kuruluş izni", "https://www.dunya.com/dunya/bddkdan-fuzul-katilim-bankasi-asye-13-milyar-tl-sermayeyle-kurulus-izni-haberi-818643"],
  ["18", "Bilişim Profesyonelleri, TOM faaliyet izni aldı", "https://bilisimprofesyonelleri.com/a101in-dijital-perakende-bankasi-tom-faaliyet-izni-aldi/"],
  ["19", "Katılım Ekonomisi, Dünya Katılım Bankası kimin", "https://www.katilimekonomisi.com/dunya-katilim-bankasi-kimin-2026/"],
  ["20", "Banka Dünyası, Halk Katılım kuruluş izni", "https://bankadunyasi.com/bddkdan-bir-bankaya-faaliyet-izni-bir-bankaya-kurulus-izni/"],
  ["21", "Banka Dünyası, Halk Katılım'ın faaliyete geçeceği tarih", "https://bankadunyasi.com/halk-katilim-bankasinin-faaliyete-gececegi-tarih-belli-oldu/"],
  ["22", "Türkinform, Adil Katılım Bankası kimin", "https://turkinform.com.tr/adil-katilim-bankasi-kimin-sahibi-kim-ortaklik-yapisi-nasil-kuruculari-kim-ne-zaman-kuruldu-dijital-banka-mi"],
  ["23", "Taşınmaz Haber, Fuzul Katılım'a kuruluş izni", "https://tasinmazhaber.com/bddk-fuzul-katilim-bankasina-kurulus-izni-verdi-sektorde-neler-degisecek/"],
  ["24", "Bloomberg HT, Dost Katılım Bankası'na kuruluş izni", "https://www.bloomberght.com/bddk-dan-dost-katilim-bankasi-nin-kurulmasina-izin-3780238"],
  ["25", "Medyascope, BİM ortaklığıyla yeni banka", "https://medyascope.tv/2026/06/17/bim-banka-kurdu-dost-katilim-bankasinin-kurulmasina-bddkdan-onay-cikti/"],
  ["26", "FinTech İstanbul, Adil Katılım'a faaliyet izni", "https://fintechistanbul.org/2025/09/21/bddkdan-adil-katilim-bankasina-faaliyet-izni/"],
  ["27", "Fintechtime, Hayat Finans'ın aktifleri ilk yarıyılda %58 büyüdü", "https://fintechtime.com/2026/08/hayat-finansin-aktifleri-ilk-yariyilda-x-buyudu/"],
  ["28", "BankaVitrini, TOM Bank HADİ veresiye kampanyası", "https://bankavitrini.com/tom-bank-hadi-uygulamasiyla-veresiye-kampanyasi-baslatti/"],
  ["29", "TOM Bank web sitesi", "https://tombank.com.tr/"],
  ["30", "Ekonomim, En fazla mağazası olan marketler, Eylül 2026", "https://www.ekonomim.com/foto-galeri/aktuel/ve-bim-buyuk-atak-yapti-sube-sayisinda-a101e-yaklasti-iste-en-fazla-magazasi-bulunan-marketler-galeri-917564"],
  ["31", "Ahlatcı Holding, altın sektörü", "https://www.ahlatci.com.tr/SektorAltin.html"],
  ["32", "Dünya Katılım, altın bankacılığı", "https://dunyakatilim.com.tr/kendim-icin/altin-bankaciligi"],
  ["33", "Türkiye Gazetesi, Dünya Katılım'a Fitch'ten ilk not", "https://www.turkiyegazetesi.com.tr/tasarruf-ortagim/2-yillik-bankaya-uluslararasi-guven-dunya-katilima-fitchten-ilk-not-1798840"],
  ["34", "Türkiye Gazetesi, Kâr payı oranlarında son durum, 12 Eylül 2026", "https://www.turkiyegazetesi.com.tr/tasarruf-ortagim/kar-payi-oranlarinda-son-durum-500-bin-tlnin-aylik-getirisi-kac-tl-1815463"],
  ["35", "Para Dergi, Vakıf Katılım ekonomiye 661,6 milyar TL destek sağladı", "https://www.paradergi.com.tr/finans/2026/08/12/vakif-katilim-ekonomiye-6616-milyar-tl-destek-sagladi/amp"],
  ["36", "Timeturk, Katılım bankacılığında yeni dönem: birleşme ve halka arz (Fitch değerlendirmesi)", "https://www.timeturk.com/katilim-bankaciliginda-yeni-donem-birlesme-ve-halka-arz"],
  ["37", "Taşınmaz Haber, İpotekli konut satışları Haziran 2026 (TÜİK verisi)", "https://tasinmazhaber.com/ipotekli-konut-satislari-haziran-2026-doneminde-hiz-kazandi-kredili-satislar-yuzde-72-yukseldi/"],
  ["38", "AA, BDDK'den tasarruf finansman şirketlerine yeni düzenleme, Ağustos 2026", "https://www.aa.com.tr/tr/ekonomi/bddkden-tasarruf-finansman-sirketlerine-yeni-duzenleme/4021250"],
  ["39", "Katılım Uzmanı, tasarruf finansman şirketleri karşılaştırması", "https://katilimuzmani.com/blog/eminevim-fuzul-birevim-katilimevim-karsilastirma-2026/"],
  ["40", "Investing.com, Fuzul Holding katılım bankacılığı sektörüne adım atıyor", "https://tr.investing.com/news/stock-market-news/fuzul-holding-katlm-bankaclg-sektorune-adm-atyor-3815514"],
  ["42", "Genossenschaftliche FinanzGruppe, Bausparkasse Schwäbisch Hall", "https://www.finanzgruppe.de/bausparkasse-schwaebisch-hall.html"],
  ["43", "Registro de Imóveis do Brasil, Consórcio cresce 31,9% e bate recordes em 2025 (ABAC)", "https://www.registrodeimoveis.org.br/consorcio-cresce-31-9-e-bate-recordes-em-2025"],
  ["44", "AEM Corretora, Qual melhor banco para fazer consórcio", "https://aemcorretoradeseguros.com.br/blog/qual-melhor-banco-para-fazer-consorcio/"],
  ["45", "Katılım Ekonomisi, Katılım bankacılığı 2024'te rekor kırdı", "https://www.katilimekonomisi.com/katilim-bankaciligi-2024te-rekor-kirdi-aktifler-26-trilyon-tlyi-asti/"],
  ["46", "FinTech İstanbul, Hayat Katılım kuruluş iznini aldı, Nisan 2022", "https://fintechistanbul.org/2022/04/22/turkiyenin-ilk-subesiz-dijital-bankasi-hayat-katilim-kurulus-iznini-aldi/"],
  ["47", "Dünya Katılım, sermaye artırımı duyurusu", "https://dunyakatilim.com.tr/haberler/dunya-katilim-bankasi-sermayesini-artirmaya-devam-ediyor"],
  ["47b", "Yayla Haber, Dünya Katılım 15 şehirde 28 şubeye ulaştı, Ağustos 2026", "https://www.yaylahaber.com.tr/ahlatci-holding-bunyesindeki-dunya-katilim-sube-agini-buyutuyor-15-sehirde-28-subeye-ulasti"],
  ["48", "Ziraat Katılım, 2025 II. Ara Dönem Faaliyet Raporu", "https://www.ziraatkatilim.com.tr/sites/default/files/media-file/Ziraat%20Kat%C4%B1l%C4%B1m%20Bankas%C4%B1_2025_%20II.%20Ara%20D%C3%B6nem%20Konsolide%20Faaliyet%20Raporu.pdf"],
  ["49", "Patron Rehberi, Türkiye Finans 2026 ilk yarı sonuçları", "https://www.patronrehberi.com/finans/44577/uretim-icin-fon-kaynagi-muslugu-acildi/"],
  ["50", "Kuveyt Türk, 2025 Kurumsal Yönetim Derecelendirme Raporu", "https://www.kuveytturk.com.tr/medium/2025-kurumsal-yonetim-derecelendirme-raporu-2857.pdf"],
  ["51", "Ziraat Bankası, Ayrıcalıklı Kira Hizmet Paketi", "https://www.ziraatbank.com.tr/tr/bireysel/hizmetler/ayricalikli-kira-hizmet-paketi"],
  ["52", "Halkbank, Düzenli Kira Ödeme Talimatı", "https://www.halkbank.com.tr/tr/bireysel/odemeler/odemeler/duzenli-kira-odeme-talimati"],
  ["53", "Türkiye Gazetesi, Tasarruf finansmanında müşteri sayısı 1,5 milyonu aştı, Ağustos 2026", "https://www.turkiyegazetesi.com.tr/tasarruf-ortagim/tasarruf-finansmaninda-musteri-sayisi-15-milyonu-asti-aktif-buyukluk-501-milyar-liray-1811702"],
  ["54", "Ticaret Gazetesi, Tasarruf finansman modelinde müşteri sayısı arttı, Eylül 2026", "https://ticaretgazetesi.com.tr/2026/09/02/tasarruf-finansman-modelinde-musteri-sayisi-%112-artti/"],
  ["56", "FintekWins, Fuzul şube sayısını 256'ya çıkardı, Temmuz 2026", "https://www.fintekwins.com/fuzul-sube-sayisini-256ya-cikardi/"],
  ["57", "Türkiye Gazetesi, Fuzul'de konut teslimatlarının payı %18'e yükseldi", "https://www.turkiyegazetesi.com.tr/tasarruf-ortagim/konut-teslimatlarinda-dikkat-ceken-artis-fuzulde-pay-yuzde-18e-yukseldi-1810149"],
  ["58", "ABAC, Sistema de Consórcios em dezembro/2025", "https://blog.abac.org.br/drops-de-mercado/sistema-de-consorcios-em-dezembro-2025-dados-economicos"],
  ["59", "Bloomberg HT, Emlak Katılım'dan ilk yarıda 8,9 milyar TL net kâr", "https://www.bloomberght.com/emlak-katilimdan-yilin-ilk-yarisinda-8-9-milyar-tl-net-kr-3785098"],
  ["60", "Ekonomi Gazetesi, Emlak Katılım Tasarruf Finansman'a faaliyet izni", "https://www.ekonomigazetesi.com/sirket-haberleri/emlak-katilim-tasarruf-finansmana-faaliyet-izni-55341"],
  ["61", "Katılım Uzmanı, BDDK lisanslı tasarruf finansman şirketleri 2026", "https://katilimuzmani.com/blog/bddk-lisansli-tasarruf-finansman-sirketleri-2026-tam-liste-ve-rehber/"],
  ["62", "Banka Dünyası, Katılım bankalarının 2025 yılı aktif, kâr, katılım fonu ve özkaynak analizi", "https://bankadunyasi.com/katilim-bankalarinin-2025-yili-aktif-buyukluk-kar-katilim-fonu-ve-ozkaynaklar-analizi/"],
  ["63", "Emlak Katılım, 2025 Faaliyet Raporu", "https://asset.emlakkatilim.com.tr/documents/yatirimci-iliskileri/finansal-bilgiler/faaliyet-raporlari/faaliyet-raporu-2025.pdf"],
  ["64", "Albaraka Türk, 31 Aralık 2025 bağımsız denetim raporu (solo)", "https://www.albaraka.com.tr/documents/yatirimci-iliskileri/bagimsiz-denetim-raporlari/konsolide-olmayan/2026-2030/albaraka-turk-31.12.2025-tr-solo.pdf"],
];
