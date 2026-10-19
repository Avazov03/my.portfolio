import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type CategoryId = "education" | "ai" | "media" | "web";

export type Project = {
  slug: string;
  name: string;
  watermark: string;
  category: CategoryId;
  featured?: boolean;
  client: Localized;
  role: Localized;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  features: Localized[];
  stack: string[];
  live?: string;
  image?: { src: string; width: number; height: number };
};

export const tr = (value: Localized, locale: Locale) => value[locale];

const TSUL: Localized = {
  uz: "Toshkent davlat yuridik universiteti",
  ru: "Ташкентский государственный юридический университет",
  en: "Tashkent State University of Law",
};

const PERSONAL: Localized = {
  uz: "Shaxsiy mahsulot",
  ru: "Собственный продукт",
  en: "Own product",
};

const FULL_STACK: Localized = {
  uz: "Full-stack: arxitektura, frontend, backend, deploy",
  ru: "Full-stack: архитектура, фронтенд, бэкенд, деплой",
  en: "Full-stack: architecture, frontend, backend, deploy",
};

export const projects: Project[] = [
  {
    slug: "e-researcher",
    name: "E-Researcher 2.0",
    watermark: "ER",
    category: "education",
    featured: true,
    client: TSUL,
    role: FULL_STACK,
    summary: {
      uz: "TDYU izlanuvchilari uchun dissertatsiyadan nashrgacha barcha ilmiy jarayonlarni bir joyga yig‘gan platforma.",
      ru: "Платформа, которая собирает в одном месте все научные процессы исследователей ТГЮУ — от диссертации до публикаций.",
      en: "A platform that brings every research process at TSUL into one place, from the dissertation to publications.",
    },
    problem: {
      uz: "Izlanuvchilar, ilmiy rahbarlar va ilmiy bo‘lim o‘rtasidagi hujjatlar qog‘ozda va messenjerlarda yurardi. Holat, muddatlar va hisobotlar qo‘lda kuzatilardi.",
      ru: "Документы между исследователями, научными руководителями и научным отделом ходили на бумаге и в мессенджерах. Статусы, сроки и отчёты отслеживались вручную.",
      en: "Documents moved between researchers, supervisors and the research office on paper and in messengers. Status, deadlines and reports were tracked by hand.",
    },
    solution: {
      uz: "Rollarga asoslangan yagona tizim: 9 bosqichli himoya jarayoni, monitoring, nashrga ruxsat va elektron ilmiy portfolio. Har bir harakat audit qilinadi, fayllar himoyalangan holda saqlanadi.",
      ru: "Единая ролевая система: 9-этапный процесс защиты, мониторинг, допуск к публикации и электронное научное портфолио. Каждое действие журналируется, файлы хранятся защищённо.",
      en: "One role-based system: a 9-stage defence workflow, monitoring, publication approval and an electronic research portfolio. Every action is audited and files are stored securely.",
    },
    features: [
      {
        uz: "Taklif havolasi orqali ro‘yxatdan o‘tish va rollar bo‘yicha kirish",
        ru: "Регистрация по приглашению и доступ по ролям",
        en: "Invitation-based sign-up and role-based access",
      },
      {
        uz: "9 bosqichli dissertatsiya himoyasi va avtomatik eslatmalar",
        ru: "9-этапная защита диссертации с автоматическими напоминаниями",
        en: "A 9-stage dissertation defence with automatic reminders",
      },
      {
        uz: "Ilmiy portfolio: maqola, nashr va guvohnomalar, PDF, DOCX va XLSX eksport",
        ru: "Научное портфолио: статьи, публикации и свидетельства, экспорт в PDF, DOCX и XLSX",
        en: "Research portfolio: articles, publications and certificates, exported to PDF, DOCX and XLSX",
      },
      {
        uz: "PWA va push-bildirishnomalar, Playwright E2E testlari",
        ru: "PWA и push-уведомления, E2E-тесты на Playwright",
        en: "PWA with push notifications and Playwright end-to-end tests",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "PWA", "Node.js", "Express", "MySQL", "Sequelize", "S3", "Web Push", "Playwright", "Docker", "Nginx"],
    live: "https://ilmiy.tsul.uz",
    image: { src: "/images/projects/e-researcher.webp", width: 1382, height: 864 },
  },
  {
    slug: "yurist-ai",
    name: "Yurist AI",
    watermark: "AI",
    category: "ai",
    featured: true,
    client: PERSONAL,
    role: {
      uz: "Full-stack va AI: RAG, ovozli assistent, backend, admin panel",
      ru: "Full-stack и AI: RAG, голосовой ассистент, бэкенд, админ-панель",
      en: "Full-stack and AI: RAG, voice assistant, backend, admin panel",
    },
    summary: {
      uz: "O‘zbekiston qonunchiligi bo‘yicha savollarga javob beradigan, hujjat tuzadigan va yurist topib beradigan AI yordamchi.",
      ru: "AI-ассистент, который отвечает на вопросы по законодательству Узбекистана, составляет документы и помогает найти юриста.",
      en: "An AI assistant that answers questions on Uzbek law, drafts documents and helps find a lawyer.",
    },
    problem: {
      uz: "Oddiy foydalanuvchi uchun yuridik maslahat qimmat va sekin, umumiy chatbotlar esa O‘zbekiston qonunlari va modda raqamlarini chalkashtiradi.",
      ru: "Юридическая консультация для обычного человека дорогая и медленная, а универсальные чат-боты путают законы Узбекистана и номера статей.",
      en: "Legal advice is slow and expensive for ordinary people, and general chatbots mix up Uzbek laws and article numbers.",
    },
    solution: {
      uz: "Qonun matnlari ustida LangChain RAG: javoblar manbaga tayanadi va modda raqamlarini saqlaydi. Ustiga ovozli assistent, shartnoma generatori va mutaxassislar katalogi qo‘shilgan.",
      ru: "LangChain RAG по текстам законов: ответы опираются на источник и сохраняют номера статей. Сверху — голосовой ассистент, генератор договоров и каталог специалистов.",
      en: "LangChain RAG over the legal texts, so answers rely on the source and keep article numbers. On top: a voice assistant, a contract generator and a directory of specialists.",
    },
    features: [
      {
        uz: "RAG (FAISS va OpenAI) modda raqamlarini saqlagan holda",
        ru: "RAG (FAISS и OpenAI) с сохранением номеров статей",
        en: "RAG (FAISS and OpenAI) that keeps article numbers",
      },
      {
        uz: "O‘zbek tilidagi ovozli assistent: Vapi, Deepgram, ElevenLabs",
        ru: "Голосовой ассистент на узбекском: Vapi, Deepgram, ElevenLabs",
        en: "Uzbek voice assistant: Vapi, Deepgram, ElevenLabs",
      },
      {
        uz: "Shablon asosida shartnoma va hujjatlar: TXT, DOCX, PDF",
        ru: "Договоры и документы по шаблонам: TXT, DOCX, PDF",
        en: "Template-based contracts and documents: TXT, DOCX, PDF",
      },
      {
        uz: "Chat tarixi, shaxsiy kabinet va admin panel",
        ru: "История чатов, личный кабинет и админ-панель",
        en: "Chat history, personal account and admin panel",
      },
    ],
    stack: ["Python", "FastAPI", "Flask", "LangChain", "FAISS", "OpenAI", "Vapi", "PostgreSQL", "React", "Tailwind CSS"],
    image: { src: "/images/projects/yurist-ai.webp", width: 1600, height: 1000 },
  },
  {
    slug: "open-tsul",
    name: "Open TSUL",
    watermark: "OT",
    category: "education",
    featured: true,
    client: TSUL,
    role: FULL_STACK,
    summary: {
      uz: "TDYU professorlaridan bepul huquqiy kurslar platformasi: kurslar katalogi, sertifikatlar va AI yordamchi.",
      ru: "Платформа бесплатных юридических курсов от профессоров ТГЮУ: каталог курсов, сертификаты и AI-помощник.",
      en: "A platform of free law courses by TSUL professors: a course catalogue, certificates and an AI helper.",
    },
    problem: {
      uz: "Universitetning huquqiy bilimlari auditoriyada qolardi. Keng auditoriya uchun ochiq, o‘zbek tilidagi kurslar platformasi yo‘q edi.",
      ru: "Юридические знания университета оставались в аудиториях. Открытой платформы курсов на узбекском для широкой аудитории не было.",
      en: "The university’s legal knowledge stayed in lecture halls. There was no open, Uzbek-language course platform for a wide audience.",
    },
    solution: {
      uz: "Next.js frontend va TypeScript API: kurslar, professorlar va kutubxona, Google orqali kirish, QR kodli PDF sertifikatlar va Gemini asosidagi “Sunnat AI” yordamchisi.",
      ru: "Фронтенд на Next.js и API на TypeScript: курсы, профессора и библиотека, вход через Google, PDF-сертификаты с QR-кодом и помощник «Sunnat AI» на Gemini.",
      en: "A Next.js frontend and a TypeScript API: courses, professors and a library, Google sign-in, PDF certificates with QR codes and the Gemini-based “Sunnat AI” helper.",
    },
    features: [
      {
        uz: "Kurslar, professorlar va kutubxona katalogi qidiruv bilan",
        ru: "Каталог курсов, профессоров и библиотеки с поиском",
        en: "A searchable catalogue of courses, professors and the library",
      },
      {
        uz: "Google orqali kirish (OAuth)",
        ru: "Вход через Google (OAuth)",
        en: "Google sign-in (OAuth)",
      },
      {
        uz: "QR kodli PDF sertifikatlar",
        ru: "PDF-сертификаты с QR-кодом",
        en: "PDF certificates with QR codes",
      },
      {
        uz: "Gemini asosidagi yordamchi, Jest va k6 yuklama testlari",
        ru: "Помощник на Gemini, тесты Jest и нагрузочные тесты k6",
        en: "A Gemini-based helper, Jest tests and k6 load tests",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Google OAuth", "Gemini", "PDFKit", "Jest", "k6"],
    live: "https://open.okina.uz",
    image: { src: "/images/projects/open-tsul.webp", width: 1440, height: 900 },
  },
  {
    slug: "loc",
    name: "LOC",
    watermark: "LOC",
    category: "education",
    featured: true,
    client: {
      uz: "Universitet amaliyot jarayoni",
      ru: "Практика студентов в университете",
      en: "University internship programme",
    },
    role: FULL_STACK,
    summary: {
      uz: "Talabalar amaliyotini boshqarish tizimi: davomat Telegram bot va geolokatsiya orqali tasdiqlanadi.",
      ru: "Система управления практикой студентов: посещаемость подтверждается через Telegram-бот и геолокацию.",
      en: "A student internship system where attendance is confirmed through a Telegram bot and geolocation.",
    },
    problem: {
      uz: "Amaliyotchi tashkilotga haqiqatan borganini tekshirish va rahbarlar uchun hisobot yig‘ish qo‘lda va ishonchsiz edi.",
      ru: "Проверять, что практикант действительно пришёл в организацию, и собирать отчёты для руководителей приходилось вручную и ненадёжно.",
      en: "Checking that interns actually showed up at their organisation, and collecting reports for supervisors, was manual and unreliable.",
    },
    solution: {
      uz: "Talaba Telegram botga joylashuvini yuboradi, PostGIS uni tashkilot koordinatasi bilan solishtiradi. Admin va rahbarlar uchun tuzilma, amaliyotlar va hisobotlar React panelida.",
      ru: "Студент отправляет геопозицию Telegram-боту, PostGIS сверяет её с координатами организации. Структура, практики и отчёты для админов и руководителей — в React-панели.",
      en: "The student sends their location to a Telegram bot and PostGIS checks it against the organisation’s coordinates. Structure, internships and reports for admins and supervisors live in a React panel.",
    },
    features: [
      {
        uz: "Geolokatsiya bo‘yicha davomat (PostGIS)",
        ru: "Посещаемость по геолокации (PostGIS)",
        en: "Geolocation attendance (PostGIS)",
      },
      {
        uz: "Telegram bot: ro‘yxatdan o‘tish, check-in, eslatmalar",
        ru: "Telegram-бот: регистрация, check-in, напоминания",
        en: "Telegram bot: sign-up, check-in, reminders",
      },
      {
        uz: "Akademik tuzilma va amaliyot tashkilotlari",
        ru: "Академическая структура и организации практики",
        en: "Academic structure and internship organisations",
      },
      {
        uz: "Hisobotlar, CSV eksport va Redis navbatidagi bildirishnomalar",
        ru: "Отчёты, CSV-экспорт и уведомления через очередь Redis",
        en: "Reports, CSV export and notifications queued in Redis",
      },
    ],
    stack: ["Laravel 13", "PHP", "React 19", "Inertia", "TypeScript", "Tailwind CSS", "PostgreSQL", "PostGIS", "Redis", "Docker", "Telegram Bot API"],
  },
  {
    slug: "jarvis",
    name: "JARVIS ULTRA",
    watermark: "JV",
    category: "ai",
    client: PERSONAL,
    role: {
      uz: "Muallif: AI agentlar, backend, desktop ilova",
      ru: "Автор: AI-агенты, бэкенд, десктоп-приложение",
      en: "Author: AI agents, backend, desktop app",
    },
    summary: {
      uz: "Windows uchun ovoz bilan boshqariladigan shaxsiy AI yordamchi: agentlar, ekran tahlili, xotira va 3D HUD.",
      ru: "Голосовой персональный AI-ассистент для Windows: агенты, анализ экрана, память и 3D-HUD.",
      en: "A voice-driven personal AI assistant for Windows: agents, screen analysis, memory and a 3D HUD.",
    },
    problem: {
      uz: "Oddiy ovozli yordamchilar kompyuterdagi real ishlarni bajara olmaydi: fayllar, brauzer va ilovalar bilan ishlash qo‘lda qoladi.",
      ru: "Обычные голосовые ассистенты не умеют делать реальную работу на компьютере: файлы, браузер и приложения остаются ручными.",
      en: "Ordinary voice assistants cannot do real work on a computer: files, the browser and apps stay manual.",
    },
    solution: {
      uz: "FastAPI backend va LangGraph agentlari kompyuterni boshqaradi. Wake word va Edge TTS bilan ovozli boshqaruv, EasyOCR bilan ekran tahlili, Chroma’da semantik xotira, Electron tray ilovasi va React Three Fiber HUD.",
      ru: "Бэкенд на FastAPI и агенты LangGraph управляют компьютером. Голосовое управление с wake word и Edge TTS, анализ экрана через EasyOCR, семантическая память в Chroma, трей-приложение на Electron и HUD на React Three Fiber.",
      en: "A FastAPI backend and LangGraph agents drive the computer. Voice control with a wake word and Edge TTS, screen analysis with EasyOCR, semantic memory in Chroma, an Electron tray app and a React Three Fiber HUD.",
    },
    features: [
      {
        uz: "Wake word, push-to-talk va Edge TTS",
        ru: "Wake word, push-to-talk и Edge TTS",
        en: "Wake word, push-to-talk and Edge TTS",
      },
      {
        uz: "8 ta agent: tizim, vision, brauzer, fayl, xotira, avtomatlashtirish, kod, umumiy",
        ru: "8 агентов: система, зрение, браузер, файлы, память, автоматизация, код, общий",
        en: "8 agents: system, vision, browser, files, memory, automation, coding, general",
      },
      {
        uz: "Ekran: skrinshot, OCR va tahlil",
        ru: "Экран: скриншот, OCR и анализ",
        en: "Screen: screenshot, OCR and analysis",
      },
      {
        uz: "Tasdiqlash qatlami, rate limit va portable o‘rnatish",
        ru: "Слой подтверждений, rate limit и портативная установка",
        en: "Confirmation layer, rate limiting and portable install",
      },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "OpenAI", "Gemini", "ChromaDB", "SQLite", "EasyOCR", "Electron", "React", "Three.js", "TypeScript"],
  },
  {
    slug: "lexify",
    name: "Lexify",
    watermark: "LX",
    category: "education",
    client: TSUL,
    role: FULL_STACK,
    summary: {
      uz: "TDYU uchun jonli darslar va kurslar platformasi: talaba, o‘qituvchi va admin uchun alohida kabinetlar.",
      ru: "Платформа живых занятий и курсов для ТГЮУ: отдельные кабинеты для студента, преподавателя и администратора.",
      en: "A live-lesson and course platform for TSUL with separate spaces for students, teachers and admins.",
    },
    problem: {
      uz: "Onlayn darslar turli servislarga tarqalib ketgan, materiallar va davomat bir joyda emas edi.",
      ru: "Онлайн-занятия были разбросаны по разным сервисам, материалы и посещаемость не были в одном месте.",
      en: "Online lessons were scattered across different services, and materials and attendance were not in one place.",
    },
    solution: {
      uz: "Next.js va Prisma asosidagi yagona platforma: jonli darslar jadvali, kurs materiallari, NextAuth bilan rollar va Playwright testlari.",
      ru: "Единая платформа на Next.js и Prisma: расписание живых занятий, материалы курсов, роли через NextAuth и тесты Playwright.",
      en: "One platform on Next.js and Prisma: a live-lesson schedule, course materials, roles with NextAuth and Playwright tests.",
    },
    features: [
      {
        uz: "Talaba, o‘qituvchi va admin rollari (NextAuth)",
        ru: "Роли студента, преподавателя и администратора (NextAuth)",
        en: "Student, teacher and admin roles (NextAuth)",
      },
      {
        uz: "Jonli darslar va kurs materiallari",
        ru: "Живые занятия и материалы курсов",
        en: "Live lessons and course materials",
      },
      {
        uz: "PostgreSQL va Prisma migratsiyalari",
        ru: "PostgreSQL и миграции Prisma",
        en: "PostgreSQL with Prisma migrations",
      },
      {
        uz: "Playwright E2E testlari va Docker",
        ru: "E2E-тесты Playwright и Docker",
        en: "Playwright end-to-end tests and Docker",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "NextAuth", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Playwright", "Docker"],
  },
  {
    slug: "tdyu-endowment",
    name: "TDYU Endowment Fund",
    watermark: "TF",
    category: "education",
    client: TSUL,
    role: {
      uz: "Frontend: arxitektura, interfeys, uch til",
      ru: "Фронтенд: архитектура, интерфейс, три языка",
      en: "Frontend: architecture, interface, three languages",
    },
    summary: {
      uz: "Universitetning maqsadli kapital (endowment) jamg‘armasi sayti: dasturlar, hisobotlar, yangiliklar va xayriya.",
      ru: "Сайт эндаумент-фонда университета: программы, отчёты, новости и пожертвования.",
      en: "The website of the university’s endowment fund: programmes, reports, news and donations.",
    },
    problem: {
      uz: "Jamg‘armaga xayriyachilar uchun ochiq, uch tilli va ishonchli raqamli yuz kerak edi.",
      ru: "Фонду нужно было открытое, трёхъязычное и вызывающее доверие цифровое лицо для жертвователей.",
      en: "The fund needed an open, trilingual and trustworthy public face for donors.",
    },
    solution: {
      uz: "React 19 va TypeScript’dagi tezkor sayt: uch til, dasturlar va hisobotlar bo‘limlari, tashqi CDN’siz mahalliy shriftlar.",
      ru: "Быстрый сайт на React 19 и TypeScript: три языка, разделы программ и отчётов, локальные шрифты без внешних CDN.",
      en: "A fast site on React 19 and TypeScript: three languages, programme and report sections, local fonts with no external CDN.",
    },
    features: [
      {
        uz: "O‘zbek, rus va ingliz tillari",
        ru: "Узбекский, русский и английский языки",
        en: "Uzbek, Russian and English",
      },
      {
        uz: "Dasturlar, hisobotlar va yangiliklar",
        ru: "Программы, отчёты и новости",
        en: "Programmes, reports and news",
      },
      {
        uz: "Xayriya va do‘kon sahifalari",
        ru: "Страницы пожертвований и магазина",
        en: "Donation and shop pages",
      },
      {
        uz: "Tashqi CDN’siz mahalliy shriftlar",
        ru: "Локальные шрифты без внешних CDN",
        en: "Local fonts with no external CDN",
      },
    ],
    stack: ["React 19", "TypeScript", "Vite", "React Router"],
    live: "https://tdyu.zonic.fit",
    image: { src: "/images/projects/tdyu-endowment.webp", width: 1000, height: 625 },
  },
  {
    slug: "zonic",
    name: "ZONIC",
    watermark: "ZN",
    category: "media",
    client: PERSONAL,
    role: {
      uz: "Full-stack: landing, admin panel, API, server",
      ru: "Full-stack: лендинг, админ-панель, API, сервер",
      en: "Full-stack: landing, admin panel, API, server",
    },
    summary: {
      uz: "Filmlar va seriallar ilovasi uchun landing, admin panel va API.",
      ru: "Лендинг, админ-панель и API для приложения фильмов и сериалов.",
      en: "Landing page, admin panel and API for a films and series app.",
    },
    problem: {
      uz: "Ilova uchun brendga mos vitrina, kontent va foydalanuvchilarni boshqarish uchun esa ichki panel kerak edi.",
      ru: "Приложению нужна была витрина в стиле бренда, а для управления контентом и пользователями — внутренняя панель.",
      en: "The app needed an on-brand showcase, and an internal panel to manage content and users.",
    },
    solution: {
      uz: "Brend landing sahifasi, React va Tailwind’dagi admin panel va Fastify API — hammasi bitta serverda Nginx, PM2 va Let’s Encrypt ostida.",
      ru: "Брендовый лендинг, админ-панель на React и Tailwind и API на Fastify — всё на одном сервере под Nginx, PM2 и Let’s Encrypt.",
      en: "A branded landing page, a React and Tailwind admin panel and a Fastify API, all on one server behind Nginx, PM2 and Let’s Encrypt.",
    },
    features: [
      {
        uz: "Brend landing va ilova vitrinasi",
        ru: "Брендовый лендинг и витрина приложения",
        en: "Branded landing page and app showcase",
      },
      {
        uz: "Kontent va foydalanuvchilar uchun admin panel",
        ru: "Админ-панель для контента и пользователей",
        en: "Admin panel for content and users",
      },
      {
        uz: "Fastify API, argon2 va JWT bilan xavfsiz kirish",
        ru: "API на Fastify, безопасный вход с argon2 и JWT",
        en: "Fastify API with argon2 and JWT sign-in",
      },
      {
        uz: "Nginx, PM2 va SSL bilan deploy",
        ru: "Деплой с Nginx, PM2 и SSL",
        en: "Deployed with Nginx, PM2 and SSL",
      },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Fastify", "PostgreSQL", "argon2", "JWT", "Nginx", "PM2"],
    live: "https://zonic.uz",
    image: { src: "/images/projects/zonic.webp", width: 1440, height: 900 },
  },
  {
    slug: "law-lab",
    name: "Law Lab",
    watermark: "LL",
    category: "web",
    client: {
      uz: "O‘zimning IT studiyam",
      ru: "Моя IT-студия",
      en: "My own IT studio",
    },
    role: {
      uz: "Asoschi: sayt, CMS, deploy",
      ru: "Основатель: сайт, CMS, деплой",
      en: "Founder: site, CMS, deploy",
    },
    summary: {
      uz: "IT studiya sayti va o‘zim yozgan CMS: kontent, narxlar, lidlar va analitika uch tilda boshqariladi.",
      ru: "Сайт IT-студии и собственная CMS: контент, цены, заявки и аналитика на трёх языках.",
      en: "An IT studio website with my own CMS: content, prices, leads and analytics in three languages.",
    },
    problem: {
      uz: "Studiya saytidagi xizmatlar, narxlar va loyihalarni dasturchisiz yangilab bo‘lmasdi.",
      ru: "Услуги, цены и проекты на сайте студии нельзя было обновить без разработчика.",
      en: "The studio’s services, prices and projects could not be updated without a developer.",
    },
    solution: {
      uz: "Webflow asosidagi sayt ustiga Node.js va Express’da CMS: kontent bazasi, rasm optimizatsiyasi, lid formalar, analitika va UZ, RU, EN tarjimalar.",
      ru: "Поверх сайта на Webflow — CMS на Node.js и Express: база контента, оптимизация изображений, формы заявок, аналитика и переводы UZ, RU, EN.",
      en: "A Node.js and Express CMS on top of a Webflow site: a content store, image optimisation, lead forms, analytics and UZ, RU, EN translations.",
    },
    features: [
      {
        uz: "Kontent, loyihalar va jamoani admin paneldan tahrirlash",
        ru: "Редактирование контента, проектов и команды из админ-панели",
        en: "Edit content, projects and team from the admin panel",
      },
      {
        uz: "UZ, RU va EN tarjimalar",
        ru: "Переводы UZ, RU и EN",
        en: "UZ, RU and EN translations",
      },
      {
        uz: "Lid formalar va tashrif analitikasi",
        ru: "Формы заявок и аналитика посещений",
        en: "Lead forms and visit analytics",
      },
      {
        uz: "Rasmlarni avtomatik WebP’ga siqish",
        ru: "Автоматическое сжатие изображений в WebP",
        en: "Automatic WebP image compression",
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Webflow", "Node.js", "Express", "sharp"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
