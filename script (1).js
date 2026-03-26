/* ============================================================
   KANCH TRAVEL — script.js
   ============================================================
   Содержит:
   1. Мультиязычность (объект translations)
   2. Навигация — header scroll, бургер-меню
   3. Анимации при скролле (IntersectionObserver)
   4. Слайдер отзывов
   5. Обработка формы заявки (отправка на Node.js сервер)
   ============================================================ */

/* ============================================================
   1. TRANSLATIONS
   Здесь хранятся все тексты на трёх языках.
   Для добавления нового языка — добавьте ключ в этот объект.
   ============================================================ */
const translations = {

  ru: {
    /* Навигация */
    nav_home:    'Главная',
    nav_tours:   'Туры',
    nav_why:     'О нас',
    nav_reviews: 'Отзывы',
    nav_contact: 'Контакты',

    /* Hero */
    hero_eyebrow: 'Туристическое агентство',
    hero_title:   'Откройте душу Армении',
    hero_sub:     'Древние монастыри, величественные горы, живая история — мы создаём путешествия, которые остаются с вами навсегда.',
    hero_cta:     'Оставить заявку',

    /* Tours */
    tours_eyebrow: 'Наши программы',
    tours_title:   'Популярные туры',
    tours_sub:     'Выберите маршрут, который подходит именно вам',
    tour1_badge:   'Хит',
    tour1_title:   'Классическая Армения',
    tour1_desc:    '7 дней по главным жемчужинам страны: Ереван, Гегард, Гарни, Нораванк, Татев.',
    tour1_duration:'7 дней',
    tour2_badge:   'Природа',
    tour2_title:   'Горный треккинг',
    tour2_desc:    'Хайкинг по Дилижану, Лорийскому ущелью и склонам Арагаца с опытными гидами.',
    tour2_duration:'5 дней',
    tour3_badge:   'Гастро',
    tour3_title:   'Гастрономический тур',
    tour3_desc:    'Армянская кухня, виноделие Арени, мастер-классы и рынки — путешествие через вкус.',
    tour3_duration:'4 дня',
    tour4_badge:   'Эксклюзив',
    tour4_title:   'Древние монастыри',
    tour4_desc:    'Хор Вирап у подножия Арарата, Нораванк, Агарцин — духовные места с историей тысячелетий.',
    tour4_duration:'3 дня',
    card_cta:      'Подробнее',

    /* Why */
    why_eyebrow: 'Наши преимущества',
    why_title:   'Почему выбирают нас',
    why1_title:  '10 лет опыта',
    why1_desc:   'Более десяти лет мы открываем Армению путешественникам со всего мира.',
    why2_title:  'Локальные гиды',
    why2_desc:   'Наши гиды — местные жители, влюблённые в свою страну и готовые делиться её секретами.',
    why3_title:  'Лучшие маршруты',
    why3_desc:   'Тщательно отобранные маршруты, сочетающие культуру, природу и местный колорит.',
    why4_title:  'Поддержка 24/7',
    why4_desc:   'Мы на связи до, во время и после тура — любой вопрос решается быстро.',

    /* Reviews */
    reviews_eyebrow: 'Что говорят клиенты',
    reviews_title:   'Отзывы путешественников',
    rev1_text:  '"Лучшее путешествие в моей жизни. Гид Арам знал каждый камень в Гегарде — это было волшебно."',
    rev1_name:  'Анна Петрова',
    rev1_city:  'Москва, Россия',
    rev2_text:  '"Организация на высшем уровне. Все детали продуманы, не нужно ни о чём думать — просто наслаждаться."',
    rev2_name:  'Michael Weber',
    rev2_city:  'Берлин, Германия',
    rev3_text:  '"Гастрономический тур превзошёл все ожидания. Вино Арени, долма, хаш — уехала с рецептами и душой, полной тепла."',
    rev3_name:  'Сато Налбандян',
    rev3_city:  'Ереван, Армения',
    rev4_text:  '"Отличный треккинг по Лорийскому ущелью. Природа потрясающая, гиды профессиональные. Обязательно вернусь!"',
    rev4_name:  'Дмитрий Коваль',
    rev4_city:  'Киев, Украина',

    /* Lead form */
    lead_eyebrow: 'Готовы к путешествию?',
    lead_title:   'Оставьте заявку',
    lead_sub:     'Мы свяжемся с вами в течение 2 часов и подберём идеальный тур.',
    form_name:    'Ваше имя',
    form_phone:   'Телефон',
    form_email:   'Email',
    form_msg:     'Сообщение / пожелания',
    form_submit:  'Отправить заявку',
    form_success: '✓ Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
    form_error:   '✗ Ошибка отправки. Пожалуйста, попробуйте ещё раз.',

    /* Contacts */
    contact_eyebrow: 'Свяжитесь с нами',
    contact_title:   'Контакты',
    contact_addr:    'ул. Абовяна 12, Ереван, Армения',

    /* Footer */
    footer_copy: '© 2025 Kanch Travel. Все права защищены.',
  },

  /* -------- АРМЯНСКИЙ -------- */
  hy: {
    nav_home:    'Գլխավոր',
    nav_tours:   'Տուրեր',
    nav_why:     'Մեր մասին',
    nav_reviews: 'Կարծիքներ',
    nav_contact: 'Կապ',

    hero_eyebrow: 'Զբոսաշրջային գործակալություն',
    hero_title:   'Բացահայտեք Հայաստանի հոգին',
    hero_sub:     'Հին վանքեր, վեհ լեռներ, կենդանի պատմություն — ստեղծում ենք ճամփորդություններ, որոնք մնում են ձեզ հետ ընդմիշտ։',
    hero_cta:     'Թողնել հայտ',

    tours_eyebrow: 'Մեր ծրագրերը',
    tours_title:   'Հայտնի տուրեր',
    tours_sub:     'Ընտրեք ձեզ հարիր երթուղին',
    tour1_badge:   'Հիթ',
    tour1_title:   'Դասական Հայաստան',
    tour1_desc:    '7 օր երկրի գլխավոր գոհարներով. Երևան, Գեղարդ, Գառնի, Նորավանք, Տաթև։',
    tour1_duration:'7 օր',
    tour2_badge:   'Բնություն',
    tour2_title:   'Լեռնային արշավ',
    tour2_desc:    'Հայքինգ Դիլիջանով, Լոռու կիրճով և Արագածի լանջերով՝ փորձառու ուղեկցողների հետ։',
    tour2_duration:'5 օր',
    tour3_badge:   'Գաստրո',
    tour3_title:   'Գաստրոնոմիկ տուր',
    tour3_desc:    'Հայկական խոհանոց, Արենու գինեգործություն, վարպետ դասեր — ճամփորդություն ճաշակի միջոցով։',
    tour3_duration:'4 օր',
    tour4_badge:   'Էքսկլուզիվ',
    tour4_title:   'Հին վանքեր',
    tour4_desc:    'Խոր Վիրապ Արարատի ստորոտին, Նորավանք, Հաղարծին — հոգևոր վայրեր հազարամյա պատմությամբ։',
    tour4_duration:'3 օր',
    card_cta:      'Մանրամասն',

    why_eyebrow: 'Մեր առավելությունները',
    why_title:   'Ինչու են ընտրում մեզ',
    why1_title:  '10 տարի փորձ',
    why1_desc:   'Ավելի քան տասը տարի բացում ենք Հայաստանը ամբողջ աշխարհի ճամփորդների համար։',
    why2_title:  'Տեղական ուղեկցողներ',
    why2_desc:   'Մեր ուղեկցողները տեղի բնակիչներ են, ովքեր սիրով կիսում են հայրենի երկրի գաղտնիքները։',
    why3_title:  'Լավագույն երթուղիներ',
    why3_desc:   'Ուշադիր ընտրված երթուղիներ, որոնք միավորում են մշակույթ, բնություն և տեղական գույն։',
    why4_title:  'Աջակցություն 24/7',
    why4_desc:   'Կապի մեջ ենք տուրից առաջ, ընթացքում և հետո — ցանկացած հարց արագ լուծվում է։',

    reviews_eyebrow: 'Ինչ ասում են հաճախորդները',
    reviews_title:   'Ճամփորդների կարծիքները',
    rev1_text:  '«Կյանքիս լավագույն ճամփորդությունը։ Ուղեկցող Արամն Գեղարդի յուրաքանչյուր քար գիտեր — կախարդական էր։»',
    rev1_name:  'Աննա Պետրովա',
    rev1_city:  'Մոսկվա, Ռուսաստան',
    rev2_text:  '«Կազմակերպությունը բարձրագույն մակարդակի է։ Բոլոր մանրամասները մտածված են, ոչ մի բանի մասին պետք չէ մտածել — պարզապես վայելել։»',
    rev2_name:  'Michael Weber',
    rev2_city:  'Բեռլին, Գերմանիա',
    rev3_text:  '«Գաստրոնոմիկ տուրն անցնց բոլոր սպասելիքներից։ Արենու գինի, դոլմա, խաշ — հեռացա բաղադրատոմսերով ու ջերմ հոգով։»',
    rev3_name:  'Սաթո Նալբանդյան',
    rev3_city:  'Երևան, Հայաստան',
    rev4_text:  '«Հիանալի հայքինգ Լոռու կիրճով։ Բնությունը ապշեցնող է, ուղեկցողները մասնագիտական։ Անպայման կվերադառնամ!»',
    rev4_name:  'Դմիտրի Կովալ',
    rev4_city:  'Կիև, Ուկրաինա',

    lead_eyebrow: 'Պատրա՞ստ եք ճամփորդության',
    lead_title:   'Թողնել հայտ',
    lead_sub:     'Կապ կհաստատենք ձեզ հետ 2 ժամվա ընթացքում և կընտրենք իդեալական տուրը։',
    form_name:    'Ձեր անունը',
    form_phone:   'Հեռախոս',
    form_email:   'Էլ. փոստ',
    form_msg:     'Հաղորդագրություն / ցանկություններ',
    form_submit:  'Ուղարկել հայտ',
    form_success: '✓ Հայտն ուղարկված է! Կապ կհաստատենք ձեզ հետ շուտով։',
    form_error:   '✗ Ուղարկման սխալ։ Խնդրում ենք կրկին փորձել։',

    contact_eyebrow: 'Կապ հաստատեք',
    contact_title:   'Կոնտակտներ',
    contact_addr:    'Աբովյան 12, Երևան, Հայաստան',

    footer_copy: '© 2025 Kanch Travel. Բոլոր իրավունքները պաշտպանված են։',
  },

  /* -------- ENGLISH -------- */
  en: {
    nav_home:    'Home',
    nav_tours:   'Tours',
    nav_why:     'About',
    nav_reviews: 'Reviews',
    nav_contact: 'Contact',

    hero_eyebrow: 'Travel Agency',
    hero_title:   'Discover the Soul of Armenia',
    hero_sub:     'Ancient monasteries, majestic mountains, living history — we craft journeys that stay with you forever.',
    hero_cta:     'Get in Touch',

    tours_eyebrow: 'Our Programs',
    tours_title:   'Popular Tours',
    tours_sub:     'Choose the route that is right for you',
    tour1_badge:   'Bestseller',
    tour1_title:   'Classic Armenia',
    tour1_desc:    '7 days through the country\'s greatest gems: Yerevan, Geghard, Garni, Noravank, Tatev.',
    tour1_duration:'7 days',
    tour2_badge:   'Nature',
    tour2_title:   'Mountain Trekking',
    tour2_desc:    'Hiking through Dilijan, the Lori Gorge and the slopes of Aragats with experienced guides.',
    tour2_duration:'5 days',
    tour3_badge:   'Gastro',
    tour3_title:   'Gastronomic Tour',
    tour3_desc:    'Armenian cuisine, Areni winemaking, master classes and markets — a journey through taste.',
    tour3_duration:'4 days',
    tour4_badge:   'Exclusive',
    tour4_title:   'Ancient Monasteries',
    tour4_desc:    'Khor Virap at the foot of Ararat, Noravank, Haghartsin — spiritual sites with millennia of history.',
    tour4_duration:'3 days',
    card_cta:      'Learn More',

    why_eyebrow: 'Our Advantages',
    why_title:   'Why Choose Us',
    why1_title:  '10 Years of Experience',
    why1_desc:   'For over a decade we have been opening Armenia to travellers from around the world.',
    why2_title:  'Local Guides',
    why2_desc:   'Our guides are locals who love their country and are eager to share its secrets.',
    why3_title:  'Best Routes',
    why3_desc:   'Carefully curated itineraries combining culture, nature and authentic local flavour.',
    why4_title:  '24/7 Support',
    why4_desc:   'We are available before, during and after your tour — every question resolved quickly.',

    reviews_eyebrow: 'What Clients Say',
    reviews_title:   'Traveller Reviews',
    rev1_text:  '"The best trip of my life. Guide Aram knew every stone in Geghard — it was magical."',
    rev1_name:  'Anna Petrova',
    rev1_city:  'Moscow, Russia',
    rev2_text:  '"Flawless organisation. Every detail is thought through — you don\'t need to worry about anything, just enjoy."',
    rev2_name:  'Michael Weber',
    rev2_city:  'Berlin, Germany',
    rev3_text:  '"The gastronomic tour exceeded all expectations. Areni wine, dolma, khash — I left with recipes and a heart full of warmth."',
    rev3_name:  'Sato Nalbandyan',
    rev3_city:  'Yerevan, Armenia',
    rev4_text:  '"Excellent trekking through the Lori Gorge. Stunning nature, professional guides. I will definitely be back!"',
    rev4_name:  'Dmitry Koval',
    rev4_city:  'Kyiv, Ukraine',

    lead_eyebrow: 'Ready to Travel?',
    lead_title:   'Send a Request',
    lead_sub:     'We will contact you within 2 hours and find the perfect tour for you.',
    form_name:    'Your Name',
    form_phone:   'Phone',
    form_email:   'Email',
    form_msg:     'Message / wishes',
    form_submit:  'Send Request',
    form_success: '✓ Request sent! We will get in touch with you shortly.',
    form_error:   '✗ Submission failed. Please try again.',

    contact_eyebrow: 'Get in Touch',
    contact_title:   'Contact Us',
    contact_addr:    '12 Abovyan St, Yerevan, Armenia',

    footer_copy: '© 2025 Kanch Travel. All rights reserved.',
  },
};

