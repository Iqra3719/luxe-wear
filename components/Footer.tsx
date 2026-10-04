import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { socials, instagramLink } from "@/lib/socials";

export function Footer() {
  return (
    <footer className="bg-charcoal text-beige">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/logo-wordmark.png"
            alt="Luxe Wear"
            width={1004}
            height={210}
            className="h-14 w-auto mb-4"
          />
          <p className="text-sm text-beige/70">
            A family boutique for women&apos;s pret, men&apos;s kurta &amp;
            shalwar kameez, and home textile — made to be worn.
          </p>
        </div>

        <div>
          <p className="tracking-tracked text-xs text-gold-soft mb-4">SHOP</p>
          <ul className="space-y-2 text-sm text-beige/80">
            <li><Link href="/shop" className="hover:text-ivory">All Products</Link></li>
            <li><Link href="/about" className="hover:text-ivory">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-ivory">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="tracking-tracked text-xs text-gold-soft mb-4">HELP</p>
          <ul className="space-y-2 text-sm text-beige/80">
            <li><Link href="/contact" className="hover:text-ivory">Get in Touch</Link></li>
            <li>
              <Link href={socials.whatsappLink} target="_blank" className="hover:text-ivory">
                Order via WhatsApp
              </Link>
            </li>
            <li>
              <a href={`mailto:${socials.email}`} className="hover:text-ivory">
                {socials.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="tracking-tracked text-xs text-gold-soft mb-4">FOLLOW</p>
          <div className="flex gap-4">
            <Link
              href={instagramLink}
              target="_blank"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-beige/30 flex items-center justify-center hover:border-gold-soft"
            >
              <Instagram size={16} strokeWidth={1.6} />
            </Link>
            <Link
              href={socials.youtube}
              target="_blank"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-beige/30 flex items-center justify-center hover:border-gold-soft"
            >
              <Youtube size={16} strokeWidth={1.6} />
            </Link>
            <Link
              href={socials.whatsappLink}
              target="_blank"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-beige/30 flex items-center justify-center hover:border-gold-soft"
            >
              <MessageCircle size={16} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="text-center text-xs text-beige/50 py-6">
        © 2025 Luxe Wear PK. All rights reserved.
      </p>
    </footer>
  );
}
