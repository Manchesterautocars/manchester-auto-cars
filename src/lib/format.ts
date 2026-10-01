export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return `${new Intl.NumberFormat("en-GB").format(mileage)} miles`;
}

export function formatRegistration(reg: string): string {
  return reg.toUpperCase();
}

export function statusLabel(status: string): string {
  switch (status) {
    case "available":
      return "Available";
    case "reserved":
      return "Reserved";
    case "sold":
      return "Sold";
    default:
      return status;
  }
}
