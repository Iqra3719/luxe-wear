export type Product = {
  id: string;
  name: string;
  price: number;
  fabric?: string;
  description?: string;
  /** Real photo path/URL. Absent items render as a gradient card with a
   *  centered label instead — see ProductCard.tsx. */
  image?: string;
  gradient?: string; // Tailwind gradient classes, used when `image` is absent
  label?: string; // centered text on the gradient card, e.g. "Khaddar Suit"
};

// Shown whenever Supabase isn't configured yet, a fetch fails, or the
// `products` table is empty — so the site never looks broken or blank.
// A handful of these now carry real photos (supplied by the boutique owner)
// under /public/images/; the rest still fall back to a labeled gradient
// card until a matching photo exists. Once real Supabase products exist,
// this file is bypassed entirely — see lib/getProducts.ts.
export const DEMO_PRODUCTS: Product[] = [
  { id: "demo-1", name: "Zara — Unstitched Lawn 3PC", price: 4590, fabric: "Lawn", image: "/images/suit-cream-pink.jpg" },
  { id: "demo-2", name: "Formal Karandi Suit", price: 6990, fabric: "Karandi", image: "/images/suit-rose-gold.jpg" },
  { id: "demo-3", name: "Khaddar Printed 2PC", price: 3690, fabric: "Khaddar", image: "/images/suit-sage-green.jpg" },
  { id: "demo-10", name: "Floral Embroidered 3PC", price: 4890, fabric: "Lawn", image: "/images/suit-lavender.jpg" },
  { id: "demo-4", name: "Sherwani-cut Shalwar Kameez", price: 5290, fabric: "Khaddar", image: "/images/product-kurta-black.jpg" },
  { id: "demo-5", name: "Formal Kurta Pajama", price: 4590, fabric: "Cotton", image: "/images/product-kurta-white.jpg" },
  { id: "demo-6", name: "Lawn Kurta — Casual Wear", price: 2890, fabric: "Lawn", image: "/images/product-kurta-blue.jpg" },
  { id: "demo-7", name: "King Size Cotton Bedsheet", price: 3450, fabric: "Cotton", image: "/images/product-bedsheet-floral.jpg" },
  { id: "demo-8", name: "Satin King Bedsheet Set", price: 3990, fabric: "Satin", image: "/images/product-bedsheet-satin.jpg" },
  { id: "demo-9", name: "Khaddar Winter Bedsheet", price: 3290, fabric: "Khaddar", image: "/images/product-bedsheet-check.jpg" },
];
