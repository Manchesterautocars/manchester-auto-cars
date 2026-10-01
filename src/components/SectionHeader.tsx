import type { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  level = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading
        className={`h-display text-4xl sm:text-5xl md:text-6xl ${
          dark ? "text-surface" : "text-ink"
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 max-w-xl font-body text-base leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-surface/70" : "text-mist"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
