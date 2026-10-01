import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCars, getCarBySlug, getRelatedCars } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { formatPrice, formatMileage } from "@/lib/format";
import ImageGallery from "@/components/ImageGallery";
import SpecsList from "@/components/SpecsList";
import StatusBadge from "@/components/StatusBadge";
import RegPlate from "@/components/RegPlate";
import { CallButton } from "@/components/CtaButtons";
import EnquireButton from "@/components/EnquireButton";
import VehicleCard from "@/components/VehicleCard";
import SectionHeader from "@/components/SectionHeader";

const SITE_URL = "https://manchesterautocars.com";

export function generateStaticParams() {
  return getAllCars().map((car) => ({ slug: car.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const car = getCarBySlug(params.slug);
  if (!car) return {};

  const title = `${car.name} — ${formatPrice(car.price)}`;
  const description = `${car.year} ${car.make} ${car.model}, ${formatMileage(
    car.mileage
  )}, ${car.fuelType}, ${car.transmission}. ${car.description.slice(0, 120)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/cars/${car.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/cars/${car.slug}`,
      images: car.mainImage ? [{ url: car.mainImage }] : undefined,
    },
  };
}

export default function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  const settings = getSiteSettings();
  const related = getRelatedCars(car);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: car.name,
    brand: car.make,
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileage,
      unitCode: "SMI",
    },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "GBP",
      availability:
        car.status === "available"
          ? "https://schema.org/InStock"
          : car.status === "reserved"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Used Cars", item: `${SITE_URL}/cars` },
      { "@type": "ListItem", position: 3, name: car.name, item: `${SITE_URL}/cars/${car.slug}` },
    ],
  };

  return (
    <div className="container-page py-10 pt-20 sm:py-14 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 font-mono text-[11px] uppercase tracking-wideish text-mist">
        <Link href="/cars" className="hover:text-ink">
          Available Cars
        </Link>{" "}
        / <span className="text-ink">{car.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div>
          <ImageGallery images={car.images} alt={car.name} />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status={car.status} />
            <RegPlate registration={car.registration} light />
          </div>

          <h1 className="h-display mt-3 text-3xl text-ink sm:text-4xl">
            {car.name}
          </h1>

          <p className="mt-3 font-mono text-3xl font-semibold text-gold-dim">
            {formatPrice(car.price)}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <EnquireButton
              carName={car.name}
              available={car.status === "available"}
              label={
                car.status === "sold"
                  ? "Ask About Similar Cars"
                  : car.status === "reserved"
                  ? "Enquire on WhatsApp"
                  : "Check Availability"
              }
              className="flex-1"
            />
            <CallButton
              phoneHref={settings.phoneHref}
              phoneDisplay="Now"
              variant="outline"
              className="flex-1"
            />
          </div>
          {car.status === "sold" && (
            <p className="mt-3 font-body text-sm text-mist">
              This car has sold — we can let you know about similar vehicles
              as they arrive.
            </p>
          )}

          <div className="mt-8 border-t border-ink/10 pt-6">
            <SpecsList car={car} />
          </div>

          {car.features.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">Features</p>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {car.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 font-body text-sm text-ink/80"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-2xl border-t border-ink/10 pt-8">
        <p className="eyebrow mb-3">About this car</p>
        <p className="whitespace-pre-line font-body text-base leading-relaxed text-ink/80">
          {car.description}
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-ink/10 pt-12">
          <SectionHeader eyebrow="You Might Also Like" title="Similar vehicles" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <VehicleCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
