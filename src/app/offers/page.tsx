import type { Metadata } from "next";
import { getActiveOffers } from "@/lib/offers";
import SectionHeader from "@/components/SectionHeader";
import OfferCard from "@/components/OfferCard";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Current offers and promotions from Manchester Auto Cars, including free part-exchange valuations and MOT cover.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const offers = getActiveOffers();

  return (
    <div className="container-page py-12 pt-20 sm:py-16 sm:pt-24">
      <SectionHeader
        level="h1"
        eyebrow="Current Offers"
        title="What's on right now"
        description="No small print games — if it's listed here, it's live and available."
      />

      {offers.length === 0 ? (
        <p className="mt-10 font-body text-sm text-mist">
          No offers are running at the moment — check back soon, or get in
          touch directly.
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-5">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
