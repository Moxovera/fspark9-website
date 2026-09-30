import type { TahsildarReportContent } from "@/types/content";
import {
  BANK_SHARE_ROWS,
  BANK_SHARES_MAX,
  CREDIT_TO_GDP,
  CREDIT_TO_GDP_MAX,
  MEETINGS,
  OVERDUE_FIRMS,
  PARTNER_RING,
  PAYMENT_DAYS,
  PAYMENT_DAYS_MAX,
  ROADMAP_PHASES,
  SOURCES,
  USE_CASE_CHAIN,
  USE_CASE_PARTNERS,
  USE_CASE_STEPS,
} from "./data";

// Tahsildar raporunun bütün metni (docs/locked/tahsildar-report.html,
// onaylı metin). Hiçbir cümle, rakam, kaynak etiketi ya da etiket
// değiştirilmez. Sadece Türkçe.

export const tahsildarReportTr: TahsildarReportContent = {
  navLabel: "Bölümler",
  noteLabel: "Görüşümüz",

  hero: {
    id: "giris",
    eyebrow: "Tahsildar için Romanya yol haritası",
    titleLead: "Zinciri",
    titleCut: "hızlandırmak",
    sub: "Romanya pazarında dikkat çektiğimiz noktalar, Faz 1 planı, büyüme yolları, en çok dikkat edilmesi gereken yerler ve ilk görüşülecek kişiler. Hepsi tek bir yol haritasında.",
    author: "Mehmet Burak Dikmen",
    authorMeta: "Eylül 2026, kamuya açık kaynaklarla hazırlandı",
    chain: {
      nodes: [
        { title: "Üretici", sub: "Faturayı keser" },
        { title: "Ana bayi", sub: "Koşulu belirler, tahsil eder" },
        { title: "Alt bayi", sub: "Esnek öder, rahat satar" },
        { title: "Son kullanıcı", sub: "Linkle ya da POS ile öder" },
      ],
      bracket: "Tahsildar her halkada",
      legendGoods: "Mal ve fatura",
      legendMoney: "Para",
    },
    stats: [
      { value: "%83", label: "Vadesi geçmiş faturası olan Romen firma oranı", src: "Atradius 2026" },
      { value: "%22", small: "AB'de %66", label: "Şirket kredilerinin milli gelire oranı", src: "BNR" },
      { value: "9.500", label: "Nexent Bank'ın taksitli kart programındaki partner işyeri", src: "Forbes România" },
      { value: "19.000+", label: "Romanya'daki Türk sermayeli şirket", src: "Forvis Mazars" },
    ],
    summary: {
      eyebrow: "Özet",
      title: "Altı karar, tek yön",
      items: [
        {
          lead: "Giriş kapısı esnek ödeme ve tahsilat.",
          text: "Bankaların kapalı taksit programları var, ama ana bayinin her alt bayiye ayrı koşul tanımladığı bir sistem yok. Tahsildar bu boşluktan giriyor.",
        },
        {
          lead: "Lisans almadan, Token ile başlayın.",
          text: "Kurulum belli: parayı Token işler, ekranı ve koşul motorunu Tahsildar sağlar. Alternatifler EuPlătesc ve Netopia.",
        },
        {
          lead: "Finansman ve taksitte ana ortak Nexent Bank.",
          text: "Fiba'nın Romanya bankası, Temmuz 2025'e kadar adı Credit Europe Bank'tı. Tahsildar zaten Fiba ile görüşüyor. Alternatifler Banca Transilvania ve BCR.",
        },
        {
          lead: "Kredi riski Tahsildar'ın bilançosuna girmez.",
          text: "Riski ya ana bayi kendi seçer ya da finansman ortağı taşır.",
        },
        {
          lead: "Faz 1 pilotu Türk kökenli bayi ağlarıyla.",
          text: "Yapı malzemesi, mobilya ve oto servis ilk sektörler. Nexent Bank'ın taksitli kart programındaki 9.500 partner işyeri hazır bir havuz.",
        },
        {
          lead: "Her şeyden önce yazılı hukuk görüşü.",
          text: "BNR, hangi iş için hangi yetkinin gerektiğini belirleme sorumluluğunu şirkete bırakıyor.",
        },
      ],
      result: {
        variant: "proposal",
        tag: "Yol haritasının özü",
        title: "Token ile ödeme, Nexent Bank ile finansman, Türk bayi ağlarıyla pilot",
        text: "İlk yılın işi pazarı büyütmek değil. Modeli iki üç gerçek bayi ağında çalışır hale getirmek, sonuçları ölçmek ve Romen distribütörlere o referansla gitmek.",
        aside: "Bu yol haritası kamuya açık kaynaklara ve Tahsildar'ın sürmekte olan görüşmelerine dayanıyor. Yorum olan yerleri ayrıca belirttik.",
      },
    },
  },

  chapters: [
    // ================= I. PAZAR =================
    {
      id: "pazar",
      nav: "Pazar",
      eyebrow: "Bölüm I, pazar",
      title: "Dert burada Türkiye'den bile keskin",
      lede: "Romanya'da bankalar firmalara yetmiyor. Bu yüzden firmalar birbirini finanse ediyor, bunu da çoğu zaman geç ödeyerek yapıyor.",
      blocks: [
        {
          type: "two",
          items: [
            {
              type: "hbars",
              figure: {
                title: "Şirket kredisinin milli gelire oranı",
                sub: "Romanya ve AB ortalaması",
                rows: CREDIT_TO_GDP,
                max: CREDIT_TO_GDP_MAX,
                caption: "Kaynak: BNR. Aradaki fark tedarikçi kredisiyle, yani bayinin geç ödemesiyle kapanıyor.",
              },
            },
            {
              type: "grid100",
              figure: {
                title: "Her 100 firmadan kaçının vadesi geçmiş faturası var",
                sub: "Romanya, 2026",
                on: OVERDUE_FIRMS,
                unit: "firma",
                ariaLabel: "Her 100 firmadan 83'ünün vadesi geçmiş faturası var",
                caption: "Kaynak: Atradius 2026. Firmaların üçte birinden fazlası nakit sıkıntısı yüzünden tedarikçisine geç ödüyor.",
              },
            },
          ],
        },
        {
          type: "hbars",
          figure: {
            title: "Kanun ne diyor, pratikte ne oluyor",
            sub: "Gün",
            rows: PAYMENT_DAYS,
            max: PAYMENT_DAYS_MAX,
            caption: "Kaynak: Kanun 72/2013, Termene.ro (2018 verisi), StartupCafe ve Wall-Street.ro. İnşaatta bu gecikme 342 gün.",
          },
        },
        {
          type: "prose",
          space: "lg",
          paras: [
            'Kâğıt üzerinde alacaklının elinde güçlü araçlar var. Gecikme faizi kendiliğinden işliyor, her geciken alacak için en az 40 avro tazminat istenebiliyor ve ödeme emri denen hızlı bir mahkeme yolu var <span class="src">Kanun 72/2013, Fiscalitatea</span>. Ama çoğu firma bu hakları kullanmıyor, çünkü müşterisini kaybetmek istemiyor.',
            'Ekonomi de işi kolaylaştırmıyor. Ülke iki çeyrektir daralıyor, enflasyon yüzde 10 civarında, leu hükümet krizinde euroya karşı rekor düşük seviyeyi gördü <span class="src">wiiw, Foreign Policy</span>. Bu, satış döngüsünü uzatır ama nakit sıkıntısını da büyütür.',
          ],
        },
        {
          type: "result",
          card: {
            variant: "key",
            tag: "Raporun en kritik noktası",
            title: "Asıl fırsat geciktikten sonra kovalamak değil, hiç geciktirmemek",
            text: "Kanunun verdiği haklar kâğıt üzerinde kalıyor, çünkü alacaklı ilişkiyi bozmak istemiyor. Tahsildar'ın fırsatı gecikmeyi cezalandırmakta değil, gecikmeye yol açan nakit sıkışıklığını çözmekte.",
            levers: [
              {
                title: "Esnek ödeme",
                text: "Nakit sıkışan alt bayi borcunu kartla taksitlendirir. Ana bayi parasını peşin alır, taksit riskini banka taşır.",
              },
              {
                title: "Bayiye özel koşul",
                text: "İyi ödeyen alt bayiye daha uzun vade ya da daha çok taksit, yeni ya da riskli olana peşin.",
              },
              {
                title: "Ana bayiye tam görünürlük",
                text: "Bütün ağ, kimin ne kadar borcu olduğu ve kime hangi koşulun verildiği tek ekranda.",
              },
              {
                title: "Alt bayinin kendi tahsilatı",
                text: "Alt bayi son kullanıcıdan aynı sistemle tahsil eder. Parası hızlı gelir, ana bayiye de hızlı öder.",
              },
            ],
          },
        },
      ],
    },

    // ================= II. FARK =================
    {
      id: "fark",
      nav: "Fark",
      eyebrow: "Bölüm II, konumlanma",
      title: "Tahsildar'ın farkı esneklik, pazardaki boşluk da tam orası",
      lede: "Tahsildar sadece geç ödemeyi takip eden bir sistem değil. Ana firma ya da ana bayi, her bayisine ve alt bayisine ayrı ödeme yöntemi, taksit sayısı, oran ve limit tanımlayabiliyor.",
      blocks: [
        {
          type: "cards",
          grid: {
            variant: "legs",
            flowSep: "+",
            items: [
              {
                k: "Birinci bacak",
                title: "Ana bayi",
                html: "Bütün ağını tek ekranda görür. Hangi alt bayiye hangi koşulu vereceğine kendisi karar verir, riski kendi seçtiği ölçüde alır ve alt bayilerden tahsilatını yapar.",
                fz: true,
                flow: ["Görür", "Koşulu belirler", "Tahsil eder"],
              },
              {
                k: "İkinci bacak",
                title: "Alt bayi",
                html: "Ana bayiden aldığı esneklik sayesinde son kullanıcıya daha rahat satar ve son kullanıcıdan tahsilatını da aynı sistem üzerinden yapar.",
                flow: ["Esnek öder", "Rahat satar", "Tahsil eder"],
              },
            ],
          },
        },
        { type: "h3", text: "Kim neyi yapıyor, kim yapmıyor" },
        {
          type: "prose",
          paras: [
            "Romanya'da bankalar, ödeme kuruluşları ve fatura yazılımları zincirin bir parçasını çözüyor. Koşulu ana bayinin elinde tutan bir oyuncu görmedik.",
          ],
        },
        {
          type: "matrix",
          table: {
            head: ["İhtiyaç", "Bankaların taksit programları", "Ödeme kuruluşları", "Fatura yazılımları", "Tahsildar"],
            rows: [
              {
                need: "Her alt bayiye ayrı yöntem, taksit, oran ve limit",
                cells: [
                  { level: 0, label: "Yok", note: "Koşulu banka belirliyor" },
                  { level: 0, label: "Yok" },
                  { level: 0, label: "Yok" },
                  { level: 4, label: "Var" },
                ],
              },
              {
                need: "Bütün bayi ağını tek ekranda görmek",
                cells: [
                  { level: 2, label: "Kısmen", note: "Sadece kendi hesabı" },
                  { level: 2, label: "Kısmen", note: "İşlem listesi" },
                  { level: 2, label: "Kısmen", note: "Kesilen faturalar" },
                  { level: 4, label: "Var" },
                ],
              },
              {
                need: "Ödemeyi faturayla eşleştirip cari hesabı güncellemek",
                cells: [
                  { level: 0, label: "Yok" },
                  { level: 0, label: "Yok" },
                  { level: 2, label: "Kısmen" },
                  { level: 4, label: "Var" },
                ],
              },
              {
                need: "Taksit",
                cells: [
                  { level: 4, label: "Var", note: "Tek bankanın kartıyla" },
                  { level: 2, label: "Kısmen", note: "Banka programları üzerinden" },
                  { level: 0, label: "Yok" },
                  { level: 3, label: "Ortakla", note: "Nexent Bank" },
                ],
              },
              {
                need: "Parayı lisanslı olarak taşımak",
                cells: [
                  { level: 4, label: "Var" },
                  { level: 4, label: "Var" },
                  { level: 0, label: "Yok" },
                  { level: 3, label: "Ortakla", note: "Token" },
                ],
              },
            ],
          },
        },
        {
          type: "small",
          html: "fspark9 değerlendirmesi, sahada doğrulanmalı. Kaynaklar: banka program yönetmelikleri, Revista Biz, HotNews, Forbes România.",
        },
        { type: "pull", text: "Tahsildar'ın değeri, koşulu belirleme yetkisini bankadan alıp ana bayiye vermek." },
        {
          type: "prose",
          paras: [
            '<strong>Bugün doğrudan rakip yok, ama yarın çıkabilir.</strong> EuPlătesc parayı taşıyor, cari hesabı ve bayiye özel koşulu yönetmiyor. Bir fatura yazılımı ya da ERP ile birleşip bayi ekranına inerse rakibe dönüşebilir. Netopia üye işyerlerine finansmana, SmartBill ise ödeme tarafına yaklaşıyor <span class="src">Economedia, HotNews</span>.',
          ],
        },
      ],
    },

    // ================= III. MODEL =================
    {
      id: "model",
      nav: "Model",
      eyebrow: "Bölüm III, lisans ve para akışı",
      title: "Token'ın lisansı, Tahsildar'ın ekranı",
      lede: "Ödeme dünyasında bir kuruluşun lisansını kiralamak diye bir şey yok. Ama lisans almadan çalışmanın yasal yolları var. Kurulum da belli: doğrudan Token ile başlanıyor.",
      blocks: [
        {
          type: "prose",
          paras: [
            "Parayı Token işler. Ana bayiler ve alt bayiler Token'ın üye işyeri ya da alt üye işyeri olarak kaydedilir. Tahsildar ödeme ekranını, fatura eşleştirmesini, bayiye özel koşulları, hatırlatmaları ve raporları sağlar, parayı hiçbir aşamada tutmaz. Sözleşmeye hangi kalıbın yazılacağı (teknik sağlayıcı, alt üye işyeri ya da temsilci) hukuk görüşüyle netleşir.",
            'Token\'ın lisansı bu kurguya uygun görünüyor. BNR, Ekim 2024\'te Token\'a online ve fiziki POS üzerinden ödeme kabulü ve ayrıca para transferi yetkisi verdi <span class="src">Odero blog, Business Forum</span>. Para transferi yetkisi, alt bayiden tahsil edip ana bayiye ve üreticiye dağıtan akışa imkân verebilir. Tam kapsamı Token\'dan teyit edilmeli.',
          ],
        },
        { type: "h3", text: "Regülatör ne kadar sıkı" },
        {
          type: "facts",
          row: {
            items: [
              {
                title: "Lisans az ve yavaş",
                html: 'Netopia başvurusunu 2024 sonunda yaptı, lisansı Temmuz 2026\'da aldı. <span class="src">Ziarul Financiar</span>',
              },
              {
                title: "Lisans alıp beklemek yasak",
                html: '12 ay içinde faaliyete geçmeyenin yetkisi geri alınabiliyor. <span class="src">Kanun 210/2019</span>',
              },
              {
                title: "Pay değişikliği bildirilir",
                html: 'Yüzde 10 ve üstü değişiklik BNR\'ye önceden bildiriliyor. <span class="src">DLA Piper</span>',
              },
              {
                title: "Kara para cezaları ağır",
                html: 'BNR, OTP Bank\'a müşteri tanıma eksikleri yüzünden rekor ceza verdi. <span class="src">Economedia</span>',
              },
              {
                title: "Sorumluluk şirkette",
                html: '"Teknik sağlayıcıyız" demek yetmiyor, hukuken belgelenmesi gerekiyor. <span class="src">BNR yönetmeliği, 2024</span>',
              },
            ],
          },
        },
        {
          type: "note",
          html: "Birleşik Ödeme Romanya'da e-para lisansı için yola çıktı ve kamuya açık bir lisans izi yok. Sektörden duyduğumuz, regülatörün izin vermediği. Aynı sürprizi yaşamamak için model kurulmadan Bükreş'te fintech alanında çalışan bir hukuk bürosundan yazılı görüş alınmalı.",
        },
        { type: "h3", text: "Para nasıl akar" },
        {
          type: "steps",
          items: [
            {
              lead: "Üretici ya da ana bayi Tahsildar'a abone olur.",
              text: "Faturaları e-Factura üzerinden kendiliğinden Tahsildar'a düşer.",
            },
            {
              lead: "Ana bayi her alt bayi için koşulu tanımlar.",
              text: "Hangi ödeme yöntemleri açık, kaç taksit, hangi oran, hangi limit.",
            },
            {
              lead: "Alt bayi borcunu Tahsildar ekranında görür ve öder.",
              text: "Kart, taksitli kart, anlık transfer, havale ya da otomatik ödeme talimatı.",
            },
            {
              lead: "Kart ve anlık transferi Token işler.",
              text: "Para doğrudan ana bayinin ya da üreticinin hesabına geçer.",
            },
            {
              lead: "Tahsildar ödemeyi faturayla eşleştirir.",
              text: "Cari hesabı günceller, raporu üretir.",
            },
            {
              lead: "Alt bayi son kullanıcıdan aynı sistemle tahsil eder.",
              text: "Tahsilat linki ya da Beko POS ile.",
            },
            {
              lead: "Vade ya da erken ödeme gerekirse finansmanı Nexent Bank verir.",
              text: "Tahsildar veriyi ve ekranı sağlar.",
            },
          ],
        },
        { type: "h3", text: "Bayiler bugün nasıl ödüyor" },
        {
          type: "prose",
          paras: [
            'Firmalar arası nakit ödeme günde kişi başı 5.000 lei ile sınırlı, üstü bankadan gitmek zorunda <span class="src">Kanun 70/2015, ANAF rehberi</span>. Bu yüzden bayi ödemelerinin gövdesi banka üzerinden dönüyor. En yaygın yollar şunlar:',
          ],
        },
        {
          type: "cards",
          grid: {
            variant: "pay",
            items: [
              {
                k: "En yaygın",
                title: "Banka havalesi",
                html: "Firmalar arası günlük ödemeler bankalar arası takas sistemiyle gidiyor. Hızlı ama taksit ve koşul yok.",
              },
              {
                k: "Sahada",
                title: "Temsilci tahsilatı",
                html: "Distribütörün satış temsilcisi siparişle birlikte eski borcu toplar. Yıllarca nakit, senet ya da söz ile yürüdü.",
              },
              {
                k: "Teminat",
                title: "Senet ve çek",
                html: "Hâlâ teminat olarak kullanılıyor, BNR'nin karşılıksız ödeme kayıt sistemi var.",
              },
              {
                k: "Yayılıyor",
                title: "Kart ve POS",
                html: '1 Ocak 2026\'dan beri neredeyse tüm işletmeler elektronik ödeme kabul etmek zorunda. <span class="src">Factureaza.ro</span>',
              },
              {
                k: "Yeni",
                title: "Anlık transfer",
                html: "Plăți Instant ve RoPay. Bugün ağırlıkla bireyler ve şahıs şirketleri kullanıyor.",
              },
            ],
          },
        },
        {
          type: "note",
          html: "Tahsildar'ın işi bunların yerine geçmek değil. Hepsini tek cari hesapta toplamak ve ana bayinin hangi alt bayiye hangisini açacağını seçmesini sağlamak.",
        },
        { type: "h3", text: "Kredi riski nereye gider" },
        {
          type: "prose",
          paras: [
            "Tahsildar bayiye kendi kasasından vade ya da kredi açamaz. Bu Romanya'da banka dışı kredi kuruluşu statüsü ister ve riski tek şirkete yığar. Risk iki yoldan dağılır:",
          ],
        },
        {
          type: "cards",
          grid: {
            variant: "legs",
            items: [
              {
                k: "Birinci yol",
                title: "Ana bayi riski kendi seçer",
                html: "Hangi alt bayiye ne kadar vade vereceğine kendisi karar verir. Bu, ana bayinin kendi ticari riskidir, Tahsildar'ın değil.",
              },
              {
                k: "İkinci yol",
                title: "Finansman ortağı taşır",
                html: 'Alacak Nexent Bank\'a devredilir ya da ödeme bankanın kredi kartıyla taksitlendirilir. Faktoring pazarının yüzde 89\'u zaten rücusuz. <span class="src">Bursa.ro</span>',
              },
            ],
          },
        },
        { type: "h3", text: "e-Factura işi hızlandırır" },
        {
          type: "prose",
          paras: [
            'Firmalar arası bütün faturalar 2024 başından beri devletin e-Factura sisteminden geçiyor ve yazılımlar için bir programlama arayüzü var <span class="src">Factureaza.ro, ANAF API belgeleri</span>. Tahsildar bundan dört yoldan faydalanır:',
          ],
        },
        {
          type: "facts",
          row: {
            four: true,
            items: [
              {
                title: "Faturalar kendiliğinden gelir",
                html: "Ana bayi Tahsildar'ı ANAF'ta yetkilendirir. ERP projesi gerekmez, kurulum haftalardan günlere iner.",
              },
              {
                title: "Alacak tartışmasız olur",
                html: 'Devletin sisteminde kayıtlı fatura için "almadım" itirazı zayıflar.',
              },
              {
                title: "Eşleştirme otomatik olur",
                html: "Ödeme gelince doğrudan e-Factura kaydıyla eşleşir, elle giriş kalmaz.",
              },
              {
                title: "Risk verisi doğar",
                html: "Alt bayinin alım düzeni, Nexent Bank'ın limit verirken kullanacağı en temiz veri olur.",
              },
            ],
          },
        },
        {
          type: "note",
          html: "Alt bayinin bütün tedarikçi faturalarına erişmek ve bu veriyi bankayla paylaşmak açık rıza ve net bir sözleşme ister. Hukuki tarafına ayrıca bakılması gerekiyor.",
        },
      ],
    },

    // ================= IV. ORTAKLAR =================
    {
      id: "ortaklar",
      nav: "Ortaklar",
      eyebrow: "Bölüm IV, ortaklar ve rakipler",
      title: "Her halkada bir ana ortak, arkasında bir yedek",
      lede: "Tahsildar zaten Fiba ve Token ile görüşüyor. Yol haritası bu iki ortak üzerine kuruldu, diğerleri alternatif olarak hazırda duruyor.",
      blocks: [
        {
          type: "ring",
          ring: {
            sectors: PARTNER_RING,
            figureTitle: "Ortaklık haritası",
            figureSub: "Bir alana tıklayın, ana ortağı ve alternatifleri görün",
            ariaLabel: "Ortaklık haritası",
            centerTitle: "Tahsildar",
            centerSub: "ekran ve koşul",
            detailSuffix: "ana ortak",
            altsLabel: "Alternatifler.",
          },
        },
        { type: "h3", text: "Token ve rakipleri yan yana" },
        {
          type: "table",
          table: {
            head: ["", "Token (Odero)", "Netopia", "EuPlătesc", "PayU"],
            rows: [
              [
                "Lisans",
                "Ödeme kuruluşu, Ekim 2024; ödeme kabulü ve para transferi",
                "Ödeme kuruluşu, Temmuz 2026",
                "Ödeme kuruluşu",
                "Global grup, Romanya'da e-ticaret odaklı",
              ],
              [
                "Üye işyeri",
                "Güncel sayı açıklanmadı; 2023'te hedef 15.000+",
                "25.000+",
                "15.000+ online mağaza (2022)",
                "Kendini pazar lideri olarak tanımlıyor",
              ],
              ["Fiziki POS", "Var, kendi üretimi Beko cihazları", "Online ağırlıklı", "Online ağırlıklı", "Online ağırlıklı"],
              [
                "Taksit",
                "OderoPAY'de taksitli ve tekrarlayan ödeme",
                "Banka programları üzerinden",
                "9 bankayla ortak",
                "Bazı mağazalarda cironun yüzde 30'u",
              ],
              ["RoPay", "Doğrudan bağlantı izi yok", "Planlarında var", "Doğrudan bağlı, bu sonbahar PayFac", "Bilgi yok"],
              ["Türk bağlantısı", "Var, Koç", "Yok", "Yok", "Yok"],
            ],
          },
        },
        {
          type: "small",
          html: "Kaynaklar: Odero blog, Economedia, Ziarul Financiar, Revista Biz, Mobilissimo, StartupCafe, Romania Insider.",
        },
        {
          type: "note",
          html: "Ödeme ortağında ölçeği üye işyeri sayısı gösterir. Token'ın bugünkü sayısı ve RoPay takvimi ilk görüşmede sorulacak iki soru. RoPay bağlantısı uzaksa anlık transfer için EuPlătesc ikinci ortak olarak devreye girer, kart ve POS Token'da kalır.",
        },
        { type: "h3", text: "Bankalar neden masaya oturur" },
        {
          type: "two",
          items: [
            {
              type: "hbars",
              figure: {
                title: "Varlık payı, 2025 sonu",
                sub: "En büyük yedi banka",
                rows: BANK_SHARE_ROWS,
                max: BANK_SHARES_MAX,
                caption: "Kaynak: Romania Insider, BNR verisi. Raiffeisen, Garanti BBVA Romanya'yı da alıyor.",
                flush: true,
              },
            },
            {
              type: "prose",
              paras: [
                'Bankalar 2026 sonuna kadar cirolarının yüzde 4\'ünü ek vergi olarak ödüyor ve sektörün özkaynak getirisi 2023\'teki yüzde 20\'den 2026 başında yüzde 14\'e indi <span class="src">Kinstellar, bne IntelliNews</span>. Böyle bir baskıda banka, ek sermaye bağlamadan gelir getiren kanallar arar.',
                "Tahsildar tam böyle bir kanal: bankanın satış ekibi olmadan binlerce bayiyi bankanın ürünlerine bağlar. Bankayla iki gelir modeli konuşulabilir. Tahsildar ekranından finansmana giden her fatura için bir yönlendirme payı ve bayi ödemeleri bankanın altyapısından geçtiğinde üye işyeri komisyonundan bir pay.",
              ],
            },
          ],
        },
        { type: "h3", text: "Nexent Bank neden ilk ortak" },
        {
          type: "cards",
          grid: {
            variant: "trio",
            items: [
              {
                k: "Taksitli kart",
                title: "Taksit programı",
                html: 'Romanya\'nın ilk taksitli kredi kartı bu bankadan çıktı. Kart bireylere veriliyor ve yaklaşık 9.500 partner işyerinde taksit yapılabiliyor, aralarında yapı malzemesi, mobilya ve oto servis de var. <span class="src">Forbes România, Efin</span>',
                fz: true,
              },
              {
                k: "Sahada tahsilat",
                title: "Avantaj SoftPOS",
                html: 'Her Android telefonu POS\'a çeviriyor. Banka hedef kitlesini açıkça "bayi ağından tahsilat yapan distribütörler" olarak sayıyor. <span class="src">Economica.net</span>',
              },
              {
                k: "Yeni yapı",
                title: "Yeni isim, yeni şube",
                html: 'Ocak 2025\'ten beri Hollanda\'daki ana bankanın Bükreş şubesi, Temmuz 2025\'ten beri adı Nexent Bank. Banka dijital tarafı güçlendireceğini söylüyor. <span class="src">Economica.net, ZF</span>',
              },
            ],
          },
        },
        {
          type: "note",
          html: "Taksit programının 9.500 partner işyeri içindeki yapı malzemesi, mobilya ve oto servis işyerleri Faz 1 için hazır bir havuz. Bu işyerleri son kullanıcıya taksitli satışı zaten biliyor. Eksikleri, kendi tedarikçileriyle aralarındaki bayiye özel koşul ve tahsilat ekranı.",
        },
        { type: "h3", text: "Kim ne kazanır" },
        {
          type: "cards",
          grid: {
            variant: "wins",
            items: [
              {
                k: "Tahsildar",
                title: "Üç gelir",
                html: "Ana bayiden platform ücreti, Nexent Bank'tan kanal ücreti, POS ve interchange gelirinden pay.",
                fz: true,
              },
              {
                k: "Nexent Bank",
                title: "Hazır bir ağ",
                html: "Yeni kart ve kredi müşterileri, yeni partner işyerleri, kart harcaması ve üye işyeri komisyonu.",
              },
              { k: "Token", title: "İşlem hacmi", html: "Bayi ağlarıyla gelen düzenli ödeme trafiği." },
              {
                k: "Üretici ve ana bayi",
                title: "Peşin para",
                html: "Parasını peşin alır, ağına esneklik verir, satışı artar.",
              },
              { k: "Alt bayi", title: "Nefes", html: "Nakit sıkışınca finansman, son kullanıcıya taksit imkânı." },
            ],
          },
        },
        {
          type: "prose",
          space: "md",
          paras: [
            "<strong>Açık soru:</strong> Bankanın kredi kartlarıyla yapılan taksit Token'ın kabul altyapısından çalışabiliyor mu, yoksa sadece bankanın kendi POS'unda ve SoftPOS'unda mı? Kurgunun hangi altyapıyla kurulacağını bu cevap belirler.",
          ],
        },
      ],
    },

    // ================= V. YOL HARİTASI =================
    {
      id: "yol",
      nav: "Yol haritası",
      eyebrow: "Bölüm V, yol haritası",
      title: "Hazırlıktan Macaristan'a dört faz",
      lede: "Takvim önerimizdir, Token ve Nexent Bank görüşmelerinin hızına göre netleşir. Her fazın sonunda bir sonrakine geçmek için karşılanması gereken koşulları yazdık.",
      blocks: [
        {
          type: "roadmap",
          roadmap: { phases: ROADMAP_PHASES, ariaLabel: "Fazlar", exitLabel: "Geçiş koşulu" },
        },
        { type: "h3", text: "Faz 1 aday listesi" },
        {
          type: "table",
          table: {
            head: ["Şirket", "Romanya'daki varlığı", "Bayi yapısı", "Uygunluk"],
            rows: [
              [
                "Kastamonu Entegre",
                'Reghin\'de levha fabrikası, 150 milyon avroluk yatırım <span class="src">Economica.net</span>',
                "Mobilya atölyeleri, yapı marketler, levha bayileri (yorum)",
                '<span class="lv4 fit">Yüksek</span>',
              ],
              [
                "Yıldız Entegre",
                'Ağaç işleme yatırımı <span class="src">Capital</span>',
                "Kastamonu'ya benzer (yorum)",
                '<span class="lv4 fit">Yüksek</span>',
              ],
              [
                "Türk sermayeli toptancılar",
                'Bükreş, Ilfov ve Köstence\'de yoğun <span class="src">Revista Biz</span>',
                "Perakendecilere vadeli satış (yorum)",
                '<span class="lv4 fit">Yüksek</span>',
              ],
              [
                "Beko România",
                'Găești ve Ulmi fabrikaları, 37 noktalı servis ağı <span class="src">HotNews</span>',
                "İç pazarın bayi mi zincir mi olduğu bilinmiyor",
                '<span class="lv2 fit">Orta</span>',
              ],
              [
                "Pladis ve Eti",
                'Gıda üretimi ve dağıtımı <span class="src">CursDeGuvernare</span>',
                "Büyük distribütörler üzerinden (yorum)",
                '<span class="lv2 fit">Orta</span>',
              ],
            ],
          },
        },
        { type: "h3", text: "Bir örnek, uçtan uca: Kastamonu Entegre" },
        {
          type: "prose",
          paras: [
            "Yorumdur, gerçek bayi yapısı ilk görüşmede doğrulanmalı. Adımlar arasında ilerleyin, zincirin hangi halkasının devrede olduğunu görün.",
          ],
        },
        {
          type: "useCase",
          useCase: {
            chain: USE_CASE_CHAIN,
            partners: USE_CASE_PARTNERS,
            steps: USE_CASE_STEPS,
            labels: {
              prev: "Geri",
              next: "İleri",
              restart: "Başa dön",
              play: "Otomatik oynat",
              stop: "Durdur",
            },
          },
        },
      ],
    },

    // ================= VI. DİKKAT =================
    {
      id: "dikkat",
      nav: "Dikkat",
      eyebrow: "Bölüm VI, dikkat edilecekler",
      title: "En çok dikkat edilmesi gereken on nokta",
      lede: "Bunların çoğu ürünle değil, sözleşme, ortak seçimi ve dil ile ilgili. Hepsi baştan konuşulursa ucuz, sonradan düzeltilirse pahalı.",
      blocks: [
        {
          type: "risks",
          items: [
            {
              cat: "Hukuk",
              title: "Hukuk görüşü olmadan başlamayın",
              text: "Paraya dokunmak, ödeme başlatmak ya da bayiye vade açmak ayrı ayrı BNR konusu. Sorumluluk şirkette.",
            },
            {
              cat: "Risk",
              title: "Kredi riskini Tahsildar üstlenmesin",
              text: "Riski ana bayi kendi seçer ya da finansman ortağı taşır. Başka yolu yok.",
            },
            {
              cat: "Ortaklık",
              title: "Her ana ortağın bir yedeği olsun",
              text: "RoPay gibi eksik yetenekler için alternatif ödeme ortağı ve Nexent Bank dışında bir taksit ortağı hazır tutulmalı.",
            },
            {
              cat: "Ortaklık",
              title: "Ortak yarın rakip olabilir",
              text: "Netopia finansmana, SmartBill ödemeye yaklaşıyor. Müşteri ilişkisi ve verinin kimde kalacağı sözleşmede açık yazılmalı.",
            },
            {
              cat: "Veri",
              title: "e-Factura verisi rıza ister",
              text: "Alt bayinin tedarikçi faturalarına erişim ve bu verinin bankayla paylaşılması ayrı izin ve net sözleşme gerektirir.",
            },
            {
              cat: "Uyum",
              title: "Kara para uyumu Tahsildar'ın da işi",
              text: "Lisanslı ortak, bayi tanıma ve işlem izleme için Tahsildar'dan veri ve süreç desteği isteyecek.",
            },
            {
              cat: "Dil",
              title: "Güven dili abartısız olmalı",
              text: 'Caritas ve FNI gibi büyük piramit çöküşlerini yaşamış bir ülkede cazip vaat şüphe uyandırır. "Paranız bankanızdan alacaklının bankasına gider, arada biz tutmayız" gibi sade cümleler güven verir.',
            },
            {
              cat: "Para",
              title: "Kur riski bayinin cebinden çıkmasın",
              text: "Geliri lei olan bayiye euro fiyat vermek her ay artan fatura demek. Fiyat lei, güncelleme yılda bir.",
            },
            {
              cat: "Portföy",
              title: "Tek sektöre yığılmayın",
              text: "Devlet özel alacaklara müdahale edebiliyor. Çiftçi borçlarının ertelenmesi bunun örneği, tarım en sona kalmalı.",
            },
            {
              cat: "İtibar",
              title: "Türk ağında taraf tutmayın",
              text: "Kurumsal kapılardan girin: TIAD, Forvis Mazars, Koç ve Fiba grupları. Aracı, çalışan ve pilot müşteri seçerken Gülen hareketiyle ilişkilendirilen çevreyle bağı sessizce kontrol edin.",
            },
          ],
        },
        { type: "h3", text: "Ülkeyi dört cümlede okumak" },
        {
          type: "cards",
          grid: {
            variant: "ctx",
            items: [
              {
                k: "Siyaset",
                title: "Belirsizlik sürecek",
                html: 'Hükümet Mayıs 2026\'da düştü, yenisi güvenoyu arıyor. Anketlerde önde olan AUR erken seçim istiyor. Şirketi yerli bir şirket gibi kurmak, rüzgâr ne yöne eserse essin korur. <span class="src">Al Jazeera, Puterea, BZI</span>',
              },
              {
                k: "Ekonomi",
                title: "Resesyon ve nakit sıkışıklığı",
                html: '"Alt bayinize esneklik verin, satışınız durmasın" mesajı tam bu ortamda güçlü.',
              },
              {
                k: "İnsan",
                title: "İki Romanya var",
                html: "Büyük şehirlerde güçlü bir beyaz yaka kitlesi var, ekip kurmak zor değil. Kırsal bayi ise başka bir dünya.",
              },
              {
                k: "Kültür",
                title: "Güven kişisel ilişkiyle kurulur",
                html: 'İş kültürü resmiyete ve hiyerarşiye önem veriyor. Bu yüzden Faz 2\'de Romen saha satışçı şart. <span class="src">Forvis Mazars</span>',
              },
            ],
          },
        },
      ],
    },

    // ================= VII. GÖRÜŞMELER =================
    {
      id: "gorusmeler",
      nav: "Görüşmeler",
      eyebrow: "Bölüm VII, kimlerle görüşülmeli",
      title: "İlk görüşülecekler ve soruları",
      lede: "Sıra önemli. İlk dört görüşme modelin kendisini belirliyor, sonrakiler pilotu ve büyümeyi.",
      blocks: [
        {
          type: "meetings",
          meetings: {
            meetings: MEETINGS,
            filters: [
              { key: "all", label: "Hepsi" },
              { key: "0", label: "Faz 0" },
              { key: "1", label: "Faz 1" },
              { key: "2", label: "Faz 2 ve sonrası" },
            ],
            labels: {
              filterAria: "Faza göre süz",
              countSuffix: "görüşme",
              phase: "Faz",
              live: "Görüşme sürüyor",
              firstFour: "İlk dört",
            },
          },
        },
      ],
    },
  ],

  closing: {
    id: "son",
    quote:
      "Romanya'da bayiler birbirini finanse ediyor. Tahsildar bu finansmanı görünür, esnek ve güvenli hale getirdiği ölçüde büyür.",
    lede: "Önerimiz net: Token ve Nexent Bank ile zemini kurmak, Türk kökenli bayi ağlarında modeli kanıtlamak ve o kanıtla Romen distribütörlere gitmek. Üzerine konuşalım.",
    name: "Mehmet Burak Dikmen",
    contact: ["info@fspark9.com", "fspark9.com"],
    method:
      "Yöntem: Bu yol haritası 29 Eylül 2026 tarihli Romanya açılım raporundan türetildi. Rakamlar kamuya açık kaynaklardan geliyor, yorum olan yerler ayrıca belirtildi. Takvim bir öneridir. Hukuki konularda son söz Romanya'da yetkili bir hukuk bürosunundur.",
    sourcesLabel: "Kaynaklar",
    sources: SOURCES,
  },
};
