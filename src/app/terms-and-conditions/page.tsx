import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  const settings = getSiteSettings();
  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader eyebrow="Legal" title="Terms & Conditions" />
      <div className="prose prose-neutral mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink/80">
        <p>
          This page is a placeholder. Manchester Auto Cars has not yet
          supplied finalised terms and conditions — please replace this text
          with reviewed terms before launch.
        </p>
        <p>
          For any questions in the meantime, contact us at{" "}
          <a href={`mailto:${settings.email}`}>{settings.email}</a>.
        </p>
      </div>
    </div>
  );
}
