import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  const settings = getSiteSettings();
  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader eyebrow="Legal" title="Privacy Policy" />
      <div className="prose prose-neutral mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink/80">
        <p>
          This page is a placeholder. Manchester Auto Cars has not yet
          supplied a finalised privacy policy — please replace this text with
          your reviewed policy before launch.
        </p>
        <p>
          For any questions about how your data is handled in the meantime,
          contact us at{" "}
          <a href={`mailto:${settings.email}`}>{settings.email}</a>.
        </p>
      </div>
    </div>
  );
}
