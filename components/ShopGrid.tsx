"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/lib/getProducts";
import { DEMO_PRODUCTS, type Product } from "@/lib/demo-products";
import { ProductCard } from "@/components/ProductCard";

const FABRICS = ["Lawn", "Khaddar", "Karandi", "Cotton", "Satin"];

export function ShopGrid() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [isLive, setIsLive] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((res) => {
      if (!cancelled) {
        setProducts(res.products);
        setIsLive(res.isLive);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleFabric(fabric: string) {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(p.fabric ?? "")) return false;
      if (maxPrice !== "" && p.price > maxPrice) return false;
      return true;
    });
  }, [products, selectedFabrics, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="tracking-tracked text-xs text-gold mb-2">
            {isLive ? "LIVE CATALOG" : "PREVIEW — add real products at /admin"}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl">Shop All</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <p className="text-xs tracking-tracked text-ink/60 mb-3">FABRIC</p>
            <div className="space-y-2">
              {FABRICS.map((fabric) => (
                <label key={fabric} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFabrics.includes(fabric)}
                    onChange={() => toggleFabric(fabric)}
                    className="accent-gold"
                  />
                  {fabric}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-tracked text-ink/60 mb-3">MAX PRICE (RS.)</p>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 5000"
              className="w-full border border-black/15 rounded-sm px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>
          {(selectedFabrics.length > 0 || maxPrice !== "") && (
            <button
              onClick={() => {
                setSelectedFabrics([]);
                setMaxPrice("");
              }}
              className="text-xs underline text-ink/50"
            >
              Clear filters
            </button>
          )}
        </aside>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-sm text-ink/50">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
