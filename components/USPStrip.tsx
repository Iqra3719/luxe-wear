"use client";

import { Truck, Gem, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const USPS = [
  { icon: Truck, label: "Free Delivery", sub: "On orders over Rs. 5,000" },
  { icon: Gem, label: "Premium Fabric", sub: "Lawn, Khaddar & Cotton" },
  { icon: RefreshCcw, label: "Easy Exchange", sub: "7-day size exchange" },
];

export function USPStrip() {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ivory/15">
        {USPS.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-3 justify-center py-3 sm:py-0"
          >
            <u.icon size={20} className="text-gold-soft shrink-0" strokeWidth={1.5} />
            <div className="text-center sm:text-left">
              <p className="text-sm tracking-tracked">{u.label}</p>
              <p className="text-xs text-ivory/50">{u.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
