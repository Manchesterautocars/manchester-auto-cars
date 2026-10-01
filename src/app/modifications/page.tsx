import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/settings";
import { services } from "@/lib/modifications";
import SectionHeader from "@/components/SectionHeader";
import { WhatsAppLinkButton } from "@/components/CtaButtons";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Modifications",
  description:
    "Vehicle modification and styling services from Manchester Auto Cars — get in touch to discuss what's available.",
  alternates: { canonical: "/modifications" },
};

export default function ModificationsPage() {
  const settings = getSiteSettings();

  return (
    <div className="bg-ink pt-20 pb-16 text-surface sm:pt-24 sm:pb-20">
      <div className="container-page">
        <SectionHeader
          level="h1"
          eyebrow="Modifications"
          title="Upgrade your drive"
          description="From performance upgrades to custom styling, bring your vision to life. Get in touch and we'll talk through what's possible for your car."
          dark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const whatsappHref = buildWhatsAppLink(
              settings.whatsappHref,
              `Hello Manchester Auto Cars, I'd like to ask about ${service.title}.`
            );
            return (
              <div
                key={service.title}
                className="flex flex-col overflow-hidden rounded-[14px] border border-line-dark bg-ink-soft"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-display text-lg uppercase tracking-tight text-surface">
                    {service.title}
                  </h3>
                  <p className="flex-1 font-body text-sm leading-relaxed text-surface/60">
                    {service.description}
                  </p>
                  <WhatsAppLinkButton
                    href={whatsappHref}
                    label="Ask on WhatsApp"
                    variant="outline-dark"
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
