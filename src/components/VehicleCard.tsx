import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Settings2, CalendarDays } from "lucide-react";
import type { Car } from "@/types";
import { formatMileage, formatPrice } from "@/lib/format";
import StatusBadge from "./StatusBadge";
import EnquireButton from "./EnquireButton";

export default function VehicleCard({
  car,
  priority = false,
  className = "",
}: {
  car: Car;
  priority?: boolean;
  className?: string;
}) {
  const isSold = car.status === "sold";
  const isReserved = car.status === "reserved";

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white max-md:border-line-dark max-md:bg-ink transition-all duration-300 ease-premium hover:border-ink/30 hover:shadow-[0_18px_40px_-20px_rgba(11,11,12,0.35)] ${className}`}
    >
      {/* Everything except the CTA navigates to the vehicle's detail page */}
      <Link href={`/cars/${car.slug}`} className="contents">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 max-md:aspect-[16/10]">
          <Image
            src={car.mainImage}
            alt={car.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
            className={`object-cover max-md:object-[50%_62%] transition-transform duration-700 ease-premium group-hover:scale-105 ${
              isSold ? "grayscale" : ""
            }`}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/20 to-transparent max-md:block" />
          <div className="absolute left-3 top-3">
            <StatusBadge status={car.status} />
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-ink/10 bg-white/90 px-2.5 py-1 font-body text-[11px] font-semibold text-ink backdrop-blur-sm">
            <CalendarDays className="h-3 w-3" aria-hidden />
            {car.year}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4 pb-0 max-md:-mt-6 max-md:relative">
          <h3 className="line-clamp-2 min-h-[2.6rem] font-display text-base font-semibold leading-tight tracking-tight text-ink max-md:text-surface">
            {car.name}
          </h3>

          <p className="font-body text-lg font-bold text-ink max-md:text-gold">
            {formatPrice(car.price)}
          </p>

          <dl className="grid grid-cols-2 gap-y-1.5 border-t border-ink/10 pt-2.5 font-body text-xs text-mist max-md:border-line-dark max-md:text-surface/60">
            <dt className="sr-only">Mileage</dt>
            <dd className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-ink/40 max-md:text-gold/80" aria-hidden />
              {formatMileage(car.mileage)}
            </dd>
            <dt className="sr-only">Fuel type</dt>
            <dd className="flex items-center justify-end gap-1.5">
              <Fuel className="h-3.5 w-3.5 text-ink/40 max-md:text-gold/80" aria-hidden />
              {car.fuelType}
            </dd>
            <dt className="sr-only">Transmission</dt>
            <dd className="col-span-2 flex items-center gap-1.5">
              <Settings2 className="h-3.5 w-3.5 text-ink/40 max-md:text-gold/80" aria-hidden />
              {car.transmission}
            </dd>
          </dl>
        </div>
      </Link>

      <div className="p-4 pt-3">
        {isSold ? (
          <p className="rounded-md border border-ink/10 bg-ink/[0.03] py-2.5 text-center font-body text-xs font-semibold text-mist max-md:border-line-dark max-md:text-surface/50">
            Sold — see similar cars
          </p>
        ) : (
          <EnquireButton
            carName={car.name}
            available={!isReserved}
            label={isReserved ? "Enquire on WhatsApp" : "Check Availability"}
            variant="outline"
            className="w-full max-md:border-gold/50 max-md:text-gold"
            stopPropagation
          />
        )}
      </div>
    </div>
  );
}
