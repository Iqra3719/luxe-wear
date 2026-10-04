import { Hero } from "@/components/Hero";
import { USPStrip } from "@/components/USPStrip";
import { ShopByCategory } from "@/components/ShopByCategory";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Reviews } from "@/components/Reviews";
import { LatestVideoSection } from "@/components/LatestVideoSection";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <USPStrip />
      <ShopByCategory />
      <FeaturedProducts />
      <WhyChooseUs />
      <Reviews />
      <LatestVideoSection />
      <Newsletter />
    </main>
  );
}
