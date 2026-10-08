# Israel Weather

A small web app that shows the current weather in any locality in Israel.

## Features

- **Search** – type a locality name in Hebrew or English and pick it from the suggestions; the weather loads right away.
- **Current weather** – temperature, condition, feels-like temperature, humidity, wind and local time.
- **History** – every search is saved in the browser (`localStorage`) and shown on the History page. The history can be cleared.
- **About** – information about the site and the developer.

## Tech stack

- React 19 + TypeScript
- Vite
- React Router

## Data sources

- List of localities: [data.gov.il](https://data.gov.il) (Israeli government open data portal)
- Weather data: [weatherapi.com](https://www.weatherapi.com)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Get a free API key at [weatherapi.com](https://www.weatherapi.com) and create a `.env.local` file in the project root:

   ```
   VITE_WEATHER_API_KEY=your_api_key
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Then open the address shown in the terminal (usually http://localhost:5173).

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server               |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Project structure

```
src/
  pages/
    Home.tsx      – search and current weather
    History.tsx   – search history table
    About.tsx     – about the site
  App.tsx         – header, navigation and routes
  history.ts      – save / load / clear history in localStorage
  types.ts        – TypeScript types
  App.css         – styles
```

## Author

Ilya Borzyh
