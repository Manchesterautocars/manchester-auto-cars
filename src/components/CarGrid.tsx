"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/types";
import VehicleCard from "./VehicleCard";

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc";

export default function CarGrid({ cars }: { cars: Car[] }) {
  const makes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make))).sort(),
    [cars]
  );
  const fuelTypes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.fuelType))).sort(),
    [cars]
  );
  const transmissions = useMemo(
    () => Array.from(new Set(cars.map((c) => c.transmission))).sort(),
    [cars]
  );

  const [make, setMake] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [transmission, setTransmission] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");
  const [hideSold, setHideSold] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (make !== "all" && c.make !== make) return false;
      if (fuel !== "all" && c.fuelType !== fuel) return false;
      if (transmission !== "all" && c.transmission !== transmission) return false;
      if (maxPrice !== "all" && c.price > Number(maxPrice)) return false;
      if (hideSold && c.status === "sold") return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.make.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "mileage-asc":
          return a.mileage - b.mileage;
        default:
          return (b.publishDate || "").localeCompare(a.publishDate || "");
      }
    });

    return result;
  }, [cars, make, fuel, transmission, maxPrice, hideSold, query, sort]);

  const selectCls =
    "border border-ink/15 bg-white px-3 py-2.5 font-mono text-xs uppercase tracking-wideish text-ink focus:border-gold focus:outline-none";

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-[14px] border border-ink/10 bg-white p-5">
        <input
          type="search"
          placeholder="Search by make or model…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search vehicles"
          className="border border-ink/15 bg-surface px-4 py-3 font-body text-sm focus:border-gold focus:outline-none"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            aria-label="Filter by make"
            className={selectCls}
          >
            <option value="all">All Makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            aria-label="Filter by fuel type"
            className={selectCls}
          >
            <option value="all">All Fuel Types</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            aria-label="Filter by transmission"
            className={selectCls}
          >
            <option value="all">All Transmissions</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Filter by maximum price"
            className={selectCls}
          >
            <option value="all">Any Price</option>
            <option value="10000">Up to £10,000</option>
            <option value="15000">Up to £15,000</option>
            <option value="20000">Up to £20,000</option>
            <option value="30000">Up to £30,000</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort vehicles"
            className={selectCls}
          >
            <option value="newest">Newest Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="mileage-asc">Mileage: Low to High</option>
          </select>

          <label className="flex items-center gap-2 border border-ink/15 bg-surface px-3 py-2.5 font-mono text-xs uppercase tracking-wideish text-ink">
            <input
              type="checkbox"
              checked={hideSold}
              onChange={(e) => setHideSold(e.target.checked)}
              className="h-3.5 w-3.5 accent-gold"
            />
            Hide Sold
          </label>
        </div>
      </div>

      <p className="mb-6 font-mono text-xs uppercase tracking-wideish text-mist">
        {filtered.length} {filtered.length === 1 ? "car" : "cars"} found
      </p>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-ink/20 py-16 text-center">
          <p className="font-display text-2xl uppercase text-ink">
            No cars match those filters
          </p>
          <p className="mt-2 font-body text-sm text-mist">
            Try widening your search, or get in touch — we may have something
            arriving soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <VehicleCard key={car.slug} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
