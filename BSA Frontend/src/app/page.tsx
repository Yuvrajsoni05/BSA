import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { TrendingProducts } from "@/components/home/trending-products";
import { UpcomingEvents } from "@/components/home/upcoming-events";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4efe4]">
      <Navbar />
      <HeroSection />
      <TrendingProducts />
      <UpcomingEvents />
    </div>
  );
}
