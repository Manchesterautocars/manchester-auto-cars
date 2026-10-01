import { formatRegistration } from "@/lib/format";

export default function RegPlate({
  registration,
  light = false,
}: {
  registration: string;
  light?: boolean;
}) {
  return (
    <span className={light ? "plate-light" : "plate"}>
      {formatRegistration(registration)}
    </span>
  );
}
