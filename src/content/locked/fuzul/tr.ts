// AUTO-EXTRACTED — see fuzul/fspark9-locked-fuzul-claude-code-brief.md and
// the extraction scripts run against fuzul-report-standalone.html. Content
// here is copied verbatim (jsdom DOM walk, not retyped) — do not hand-edit
// prose without re-checking against the reference file.
import type { LockedReportContent } from "@/types/content";

export const fuzulReportTr = {
  "hero": {
    "eyebrow": "Katılım bankacılığı · Rekabet analizi",
    "h1": "Evin<br>Bankası <em>Olmak</em>",
    "sub": "Katılım bankacılığında yeni dönem ve Fuzul Katılım için rekabet haritası: bankalar nerede duruyor, ürünler nerede birbirine benzedi ve boşluk nerede kaldı.",
    "whoB": "Mehmet Burak Dikmen",
    "whoSpan": "Eylül 2026 · Kamuya açık kaynaklarla hazırlandı",
    "stats": [
      {
        "v": "4,92<small>trilyon TL</small>",
        "l": "Katılım bankalarının Haziran 2026 toplam aktifi",
        "sourceIds": [
          "1"
        ]
      },
      {
        "v": "11 <span style=\"color:var(--bronze-ink)\">→</span> 13",
        "l": "Faal katılım bankası ve kuruluş aşamasındaki Fuzul ile Dost",
        "sourceIds": [
          "7"
        ]
      },
      {
        "v": "%14",
        "l": "2025'te kredili satılan konutların payı",
        "sourceIds": [
          "16"
        ]
      },
      {
        "v": "256",
        "l": "Fuzul Tasarruf'un Temmuz 2026 şube sayısı",
        "sourceIds": [
          "56"
        ]
      }
    ]
  },
  "summary": {
    "eyebrow": "Özet",
    "heading": "Raporun kısa hali",
    "points": [
      {
        "title": "Sektör büyüyor ama kalabalıklaşıyor.",
        "body": "Toplam aktif 4,92 trilyon TL, bankacılık içindeki pay yüzde 9,3 civarında. 2015'te 2025 için konan yüzde 15 hedefine ulaşılamadı.",
        "sourceIds": [
          "1",
          "9"
        ]
      },
      {
        "title": "Banka sayısı neredeyse ikiye katlandı.",
        "body": "2024 sonunda 9 olan faal katılım bankası sayısı Mart 2026'da 11 oldu. Fuzul ve Dost kuruluş aşamasında.",
        "sourceIds": [
          "7",
          "45"
        ]
      },
      {
        "title": "Sektörün yapısı değişiyor.",
        "body": "Ziraat, Vakıf ve Halk Katılım yıl sonunda birleşiyor; yeni yapı segmentin yaklaşık yüzde 36'sını tutacak. Emlak Katılım halka arz sürecinde.",
        "sourceIds": [
          "36",
          "12"
        ]
      },
      {
        "title": "Ürünler birbirine benziyor.",
        "body": "İşlemlerin yüzde 95'i dijitalde. İyi bir uygulama artık fark yaratan değil, temel bir şart.",
        "sourceIds": [
          "6"
        ]
      },
      {
        "title": "Fark, arkadaki güçten geliyor.",
        "body": "Dünya Katılım altınla, TOM Bank market ağıyla, Kuveyt Türk yıllar içinde kurduğu güven ve ucuz fonla, kamu bankaları geniş şube ağıyla öne çıkıyor.",
        "sourceIds": []
      },
      {
        "title": "Konutta büyük bir boşluk var.",
        "body": "Her 10 konuttan yaklaşık 8'i banka finansmanı olmadan satılıyor. Tasarruf finansmanı 1,5 milyon müşteriyi aştı.",
        "sourceIds": [
          "16",
          "53"
        ]
      },
      {
        "title": "Fuzul'un elinde kolay kopyalanamayacak varlıklar var.",
        "body": "256 şubelik bir ağ, 2024'te yüzde 30'u aşan pazar payı ve her ay düzenli ödeme yapan, ev sahibi olmak isteyen yüz binlerce müşteri.",
        "sourceIds": [
          "15b",
          "56"
        ]
      }
    ],
    "proposal": {
      "tagNum": "8",
      "tagLabel": "Önerimiz",
      "heading": "Evle ilgili her finansal kararda akla gelen ilk banka olmak",
      "body": "Tasarruf, teslimat, tapu, sigorta, düzenli ödemeler, mobilya, tadilat, yenileme ve yatırım. Evin etrafındaki bütün tamamlayıcı ürünler aynı müşteri yolculuğunda birleşirse, her adım bir sonrakinin değerini artırır.",
      "aside": "Bu öneri, bankanın kendi planlarına değil, pazarın bugünkü durumuna dışarıdan bakılarak yapılmış bir değerlendirmedir."
    }
  },
  "chapters": [
    {
      "id": "sektor",
      "nav": "Sektör",
      "eyebrow": "Bölüm I · Sektörün fotoğrafı",
      "heading": "Sektör hızla büyüyor, ama hedefin gerisinde",
      "lede": "Katılım bankaları iki yılda aktiflerini neredeyse ikiye katladı. Buna rağmen bankacılık içindeki payları, on yıl önce konan hedefin epey altında kaldı.",
      "blocks": [
        {
          "kind": "two",
          "style": null,
          "cols": [
            {
              "kind": "figure",
              "title": "Toplam aktif, trilyon TL",
              "sub": "2024 sonundan Haziran 2026'ya",
              "segButtons": null,
              "legendItems": null,
              "meter": null,
              "chart": "growth",
              "chartAria": "Katılım bankalarının toplam aktifi: 2024 sonu 2,6; 2025 sonu 4,3; Mart 2026 4,7; Haziran 2026 4,92 trilyon TL",
              "caption": "Kaynak: 2024 <a href=\"#k45\">[45]</a>, 2025 ve Mart 2026 TKBB <a href=\"#k6\">[6]</a><a href=\"#k7\">[7]</a>, Haziran 2026 banka bilançolarının toplamı <a href=\"#k1\">[1]</a>",
              "detailsNested": null
            },
            {
              "kind": "figure",
              "title": "Bankacılık içindeki aktif payı",
              "sub": "Bugünkü pay ve yüzde 15 hedefi",
              "segButtons": null,
              "legendItems": null,
              "meter": {
                "ariaLabel": "Haziran 2026 payı yüzde 9,33, hedef yüzde 15",
                "fillPct": 62.2,
                "labels": [
                  {
                    "leftStyle": "left:62.2%",
                    "goal": false,
                    "text": "%9,33 bugün"
                  },
                  {
                    "leftStyle": "left:calc(100% - 40px)",
                    "goal": true,
                    "text": "%15 hedef"
                  }
                ]
              },
              "chart": "shareSteps",
              "chartAria": "Aktif payı: 2024 sonu yüzde 8,14; 2025 sonu 9,2; Mart 2026 9,5",
              "caption": "Hedef 2015'te 2025 yılı için konmuştu <a href=\"#k9\">[9]</a>. Haziran payı farklı bir derlemeden geldiği için Mart ile birebir kıyaslanmamalı <a href=\"#k1\">[1]</a><a href=\"#k7\">[7]</a>.",
              "detailsNested": null
            }
          ]
        },
        {
          "kind": "details",
          "sumT": "Sektör tablosu",
          "sumH": "Fon, özkaynak, kâr ve banka sayısını görmek için tıklayın",
          "table": {
            "kind": "table",
            "isHeat": false,
            "head": [
              "Gösterge",
              "2024 sonu",
              "2025 sonu",
              "Mart 2026",
              "Haziran 2026"
            ],
            "bodyFillAttr": null,
            "rows": [
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Toplam aktif"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "2,6 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "4,3 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "4,7 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "4,92 trilyon TL"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Bankacılık içindeki aktif payı"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "%8,14"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "%9,2"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "%9,5"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "%9,33"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Toplanan fonlar"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "1,78 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "2,8 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "3,1 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Kullandırılan fonlar"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "1,2 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "2,2 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "2,3 trilyon TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Özkaynak"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "213,8 milyar TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "302 milyar TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "334 milyar TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Net kâr (yıllık)"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "63,1 milyar TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "86 milyar TL"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                }
              ],
              [
                {
                  "tag": "TD",
                  "cls": "",
                  "html": "Faal banka sayısı"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "9"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "10"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "11"
                },
                {
                  "tag": "TD",
                  "cls": "n",
                  "html": "-"
                }
              ]
            ],
            "minWidth": null
          }
        },
        {
          "kind": "prose",
          "html": "<p>2025 sonunda sektörde 1.506 şube, 22.733 çalışan, 19,9 milyon müşteri ve 8,4 milyon aktif müşteri vardı. Dijital müşteri sayısı bir yılda yüzde 25 artarak 7,9 milyona çıktı, 1,3 milyonu aşkın müşteri uzaktan kazanıldı ve işlemlerin yaklaşık yüzde 95'i dijital kanaldan geçti. <span class=\"src\"><a href=\"#k6\">[6]</a></span></p>"
        },
        {
          "kind": "note",
          "html": "İşlemlerin yüzde 95'inin dijitalde olması, dijital kanalların ve KYC/KYB iş ortaklarının en baştan ölçeklenebilir kurulması gerektiğini gösteriyor. Bu alanda yapılan bir hatayı sonradan düzeltmek, en pahalı düzeltmelerden biri oluyor."
        },
        {
          "kind": "prose",
          "html": "<p>Mart 2026'da katılım bankalarının toplanan fonlardaki payı yüzde 11, kullandırılan fonlardaki payı ise yüzde 9. <span class=\"src\"><a href=\"#k7\">[7]</a></span> Yani bankalar topladıkları kadar fon kullandıramıyor.</p>"
        },
        {
          "kind": "note",
          "html": "Katılım bankacılığı doğası gereği tüketimi değil üretimi finanse etmeyi savunur. Tüketimi tetikleyen klasik banka yapısı bu ilkeyle pek örtüşmez. Öne geçecek olan, topladığı fonu üretime dönük finansmana çevirebilen banka olacak."
        },
        {
          "kind": "h3",
          "text": "Kim ne kadar büyük"
        },
        {
          "kind": "prose",
          "html": "<p>Kuveyt Türk sektörün yaklaşık üçte birini tek başına tutuyor. Kamu birleşmesi tamamlandığında ise sıralama değişecek.</p>"
        },
        {
          "kind": "figure",
          "title": "Katılım sektörü içindeki aktif payı, Haziran 2026",
          "sub": "fspark9 hesaplaması, toplam 4,92 trilyon TL üzerinden",
          "segButtons": [
            {
              "mode": "now",
              "label": "Bugün"
            },
            {
              "mode": "merged",
              "label": "Birleşme sonrası"
            }
          ],
          "legendItems": [
            {
              "color": "background:var(--s-ozel)",
              "label": "Köklü özel banka"
            },
            {
              "color": "background:var(--s-kamu)",
              "label": "Kamu bankası"
            },
            {
              "color": "background:var(--s-yeni)",
              "label": "Yeni banka"
            }
          ],
          "meter": null,
          "chart": "share",
          "chartAria": "Katılım sektöründeki aktif payları",
          "caption": "Kaynak: <a href=\"#k1\">[1]</a>. Birleşme sonrası görünümde Halk Katılım'ın payı açıklanmadığı için dahil edilmedi; Fitch yeni yapının payını yaklaşık yüzde 36 olarak veriyor <a href=\"#k36\">[36]</a>.",
          "detailsNested": null
        },
        {
          "kind": "h3",
          "text": "Büyüklük tek başına kâr getirmiyor"
        },
        {
          "kind": "prose",
          "html": "<p>Aynı tabloyu kârlılıkla birlikte okuyunca farklı bir sıralama çıkıyor. Dünya Katılım, Kuveyt Türk'ün on ikide biri büyüklükte ama aktifine oranla en kârlı banka. Albaraka ile neredeyse aynı kârı, onun dörtte birinden küçük bir bilançoyla elde ediyor.</p>"
        },
        {
          "kind": "figure",
          "title": "Aktif büyüklüğü ve 6 aylık kâr / aktif, Haziran 2026",
          "sub": "Yatay eksen logaritmik. Balon büyüklüğü, yıl başından bu yana aktif büyümesini gösteriyor.",
          "segButtons": null,
          "legendItems": [
            {
              "color": "background:var(--s-ozel)",
              "label": "Köklü özel"
            },
            {
              "color": "background:var(--s-kamu)",
              "label": "Kamu"
            },
            {
              "color": "background:var(--s-yeni)",
              "label": "Yeni banka"
            }
          ],
          "meter": null,
          "chart": "bubble",
          "chartAria": "Bankaların aktif büyüklüğü ile kâr aktif oranı. Dünya Katılım yüzde 2,58 ile en üstte, TOM Katılım yüzde eksi 2,98 ile en altta.",
          "caption": "Ayrıntı için balonların üzerine gelin ya da dokunun. Kaynak: <a href=\"#k1\">[1]</a>. Kâr / aktif fspark9 hesaplamasıdır, yıllıklandırılmadı. Emlak Katılım kârı bankanın kendi açıklamasından; oran, bankanın açıkladığı 464 milyar TL aktif üzerinden hesaplandı <a href=\"#k59\">[59]</a>.",
          "detailsNested": {
            "kind": "details",
            "sumT": "Banka tablosu",
            "sumH": "Banka bazında aktif, büyüme ve kâr rakamları için tıklayın",
            "table": {
              "kind": "table",
              "isHeat": false,
              "head": [
                "Banka",
                "Aktif (milyar TL)",
                "Sektör payı",
                "Yıl başından büyüme",
                "İlk yarı net kâr (milyon TL)",
                "6 aylık kâr / aktif"
              ],
              "bodyFillAttr": "bank-rows",
              "rows": null,
              "minWidth": null
            }
          }
        },
        {
          "kind": "list",
          "items": [
            "<strong>Emlak Katılım</strong> konut ve gayrimenkul kimliğiyle kârlılıkta ikinci sırada: ilk yarıda 8,9 milyar TL kâr ve yüzde 48,7 özkaynak getirisi. <span class=\"src\"><a href=\"#k59\">[59]</a></span>",
            "<strong>Albaraka Türk</strong> büyüyor ama kârı eriyor. Konsolide kâr yüzde 59 düştü, personel gideri yüzde 48,7 arttı, açıklanan kârın yaklaşık beşte biri geçmiş yıl karşılık iptalinden geldi. <span class=\"src\"><a href=\"#k3\">[3]</a></span>",
            "<strong>Yeni dijital bankalar</strong> hızlı büyüyor ama henüz para kazanmıyor. Hayat Finans yüzde 58 büyüyüp 90 milyon TL kâr etti, TOM Katılım zararını büyüttü. Yeni bir banka için ilk yıllarda kârlılık zorlayıcı olabiliyor. <span class=\"src\"><a href=\"#k1\">[1]</a></span>"
          ]
        },
        {
          "kind": "note",
          "html": "Dünya Katılım'ın grafikte tek başına yukarıda durması, niş ve özel bir alana odaklanmanın gücünü gösteriyor."
        },
        {
          "kind": "note",
          "html": "Albaraka'daki tabloda katılım bankacılığının kendi sınırları ve yeni fon bulmanın maliyetli olması belirleyici görünüyor."
        },
        {
          "kind": "h3",
          "text": "Şube sayısı artık tek ölçü değil"
        },
        {
          "kind": "prose",
          "html": "<p>Türkiye Finans 2025'te 68 şube kapattı; aynı dönemde Ziraat Katılım 17, Emlak ve Vakıf Katılım 12'şer, Dünya Katılım 8 şube açtı. <span class=\"src\"><a href=\"#k5\">[5]</a></span> Türkiye Finans şube kapatırken 2026 ilk yarı kârını yüzde 230 artırdı. <span class=\"src\"><a href=\"#k1\">[1]</a></span> Şube sayısı büyümenin tek ölçüsü değil; verimlilik de bir strateji.</p>"
        },
        {
          "kind": "table",
          "isHeat": false,
          "head": [
            "Banka",
            "Yurt içi şube",
            "Tarih ve kaynak"
          ],
          "bodyFillAttr": null,
          "rows": [
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"kuveyt-turk\"></span>Kuveyt Türk"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "452"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Haziran 2026 <span class=\"src\"><a href=\"#k8\">[8]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"ziraat-katilim\"></span>Ziraat Katılım"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "233"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Mart 2026 <span class=\"src\"><a href=\"#k10\">[10]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"turkiye-finans\"></span>Türkiye Finans"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "224"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Haziran 2026 <span class=\"src\"><a href=\"#k49\">[49]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"albaraka-turk\"></span>Albaraka Türk"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "223"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Aralık 2025 <span class=\"src\"><a href=\"#k64\">[64]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"vakif-katilim\"></span>Vakıf Katılım"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "220"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Mart 2026 <span class=\"src\"><a href=\"#k10\">[10]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"emlak-katilim\"></span>Emlak Katılım"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "122"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Aralık 2025 <span class=\"src\"><a href=\"#k63\">[63]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"dunya-katilim\"></span>Dünya Katılım"
              },
              {
                "tag": "TD",
                "cls": "n",
                "html": "28"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Ağustos 2026, 15 şehir <span class=\"src\"><a href=\"#k47b\">[47b]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"hayat-finans\"></span>Hayat Finans, TOM, Adil"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Şubesiz model"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "<span class=\"src\"><a href=\"#k18\">[18]</a><a href=\"#k22\">[22]</a><a href=\"#k46\">[46]</a></span>"
              }
            ]
          ],
          "minWidth": null
        }
      ]
    },
    {
      "id": "yeni",
      "nav": "Yeni bankalar",
      "eyebrow": "Bölüm II · Yeni bankalar",
      "heading": "Dört yılda yedi yeni katılım bankası",
      "lede": "Yeni gelenlerin her biri arkasındaki grubun gücüyle sektöre giriyor. Bu dönemde en yüksek sermayeyle kuruluş izni alan banka Fuzul Katılım.",
      "blocks": [
        {
          "kind": "two",
          "style": "align-items:start",
          "cols": [
            {
              "kind": "timeline",
              "items": [
                {
                  "date": "Nisan 2022 · Mart 2023",
                  "slug": "hayat-finans",
                  "lg": false,
                  "title": "Hayat Finans",
                  "body": "Hayat Holding. Türkiye'nin ilk şubesiz dijital katılım bankası. <span class=\"src\"><a href=\"#k46\">[46]</a></span>",
                  "fz": false
                },
                {
                  "date": "Ağustos 2022 · Mart 2023",
                  "slug": "tom-katilim",
                  "lg": false,
                  "title": "TOM Katılım",
                  "body": "Aydın Holding (A101, English Home, Memorial). Dijital perakende bankası. <span class=\"src\"><a href=\"#k18\">[18]</a></span>",
                  "fz": false
                },
                {
                  "date": "2024",
                  "slug": "dunya-katilim",
                  "lg": false,
                  "title": "Dünya Katılım",
                  "body": "Ahlatcı Grubu. Adabank'ın katılım bankasına dönüşümü, altın odaklı. <span class=\"src\"><a href=\"#k19\">[19]</a><a href=\"#k33\">[33]</a></span>",
                  "fz": false
                },
                {
                  "date": "Mayıs 2024 · Eylül 2025",
                  "slug": "adil-katilim",
                  "lg": false,
                  "title": "Adil Katılım",
                  "body": "Beş bireysel kurucu. Tamamen dijital, BaaS sağlayıcı. <span class=\"src\"><a href=\"#k22\">[22]</a><a href=\"#k26\">[26]</a></span>",
                  "fz": false
                },
                {
                  "date": "Haziran 2025 · 2026 ilk çeyrek planı",
                  "slug": "halk-katilim",
                  "lg": false,
                  "title": "Halk Katılım",
                  "body": "Halkbank. Şubeli model, kamu birleşmesine dahil. <span class=\"src\"><a href=\"#k20\">[20]</a><a href=\"#k21\">[21]</a></span>",
                  "fz": false
                },
                {
                  "date": "Mart 2026 · kuruluş izni",
                  "slug": "fuzul-katilim",
                  "lg": true,
                  "title": "Fuzul Katılım",
                  "body": "Fuzul Holding, Fuzul Yapı ve Akbal ailesi. Şube ve dijitali birlikte kullanan hibrit model. <span class=\"src\"><a href=\"#k17\">[17]</a><a href=\"#k40\">[40]</a></span>",
                  "fz": true
                },
                {
                  "date": "Haziran 2026 · kuruluş izni",
                  "slug": "dost-katilim",
                  "lg": false,
                  "title": "Dost Katılım",
                  "body": "BİM ve dört ortak. İş modeli henüz açıklanmadı. <span class=\"src\"><a href=\"#k24\">[24]</a><a href=\"#k25\">[25]</a></span>",
                  "fz": false
                }
              ]
            },
            {
              "kind": "figure",
              "title": "Sermaye, milyar TL",
              "sub": "Kuruluş sermayesi; Dünya Katılım için Nisan 2025 ödenmiş sermayesi",
              "segButtons": null,
              "legendItems": null,
              "meter": null,
              "chart": "capital",
              "chartAria": "Sermaye karşılaştırması: Fuzul 13,2; Halk 11,5; Dost 10; Dünya 7,27; Adil 3; Hayat 1,5; TOM 1,5 milyar TL",
              "caption": "Kaynak: <a href=\"#k17\">[17]</a><a href=\"#k20\">[20]</a><a href=\"#k24\">[24]</a><a href=\"#k47\">[47]</a><a href=\"#k22\">[22]</a><a href=\"#k46\">[46]</a><a href=\"#k18\">[18]</a>. Fuzul Katılım'ın 13,2 milyar TL'lik sermayesi, Hayat Finans'ın bugünkü toplam özkaynağının (6 milyar TL <a href=\"#k27\">[27]</a>) iki katından fazla.",
              "detailsNested": null
            }
          ]
        },
        {
          "kind": "h3",
          "text": "Market zincirlerinin bankaları"
        },
        {
          "kind": "prose",
          "html": "<p><strong>TOM Bank</strong>, A101'in de sahibi olan Aydın Holding'in bankası. Ana kanalı HADİ uygulaması: A101 kasalarında ücretsiz para çekme ve yatırma, A101, English Home ve Eve mağazalarında 2 aya kadar veresiye, ömür boyu ücretsiz kart. <span class=\"src\"><a href=\"#k28\">[28]</a><a href=\"#k29\">[29]</a></span> Web sitesinde 3,5 milyon müşteri bilgisi yer alıyor. <span class=\"src\"><a href=\"#k29\">[29]</a></span> Buna rağmen banka 2026 ilk yarıda 895 milyon TL zarar etti. <span class=\"src\"><a href=\"#k1\">[1]</a></span></p>"
        },
        {
          "kind": "note",
          "html": "TOM Bank bankacılığı market kasasına taşıyarak güçlü bir dağıtım kanalı kurdu. Bunun müşterinin gözünde banka güvenine nasıl yansıyacağını zaman gösterecek. Toplanan fonun müşteri sayısına göre düşük kalması, açılan hesapların önemli kısmının aktif kullanılmadığına işaret ediyor olabilir. Bu şekilde kazanılan müşterinin maliyeti yüksek, getirisi düşük olur."
        },
        {
          "kind": "note",
          "html": "Bankacılıktaki en pahalı hatalardan biri, para kazandırmayacak müşteriyi içeri almak ve bunu yaparken güveni geri plana atmaktır. TOM Bank'ın arkasındaki güç, doğru adımlarla bu tabloyu iyileştirmeye elverişli."
        },
        {
          "kind": "prose",
          "html": "<p><strong>Dost Katılım</strong>, BİM'in ortak olduğu banka. 10 milyar TL sermayeyle 17 Haziran 2026'da kuruluş izni aldı. <span class=\"src\"><a href=\"#k24\">[24]</a><a href=\"#k25\">[25]</a></span> Sermayesi, TOM Bank'ın kuruluş sermayesinin yaklaşık 7 katı. İş modeli henüz açıklanmadı.</p>"
        },
        {
          "kind": "note",
          "html": "Dost Katılım'ın TOM Bank'tan farklı bir yol izlemesi olası. Bence BİM, bireysel müşterinin yanında kendi geniş tedarikçi ağı üzerinden ticari müşterilere de ciddi bir odak ayırabilir ve farklı bir dağıtım stratejisi kurabilir."
        },
        {
          "kind": "figure",
          "title": "Fiziki temas noktası sayısı",
          "sub": "Market mağazaları, banka şubeleri ve Fuzul'un tasarruf finansmanı şubeleri",
          "segButtons": null,
          "legendItems": null,
          "meter": null,
          "chart": "points",
          "chartAria": "Temas noktaları: A101 13.500 üzeri mağaza, BİM 12.751 mağaza, kamu birleşik 453 şube, Kuveyt Türk 452 şube, Fuzul 256 şube, Türkiye Finans 224 şube, Albaraka 223 şube, Emlak Katılım 122 şube, Dünya Katılım 28 şube",
          "caption": "Kaynak: <a href=\"#k30\">[30]</a><a href=\"#k10\">[10]</a><a href=\"#k8\">[8]</a><a href=\"#k56\">[56]</a><a href=\"#k49\">[49]</a><a href=\"#k64\">[64]</a><a href=\"#k63\">[63]</a><a href=\"#k47b\">[47b]</a>. Kamu birleşik yalnızca Ziraat ve Vakıf Katılım'ı kapsar (Mart 2026).",
          "detailsNested": null
        },
        {
          "kind": "pull",
          "html": "Herkesin bir fiziki temas noktası var. Önemli olan, müşterinin oraya neden geldiği."
        },
        {
          "kind": "prose",
          "html": "<p>TOM Bank günlük alışveriş, küçük tutarlı finansman ve nakit erişimi üzerinden geniş bir kitleye ulaşıyor. Dost Katılım'ın nasıl bir model izleyeceği ise henüz belli değil. Market ağı günlük ihtiyaçlarda güçlü bir avantaj. Ev gibi büyük, uzun vadeli ve güven isteyen kararlarda ise müşteri başka bir şey arıyor.</p>"
        },
        {
          "kind": "h3",
          "text": "Altın: Dünya Katılım nasıl ayrışıyor"
        },
        {
          "kind": "trio",
          "cards": [
            {
              "k": "Arkadaki varlık",
              "kStyle": null,
              "h4": "Rafineri ve kuyumculuk",
              "p": "Ahlatcı Holding, Anadolu'nun tek altın rafinerisini işletiyor. Grup, yurt içi bilezik pazarının yaklaşık yüzde 50'sini, alyans pazarının yüzde 30'unu ve spot altın pazarının yüzde 20'sini kontrol ettiğini açıklıyor. <span class=\"src\"><a href=\"#k31\">[31]</a></span>",
              "dl": null,
              "flow": null,
              "fz": false
            },
            {
              "k": "Bankaya taşınan",
              "kStyle": null,
              "h4": "Altını hesaba çevirmek",
              "p": "Altın vadesiz ve katılma hesabı, takı ve hurda altını hesaba çeviren ATOM sistemi, dijitalden sipariş verilip kapıya teslim edilen fiziki altın. <span class=\"src\"><a href=\"#k32\">[32]</a></span>",
              "dl": null,
              "flow": null,
              "fz": false
            },
            {
              "k": "Sonuç",
              "kStyle": null,
              "h4": "Sektörün üstünde kârlılık",
              "p": "2026 ilk çeyrekte yüzde 0,9 takipteki alacak oranı, Fitch'ten ilk notunda pozitif görünüm ve ulusal ölçekte yatırım yapılabilir seviye. <span class=\"src\"><a href=\"#k33\">[33]</a></span>",
              "dl": null,
              "flow": null,
              "fz": false
            }
          ]
        },
        {
          "kind": "note",
          "html": "Dünya Katılım bir ürünü kopyalamadı; grubun zaten sahip olduğu değer zincirini bankaya taşıdı. Rakiplerin kolayca kopyalayamayacağı şey uygulama değil, arkadaki varlık ve sistem."
        },
        {
          "kind": "pull",
          "html": "Dünya Katılım'ın arkasında altın rafinerisi var. Fuzul'un arkasında ise inşaat, arsa, tasarruf finansmanı ve 256 şubelik bir satış ağı var."
        },
        {
          "kind": "h3",
          "text": "Tamamen dijital bankalar"
        },
        {
          "kind": "prose",
          "html": "<p>Hayat Finans kendini \"doğuştan dijital\" olarak konumluyor. 2026 ilk yarıda aktifi yüzde 58, finansmanı yüzde 64, topladığı fon yüzde 50 büyüdü ve 4,5 milyar TL sukuk ihraç etti. <span class=\"src\"><a href=\"#k27\">[27]</a></span> Adil Katılım tamamen dijital çalışıyor ve API üzerinden BaaS hizmeti veriyor; hedefinde genç dijital kullanıcılar, KOBİ'ler, girişimler ve uzun vadede Avrupa'daki Türk diasporası var. <span class=\"src\"><a href=\"#k22\">[22]</a></span></p>"
        },
        {
          "kind": "prose",
          "html": "<p>Şubesiz bankalar müşteriyi büyük ölçüde yüksek kâr payıyla kazanıyor. Ucuz fon tabanı olmayan yeni bir banka, mevduatı pahalıya topluyor. Bu da uzun vadede kâr marjına baskı yapıyor.</p>"
        }
      ]
    },
    {
      "id": "koklu",
      "nav": "Köklü bankalar",
      "eyebrow": "Bölüm III · Köklü bankalar",
      "heading": "Köklü bankaların asıl avantajı güven",
      "lede": "Köklü bankaların her biri farklı bir güce yaslanıyor: ölçek, kamu ağı, verimlilik ya da konut kimliği. Ortak noktaları, yıllar içinde biriktirdikleri ucuz fon.",
      "blocks": [
        {
          "kind": "table",
          "isHeat": false,
          "head": [
            "Banka",
            "Bankanın açıkladığı odak",
            "Arkasındaki güç",
            "Öne çıkan veri"
          ],
          "bodyFillAttr": null,
          "rows": [
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"kuveyt-turk\"></span><strong>Kuveyt Türk</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Reel sektör, üretim ve ihracat <span class=\"src\"><a href=\"#k4\">[4]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kuwait Finance House %57,81, Vakıflar Genel Müdürlüğü %24,49 <span class=\"src\"><a href=\"#k50\">[50]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Mevduatın %61'i cari hesap, %40 ortalama özkaynak getirisi, 30 milyar TL konsolide kâr <span class=\"src\"><a href=\"#k4\">[4]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"vakif-katilim\"></span><strong>Vakıf Katılım</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Üretim, yatırım ve istihdam <span class=\"src\"><a href=\"#k35\">[35]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kamu"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "661,6 milyar TL nakdi ve gayrinakdi finansman <span class=\"src\"><a href=\"#k35\">[35]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"ziraat-katilim\"></span><strong>Ziraat Katılım</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Bireysel ağırlıklı şube ağı: 215 yurt içi şubenin 190'ı bireysel, 25'i ticari ve kurumsal <span class=\"src\"><a href=\"#k48\">[48]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kamu"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "2025'te en çok şube açan banka (17) <span class=\"src\"><a href=\"#k5\">[5]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"albaraka-turk\"></span><strong>Albaraka Türk</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "-"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Al Baraka Grubu"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kâr %59 düştü, personel gideri %48,7 arttı <span class=\"src\"><a href=\"#k3\">[3]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"emlak-katilim\"></span><strong>Emlak Katılım</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Konut ve gayrimenkul kimliği, sukuk aracılığı <span class=\"src\"><a href=\"#k59\">[59]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kamu"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "%48,7 özkaynak getirisi, halka arz için SPK başvurusu <span class=\"src\"><a href=\"#k12\">[12]</a><a href=\"#k59\">[59]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "bank",
                "html": "<span class=\"bl\" data-bank=\"turkiye-finans\"></span><strong>Türkiye Finans</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Verimlilik ve şube sadeleştirme <span class=\"src\"><a href=\"#k1\">[1]</a><a href=\"#k5\">[5]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Saudi National Bank"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Katılma hesapları %37 büyüdü, kâr %230 arttı <span class=\"src\"><a href=\"#k49\">[49]</a></span>"
              }
            ]
          ],
          "minWidth": null
        },
        {
          "kind": "small",
          "html": "Bankalar finansman portföylerinin bireysel, KOBİ ve kurumsal dağılımını kamuya düzenli olarak açıklamıyor. Bu yüzden tabloda yalnızca bankaların kendi açıkladığı odaklar yer alıyor."
        },
        {
          "kind": "h3",
          "text": "Kuveyt Türk'ün fon tabanı"
        },
        {
          "kind": "two",
          "style": "align-items:center",
          "cols": [
            {
              "kind": "prose",
              "html": "<p>Kuveyt Türk'ün mevduatının yüzde 61'i cari hesapta duruyor. <span class=\"src\"><a href=\"#k4\">[4]</a></span> Yani fonunun büyük kısmına kâr payı ödemiyor. Yeni bir bankanın buna yakın bir fon maliyetine ulaşması yıllar alır.</p>\n<p>Bu yüzden yeni bir banka için asıl soru şu: ucuz fonu nereden ve nasıl toplayacak?</p>"
            },
            {
              "kind": "figure",
              "title": "Kuveyt Türk mevduat yapısı",
              "sub": "Haziran 2026",
              "segButtons": null,
              "legendItems": null,
              "meter": null,
              "chart": "kt",
              "chartAria": "Kuveyt Türk mevduatının yüzde 61'i cari hesap, yüzde 39'u diğer",
              "caption": "Kaynak: <a href=\"#k4\">[4]</a>",
              "detailsNested": null
            }
          ]
        },
        {
          "kind": "note",
          "html": "Kuveyt Türk'ün müşteri tabanında katılım bankacılığına gerçekten inanan geniş bir kitle var. Bu kitle kâr payına daha mesafeli yaklaşıyor ve parasını cari hesapta tutmayı tercih ediyor. Bankanın yıllar içinde kurduğu güven, en büyük avantajı."
        },
        {
          "kind": "h3",
          "text": "Kamu birleşmesi sektörü nasıl değiştiriyor"
        },
        {
          "kind": "list",
          "items": [
            "5 Haziran 2026'da Ziraat, Vakıf ve Halk Katılım'ın birleşeceği açıklandı; hedef 2026'nın son çeyreği. <span class=\"src\"><a href=\"#k10\">[10]</a><a href=\"#k11\">[11]</a></span>",
            "Fitch'e göre yeni yapı katılım segmentinin yaklaşık yüzde 36'sını tutacak. <span class=\"src\"><a href=\"#k36\">[36]</a></span> Emlak Katılım da eklendiğinde kamunun payı yüzde 45'in üzerine çıkıyor (fspark9 hesaplaması).",
            "Birleşmelere eleştirel bakan görüşler de var: Türkiye'deki banka birleşmelerinin çoğunlukla beklenen sonucu vermediği ve sektörün makul büyüklükte çok sayıda kuruma ihtiyaç duyduğu. <span class=\"src\"><a href=\"#k10\">[10]</a></span>"
          ]
        },
        {
          "kind": "prose",
          "html": "<p>Birleşme, kamu bankalarında bir süre içe dönük bir dönem yaratacak: sistem entegrasyonu, şube çakışması, ekiplerin uyumu. Bu süreç, yeni bir özel banka için müşteri kazanma fırsatı sunuyor.</p>"
        }
      ]
    },
    {
      "id": "aynilasma",
      "nav": "Aynılaşma",
      "eyebrow": "Bölüm IV · Aynılaşma",
      "heading": "Ürünler birbirine benziyor",
      "lede": "Faizsiz olmak bu sektörde bir fark değil, giriş şartı. Ürünler, uygulamalar ve müşteri edinim akışları birbirine benzedikçe rekabet fiyata kayıyor.",
      "blocks": [
        {
          "kind": "table",
          "isHeat": false,
          "head": [
            "Alan",
            "Durum",
            "Neden tek başına fark yaratmıyor"
          ],
          "bodyFillAttr": null,
          "rows": [
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Ürün yelpazesi</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Katılma hesabı, altın hesabı, konut ve taşıt finansmanı, KOBİ finansmanı, kira sertifikası herkeste var"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Faizsizlik sektörün ortak özelliği"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Mobil uygulama</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "İşlemlerin %95'i dijital <span class=\"src\"><a href=\"#k6\">[6]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Akışlar birbirine benziyor, müşteri farkı hissetmiyor"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Uzaktan müşteri edinimi</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "2025'te 1,3 milyonun üzerinde <span class=\"src\"><a href=\"#k6\">[6]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Artık standart"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Kâr payı</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Aylık TL oranları %27,90 ile %37,74 arasında <span class=\"src\"><a href=\"#k34\">[34]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Yalnızca fiyat için gelen müşteri, daha iyi bir oran bulunca gidiyor"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Şube</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "1.506 şube <span class=\"src\"><a href=\"#k6\">[6]</a></span>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Şube sayısından çok, şubenin ne işe yaradığı önemli"
              }
            ]
          ],
          "minWidth": null
        },
        {
          "kind": "figure",
          "title": "Aylık TL kâr payı oranları, 12 Eylül 2026",
          "sub": "Politika faizi yüzde 37 iken sekiz katılım bankası",
          "segButtons": null,
          "legendItems": [
            {
              "color": "background:var(--s-ozel)",
              "label": "Köklü özel"
            },
            {
              "color": "background:var(--s-kamu)",
              "label": "Kamu"
            },
            {
              "color": "background:var(--s-yeni)",
              "label": "Yeni banka"
            }
          ],
          "meter": null,
          "chart": "rates",
          "chartAria": "Kâr payı oranları: Türkiye Finans 37,74; Hayat Finans 37,05; Kuveyt Türk 35,91; Dünya Katılım 33,14; Emlak Katılım 32,08; Vakıf Katılım 31,50; Albaraka 31,25; Ziraat Katılım 27,90",
          "caption": "Kaynak: <a href=\"#k34\">[34]</a>. Eksen yüzde 25'ten başlıyor; burada önemli olan bankalar arasındaki fark.",
          "detailsNested": null
        },
        {
          "kind": "note",
          "html": "Uygulamaların birbirine benzemesi dijitalin önemini azaltmıyor. Bankanın dijital konumlamasıyla tutarlı, belirli müşteri ihtiyaçlarına göre kurgulanmış akışlar tasarlamak her zamankinden kritik."
        },
        {
          "kind": "h3",
          "text": "Rekabetin zorlaştığı altı nokta"
        },
        {
          "kind": "table",
          "isHeat": false,
          "head": [
            "Baskı",
            "Ne oluyor"
          ],
          "bodyFillAttr": null,
          "rows": [
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Fon maliyeti</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Köklü bankaların güvene dayalı cari hesap tabanı var, yenilerin yok. Yeni bankalar yüksek kâr payıyla fon topluyor. <span class=\"src\"><a href=\"#k4\">[4]</a><a href=\"#k34\">[34]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Giderlerdeki artış</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Albaraka'da personel gideri %48,7 arttı. Şubeye dayalı model pahalı; doğru ve verimli kurgulanması gerekiyor. <span class=\"src\"><a href=\"#k3\">[3]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Ölçek</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Kamu birleşmesiyle tek bir yapı segmentin üçte birinden fazlasını tutacak. <span class=\"src\"><a href=\"#k36\">[36]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Market zincirleri</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "A101 ve BİM'in toplamda 26 bini aşan mağazası var. <span class=\"src\"><a href=\"#k30\">[30]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Kâra geçiş süresi</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Yeni dijital bankalarda ilk yıllar zararla ya da çok düşük kârla geçiyor. <span class=\"src\"><a href=\"#k1\">[1]</a></span>"
              }
            ],
            [
              {
                "tag": "TD",
                "cls": "",
                "html": "<strong>Fon kullandırma</strong>"
              },
              {
                "tag": "TD",
                "cls": "",
                "html": "Toplanan fonda pay %11, kullandırılan fonda %9. Fonu üretime dönük, sağlıklı finansmana çevirebilen öne geçer. <span class=\"src\"><a href=\"#k7\">[7]</a></span>"
              }
            ]
          ],
          "minWidth": null
        }
      ]
    },
    {
      "id": "konut",
      "nav": "Konut",
      "eyebrow": "Bölüm V · Konut",
      "heading": "Her 10 konuttan 8'i banka finansmanı olmadan satılıyor",
      "lede": "Türkiye'de konut hâlâ büyük ölçüde nakit, birikim ve aile desteğiyle alınıyor. Bu boşluğun bir kısmını bugün tasarruf finansmanı dolduruyor.",
      "blocks": [
        {
          "kind": "homes",
          "items": [
            {
              "title": "2025: kredili konut satışı",
              "on": 14,
              "big": "%14<small>1.688.910 satışın 236.668'i</small>",
              "small": "2024'te bu oran %10,8'di. <span class=\"src\"><a href=\"#k16\">[16]</a></span>"
            },
            {
              "title": "Haziran 2026: ipotekli satış",
              "on": 20,
              "big": "%20<small>129.979 satışın 25.993'ü</small>",
              "small": "İpotekli satışlar bir yılda %72 arttı. <span class=\"src\"><a href=\"#k37\">[37]</a></span>"
            }
          ],
          "legend": [
            "Kredili satış",
            "Banka finansmanı olmadan"
          ]
        },
        {
          "kind": "h3",
          "text": "Tasarruf finansmanı: bankaların dışında büyüyen pazar"
        },
        {
          "kind": "two",
          "style": "align-items:start",
          "cols": [
            {
              "kind": "figure",
              "title": "Tasarruf finansmanı müşteri sayısı, bin kişi",
              "sub": "2020'den 2026 ortasına",
              "segButtons": null,
              "legendItems": null,
              "meter": null,
              "chart": "tfs",
              "chartAria": "Tasarruf finansmanı müşteri sayısı: 2020 sonu 140 bin, 2024 sonu 550 bine yakın, Mart 2026 1,337 milyon, Haziran 2026 1,549 milyon",
              "caption": "Kaynak: 2020 ve 2024 <a href=\"#k15\">[15]</a>, Mart 2026 <a href=\"#k54\">[54]</a>, Haziran 2026 <a href=\"#k53\">[53]</a>. 2024 değeri \"550 bine yakın\" olarak açıklandı.",
              "detailsNested": null
            },
            {
              "kind": "group",
              "blocks": [
                {
                  "kind": "table",
                  "isHeat": false,
                  "head": [
                    "Haziran 2026",
                    "Değer"
                  ],
                  "bodyFillAttr": null,
                  "rows": [
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "Müşteri"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "1,549 milyon"
                      }
                    ],
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "Aktif büyüklük"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "501 milyar TL <span style=\"color:var(--muted)\">(+%188)</span>"
                      }
                    ],
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "Alacaklar"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "257 milyar TL"
                      }
                    ],
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "Şube"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "891"
                      }
                    ],
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "Çalışan"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "12.801"
                      }
                    ],
                    [
                      {
                        "tag": "TD",
                        "cls": "",
                        "html": "İlk yarı işlem hacmi"
                      },
                      {
                        "tag": "TD",
                        "cls": "n",
                        "html": "832 milyar TL <span style=\"color:var(--muted)\">(+%107)</span>"
                      }
                    ]
                  ],
                  "minWidth": "min-width:0"
                },
                {
                  "kind": "small",
                  "html": "Kaynak: <a href=\"#k53\">[53]</a>"
                }
              ]
            }
          ]
        },
        {
          "kind": "prose",
          "html": "<p>BDDK 7 Ağustos 2026'da yeni bir düzenleme yayımladı. 1 Ekim 2026'dan itibaren konut sözleşme sınırı 6,27 milyon TL'den 12,5 milyon TL'ye çıkıyor. Biriken fonlar katılım bankası hesaplarında, Hazine kira sertifikalarında veya belirli fonlarda değerlendirilecek. <span class=\"src\"><a href=\"#k38\">[38]</a></span></p>\n<p>Bu düzenleme iki şey söylüyor. Birincisi, regülatör sektörü büyüyen ve daha üst gelir grubuna açılan bir alan olarak görüyor. İkincisi, tasarruf finansmanında biriken para doğal olarak katılım bankalarına yöneliyor. <strong>Bu paranın bugün hangi bankalarda durduğu, Fuzul Katılım'ın en hızlı fon kaynağıyla ilgili en önemli soru.</strong> İlişkili taraf ve risk grubu sınırlarının ayrıca hukuki olarak değerlendirilmesi gerekiyor.</p>"
        },
        {
          "kind": "note",
          "html": "Burası ciddi bir fırsat. Bu fonlar için en güçlü rakip kamu bankaları olabilir."
        },
        {
          "kind": "h3",
          "text": "Konut kimliği için kimler yarışıyor"
        },
        {
          "kind": "list",
          "items": [
            "<strong>Emlak Katılım.</strong> Kamu bankası, konut ve gayrimenkul kimliği güçlü, halka arz sürecinde. <span class=\"src\"><a href=\"#k12\">[12]</a></span> Bünyesindeki Emlak Katılım Tasarruf Finansman, 30 Temmuz 2025'te faaliyet izni aldı. <span class=\"src\"><a href=\"#k60\">[60]</a></span> Bankayı ve tasarruf finansmanını aynı çatı altında birleştirme fikri kamu tarafında da denenmeye başladı.",
            "<strong>Kuveyt Türk, Vakıf Katılım, Türkiye Finans, Albaraka Türk.</strong> Konut finansmanı ürün yelpazelerinde var, ama kimliklerinin merkezinde değil.",
            "<strong>Tasarruf finansmanı şirketleri.</strong> Eminevim, Birevim, Katılımevim, Albayrak, Sinpaş ve diğerleri. Bu şirketler banka değil. <span class=\"src\"><a href=\"#k39\">[39]</a><a href=\"#k61\">[61]</a></span>"
          ]
        },
        {
          "kind": "note",
          "html": "Sektörde son dönemde bazı şirketlerde yaşanan devir ve yönetim değişiklikleri ilk bakışta bir fırsat gibi görünebilir. Ancak tasarruf finansmanı sistemine duyulan güvene zarar verme ihtimali taşıdığı için dikkatli olmak gerekiyor. Bu dönemde güveni artıran adımlar her zamankinden değerli."
        },
        {
          "kind": "pull",
          "html": "Ev sahibi olma yolculuğunun tamamını tek çatı altında toplayan bir banka henüz yok."
        },
        {
          "kind": "h3",
          "text": "Bu model dünyada nasıl işliyor"
        },
        {
          "kind": "prose",
          "html": "<p>Birikime dayalı ev edinme modeli ile bankalar, dünyada birbirinin rakibi olarak görülmüyor. Aynı müşterinin iki farklı ihtiyacı olarak birlikte ele alınıyor.</p>"
        },
        {
          "kind": "trio",
          "cards": [
            {
              "k": "Almanya",
              "kStyle": null,
              "h4": "Bausparkasse",
              "p": null,
              "dl": [
                {
                  "dt": "Model",
                  "dd": "Önce birikim, sonra konut finansmanı hakkı"
                },
                {
                  "dt": "Ölçek",
                  "dd": "Pazar lideri Schwäbisch Hall'un yaklaşık 6 milyon müşterisi var; 1948'den bu yana yaklaşık 9 milyon konut alımı ve yenilemesinde finansman ortağı oldu <span class=\"src\"><a href=\"#k42\">[42]</a></span>"
                },
                {
                  "dt": "Bankayla ilişki",
                  "dd": "Kooperatif bankacılık grubunun parçası; ürünleri Volksbank ve Raiffeisenbank şubeleri satıyor"
                }
              ],
              "flow": [
                {
                  "tag": "SPAN",
                  "text": "Banka şubesi"
                },
                {
                  "tag": "B",
                  "text": "→"
                },
                {
                  "tag": "SPAN",
                  "text": "Birikim ürünü"
                }
              ],
              "fz": false
            },
            {
              "k": "Brezilya",
              "kStyle": null,
              "h4": "Consórcio",
              "p": null,
              "dl": [
                {
                  "dt": "Model",
                  "dd": "Grup halinde birikim, kura ya da teklifle finansman hakkı"
                },
                {
                  "dt": "Ölçek",
                  "dd": "2025'te 12 milyonun üzerinde aktif katılımcı, 5,16 milyon yeni katılım ve 500 milyar Real kredi hacmi <span class=\"src\"><a href=\"#k58\">[58]</a></span>. 2025'in ilk on bir ayında SBPE ve consórcio kaynaklarıyla finanse edilen konutların %24'ü <span class=\"src\"><a href=\"#k43\">[43]</a></span>"
                },
                {
                  "dt": "Bankayla ilişki",
                  "dd": "Caixa, Itaú, Banco do Brasil, Bradesco ve Santander bu işi kendi bünyesinde yürütüyor <span class=\"src\"><a href=\"#k44\">[44]</a></span>"
                }
              ],
              "flow": [
                {
                  "tag": "SPAN",
                  "text": "Banka"
                },
                {
                  "tag": "B",
                  "text": "→"
                },
                {
                  "tag": "SPAN",
                  "text": "Consórcio"
                }
              ],
              "fz": false
            },
            {
              "k": "Türkiye · Fuzul için fırsat",
              "kStyle": "color:var(--bronze-ink)",
              "h4": "Tasarruf finansmanı",
              "p": null,
              "dl": [
                {
                  "dt": "Model",
                  "dd": "Faizsiz birikim, sırası gelince konut veya araç finansmanı"
                },
                {
                  "dt": "Ölçek",
                  "dd": "1,549 milyon müşteri, 501 milyar TL aktif <span class=\"src\"><a href=\"#k53\">[53]</a></span>"
                },
                {
                  "dt": "Bankayla ilişki",
                  "dd": "Şirketler çoğunlukla bankalardan bağımsız; Emlak Katılım'ın iştiraki ilk örnek <span class=\"src\"><a href=\"#k60\">[60]</a></span>"
                }
              ],
              "flow": [
                {
                  "tag": "SPAN",
                  "text": "Tasarruf ağı"
                },
                {
                  "tag": "B",
                  "text": "→"
                },
                {
                  "tag": "SPAN",
                  "text": "Banka"
                }
              ],
              "fz": true
            }
          ]
        },
        {
          "kind": "prose",
          "html": "<p>Almanya ve Brezilya'da banka, birikim ürününü kendi şubelerinden satıyor. <strong>Fuzul'da yön tersine dönebilir:</strong> Türkiye'nin en büyük tasarruf finansmanı ağlarından biri, bankaya doğrudan müşteri getirebilir. Türkiye'de bu köprüyü baştan ve bu ölçekte kuran bir banka henüz yok.</p>"
        }
      ]
    },
    {
      "id": "fuzul",
      "nav": "Fuzul",
      "eyebrow": "Bölüm VI · Fuzul'un güçlü yanları",
      "heading": "Fuzul'un farkı arkasındaki sistem",
      "lede": "34 yılı aşkın geçmiş, 12 şirket, 10 faaliyet alanı ve 4.500'den fazla çalışan. <span class=\"src\"><a href=\"#k13\">[13]</a></span> Fuzul Katılım, evin etrafındaki adımların çoğuna zaten dokunan bir grubun içinden doğuyor.",
      "blocks": [
        {
          "kind": "journey",
          "title": "Ev sahibi olma yolculuğu ve grubun dokunduğu adımlar",
          "steps": [
            {
              "h5": "Birikim",
              "p": "Fuzul Tasarruf Finansman"
            },
            {
              "h5": "Arsa ve yapı",
              "p": "Fuzul Topraktan, Fuzul İnşaat"
            },
            {
              "h5": "Teslimat ve tapu",
              "p": "Finansman ve tapu süreci"
            },
            {
              "h5": "Güvence",
              "p": "Fuzul Akva Sigorta"
            },
            {
              "h5": "Düzenli ödeme",
              "p": "Rubikpara"
            },
            {
              "h5": "Yenileme ve enerji",
              "p": "Fuzul Yenilenebilir Enerji"
            },
            {
              "h5": "Yatırım",
              "p": "Fuzul GYO"
            }
          ],
          "bankName": "Fuzul Katılım",
          "bankSlug": "fuzul-katilim",
          "bankText": "Bütün adımların hesabı, fonu ve ödemesi aynı bankada buluşabilir."
        },
        {
          "kind": "small",
          "html": "Şirketler: <a href=\"#k13\">[13]</a>. Grup, beş yılda 1,3 milyar Euro yatırımla 10 bin konut hedefliyor <a href=\"#k14\">[14]</a>. Banka için açıklanan model: dijital öncelikli, yurt çapında şube ağıyla hibrit; gayrimenkul, sigorta, fintek ve ödeme sistemleriyle entegre <a href=\"#k40\">[40]</a>."
        },
        {
          "kind": "h3",
          "text": "Tasarruf finansmanı tarafı"
        },
        {
          "kind": "two",
          "style": "align-items:start",
          "cols": [
            {
              "kind": "figure",
              "title": "Fuzul Tasarruf şube sayısı",
              "sub": "Yedi ayda 83 yeni şube",
              "segButtons": null,
              "legendItems": null,
              "meter": null,
              "chart": "fzbranch",
              "chartAria": "Fuzul şube sayısı: 2024 başında 100, 2024 sonunda 125, 2025 sonunda 173, Temmuz 2026'da 256",
              "caption": "Kaynak: <a href=\"#k15b\">[15b]</a><a href=\"#k56\">[56]</a>. 2024 değerleri \"100'den 125'e\" olarak açıklandı. Haziran 2026'da sektördeki toplam şube sayısı 891 <a href=\"#k53\">[53]</a>; Fuzul'un payı yaklaşık %29 (fspark9 hesaplaması, farklı aylar).",
              "detailsNested": null
            },
            {
              "kind": "table",
              "isHeat": false,
              "head": null,
              "bodyFillAttr": null,
              "rows": [
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Pazar payı"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2023'te %25, 2024'te %30'un üzerinde <span class=\"src\"><a href=\"#k15b\">[15b]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Müşteri"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2024 sonunda 200 bine yakın <span class=\"src\"><a href=\"#k15b\">[15b]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Yeni müşteri"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2025 ilk yarıda 88.736, yıllık %169 artış <span class=\"src\"><a href=\"#k15\">[15]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Teslimat"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2024'te 30 bin konut ve araç; 2026 ilk yarıda 2025'in tamamının yaklaşık %98'i <span class=\"src\"><a href=\"#k15b\">[15b]</a><a href=\"#k56\">[56]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Konut teslimatı payı"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2026 ilk yarıda %18, yaklaşık 7 puan artış <span class=\"src\"><a href=\"#k57\">[57]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Sözleşme büyüklüğü"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Ocak 2023'te 1,19 milyar TL, Mayıs 2025'te 26,03 milyar TL; sektörün yaklaşık %29'u <span class=\"src\"><a href=\"#k15\">[15]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Dijital satış"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2024'te 15 binin üzerinde, 2025 ilk yarıda yaklaşık 30 bin <span class=\"src\"><a href=\"#k15\">[15]</a></span>"
                  }
                ],
                [
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "Çalışan"
                  },
                  {
                    "tag": "TD",
                    "cls": "",
                    "html": "2.347 (2025 sonu) <span class=\"src\"><a href=\"#k56\">[56]</a></span>"
                  }
                ]
              ],
              "minWidth": "min-width:0"
            }
          ]
        },
        {
          "kind": "h3",
          "text": "Bankalar nerede duruyor"
        },
        {
          "kind": "prose",
          "html": "<p>Yeni ve köklü bankaları iki soruyla yan yana koyduğumuzda sağ üst köşe dikkat çekiyor: uzun yıllar süren, büyük tutarlı bir müşteri ilişkisini hem fiziki hem dijital kanalla kuran bir banka alanı hâlâ büyük ölçüde boş.</p>"
        },
        {
          "kind": "figure",
          "title": "Konumlanma haritası",
          "sub": "fspark9 değerlendirmesi. Konumlar niteldir, ölçülmüş değer değildir.",
          "segButtons": null,
          "legendItems": [
            {
              "color": "background:var(--s-ozel)",
              "label": "Köklü özel"
            },
            {
              "color": "background:var(--s-kamu)",
              "label": "Kamu"
            },
            {
              "color": "background:var(--s-yeni)",
              "label": "Yeni banka"
            }
          ],
          "meter": null,
          "chart": "map",
          "chartAria": "Konumlanma haritası. Yatay eksen günlük küçük işlemlerden hayat boyu büyük kararlara, dikey eksen tamamen dijitalden geniş fiziki ağa. Fuzul sağ üstte, Emlak Katılım yakınında. TOM ve Dost sol üstte, Hayat ve Adil altta.",
          "caption": "Dost Katılım'ın modeli açıklanmadığı için kesik çizgiyle gösterildi.",
          "detailsNested": null
        },
        {
          "kind": "table",
          "isHeat": true,
          "head": [
            "Güç alanı",
            "<span class=\"bl\" data-bank=\"fuzul-katilim\"></span>Fuzul",
            "<span class=\"bl\" data-bank=\"tom-katilim\"></span>TOM",
            "<span class=\"bl\" data-bank=\"dost-katilim\"></span>Dost",
            "<span class=\"bl\" data-bank=\"dunya-katilim\"></span>Dünya",
            "<span class=\"bl\" data-bank=\"hayat-finans\"></span>Hayat",
            "<span class=\"bl\" data-bank=\"emlak-katilim\"></span>Emlak",
            "Kamu birleşik"
          ],
          "bodyFillAttr": "heat-rows",
          "rows": null,
          "minWidth": null
        },
        {
          "kind": "small",
          "html": "Nitel satırlar (çok güçlü, güçlü, orta, zayıf) fspark9 değerlendirmesidir. Kamu birleşik şube sayısı yalnızca Ziraat ve Vakıf Katılım'ı kapsar (Mart 2026)."
        }
      ]
    },
    {
      "id": "hamleler",
      "nav": "Hamleler",
      "eyebrow": "Bölüm VII · Hamleler",
      "heading": "Fuzul Katılım için dokuz hamle",
      "lede": "Önerileri üç başlıkta topladık: sağlam ve ucuz bir fon tabanı kurmak, evin etrafındaki yolculuğu tek akışta birleştirmek ve grubun gücünü yeni müşterilere açmak.",
      "blocks": [
        {
          "kind": "moveBlock",
          "letter": "A",
          "title": "Fon tabanı",
          "intro": "Yeni bir bankanın en zor sorusu: ucuz ve sadık fonu nereden bulacak?",
          "moves": [
            {
              "no": "1",
              "title": "Tasarruf müşterisini bankanın ilk müşterisi yapmak",
              "body": "Aylık taksit, bankadaki katılma hesabından otomatik ödensin; müşteri teslimatı beklerken birikimi bankada büyüsün. Böylece ilk günden düzenli bir fon tabanı oluşur. KVKK ve açık rıza gereklilikleri nedeniyle geçiş akışının ve deneyimin tasarımı kritik.",
              "note": "Kâr payı gelirlerinin eksiye düşmemesi, yani oranların doğru ayarlanması önemli. Oran rekabetine girilmemeli."
            },
            {
              "no": "2",
              "title": "Bekleme süresini bir ilişkiye çevirmek",
              "body": "Teslimatı bekleyen müşteriye banka tarafında katılma hesabı getirisi, kira desteği ve küçük tutarlı eşya finansmanı sunmak.",
              "note": null
            },
            {
              "no": "3",
              "title": "İlk yıldan zarar etmeyen bir yapı",
              "body": "İlk yıl hedefi zararsız bir operasyon olmalı. Yeni dijital bankaların ilk yıl sonuçları bunun kolay olmadığını gösteriyor. <span class=\"src\"><a href=\"#k1\">[1]</a><a href=\"#k27\">[27]</a></span> Fon maliyetini tasarruf tabanıyla düşürmek bu yüzden en önemli kaldıraç olabilir.",
              "note": null
            }
          ]
        },
        {
          "kind": "moveBlock",
          "letter": "B",
          "title": "Evin yolculuğu",
          "intro": "Müşteriyi tek bir üründe değil, evle ilgili bütün kararlarında karşılamak.",
          "moves": [
            {
              "no": "4",
              "title": "Teslimattan sonra da müşterinin yanında olmak",
              "body": "Tapu, DASK ve konut sigortası (Akva), taşınma, beyaz eşya, tadilat ve çatıya güneş paneli (Fuzul Yenilenebilir Enerji) finansmanını tek akışta, entegre bir deneyimle sunmak.",
              "note": null
            },
            {
              "no": "5",
              "title": "Kira ödeyen müşteriyi erkenden kazanmak",
              "body": "Bankalarda düzenli kira ödeme talimatı <span class=\"src\"><a href=\"#k52\">[52]</a></span> ve Ziraat Bankası'nın kiracı ile ev sahibine ücret avantajı sağlayan Ayrıcalıklı Kira Hizmet Paketi <span class=\"src\"><a href=\"#k51\">[51]</a></span> gibi iyi örnekler var. İncelediğimiz kaynaklarda kira ödeme geçmişini finansman değerlendirmesine bağlayan bir ürüne rastlamadık. Bu bağı kuran bir ürün, pazarda öne çıkabilir.",
              "note": "Kira ödeyen müşteriler bankaya kazandırılabilirse, ana konumlamayla tutarlı bir ürün ve kaliteli bir müşteri tabanı erkenden oluşur."
            },
            {
              "no": "6",
              "title": "Rubikpara ile ödeme katmanı",
              "body": "Aidat, fatura, kira ve taksit. Evle ilgili bütün düzenli ödemelerin tek bir yerden yapılması.",
              "note": null
            }
          ]
        },
        {
          "kind": "moveBlock",
          "letter": "C",
          "title": "Grubun gücünü yeni müşterilere açmak",
          "intro": "Grubun sahip olduğu bilgi ve varlıkları bankanın büyüme kanalına çevirmek.",
          "moves": [
            {
              "no": "7",
              "title": "GYO ve kira sertifikasıyla yatırımcı müşteri",
              "body": "\"Evin olmasa da konuttan pay alabilirsin\" diyen bir ürün.",
              "note": "Bu ürün hem ev etrafında tutarlı bir iletişimi sürdürmeyi hem de fon tabanını çeşitlendirip genişletmeyi sağlar."
            },
            {
              "no": "8",
              "title": "Proje finansmanını grup dışına açmak",
              "body": "Grubun inşaat alanındaki bilgisini diğer müteahhitlere, özellikle Anadolu'daki orta ölçekli yapı firmalarına finansman olarak sunmak. Risk grubu limitleri gözetilmeli.",
              "note": "Bu alan yeni bir müşteri kaynağına dönüşebilir ve katılım bankacılığının üretimi finanse etme ilkesiyle de örtüşür."
            },
            {
              "no": "9",
              "title": "256 şubeyi ev danışmanlık merkezine dönüştürmek",
              "body": "Klasik banka şubesinin maliyetiyle değil, satış ve danışmanlık noktası mantığıyla kurgulamak.",
              "note": "Sigorta, mobilya ve beyaz eşya alanlarında grup içi ve grup dışı firmalarla iş birliği kurup tamamlayıcı ürünler eklemek, hem geliri hem müşteri tabanını büyütür."
            }
          ]
        }
      ]
    }
  ],
  "closing": {
    "eyebrow": "Son söz",
    "quote": "Dünya Katılım'ın arkasında bir rafineri, TOM Bank'ın arkasında market rafları var. Fuzul'un arkasında ise insanların hayatındaki en büyük kararlardan biri var: <em>ev.</em>",
    "lede": "Katılım bankacılığında ürün artık tek başına fark yaratmıyor. Doğru kurulursa Fuzul Katılım, ev sahibi olmak isteyen herkesin ilk durağı olabilir. Ev almayı planlamayanlara, bugün zaten bir evi olanlara da sigorta, tadilat, enerji, mobilya ve düzenli ödemeler gibi tamamlayıcı ürünlerle ciddi bir katma değer sunabilir.",
    "signP": "Bu rapor Mehmet Burak Dikmen tarafından fspark9 adına, kamuya açık kaynaklar kullanılarak hazırlandı. fspark9, Almanya, İngiltere ve Türkiye'de dijital bankacılık ve fintek alanında bağımsız danışmanlık yapıyor.",
    "contact": "Mehmet Burak Dikmen<br>fspark9.com",
    "method": "Yöntem: Köşeli parantezli numaralar kaynak listesine gider. \"fspark9 hesaplaması\" notu taşıyan rakamlar kaynak verilerden türetildi. Kaynak numarası taşımayan değerlendirmeler fspark9'a aittir ve pazara dışarıdan bakan bir gözün yorumudur. Veri bulunamayan alanlar \"-\" ile gösterildi."
  },
  "workingTogether": {
    "pageTitle": "fspark9 · Çalışma önerisi",
    "eyebrow": "fspark9 · Öneri",
    "heroTitle": "fspark9, Fuzul Katılım Bankası için nasıl değer üretebilir?",
    "metaLine": "Mehmet Burak Dikmen · fspark9 · Eylül 2026",
    "summaryHeading": "Özet",
    "summaryBody": "Grubun şirketleri arasındaki sinerji ve Holding'in tasarruf finansmanından gelen derin tecrübesi, doğru kurgulandığında bankaya gerçek bir deneyim ve edge fırsatı sunuyor. Ama bankacılık regüle bir alan, güven en önemli konu, bu potansiyeli karmaşaya değil ürüne çevirmek kritik. Çok ürünlü karmaşık bankacılık uygulamalarının karşısında niş ve odaklı bir dijital deneyim inşa etmek de ayrı bir avantaj doğuracaktır.",
    "supportHeading": "Hangi alanlarda destek olabilirim?",
    "items": [
      {
        "num": "01",
        "label": "Ürün ve deneyim",
        "lead": "Uçtan uca dijital kanal tasarımı ve teslimini üstlenirim.",
        "detail": "Uzun süredir birlikte çalıştığım kıdemli bir UX/UI tasarımcısıyla beraber, sürece ürün yöneticisi olarak dahil olurum, iç ekiplerle strateji, risk ve ürünü göz önüne alarak deneyimi tasarlarız. Ajans süreci zaten başladıysa, süreç ve çıktı denetimiyle regülasyon ile ürün arasında köprü görevi de görebilirim."
      },
      {
        "num": "02",
        "label": "Müşteri taşıma deneyimi",
        "lead": "Fuzul Ev müşterilerinin bankaya geçiş akışını iç ekiple birlikte tasarlarım.",
        "detail": "Bu bir veri aktarımı değil, rıza ve ikna gerektiren bir akış tasarımı işi. İyi tasarlanmazsa bankanın en büyük kozlarından biri beklenenin çok altında değer yaratabilir."
      },
      {
        "num": "03",
        "label": "Sinerji değerlendirmesi",
        "lead": "Grup şirketleri için kurulan ekibin çalışmasına dışarıdan bir göz katarım.",
        "detail": "Şimdiye kadar konuşulanlara (varsa) geri bildirim verir, inovasyon perspektifinden eklemelerle kısa bir rapor sunarım."
      },
      {
        "num": "04",
        "label": "Konumlandırma ve lansman",
        "lead": "Bankayı ayrıştıracak konumlandırma ve lansman stratejisine katkı sağlarım.",
        "detail": "Strateji varsa rekabet, diğer pazarlar ve kendi tecrübem üzerinden değerlendirmemi sunarım, yoksa ekiple birlikte oluştururum."
      },
      {
        "num": "05",
        "label": "Partner seçimi",
        "lead": "Kart, KYC ve benzeri sistemlerin seçiminde yüzde yüz bağımsız bir dış göz olurum.",
        "detail": "Hiçbir sağlayıcıyla ticari bağım yok. Uyum ve kaliteyi, ölçeklendikçe çıkabilecek sorunları, esneklik durumlarını değerlendirebilirim."
      }
    ],
    "closingLabel": "Üzerine konuşmak için",
    "ctaLabel": "30 dakikalık görüşme ayarlayın",
    "ctaUrl": "https://cal.com/mburakdikmen/quick-chat",
    "ctaUrlDisplay": "cal.com/mburakdikmen/quick-chat",
    "bioName": "Mehmet Burak Dikmen",
    "bioTitle": "Kurucu, fspark9",
    "bioBody": "Albaraka Türk Strateji ekibinde grubun fintech ve girişimcilik alanındaki öncü projelerinde yer aldım. Ardından Berlin'de insha'yı sıfırdan kurup ölçekleyen projeleri hayata geçirdim ve önce ürün ve partner tarafının yöneticisi, daha sonra ise Almanya ülke müdürü olarak görev yaptım. Sonrasında İşbank grubuna geçerek şirketin dijital bankacılık markası RUUT'u Almanya ve diğer Avrupa ülkelerinde lanse ettim ve ardından RUUT'un ürün, partner, regülasyon ve uyum süreçlerine İngiltere için de uçtan uca liderlik ederek markanın İngiltere'ye açılmasını sağladım. Bugün fspark9 markasıyla Almanya, İngiltere ve Türkiye'de daha fazla şirketin değer üretmesine katkıda bulunmak için bağımsız çalışıyorum.",
    "nextStepBadge": "SIRADAKİ ADIM",
    "nextStepText": "30 dakikalık bir görüşmede nerede durduğunuzu ve zamanlamayı konuşuruz."
  },
  "charts": {
    "growth": [
      "2024 sonu",
      "2025 sonu",
      "Mart 2026",
      "Haziran 2026"
    ],
    "shareSteps": [
      "2024 sonu",
      "2025 sonu",
      "Mart 2026",
      "Hedef"
    ],
    "grp": {
      "ozel": "Köklü özel banka",
      "kamu": "Kamu bankası",
      "yeni": "Yeni banka"
    },
    "shareOther": "Adil ve Halk",
    "merged": "Kamu birleşik",
    "mergedTipTitle": "Kamu birleşik",
    "mergedTipLine1": "Ziraat ve Vakıf Katılım:",
    "mergedTipLine2": "Halk Katılım'ın payı eklenmedi. Fitch: yaklaşık %36",
    "shareTipSuffix": "katılım sektörü aktif payı",
    "trn": "trilyon TL",
    "bn": "milyar TL",
    "axAssets": "Aktif, milyar TL",
    "axRoa": "Kâr / aktif, 6 ay",
    "tipAssets": "Aktif",
    "tipRoa": "Kâr / aktif",
    "tipGrowth": "Büyüme",
    "emlakNote": "Kâr bankanın açıklaması; oran 464 milyar TL aktif üzerinden",
    "loss": "zarar",
    "capital": [
      {
        "name": "Fuzul Katılım",
        "caption": "Kuruluş sermayesi, Mart 2026",
        "slug": "fuzul-katilim"
      },
      {
        "name": "Halk Katılım",
        "caption": "Kuruluş sermayesi, Haziran 2025",
        "slug": "halk-katilim"
      },
      {
        "name": "Dost Katılım",
        "caption": "Kuruluş sermayesi, Haziran 2026",
        "slug": "dost-katilim"
      },
      {
        "name": "Dünya Katılım",
        "caption": "Ödenmiş sermaye, Nisan 2025",
        "slug": "dunya-katilim"
      },
      {
        "name": "Adil Katılım",
        "caption": "Kuruluş sermayesi, 2024",
        "slug": "adil-katilim"
      },
      {
        "name": "Hayat Finans",
        "caption": "Kuruluş sermayesi, 2022",
        "slug": "hayat-finans"
      },
      {
        "name": "TOM Katılım",
        "caption": "Kuruluş sermayesi, 2022",
        "slug": "tom-katilim"
      }
    ],
    "points": [
      {
        "name": "A101",
        "value": "13.500+",
        "caption": "Mağaza, 2026. TOM Bank'ın nakit kanalı",
        "slug": null
      },
      {
        "name": "BİM",
        "value": "12.751",
        "caption": "Mağaza, 2025 sonu. Dost Katılım'ın ortağı",
        "slug": null
      },
      {
        "name": "Kamu birleşik",
        "value": "453",
        "caption": "Ziraat 233 ve Vakıf 220 şube, Mart 2026",
        "slug": null
      },
      {
        "name": "Kuveyt Türk",
        "value": "452",
        "caption": "Şube, Haziran 2026",
        "slug": "kuveyt-turk"
      },
      {
        "name": "Fuzul",
        "value": "256",
        "caption": "Tasarruf finansmanı şubesi, Temmuz 2026",
        "slug": "fuzul-katilim"
      },
      {
        "name": "Türkiye Finans",
        "value": "224",
        "caption": "Şube, Haziran 2026",
        "slug": "turkiye-finans"
      },
      {
        "name": "Albaraka Türk",
        "value": "223",
        "caption": "Yurt içi şube, Aralık 2025",
        "slug": "albaraka-turk"
      },
      {
        "name": "Emlak Katılım",
        "value": "122",
        "caption": "Şube, Aralık 2025",
        "slug": "emlak-katilim"
      },
      {
        "name": "Dünya Katılım",
        "value": "28",
        "caption": "Şube, Ağustos 2026",
        "slug": "dunya-katilim"
      }
    ],
    "policy": "Politika faizi %37",
    "rateTip": "aylık TL kâr payı",
    "ktCur": "%61 cari hesap",
    "ktOther": "%39 diğer",
    "ktCurTip": "<b>Cari hesap</b><span class=\"m\">%61</span> · kâr payı ödenmeyen fon",
    "ktOtherTip": "<b>Diğer fonlar</b><span class=\"m\">%39</span>",
    "tfs": [
      "2020 sonu",
      "2024 sonu",
      "Mart 2026",
      "Haziran 2026"
    ],
    "tfsUnit": "bin müşteri",
    "fzb": [
      "2024 başı",
      "2024 sonu",
      "2025 sonu",
      "Temmuz 2026"
    ],
    "branches": "şube",
    "map": {
      "zone": "Evin bankası alanı",
      "xl": "Günlük, küçük işlem",
      "xr": "Hayat boyu, büyük karar",
      "x": "Müşteri ilişkisinin süresi ve büyüklüğü",
      "yb": "Tamamen dijital",
      "yt": "Geniş fiziki ağ",
      "pts": {
        "TOM": "A101 kasası üzerinden fiziki erişim, günlük alışveriş ve küçük tutarlı finansman",
        "Dost": "BİM ortaklığı; model henüz açıklanmadı",
        "Adil": "Tamamen dijital, BaaS, genç kullanıcı ve KOBİ",
        "Hayat Finans": "Doğuştan dijital, bireysel ve KOBİ",
        "Dünya Katılım": "Altın ve birikim odağı, dijital ağırlıklı, 28 şube",
        "Kuveyt Türk": "Genel bankacılık, 452 şube, güçlü cari hesap tabanı",
        "Kamu birleşik": "Genel bankacılık, 450'yi aşan şube",
        "Emlak Katılım": "Konut ve gayrimenkul kimliği, tasarruf finansmanı iştiraki",
        "Fuzul Katılım": "Birikimden yatırıma evin bütün yolculuğu, 256 şube ve dijital"
      },
      "names": {
        "Kamu birleşik": "Kamu birleşik"
      }
    },
    "lv": {
      "0": "-",
      "1": "Zayıf",
      "2": "Orta",
      "3": "Güçlü",
      "4": "Çok güçlü"
    },
    "heat": [
      [
        "Hazır müşteri tabanı",
        [
          3,
          3,
          3,
          2,
          1,
          2,
          4
        ]
      ],
      [
        "Büyük tutarlı, uzun vadeli müşteri ilişkisi",
        [
          4,
          1,
          1,
          2,
          2,
          3,
          3
        ]
      ],
      [
        "Düzenli ödeme alışkanlığı olan müşteri",
        [
          3,
          2,
          0,
          1,
          1,
          2,
          2
        ]
      ]
    ],
    "facts": [
      [
        "Fiziki temas noktası",
        [
          "256 şube",
          "13.500+ mağaza",
          "12.751 mağaza",
          "28 şube",
          "Şubesiz",
          "122 şube",
          "453+ şube"
        ]
      ],
      [
        "Arkadaki gerçek varlık zinciri",
        [
          "İnşaat, arsa, GYO, sigorta, ödeme",
          "Perakende",
          "Perakende",
          "Altın rafinerisi, kuyumculuk",
          "Sanayi",
          "Kamu konut ekosistemi",
          "Kamu gücü"
        ]
      ],
      [
        "Kuruluş sermayesi",
        [
          "13,2 milyar TL",
          "1,5 milyar TL",
          "10 milyar TL",
          "-",
          "1,5 milyar TL",
          "-",
          "Halk Katılım 11,5 milyar TL"
        ]
      ],
      [
        "Özkaynak, 2025 sonu",
        [
          "Henüz faaliyette değil",
          "3,6 milyar TL",
          "Henüz faaliyette değil",
          "9,5 milyar TL",
          "3,9 milyar TL",
          "32,0 milyar TL",
          "Ziraat ve Vakıf 75,6 milyar TL"
        ]
      ]
    ],
    "heatSrc": "Kaynaklar: temas noktası",
    "heatSrc2": "sermaye",
    "heatSrc3": "özkaynak",
    "note": "Not",
    "noteAria": "fspark9 notu",
    "sources": "Kaynaklar",
    "nextLine": "Bu değerlendirmeyi nasıl bir çalışmaya dönüştürebiliriz",
    "backToReport": "Rapora dön"
  }
} satisfies LockedReportContent;
