export function buildWhatsAppLink(whatsappHref: string, message: string): string {
  const digits = whatsappHref.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}

export function isReasonablePhoneNumber(value: string): boolean {
  // Not strict UK-format validation — just enough to catch empty/garbage input.
  // Allows digits, spaces, +, -, (), and expects 7–15 digits overall.
  if (!/^[\d\s()+-]+$/.test(value.trim())) return false;
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 7 && digitCount <= 15;
}

export function carEnquiryMessage(carName: string): string {
  return `Hello Manchester Auto Cars,\n\nI'm interested in the ${carName}.\n\nCould you please provide more information?`;
}

export function vehicleEnquiryMessage(params: {
  name: string;
  car: string;
  phone: string;
  available?: boolean;
}): string {
  const closing =
    params.available === false
      ? "Please let me know about similar vehicles you have in stock.\n\nThank you."
      : "Please let me know if this vehicle or model is currently available.\n\nThank you.";

  return `Hello Manchester Auto Cars,\n\nI would like to enquire about the availability of a vehicle.\n\nName: ${params.name}\nCar I'm interested in: ${params.car}\nContact Number: ${params.phone}\n\n${closing}`;
}

export function sellSwapMessage(params: {
  name: string;
  registration: string;
  vehicle?: string;
  mileage: string;
  phone: string;
}): string {
  const vehicleLine = params.vehicle
    ? `Vehicle: ${params.vehicle}\n`
    : "";
  return `New Sell / Swap Enquiry\n\nName: ${params.name}\nRegistration: ${params.registration}\n${vehicleLine}Mileage: ${params.mileage}\nPhone: ${params.phone}\n\nSubmitted through Manchester Auto Cars website.`;
}

export function telHref(phoneHref: string): string {
  return `tel:${phoneHref}`;
}
