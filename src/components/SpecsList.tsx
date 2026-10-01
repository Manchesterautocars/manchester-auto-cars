import type { Car } from "@/types";
import { formatMileage } from "@/lib/format";

export default function SpecsList({ car }: { car: Car }) {
  const rows: { label: string; value: string | number | undefined }[] = [
    { label: "Year", value: car.year },
    { label: "Mileage", value: formatMileage(car.mileage) },
    { label: "Fuel type", value: car.fuelType },
    { label: "Transmission", value: car.transmission },
    { label: "Engine", value: car.engine },
    { label: "Colour", value: car.colour },
    { label: "Body type", value: car.bodyType },
    { label: "Owners", value: car.owners },
    { label: "Service history", value: car.serviceHistory },
    { label: "MOT", value: car.motStatus },
  ].filter((r) => r.value !== undefined && r.value !== "");

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3"
        >
          <dt className="font-body text-sm text-mist">{row.label}</dt>
          <dd className="font-mono text-sm font-semibold text-ink">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
