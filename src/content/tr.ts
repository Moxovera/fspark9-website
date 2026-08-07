import type { HomePage, SiteSettings } from "@/types/content";

export const tr: HomePage = {
  seo: {
    title: "",
    description: "",
  },
  hero: {
    eyebrow: "GÜVEN PAZARLANMAZ. KURULUR.",
    headlinePrimary: "Bankacılık tarafını bir kere kurun.",
    headlineAccent: "Doğru kurun.",
    bullets: [
      "Doğru fırsatı bulun.",
      "Doğru partnerle çalışın.",
      "Müşteriyi ilk günden kazanın.",
    ],
    closingLine: "Ben kuran tarafım, sadece tavsiye veren değil.",
    ctaLabel: "30 dakikalık ücretsiz görüşme ayarla",
    ctaHref: "/book",
    ctaNote:
      "İlk görüşme ücretsiz. Doğru kişi değilsem bunu görüşmede açıkça söylerim.",
    scrollLabel: "Kaydır",
  },
  framework: {
    steps: [
      {
        id: "decide",
        label: "Strateji",
        description:
          "Gerçek gelir kaynaklarını belirlemek ve önce neyin kurulacağını netleştirmek.",
      },
      {
        id: "setup",
        label: "Altyapı",
        description:
          "Partner ağı, regülasyon uyumu ve lisans mimarisinin kurgulanması.",
      },
      {
        id: "ship",
        label: "Ürün",
        description:
          "Arayüzler, canlı işlem akışları ve baştan sona kayıt deneyiminin inşası.",
      },
    ],
  },
  proofStrip: {
    kicker: "Bu işi nerede yaptım",
    roles: "Ürün ve büyüme liderliği · Dijital bankacılık · Pazara giriş",
    items: [
      {
        name: "insha",
        line: "Avrupa'nın ilk faizsiz dijital bankası. Önerme, BaaS partnerleri, deneyim ve büyüme, sıfırdan.",
        order: 1,
      },
      {
        name: "RUUT",
        line: "Bir İşbank şirketi. Para transferi uygulamasından dijital bankaya, oradan İngiltere pazarına.",
        order: 2,
      },
      {
        name: "Turkcell",
        line: "Paycell ve Financell, uluslararası pazar açılımı.",
        order: 3,
      },
      {
        name: "Albaraka",
        line: "Dijital strateji ve rekabet araştırmaları.",
        order: 4,
      },
    ],
    link: { label: "Gerçekte ne kurulduğunu görün →", href: "/work" },
  },
  familiar: {
    heading: "Bunlardan biri tanıdık geliyor mu?",
    points: [
      {
        text: "Lansman tarihi her ay bir ay daha ileri kayıyor.",
        order: 1,
      },
      {
        text: "İş planı, birinin varsayımlarla doldurduğu bir tablo. Para kazanıp kazanmayacağınızı belirleyen o tek varsayım hiç test edilmedi.",
        order: 2,
      },
      {
        text: "Masada üç ürün fikri var ve içeriden bakınca hangisinin gerçek hacminizde para kazandığını dürüstçe söylemenin bir yolu yok.",
        order: 3,
      },
      {
        text: "Üç sağlayıcı teklif gönderdi. Kağıt üzerinde hepsi aynı, fiyatlar birbirinden çok uzak, kimse nedenini açıklamıyor. İkinci yıl canınızı yakan şey teklifte hiç yazmıyor.",
        order: 4,
      },
      {
        text: "Yönetim sıradaki ülkeyi sordu, odadaki kimse rakamla cevap veremiyor.",
        order: 5,
      },
      {
        text: "Burada çalışan ürünü yeni pazara taşıdınız. Dördüncü ayda, kurulduğu haliyle yasal olarak çalışamayacağını öğrendiniz.",
        order: 6,
      },
      {
        text: "Uygulama güzel görünüyor ama insanlar hesap açmaya başlıyor, bitirmiyor.",
        order: 7,
      },
      {
        text: "Tasarımcınızın akışı hukuktan kimsenin anlamadığı değişikliklerle geri geliyor. Yeniden çiziliyor. Yine geri geliyor.",
        order: 8,
      },
      {
        text: "Strateji sunumu mükemmeldi. Altı ay sonra binada onu canlı bir ürüne çevirmeyi bilen kimse yok.",
        order: 9,
      },
    ],
    closingLine:
      "Bunların hiçbiri fikrin yanlış olduğu anlamına gelmez. Çoğu zaman, o kararı daha önce hiç vermemiş birinin verdiği anlamına gelir.",
  },
  caseStudies: {
    heading: "Vaka İncelemeleri",
    intro:
      "Biri sıfırdan kuruldu ve Avrupa'da bir ilk oldu. Diğeri zaten çalışıyordu, küçüktü, ve hiç bulunmadığı bir pazarda başka bir şeye dönüşmesi gerekiyordu.",
    linkLabel: "Vakayı okuyun →",
    items: [
      {
        slug: "insha",
        name: "insha, Berlin",
        subtitle: "Avrupa'nın ilk faizsiz dijital bankası",
        body: "Önerme yok, altyapı yok, Avrupa'da partner yok, yerel güven yoktu. BaFin lisanslı bir kurum altında canlı bir bankaya, müşterinin telefonda tek oturuşta tamamladığı bir hesap açma akışıyla.",
        coverImage: {
          url: "/assets/case-study-insha.jpg",
          alt: "Elde tutulan insha Mastercard banka kartı",
          width: 1083,
          height: 650,
        },
        tags: ["Önerme", "Partner Seçimi", "Deneyim", "Açılım"],
        problemHeading: "Problem",
        problem:
          "Albaraka Türk, Avrupa'daki Müslüman topluluğu hedefliyordu. Ortada olan tek şey niyetti. Önerme yok, altyapı yok, Avrupa'da partner yok, yerel güven yok.",
        actionsHeading: "Ne yaptım",
        actions: [
          {
            label: "Önerme.",
            description:
              "Tek satır kod yazılmadan önce ürünün ne olduğunu ve kimin para ödeyeceğini netleştirdim.",
          },
          {
            label: "Partner.",
            description:
              "BaaS ve kart partnerlerini sıfırdan seçip müzakere ettim, ürünü BaFin lisanslı bir kurumun altına oturttum.",
          },
          {
            label: "Deneyim.",
            description:
              "Uçtan uca dijital deneyimi tasarladım ve yönettim. Telefonda tek oturuşta tamamlanan hesap açma akışı dahil.",
          },
          {
            label: "Açılım ve büyüme.",
            description:
              "Büyüme motorunu kurdum ve sahaya indirdim. Çünkü kimsenin adını duymadığı bir banka güveni reklamla satın alamaz.",
          },
        ],
        deliveredHeading: "Ne teslim edildi",
        delivered:
          "Avrupa'nın ilk faizsiz ve sadece dijital bankası, Almanya'da canlıda. solarisBank altyapısı, Mastercard banka kartı. Kullanıcı sayısı 2020 boyunca yüzde 300'ün üzerinde büyüyerek Almanya'da 40.000'i geçti, şirket 2,5 milyon euro yatırım aldı.",
        screens: [
          {
            url: "/assets/insha-screenshot-1.webp",
            alt: "insha uygulaması ekranı: Visa banka kartıyla dünya çapında ödeme ve para çekme",
            width: 810,
            height: 1440,
          },
          {
            url: "/assets/insha-screenshot-2.webp",
            alt: "insha uygulaması ana ekranı, bakiye ve son işlemler",
            width: 810,
            height: 1440,
          },
          {
            url: "/assets/insha-screenshot-3.webp",
            alt: "insha uygulaması ödemeler ekranı, yurt içi ve yurt dışı para transferleri",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-4.webp",
            alt: "insha uygulaması inSave tasarruf hedefleri ekranı",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-5.webp",
            alt: "insha uygulaması inSight harcama takibi, kategori bazlı bütçe dağılımı",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-6.webp",
            alt: "insha uygulaması inShare bağış aracı, yardım kuruluşu seçenekleri",
            width: 750,
            height: 1334,
          },
        ],
        order: 1,
      },
      {
        slug: "ruut",
        name: "RUUT, bir İşbank şirketi",
        subtitle: "Tek bir para transferi ürününden dijital bankaya, oradan İngiltere'ye",
        body: "Tek işlevli bir transfer uygulamasından tam bir dijital bankacılık önermesine, ekran ekran yeniden kuruldu, ve lisans altta inşa edilirken markanın çalışmaya devam etmesini sağlayan bir yapıyla yeni pazara taşındı.",
        coverImage: {
          url: "/assets/RUUT.avif",
          alt: "İki telefonda gösterilen RUUT bankacılık uygulaması",
          width: 1360,
          height: 1720,
        },
        tags: ["Önerme", "Deneyim", "Partner Seçimi", "Açılım"],
        problemHeading: "Problem",
        problem:
          "Almanya ve Avusturya'daki Türkler için tek işlevli bir transfer uygulaması. Yönetim ise önce Avrupa'daki diaspora, sonra İngiltere için tam bir dijital banka istiyordu. Yeni önerme, yeni ürün seti, yeni partnerler, yeni bir regülasyon pozisyonu ve yeni bir pazar. Hepsi aynı anda.",
        actionsHeading: "Ne yaptım",
        actions: [
          {
            label: "Önerme.",
            description: "Tek ürünlü bir transfer uygulamasını dijital bankacılık önermesine çevirdim.",
          },
          {
            label: "Deneyim.",
            description:
              "Markayı ve müşteri deneyimini uçtan uca yeniden kurdum. Her ekran, her akış. Sunulan değil, çıkarılan iş.",
          },
          {
            label: "Partner.",
            description:
              "Yeni ürünlerin arkasındaki partnerleri seçtim ve yönettim, ilişkileri teslimata kadar taşıdım.",
          },
          {
            label: "Açılım.",
            description:
              "İngiltere pazarına girişi yürüttüm. Tam lisans altta kurulurken markanın dağıtıcı pozisyonuyla çalışmasını sağlayan mimari dahil.",
          },
        ],
        deliveredHeading: "Ne teslim edildi",
        delivered:
          "Tüm AB vatandaşlarına açık sınır ötesi ödemeleri olan bir dijital bankacılık markası, ve bir milyona yakın Türk topluluğunu hedefleyen bir İngiltere girişi. Bireysel ve ticari hesaplar, kartlar, para transferi ve tam lisanslı pozisyona giden bir rota.",
        screens: [
          {
            url: "/assets/RUUT2.avif",
            alt: "RUUT uygulaması ekranlarının kolajı: işlemler, hızlı eylemler, bakiye ve kartlar",
            width: 2800,
            height: 2000,
          },
          {
            url: "/assets/RUUT4.avif",
            alt: "RUUT uygulaması para gönderme işlem detayları ekranı",
            width: 750,
            height: 1624,
          },
          {
            url: "/assets/RUUT5.avif",
            alt: "RUUT uygulaması işlem listesi ve filtre ekranlarının kolajı",
            width: 2800,
            height: 1784,
          },
        ],
        order: 2,
      },
    ],
  },
  services: {
    heading: "Başlamanın dört yolu",
    intro: "Çoğu kişi bunlardan biriyle başlıyor, gerisini bana bırakıyor.",
    labels: {
      problem: "Dert",
      action: "Ne yaparım",
      outcome: "Alacaklarınız",
    },
    items: [
      {
        slug: "proposition-blueprint",
        number: 1,
        title: "Önerme ve Ürün Planı",
        tag: "Karar",
        problem:
          "Geliştirmeye ciddi para harcamak üzeresiniz ve arkasındaki iş modeli, birinin varsayımlarını doldurduğu bir tablo. Odada daha önce finansal ürün çıkarmış kimse yok, o yüzden her tahmin farklı bir rakam ve farklı bir tarihle geliyor.",
        action:
          "Geliştirme bütçesini bağlamadan önce ticari modeli ve müşteri önermesini baskı altına alırım. Hangi ürün müşterinize gerçekten yakışıyor, hangisi sizin gerçek hacminizde para kazandırıyor, önce ne çıkacak ve ne çıkmayacak.",
        outcome:
          "Doğrulanmış bir önerme ve ticari model, arkasındaki gelir mantığı, yanlış olma ihtimali en yüksek varsayım ve ona karşı ne yapılacağı, ve ilk sürümü tanımlanmış bir çıkış sırası.",
      },
      {
        slug: "partner-selection",
        number: 2,
        title: "Partner Seçimi",
        tag: "Kurulum",
        problem:
          "Üç sağlayıcı teklif gönderdi. Kağıt üzerinde hepsi aynı, fiyatlar birbirinden çok uzak, kimse nedenini açıklamıyor. İkinci yıl canınızı yakan şey teklifte hiç yazmaz.",
        action:
          "API'yi değil, ticari motoru seçerim. Seçim sizin gerçek hacminize, risk iştahınıza ve fiyat listesinde görünmeyen maliyetlere göre yapılır. İsterseniz müzakerede de masada olurum.",
        outcome:
          "Her ismin neden orada olduğuyla birlikte bir kısa liste, gerçek şartlar üzerinden karşılaştırma, her partnere sorulacak sorular ve kötü cevabın nasıl duyulduğu, uğruna kavga edilmeye değer maddeler, ve yazılı bir öneri.",
      },
      {
        slug: "market-expansion",
        number: 3,
        title: "Yeni Ülkeye Açılma",
        tag: "Kurulum ve ürün",
        problem:
          "Ürün kendi ülkenizde çalışıyor. Yeni ülkede regülatör farklı, partner yapısı farklı, oradaki müşterinin beklentisi farklı. Çoğu açılım şurada tıkanıyor: ekip çalışan ürünü olduğu gibi taşıyor ve dördüncü ayda kurulduğu haliyle yasal olarak çalışamayacağını öğreniyor.",
        action:
          "Girişi öyle kurgularım ki, altta regülasyon pozisyonu inşa edilirken marka çalışmaya devam eder. Partner mimarisi, regülasyon rotası ve yerel önerme, sırayla değil birlikte kararlaştırılır.",
        outcome:
          "Her aşamadaki regülasyon pozisyonuyla birlikte giriş rotası, bunu taşıyan partner yapısı, ürünün yerelde neyi değiştirmesi gerektiği, ve tam lisans gelmeden çalışmaya başlamanızı sağlayan plan.",
      },
      {
        slug: "experience-build",
        number: 4,
        title: "Dijital Deneyim İnşası",
        tag: "Ürün",
        problem:
          "Uygulama güzel görünüyor ama insanlar hesabı yine de açamıyor. Tasarımcınızın akışı hukuktan kimsenin anlamadığı değişikliklerle geri geliyor, yeniden çiziliyor, yine geri geliyor.",
        action:
          "Uyum incelemesinden ilk seferde geçen akışlar tasarlarım. Bir yolculuğun hangi kısmının regülasyon gereği orada olduğunu bildiğim için eforu gerçekten tamamlamayı artıran yere harcarız.",
        outcome:
          "Müşteriye bakan deneyimin tamamı, ekranlar ve akışlar, geliştiriciye teslim edilmeye hazır halde. Dönüşüm için kurulmuş ve uyumdan tek turda geçecek şekilde tasarlanmış.",
      },
    ],
    fullEngagementHeading: "Ve işin tamamını istediğinizde",
    fullEngagementBody:
      "Bu dördü kapı, ev değil. Müşterilerin çoğu birinden giriyor, sonra işin tamamını bana bırakıyor. Partner, lisans rotası, regülasyon yapısı, ürünün kendisi ve lansman. Canlıya çıkana kadar yürütürüm ve ortasını bir ajansa ya da taşerona devretmem. Süreç boyunca ekibinizin içindeyim, iş bitince çıkarım.",
    link: {
      label: "Bunların pratikte nasıl işlediğine bakın →",
      href: "/services",
    },
  },
  comparison: {
    heading: "Anlatan değil, kuran taraf.",
    intro:
      "Bu problemin etrafında dört tip tedarikçi var. Her birinin size gerçekte ne teslim ettiği aşağıda.",
    scrollHint: "Kaydırarak karşılaştırın",
    columnLabels: { decide: "Karar", setup: "Kurulum", ship: "Ürün" },
    rows: [
      {
        label: "Strateji firmaları",
        decide: { state: "yes" },
        setup: { state: "no" },
        ship: { state: "partial", note: "Konsept sunumu" },
      },
      {
        label: "Tasarım ajansları",
        decide: { state: "no" },
        setup: { state: "no" },
        ship: { state: "partial", note: "Uyumdan geçmeyen ekranlar" },
      },
      {
        label: "Yazılım şirketleri",
        decide: { state: "no" },
        setup: { state: "no" },
        ship: { state: "partial", note: "Sadece sizin yazdırdığınız" },
      },
      {
        label: "fspark9",
        isUs: true,
        decide: { state: "yes" },
        setup: { state: "yes" },
        ship: { state: "yes" },
      },
    ],
  },
  approach: {
    heading: "Neyi farklı yapıyorum",
    blocks: [
      {
        number: 1,
        title: "Masaya sunum bırakıp gitmiyorum",
        body: "Bu piyasadaki çoğu kişi bir doküman teslim eder ve gider. Problem doküman değil. Problem ondan sonraki altı ay, binada onu canlı bir ürüne çevirmeyi bilen kimsenin olmaması. Ben işi karardan lansmana kadar taşıyorum, ve ortası bir ajansa ya da taşerona gitmiyor.",
      },
      {
        number: 2,
        title: "Dokuz, köprüdür",
        body: "Dokuz son adımdır. Bir işin tamamlanmadan hemen önceki hali. Strateji ile canlı ürün, fikir ile onu kullanan müşteri arasındaki boşluk. Çoğu proje tam orada takılıyor, ve benim çalıştığım yer o boşluk. Spark ise onu yeniden harekete geçiren şey.",
      },
      {
        number: 3,
        title: "Partner masasında sizinle otururum, arkanızda durmam",
        body: "Lisans görüşmeleri, BaaS müzakereleri, regülatör soruları, uyum incelemeleri. Bu masaların iki tarafında da bulundum. Oraya nasıl gireceğinize dair tavsiyeyle değil, sizinle birlikte girerim.",
      },
      {
        number: 4,
        title: "Ekibim çıkarır, ben sadece çizmem",
        body: "Deneyim tasarımı, UX ve UI. Bu işi düzgün yapan insanlar tarafından, regülasyonun bir ekranda neye izin verip neye vermeyeceğini bilen biri tarafından yönetilerek. Konsept değil, geliştirmeye hazır iş.",
      },
    ],
  },
  testimonials: {
    items: [
      {
        headline: "Bankacılık tarafı sizin omzunuzdan kalksın mı?",
        quote:
          '"Yeni iş fırsatlarını fark etti ve iki tarafın da gerçek sınırları içinde hedeflerimizi ileri taşıyan yaratıcı çözümler üretti. Pazar analizini ve stratejik planlamayı o yürüttü, sonra da iş ortaklığını başkasına devretmek yerine kendisi kurdu ve ayakta tuttu."',
        attribution: "Dijital Bankacılık Direktörü · Avrupalı BaaS partneri",
        ctaLabel: "Görüşme ayarla",
        order: 1,
      },
      {
        headline: "Hangi partnerle ilerleyeceğinize hâlâ karar veremediniz mi?",
        quote:
          '"Kısa listeyi daraltmış ve listedeki her isim için bir gerekçeyle geldi. Aylarca etrafında dolaştığımız karar tek bir toplantıda verildi ve o karar tuttu."',
        attribution: "Kurucu · Ödeme girişimi",
        ctaLabel: "Görüşme ayarla",
        order: 2,
      },
      {
        headline: "Akışlarınız uyum incelemesinde mi takıldı?",
        quote:
          '"Müşteri kazanım akışları ilk incelemede uyumdan geçti. Buradaki dört yılda bu bir kez bile olmamıştı."',
        attribution: "Ürün Direktörü · Lisanslı elektronik para kuruluşu",
        ctaLabel: "Görüşme ayarla",
        order: 3,
      },
      {
        headline: "Canlıya çıkana kadar kalan biri mi gerekiyor?",
        quote:
          '"Birkaç ülkede ekiplerin yer aldığı sınır ötesi bir projede iletişimi ve iş dağılımını o yönetti, üstelik ödemeler tarafında nadiren tek bir kişide görülen bir detay seviyesiyle."',
        attribution: "Program Direktörü · Sınır ötesi ödemeler",
        ctaLabel: "Görüşme ayarla",
        order: 4,
      },
    ],
  },
  audience: {
    heading: "Bu tarif size benziyorsa doğru yerdesiniz.",
    labels: { problem: "Dert", do: "Ne yaparım", result: "Sonuç" },
    cards: [
      {
        title: "Bankacılık tarafını devretmek isteyen fintechler",
        problem:
          "Ekibinizin haftası partner görüşmelerine, uyum sorularına ve entegrasyon detaylarına gidiyor. Pazarlamaya ve operasyona ayıracak vakit kalmıyor. Lansman tarihi her ay biraz daha ileri kayıyor, ve dürüst cevap şu: odada bunu daha önce yapmış kimse yok.",
        do: "Bankacılık ürün tarafını bana devredersiniz. Rotayı ben belirlerim, partneri ben bulurum, şartları ben müzakere ederim, süreci ben yürütürüm. İsterseniz ürünün kendisini ekibim çıkarır.",
        result:
          "Ekibiniz kendi işine döner. Ürün gecikmeyi bırakır, ay sonunda nerede olduğunuzu tek sayfada görürsünüz.",
      },
      {
        title: "Kendi müşterisine finansal ürün sunmak isteyen şirketler",
        problem:
          "Elinizde müşteri kitlesi de var, marka da. Bunu yeni bir gelir kalemine çevirmek istiyorsunuz. Kulağa basit geliyor, değil. Bankacılık tecrübesi yoksa yanlış partner ve yanlış iş modeli projeyi ilk aylarda bitirir.",
        do: "Hangi ürünün müşterinize gerçekten yakıştığını, hangi iş modelinin gerçek hacminizde para kazandırdığını ve hangi partnerin size uyduğunu birlikte netleştiririz. Sonrasında planı ekibinize teslim ederim ya da kurulumu ben yaparım.",
        result:
          "Elinizdeki müşteriden yeni bir gelir kalemi. Doğru zeminde başladığınız için ikinci yılda her şeyi baştan kurmak zorunda kalmazsınız.",
      },
      {
        title: "Kendi uyum yüküne sıkışmış bankalar",
        problem:
          "İstek var. Yeni ürün de konuşuluyor, fintech işbirlikleri de. Ama enerji rapora, denetime ve uyum sorularına gidiyor, kaynak bir türlü yeni işe ulaşmıyor. Fikirler rafta bekliyor, rakip önce çıkıyor.",
        do: "Regülasyonun nerede bittiğini, esnekliğin nerede başladığını bildiğim için fikri en baştan sağlam kurgularım. Partneri bulurum, hukuk ile iç ekibiniz arasındaki işi ben taşırım.",
        result:
          "Rafta bekleyen fikirler hayata geçer. Yeni işbirlikleri ve yeni gelir kanalları, kimsenin yüküne yük katmadan açılır.",
      },
    ],
  },
  story: {
    heading: "Bunu neden yapıyorum",
    lead: "Para, çikolata gibi satılmaz. Güvenle kazanılır.",
    paragraphs: [
      "Bunu yeni bir ülkede sıfırdan banka kurarken öğrendim. Adımız yoktu, geçmişimiz yoktu. Sahaya indik. İnsanlarla yüz yüze görüştük, mangal yaptık, düğünlerine gittik. Çünkü insanlar paralarını emanet etmeden önce karşısındakinin gerçek bir insan olduğunu bilmek istiyor.",
      "Fintechler bunu bazen küçümsüyor. Bankalar ise başka bir şey yapıyor. Bütün sistemi güvenin üzerine kurdular, sonra konfor ve regülasyon tuzağına düşüp geliştirmeyi bıraktılar.",
      "fspark9'u, sahada zor yoldan öğrendiklerimi damıtıp aynı acıyı size çektirmemek için kurdum.",
      "İsim de oradan geliyor. 9, son adımdır. Bir işin tamamlanmadan hemen önceki hali. Çoğu proje tam orada kalıyor. Spark ise onu yeniden harekete geçiren kıvılcım.",
    ],
    link: { label: "Hikayenin tamamını okuyun →", href: "/story" },
    media: {
      type: "image",
      image: {
        url: "/assets/portrait.jpg",
        alt: "fspark9 kurucusu Mehmet Burak Dikmen'in portresi",
        width: 2829,
        height: 4241,
      },
    },
  },
  process: {
    heading: "Nasıl çalışırım",
    steps: [
      {
        number: 1,
        title: "30 dakikalık ücretsiz görüşme",
        description:
          "Durumu anlatırsınız. Size gerçekten katma değer sağlayabilir miyim, birlikte bakarız.",
        detail:
          "Sağlayamayacaksam bunu açıkça söyler, işinize yarayacak yeri tarif ederim. Sunum yok, satış konuşması yok.",
      },
      {
        number: 2,
        title: "Size özel teklif",
        description:
          "Görüşmeden sonra çözümü, süreci, zaman planını ve fiyatı içeren bir teklif hazırlar gönderirim.",
        detail:
          "Genel bir katalog değil, sizin durumunuza yazılmış bir plan. Rakamı hiçbir taahhüt vermeden önce görürsünüz.",
      },
      {
        number: 3,
        title: "Anlaşırsak başlarız",
        description: "Her ay net bir çıktı, net bir fatura.",
        detail:
          "Nerede olduğumuzu öğrenmek için ayrıca toplantı istemenize gerek kalmaz. Devam etme ya da durma kararını gözünüz açık verirsiniz.",
      },
    ],
    ctaLabel: "Görüşmeyi ayarlayın →",
    ctaHref: "/book",
  },
  media: {
    heading: "fspark9 medyada",
    intro: "Bu işi anlattığım ve başkalarının bu iş hakkında yazdığı yerler.",
    items: [
      {
        source: "Konuşma kaydı",
        headline: "Building neo banks across three markets",
        description:
          "Üç ülkede, üç ayrı regülatör altında dijital banka kurmanın çıkardığı dersler.",
        note: "Video",
        href: "https://www.youtube.com/watch?v=sZvavBuMzLg",
        isVideo: true,
        order: 1,
      },
      {
        source: "The Fintech Magazine, FF News",
        headline: "Money and Morals",
        description:
          "Avrupa'nın ilk faizsiz dijital bankasını kurma süreci ve etik bir önermenin farklı yapması gerekenler üzerine bir röportaj.",
        note: "İngilizce",
        href: "https://ffnews.com/thought-leadership/exclusive-money-and-morals-mehmet-burak-dikmen-insha-in-the-fintech-magazine",
        order: 2,
      },
      {
        source: "Fintech Istanbul",
        headline: "Uzaktan müşteri tanıma süreçlerine dair bir analiz: Bank Ident",
        description:
          "Uzaktan kimlik doğrulamanın pratikte nasıl işlediği ve sürtünmenin gerçekte nerede olduğu üzerine.",
        note: "",
        href: "https://fintechistanbul.org/2022/01/09/uzaktan-musteri-tanima-sureclerine-dair-bir-analiz-bank-ident/",
        order: 3,
      },
      {
        source: "Panel kaydı",
        headline: "Dijital bankacılıkta büyüme ve ürün",
        description:
          "Bir dijital bankada büyüme ve ürün kararları gerçekte nasıl alınıyor.",
        note: "Video · İngilizce",
        href: "https://www.youtube.com/watch?v=nTPafclEZ7c",
        isVideo: true,
        order: 4,
      },
      {
        source: "Konferans konuşması",
        headline: "Yeni Nesil Dijital Bankacılık",
        description:
          "Yeni nesil dijital bankacılığın gerçekte neye ihtiyacı olduğu üzerine bir konuşma.",
        note: "Video",
        href: "https://www.youtube.com/watch?v=wxjHsjcIgws",
        isVideo: true,
        order: 5,
      },
    ],
  },
  faq: {
    heading: "Görüşmeden önce en çok sorulanlar",
    items: [
      {
        question: "Bu iş ne kadar tutuyor?",
        answer:
          "Fiyat listem yok, çünkü standart bir iş yok. İlk görüşmeden sonra kapsamı, süreci, zaman planını ve fiyatı içeren bir teklif gönderirim. Rakamı hiçbir taahhüt vermeden önce görürsünüz ve sonradan değişmez.",
        order: 1,
      },
      {
        question: "Sadece yol mu gösteriyorsunuz, işi de yapıyor musunuz?",
        answer:
          "İkisi de var, seçim sizin. Bazı müşteriler netliği alıp yoluna kendi devam ediyor. Bazıları partner görüşmelerini, lisans rotasını, entegrasyonu ve lansmanı bana bırakıyor. Ortası bir taşerona gitmiyor.",
        order: 2,
      },
      {
        question: "Neden bir firma yerine tek kişi?",
        answer:
          "Firmalar işi satmaya bir ortak, yapmaya bir junior gönderir. Burada görüştüğünüz kişi işi yapan kişi. Bütün fark bu, aynı anda az sayıda müşteri almamın sebebi de bu.",
        order: 3,
      },
      {
        question: "Bizim için erken mi?",
        answer:
          "Bazen evet. Ürünü isteyen var mı diye hâlâ test ediyorsanız bana ihtiyacınız yok, bunu görüşmede açıkça söylerim. Kurmaya karar verdiyseniz ve para harcanmak üzereyse, tam zamanı.",
        order: 4,
      },
      {
        question: "Hangi pazarlarda çalışıyorsunuz?",
        answer:
          "Avrupa'da yaşıyorum, Avrupa ve İngiltere'de çalışıyorum. Türkiye ve MENA doğduğum, büyüdüğüm ve çalıştığım yerler. Bunların dışında, bana para ödemeden önce bilgimin nerede bittiğini dürüstçe söylerim.",
        order: 5,
      },
      {
        question: "Bizim ekibimiz var. Siz nerede duruyorsunuz?",
        answer:
          "Ekibinizin üstünde değil, yanında. Odada daha önce kimsenin yapmadığı kısmı alıp taşıyorum, ekibiniz de kendi iyi olduğu işe dönüyor.",
        order: 6,
      },
      {
        question: "Bilgilerimiz hassas.",
        answer:
          "Detaya girmeden önce gizlilik sözleşmesi imzalarım. Ayrıca aynı pazarda aynı müşteri için yarışan iki şirketle aynı anda çalışmam. Bir çakışma varsa ilk görüşmede söylerim, sonra değil.",
        order: 7,
      },
      {
        question: "Çalışma ne kadar sürer?",
        answer:
          "İşe göre değişir. Partner seçimi haftalar sürebilir. Lisans ve lansman aylar sürer, bu da ikimizden çok düzenleyiciye bağlıdır. Her durumda her ay net bir çıktı ve net bir fatura olur.",
        order: 8,
      },
      {
        question: "İkinci ülkeye açılıyoruz. Ne zaman konuşmalıyız?",
        answer:
          "Ülke seçilmeden önce, seçildikten sonra değil. Bir pazara girişteki pahalı kararların çoğu ilk üç haftada veriliyor. Ülkeyi çoktan seçtiyseniz de çalışırız, o zaman neyin düzeltilebilir olduğundan başlarız.",
        order: 9,
      },
    ],
  },
  closingCta: {
    quote:
      '"Birkaç ülkede ekiplerin yer aldığı sınır ötesi bir projede iletişimi ve iş dağılımını o yönetti, üstelik ödemeler tarafında nadiren tek bir kişide görülen bir detay seviyesiyle. Projenin oturmasının sebebi de bu kombinasyon."',
    quoteAttribution: "Program Direktörü · Sınır ötesi ödemeler",
    headline: "Ekibinizin içinde, canlıya çıkana kadar.",
    body: "Rapor değil, danışmanlık aboneliği değil, ortada taşeron yok. Karar anında giriyorum, müşteri ürünü kullanmaya başlayınca çıkıyorum. İlk görüşme ücretsiz. Durumu anlatın, yardımcı olabilir miyim birlikte görelim. Olamıyorsam da elinizde yapmaya değer iki üç madde ile kalırsınız.",
    ctaLabel: "30 dakikalık ücretsiz görüşme ayarla",
    ctaHref: "/book",
    note: "İlk görüşme ücretsiz. Doğru kişi değilsem bunu görüşmede açıkça söylerim.",
  },
};

