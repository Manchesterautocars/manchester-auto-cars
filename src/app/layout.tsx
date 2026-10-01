import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import EnquiryModalProvider from "@/components/EnquiryModalProvider";
import { getSiteSettings } from "@/lib/settings";

const SITE_URL = "https://manchesterautocars.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manchester Auto Cars | Quality Used Cars in Manchester",
    template: "%s | Manchester Auto Cars",
  },
  description:
    "An independent Manchester used car dealership. Fully checked, honestly described cars, straightforward part-exchange and no-pressure enquiries by phone or WhatsApp.",
  openGraph: {
    title: "Manchester Auto Cars | Quality Used Cars in Manchester",
    description:
      "An independent Manchester used car dealership. Fully checked, honestly described cars, straightforward part-exchange and no-pressure enquiries.",
    url: SITE_URL,
    siteName: "Manchester Auto Cars",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manchester Auto Cars",
    description:
      "An independent Manchester used car dealership. Fully checked, honestly described cars, no-pressure enquiries.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  const sameAs = [
    settings.socialLinks.facebook,
    settings.socialLinks.instagram,
  ].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: settings.businessName,
    image: `${SITE_URL}/opengraph-image`,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Manchester",
      addressCountry: "GB",
    },
    areaServed: "Manchester",
    url: SITE_URL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    openingHoursSpecification: settings.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      description: h.hours,
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.businessName,
    url: SITE_URL,
  };

  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <EnquiryModalProvider whatsappHref={settings.whatsappHref}>
          <Navbar settings={settings} />
          <main className="pb-16 lg:pb-0">{children}</main>
          <Footer settings={settings} />
          <MobileActionBar settings={settings} />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
