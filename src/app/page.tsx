import { getFeaturedCars, getAllCars } from "@/lib/cars";
import { getActiveOffers } from "@/lib/offers";
import { getSiteSettings } from "@/lib/settings";
import Hero from "@/components/Hero";
import FeaturedInventory from "@/components/FeaturedInventory";
import SellSwapSection from "@/components/SellSwapSection";
import ModificationsSection from "@/components/ModificationsSection";
import TrustSection from "@/components/TrustSection";
import HomeOffers from "@/components/HomeOffers";

export default function HomePage() {
  const settings = getSiteSettings();
  const allCars = getAllCars();
  const featured = getFeaturedCars();
  const availableCount = allCars.filter((c) => c.status === "available").length;

  return (
    <>
      <Hero
        settings={settings}
        heroCar={featured[0]}
        availableCount={availableCount}
      />
      <SellSwapSection settings={settings} />
      <FeaturedInventory cars={featured} />
      <ModificationsSection />
      <HomeOffers offers={getActiveOffers()} />
      <TrustSection />
    </>
  );
}
