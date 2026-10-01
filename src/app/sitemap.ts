import type { MetadataRoute } from "next";
import { getAllCars } from "@/lib/cars";

const SITE_URL = "https://manchesterautocars.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const cars = getAllCars();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/cars`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/modifications`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sell-swap`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/offers`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${SITE_URL}/cars/${car.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...carRoutes];
}
