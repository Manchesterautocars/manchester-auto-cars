"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { X, MessageCircle } from "lucide-react";
import {
  buildWhatsAppLink,
  isReasonablePhoneNumber,
  vehicleEnquiryMessage,
} from "@/lib/whatsapp";
import { gsap, prefersReducedMotion } from "@/lib/gsapSetup";

interface EnquiryContextValue {
  open: (carName?: string, options?: { available?: boolean }) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiryModal(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  }
  return ctx;
}

interface FieldErrors {
  name?: string;
  car?: string;
  phone?: string;
}

export default function EnquiryModalProvider({
  whatsappHref,
  children,
}: {
  whatsappHref: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [carName, setCarName] = useState("");
  const [carAvailable, setCarAvailable] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const open = useCallback((initialCar = "", options?: { available?: boolean }) => {
    setCarName(initialCar);
    setCarAvailable(options?.available ?? true);
    setErrors({});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Entrance/exit animation + focus handling
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => firstFieldRef.current?.focus(), 50);

    if (!prefersReducedMotion() && overlayRef.current && panelRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, close]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!carName.trim()) nextErrors.car = "Let us know which car or model you're after.";
    if (!phone.trim()) {
      nextErrors.phone = "Please enter a contact number.";
    } else if (!isReasonablePhoneNumber(phone)) {
      nextErrors.phone = "Please enter a valid contact number.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    const message = vehicleEnquiryMessage({
      name: name.trim(),
      car: carName.trim(),
      phone: phone.trim(),
      available: carAvailable,
    });
    const link = buildWhatsAppLink(whatsappHref, message);
    window.open(link, "_blank", "noopener,noreferrer");

    setIsOpen(false);
    setName("");
    setPhone("");
  }

  const fieldClass =
    "rounded-md border border-surface/25 bg-transparent px-4 py-3 font-mono text-base text-surface placeholder:text-surface/30 focus:border-gold focus:outline-none";
  const fieldErrorClass = "border-gold-bright";
  const labelClass = "font-mono text-[11px] uppercase tracking-wideish text-surface/60";

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="presentation"
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            className="relative w-full max-w-md rounded-t-2xl border border-gold/15 bg-ink p-6 text-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-surface/50 transition-colors hover:bg-surface/10 hover:text-surface"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="eyebrow mb-2 text-gold">
              {carAvailable ? "Enquire" : "Get In Touch"}
            </p>
            <h2 id="enquiry-modal-title" className="h-display text-2xl text-surface">
              {carAvailable ? "Enquire About Vehicle Availability" : "Ask About Similar Cars"}
            </h2>
            <p className="mt-2 font-body text-sm text-surface/60">
              Send us your details and we&rsquo;ll reply on WhatsApp — usually
              within minutes.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="enquiry-name" className={labelClass}>
                  Full Name
                </label>
                <input
                  ref={firstFieldRef}
                  id="enquiry-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "enquiry-name-error" : undefined}
                  className={`${fieldClass} ${errors.name ? fieldErrorClass : ""}`}
                />
                {errors.name && (
                  <p id="enquiry-name-error" role="alert" className="font-body text-xs text-gold-bright">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="enquiry-phone" className={labelClass}>
                  Contact Number
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07769 006333"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                  className={`${fieldClass} ${errors.phone ? fieldErrorClass : ""}`}
                />
                {errors.phone && (
                  <p id="enquiry-phone-error" role="alert" className="font-body text-xs text-gold-bright">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="enquiry-car" className={labelClass}>
                  Car / Model You&rsquo;re Looking For
                </label>
                <input
                  id="enquiry-car"
                  type="text"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  placeholder="e.g. BMW 3 Series, Audi A4, Mercedes C-Class"
                  aria-invalid={Boolean(errors.car)}
                  aria-describedby={errors.car ? "enquiry-car-error" : undefined}
                  className={`${fieldClass} ${errors.car ? fieldErrorClass : ""}`}
                />
                {errors.car && (
                  <p id="enquiry-car-error" role="alert" className="font-body text-xs text-gold-bright">
                    {errors.car}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary mt-1 w-full">
                Enquire on WhatsApp
                <MessageCircle className="ml-2 h-4 w-4" aria-hidden />
              </button>
              <p className="text-center font-mono text-[11px] uppercase tracking-wideish text-surface/40">
                Opens WhatsApp with your message ready to send
              </p>
            </form>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
