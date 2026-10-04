"use client";

import { motion } from "framer-motion";
import { Truck, Gem, RefreshCcw, MessageCircle } from "lucide-react";

const POINTS = [
  { icon: Truck, title: "Free Delivery", body: "On orders over Rs. 5,000, anywhere in Pakistan." },
  { icon: Gem, title: "Premium Fabric", body: "Lawn, khaddar, karandi and cotton — checked before it ships." },
  { icon: RefreshCcw, title: "Easy Exchange", body: "7-day size exchange, no questions asked." },
  { icon: MessageCircle, title: "Real Support", body: "Message us on WhatsApp — a real person replies, not a bot." },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 mt-24">
      <div className="text-center mb-10">
        <p className="tracking-tracked text-xs text-gold mb-2">WHY LUXE WEAR</p>
        <h2 className="font-serif text-3xl md:text-4xl">Why Choose Us</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {POINTS.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center p-6 bg-beige/40 rounded-sm"
          >
            <point.icon size={22} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-serif text-lg">{point.title}</p>
            <p className="text-xs text-ink/60 mt-2">{point.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
