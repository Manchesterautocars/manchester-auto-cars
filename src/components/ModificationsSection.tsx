import Link from "next/link";
import Image from "next/image";
import { Wrench, CircleDot, Armchair, PaintBucket } from "lucide-react";
import { services } from "@/lib/modifications";
import Reveal from "./Reveal";

const icons = [Wrench, CircleDot, Armchair, PaintBucket];

export default function ModificationsSection() {
  return (
    <section className="border-t border-line-dark bg-ink py-14 text-surface sm:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        <div>
          <p className="eyebrow mb-3 text-gold">Modifications</p>
          <h2 className="h-display text-3xl text-surface sm:text-4xl">
            Upgrade your drive
          </h2>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-surface/60">
            From performance upgrades to custom styling, bring your vision to
            life.
          </p>
          <Link href="/modifications" className="btn-outline-dark mt-6 w-fit">
            View Services
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={service.title} type="fade-up" delay={i * 0.07}>
                <Link
                  href="/modifications"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[14px] border border-line-dark"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 45vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                  <Icon className="absolute right-3 top-3 h-4 w-4 text-gold" aria-hidden />
                  <p className="absolute inset-x-0 bottom-0 p-3 font-display text-xs uppercase leading-tight tracking-tight text-surface sm:text-sm">
                    {service.title}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
