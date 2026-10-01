"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];

  if (safeImages.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 sm:aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={safeImages[active]}
              alt={`${alt} — photo ${active + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setActive((i) => (i - 1 + safeImages.length) % safeImages.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 border border-surface/40 bg-ink/60 px-3 py-2 font-mono text-surface backdrop-blur-sm transition hover:bg-ink"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setActive((i) => (i + 1) % safeImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 border border-surface/40 bg-ink/60 px-3 py-2 font-mono text-surface backdrop-blur-sm transition hover:bg-ink"
            >
              →
            </button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Vehicle photos"
        >
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden border transition ${
                i === active
                  ? "border-gold"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
