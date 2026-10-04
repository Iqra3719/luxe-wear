"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/getProducts";
import { DEMO_PRODUCTS, type Product } from "@/lib/demo-products";
import { ProductCard } from "@/components/ProductCard";

export function FeaturedProducts() {
  // Start with demo products already in state — first paint never waits on
  // a network request, so this section is never blank while Supabase loads.
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then(({ products, isLive }) => {
      if (!cancelled) {
        setProducts(products);
        setIsLive(isLive);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="tracking-tracked text-xs text-gold mb-2">
            {isLive ? "FROM THE BOUTIQUE" : "PREVIEW"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">Featured Products</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 12).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
