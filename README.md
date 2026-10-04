# Luxe Wear PK — E-commerce Boutique

Next.js 14 (App Router) + Tailwind + Framer Motion, static-exported for
Netlify. Products are served from Supabase (a real, shared database) with
automatic fallback to demo products so the site is never blank.

## Quick start

```bash
npm install
npm run dev
```
Open http://localhost:3000. Works immediately with demo products — Supabase
is optional until you're ready for real daily posting (next section).

---

## Setting up Supabase (~10 minutes) — makes /admin real

Without this, `/admin` will tell you it isn't connected, and the site shows
demo products. With it, anything you post at `/admin` appears live for every
visitor, on every device — this is the actual fix for "post daily and
customers see it."

**1. Create a project** at supabase.com (free tier).

**2. Create the products table.** In Supabase's SQL Editor, run:

```sql
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price text not null,
  fabric text,
  description text,
  image_url text not null,
  created_at timestamp default now()
);

-- Row Level Security: required, or Supabase blocks all access by default.
alter table products enable row level security;

create policy "Public read" on products
  for select using (true);

create policy "Public insert" on products
  for insert with check (true);

create policy "Public delete" on products
  for delete using (true);
```

> WARNING: These policies allow anyone with your anon key (which is public,
> by design, in a static site's JS bundle) to insert or delete products —
> matching this build's "no real auth yet" admin panel. That's an
> intentional, explicit trade-off for getting daily-posting working fast,
> not an oversight. Once this matters for your business (it will, the
> moment a stranger finds /admin), add real Supabase Auth and rewrite
> these policies to check auth.uid() — happy to do that next.

**3. Create a storage bucket** for photos: Storage -> New bucket -> name it
exactly `product-images` -> toggle Public. Then in the SQL Editor:

```sql
create policy "Public read images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "Public upload images" on storage.objects
  for insert with check (bucket_id = 'product-images');
```

**4. Copy your credentials.** Project Settings -> API -> copy the Project
URL and the anon public key.

**5. Set them as environment variables** — where depends on how you deploy:

- **Drag-and-drop to Netlify:** create `.env.local` in this project (copy
  `.env.example`) with your real values, *then* run `npm run build`. Static
  export bakes these values into the build at this point — set them
  *before* building, not after.
- **Git-connected Netlify or Vercel:** add them in the dashboard under
  Site settings -> Environment variables, then trigger a deploy. The
  platform's own build step picks them up.

Either way: changing these later means rebuilding and redeploying — a
static-exported site can't read new environment variables after the fact.

---

## Using /admin to post products daily

Go to `/admin`, enter the password `luxe123`, then fill in name, price,
fabric, description, and upload a photo. On submit it uploads the photo to
Supabase Storage and inserts the product — it's live on `/` and `/shop` for
every visitor within seconds, no rebuild needed (this part *does* update
live, unlike the rest of the static site, because the product list is
fetched client-side from Supabase on each page load).

**The password is not real security** — it's a plain string sitting in the
site's public JavaScript, checked entirely in the browser. It stops casual
snooping, nothing more. Real protection needs Supabase Auth (or a Netlify
password-protected deploy) gating this specific route — worth doing before
this business depends on it.

---

## Deploying to Netlify

This project is configured for static export (`output: "export"` in
`next.config.mjs`), which is what makes drag-and-drop deploys possible.

```bash
npm install
npm run build
```
This generates an `/out` folder — drag that folder (not the project
source) onto Netlify's manual deploy box. Dragging the raw source (no
build) is what causes blank pages; there's no server there to run Next.js.

**Recommended once you're past the first deploy:** connect this repo to
Netlify via Git (New site -> Import from Git). Netlify then runs the build
itself on every push, using the included `netlify.toml` — no more manual
zip/drag-and-drop, and it's the more reliable place to manage the Supabase
environment variables above.

## Deploying to Vercel

Push to GitHub, import in Vercel, add the two NEXT_PUBLIC_SUPABASE_* env
vars in the Vercel dashboard. You can drop `output: "export"` from
`next.config.mjs` for a Vercel deploy if you want the Next/Image optimizer
back — Vercel doesn't need static export the way Netlify's drag-and-drop
does.

---

## Contact form & newsletter — Netlify Forms

`/contact` and the homepage newsletter signup both use Netlify Forms — no
backend, no email server needed. The form markup (data-netlify="true" + a
hidden form-name input) is baked into the static HTML at build time, which
is what Netlify's form-detection bot scans for; this works with
drag-and-drop deploys too, not just Git-connected ones. Submissions appear
in the Netlify dashboard under Site -> Forms after your first deploy.

---

## What's real vs. demo right now

- **Products:** `lib/getProducts.ts` fetches from Supabase client-side (this
  is a static-export site — there's no server to fetch on a visitor's
  behalf). If Supabase isn't configured, the fetch fails, or the table is
  empty, it shows `lib/demo-products.ts` instead — plain gradient cards with
  a label (e.g. "Khaddar Suit"), not real photos. I don't have an
  image-generation tool available, so I can't produce real product
  photography myself; real photos come from you via /admin's upload once
  Supabase is connected.
- **Cart:** genuinely localStorage-based, per your spec — that's fine for
  cart contents (one shopper, one device, one session) in a way it wasn't
  fine for the product catalog (many shoppers need to see the same
  inventory).
- **Contact/newsletter:** real, via Netlify Forms.
- **Admin auth:** not real security — see the callout above.

## Honesty about testing

I don't have internet access in this environment, so I can't run
`npm install` or `npm run build` myself to confirm a clean build — I've
reviewed every import and type by hand, but please run `npm run build`
locally before deploying and send me the exact error text if anything
fails. That's a fast fix for me with the real compiler output in hand,
versus guessing blind.

---

## Project structure

```
luxe-wear/
├── app/
│   ├── layout.tsx          Navbar, Footer, WhatsApp + LuxeAI widgets, CartProvider
│   ├── page.tsx            Home: Hero, Featured Products, Why Choose Us, Testimonials, YouTube, Newsletter
│   ├── shop/page.tsx       All products, fabric + price filters
│   ├── about/page.tsx      Brand story
│   ├── contact/page.tsx    Netlify Forms contact form + WhatsApp/YouTube/email
│   └── admin/page.tsx      Password-gated: post/delete products in Supabase
├── components/             Navbar, Footer, Hero, ProductCard, CartDrawer, LuxeAI, etc.
├── lib/
│   ├── supabase.ts         Supabase client (null-safe if not configured)
│   ├── getProducts.ts      Fetch + demo-product fallback logic
│   ├── demo-products.ts    The 9 gradient placeholder products
│   ├── cart-context.tsx    localStorage-based cart (React Context)
│   └── socials.ts          WhatsApp / YouTube / Instagram / email — single source of truth
├── .env.example
├── netlify.toml
└── next.config.mjs         output: "export", images.unoptimized + remotePatterns
```
