// Trust-point copy. Claims not yet confirmed in content/settings are phrased
// as invitations to ask rather than guarantees — update once confirmed.

export interface TrustPoint {
  title: string;
  description: string;
}

export const trustPoints: TrustPoint[] = [
  {
    title: "Straightforward Pricing",
    description: "No hidden fees, no surprises.",
  },
  {
    title: "History Checks",
    description: "Ask us for a vehicle history check before you buy.",
  },
  {
    title: "Warranty Options",
    description: "Ask about warranty options available on our cars.",
  },
  {
    title: "Finance Available",
    description: "Ask about finance options for your next car.",
  },
];
