"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Youtube, MessageCircle } from "lucide-react";
import { socials } from "@/lib/socials";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#FFFBF7]/95 backdrop-blur border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-wordmark.png"
            alt="Luxe Wear"
            width={1004}
            height={210}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={socials.youtube}
            target="_blank"
            aria-label="YouTube"
            className="hidden lg:inline-flex hover:text-gold transition-colors"
          >
            <Youtube size={19} strokeWidth={1.6} />
          </Link>
          <Link
            href={socials.whatsappLink}
            target="_blank"
            aria-label="WhatsApp"
            className="hidden lg:inline-flex hover:text-gold transition-colors"
          >
            <MessageCircle size={19} strokeWidth={1.6} />
          </Link>
          <button aria-label="Search" className="hover:text-gold transition-colors">
            <Search size={19} strokeWidth={1.6} />
          </button>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative hover:text-gold transition-colors">
            <ShoppingBag size={19} strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
