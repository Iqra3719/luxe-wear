import { supabase, isSupabaseConfigured } from "./supabase";
import { DEMO_PRODUCTS, type Product } from "./demo-products";

function parsePrice(raw: unknown): number {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

type SupabaseProductRow = {
  id: string;
  name: string;
  price: string | number;
  fabric: string | null;
  description: string | null;
  image_url: string;
};

/**
 * Client-side fetch (this is a static-export site — there is no server to
 * fetch on a visitor's behalf, so this must run in the browser). Falls back
 * to DEMO_PRODUCTS whenever Supabase isn't configured, the request fails, or
 * the table is empty — the homepage/shop should never show nothing.
 */
export async function fetchProducts(): Promise<{ products: Product[]; isLive: boolean }> {
  if (!isSupabaseConfigured || !supabase) {
    return { products: DEMO_PRODUCTS, isLive: false };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, fabric, description, image_url")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return { products: DEMO_PRODUCTS, isLive: false };
    }

    const products: Product[] = (data as SupabaseProductRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      price: parsePrice(row.price),
      fabric: row.fabric ?? undefined,
      description: row.description ?? undefined,
      image: row.image_url,
    }));

    return { products, isLive: true };
  } catch {
    return { products: DEMO_PRODUCTS, isLive: false };
  }
}
