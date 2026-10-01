"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import type { SiteSettings } from "@/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Used Cars" },
  { href: "/modifications", label: "Modifications" },
  { href: "/sell-swap", label: "Sell / Swap" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const whatsappHref = buildWhatsAppLink(
    settings.whatsappHref,
    "Hello Manchester Auto Cars, I have a question about your stock."
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only while at the top of the homepage's dark hero.
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line-dark bg-ink/95 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between sm:h-[68px]">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wideish transition-colors ${
                pathname === link.href
                  ? "border-gold text-gold"
                  : "border-transparent text-surface/70 hover:text-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp Us
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-surface lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-line-dark bg-ink transition-[max-height] duration-300 ease-premium lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-dark py-3 font-mono text-sm font-semibold uppercase tracking-wideish text-surface"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-4 w-full"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp Us
          </a>
        </nav>
      </div>
    </header>
  );
}
