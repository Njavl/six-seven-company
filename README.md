# Tasteorama Backend — Team SIX SEVEN

![SIX SEVEN](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWFqdjUyajhrd21yOGdvOXhsZHlwbWw0bWEzc3E5Zmoxcm55bHFqYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TpvnqBFOE0tVrnGU1h/giphy.gif)

## Швидкий старт

1. Клонуй репозиторій і встанови залежності:

   ```bash
   npm install
   ```

2. Створи файл `.env` у корені за зразком `.env.example`:

   ```
   PORT=3000
   MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Tasteorama?appName=...
   ```

   Ім'я бази `Tasteorama` має стояти в шляху одразу після хоста, перед `?`. Якщо при
   запуску бачиш помилку `querySrv ECONNREFUSED` — твій роутер блокує SRV-запити DNS;
   попроси у тимліда строку підключення у форматі `mongodb://` з явним списком хостів.

3. Запусти сервер:

   ```bash
   npm run dev
   ```

   Сервер підніметься на `http://localhost:3000`. Перевірка: запит на будь-який
   неіснуючий шлях, наприклад `GET http://localhost:3000/api/anything`, має повернути
   `404 {"message":"Route GET /api/anything not found"}`.

## Скрипти

| Команда | Що робить |
|---|---|
| `npm run dev` | запуск із автоперезавантаженням (nodemon) |
| `npm start` | звичайний запуск (`node src/index.js`) |
| `npm run lint` | перевірка ESLint для `src/` |
| `npx prettier --write .` | автоформатування |

## Як влаштований проєкт

Запит проходить через шари зверху вниз:

```
запит → routes (шлях + middleware) → controllers (HTTP-логіка) → services (робота з БД) → models (Mongoose-схеми)
```

```
src/
├── index.js              запуск: .env → підключення БД → app.listen     [ГОТОВО, не чіпати]
├── server.js             збірка Express: CORS, json, роутери, обробники [спільний файл]
├── db/connection.js      підключення Mongoose                           [ГОТОВО]
├── routes/               опис маршрутів домену
├── controllers/          обробники запитів: дістати дані з req,
│                         викликати сервіс, віддати відповідь
├── services/             уся робота з базою даних
├── models/               Mongoose-схеми колекцій
├── middlewares/
│   ├── notfound.js       404 для неіснуючих шляхів                     [ГОТОВО]
│   ├── errorhandler.js   центральний обробник помилок                  [ГОТОВО]
│   ├── authenticate.js   перевірка токена для приватних маршрутів
│   ├── validatebody.js   валідація тіла запиту за схемою
│   └── upload.js         завантаження фото страви
├── validation/           схеми валідації тіла запитів
├── constants/            спільні константи
├── utils/                допоміжні функції
└── docs/swagger.json     Swagger-документація ендпоінтів
```

Кожен домен — це вертикальний зріз із чотирьох файлів з однаковою назвою:
`routes/recipes.js → controllers/recipes.js → services/recipes.js → models/recipe.js`.
Працюй у файлах свого домену — так ми майже не конфліктуємо при злитті гілок.

**Спільні файли** (`server.js`, `middlewares/`, `package.json`) зачіпають усіх:
перед зміною попередь команду.

## Як додати свій ендпоінт

1. У `models/` опиши Mongoose-схему (якщо її ще немає).
2. У `services/` напиши функцію, що працює з моделлю.
3. У `controllers/` напиши обробник: валідація → виклик сервісу → відповідь.
   Помилки не ковтай — передавай в `next(error)`, центральний обробник поверне `{"message": ...}` зі статусом з `error.status` (або 500).
4. У `routes/` повісь обробник на шлях. Роутер уже підключений у `server.js` — нічого там додавати не треба.
5. Задокументуй ендпоінт у `docs/swagger.json`.

## Ендпоінти за ТЗ

Усі шляхи з префіксом `/api`. 🔒 — приватний (потрібен токен, middleware `authenticate`).

| Домен | Ендпоінти |
|---|---|
| `/api/auth` | реєстрація, логін, 🔒 логаут |
| `/api/users` | 🔒 інформація про поточного користувача |
| `/api/categories` | список категорій |
| `/api/ingredients` | список інгредієнтів |
| `/api/recipes` | пошук за категорією / інгредієнтом / назвою з пагінацією; рецепт за id; 🔒 створити свій; 🔒 список своїх; 🔒 додати в улюблені; 🔒 видалити з улюблених; 🔒 список улюблених |

## Правила коду

- Іменування: `camelCase` для змінних, `PascalCase` для класів, `UPPER_SNAKE_CASE` для констант. Імена файлів — тільки малі англійські літери, без пробілів.
- Форматування — Prettier (конфіг у корені), лінт — ESLint. Перед комітом:  `npm run lint`.
- Жодних `console.log` у фінальному коді.
- Секрети — тільки через `.env` (він у `.gitignore`). Додаєш нову змінну оточення —  додай її ім'я в `.env.example`.

## Задачі та гілки

Постановка задач — у Git Board команди. Питання щодо гілок, злиття та доступів — до тимліда.
