"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wallet, BadgeCheck } from "lucide-react";
import type { Car, SiteSettings } from "@/types";
import { gsap, useGsapRegister, prefersReducedMotion } from "@/lib/gsapSetup";

const trustPoints = [
  { icon: ShieldCheck, title: "Quality Checked", description: "Every car inspected" },
  { icon: Wallet, title: "Best Prices", description: "Competitive deals" },
  { icon: BadgeCheck, title: "Trusted Service", description: "UK based business" },
];

export default function Hero({
  settings,
  heroCar,
}: {
  settings: SiteSettings;
  heroCar?: Car;
  availableCount: number;
}) {
  useGsapRegister();
  const rootRef = useRef<HTMLDivElement>(null);

  const eyebrow = settings.tagline?.split("|")[0]?.trim() || "Quality Used Cars in Manchester";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-reveal]"), {
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0 0 0% 0)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-reveal='eyebrow']",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.05
      )
        .fromTo(
          "[data-reveal='heading-line']",
          { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.7, stagger: 0.1 },
          0.15
        )
        .fromTo(
          "[data-reveal='copy']",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.45
        )
        .fromTo(
          "[data-reveal='buttons'] > *",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          0.58
        )
        .fromTo(
          "[data-reveal='trust'] > *",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          0.7
        )
        .fromTo(
          "[data-reveal='image']",
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1 },
          0.1
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink text-surface">
      {/* Text column — width is capped directly so it never fights the image for space. */}
      <div className="container-page relative z-10 pb-10 pt-24 sm:pb-12 sm:pt-28 lg:min-h-[560px] lg:pb-20 lg:pt-32 xl:min-h-[600px]">
        <div className="lg:max-w-[46%]">
          <p data-reveal="eyebrow" className="eyebrow mb-4 text-gold">
            {eyebrow}
          </p>

          <h1 className="h-display text-4xl text-surface sm:text-5xl md:text-6xl lg:text-[3.4rem]">
            <span data-reveal="heading-line" className="block overflow-hidden">
              Drive the car
            </span>
            <span data-reveal="heading-line" className="block overflow-hidden">
              you <span className="text-gold">deserve.</span>
            </span>
          </h1>

          <p
            data-reveal="copy"
            className="mt-4 max-w-md font-body text-sm leading-relaxed text-surface/65 sm:text-base"
          >
            Carefully selected used cars, quality checked. Great prices.
            Honest service.
          </p>

          <div data-reveal="buttons" className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cars" className="btn-primary">
              Browse Cars
            </Link>
            <Link href="/sell-swap" className="btn-outline-dark">
              Sell or Swap Your Car
            </Link>
          </div>

          <div
            data-reveal="trust"
            className="mt-8 flex flex-col gap-4 border-t border-line-dark pt-5 sm:flex-row sm:flex-wrap sm:gap-6"
          >
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-center gap-2.5">
                <point.icon className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="font-display text-sm uppercase tracking-tight text-surface">
                    {point.title}
                  </p>
                  <p className="font-body text-[11px] text-surface/45">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle image — in normal flow (below text) on mobile/tablet, then bleeds
          edge-to-edge on the right at lg+ without relying on viewport calc math. */}
      <div
        data-reveal="image"
        className="relative mx-5 mb-8 aspect-[4/3] overflow-hidden sm:mx-8 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:aspect-auto lg:w-[56%]"
      >
        {heroCar ? (
          <Link href={`/cars/${heroCar.slug}`} className="group relative block h-full w-full bg-graphite">
            <Image
              src={heroCar.mainImage}
              alt={heroCar.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            />
            {/* blend the image into the dark hero rather than a floating card */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-ink to-transparent lg:block" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <p className="font-display text-base uppercase text-surface">
                  {heroCar.name}
                </p>
                <p className="font-mono text-xs text-gold">Featured this week</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-full w-full bg-graphite" />
        )}
      </div>
    </section>
  );
}
