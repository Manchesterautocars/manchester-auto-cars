"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGsapRegister, prefersReducedMotion } from "@/lib/gsapSetup";

type RevealType = "fade-up" | "fade-in" | "clip" | "scale";

export default function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  useGsapRegister();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0 0)" });
      return;
    }

    const from: gsap.TweenVars = { opacity: 0 };
    if (type === "fade-up") from.y = 32;
    if (type === "scale") from.scale = 0.96;
    if (type === "clip") from.clipPath = "inset(0 0 100% 0)";

    const to: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    };

    const tween = gsap.fromTo(el, from, to);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [type, delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
