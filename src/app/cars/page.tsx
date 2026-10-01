import type { Metadata } from "next";
import { getAllCars } from "@/lib/cars";
import SectionHeader from "@/components/SectionHeader";
import CarGrid from "@/components/CarGrid";
import CantFindCarPanel from "@/components/CantFindCarPanel";

export const metadata: Metadata = {
  title: "Used Cars for Sale in Manchester",
  description:
    "Browse quality used cars for sale in Manchester. Every vehicle is checked over before listing — filter by make, price, fuel type and transmission.",
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  const cars = getAllCars();

  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader
        level="h1"
        eyebrow="The Forecourt"
        title="Used Cars in Manchester"
        description="Every car listed here has been checked over before it goes on sale. Use the filters to narrow things down, or search directly."
      />

      <div className="mt-10">
        <CarGrid cars={cars} />
      </div>

      <CantFindCarPanel />
    </div>
  );
}
