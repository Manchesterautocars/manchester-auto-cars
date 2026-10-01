import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/types";

export default function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-[14px] border border-ink/10 bg-white sm:flex-row">
      {offer.image && (
        <div className="relative h-40 w-full flex-shrink-0 sm:h-auto sm:w-56">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col justify-center gap-3 p-6">
        {/* perforated ticket divider */}
        <span
          aria-hidden
          className="absolute -left-[1px] top-0 hidden h-full w-px sm:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(11,11,12,0.15) 6px 12px)",
          }}
        />
        <h3 className="font-display text-2xl uppercase tracking-tight text-ink">
          {offer.title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-mist">
          {offer.description}
        </p>
        {offer.ctaLink && (
          <Link
            href={offer.ctaLink}
            className="mt-1 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wideish text-gold-dim underline-offset-4 hover:underline"
          >
            {offer.ctaText || "Find out more"} →
          </Link>
        )}
      </div>
    </div>
  );
}
