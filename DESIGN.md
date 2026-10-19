# DESIGN.md — Avazov portfolio uslub DNK'si

Manbalar: asl g'oya rasmi (Magnific "Casual Outfit" shabloni) va `code.html` (Og'abekning o'z versiyasi, `screen.png`).
Bosh sahifa hero'si — **o'zgarmas asos**. Qolgan hamma sahifa va bo'lim shu fayldagi qoidalardan chiqadi.

---

## 1. Ranglar

Ranglar asl rasmdan piksel bo'yicha o'lchangan. Sof kulrang (ko'k tus yo'q) + bitta iliq oltin.

| Token | Qiymat | Qayerda |
|---|---|---|
| `--color-gold` | `#FCC464` | Urg'u: asosiy tugma, logo kvadrati, aktiv menyu, indikator, sarlavhaning 1-qatori |
| `--color-gold-hover` | `#F0B24A` | Oltin tugma hover |
| `--color-ink` | `#FFFFFF` | Asosiy matn, sarlavhaning 2-qatori |
| `--color-ink-soft` | `#C9C9C9` | Menyu linklari (aktiv emas) |
| `--color-muted` | `#8E8E8E` | Ikkinchi darajali matn, mikro-izohlar |
| `--color-night` | `#0E0E0F` | Sahifa foni (oyna tashqarisi) |
| `--color-stage-edge` | `#1C1C1C` | Oyna (window) chetlari |
| `--color-stage-core` | `#454545` | Oyna markazidagi "studiya yorug'i" |
| `--color-surface` | `#1A1A1B` | Bo'lim yuzasi (bir pog'ona ochroq ton) |
| `--color-surface-2` | `#242425` | Ichki panel, hover yuzasi |
| `--color-control` | `#5C5C5C` | Doira strelka tugmalari foni |
| `--color-chip` | `#ECECEC` | Ijtimoiy tarmoq doiralari (to'ldirilgan) |

Qoidalar:
- Oltin faqat **harakat** va **bitta urg'u** uchun. Matn bloklari hech qachon oltin emas.
- Yuzalar bir-biridan chiziq bilan emas, **ton pog'onasi** bilan ajraladi (`night → surface → surface-2`).
- Uzun matn to'liq oq yoki `ink-soft`; kulrang (`muted`) faqat ikkinchi darajali izohga.

## 2. Shrift

**Poppins** — yagona oila. Kirill (RU) uchun Poppins'da glif yo'q, shuning uchun `font-family` zanjirida **Montserrat (faqat cyrillic subset)** zaxira bo'ladi; lotin harflari doim Poppins.

| Rol | O'lcham (desktop → mobil) | Og'irlik | Boshqa |
|---|---|---|---|
| Display (hero sarlavha) | `clamp(56px, 6.6vw, 96px)` | 800 | UPPERCASE, `leading-[0.95]`, `tracking-[-0.02em]` |
| Kontur watermark | `clamp(120px, 11.5vw, 168px)` | 800 | stroke 1.5px `rgba(255,255,255,.13)`, `color: transparent` |
| H2 (bo'lim sarlavhasi) | `clamp(36px, 4.4vw, 64px)` | 800 | UPPERCASE, 1-so'z oltin bo'lishi mumkin (hero naqshi) |
| H3 | `clamp(22px, 2vw, 28px)` | 700 | Sentence case |
| Body | `16–17px` | 400 | `leading-relaxed`, satr 45–75 belgi |
| Hero izoh matni | `13–14px` | 400 | `muted`, max ~360px |
| Nav | `14px` | 500 | |
| Tugma | `12–13px` | 700–800 | UPPERCASE, `tracking-[0.08em]` |
| Logo wordmark | `16px` | 800 | UPPERCASE, `tracking-wide` |
| Logo tagline | `9px` | 500 | UPPERCASE, `tracking-[0.2em]` — DNK istisnosi |

Bir sahifada 5 tadan ortiq o'lcham ishlatilmaydi. Sarlavhalar har qanday kenglikda **2 qatordan oshmaydi**.

## 3. Kompozitsiya — "Studiya oynasi" (Stage)

DNK'ning yuragi: sahifa ichida yumaloq burchakli **oyna**, ichida studiya yorug'i.

- Oyna: `max-w-[1380px]`, `rounded-[18px]`, radial fon
  `radial-gradient(circle at 56% 45%, #454545 0%, #2a2a2a 38%, #1c1c1c 75%)`.
- Oyna tashqarisi — `night`. Desktop'da oyna atrofida 24–40px bo'shliq; mobilda oyna ekranga to'liq yopishadi (radius 0).
- Hero kompozitsiyasi: **chapda** 2 qatorli sarlavha (oltin + oq) → izoh → oltin pill tugma; **markazda** odam (pastga tegib turadi, polda soya); **o'ngda** vertikal kontur harflar; **pastda chapda** ijtimoiy doiralar + mikro-matn; **pastda o'ngda** strelkalar; **o'ng chetda** oltin "til" indikator.
- Ichki sahifalar ham **qisqaroq oyna** bilan ochiladi (`min-h ~ 460px`): chapda 2 qatorli sarlavha, o'ngda shu sahifaning kontur so'zi (masalan `WORK`, `ABOUT`, `HELLO`). Shu bilan har sahifa bosh sahifa oilasidan ekanligi ko'rinadi.

## 4. Komponentlar

| Komponent | Ko'rinish |
|---|---|
| **Logo** | 40px oltin kvadrat (`rounded-md`), ichida qora burilgan romb (diamond in diamond). Yonida wordmark `AVAZOV` + tagline |
| **Asosiy tugma** | To'liq pill, oltin fon, qora 800 matn, `px-8 py-3.5`; hover: `gold-hover` + 2px ko'tarilish |
| **Ikkilamchi tugma** | `rounded-lg` (8px), 1.5px oq ramka, oq 600 matn, `px-4 py-1.5`; hover: oq fon, qora matn ("Sign In" naqshi) |
| **Doira tugma** | 30px, `control` fon, oq ikonka (strelkalar, yopish) |
| **Ijtimoiy doira** | 28px, `chip` to'ldirilgan, ichida qora ikonka; hover: oltin fon |
| **Nav linki** | Aktiv: oltin matn + ostida 2px oltin chiziq. Qolganlari `ink-soft`, hover oq |
| **Indikator** | O'ng chetda 12×100px oltin, `rounded-l-full`, yengil oltin glow; aktiv slayd/bo'limni ko'rsatadi |
| **Til almashtirgich** | `UZ · RU · EN`, aktiv — oltin; qidiruv ikonkasining o'rnida |
| **Menyu (burger)** | 2 chiziqli ikonka; to'liq ekranli qora panel ochiladi: katta linklar, tillar, ijtimoiy doiralar |

## 5. Qolgan bo'limlar va sahifalar uchun qoidalar

1. **Kontur so'z — har bo'limning imzosi.** Bo'lim sarlavhasi yonida (yoki orqasida) katta kontur so'z. Lekin u hech qachon sarlavha yoki matn ustiga tushmaydi.
2. **2 qatorli sarlavha naqshi:** 1-qator oltin, 2-qator oq (hero'dagi `CASUAL / OUTFIT` kabi). Har bo'limda emas — sahifada 2–3 marta.
3. **Bir xil kartochkalar qatori yo'q.** Loyihalar — katta, navbatma-navbat joylashgan qatorlar (skrinshot + matn), har birining o'z kompozitsiyasi.
4. **Raqamlash yo'q** (01 / 02 / 03). Tartib joylashuv va o'lcham bilan ko'rsatiladi.
5. **Ingichka chiziqlar yo'q.** Ajratish — bo'shliq yoki ton pog'onasi.
6. **Bo'limlar orasi** desktop'da 120–200px, mobilda 72–96px. Tashqi chetlar har kenglikda teng.
7. **Haqiqiy rasm:** loyiha skrinshotlari, haqiqiy interfeys bo'laklari. Soxta dashboard, emoji, gradient blob yo'q.
8. **Soxta dalil yo'q:** mijoz sharhi, logo, raqamlar faqat haqiqiy bo'lsa.

## 6. Harakat (motion)

- Kirish: sarlavha → matn → rasm, 60–90ms kechikish bilan, 16–24px ko'tarilib, opacity bilan. Bir marta.
- Hero slayderi: sarlavha qatorlari almashadi (yuqoriga chiqib, pastdan kiradi), indikator sirpanadi.
- Hover: tugmalar, linklar, loyiha qatorlari.
- Faqat `transform` va `opacity`. `prefers-reduced-motion` da harakat o'chadi, kontent qoladi.

## 7. Taste Skill bilan munosabat

`design-taste-frontend` skill'i **mavjud brend rejimida** ishlatiladi (`--keep palette,type`). Quyidagilar shu brend DNK'sining o'zi, shuning uchun istisno sifatida ruxsat etilgan:

- Oyna ichidagi radial "studiya yorug'i" gradienti (faqat Stage ichida).
- Oltin tugma soyasi va indikator glow'i (faqat shu ikkitasi).
- Logo tagline'idagi kichik UPPERCASE yozuv.
- Kontur (outline) watermark harflar.

Qolgan hamma joyda skill'ning uy qoidalari amal qiladi.
