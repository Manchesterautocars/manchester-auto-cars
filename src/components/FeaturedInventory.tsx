"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Car } from "@/types";
import VehicleCard from "./VehicleCard";
import SectionHeader from "./SectionHeader";

export default function FeaturedInventory({ cars }: { cars: Car[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (cars.length === 0) return null;

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(":scope > a");
    const amount = (card?.offsetWidth ?? 320) + 20;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Browse Inventory"
          title="Quality Used Cars"
          description="Explore our handpicked selection of quality used cars at unbeatable prices."
        />
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll to previous cars"
              onClick={() => scrollByCard(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll to next cars"
              onClick={() => scrollByCard(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Link href="/cars" className="btn-outline w-fit">
            View All Cars
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-5 pr-5 sm:pl-8 lg:pl-12"
      >
        {cars.map((car) => (
          <VehicleCard
            key={car.slug}
            car={car}
            className="w-[78vw] flex-shrink-0 snap-start sm:w-[300px] lg:w-[calc((100%-6rem-3.75rem)/4)] lg:min-w-[280px]"
          />
        ))}
      </div>
    </section>
  );
}
