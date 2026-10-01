import { telHref } from "@/lib/whatsapp";

export function CallButton({
  phoneHref,
  phoneDisplay,
  variant = "outline",
  className = "",
}: {
  phoneHref: string;
  phoneDisplay: string;
  variant?: "primary" | "outline" | "outline-dark";
  className?: string;
}) {
  const cls =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline-dark"
      ? "btn-outline-dark"
      : "btn-outline";
  return (
    <a href={telHref(phoneHref)} className={`${cls} ${className}`}>
      Call {phoneDisplay}
    </a>
  );
}

export function WhatsAppLinkButton({
  href,
  label = "WhatsApp Enquiry",
  variant = "primary",
  className = "",
}: {
  href: string;
  label?: string;
  variant?: "primary" | "outline" | "outline-dark";
  className?: string;
}) {
  const cls =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline-dark"
      ? "btn-outline-dark"
      : "btn-outline";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} ${className}`}
    >
      {label}
    </a>
  );
}
