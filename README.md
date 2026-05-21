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

### Security headers

- **In-page policy:** a strict CSP is set via `<meta http-equiv="Content-Security-Policy">` in [`index.html`](index.html) (scripts, styles, fonts, images).
- **Subresource Integrity:** production builds use [`vite-plugin-sri-gen`](vite.config.js) to add `integrity` (and `crossorigin`) on bundled JS/CSS in `dist/index.html`. Google Fonts are excluded (dynamic third-party CSS).
- **HTTP response headers** (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, enforced `frame-ancestors`, CORP) are what most security scanners grade. GitHub Pages does **not** let you set those from the repository. Enable **Enforce HTTPS** under **Settings → Pages** for transport redirects; for full scanner scores you would need a header-capable CDN (e.g. Cloudflare Transform Rules on a custom domain).
- **Re-scan** the live site after deploy: `https://<your-username>.github.io/seating/` (not `vite preview` or localhost).

## Stack

- Vite, React, `react-router-dom` (`HashRouter`)
- MUI (`@mui/material`, Emotion, `@mui/icons-material`)
