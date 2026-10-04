import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { LuxeAI } from "@/components/LuxeAI";
import { CartProvider } from "@/lib/cart-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Luxe Wear PK | Women's, Men's & Home Textile Boutique",
  description:
    "Unstitched pret & formals, men's kurta & shalwar kameez, and premium bedsheets & home textile. Free delivery, COD available.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-sans bg-ivory text-ink`}>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <LuxeAI />
        </CartProvider>
      </body>
    </html>
  );
}
