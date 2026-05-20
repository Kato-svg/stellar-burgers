# Stellar Burgers

Веб-приложение для сборки и заказа бургеров онлайн. Пользователь выбирает ингредиенты, составляет бургер и оформляет заказ.

## Функциональность

- **Конструктор бургера** — выбор булки, соусов и начинок, подсчёт стоимости, оформление заказа
- **Лента заказов** — общая лента всех заказов в реальном времени
- **Личный кабинет** — история заказов пользователя, редактирование профиля
- **Авторизация** — регистрация, вход, восстановление и сброс пароля
- **Модальные окна** — детали ингредиента и информация о заказе открываются в модалке с отдельным URL

## Технологии

| Категория | Стек |
|-----------|------|
| UI | React 18, TypeScript |
| Состояние | Redux Toolkit, React Redux |
| Роутинг | React Router v6 |
| Сборка | Webpack 5 |
| Тесты | Jest, React Testing Library |
| E2E | Cypress |
| Компоненты | Storybook |

## Запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки (http://localhost:4000)
npm start

# Запуск unit-тестов
npm test

# E2E тесты
npm run cypress:open

# Storybook
npm run storybook
```

## Переменные окружения

Создайте файл `.env` в корне проекта (пример в `.env.example`):

```
BURGER_API_URL=https://norma.education-services.ru/api
```

## Структура проекта

```
src/
├── components/       # React-компоненты
│   └── ui/           # Presentational (UI) компоненты
├── pages/            # Страницы приложения
├── services/
│   ├── slices/       # Redux-слайсы
│   └── store.ts      # Конфигурация Redux store
└── utils/
    ├── burger-api.ts # Работа с API
    ├── types.ts      # TypeScript-типы
    └── hooks/        # Кастомные хуки
```

## Ссылки

- [Макет Figma](https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design)