export const siteSettings: SiteSettings = {
  nav: [
    { label: "Neden fspark9", href: "/story" },
    { label: "Hizmetler", href: "/services" },
    { label: "Vaka İncelemeleri", href: "/work" },
    { label: "Medya", href: "/#media" },
    { label: "İletişim", href: "/book" },
  ],
  backLabel: "Geri",
  ctaLabel: "30 dakikalık ücretsiz görüşme ayarla",
  ctaHref: "/book",
  booking: {
    calLink: "mburakdikmen/quick-chat",
    title: "30 dakikalık ücretsiz görüşme",
    body: "Size uyan bir saat seçin. Görüşmeden önce nerede olduğunuzu ve neyin takıldığını iki satırla yazarsanız işimiz kolaylaşır.",
    meta1: "30 dk · Görüntülü görüşme",
    meta2: "Avrupa / İstanbul · saat dilimi algılandı",
  },
  subpageCta: {
    headline: "Ekibinizin içinde, canlıya çıkana kadar.",
    body: "Rapor değil, danışmanlık aboneliği değil, ortada taşeron yok. Karar anında giriyorum, müşteri ürünü kullanmaya başlayınca çıkıyorum. İlk görüşme ücretsiz. Durumu anlatın, yardımcı olabilir miyim birlikte görelim. Olamıyorsam da elinizde yapmaya değer iki üç madde ile kalırsınız.",
    ctaLabel: "30 dakikalık ücretsiz görüşme ayarla",
    ctaHref: "/book",
  },
  footer: {
    tagline: "Fintech ve dijital bankacılık danışmanlığı",
    nine: "9, son adımdır. Spark, onu ateşleyen şey.",
    signature: "GÜVEN PAZARLANMAZ. KURULUR.",
    email: "mehmetburakdikmen@gmail.com",
    linkedin: "https://www.linkedin.com/in/mdikmen/",
    nav: [
      { label: "Hizmetler", href: "/services" },
      { label: "Vaka İncelemeleri", href: "/work" },
      { label: "Bunu Neden Yapıyorum", href: "/story" },
      { label: "Görüşme Ayarla", href: "/book" },
    ],
    legalLinks: [
      { label: "Künye", href: "/impressum" },
      { label: "Gizlilik", href: "/privacy" },
      { label: "Çerezler", href: "/cookies" },
      { label: "Kullanım Şartları", href: "/terms" },
    ],
    legal:
      "fspark9 · Mehmet Burak Dikmen, şahıs işletmesi · Beusselstrasse 31, 10553 Berlin, Almanya",
    copyright: "© 2026 fspark9",
  },
  defaultOgImage: {
    url: "/assets/lockup-reversed.svg",
    alt: "fspark9",
    width: 3387,
    height: 964,
  },
};
