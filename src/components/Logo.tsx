import Image from "next/image";

// Official Manchester Auto Cars logo (uploaded asset), split into two
// pre-cropped, transparent PNGs so it works cleanly at different sizes:
//   - logo-icon.png  → the car/skyline/bee emblem on its own, used in the
//     compact navbar alongside the live wordmark text (the source lockup
//     stacks icon-over-wordmark, which becomes illegible at navbar height,
//     so the emblem carries the mark there and real text carries the name
//     for legibility/accessibility).
//   - logo-full.png  → the full icon + wordmark lockup exactly as supplied,
//     used in the footer where there's enough vertical room for it to
//     render at a legible size.
// Both are real crops of the uploaded file — nothing has been redrawn.

const ICON_RATIO = 480 / 387;
const FULL_RATIO = 640 / 615;

export function LogoIcon({ className = "h-9 sm:h-11" }: { className?: string }) {
  return (
    <Image
      src="/images/logo-icon.png"
      alt="Manchester Auto Cars"
      width={480}
      height={387}
      priority
      className={`w-auto ${className}`}
      style={{ aspectRatio: ICON_RATIO }}
    />
  );
}

export function LogoFull({ className = "h-24 sm:h-28" }: { className?: string }) {
  return (
    <Image
      src="/images/logo-full.png"
      alt="Manchester Auto Cars"
      width={640}
      height={615}
      className={`w-auto ${className}`}
      style={{ aspectRatio: FULL_RATIO }}
    />
  );
}

// Compact lockup: uploaded emblem + live wordmark text, for tight spaces
// like the navbar. Keep the text identical to the brand name so screen
// readers and the visible <Image alt> aren't out of sync.
export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoIcon />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-base font-bold uppercase tracking-tight text-surface sm:text-lg">
          Manchester
        </span>
        <span className="font-body text-[9px] font-semibold uppercase tracking-platey text-gold">
          Auto Cars
        </span>
      </span>
    </span>
  );
}
