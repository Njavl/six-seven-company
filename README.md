# Tasteorama API — Team SIX SEVEN

REST API для застосунку рецептів **Tasteorama**: реєстрація та автентифікація
користувачів, пошук рецептів за категорією / інгредієнтом / назвою з пагінацією,
створення власних рецептів із завантаженням фото, обране та видалення власних рецептів.

Бекенд командного навчального проєкту (GoIT). Фронтенд (Next.js 15) — окремий репозиторій.

## Демо

| | |
|---|---|
| 🌐 API (Render) | https://six-seven-company.onrender.com |
| 📘 Swagger (жива документація) | https://six-seven-company.onrender.com/api-docs |
| 💻 Репозиторій | https://github.com/Njavl/six-seven-company |

> Хостинг на безкоштовному тарифі Render — перший запит після простою може «прокидати»
> сервіс кілька секунд.

## Технології

- **Node.js** (ESM, `"type": "module"`) + **Express 5**
- **MongoDB** через **Mongoose**
- Автентифікація на **httpOnly-cookie** з серверними сесіями (access / refresh)
- **Cloudinary** + **Multer** — завантаження та зберігання фото страв
- **Celebrate / Joi** — валідація запитів
- **Swagger UI** — документація ендпоінтів
- Деплой — **Render**

## Можливості

- 🔐 Реєстрація, логін, логаут; інформація про поточного користувача
- 🗂️ Список категорій та інгредієнтів
- 🔎 Пошук рецептів за категорією, інгредієнтом і назвою (підрядок) з пагінацією
- 📄 Деталі рецепта за id
- ➕ Створення власного рецепта з фото; список власних рецептів
- ⭐ Додавання / видалення з обраного; список обраного
- 🗑️ Видалення власного рецепта (з автоматичним прибиранням його з обраного в інших
  користувачів)
- 🧱 Центральний обробник помилок, CORS для фронтенду, документація Swagger

## Швидкий старт

1. Встанови залежності:

   ```bash
   npm install
   ```

2. Створи `.env` у корені за зразком `.env.example`:

   ```
   PORT=3000
   MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Tasteorama?appName=...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

   Ім'я бази `Tasteorama` має стояти в шляху одразу після хоста, перед `?`.

3. Запусти сервер:

   ```bash
   npm run dev
   ```

   Сервер підніметься на `http://localhost:3000`, документація — на `/api-docs`.

### Скрипти

| Команда | Що робить |
|---|---|
| `npm run dev` | запуск із автоперезавантаженням (nodemon) |
| `npm start` | звичайний запуск (`node src/index.js`) |
| `npm run lint` | перевірка ESLint для `src/` |
| `npx prettier --write .` | автоформатування |

## Ендпоінти

Усі шляхи з префіксом `/api`. 🔒 — приватний (потрібен токен).

| Метод | Шлях | Опис |
|---|---|---|
| `POST` | `/auth/register` | реєстрація |
| `POST` | `/auth/login` | логін |
| `POST` | 🔒 `/auth/logout` | логаут |
| `GET` | 🔒 `/users/current` | поточний користувач |
| `GET` | `/categories` | список категорій |
| `GET` | `/ingredients` | список інгредієнтів |
| `GET` | `/recipes/search` | пошук із пагінацією (`category`, `ingredient`, `search`, `page`, `perPage`) |
| `GET` | `/recipes/:recipeId` | деталі рецепта |
| `POST` | 🔒 `/recipes` | створити власний рецепт (multipart, фото `recipeImg`) |
| `GET` | 🔒 `/recipes/own` | список власних рецептів |
| `GET` | 🔒 `/recipes/favorites` | список обраного |
| `POST` | 🔒 `/recipes/:recipeId/favorite` | додати в обране |
| `DELETE` | 🔒 `/recipes/:recipeId/favorite` | прибрати з обраного |
| `DELETE` | 🔒 `/recipes/:recipeId` | видалити власний рецепт |

Повний опис параметрів, тіл запитів і відповідей — у Swagger UI `/api-docs`.

## Структура

Запит проходить через шари: `routes → controllers → services → models`. Кожен домен —
вертикальний зріз з однаковою назвою файлів
(`routes/recipes.js → controllers/recipes.js → services/recipes.js → models/recipe.js`).

```
src/
├── index.js            запуск: .env → підключення БД → app.listen
├── server.js           збірка Express: CORS, cookie, роутери, Swagger, обробники помилок
├── db/connection.js    підключення Mongoose
├── routes/             маршрути доменів
├── controllers/        HTTP-логіка (req → виклик сервісу → відповідь)
├── services/           робота з базою даних
├── models/             Mongoose-схеми
├── middlewares/        authenticate, upload, обробка 404 та помилок
├── validation/         схеми валідації запитів
└── docs/swagger.json   документація API
```

## Команда

Проєкт розроблено командою **SIX SEVEN** у межах навчального курсу GoIT.
