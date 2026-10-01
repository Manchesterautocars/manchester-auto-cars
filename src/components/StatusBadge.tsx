import type { VehicleStatus } from "@/types";
import { statusLabel } from "@/lib/format";

const styles: Record<VehicleStatus, string> = {
  available: "border-gold/70 text-gold bg-ink",
  reserved: "border-surface/70 text-surface bg-ink/80",
  sold: "border-mist/50 text-mist bg-ink/60",
};

export default function StatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-platey ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}
