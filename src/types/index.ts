export type VehicleStatus = "available" | "reserved" | "sold";

export interface Car {
  name: string;
  slug: string;
  make: string;
  model: string;
  price: number;
  registration: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engine?: string;
  colour?: string;
  bodyType?: string;
  owners?: number;
  serviceHistory?: string;
  motStatus?: string;
  status: VehicleStatus;
  featured: boolean;
  mainImage: string;
  images: string[];
  features: string[];
  publishDate?: string;
  description: string;
}

export interface Offer {
  title: string;
  slug: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  active: boolean;
  expiryDate?: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface SiteSettings {
  businessName: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  openingHours: OpeningHour[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
  homepageHeadline: string;
  homepageSubheadline: string;
  sellSwapIntro: string;
  mapEmbedUrl?: string;
  tagline?: string;
  promoMessages?: string[];
}
