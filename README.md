# Manchester Auto Cars

A production-ready website for an independent used car dealership in Manchester, UK. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Decap CMS, with content stored as flat files in Git so the whole site can be deployed to Vercel with no database.

## Tech stack

- **Next.js 14** (App Router, static generation)
- **TypeScript**
- **Tailwind CSS** — custom black / gold / off-white design system
- **Framer Motion** — page and gallery animations, respects `prefers-reduced-motion`
- **Decap CMS** — content editing at `/admin`
- **Content as files** — Markdown + JSON in `/content`, no database required
- **Vercel** — recommended hosting

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To edit content locally without connecting to GitHub, run the Decap local backend in a second terminal:

```bash
npx decap-server
```

Then visit `http://localhost:3000/admin` — `local_backend: true` in `public/admin/config.yml` will route content changes straight to your local filesystem.

## Project structure

```
content/
  cars/          # one Markdown file per vehicle (frontmatter + description)
  offers/        # one Markdown file per offer/promotion
  settings/
    general.json # business details, opening hours, homepage copy

src/
  app/           # Next.js App Router pages
    page.tsx           → homepage
    cars/page.tsx       → available cars listing + filters
    cars/[slug]/page.tsx → individual vehicle page
    sell-swap/page.tsx  → sell/swap page
    offers/page.tsx     → offers page
    contact/page.tsx    → contact page
    sitemap.ts / robots.ts
  components/    # reusable UI (VehicleCard, ImageGallery, SellSwapForm, etc.)
  lib/           # content loaders (cars.ts, offers.ts, settings.ts) + formatting/WhatsApp helpers
  types/         # shared TypeScript types

public/
  admin/         # Decap CMS (index.html + config.yml)
  images/uploads # where CMS-uploaded images land by default
```

Cars, offers and settings are all read directly from the filesystem at build time (`fs` + `gray-matter`), so every page is statically generated — no runtime database calls.

## Decap CMS setup

The CMS lives at **`/admin`** on your deployed site and lets the business owner:

- Add, edit and delete cars, including multiple photos and a main featured image
- Update prices, specifications and descriptions
- Mark cars as **Available**, **Reserved** or **Sold**
- Toggle **Featured Vehicle** for the homepage strip
- Add and manage **Offers** (title, description, image, CTA, active flag, expiry date)
- Update business details, phone/WhatsApp numbers, opening hours and homepage copy — all from **Website Settings**

### Authenticating Decap CMS with GitHub (required for production)

Decap's `github` backend needs an OAuth proxy to exchange a GitHub login for a token, since Vercel doesn't provide one built in (unlike Netlify). Pick one:

**Option A — Netlify OAuth proxy (quickest)**
1. Create a free Netlify account and a new site — it doesn't need to serve any content; it exists only to host the OAuth callback.
2. In that Netlify site's settings, enable **Identity** → **Git Gateway** is not needed; instead register a **GitHub OAuth App** at `github.com/settings/developers`, and add the client ID/secret under Netlify **Site settings → Access control → OAuth**.
3. In `public/admin/config.yml`, set:
   ```yaml
   backend:
     name: github
     repo: your-username/manchester-auto-cars
     branch: main
     base_url: https://your-netlify-site.netlify.app
   ```

**Option B — Self-hosted OAuth provider**
Deploy a small OAuth provider (e.g. [`decap-cms-oauth-provider`](https://github.com/vencax/netlify-cms-oauth-provider) or a Vercel serverless function) using `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET` from `.env.example`, then point `base_url` at it the same way.

Once `base_url` is set and the repo is pushed to GitHub, editors log in at `/admin` with their GitHub account and commits are made straight to the `content/` folder — Vercel then rebuilds automatically.

### Editing images

By default, CMS image uploads are committed into `public/images/uploads` alongside your code. This is fine for a small number of cars. If the dealership grows toward the ~100 vehicles mentioned in the brief, swap in Cloudinary:

1. Create a Cloudinary account and add the three `CLOUDINARY_*` variables from `.env.example`.
2. Change the `media_folder`/`public_folder` in `public/admin/config.yml` to Decap's [Cloudinary media library integration](https://decapcms.org/docs/cloudinary/), or wire up `next/image`'s `loader` to Cloudinary.

This keeps the Git repository small and avoids slow clones/builds full of binary images.

## WhatsApp & call integrations

- **Sell/Swap form** (`SellSwapForm.tsx`) builds a `wa.me` link with the registration, mileage and phone number pre-filled, exactly matching the message format in the brief, and opens it in a new tab.
- **Car detail pages** build a WhatsApp enquiry link that automatically includes the vehicle name.
- **Call Now** buttons use plain `tel:` links, which work everywhere without JavaScript.

All WhatsApp/phone numbers are read from `content/settings/general.json`, so updating them via the CMS updates every button on the site.

## SEO

- Per-page metadata (title templates, descriptions, Open Graph, Twitter cards) via the App Router `metadata` API
- Dynamic metadata generated per vehicle from its own content
- `sitemap.xml` and `robots.txt` generated from live content (`src/app/sitemap.ts`, `src/app/robots.ts`)
- JSON-LD structured data: `AutoDealer` (site-wide) and `Vehicle`/`Offer` (per car)

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it into Vercel — framework preset "Next.js" is detected automatically, no configuration needed.
3. Add any environment variables from `.env.example` you actually use (most are optional).
4. Set up the Decap CMS OAuth proxy as described above, and update `public/admin/config.yml` with your real `repo` and `base_url`.
5. Deploy. The CMS will be live at `yourdomain.com/admin`.

## Before going live

- Replace the sample vehicles in `content/cars` and offers in `content/offers` with real stock and real photography.
- Replace the placeholder Unsplash image URLs used in the sample content with your own photos (via the CMS media uploader).
- Update `content/settings/general.json` with the real phone number, WhatsApp number, email, address and opening hours.
- Update the GitHub repo name in `public/admin/config.yml`.
- Replace `public/favicon.ico`/add an Open Graph image if you want a custom social preview image beyond the default metadata.
