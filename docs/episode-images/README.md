# The Last Day · hazır görseller (2026-10-27)

Beş Son Gün bölümüne hazır görseller: gerçek fotoğraf, uygulamanın kendi App Store ekranları ve şirketin arşivlenmiş sitesi. Hepsi sadece Sanity'de (`sparkEpisode.images`), aynada (`src/content`) yok ve `check:drift` karşılaştırmaz.

## Nasıl çalışıyor

- Alan `sparkEpisode.images[]`: `at` (yer), `image`, `alt`, `caption`, `credit` (iki dilli), `href`.
- `at` hikâyede bölüm id'si (`ch1`), karar bloklarında (Nuri) `d1`..`d5`, `r1`, `r2`, `twist`. Görsel o bölümün metninin altında çıkar (`components/spark/episode/EpisodeImages.tsx`).
- Bölüm alanlarının dışında ayrı dizi: `seed:v3` chapters'ı baştan yazıyor, görseller orada olsaydı her seed'de silinirdi. Seed `images`'a dokunmuyor.
- Dikey görseller (telefon, kart) 280px, yataylar (web sayfası) metin sütununda en fazla 720px.
- Studio'da Story (Nuri'de Decisions) sekmesinde "Images" listesi: görsel eklemek, çıkarmak, açıklama değiştirmek oradan.

## Görseller ve kaynaklar

| Bölüm | Yer | Görsel | Kaynak | Lisans |
|---|---|---|---|---|
| Bó | ch1 | Sarı Bó kartı, fotoğraf | commons.wikimedia.org/wiki/File:Bo_debit_card.jpg (Cordyceps-Zombie) | CC BY-SA 4.0 |
| Bó | ch2 | "Make your money stretch" bütçe ekranı | Bó App Store sayfası, Wayback 20200217163545 | Bó'nun kendi materyali, kaynak gösterilerek |
| Bó | ch3 | "Lock your card" kart ekranı | aynı | aynı |
| Bó | ch5 | "We're closing Bó" sayfası | wearebo.co.uk, Wayback 20200509142701 | aynı |
| Nuri | d1 | Bitwala kartı | Bitwala App Store sayfası, Wayback 20191025043445 | aynı |
| Nuri | d2 | nuri.com ana sayfa, Mayıs 2021 | Wayback 20210520105923 | aynı |
| Nuri | r1 | nuri.com, "18 Aralık'ta kapanıyor" şeridi | Wayback 20221018125113 | aynı |
| Fidor | ch1 | Fidor Mastercard, fotoğraf | commons.wikimedia.org/wiki/File:FidorBank_Debit_MasterCard.jpg (ISFotodesign) | CC BY-SA 4.0 |
| Fidor | ch2 | fidor.de, Ağustos 2016 | Wayback 20160803153917 | Fidor'un kendi materyali |
| Fidor | ch4 | Fidor Smart Banking ekranı | Fidor App Store sayfası, Wayback 20190624162024 | aynı |
| Fidor | ch7 | Kapanış duyurusu, Haziran 2023 | fidor.de, Wayback 20230602030731 | aynı |
| Yolt | ch2 | yolt.com "Unthink Money", Eylül 2017 | Wayback 20170920090909 | Yolt / ING materyali |
| Yolt | ch3 | "Sync your accounts" ekranı | Yolt App Store sayfası, Wayback 20190701043446 | aynı |
| Yolt | ch8 | yolt.com, Ağustos 2022 (sadece API) | Wayback 20220801235646 | aynı |
| Xinja | ch1 | Bekleme listesi karşılama ekranı | Xinja App Store sayfası, Wayback 20200514025700 | Xinja'nın kendi materyali |
| Xinja | ch3 | Banka hesabı ve pembe kart ekranı | aynı | aynı |
| Xinja | ch8 | Kapanış duyurusu, Aralık 2020 | xinja.com.au, Wayback 20201221111114 | aynı |

App Store ekranları mzstatic'ten 1242x2688 orijinal boyutta indirildi. Site görüntüleri Wayback kaydından 1440 genişlikte tarayıcıyla alındı; çerez pencereleri yerelde CSS ile gizlendi (tıklanmadı). Kaynak dosyalar repoda tutulmuyor, Sanity'deki varlıklar asıl kopya.
