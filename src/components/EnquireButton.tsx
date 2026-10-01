"use client";

import { MessageCircle } from "lucide-react";
import { useEnquiryModal } from "./EnquiryModalProvider";

export default function EnquireButton({
  carName = "",
  label = "Check Availability",
  available = true,
  variant = "primary",
  className = "",
  showIcon = true,
  stopPropagation = false,
}: {
  carName?: string;
  label?: string;
  available?: boolean;
  variant?: "primary" | "outline" | "outline-dark";
  className?: string;
  showIcon?: boolean;
  stopPropagation?: boolean;
}) {
  const { open } = useEnquiryModal();

  const cls =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline-dark"
      ? "btn-outline-dark"
      : "btn-outline";

  return (
    <button
      type="button"
      onClick={(e) => {
        if (stopPropagation) {
          e.preventDefault();
          e.stopPropagation();
        }
        open(carName, { available });
      }}
      className={`${cls} ${className}`}
    >
      {label}
      {showIcon && <MessageCircle className="ml-2 h-4 w-4" aria-hidden />}
    </button>
  );
}
