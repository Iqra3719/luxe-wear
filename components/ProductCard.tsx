"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/demo-products";
import { useCart } from "@/lib/cart-context";
import { whatsappOrderLink } from "@/lib/socials";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [imgFailed, setImgFailed] = useState(false);
  const [added, setAdded] = useState(false);
  const showImage = product.image && !imgFailed;

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative h-56 md:h-64 rounded-sm overflow-hidden">
        {showImage ? (
          <Image
            src={product.image!}
            alt={product.name}
            width={400}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.gradient ?? "from-beige to-gold-soft"} flex items-center justify-center`}>
            <p className="font-serif text-lg text-charcoal/70 text-center px-4">
              {product.label ?? product.name}
            </p>
          </div>
        )}
      </div>

      <p className="text-[11px] tracking-tracked text-gold mt-3">
        {(product.fabric ?? "LUXE WEAR").toUpperCase()}
      </p>
      <p className="text-sm mt-1">{product.name}</p>
      <p className="font-serif text-base mt-1">Rs. {product.price.toLocaleString("en-PK")}</p>

      <div className="flex gap-2 mt-3">
        <a
          href={whatsappOrderLink(product.name)}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
        >
          <MessageCircle size={13} />
          Order
        </a>
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-full bg-charcoal text-ivory hover:bg-gold transition-colors"
        >
          {added ? <Check size={13} /> : <ShoppingBag size={13} />}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </motion.div>
  );
}
