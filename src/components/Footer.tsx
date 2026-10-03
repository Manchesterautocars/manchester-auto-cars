import Link from "next/link";
import type { SiteSettings } from "@/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { services } from "@/lib/modifications";
import Reveal from "./Reveal";
import { LogoFull } from "./Logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Used Cars" },
  { href: "/modifications", label: "Modifications" },
  { href: "/sell-swap", label: "Sell / Swap" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <span
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark text-surface/70 transition-colors hover:border-gold hover:text-gold"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d={path} />
      </svg>
    </span>
  );
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappHref,
    "Hello Manchester Auto Cars, I have a question."
  );

  return (
    <footer className="border-t border-line-dark bg-ink text-surface">
      <Reveal type="fade-in">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <LogoFull className="h-20 sm:h-24" />
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-surface/60">
            Quality used cars and premium automotive services in Manchester.
          </p>
          <div className="mt-5 flex gap-3">
            {settings.socialLinks.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Manchester Auto Cars on Facebook"
              >
                <SocialIcon
                  label="Facebook"
                  path="M13.5 21v-7.5H16l.5-3H13.5V8.25c0-.87.24-1.46 1.49-1.46H16.5V4.14C16.23 4.1 15.32 4 14.25 4c-2.23 0-3.75 1.36-3.75 3.86V10.5H8v3h2.5V21h3z"
                />
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Manchester Auto Cars on Instagram"
              >
                <SocialIcon
                  label="Instagram"
                  path="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.55-.55 1.1-.89 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                />
              </a>
            )}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Manchester Auto Cars on WhatsApp"
            >
              <SocialIcon
                label="WhatsApp"
                path="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.4 1.26 4.83L2 22l5.36-1.28a9.9 9.9 0 0 0 4.68 1.19h.01c5.5 0 9.96-4.46 9.96-9.96S17.55 2 12.04 2zm5.8 14.2c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.15-.19-1.19-1.58-1.19-3.01s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.01.89 2.15.07.15.11.32.02.51-.09.19-.14.31-.27.48-.14.17-.29.37-.41.5-.14.14-.28.29-.12.57.16.28.7 1.16 1.51 1.87 1.04.93 1.91 1.22 2.19 1.36.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z"
              />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Quick Links</p>
          <ul className="flex flex-col gap-2 font-body text-sm text-surface/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="flex flex-col gap-2 font-body text-sm text-surface/70">
            {services.map((service) => (
              <li key={service.title}>
                <Link href="/modifications" className="hover:text-gold">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact Us</p>
          <ul className="flex flex-col gap-2 font-body text-sm text-surface/70">
            <li>
              <a href={`tel:${settings.phoneHref}`} className="hover:text-gold">
                {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp Us
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
            <li className="text-surface/50">Manchester, United Kingdom</li>
          </ul>
        </div>
      </div>
      </Reveal>

      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 max-md:pb-[calc(5rem+env(safe-area-inset-bottom,0px))] font-body text-xs text-surface/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-surface">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-surface">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
