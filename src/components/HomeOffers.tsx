import type { Offer } from "@/types";
import SectionHeader from "./SectionHeader";
import OfferCard from "./OfferCard";

export default function HomeOffers({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-surface-dim py-10 sm:py-14">
      <div className="container-page">
        <SectionHeader
          eyebrow="Current Offers"
          title="Worth a look"
          description="A couple of things running at the moment. No small print games — if it's live, it's live."
        />

        <div className="mt-6 flex flex-col gap-4">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
