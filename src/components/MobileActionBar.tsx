import type { SiteSettings } from "@/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function MobileActionBar({
  settings,
}: {
  settings: SiteSettings;
}) {
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappHref,
    "Hello Manchester Auto Cars, I have a question."
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line-dark bg-ink max-md:pb-[env(safe-area-inset-bottom,0px)] lg:hidden">
      <a
        href={`tel:${settings.phoneHref}`}
        className="flex-1 border-r border-line-dark py-3 text-center max-md:py-3.5 font-mono text-xs font-semibold uppercase tracking-wideish text-surface"
      >
        Call Now
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 text-center max-md:py-3.5 font-mono text-xs font-semibold uppercase tracking-wideish text-gold"
      >
        WhatsApp
      </a>
    </div>
  );
}