/* ============================================================
   2. LANGUAGE SWITCHER
   ============================================================ */
let currentLang = 'ru';

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  /* Обновляем все элементы с data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      /* Для textarea / input обновляем placeholder, для остальных — innerHTML */
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  /* Подсветка активной кнопки языка */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* Атрибут lang у <html> для SEO и скринридеров */
  document.documentElement.lang = lang;
}

/* Вешаем клики на кнопки */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

/* ============================================================
   3. HEADER — прилипание при скролле
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   4. БУРГЕР-МЕНЮ
   ============================================================ */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

/* Закрываем при клике на ссылку */
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  });
});

/* ============================================================
   5. АНИМАЦИИ ПОЯВЛЕНИЯ (IntersectionObserver)
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); /* Анимация только один раз */
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   6. СЛАЙДЕР ОТЗЫВОВ
   ============================================================ */
(function initSlider() {
  const track  = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (!track) return;

  const cards = Array.from(track.children);
  let current = 0;

  /* Определяем количество видимых карточек */
  function visibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  /* Создаём точки */
  function buildDots() {
    dotsEl.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Слайд ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    dotsEl.querySelectorAll('.slider__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    /* Ширина одной карточки + gap */
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* Авто-листание каждые 5 секунд */
  let autoplay = setInterval(() => {
    goTo(current < maxIndex() ? current + 1 : 0);
  }, 5000);

  /* Пауза при наведении */
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      goTo(current < maxIndex() ? current + 1 : 0);
    }, 5000);
  });

  /* Touch-свайп */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  /* Перестраиваем при ресайзе */
  window.addEventListener('resize', () => { buildDots(); goTo(current); }, { passive: true });

  buildDots();
  goTo(0);
})();

