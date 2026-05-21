# Fayaaz & Ayisha · Seating

Wedding guest seating lookup for **Fayaaz and Ayisha** (19 July 2026). Guests search by name to find their table assignment.

Built with **React** (Vite), **Material UI**, a **fullscreen mobile-first** shell (app bar, scrollable body, bottom tabs), **HashRouter** navigation, and deployment to **GitHub Pages** via GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

A strict Content-Security-Policy is set via `<meta http-equiv="Content-Security-Policy">` in [`index.html`](index.html). That policy is tuned for the production build; `npm run dev` (Vite HMR) may log CSP errors for WebSocket or inline dev scripts. Use `npm run build && npm run preview` to verify CSP the same way GitHub Pages serves the app.

## Production build (local check)

```bash
npm run build
npm run preview
```

`preview` serves the built `dist/` folder so you can confirm assets and routes before pushing.

## GitHub Pages

1. In the repository: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push to **`main`**. The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds the app and publishes the `dist` output to Pages.
3. Open your site at:

   `https://<your-username>.github.io/seating/`

   Hash routes look like `https://<your-username>.github.io/seating/#/about`.

### Base path

[`vite.config.js`](vite.config.js) sets `base: '/seating/'` so assets resolve on a **project** GitHub Pages URL (`/<repo>/`). If you **rename the repository**, update `base` to `/<new-repo-name>/`. For a **user or org site** at the domain root (`username.github.io`), use `base: '/'` instead.

## Stack

- Vite, React, `react-router-dom` (`HashRouter`)
- MUI (`@mui/material`, Emotion, `@mui/icons-material`)
