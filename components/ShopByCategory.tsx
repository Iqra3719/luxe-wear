import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Women's Clothing", sub: "Unstitched Pret & Formals", href: "/shop", image: "/images/category-women.jpg" },
  { name: "Men's Clothing", sub: "Kurta & Shalwar Kameez", href: "/shop", image: "/images/category-men.jpg" },
  { name: "Bedsheets & Home", sub: "King, Double & Cotton Sets", href: "/shop", image: "/images/category-bedsheets.jpg" },
];

export function ShopByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-3xl md:text-4xl">Shop by Category</h2>
        <Link href="/shop" className="text-sm border-b border-charcoal pb-0.5">
          View all
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} href={cat.href} className="group block">
            <div className="relative h-80 rounded-sm overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <p className="font-serif text-xl mt-4">{cat.name}</p>
            <p className="text-sm text-ink/60">{cat.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
