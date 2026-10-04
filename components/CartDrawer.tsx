"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { socials } from "@/lib/socials";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQty, removeFromCart, total } = useCart();

  const whatsappCheckoutLink = () => {
    const lines = items.map((i) => `- ${i.name} x${i.qty} (Rs. ${i.price * i.qty})`).join("\n");
    const text = encodeURIComponent(`I'd like to order:\n${lines}\n\nTotal: Rs. ${total.toLocaleString("en-PK")}`);
    return `${socials.whatsappLink}?text=${text}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-ivory z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <p className="font-serif text-lg">Your Cart</p>
              <button onClick={onClose} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-ink/50">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-sm bg-beige shrink-0 overflow-hidden">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gold">Rs. {item.price.toLocaleString("en-PK")}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center border border-black/15 rounded-full">
                          <Minus size={11} />
                        </button>
                        <span className="text-xs w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center border border-black/15 rounded-full">
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="text-ink/30 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/10 px-5 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-serif text-base">Rs. {total.toLocaleString("en-PK")}</span>
                </div>
                <a
                  href={whatsappCheckoutLink()}
                  target="_blank"
                  className="block text-center w-full py-3 bg-[#25D366] text-white text-sm tracking-tracked rounded-sm hover:opacity-90 transition-opacity"
                >
                  CHECKOUT ON WHATSAPP
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
