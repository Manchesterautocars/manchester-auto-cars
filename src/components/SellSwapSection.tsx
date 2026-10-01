import { Home, Truck } from "lucide-react";
import type { SiteSettings } from "@/types";
import SellSwapForm from "./SellSwapForm";
import Reveal from "./Reveal";

export default function SellSwapSection({ settings }: { settings: SiteSettings }) {
  const promoIcons = [Truck, Home];

  return (
    <div className="relative bg-surface pb-10 sm:pb-14">
      <div className="container-page">
        <Reveal type="fade-up">
          <div className="relative mx-auto -mt-10 max-w-[1320px] rounded-2xl border border-surface/10 bg-ink p-6 shadow-[0_30px_70px_-25px_rgba(10,10,11,0.6)] sm:-mt-14 sm:p-9 lg:-mt-24 lg:p-10">
            <div className="grid gap-7 lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:gap-14">
              <div>
                <h2 className="h-display text-3xl text-surface sm:text-4xl">
                  Got one to <span className="text-gold">move on?</span>
                </h2>
                <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-surface/60">
                  Send us your details and we&rsquo;ll get back to you — no
                  pressure, no obligation.
                </p>

                {settings.promoMessages && settings.promoMessages.length > 0 && (
                  <ul className="mt-5 flex flex-col gap-2 border-t border-line-dark pt-4">
                    {settings.promoMessages.slice(0, 2).map((message, i) => {
                      const Icon = promoIcons[i % promoIcons.length];
                      return (
                        <li
                          key={message}
                          className="flex items-center gap-2.5 font-body text-xs font-medium text-surface/60"
                        >
                          <Icon className="h-3.5 w-3.5 flex-shrink-0 text-gold" aria-hidden />
                          {message}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div>
                <SellSwapForm whatsappHref={settings.whatsappHref} compact />
                <p className="mt-3 flex items-center justify-center gap-2 font-body text-xs text-surface/50">
                  <span aria-hidden>🔒</span> We&rsquo;ll contact you on WhatsApp
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
