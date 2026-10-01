"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wallet, BadgeCheck, ArrowRight } from "lucide-react";
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
    <section
      ref={rootRef}
      className="relative isolate flex flex-col overflow-hidden bg-ink text-surface lg:block lg:min-h-[780px] xl:min-h-[860px]"
    >
      {/* Studio light bars (decorative, desktop only) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div className="hero-bar absolute left-[56%] top-[20%] h-[17%] w-[3px] rounded-full" />
        <div className="hero-bar absolute left-[76%] top-[22%] h-[15%] w-[3px] rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Vehicle image — blended into the hero with CSS masks (no hard edges).
          lg+: sits behind/right of the copy, bleeding off the right edge.
          below lg: in flow under the copy, full-bleed with a soft vignette. */}
      <div
        data-reveal="image"
        className="relative -mt-2 mb-0 h-[300px] w-full sm:h-[380px] md:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:mt-0 lg:h-auto lg:w-[66%]"
      >
        {heroCar ? (
          <Link
            href={`/cars/${heroCar.slug}`}
            className="group absolute inset-0 block lg:inset-x-0 lg:bottom-[8%] lg:top-[12%]"
            aria-label={heroCar.name}
          >
            <Image
              src={heroCar.mainImage}
              alt={heroCar.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="hero-photo object-cover object-center lg:object-[60%_55%]"
            />
          </Link>
        ) : null}
        {heroCar && (
          <div className="pointer-events-none absolute bottom-8 left-5 z-10 sm:left-8 lg:bottom-[14%] lg:left-auto lg:right-10 lg:text-right">
            <p className="font-display text-sm font-semibold text-surface sm:text-base">
              {heroCar.name}
            </p>
            <p className="font-body text-xs text-gold">Featured this week</p>
          </div>
        )}
      </div>

      {/* Copy column — on mobile it is ordered first, above the image. */}
      <div className="container-page relative z-10 order-first pb-2 pt-24 sm:pt-28 lg:absolute lg:inset-x-0 lg:top-0 lg:mx-auto lg:pb-0 lg:pt-[170px]">
        <div className="lg:max-w-[44%]">
          <p data-reveal="eyebrow" className="eyebrow mb-5 flex items-center gap-3 text-gold">
            {eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold/70" />
          </p>

          <h1 className="h-display text-[2.5rem] uppercase leading-[1.04] text-surface sm:text-6xl lg:text-[4.25rem]">
            <span data-reveal="heading-line" className="block overflow-hidden">
              Drive the car
            </span>
            <span data-reveal="heading-line" className="block overflow-hidden">
              you <span className="text-gold">deserve.</span>
            </span>
          </h1>

          <p
            data-reveal="copy"
            className="mt-5 max-w-sm font-body text-sm leading-relaxed text-surface/80 sm:text-base"
          >
            Carefully selected used cars, quality checked. Great prices.
            Honest service.
          </p>

          <div data-reveal="buttons" className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/cars" className="btn-primary">
              Browse Cars
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/sell-swap" className="btn-outline-dark">
              Sell or Swap Your Car
            </Link>
          </div>

          <div
            data-reveal="trust"
            className="mt-9 flex flex-wrap gap-x-7 gap-y-4"
          >
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-center gap-2.5">
                <point.icon className="h-5 w-5 flex-shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
                <div>
                  <p className="font-body text-xs font-semibold text-surface">
                    {point.title}
                  </p>
                  <p className="font-body text-[11px] text-surface/50">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade so the hero melts into the overlapping enquiry card. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
