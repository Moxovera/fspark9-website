# FSPARK9 · Proje Durumu

Bu dosya, projeye yeni başlayan (veya araya giren) birinin hızlıca bağlam kazanması için tutuluyor. Tek durum kaynağı burasıdır. Kalıcı kurallar için `CLAUDE.md`'ye, alt sayfa route planı için `_design/route-haritasi.md`'ye bakılır. Bölüm × geçiş ilerlemesi aşağıda "Bölüm C detay takibi" bölümünde.

Son güncelleme: 2026-08-04

---

## Kilitlenmiş kararlar

- **Next.js 15** (bilerek pinlendi, `create-next-app@15` ile kuruldu — 16 değil), App Router, TypeScript, `src/` dizini.
- **Tailwind v4** kullanılıyor. Bu, CLAUDE.md'deki "renkler Tailwind config üzerinden" ifadesinin klasik `tailwind.config.ts` değil, Tailwind v4'ün CSS-first modeli (`globals.css` içindeki `@theme inline` bloğu) olarak yorumlandığı anlamına geliyor. Ayrı bir JS/TS config dosyası yok, tek kaynak `globals.css`.
- **next-intl**, `localePrefix: 'as-needed'` — EN kökte (`/`), TR `/tr` altında. Routing/navigation/request config `src/i18n/` altında, middleware `src/middleware.ts`.
- **4 marka rengi** CSS değişkeni olarak `globals.css`'te tanımlı, Tailwind'e `@theme inline` ile bağlı: `--navy #0B1F3A`, `--bronze #A67C3D`, `--ivory #F7F4EC`, `--charcoal #1C1C1C`. Sabit hex kodu bileşen içinde yasak.
- **3 font** `next/font/google` ile: Playfair Display → `font-display`, Inter → `font-sans`, IBM Plex Mono → `font-mono`.
- **Scroll reveal** tek paylaşılan mekanizma: `layout.tsx`'te bloklayıcı script (`html.js`), `globals.css`'te `.reveal/.js/.is-visible`, tek `IntersectionObserver` → `src/hooks/useReveal.ts`, tek sarmalayıcı bileşen → `src/components/ui/Reveal.tsx`. Her bölüm kendi observer'ını kurmuyor.
- **Üç geçiş yöntemi** (Geçiş A · Yapı → Geçiş B · Stil doğrulama → Geçiş C · Animasyon) her bölüm için ayrı ayrı, tek istekte tek bölüm.
- **Bölüm tamamlama kontrol listesi** (CLAUDE.md'ye eklendi): 375/768/1440 görsel kontrol, çakışma kontrolü, absolute/fixed eleman kontrolü, `npm run build` + `npm run lint` temiz, dc.html karşılaştırması — ancak bunlar geçtikten sonra commit.
- Bileşenler props alır, metin gömülmez; tipler `src/types/content.ts`'ten gelir. `any` yasak. Harici animasyon kütüphanesi yasak. Tasarım birebir uygulanır, "iyileştirilmez."

## Kullanıcı profili

- **Mehmet Burak Dikmen** — fspark9'un kurucusu, projenin geliştiricisi/sahibi. Site kendi fintech/dijital bankacılık danışmanlık işinin tanıtım sitesi.
- Git commit kimliği: `Mehmet Burak Dikmen <mehmetburakdikmen@gmail.com>`.
- Türkçe çalışıyor. Onay akışını önemsiyor — önce öneri/plan, sonra "yap" denince uygulama şeklinde ilerliyoruz.
- Teknik titizlik bekliyor: iddiaları (özellikle animasyon/zamanlama) gerçek ölçümle (Playwright vb.) doğrulatıyor, "çalışıyor görünüyor" yeterli değil.
- GitHub: `Moxovera/fspark9-website`. Vercel'e bağlı (canlı: `fspark9-website.vercel.app`), custom domain henüz bağlanmadı.

## Dosya konumları

| Dosya | Ne işe yarar |
|---|---|
| `_design/fspark9 Site.dc.html` | Tasarım kaynağı — DCLogic tabanlı, tek doğru referans |
| `_design/content.ts` | Onaylı içerik tipi referansı — değişiklikler önce burada yapılır |
| `_design/route-haritasi.md` | Alt sayfa route/dosya/bileşen planı — henüz uygulanmadı, referans olarak duruyor |
| `src/types/content.ts` | Çalışan kopya — `_design/content.ts`'ten kopyalanır; tek fark `PostListItem` (lint için `interface extends {}` yerine `type = Pick<...>`) |
| `src/content/en.ts`, `src/content/tr.ts` | Faz 2 içerik verisi — şu an sadece `hero` dolu, geri kalanı tip hatası vermeyecek placeholder |
| `src/components/sections/Hero.tsx` | Tamamlanan tek bölüm |
| `src/components/ui/Reveal.tsx` | Paylaşılan reveal sarmalayıcı (`'use client'` sınırı burada) |
| `src/hooks/useReveal.ts` | Paylaşılan `IntersectionObserver` hook'u |
| `src/app/[locale]/page.tsx` | Ana sayfa, bölümleri dizer — şu an sadece `<Hero>` |
| `src/app/[locale]/layout.tsx` | Fontlar, reveal bloklayıcı script, `NextIntlClientProvider` |
| `src/app/globals.css` | Renk/font token'ları, reveal CSS, scroll cue `@keyframes` |
| `src/i18n/{routing,navigation,request}.ts`, `src/middleware.ts` | next-intl kurulumu |

## Durum tablosu

**Bölüm A — Denetim: tamamlandı.** dc.html + content.ts + support.js incelendi, uyuşmazlıklar raporlandı ve çözüldü.

**Bölüm B — Kurulum: tamamlandı.**
- Next.js + next-intl + design token + font kurulumu bitti.
- GitHub bağlandı (`Moxovera/fspark9-website`), Vercel bağlandı.
- Kontrol Noktası 1 doğrulandı (build temiz, ilk commit + push başarılı, `git remote -v` / `git log` ile teyit edildi).
- **Açık:** custom domain henüz Vercel'e bağlanmadı.

**Bölüm C — Bölüm bölüm inşa:** Hero bitti, Framework'e başlanıyor. Site bölümü bazında Geçiş A/B/C detayı aşağıda.

*(Not: buradaki "Bölüm A/B/C" proje fazlarını ifade ediyor — CLAUDE.md'deki her site bölümü için uygulanan "Geçiş A/B/C" ile karıştırılmamalı, aşağıdaki tablo o ikinci anlamı takip ediyor.)*

### Bölüm C detay takibi

Her site bölümü için CLAUDE.md'nin üç geçiş yöntemine (Geçiş A · Yapı, Geçiş B · Stil doğrulama, Geçiş C · Animasyon) göre ilerleme. Sıra `src/types/content.ts` içindeki `HomePage` arayüzüyle aynı (dc.html'deki gerçek sıra).

| Site bölümü | Geçiş A · Yapı | Geçiş B · Stil doğrulama | Geçiş C · Animasyon |
|---|:---:|:---:|:---:|
| Hero | [x] | [x] | [x] |
| Framework | [x] | [x] | [x] |
| ProofStrip | [x] | [x] | [x] |
| Familiar | [x] | [x] | [x] |
| CaseStudies | [ ] | [ ] | [ ] |
| Services | [ ] | [ ] | [ ] |
| Comparison | [x] | [x] | N/A — sadece reveal, ayrı animasyon yok |
| Approach | [x] | [x] | [x] |
| Testimonials | [x] | [x] | [x] |
| Audience | [x] | [x] | [x] |
| Story | [x] | [x] | [x] |
| Process | [ ] | [ ] | [ ] |
| Media | [ ] | [ ] | [ ] |
| Faq | [ ] | [ ] | [ ] |
| ClosingCta | [ ] | [ ] | [ ] |

## Bilinçli tasarım sapmaları

dc.html'den kasıtlı olarak farklı yapılan, onaylanmış noktalar. Her satır: ne, neden.

- Familiar kartları — mobilde sayı sütunu daraltıldı (132px→~85px), metne daha çok yer açmak için, dc.html'de bu ayrım yok.
- Off-brand renkler #fffdf7→ivory+%40beyaz, #F5F0E6→ivory+%10bronz (Comparison, vurgu satırı) olarak paletten türetildi, tasarımcı onayıyla. F5F0E6'nın diğer bölümlerdeki kullanımı aynı yüzdeyi tekrarlamak zorunda değil — bkz. aşağıdaki Approach notu, kademeli (nötr/vurgu) bir sistem.
- Comparison tablosu mobil genişliği daraltıldı (640px→480px, padding 20px→12-14px), tasarımcı QA notuyla, gereksiz mobil scroll'u azaltmak için.
- Approach hover-accordion: dc.html'in `st.handHov` JS state'i yerine saf CSS `:has()` kullanıldı (JS yok, Framework'teki `.framework-card:hover` deseniyle tutarlı). Off-brand `#F5F0E6`/`#EFE7D6` çifti paletten `color-mix(bronze 3%, ivory 97%)` / `color-mix(bronze 11%, ivory 89%)` olarak türetildi. F5F0E6 kaynak rengi iki bölümde farklı oranlarla türetildi (Comparison %10 = vurgu, Approach %3 = nötr/hover'da %11'e çıkıyor) — bu kasıtlı bir kademeli sistem, tutarsızlık değil. Nötr durumlar daha açık, vurgu/etkileşim durumları daha güçlü bronz tonu kullanır.
- Testimonials koyu sol panel: dc.html'de `#1A202C`, paletten temiz bir color-mix ile türemiyor (navy/charcoal/muted kombinasyonlarının hiçbiri iyi oturmuyor). `var(--navy)` doğrudan kullanılmasına karar verildi — G kanalı zaten neredeyse birebir örtüşüyor, gözle fark edilmeyecek kadar küçük bir sapma. Aynı slider'daki CTA metin/border rengi `#E7C68A` ise `color-mix(bronze 50%, ivory 50%)` ile türetildi — düz `var(--bronze)` navy zemin üzerinde WCAG AA'nın (4.5:1) az altında kaldığı için (~4.4:1), bu türetilmiş ton ~8:1 veriyor. Detay: `globals.css` üstteki off-brand renk yorum bloğu.
- Testimonial navy panel — mobilde dikey padding azaltıldı, kullanıcı kaydırmadan daha fazla içerik görebilsin diye, dc.html'de bu ayrım yok.

## Çözülen kritik hatalar

- Familiar sticky stack — JS'in CSS position:sticky'nin üstüne ayrıca translateY uygulaması, kartların yanlış konuma itilmesine sebep oluyordu. Opus ile kök neden bulunup translateY kaldırıldı, konumlandırma tamamen CSS'e bırakıldı.
- Testimonial slider — dc.html'deki gizli slayt butonlarının klavye tab sırasına girmesi inert+aria-hidden ile düzeltildi, ardından inert'in fokus kaybı yan etkisi ref ile telafi edildi. Ayrıca dc.html'deki ok ikonu hover'da kaybolma hatası (stroke sabitti) stroke=currentColor ile düzeltildi.

## Bugün alınan içerik kararları

- `content.ts`'e dc.html'de olup karşılığı olmayan üç bölüm için yeni tipler eklendi: `FamiliarSection`/`FamiliarPoint` (sticky kart yığını), `TestimonialSection`/`Testimonial` (testimonial slider), `MediaSection`/`MediaItem` (basın/medya).
- `WhyMeSection`/`WhyMeBlock` → `ApproachSection`/`ApproachBlock` olarak yeniden adlandırıldı. Sebep: isim çakışması — gerçek "Why I do this" bölümü zaten `StorySection`'a karşılık geliyordu, eski `WhyMeSection` ise "The side that builds it" içindeki "What I do differently" bloğuna karşılık geliyordu.
- `AudienceCard` gerçek yapıya göre düzeltildi: `title/problem/do/result` alanları, veri kaynaklı olmadığı için `icon` alanı kaldırıldı. `AudienceSection`'a paylaşılan `labels` eklendi.
- `ProcessStep`'e `detail` alanı eklendi (ana metinden ayrı, ikincil açıklama).
- `ComparisonValue`'nun üstüne dc.html'deki düz string hücrelerin nasıl eşleneceğine dair bir not eklendi.
- Hero içeriği önce kullanıcının verdiği yeni (paraphrase) metinle dolduruldu, sonra bu geri alındı — dc.html'deki gerçek `t.hero` verisiyle (eyebrow, headlinePrimary/headlineAccent, bullets, closingLine, scrollLabel) değiştirildi. `Hero` tipi buna göre genişletildi.

## Sıradaki adım

**Framework bölümü, Geçiş A (Yapı).** dc.html'deki "Decide / Set up / Ship" (glass folder cards) bölümü okunup `src/components/sections/Framework.tsx` olarak markup + statik Tailwind sınıflarıyla kurulacak, `content.ts`'teki `Framework`/`FrameworkStep` tipine göre.
