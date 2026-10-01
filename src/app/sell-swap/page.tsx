import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import SectionHeader from "@/components/SectionHeader";
import SellSwapForm from "@/components/SellSwapForm";

export const metadata: Metadata = {
  title: "Sell My Car in Manchester | Sell / Swap",
  description:
    "Sell or swap your car with Manchester Auto Cars. Send your name, registration, mileage and phone number — no pressure, no obligation.",
  alternates: { canonical: "/sell-swap" },
};

const steps = [
  {
    title: "Send your vehicle details",
    description:
      "Your name, registration, mileage and a phone number — that's it. It takes about twenty seconds.",
  },
  {
    title: "We review the information",
    description:
      "We'll take a proper look and work out a fair, honest figure based on your car's condition and the current market.",
  },
  {
    title: "The team gets in touch",
    description:
      "Usually within the hour during opening hours. No obligation to go any further if it's not right for you.",
  },
];

export default function SellSwapPage() {
  const settings = getSiteSettings();

  return (
    <div>
      <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
        <SectionHeader
          level="h1"
          eyebrow="Sell / Swap"
          title="Selling shouldn't be stressful"
          description={settings.sellSwapIntro}
        />

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-[14px] border border-ink/10 bg-white p-6">
              <span className="font-mono text-xs text-gold-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg uppercase tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-mist">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-y border-line-dark bg-ink py-14 text-surface sm:py-20">
        <div className="container-page max-w-2xl">
          <p className="eyebrow mb-4">Tell us about your car</p>
          <h2 className="h-display text-3xl text-surface sm:text-4xl">
            Registration, mileage, phone. Done.
          </h2>
          <div className="mt-8 rounded-[14px] border border-line-dark bg-ink-soft p-6 sm:p-8">
            <SellSwapForm whatsappHref={settings.whatsappHref} />
          </div>
        </div>
      </div>
    </div>
  );
}
