"use client";

import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import { socials } from "@/lib/socials";

export function LatestVideoSection() {
  return (
    <section className="bg-beige/60 mt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="tracking-tracked text-xs text-gold mb-3"
        >
          SEE IT MOVE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl md:text-5xl"
        >
          Watch Our Latest Collection
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 mx-auto max-w-sm rounded-sm overflow-hidden shadow-xl bg-charcoal"
        >
          <video
            controls
            playsInline
            poster="/images/showcase-poster.jpg"
            className="w-full h-full object-cover aspect-square"
          >
            <source src="/videos/showcase.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <a
          href={socials.youtube}
          target="_blank"
          className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-charcoal hover:bg-gold text-ivory text-sm tracking-tracked transition-colors"
        >
          <Youtube size={16} />
          SUBSCRIBE ON YOUTUBE
        </a>
      </div>
    </section>
  );
}
