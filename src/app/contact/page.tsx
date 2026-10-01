import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import SectionHeader from "@/components/SectionHeader";
import { CallButton, WhatsAppLinkButton } from "@/components/CtaButtons";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manchester Auto Cars by phone or WhatsApp. Find our address, opening hours and location in Manchester.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const settings = getSiteSettings();
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappHref,
    "Hello Manchester Auto Cars, I have a question."
  );

  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Contact us"
        description="Call, WhatsApp or drop by the forecourt — whichever suits you best."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="rounded-[14px] border border-ink/10 bg-white p-6">
            <p className="eyebrow mb-4">Reach us directly</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppLinkButton
                href={whatsappHref}
                label="WhatsApp Us"
                variant="primary"
                className="flex-1"
              />
              <CallButton
                phoneHref={settings.phoneHref}
                phoneDisplay={settings.phone}
                variant="outline"
                className="flex-1"
              />
            </div>
            <p className="mt-4 font-body text-sm text-mist">
              Or email{" "}
              <a
                href={`mailto:${settings.email}`}
                className="text-gold-dim underline underline-offset-4"
              >
                {settings.email}
              </a>
            </p>
          </div>

          <div className="rounded-[14px] border border-ink/10 bg-white p-6">
            <p className="eyebrow mb-4">Visit the forecourt</p>
            <p className="font-body text-base text-ink">{settings.address}</p>
          </div>

          <div className="rounded-[14px] border border-ink/10 bg-white p-6">
            <p className="eyebrow mb-4">Opening hours</p>
            <ul className="flex flex-col gap-1.5 font-mono text-sm text-ink/80">
              {settings.openingHours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="font-semibold">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-h-[360px] overflow-hidden border border-ink/10 bg-ink/5">
          {settings.mapEmbedUrl && (
            <iframe
              title="Manchester Auto Cars location"
              src={settings.mapEmbedUrl}
              className="h-full min-h-[360px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </div>
  );
}
