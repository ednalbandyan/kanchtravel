/* ============================================================
   KANCH TRAVEL — server.js
   Node.js + Express backend для сохранения заявок
   ============================================================

   КАК ЗАПУСТИТЬ СЕРВЕР:
   ─────────────────────
   1. Убедитесь, что установлен Node.js (https://nodejs.org)
   2. Откройте терминал в папке проекта
   3. Установите зависимости:
         npm init -y
         npm install express cors
   4. Запустите сервер:
         node server.js
   5. Сервер запустится на http://localhost:3000
   6. Заявки будут сохраняться в файл leads.txt

   ИЗМЕНИТЬ ПУТЬ СОХРАНЕНИЯ ФАЙЛА:
   ─────────────────────────────────
   Найдите константу LEADS_FILE ниже и укажите нужный путь.
   Примеры:
     './leads.txt'                          — в папке проекта
     'C:/Users/YourName/Desktop/leads.txt'  — на рабочем столе Windows
     '/home/user/kanch/leads.txt'           — абсолютный путь Linux/Mac

   ============================================================ */

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app = express();

/* ===== НАСТРОЙКИ ===== */
const PORT       = process.env.PORT || 3000;          /* Порт сервера */
const LEADS_FILE = path.join(__dirname, 'leads.txt'); /* << ПУТЬ К ФАЙЛУ С ЗАЯВКАМИ */

/* ===== MIDDLEWARE ===== */
app.use(cors({
  /* origin: 'https://kanchtravel.am', */ /* Раскомментируйте при деплое и укажите ваш домен */
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Раздаём статику (HTML, CSS, JS) — опционально */
app.use(express.static(path.join(__dirname)));

/* ===== МАРШРУТЫ ===== */

/* GET / — проверка работы сервера */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

/* POST /submit — приём заявки с формы */
app.post('/submit', (req, res) => {
  const { name, phone, email, message } = req.body;

  /* Валидация обязательных полей */
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  /* Формат строки в файле: Имя | Телефон | Email | Сообщение | Дата */
  const now       = new Date();
  const dateStr   = now.toLocaleString('ru-RU', { timeZone: 'Asia/Yerevan' });
  const leadLine  =
    `${name} | ${phone || '—'} | ${email} | ${message || '—'} | ${dateStr}\n`;

  /* Добавляем заявку в файл (append) */
  fs.appendFile(LEADS_FILE, leadLine, 'utf8', (err) => {
    if (err) {
      console.error('❌ Ошибка записи в файл:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to save lead.' });
    }

    console.log('✅ Новая заявка:', leadLine.trim());
    res.json({ success: true, message: 'Lead saved successfully.' });
  });
});

/* ===== ЗАПУСК ===== */
app.listen(PORT, () => {
  console.log(`\n🚀 Kanch Travel backend запущен:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Заявки сохраняются в: ${LEADS_FILE}\n`);
});
