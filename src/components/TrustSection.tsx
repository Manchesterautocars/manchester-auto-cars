import Link from "next/link";
import { ShieldCheck, FileCheck, BadgeCheck, Wallet } from "lucide-react";
import { trustPoints } from "@/lib/trust";
import Reveal from "./Reveal";

const icons = [ShieldCheck, FileCheck, BadgeCheck, Wallet];

export default function TrustSection() {
  return (
    <section className="border-t border-ink/10 bg-surface py-14 sm:py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[0.7fr_1.5fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow mb-3">Why Choose Us</p>
          <h2 className="h-display text-3xl leading-[1.1] text-ink sm:text-[2.6rem]">
            Trusted by
            <br />
            drivers across the UK
          </h2>
          <Link href="/about" className="btn-outline mt-6 w-fit">
            About Us
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {trustPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={point.title} type="fade-up" delay={i * 0.06}>
                <div className="h-full rounded-xl border border-ink/10 bg-white p-4 shadow-[0_8px_24px_-16px_rgba(10,10,11,0.25)] sm:p-5">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-3 font-display text-sm font-semibold tracking-tight text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-mist sm:text-sm">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
