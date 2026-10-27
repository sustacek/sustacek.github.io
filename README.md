# josefsustacek.cz

Source of https://www.josefsustacek.cz/, built with [Docusaurus](https://docusaurus.io/) and
deployed to GitHub Pages (`gh-pages` branch) by GitHub Actions.

## Requirements

* Node.js 26 (see `.nvmrc`)
* [pnpm](https://pnpm.io/) (version pinned in `package.json` -> `packageManager`; use `corepack enable`)

## Local development

```bash
pnpm install
pnpm start      # dev server with live reload at http://localhost:3000
pnpm build      # production build into ./build
pnpm serve      # serve the production build locally
```

## Structure

| Path                      | Content                                         |
|---------------------------|-------------------------------------------------|
| `src/pages/`              | Home, About, Contact, Personal Finance, Solar   |
| `src/blog/`               | Blog posts (`YYYY-MM-DD-slug.md`)               |
| `src/diy/`                | DIY section (served at `/diy`, with a sidebar)  |
| `src/static/`             | Files served as-is: resume, certificates, CNAME |
| `docusaurus.config.js`    | Site config, navbar, footer, redirects          |
| `.github/workflows/`      | Build and deploy workflow                       |

## Deployment

`.github/workflows/deploy.yml` builds the site on every pull request and on every push to `main`;
pushes to `main` (and manual runs) additionally publish `./build` to the `gh-pages` branch using
[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages).

In the repository settings, **Pages -> Build and deployment -> Source** has to be
*Deploy from a branch*, branch `gh-pages`, folder `/ (root)`. The custom domain is kept by
`src/static/CNAME`.