/* ============================================================
   7. ФОРМА ЗАЯВКИ
   ============================================================
   Отправка данных на Node.js сервер (server.js).

   КАК ПОДКЛЮЧИТЬ BACKEND:
   1. Установите Node.js и npm
   2. В папке проекта выполните: npm install express cors
   3. Запустите: node server.js
   4. Сервер будет слушать http://localhost:3000
   5. Раскомментируйте строку с реальным URL ниже

   Если backend не запущен — форма выведет mock-ответ.
   ============================================================ */
const leadForm   = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');

/* URL бэкенда: замените на ваш реальный адрес при деплое */
const BACKEND_URL = 'http://localhost:3000/submit';

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = leadForm.querySelector('[type="submit"]');
  const t = translations[currentLang];

  /* Блокируем кнопку на время отправки */
  submitBtn.disabled = true;
  submitBtn.textContent = '...';
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  const payload = {
    name:    document.getElementById('fname').value.trim(),
    phone:   document.getElementById('fphone').value.trim(),
    email:   document.getElementById('femail').value.trim(),
    message: document.getElementById('fmsg').value.trim(),
  };

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      formStatus.className = 'form-status success';
      formStatus.textContent = t.form_success;
      leadForm.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    /* Если бэкенд недоступен — показываем mock-успех для демо */
    console.warn('Backend unavailable — showing mock success.');
    formStatus.className = 'form-status success';
    formStatus.textContent = t.form_success + ' (demo mode)';
    leadForm.reset();
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t.form_submit;

    /* Прячем уведомление через 6 секунд */
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 6000);
  }
});

/* ============================================================
   8. ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
/* Применяем язык по умолчанию (RU) при загрузке */
applyLanguage('ru');
