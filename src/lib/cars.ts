import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Car } from "@/types";

const CARS_DIR = path.join(process.cwd(), "content", "cars");

function readCarFile(filename: string): Car {
  const raw = fs.readFileSync(path.join(CARS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    name: data.name,
    slug: data.slug,
    make: data.make,
    model: data.model,
    price: Number(data.price),
    registration: data.registration,
    year: Number(data.year),
    mileage: Number(data.mileage),
    fuelType: data.fuelType,
    transmission: data.transmission,
    engine: data.engine ?? "",
    colour: data.colour ?? "",
    bodyType: data.bodyType ?? "",
    owners: data.owners ?? undefined,
    serviceHistory: data.serviceHistory ?? "",
    motStatus: data.motStatus ?? "",
    status: data.status ?? "available",
    featured: Boolean(data.featured),
    mainImage: data.mainImage,
    images: data.images ?? [data.mainImage].filter(Boolean),
    features: data.features ?? [],
    publishDate: data.publishDate ?? "",
    description: content.trim(),
  };
}

export function getAllCars(): Car[] {
  if (!fs.existsSync(CARS_DIR)) return [];
  const files = fs.readdirSync(CARS_DIR).filter((f) => f.endsWith(".md"));
  const cars = files.map(readCarFile);
  return cars.sort((a, b) => {
    // Available first, then reserved, then sold; newest publish date first within group
    const order: Record<string, number> = { available: 0, reserved: 1, sold: 2 };
    if (order[a.status] !== order[b.status]) {
      return order[a.status] - order[b.status];
    }
    return (b.publishDate || "").localeCompare(a.publishDate || "");
  });
}

export function getCarBySlug(slug: string): Car | undefined {
  return getAllCars().find((c) => c.slug === slug);
}

export function getFeaturedCars(): Car[] {
  return getAllCars().filter((c) => c.featured && c.status !== "sold");
}

export function getRelatedCars(car: Car, limit = 3): Car[] {
  return getAllCars()
    .filter(
      (c) =>
        c.slug !== car.slug &&
        c.status !== "sold" &&
        (c.bodyType === car.bodyType || c.make === car.make)
    )
    .slice(0, limit);
}

export function getVisibleCars(): Car[] {
  // Sold cars remain visible but visually marked, per default CMS configuration.
  return getAllCars();
}

export function getMakes(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((c) => c.make))).sort();
}

export function getFuelTypes(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((c) => c.fuelType))).sort();
}

export function getTransmissions(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((c) => c.transmission))).sort();
}
