import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Offer } from "@/types";

const OFFERS_DIR = path.join(process.cwd(), "content", "offers");

function readOfferFile(filename: string): Offer {
  const raw = fs.readFileSync(path.join(OFFERS_DIR, filename), "utf8");
  const { data } = matter(raw);

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    image: data.image ?? "",
    ctaText: data.ctaText ?? "Find out more",
    ctaLink: data.ctaLink ?? "/contact",
    active: Boolean(data.active),
    expiryDate: data.expiryDate ?? "",
  };
}

export function getAllOffers(): Offer[] {
  if (!fs.existsSync(OFFERS_DIR)) return [];
  const files = fs.readdirSync(OFFERS_DIR).filter((f) => f.endsWith(".md"));
  return files.map(readOfferFile);
}

function isExpired(offer: Offer): boolean {
  if (!offer.expiryDate) return false;
  return new Date(offer.expiryDate).getTime() < Date.now();
}

export function getActiveOffers(): Offer[] {
  return getAllOffers().filter((o) => o.active && !isExpired(o));
}
