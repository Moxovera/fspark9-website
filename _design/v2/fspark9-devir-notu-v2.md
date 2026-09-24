# fspark9 devir notu: site yeniden yapımı

24 Eylül 2026. Yeni sohbet buradan başlar. Önceki devir notunun yerini alır.

## Durum

Tasarım bitti, Claude Code brief'i hazır. Sıradaki iş, Claude Code'un sitenin yeni halini staging'de adım adım kurması. Bu sohbetin görevi o süreci yönetmek: staging ekran görüntülerini tasarımla karşılaştırmak, düzeltme listesi çıkarmak, Claude Code'a gidecek mesajları yazmak, çıkan soruları çözmek.

## Kaynaklar (hepsi projede)

- **Tasarım panosu (canvas):** https://claude.ai/artifact/JyHpPkShK4Wg4SsBMiDo7U. Üç sıra var:
  1. ana sayfa ve header durumları
  2. şablonlar: hizmet, Work, vaka, About, Spark, The Last Day, yasal
  3. 404, Thank you, Spark bölüm sayfası
- **`claude/fspark9-rebuild-brief-v4.md`:** Claude Code brief v4. Mimari, kurallar, Sanity planı, SEO ve kontrol listesi burada.
- **`claude/fspark9-site-copy-v2.md`:** tüm sayfa metinleri EN ve TR, SEO başlık ve açıklamaları (bölüm 6c), dilim haritası.
- **`claude/fspark9-brandbook-v3.md`:** marka sistemi (The Ninth Slice).
- **`claude/fspark9-legal-update-v2.md`:** Privacy ve Cookies güncellemeleri. Vercel Analytics ve randevu penceresi.
- **Tasarım panoları:** fspark9-design-boards-v2.zip, panoların kaynak dosyaları ve ekran görüntüleri.
- **OG görselleri:** fspark9-og-en-v1.png ve fspark9-og-tr-v1.png, 1200 × 630.
- **Logo paketi:** fspark9-logo-v2.zip (SVG, PNG, favicon, app ikonu).
- **Repo:** github.com/Moxovera/fspark9-website. Kurallar için repodaki `CLAUDE.md` ve `FSPARK9-DURUM.md`.

## Kilitlenen kararlar

- **Marka:** The Ninth Slice.
  - Renkler: Paper, Ink, Flare.
  - Fontlar: Epilogue, Hanken Grotesk, Spline Sans Mono.
  - Dokuzuncu dilim her halkada sarı.
- **Çalışma düzeni:** her şey `staging` branch'inde yapılıyor, main'e dokunulmuyor. Bitince tek seferde canlıya alınıyor.
- **Sanity en sona kaldı:**
  - Staging'de sayfalar metni repodaki içerik dosyalarından okuyor.
  - En sonda tek seferde yapılıyor: şemaya sadece ekleme, tek bir seed, sayfaların bağlanması.
  - Canlıya çıkış günü: Privacy metni, Bó tarihi ve Sektör raporları.
  - Eskiler canlıdan birkaç gün sonra tek bir script'le siliniyor.
- **Adresler ve isimler:**
  - `/book` kalktı. Her "Book a call" site içinde cal.com popup'ını açıyor. Eski /book linkleri de popup'ı açıyor.
  - About her yerde About, adres `/about`. `/story` için 301 var.
- **Analitik ve SEO:**
  - Google Analytics yok, cookie banner da yok. Search Console doğrulama etiketi duruyor.
  - Sitede sadece Vercel Web Analytics ve Speed Insights var. Vercel paketi Hobby, veri 1 ay tutuluyor, özel olay takibi yok.
- **Dokunulmayan:** `/locked` (Fuzul raporu) bu işte hiç değişmiyor.
- **Yasal sayfalar:** Imprint ve Terms aynen kalıyor. Privacy ve Cookies, yasal güncelleme dosyasındaki haliyle değişiyor.

## Açık olanlar

1. **Vercel Hobby planı:** Vercel'in kuralına göre ticari kullanıma kapalı. Canlıya çıkmadan Pro'ya geçmek önerildi. Geçilirse Privacy'deki saklama süresi 12 ay olacak.
2. **Canlıya çıkış tarihi:** Bó'nun yayın tarihi ve yasal sayfalardaki son güncelleme tarihi bu gün olacak.
3. **Sonraki iş:** one pager, rapor ve teklif şablonlarını yeni sisteme taşımak.

## Staging adımları (brief bölüm 13)

1. Temel parçalar: renkler, fontlar, halka, butonlar, header, footer
2. İçerik dosyaları
3. Ana sayfa, bölüm bölüm
4. Hizmet sayfaları ve /services
5. Work ve vakalar
6. About
7. Spark, format sayfası, Bó bölüm sayfası
8. Thank you, yasal sayfalar, 404, yönlendirmeler
9. Randevu penceresi
10. SEO: OG görseli, ikonlar, sitemap
11. Sanity turu
12. Canlıya çıkış
13. Temizlik

## Çalışma kuralları

- Tire yok, "X değil Y" kalıbı yok, yapay zeka dili yok.
- Müşteriye laf atan ya da eksiğini söyleyen cümle yok.
- Metin site copy dosyasından gelir, yeni metin yazılmaz.
- Her değişiklikten sonra ilgili md dosyası güncellenir, projeye yazılır ve indirilebilir olarak gönderilir.
