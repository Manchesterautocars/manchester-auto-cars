"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, sellSwapMessage } from "@/lib/whatsapp";

export default function SellSwapForm({
  whatsappHref,
  compact = false,
}: {
  whatsappHref: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [mileage, setMileage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !registration.trim() || !mileage.trim() || !phone.trim()) {
      setError("Please fill in every field so we can get back to you.");
      return;
    }
    setError("");

    const message = sellSwapMessage({
      name: name.trim(),
      registration: registration.trim().toUpperCase(),
      mileage: mileage.trim(),
      phone: phone.trim(),
    });
    const link = buildWhatsAppLink(whatsappHref, message);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "rounded-md border border-surface/25 bg-transparent px-4 py-3 font-mono text-base text-surface placeholder:text-surface/30 focus:border-gold focus:outline-none";
  const labelClass =
    "font-mono text-[11px] uppercase tracking-wideish text-surface/60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className={labelClass}>
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="registration" className={labelClass}>
            Registration
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            autoComplete="off"
            placeholder="MA20 XLR"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="rounded-md border border-gold/50 bg-ink px-4 py-3 font-mono text-base font-bold uppercase tracking-platey text-gold placeholder:text-gold/30 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mileage" className={labelClass}>
            Mileage
          </label>
          <input
            id="mileage"
            name="mileage"
            type="text"
            inputMode="numeric"
            placeholder="45,000"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07769 006333"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="font-body text-sm text-gold-bright">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Send on WhatsApp
          <MessageCircle className="ml-2 h-4 w-4" aria-hidden />
        </button>
        {!compact && (
          <p className="font-body text-xs text-surface/50">
            No pressure. No obligation. We&rsquo;ll get back to you.
          </p>
        )}
      </div>
    </form>
  );
}
