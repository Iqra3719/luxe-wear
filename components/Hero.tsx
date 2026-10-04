"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

// Purely decorative — the hero renders instantly with no async fetch, so it
// uses the local demo catalog (not a live Supabase fetch). Prefers items
// that have a real photo, falling back to the first two either way.
const withPhotos = DEMO_PRODUCTS.filter((p) => p.image);
const spotlight = (withPhotos.length >= 2 ? withPhotos : DEMO_PRODUCTS).slice(0, 2);

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-14">
      <div className="grid md:grid-cols-5 gap-4 md:gap-6">
        {/* LEFT — brand illustration */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:col-span-3 relative rounded-sm overflow-hidden min-h-[460px] md:min-h-[600px] bg-gradient-to-br from-charcoal via-[#3a2f22] to-gold flex items-end"
        >
          <div className="absolute inset-0 fabric-weave opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="absolute right-4 top-4 bottom-4 md:right-10 md:top-10 md:bottom-10 w-[46%] md:w-[38%]"
          >
            <Image
              src="/logo-illustration.png"
              alt="Luxe Wear"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </motion.div>
          <div className="relative z-10 p-6 md:p-10 text-ivory">
            <p className="tracking-tracked text-xs mb-3 text-gold-soft">
              NEW SEASON
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-md">
              Unstitched, <em className="italic font-normal">unhurried.</em>
            </h1>
            <p className="mt-4 max-w-sm text-sm text-beige/90">
              Hand-picked lawn, khaddar and formal pret — plus the bedsheets
              and home textile that finish a room.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-6 px-7 py-3 bg-gold hover:bg-[#8f6a30] text-ivory text-sm tracking-tracked transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — 2 spotlight tiles */}
        <div className="md:col-span-2 grid grid-rows-2 gap-4 md:gap-6">
          {spotlight.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            >
              <Link href="/shop" className="group block h-full">
                <div className={`relative h-full min-h-[220px] rounded-sm overflow-hidden ${p.image ? "" : `bg-gradient-to-br ${p.gradient}`}`}>
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill sizes="40vw" className="object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute left-5 bottom-5 text-ivory">
                    <p className="text-[11px] tracking-tracked text-ivory/80 mb-1">{p.fabric}</p>
                    <p className="font-serif text-xl">{p.name}</p>
                    <p className="text-sm mt-1 text-ivory/90">Rs. {p.price.toLocaleString("en-PK")}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
