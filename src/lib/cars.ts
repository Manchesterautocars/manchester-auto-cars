import fs from "fs";
import path from "path";
import type { Car, VehicleStatus } from "@/types";

const VEHICLES_FILE = path.join(process.cwd(), "data", "vehicles.json");

interface PublishedVehicle {
  id: string;
  make?: string;
  model?: string;
  variant?: string;
  year?: number | null;
  registration?: string;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  engine?: string;
  bodyType?: string;
  colour?: string;
  price?: number;
  status?: string;
  featured?: boolean;
  description?: string;
  highlights?: string[];
  images?: string[];
  mainImage?: string;
  dateAdded?: string;
}

interface PublishedInventory {
  schemaVersion?: number;
  vehicles?: PublishedVehicle[];
}

function toCar(vehicle: PublishedVehicle): Car {
  const images = Array.isArray(vehicle.images)
    ? vehicle.images.filter((image): image is string => typeof image === "string" && image.length > 0)
    : [];
  const mainImage =
    typeof vehicle.mainImage === "string" && vehicle.mainImage
      ? vehicle.mainImage
      : images[0] ?? "";

  const validStatuses: VehicleStatus[] = ["available", "reserved", "sold"];
  const status = validStatuses.includes(vehicle.status as VehicleStatus)
    ? (vehicle.status as VehicleStatus)
    : "available";

  return {
    name: [vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(" "),
    slug: vehicle.id,
    make: vehicle.make ?? "",
    model: vehicle.model ?? "",
    price: Number(vehicle.price) || 0,
    registration: vehicle.registration ?? "",
    year: Number(vehicle.year) || 0,
    mileage: Number(vehicle.mileage) || 0,
    fuelType: vehicle.fuel ?? "",
    transmission: vehicle.transmission ?? "",
    engine: vehicle.engine ?? "",
    colour: vehicle.colour ?? "",
    bodyType: vehicle.bodyType ?? "",
    status,
    featured: Boolean(vehicle.featured),
    mainImage,
    images: images.length ? images : mainImage ? [mainImage] : [],
    features: Array.isArray(vehicle.highlights) ? vehicle.highlights : [],
    publishDate: vehicle.dateAdded ?? "",
    description: vehicle.description ?? "",
  };
}

export function getAllCars(): Car[] {
  if (!fs.existsSync(VEHICLES_FILE)) return [];

  try {
    const raw = fs.readFileSync(VEHICLES_FILE, "utf8");
    const parsed = JSON.parse(raw) as PublishedInventory | PublishedVehicle[];
    const vehicles = Array.isArray(parsed) ? parsed : parsed.vehicles;

    if (!Array.isArray(vehicles)) return [];

    const cars = vehicles
      .filter((vehicle) => vehicle && typeof vehicle.id === "string" && vehicle.id.length > 0)
      .map(toCar);

    return cars.sort((a, b) => {
      const order: Record<VehicleStatus, number> = {
        available: 0,
        reserved: 1,
        sold: 2,
      };

      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status];
      }

      return (b.publishDate ?? "").localeCompare(a.publishDate ?? "");
    });
  } catch (error) {
    console.error("Could not read data/vehicles.json:", error);
    return [];
  }
}

export function getCarBySlug(slug: string): Car | undefined {
  return getAllCars().find((car) => car.slug === slug);
}

export function getFeaturedCars(): Car[] {
  return getAllCars().filter((car) => car.featured && car.status !== "sold");
}

export function getRelatedCars(car: Car, limit = 3): Car[] {
  return getAllCars()
    .filter(
      (candidate) =>
        candidate.slug !== car.slug &&
        candidate.status !== "sold" &&
        (candidate.bodyType === car.bodyType || candidate.make === car.make),
    )
    .slice(0, limit);
}

export function getVisibleCars(): Car[] {
  return getAllCars();
}

export function getMakes(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((car) => car.make))).sort();
}

export function getFuelTypes(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((car) => car.fuelType))).sort();
}

export function getTransmissions(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((car) => car.transmission))).sort();
}
