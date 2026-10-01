import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import SectionHeader from "@/components/SectionHeader";
import { CallButton, WhatsAppLinkButton } from "@/components/CtaButtons";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Manchester Auto Cars is an independent Manchester dealership focused on quality used cars, carefully checked and honestly described.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const settings = getSiteSettings();
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappHref,
    "Hello Manchester Auto Cars, I'd like to know more about you."
  );

  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader
        eyebrow="About Us"
        title="Quality used cars, done properly"
        description={settings.homepageSubheadline}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-[14px] border border-ink/10 bg-white p-6">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink">
            Carefully selected
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-mist">
            We choose our stock deliberately rather than filling the
            forecourt — every car earns its place before it goes on sale.
          </p>
        </div>
        <div className="rounded-[14px] border border-ink/10 bg-white p-6">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink">
            Transparent service
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-mist">
            {settings.sellSwapIntro}
          </p>
        </div>
        <div className="rounded-[14px] border border-ink/10 bg-white p-6">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink">
            A better experience
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-mist">
            No pressure, straightforward answers, and a real person to talk
            to on the phone or on WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <WhatsAppLinkButton href={whatsappHref} label="WhatsApp Us" className="sm:w-auto" />
        <CallButton
          phoneHref={settings.phoneHref}
          phoneDisplay={settings.phone}
          variant="outline"
          className="sm:w-auto"
        />
      </div>
    </div>
  );
}
