/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces an /out folder of plain HTML/CSS/JS that you can
  // drag-and-drop onto Netlify (or any static host). Run `npm run build`
  // locally, then drag the generated /out folder — not the project source —
  // onto Netlify's manual deploy box.
  //
  // Trade-off: this disables Next.js server features (SSR, API routes,
  // Next/Image's optimizer). For a growing store, connecting this repo to
  // Netlify/Vercel via Git instead (letting their build system run
  // `next build` for you) is more robust and keeps those features — see
  // the README for both options.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
