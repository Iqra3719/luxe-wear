"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Check } from "lucide-react";
import { fetchProducts } from "@/lib/getProducts";
import { DEMO_PRODUCTS, type Product } from "@/lib/demo-products";
import { socials } from "@/lib/socials";
import { useCart } from "@/lib/cart-context";

type ChatMessage = {
  id: string;
  from: "user" | "ai";
  text: string;
  products?: Product[];
};

const QUICK_ACTIONS = ["New", "Under 3500", "Lawn", "WhatsApp", "YouTube"];

function findPriceLimit(text: string): number | null {
  const match = text.match(/(\d{3,6})/);
  return match ? parseInt(match[0], 10) : null;
}

/** Pure keyword filter over whatever catalog is currently loaded (demo or
 *  live Supabase products) — works with zero API calls of its own. */
function runAssistant(rawInput: string, catalog: Product[]): { reply: string; products: Product[] } {
  const input = rawInput.toLowerCase();

  if (input.includes("whatsapp")) {
    return { reply: "Bilkul! WhatsApp pe order karne ke liye neeche button dabayein — hum turant reply karte hain. 💬", products: [] };
  }
  if (input.includes("youtube") || input.includes("video")) {
    return { reply: "Hamara YouTube channel dekhiye — naye drops aur styling videos wahan milte hain! Neeche YouTube button se channel open karein. 🎥", products: [] };
  }
  if (input.includes("delivery") || input.includes("shipping")) {
    return { reply: "Free delivery hai poore Pakistan mein orders Rs. 5,000 se upar par, aur COD (Cash on Delivery) bhi available hai. 🚚", products: [] };
  }

  let pool = catalog;
  const filters: string[] = [];

  if (input.includes("new")) {
    pool = pool.slice(0, 4);
    filters.push("new arrivals");
  }
  for (const fabric of ["lawn", "khaddar", "cotton", "karandi", "satin"]) {
    if (input.includes(fabric)) {
      pool = pool.filter((p) => (p.fabric ?? "").toLowerCase() === fabric);
      filters.push(`${fabric} fabric`);
    }
  }

  const priceLimit = /under|se kam|below/.test(input) ? findPriceLimit(input) : null;
  if (priceLimit) {
    pool = pool.filter((p) => p.price < priceLimit);
    filters.push(`under Rs. ${priceLimit.toLocaleString("en-PK")}`);
  }

  if (filters.length === 0) {
    return {
      reply: "Main aapki madad kar sakti hoon! Try kijiye: \"lawn\", \"under 3500\" — filhaal hamare kuch products dekh lein:",
      products: catalog.slice(0, 3),
    };
  }
  if (pool.length === 0) {
    return { reply: `Sorry, ${filters.join(" + ")} mein abhi koi item match nahi hua. Kuch aur try karein, ya WhatsApp pe direct pooch lein.`, products: [] };
  }
  return { reply: `Yeh dekhiye — ${filters.join(" + ")} mein aapke liye:`, products: pool.slice(0, 4) };
}

export function LuxeAI() {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [catalog, setCatalog] = useState<Product[]>(DEMO_PRODUCTS);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", from: "ai", text: "Assalam-o-Alaikum! Main Luxe AI hoon ✨ Aap kya dhoondh rahe hain — lawn, khaddar, ya bedsheet?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts().then(({ products }) => setCatalog(products));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(raw: string) {
    const text = raw.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), from: "user", text };
    const { reply, products } = runAssistant(text, catalog);
    const aiMsg: ChatMessage = { id: crypto.randomUUID(), from: "ai", text: reply, products };

    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  }

  function handleAddToCart(product: Product) {
    addToCart(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Luxe AI assistant"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        className="fixed right-[18px] z-40 bg-charcoal text-ivory rounded-full pl-4 pr-5 py-3 flex items-center gap-2 shadow-xl animate-luxe-pulse"
        style={{ bottom: "calc(90px + env(safe-area-inset-bottom, 0px))" }}
      >
        <Sparkles size={17} className="text-gold-soft" />
        <span className="text-sm">Luxe AI ✨</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed right-[18px] z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-[#FFFBF7] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/5"
            style={{ bottom: "calc(162px + env(safe-area-inset-bottom, 0px))" }}
          >
            <div className="bg-charcoal text-ivory px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold-soft" />
                <p className="text-sm">Luxe AI Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.from === "user"
                        ? "bg-charcoal text-ivory text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]"
                        : "bg-beige/70 text-ink text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[90%]"
                    }
                  >
                    <p>{m.text}</p>
                    {m.products && m.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {m.products.map((p) => (
                          <div key={p.id} className="bg-ivory rounded-lg p-2.5 flex items-center gap-3 border border-black/5">
                            {p.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover shrink-0" />
                            ) : (
                              <div className={`w-12 h-12 rounded-md shrink-0 bg-gradient-to-br ${p.gradient ?? "from-beige to-gold-soft"}`} />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs truncate">{p.name}</p>
                              <p className="text-xs text-gold font-medium">Rs. {p.price.toLocaleString("en-PK")}</p>
                            </div>
                            <button
                              onClick={() => handleAddToCart(p)}
                              className={
                                addedIds.has(p.id)
                                  ? "flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-full bg-green-700 text-ivory shrink-0"
                                  : "text-[11px] px-2.5 py-1.5 rounded-full bg-gold text-ivory shrink-0"
                              }
                            >
                              {addedIds.has(p.id) ? (<><Check size={11} /> Added</>) : "Add to Cart"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
              {QUICK_ACTIONS.map((label) =>
                label === "WhatsApp" || label === "YouTube" ? (
                  <Link
                    key={label}
                    href={label === "WhatsApp" ? socials.whatsappLink : socials.youtube}
                    target="_blank"
                    className="text-xs px-3 py-1.5 rounded-full border border-black/10 bg-white hover:border-gold-soft transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={() => send(label)}
                    className="text-xs px-3 py-1.5 rounded-full border border-black/10 bg-white hover:border-gold-soft transition-colors"
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-4 py-3 border-t border-black/5 shrink-0"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type kijiye — e.g. 'lawn under 4000'"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink/40"
              />
              <button type="submit" aria-label="Send" className="w-8 h-8 rounded-full bg-charcoal text-ivory flex items-center justify-center shrink-0">
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
