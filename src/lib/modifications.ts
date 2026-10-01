// Placeholder service content.
// The business has not yet confirmed a specific modifications/service list
// in the CMS, so these are editable placeholders — update here (or migrate
// into a Decap collection) once the real service list is confirmed.

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    title: "Performance Upgrades",
    description: "Placeholder — confirm scope of performance work offered.",
    image:
      "https://images.unsplash.com/photo-1627508795178-e852bd067a72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Custom Wheels",
    description: "Placeholder — confirm wheel fitting/supply services offered.",
    image:
      "https://images.unsplash.com/photo-1761040100208-07f603acc83f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Interior Upgrades",
    description: "Placeholder — confirm interior trim/upgrade services offered.",
    image:
      "https://images.unsplash.com/photo-1748214311838-576a62d44c7d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Body Kits & Styling",
    description: "Placeholder — confirm styling/body work services offered.",
    image:
      "https://images.unsplash.com/photo-1665326278157-0ca35856cb39?auto=format&fit=crop&w=1200&q=80",
  },
];
